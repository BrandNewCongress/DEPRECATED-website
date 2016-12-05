import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import Signup from './Signup'
import { onTablet, onMobile } from '../media-queries'
import { Link } from 'react-router'

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
    ...theme.text.body,
    paddingBottom: 20
  },
  centeredBody: {
    ...theme.text.body,
    textAlign: 'center'
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
  bold: {
    fontWeight: 800
  },
  buttonText: {
    marginLeft: 15,
    [onMobile]: {
      display: 'none'
    }
  },
  button: {
    ...theme.text.button,
    marginBottom: 20,
    marginRight: 20,
    textDecoration: 'none',
    paddingBottom: 5,
    paddingTop: 5,
    lineHeight: '1.5em',
    [onMobile]: {
      display: 'block'
    }
  },
  link: {
    ...theme.text.link
  }
})

export default class TrumpPetition extends React.Component {
  renderContent() {
    return (
      <div>
        <div className={styles.body}>President-elect Trump, your words during your campaign have sparked an outbreak of hate crimes across the country -- against Muslims, people of color, immigrants, women, LGBTQ people and disabled people. Since your election victory, these crimes have spiraled out of control with perpetrators often explicitly committing the crimes in your name, citing your example.</div>
        <div className={styles.body}>For the sake of human life, recognize what’s at stake. Look at the pain and suffering caused just within the first 48-hours of your America <a href="https://twitter.com/ShaunKing" className={styles.link}>on this twitter feed</a>. Whether you would like to admit it or not, your words have incited violence against fellow Americans. We are calling on all Americans, whether they voted for Trump or not, to ask President-elect Trump to publicly denounce these hate crimes.</div>
      </div>
    )
  }

  renderPledge() {
    return (
      <div>Whether or not I voted for Donald Trump, <span className={styles.bold}>I want Donald Trump to denounce the hate crimes being committed in his name</span></div>
    )
  }

  renderThankYouBody() {
    return (
      <div>
        <div className={styles.body}>
          This is a petition by Brand New Congress. Brand New Congress is an effort to rebuild our economy and rid our government of corruption by recruiting and running 400+ extraordinary ordinary Americans for Congress in 2018. To learn more about us, <Link className={styles.link} to='/home'>visit our homepage</Link>.
        </div>
        <div className={styles.body}>
          Brand New Congress is fighting the establishment and we are powered by donations and social media shares from people like you. We are not backed by billionaires. And WE are not billionaires! Please consider <a href='https://secure.actblue.com/contribute/page/bncdec' className={styles.link} target='_blank'>donating even $3</a> so we can continue pushing for radical change, and please tell others about this petition to put pressure on Donald Trump now before things get out of hand.
        </div>
        <div className={styles.centeredBody}>
          <a className={styles.button} href='http://www.facebook.com/sharer/sharer.php?u=https://brandnewcongress.org/petitions/trump-denounce-hate&title=President-elect+Trump:+Tell+those+committing+hate+crimes+in+your+name+to+stop' target='_blank'>
            <span className='fa fa-facebook' />
            <span className={styles.buttonText}>Share on Facebook</span>
          </a>
          <a className={styles.button} href='http://twitter.com/intent/tweet?status=President-elect+Trump:+Tell+those+committing+hate+crimes+in+your+name+to+stop: https://brandnewcongress.org/petitions/trump-denounce-hate' target='_blank'>
            <span className='fa fa-twitter' />
            <span className={styles.buttonText}>Share on Twitter</span>
          </a>
          <a href='https://secure.actblue.com/contribute/page/bncsignup' target='_blank' className={styles.button}>
            <span className='fa fa-usd' />
            <span className={styles.buttonText}>Donate</span>
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>President-elect Trump: Tell those committing hate crimes in your name to stop</div>
          <div className={styles.innerContainer}>
            <Signup
              content={this.renderContent()}
              pledge={this.renderPledge()}
              submitLabel='Add your name'
              thankYouHeader='Thank you for your pledge.'
              thankYouBody={this.renderThankYouBody()}
              showName
            />
          </div>
        </div>
      </div>
    )
  }
}
