import React from 'react'
import USMap from './map/USMap'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '80vh'
  }
})

export default () => (
  <div className={styles.map}>
    <USMap />
  </div>
)
