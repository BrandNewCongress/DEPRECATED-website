import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onTablet, onMobile } from '../media-queries'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'

const c = StyleSheet.combineStyles
const styles = StyleSheet.create({
  logo: {
    display: 'inline-block',
    marginLeft: 25,
    float: 'left',
    [onTablet]: {
      display: 'none'
    }
  },
  tabletLogo: {
    ...theme.text.header,
    display: 'none',
    [onTablet]: {
      display: 'inline-block',
      fontWeight: 400,
      fontSize: 20,
      color: 'white',
      marginLeft: 10,
      verticalAlign: 'text-top',
      lineHeight: 0
    },
    [onMobile]: {
      fontSize: 14
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
    [onTablet]: {
      display: 'inline-block',
      lineHeight: 0,
      backgroundColor: theme.colors.purple,
      marginLeft: 25
    },
    display: 'none'
  },
  tabletNavList: {
    [onTablet]: {
      display: 'block'
    },
    height: 0,
    transition: 'height 0.2s',
    overflow: 'hidden',
    width: '100%',
    display: 'none'
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
    display: 'inline-block',
    paddingBottom: 3,
    transition: 'border-bottom-width .05s',
    ':hover': {
      color: theme.colors.darkGray,
      borderBottomWidth: '3px',
      borderBottom: '3px solid',
      borderBottomColor: theme.colors.orange
    },
    [onTablet]: {
      color: 'white',
      fontSize: 14,
      ':hover': {
        color: theme.colors.lightGray,
        border: 'none'
      },
      paddingBottom: 0,
      transition: 'none'
    }
  },
  navItem: {
    display: 'inline-block',
    paddingLeft: 25,
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
      paddingTop: 0
    }
  },
  fullNav: {
    float: 'right'
  },
  contributeButton: {
    verticalAlign: 'top',
    marginTop: 30,
    marginRight: 25,
    display: 'inline-block',
    paddingLeft: 25,
    [onTablet]: {
      marginTop: 0,
      fontSize: 14
    },
    [onMobile]: {
      display: 'none'
    }
  },
  mobileContributeButton: {
    display: 'none',
    [onMobile]: {
      ...theme.text.button,
      fontSize: 14,
      borderRadius: 5,
      fontWeight: 400,
      verticalAlign: 'top',
      marginTop: 5,
      marginRight: 15,
      marginLeft: 25,
      display: 'inline-block'
    }
  },
  viewport: {
    clear: 'both',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    [onTablet]: {
      paddingTop: 8,
      paddingBottom: 8
    }
  }
})

const navigationLinks = (
  <div className={styles.navArea}>
    <div className={styles.navItem}>
      <Link className={styles.link} to='/plan'>The Plan</Link>
    </div>
    <div className={styles.navItem}>
      <Link className={styles.link} to='/faq'>FAQ</Link>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/about'>About</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/teams'>Work With Us</a>
    </div>
    <div className={styles.navItem}>
      <a className={styles.link} href='/nominate'>Nominate a Candidate</a>
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
          <Link to='/home'>
            <div className={styles.logo}>
              <img
                height='75'
                src='/images/logo-horizontal.png'
                alt='Brand New Congress'
              />
            </div>
          </Link>
          <div className={styles.tabletLogo}>
            Brand New Congress
          </div>
          <div className={styles.fullNav}>
            <div className={styles.nav}>
              {navigationLinks}
            </div>
            <div className={styles.contributeButton}>
              <RaisedButton
                secondary
                label='Contribute'
                onTouchTap={() => {
                  window.open('https://secure.actblue.com/contribute/page/brandnewcongress', '_blank')
                }}
              />
            </div>
            <div
              onClick={() => window.open('https://secure.actblue.com/contribute/page/brandnewcongress', '_blank')}
              className={styles.mobileContributeButton}
            >
              Donate
            </div>
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
