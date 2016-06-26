import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

const styles = StyleSheet.create({
  map: {
    maxWidth: '100%',
    opacity: 0.3
  },
  mapContainer: {
    backgroundColor: 'white',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  overlayContainer: {
    position: 'absolute',
    zIndex: 1000,
    height: '100%',
    width: '100%',
    textAlign: 'center'
  },
  overlayBody: {
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
    paddingLeft: '1.5em',
    paddingRight: '1.5em',
    position: 'relative',
    width: '50%',
    fontWeight: 300,
    textAlign: 'center',
    top: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    transform: 'translateY(-50%)'
  },
  overlayBackground: {
    backgroundColor: theme.colors.lightBlue,
    height: '100%',
    width: '100%',
    opacity: 0.5,
    marginTop: '-1.5em',
    marginLeft: '-1.5em',
    border: `1px solid ${theme.colors.blue}`,
    position: 'absolute',
    zIndex: -1
  },
  overlayText: {
    fontSize: '30px',
    color: theme.colors.blue,
  },
  overlayBigText: {
    fontSize: '30px',
    color: theme.colors.darkGray
  },
  bold: {
    fontWeight: 600,
    color: theme.colors.orange
  },
  findCityButton: {
    marginTop: '2em',
    marginBottom: '2em',
    backgroundColor: theme.colors.orange,
    color: 'white',
    padding: '0.2em 1em',
    display: 'inline-block',
    fontWeight: 600,
    fontSize: '40px',
    cursor: 'pointer',
    borderRadius: 5,
    ':hover': {
      backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))'
    }
  },
  findCityLink: {
    color: 'white',
    textDecoration: 'none',
    border: 'none'
  }
})

const MapTeaser = () => (
  <div className={styles.mapContainer}>
    <div className={styles.overlayContainer}>
      <div className={styles.overlayBody}>
        <div className={styles.overlayBackground} />
        <div className={styles.overlayText}>
          We're coming to a city near you to start organizing the next steps of the political revolution.
        </div>
        <div className={styles.findCityButton}>
          <Link className={styles.findCityLink} to='/tour'>Find Your City</Link>
        </div>
        <div className={styles.overlayBigText}>
          Let's get together to elect a <span className={styles.bold}>Brand New Congress</span> that works for all.
        </div>
      </div>
    </div>
    <img className={styles.map} alt="Let's get together to elect a Brand New Congress that works for all." src='/static-assets/img/map-1577x965@2x.png' />
  </div>
)

export default MapTeaser
