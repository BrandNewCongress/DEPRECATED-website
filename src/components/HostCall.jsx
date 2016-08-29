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
      <div className={styles.header}>Learn about hosting an event</div>
      <div className={styles.body}>
        Join a Brand New Congress Host event call to learn more about hosting an event with Brand New Congress and find out how to organize locally!
      </div>
      <ConferenceCallsList
        maxSignups={20}
        nameFilter='event host'
      />
    </div>
  </div>
)
