import React from 'react'
import USMap from '../components/USMap'
import Navigation from '../components/Navigation'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  map: {
    height: '80vmin'
  },
  welcomeMessage: {
    width: '100vw',
    height: '80vmin',
    position: 'absolute',
    zIndex: 1000,
    cursor: 'pointer'
  },
  nav: {
    width: '100vw'
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
          className={styles.welcomeMessage}
          onClick={() => {
            console.log('here')
            this.setState({ introMode: false })
          }}
        >
          <div>
            We're coming to a city near you to start planning the next step of the political revolution.
          </div>
          <div>
            Let's get together to elect a Brand New Congress that works for all. RSVP NOW.
          </div>
          <div>
            Can't make it to an event? Sign up anyway to see how you can help.
          </div>
        </div>
      )
    }
    return ''
  }

  render() {
    return (
      <div>
        <div className={styles.nav}>
          <Navigation />
        </div>
        <div>
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(App)
