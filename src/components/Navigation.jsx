import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const c = StyleSheet.combineStyles
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
    display: 'inline-block',
    backgroundColor: theme.colors.orange,
    marginLeft: 1,
    float: 'right',
    paddingRight: 18,
    paddingTop: 18
  },
  mobileNavList: {
    '@media (min-width: 575px)': {
      display: 'none'
    },
    height: 0,
    transition: 'height 0.2s',
    overflow: 'hidden',
    width: '100%'
  },
  showNav: {
    height: 115
  },
  hideNav: {
    height: 0
  },
  navArea: {
    display: 'block'
  },
  nav: {
    '@media (max-width: 575px)': {
      display: 'none'
    },
    display: 'inline-block',
    // display: 'flex',
    // flex: 1,
    fontWeight: 400,
    fontSize: 15,
    color: theme.colors.orange,
    paddingTop: 25,
    marginLeft: 20
  },
  navItem: {
    display: 'inline-block',
    paddingRight: 25,
    '@media (max-width: 575px)': {
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
    '@media (max-width: 575px)': {
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
  </div>
)

export default class Navigation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showNav: false
    }

    this.showMobileNav = this.showMobileNav.bind(this)
  }

  showMobileNav() {
    const showMobile = !this.state.showNav
    this.setState({ showNav: showMobile })
  }

  render() {

    return(
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
        <div style={ {clear: 'both'} }></div>
        <div
          className={ this.state.showNav ? c(styles.mobileNavList, styles.showNav) : styles.mobileNavList }>
          { navigationLinks }
        </div>
      </div>
    )
  }
}
