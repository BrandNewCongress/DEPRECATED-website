import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const c = StyleSheet.combineStyles
const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    backgroundColor: theme.colors.orange,
    padding: '10px 5px 5px',
    width: 75,
    fontWeight: 600,
    '@media (max-width: 775px)': {
      width: 'auto'
    }

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
    fontFamily: theme.fontFamily,
    '@media (max-width: 775px)': {
      fontSize: 20
    }
  },
  mobileNav: {
    '@media (min-width: 775px)': {
      display: 'none'
    },
    display: 'inline-block',
    backgroundColor: theme.colors.orange,
    marginLeft: 1,
    float: 'right',
    paddingRight: 18,
    paddingTop: 18
  },
  mobileNavList: {
    '@media (min-width: 775px)': {
      display: 'none'
    },
    height: 0,
    transition: 'height 0.2s',
    overflow: 'hidden',
    width: '100%'
  },
  showNav: {
    height: 135
  },
  hideNav: {
    height: 0
  },
  navArea: {
    display: 'block'
  },
  nav: {
    '@media (max-width: 775px)': {
      display: 'none'
    },
    display: 'inline-block',
    paddingTop: 30,
    marginLeft: 20,
    verticalAlign: 'top'
  },
  navItem: {
    display: 'inline-block',
    paddingRight: 25,
    fontSize: 15,
    fontWeight: 400,
    color: theme.colors.orange,
    '@media (max-width: 775px)': {
      display: 'block',
      paddingLeft: 9,
      color: 'white',
      paddingTop: 2,
      paddingBottom: 4,
      borderLeft: '4px white solid',
      marginLeft: 15,
      fontSize: 14,
      marginTop: 4
    }
  },
  container: {
    display: 'flex',
    width: '100%',
    '@media (max-width: 775px)': {
      backgroundColor: theme.colors.orange,
      flexDirection: 'column'
    }
  },
  viewport: {
    clear: 'both',
    width: '100%',
    display: 'block'
  }
})

const navigationLinks = (
  <div className={styles.navArea}>
    <div className={styles.navItem}>
      The Tour
    </div>
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
      Contribute
    </div>
    <div className={styles.navItem}>
      Issues
    </div>
    <div className={styles.navItem}>
      Contribute
    </div>
  </div>
)

export default class Navigation extends Component {
  state = {
    showNav: false
  }

  showMobileNav = () => {
    const showMobile = !this.state.showNav
    this.setState({ showNav: showMobile })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.viewport}>
          <div className={styles.logo}>
            <div className={styles.logoText}>
              Brand New Congress
            </div>
          </div>
          <div
            className={styles.mobileNav}
            onClick={() => this.showMobileNav()}
            onTouch={() => this.showMobileNav()}
          >
            <img src={'http://placehold.it/30x30'} role='presentation' />
          </div>
          <div className={styles.nav}>
            {navigationLinks}
          </div>
        </div>
        <div style={{ clear: 'both' }}></div>
        <div
          className={
          this.state.showNav ?
          c(styles.mobileNavList, styles.showNav) :
          styles.mobileNavList}
        >
          {navigationLinks}
        </div>
      </div>
    )
  }
}
