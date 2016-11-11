import React from 'react'
import Signup from './Signup'
import Press from './Press'
import { StyleSheet } from 'react-look'
import { onTablet } from '../media-queries'
import theme from '../theme'

const styles = StyleSheet.create({
  innerContainer: {
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
  },
  bold: {
    fontWeight: 800
  },
  header: {
    ...theme.text.header,
    paddingBottom: 20,
    color: theme.colors.orange
  },
  secondaryHeader: {
    ...theme.text.header,
    paddingBottom: 20,
    color: theme.colors.purple
  },
  body: {
    ...theme.text.body,
    paddingBottom: 20
  }
})

class Home extends React.Component {
  renderSignupContent() {
    return (
      <div>
        <div className={styles.header}>Welcome to the resistance.
        </div>
        <div className={styles.body}>
          We had a two party system. That system let the people down so badly that a reality TV star mopped the floor with BOTH parties while turning America against itself. Now it’s truly time that We the People take back our government.
        </div>
        <div className={styles.secondaryHeader}>
          We're here to take back the country.
        </div>
        <div className={styles.body}>
          We’re recruiting and running 400+ candidates as a single, unified campaign for Congress in 2018. They will pass a radical and practical plan to get everyone good jobs, get incomes rising again and rid our government of corruption. Americans are hungry to rebuild their country together with everyone from every community, region, race and culture. <span className={styles.leadIn}>Step 1 is electing a Brand New Congress in 2018.</span>
        </div>
      </div>
    )
  }

  renderPledge() {
    return (
      <div>
        <span className={styles.bold}>Add your name:</span> I am not giving up! I will support candidates of integrity for 2018 who pledge to rebuild the economy and fix our broken system.
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Signup
            content={this.renderSignupContent()}
            pledge={this.renderPledge()}
          />
        </div>
        <div className={styles.innerContainer}>
          <Press />
        </div>
      </div>
    )
  }
}

export default Home
