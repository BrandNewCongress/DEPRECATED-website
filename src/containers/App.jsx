import React from 'react'
import USMap from '../components/USMap'
import { StyleSheet, LookRoot } from 'react-look'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '80vh'
  }
})

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(() => (
  <LookRoot>
    <div className={styles.map}>
      <USMap events={this.props.events} />
    </div>
  </LookRoot>
))
