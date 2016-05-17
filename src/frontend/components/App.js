import React from 'react'
import Navigation from './Navigation'
import OpenStreetMap from './OpenstreetMap'
import WelcomeMessage from './WelcomeMessage'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100vh'
  }
})

export default () => (
  <div className={styles.map}>
    <OpenStreetMap />
  </div>
)
