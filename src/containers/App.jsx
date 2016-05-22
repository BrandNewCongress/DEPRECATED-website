import React from 'react'
import USMap from '../components/USMap'
import Navigation from '../components/Navigation'
import look, { StyleSheet } from 'react-look'
import { connect } from 'react-redux'
import theme from '../theme'

const styles = StyleSheet.create({
  map: {
    height: '80vmin',
    opacity: (props, state) => state.introMode ? 0.3 : 1
  },
  welcomeMessage: {
    width: '100vw',
    height: '80vmin',
    position: 'absolute',
    zIndex: 1000,
    cursor: 'pointer',
    display: (props, state) => state.introMode ? 'block' : 'none'
  },
/*  hero: {
    position: (props, state) => 'absolute',
    width: '100vw',
    height: '80vmin',
    zIndex: -1
  },
  */
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
    introMode: false
  }

  render() {
    return (
      <div>
        <div className={styles.nav}>
          <Navigation />
        </div>
        <div>
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
          <div className={styles.map}>
            <USMap events={this.props.events} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(look(App))
