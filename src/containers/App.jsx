import React from 'react'
import USMap from '../components/USMap'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import SignupForm from '../components/SignupForm'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'
import theme from '../theme'

const styles = StyleSheet.create({
  map: {
    height: '100%'
  },
  container: {
    height: '100vh',
    width: '100vw'
  },
  link: { ...theme.link },
  hero: {
    position: 'relative',
    height: 'calc(100vh - 77px)',
    width: '100vw',
    backgroundColor: 'white'
  },
  welcomeMessage: {
    textAlign: 'center',
    fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
    fontWeight: 300,
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)',
    padding: '1em'
  },
  welcomeBackground: {
    backgroundColor: theme.colors.lightGray,
    opacity: 0.5,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    margin: '-1em'
  },
  welcomeLine1: {
    fontSize: '2vw',
    color: theme.colors.blue,
    paddingTop: '1em',
    paddingBottom: '0.5em',
    '@media (max-width: 750px)': {
      fontSize: 16,
      width: 350,
      margin: 'auto'
    },
    '@media (max-width: 400px)': {
      display: 'none'
    }
  },
  signupForm: {
    backgroundColor: theme.colors.lightGray
  },
  welcomeLine2: {
    fontSize: '3vw',
    '@media (max-width:750px)': {
      fontSize: '24px'
    },
    '@media (max-width: 750px)': {
      fontSize: 16,
      width: 350,
      margin: 'auto'
    },
    color: theme.colors.darkGray
  },
  rsvpButton: {
    marginTop: '1em',
    marginBottom: '1em',
    backgroundColor: theme.colors.blue,
    color: 'white',
    padding: '0.2em 1em',
    display: 'inline-block',
    fontWeight: 600,
    fontSize: '3vw',
    cursor: 'pointer',
    borderRadius: 5,
    ':hover': {
      backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))'
    },
    '@media (max-width:750px)': {
      fontSize: '24px'
    }
  },
  cantMakeIt: {
    fontSize: '1.2vw',
    '@media (max-width:750px)': {
      fontSize: '12px'
    },
    color: theme.colors.gray,
    paddingBottom: '1em'
  },
  highlight: {
    color: theme.colors.orange,
    fontWeight: 600
  },
  welcomeMessageContainer: {
    width: '100%',
    height: '80vmin',
    position: 'absolute',
    zIndex: 1000
  },
  nav: {
    width: '100vw',
    minHeight: 77
  }
})

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

class App extends React.Component {
  static propTypes = {
    events: React.PropTypes.array
  }

  state = {
    introMode: true
  }

  showWelcomeMessage() {
    if (this.state.introMode) {
      return (
        <div
          className={styles.welcomeMessageContainer}
        >
          <div
            className={styles.welcomeMessage}
          >
            <div className={styles.welcomeBackground}>
            </div>
            <div className={styles.welcomeLine1}>
              We're coming to a city near you to start planning the next step of the political revolution.
            </div>
            <div className={styles.welcomeLine2}>
              Let's get together to elect a <span className={styles.highlight}>Brand New Congress</span> that works for all.
            </div>
            <div
              className={styles.rsvpButton}
              onClick={() => {
                this.setState({ introMode: false })
              }}
            >
            RSVP NOW
            </div>
            <div className={styles.cantMakeIt}>
              Can't make it to an event? <span className={styles.highlight}><a href='#' className={styles.link}>Sign up to see how you can help.</a></span>
            </div>
          </div>
        </div>
      )
    }
    return ''
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.nav}>
            <Navigation />
          </div>
          <div className={styles.hero}>
            {this.showWelcomeMessage()}
            <div
              className={styles.map}
              style={this.state.introMode ? {
                opacity: 0.3
              } : {}}
            >
              <USMap events={this.props.events} />
            </div>
          </div>
          <div className={styles.signupForm}>
            <SignupForm />
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
