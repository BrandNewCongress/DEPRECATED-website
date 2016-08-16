import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import ConferenceCallsList from './ConferenceCallsList'

const styles = StyleSheet.create({
  content: {
    ...theme.layouts.singleColumn
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30
  },
  header: {
    ...theme.text.header,
    marginBottom: 10,
    marginTop: 10
  },
  link: {
    ...theme.text.link
  },
  emphasis: {
    ...theme.text.body,
    fontWeight: 600
  },
  body: {
    ...theme.text.body,
    marginBottom: 10
  }
})

export default () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.header}>Welcome to the Call Team page!</div>
      <div className={styles.body}>
        Brand New Congress needs <span className={styles.emphasis}>an army of callers</span> to have one-on-one conversation with organizers, volunteers and activists to esure they have a path to becoming involved in electing a Brand New Congress.
      </div>
      <div className={styles.emphasis}>
        If you haven't attended an orientation call you can <a href='/call' className={styles.link}>sign up here</a> or read more below.
      </div>
      <div className={styles.header}>
        How to join the Call Team
      </div>
      <div className={styles.emphasis}>
        Click below to get your unique call-in number and pin to join any of the following calls:
      </div>
      <ConferenceCallsList
        maxSignups={25}
        nameFilter='Call Team'
      />
      <div>
        Please look over the <a href='/goal' className={styles.link}>goal</a>, <a href='/plan' className={styles.link}>plan</a>, and <a href='/faq' className={styles.link}>faq</a> below before the call!
      </div>
    </div>
  </div>
)
