import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import Signup from './Signup'
import { onTablet } from '../media-queries'

const styles = StyleSheet.create({
  content: {
    position: 'relative'
  },
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
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30
  },
  body: {
    display: 'block',
    paddingBottom: 30,
    lineHeight: '1.5em'
  },
  header: {
    ...theme.text.header,
    textAlign: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    color: theme.colors.purple,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
    borderBottom: `1px solid ${theme.colors.lightGray}`
  },
  link: {
    ...theme.text.link,
    color: theme.colors.orange,
    fontWeight: 600
  }
})

export default class TrumpPetition extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>President-elect Trump: Tell those committing hate crimes in your name to stop</div>
          <div className={styles.innerContainer}>
            <Signup
              content={this.renderContent()}
              pledge={this.renderPledge()}
            />
          </div>
        </div>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <div className={styles.body}>President-elect Trump, your words during your campaign have sparked an outbreak of hate crimes across the country -- against Muslims, people of color, immigrants, women, LGBTQ people and disabled people. Since your election victory, these crimes have spiraled out of control with perpetrators often explicitly committing the crimes in your name, citing your example.</div>
        <div className={styles.body}>For the sake of human life, recognize what’s at stake. Look at the pain and suffering caused just within the first 48-hours of your America <a href="https://twitter.com/ShaunKing" className={styles.link}>on this twitter feed</a>. Whether you would like to admit it or not, your campaign has incited violence against fellow Americans.</div>
      </div>
    )
  }

  renderPledge() {
    return (
      <div>Whether or not I voted for Donald Trump, I want Donald Trump to denounce the hate crimes being committed in his name</div>
    )
  }
}
