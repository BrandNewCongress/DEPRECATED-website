import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import moment from 'moment'

const styles = StyleSheet.create({
  popupContainer: {
    zIndex: 1000,
    position: 'absolute',
    width: '70vmin',
    padding: '20px 20px 10px',
    backgroundColor: '#d9f0f9',
    left: '50%',
    transform: 'translate(-50%, 0)',
    top: 60,
    borderRadius: 7,
    border: '5px solid rgba(255, 255, 255, 0.6)',
    '@media (max-width: 750px)': {
      top: 10,
      display: 'none !important'
    }
  },
  eventDetails: {
    position: 'relative'
  },
  closeButton: {
    position: 'absolute',
    right: -30,
    top: -30,
    fontWeight: 700,
    color: 'white',
    backgroundColor: theme.colors.darkBlue,
    padding: '4px 8px',
    borderRadius: 32,
    border: '4px solid white',
    boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
    textDecoration: 'none',
    ':hover': {
      color: '#40B4E5'
    }
  },
  location: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 800
  },
  date: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: 800,
    color: 'gray'
  },
  description: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 500
  }
})

const EventDetails = ({ event, onClose }) => (
  <div className={styles.popupContainer}>
    <div className={styles.eventDetails}>
      <a
        href='#'
        onClick={() => { onClose() }}
        className={styles.closeButton}
      >
        x
      </a>
      <div className={styles.location}>
        {`${event.city}, ${event.state}`}
      </div>
      <div className={styles.date}>
        {moment(new Date(event.date)).format('MMM DD')}
      </div>
      <div className={styles.description}>
      {`Join us as we talk about the
        plan to create a Brand New Congress.
        Exact location and time will be announced soon.`}
      </div>
      <button
        className={styles.button}
        onClick={() => {
          window.open(event.rsvpUrl, '_blank')
        }}
      >
      RSVP
      </button>
    </div>
  </div>
)

EventDetails.propTypes = {
  onClose: React.PropTypes.func,
  event: React.PropTypes.shape({
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    date: React.PropTypes.string,
    rsvpUrl: React.PropTypes.string
  })
}

export default EventDetails
