import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import moment from 'moment'
import theme from '../theme'

const fontFamily = theme.fontFamily
const styles=StyleSheet.create({
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


export default class EventListItem extends Component {
  static propTypes = {
    city: React.PropTypes.string.isRequired,
    date: React.PropTypes.object.isRequired,
    rsvpUrl: React.PropTypes.string.isRequired
  }

  render() {
    const { city, date, rsvpUrl } = this.props
    return (
      <div className={styles.eventItem}>
        <div className={styles.eventInfoContainer}>
          <h2 className={styles.eventTitle}>{`${city}`}</h2>
          <h4 className={styles.eventDate}>{moment(new Date(date)).format('MMM DD')}</h4>
        </div>
        <div className={styles.rsvpContainer}>
          <a className={styles.rsvpLink} target='_blank' href={rsvpUrl}>RSVP</a>
        </div>
      </div>
    )
  }
}
