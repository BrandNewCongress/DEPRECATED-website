import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    backgroundColor: '#f16432',
    padding: '10px 5px 5px',
    width: 100
  },
  logoText: {
    color: 'white',
    padding: '5px 5px 5px 10px',
    marginLeft: 10,
    border: 'solid white',
    borderWidth: '0 0 0 4px',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    fontFamily: theme.fontFamily
  },
  nav: {
    display: 'inline-block',
    fontWeight: 800,
    fontSize: 25,
    color: theme.lightGray,
    verticalAlign: 'middle',
    width: '100%'
  },
  navItem: {
    display: 'inline-block'
  },
  navBar: {
    display: 'block',
    width: '100%'
  }
})

export default () => (
  <div className={styles.navBar}>
    <div className={styles.logo}>
      <div className={styles.logoText}>
        Brand New Congress
      </div>
    </div>

    <div className={styles.nav}>
      <div className={styles.navItem}>
        Hello
      </div>
    </div>
  </div>
)
