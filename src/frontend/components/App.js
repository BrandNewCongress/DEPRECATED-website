import React from 'react'
import Navigation from './Navigation'
import USMap from './map/USMap'
import WelcomeMessage from './WelcomeMessage'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '80vh'
  }
})

export default () => (
  <div className={styles.map}>
    <Navigation />
    <div style={{clear: "both"}}></div>
    <USMap />
  </div>
)
