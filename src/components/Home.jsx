import React from 'react'
import Signup from './Signup'
import MapTeaser from './MapTeaser'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  mapTeaser: {
    backgroundColor: 'white'
  }
})

const Home = () => (
  <div>
    <Signup />
    <div className={styles.mapTeaser}>
      <MapTeaser />
    </div>
  </div>
)

export default Home
