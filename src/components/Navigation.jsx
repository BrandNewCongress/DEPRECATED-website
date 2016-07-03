import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onTablet, onDesktop, onMobile } from '../media-queries'
import RaisedButton from 'material-ui/RaisedButton'

const c = StyleSheet.combineStyles
const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    marginRight: '1.5vw',
    [onTablet]: {
      display: 'none'
    }
  },
  tabletLogo: {
    ...theme.text.header,
    [onDesktop]: {
      display: 'none'
    },
    fontWeight: 400,
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    display: 'inline-block',
    verticalAlign: 'text-top',
    lineHeight: 0,
    [onMobile]: {
      fontSize: 16
    }
  },
  hamburger: {
    fill: 'white',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    lineHeight: 0
  },
  tabletNav: {
    [onDesktop]: {
      display: 'none'
    },
    display: 'inline-block',
    lineHeight: 0,
    backgroundColor: theme.colors.purple,
    marginLeft: 25
  },
  tabletNavList: {
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
    [onTablet]: {
      display: 'none'
    },
    display: 'inline-block',
    paddingTop: 30,
    marginLeft: 20,
    verticalAlign: 'top'
  },
  link: {
    ...theme.text.link,
    fontSize: 15,
    fontWeight: 400,
    color: theme.colors.darkGray,
    [onTablet]: {
      color: 'white',
      fontSize: 14,
      ':hover': {
        color: theme.colors.lightGray
      }
    },
    [onDesktop]: {
      display: 'inline-block',
      paddingBottom: 3,
      transition: 'border-bottom-width .05s',
      marginLeft: 11,
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
    paddingLeft: '0.7vw',
    [onTablet]: {
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
    paddingTop: 10,
    [onTablet]: {
      backgroundColor: theme.colors.purple,
      flexDirection: 'column',
      marginTop: 0
    }
  },
  contributeButton: {
    verticalAlign: 'top',
    marginTop: 30,
    marginRight: 25,
    display: 'inline-block',
    paddingLeft: 25,
    [onTablet]: {
      marginTop: 0,
      float: 'right'
    },
    [onMobile]: {
      fontSize: 14,
      float: 'right'
    }
  },
  viewport: {
    clear: 'both',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    [onTablet]: {
      width: '100%',
      paddingTop: 8,
      paddingBottom: 8
    }
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
  </div>
)

export default class Navigation extends Component {
  state = {
    showNav: false
  }

  showTabletNav = () => {
    const showTablet = !this.state.showNav
    this.setState({ showNav: showTablet })
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
          <div
            className={styles.tabletNav}
            onClick={() => this.showTabletNav()}
            onTouch={() => this.showTabletNav()}
          >
            {this.hamburgerIcon()}
          </div>
          <a href='/'>
            <div className={styles.logo}>
              <img
                height='75'
                src='/images/logo-horizontal.png'
                alt='Brand New Congress'
              />
            </div>
          </a>
          <div className={styles.tabletLogo}>
            Brand New Congress
          </div>
          <div className={styles.nav}>
            {navigationLinks}
          </div>
          <div className={styles.contributeButton}>
            <RaisedButton
              secondary
              label='Contribute'
              onTouchStart={() => {
                window.open('https://secure.actblue.com/contribute/page/brandnewcongress')
              }}
            />
          </div>
        </div>
        <div
          className={
          this.state.showNav ?
          c(styles.tabletNavList, styles.showNav) :
          styles.tabletNavList}
        >
          {navigationLinks}
        </div>
        <div style={{ clear: 'both' }}></div>
      </div>
    )
  }
}
