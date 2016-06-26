import React from 'react'
import Signup from './Signup'
import MapTeaser from './MapTeaser'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  signupContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 30,
    paddingBottom: 30
  },
  container: {
    position: 'relative'
  }
})

const Home = () => (
  <div className={styles.container}>
    <div className={styles.signupContainer}>
      <Signup />
    </div>
    <div>
      <MapTeaser />
    </div>
  </div>
)

export default Home
