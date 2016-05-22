import React from 'react'
import EventItem from './EventItem'
import d3 from 'd3'
import topojson from 'topojson'
import { StyleSheet } from 'react-look'
import EventDetails from './EventDetails'
import theme from '../theme'
const rawStates = require('./data/states.json')
const usStates = topojson.feature(rawStates, rawStates.objects.cb_2015_us_state_20m).features
const InitialScale = 1280
const [USLevelZoom, StateLevelZoom] = [0, 2]
const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: theme.colors.lightGray,
    height: '100%'
  },
  map: {
    marginLeft: '50%',
    transform: 'translate(-50%, 0)',
    width: '100%',
    height: 'auto',
    maxHeight: '100%'
  },
  state: {
    fill: 'white',
    stroke: '#E1E4E0',
    strokeWidth: 1.5,
    transition: 'fill .1s',
    ':hover': {
      fill: '#F5FFF7'
    }
  }
})

export default class USMap extends React.Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.shape({
      city: React.PropTypes.string,
      state: React.PropTypes.string,
      date: React.PropTypes.string,
      rsvpUrl: React.PropTypes.string,
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    })).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

  static defaultProps = {
    width: 960,
    height: 600
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: null,
      mapTranslate: [props.width / 2, props.height / 2],
      mapScale: InitialScale,
      zoomLevel: USLevelZoom,
      activeNode: d3.select(null)
    }
  }

  componentWillMount = () => {
    this.projection = d3.geo.albersUsa()
      .scale(this.state.mapScale)
      .translate(this.state.mapTranslate)

    this.path = d3.geo.path().projection(this.projection)
  }

  componentDidUpdate(prevObj, prevState) {
    const mapChange = (
      this.state.mapScale !== prevState.mapScale ||
      this.state.mapTranslate !== prevState.mapTranslate
    )

    if (mapChange) {
      const target = d3.select('#USMap-activityArea')
      if (!this.state.mapScale && !this.state.mapTranslate) {
        target
          .transition()
          .duration(750)
          .attr('transform', '')
      } else {
        target
          .transition()
          .duration(750)
          .attr(
            'transform',
            `translate(${this.state.mapTranslate})scale(${this.state.mapScale})`
          )
      }
    }
  }

  onClickUsState(state, event) {
    if (this.state.activeNode.node() === event.target) {
      // State has been clicked again
      this.setState({
        mapScale: null,
        mapTranslate: null,
        activeNode: d3.select(null),
        selectedEvent: null,
        zoomLevel: USLevelZoom
      })
    } else {
      // New State has been clicked
      const bounds = this.path.bounds(state)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const mapScale = 0.7 / Math.max(dx / this.props.width, dy / this.props.height)
      const mapTranslate = [
        this.props.width / 2 - mapScale * x,
        this.props.height / 2 - mapScale * y
      ]

      this.setState({
        mapScale,
        mapTranslate,
        activeNode: d3.select(event.target),
        selectedEvent: null,
        zoomLevel: StateLevelZoom
      })
    }
  }

  reset() {
    this.state.activeNode.classed('active', false)
    this.setState({ activeNode: d3.select(null) })
  }

  showEventDetails() {
    return (
      <EventDetails
        event={this.state.selectedEvent}
        onClose={() => this.setState({ selectedEvent: null })}
      />
    )
  }

  render() {
    return (
      <div className={styles.mapContainer}>
        {this.state.selectedEvent ? this.showEventDetails() : ''}
        <svg
          className={styles.map}
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g id='USMap-activityArea'>
            {usStates.map((usState, id) => (
              <path
                key={id}
                className={styles.state}
                d={this.path(usState)}
                onClick={(e) => this.onClickUsState(usState, e)}
              />
            ))}

            {this.props.events.map((event, id) => {
              const coord = this.projection(
                [parseFloat(event.longitude),
                parseFloat(event.latitude)]
              )
              if (coord === null) {
                return ''
              }

              return (
                <EventItem
                  radius={5}
                  centerX={coord[0]}
                  centerY={coord[1]}
                  key={`event-item-${id}`}
                  scale={(this.state.mapScale === InitialScale
                    || !this.state.mapScale) ? 1 : this.state.mapScale}
                  onClick={() => {
                    this.setState({ selectedEvent: event })
                  }}
                  city={event.city}
                  state={event.state}
                />
              )
            })}
          </g>
        </svg>
      </div>
    )
  }
}
