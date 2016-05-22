import React from 'react'
import USMap from '../components/USMap'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  map: {
    height: '70vmin'
  }
})

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

const App = ({ events }) => (
  <div className={styles.map}>
    <USMap events={events} />
  </div>
)

App.propTypes = {
  events: React.PropTypes.array
}

export default connect(mapStateToProps)(App)
