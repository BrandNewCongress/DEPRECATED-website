import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    paddingTop: 20,
    fontFamily: theme.fontFamily,
    fontWeight: 300
  },
  link: { ...theme.link },
  shareIcon: {
    border: 'none',
    fontSize: '3em',
    color: theme.colors.darkGray,
    ':hover': {
      color: theme.colors.orange
    },
    paddingRight: 20,
    paddingLeft: 20
  },
  copyright: {
    fontSize: '0.5em',
    paddingBottom: 20
  },
  questions: {
    marginBottom: 11,
    fontSize: 16
  },
  highlight: {
    color: theme.colors.orange,
    fontWeight: 600,
    fontSize: 32,
    marginTop: 22,
    marginBottom: 11
  }
})

export default () => (
  <div className={styles.container}>
    <a href='http://twitter.com/intent/tweet?status=Sign+up+to+help+create+a Brand+New+Congress: http://brandnewcongress.org' title='Share on Twitter' target='_blank' className={styles.shareIcon}>
      <span className='fa fa-twitter' />
    </a>
    <a href='http://www.facebook.com/sharer/sharer.php?u=http://brandnewcongress.org&title=Brand+New+Congress' title='Share on Facebook' className={styles.shareIcon}>
      <span className='fa fa-facebook'></span>
    </a>
    <a href='http://www.reddit.com/submit?url=http://brandnewcongress.org&title=Brand+New+Congress' title='Share on Reddit' target='_blank' className={styles.shareIcon}>
      <span className='fa fa-reddit-alien'></span>
    </a>
    <a href='https://secure.actblue.com/contribute/page/brandnewcongress' target='_blank' className={styles.shareIcon}>
      <span className='fa fa-usd' aria-hidden='true'></span>
    </a>
    <div className={styles.highlight}>Brand New Congress
    </div>
    <div className={styles.questions}>
      Questions, comments? Email:
      <a href='mailto:us@brandnewcongress.org' className={styles.link}>us@brandnewcongress.org</a>
    </div>
    <div className={styles.copyright}>
      Copyright ©2016 Brand New Congress.<br />
      All rights reserved.
    </div>
  </div>
)
