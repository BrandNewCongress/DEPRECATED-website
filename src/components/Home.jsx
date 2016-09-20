import React from 'react'
import Signup from './Signup'
import { StyleSheet } from 'react-look'
import { onTablet } from '../media-queries'
import theme from '../theme'

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
  },
  alertBar: {
    fontSize: 25,
    backgroundColor: theme.colors.white,
    marginTop: 15,
    padding: 30,
    textAlign: 'center',
    color: theme.colors.darkGreen,
    fontWeight: 400,
    borderTop: `1px solid ${theme.colors.darkGray}`,
    borderBottom: `1px solid ${theme.colors.darkGray}`
  },
  link: {
    ...theme.text.link,
    color: theme.colors.orange,
    fontWeight: 600
  }
})

const Home = () => (
  <div className={styles.container}>
    <div className={styles.alertBar}>
      Tune in TODAY for a live video event.  <a href='http://go.brandnewcongress.org/livestream' className={styles.link}>Attend a viewing party or watch it online!</a>
    </div>
    <div className={styles.signupContainer}>
      <Signup />
    </div>
  </div>
)

export default Home
