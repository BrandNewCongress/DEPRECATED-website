import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    backgroundColor: theme.colors.orange,
    padding: '10px 5px 5px',
    width: 75
  },
  logoText: {
    color: 'white',
    padding: '5px 5px 5px 10px',
    marginLeft: 10,
    border: 'solid white',
    borderWidth: '0 0 0 4px',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    fontFamily: theme.fontFamily
  },
  mobileNav: {
    '@media (min-width: 575px)': {
      display: 'none'
    },
    backgroundColor: theme.colors.orange,
    display: 'flex',
    flex: 1,
    marginLeft: 1
  },
  nav: {
    '@media (max-width: 575px)': {
      display: 'none'
    },
    display: 'flex',
    flex: 1,
    fontWeight: 400,
    fontSize: 15,
    color: theme.colors.orange,
    paddingTop: 25,
    marginLeft: 20
  },
  navItem: {
    display: 'inline-block',
    paddingRight: 25
  },
  container: {
    display: 'flex',
    width: '100%'
  }
})

export default () => (
  <div className={styles.container}>
    <div className={styles.logo}>
      <div className={styles.logoText}>
        Brand New Congress
      </div>
    </div>
    <div className={styles.mobileNav}>
      PUT MOBILE NAV HERE
    </div>
    <div className={styles.nav}>
      <div className={styles.navItem}>
      The Plan
      </div>
      <div className={styles.navItem}>
      Who's Involved
      </div>
      <div className={styles.navItem}>
      Join A Team
      </div>
      <div className={styles.navItem}>
      Issues
      </div>
      <div className={styles.navItem}>
      Contribute
      </div>
    </div>
  </div>
)
