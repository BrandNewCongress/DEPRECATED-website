import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-look'
import moment from 'moment'
import theme from '../theme'

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
  container: {
    display: 'flex',
    flexDirection: 'column',
    '@media (min-height: 775px)': {
      display: 'none !important'
    }
  },
  eventItem: {
    display: 'flex',
    flexDirection: 'row'
  },
  eventTitle: {
    padding: '3px 11px 18px',
    margin: '0px 0 0 20px',
    fontSize: 22,
    fontFamily,
    borderLeft: 'solid 4px',
    borderColor: theme.colors.orange
  },
  stateName: {
    padding: '10px 10px',
    fontSize: 25,
    margin: '0 0 10px',
    backgroundColor: theme.colors.lightGray,
    fontFamily
  },
  eventInfoContainer: {
    flex: 7
  },
  eventDate: {
    marginLeft: 35,
    marginTop: -19,
    fontSize: 14,
    color: theme.colors.gray
  },
  rsvpContainer: {
    flex: 3,
    textAlign: 'left',
    verticalAlign: 'middle'
  },
  rsvpLink: {
    color: 'white',
    backgroundColor: theme.colors.blue,
    textDecoration: 'none',
    width: '90%',
    display: 'inline-block',
    padding: '10px 0 9px',
    borderRadius: 4,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: 600,
    fontFamily: theme.fontFamily,
    ':hover': {
      backgroundColor: theme.colors.darkBlue
    }
  }
})

class EventsList extends Component {
  static propTypes = {
    events: React.PropTypes.array,
    selectedState: React.PropTypes.object
  }

  filterEvents() {
    console.log(this.props.selectedState && this.props.selectedState.properties ? this.props.selectedState.properties.STUSPS : 'none')
    return this.props.selectedState && this.props.selectedState.properties ? this.props.events.filter(
      (event) => this.props.selectedState.properties.STUSPS === event.state
        || regionStates[this.props.selectedState.properties.NAME]
        && regionStates[this.props.selectedState.properties.NAME].indexOf(event.state) !== -1
    ) : this.props.events
  }
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.stateName}>
          {this.props.selectedState && this.props.selectedState.properties ? this.props.selectedState.properties.NAME : 'Upcoming Events'}
        </h1>
        {this.filterEvents().map((event, item) => (
          <div className={styles.eventItem} key={item}>
            <div className={styles.eventInfoContainer}>
              <h2 className={styles.eventTitle}>{`${event.city}`}</h2>
              <h4 className={styles.eventDate}>{moment(new Date(event.date)).format('MMM DD')}</h4>
            </div>
            <div className={styles.rsvpContainer}>
              <a className={styles.rsvpLink} target='_blank' href={event.rsvpUrl}>RSVP</a>
            </div>
          </div>
        ))}
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
