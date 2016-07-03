import React from 'react'
import Signup from './Signup'
import MapTeaser from './MapTeaser'
import { StyleSheet } from 'react-look'
import { onTablet } from '../media-queries'

const styles = StyleSheet.create({
  signupContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 50,
    paddingBottom: 30,
    [onTablet]: {
      paddingTop: 30
    }
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
