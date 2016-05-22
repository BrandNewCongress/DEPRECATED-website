import React from 'react'
import USMap from '../components/USMap'
import Navigation from '../components/Navigation'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  map: {
    height: '80vmin'
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

const App = ({ events }) => (
  <div>
    <div className={styles.nav}>
      <Navigation />
    </div>
    <div className={styles.map}>
      <USMap events={events} />
    </div>
  </div>
)

App.propTypes = {
  events: React.PropTypes.array
}

export default connect(mapStateToProps)(App)
