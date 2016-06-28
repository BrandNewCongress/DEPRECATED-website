import React from 'react'
import { StyleSheet } from 'react-look'
import moment from 'moment'
import theme from '../theme'

const maxWidthWithFlex = (flexValue) => ({ maxWidth: flexValue * 100, flex: flexValue })

const button = {
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
  ':hover': {
    backgroundColor: theme.colors.darkBlue
  }
}

const eventTitleStyle = {
  padding: '3px 11px 18px',
  margin: '0px 0 0 20px',
  fontSize: 22,
  borderLeft: 'solid 4px',
  borderColor: theme.colors.orange
}

const styles = StyleSheet.create({
  eventItem: {
    display: 'flex',
    flexDirection: 'row'
  },
  eventTitle: {
    ...eventTitleStyle
  },
  disabledEventTitle: {
    ...eventTitleStyle,
    color: theme.colors.gray,
    borderColor: theme.colors.lightGray
  },
  stateName: {
    padding: '10px 10px',
    fontSize: 25,
    margin: '0 0 10px',
    backgroundColor: theme.colors.lightGray
  },
  eventInfoContainer: maxWidthWithFlex(7),
  eventDate: {
    marginLeft: 35,
    marginTop: -19,
    fontSize: 14,
    color: theme.colors.gray
  },
  rsvpContainer: {
    textAlign: 'left',
    verticalAlign: 'middle',
    ...maxWidthWithFlex(3)
  },
  rsvpLink: {
    ...button
  },
  disabledRsvpLink: {
    ...button,
    color: theme.colors.gray,
    backgroundColor: theme.colors.lightGray,
    ':hover': {
      backgroundColor: theme.colors.lightGray
    }
  }
})


export default function EventListItem(props) {
  const { city, date, rsvpUrl } = props
  const eventDate = moment(new Date(date))
  const isPast = eventDate < moment(new Date())
  return (
    <div className={styles.eventItem}>
      <div className={styles.eventInfoContainer}>
        <h2 className={isPast ? styles.disabledEventTitle : styles.eventTitle}>{`${city}`}</h2>
        <h4 className={styles.eventDate}>{eventDate.format('MMM DD')}</h4>
      </div>
      <div className={styles.rsvpContainer}>
        <a className={isPast ? styles.disabledRsvpLink : styles.rsvpLink} target={isPast ? '' : '_blank'} href={isPast ? '#' : rsvpUrl}>RSVP</a>
      </div>
    </div>
  )
}
EventListItem.propTypes = {
  city: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  rsvpUrl: React.PropTypes.string.isRequired,
}
