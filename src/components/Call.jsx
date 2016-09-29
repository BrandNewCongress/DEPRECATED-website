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
    marginBottom: 10
  },
  body: {
    ...theme.text.body
  }
})

export default () => (
  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.header}>Learn how to find candidates</div>
      <div className={styles.body}>
        Brand New Congress wants to recruit over 400 extraordinary ordinary Americans to run for Congress in 2018. We need your help to find these people. Join us on one of the calls listed below to hear more about who we're looking for and how you can help.
      </div>
      <ConferenceCallsList
        maxSignups={2000}
        nameFilter='BNC Candidate Nomination'
      />
    </div>
  </div>
)
