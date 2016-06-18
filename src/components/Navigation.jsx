import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onMobile, onDesktop } from '../media-queries'

const c = StyleSheet.combineStyles
const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    backgroundColor: theme.colors.orange,
    padding: '10px 5px 5px',
    width: 75,
    fontWeight: 600,
    [onMobile]: {
      width: 'auto'
    },
    [onDesktop]: {
      padding: '6px 5px 5px',
      width: 105
    }
  },
  hamburger: {
    fill: 'white',
    cursor: 'pointer'
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
    [onMobile]: {
      fontSize: 20
    },
    [onDesktop]: {
      fontSize: 17,
      lineHeight: '17px',
      textAlign: 'left'
    }
  },
  mobileNav: {
    [onDesktop]: {
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
    [onDesktop]: {
      display: 'none'
    },
    height: 0,
    transition: 'height 0.2s',
    overflow: 'hidden',
    width: '100%'
  },
  showNav: {
    height: 181
  },
  hideNav: {
    height: 0
  },
  navArea: {
    display: 'block'
  },
  nav: {
    [onMobile]: {
      display: 'none'
    },
    display: 'inline-block',
    paddingTop: 30,
    marginLeft: 20,
    verticalAlign: 'top'
  },
  link: {
    ...theme.link,
    border: 'none',
    fontSize: 15,
    fontWeight: 400,
    color: theme.colors.darkGray,
    [onMobile]: {
      color: 'white',
      fontSize: 14,
      ':hover': {
        color: theme.colors.lightGray
      }
    },
    [onDesktop]: {
      display: 'inline-block',
      borderBottom: '1px solid',
      borderBottomColor: theme.colors.orange,
      paddingBottom: 3,
      transition: 'border-bottom-width .05s',
      marginLeft: 11,
      fontFamily: 'Open sans',
      ':hover': {
        color: theme.colors.darkGray,
        borderBottomWidth: '3px',
        borderBottom: '3px solid',
        borderBottomColor: theme.colors.orange
      }
    }
  },
  navItem: {
    display: 'inline-block',
    paddingRight: 25,
    [onMobile]: {
      display: 'block',
      paddingLeft: 9,
      paddingTop: 2,
      paddingBottom: 4,
      borderLeft: '4px white solid',
      marginLeft: 15,
      marginTop: 4
    }
  },
  container: {
    display: 'flex',
    width: '100%',
    [onMobile]: {
      backgroundColor: theme.colors.orange,
      flexDirection: 'column'
    },
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
      <a className={styles.link} href='/tour'>The Tour</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/home'>The Plan</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/about'>Who's Involved</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/teams'>Join A Team</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} target='_blank' href='http://berniesanders.com/issues'>
      Issues
      </a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='https://secure.actblue.com/contribute/page/brandnewcongress' target='_blank'>Contribute</a>
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

  hamburgerIcon() {
    const svgPath = [
      'M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z',
      'M28,14H4c-1.104,0-2,0.896-2,2', 's0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z',
      'M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2', 'S29.104,22,28,22z'
    ].join(' ')

    return (
      <svg
        height='32px' id='Layer_1' className={styles.hamburger} version='1.1'
        viewBox='0 0 32 32' width='32px'
      ><path d={svgPath} /></svg>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.viewport}>
          <a href='/'>
            <div className={styles.logo}>
              <div className={styles.logoText}>
                Brand New Congress
              </div>
            </div>
          </a>
          <div
            className={styles.mobileNav}
            onClick={() => this.showMobileNav()}
            onTouch={() => this.showMobileNav()}
          >
            {this.hamburgerIcon()}
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
