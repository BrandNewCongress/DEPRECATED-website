import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-look'
import EventListItem from '../components/EventListItem'
import EventColumn from '../components/EventColumn'
import theme from '../theme'
import _ from 'lodash'

const MAX_COLUMN_LENGTH = 350
const regionStates = {
  Northeast: [
    'PA',
    'NJ',
    'NY',
    'CT',
    'MA',
    'VT',
    'NH',
    'ME',
    'RI'
  ]
}
const fontFamily = theme.fontFamily
const styles = StyleSheet.create({
  columnEventsContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  stateName: {
    padding: '10px 10px',
    fontSize: 25,
    margin: '0 0 10px',
    backgroundColor: theme.colors.lightGray,
    fontFamily
  }
})

class EventsList extends Component {
  static propTypes = {
    events: React.PropTypes.array,
    selectedState: React.PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      componentWidth: 0,
      eventsColumn: 1,
      columnedEvents: []
    }
  }

  componentDidMount() {
    this.remeasure()
    window.addEventListener('resize', this.remeasure.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.remeasure.bind(this))
  }

  filterEvents() {
    return this.props.selectedState && this.props.selectedState.properties
          ? this.props.events.filter(
            (event) => this.props.selectedState.properties.STUSPS === event.state
        || regionStates[this.props.selectedState.properties.NAME]
        && regionStates[this.props.selectedState.properties.NAME].indexOf(event.state) !== -1
      ) :
      this.props.events
  }

  remeasure() {
    const componentWidth = this.refs.root.offsetWidth
    const eventsColumn = Math.floor(componentWidth / MAX_COLUMN_LENGTH)
    const groupedEvents = _.groupBy(this.props.events, 'state')
    const columnedEvents = Array(eventsColumn)

    // Initialize
    _.forEach(columnedEvents, (val, ind) => {
      columnedEvents[ind] = []
    })

    // Move data around to have equal column lengths
    _.forEach(groupedEvents, (val) => {
      const minIndex = _.indexOf(
        columnedEvents, _.minBy(columnedEvents, (item) => _.flatten(item).length))
      columnedEvents[minIndex].push(val)
    })

    this.setState({ columnedEvents, componentWidth, eventsColumn })
  }

  renderGroupedEvents() {
    return (
      <div className={styles.columnEventsContainer} >
        {this.state.columnedEvents.map((item, id) =>
          (<EventColumn datasource={item} key={id} columnCount={this.state.eventsColumn} />)
        )}
      </div>
    )
  }

  renderFilteredEvents() {
    return (
      this.filterEvents().map((event, id) => (
        <EventListItem key={id} {...event} />
      ))
    )
  }

  render() {
    return (
      <div ref={'root'} className={styles.container}>
        <h1 className={styles.stateName}>
          {this.props.selectedState && this.props.selectedState.properties ?
            this.props.selectedState.properties.NAME :
            'Upcoming Events (Select your state from the map)'}
        </h1>
        {this.props.selectedState && this.props.selectedState.properties ?
              this.renderFilteredEvents() :
              this.renderGroupedEvents()}
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    selectedState: state.selectedState,
    events: state.events
  }
}

export default connect(mapStateToProps)(EventsList)
