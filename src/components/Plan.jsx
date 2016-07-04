import React from 'react'
import theme from '../theme'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  header: { ...theme.text.header },
  body: { ...theme.text.body },
  contentContainer: { ...theme.layouts.singleColumn },
  twoColumnContainer: { ...theme.layouts.multiColumn.container },
  flexColumn: { ...theme.layouts.multiColumn.flexColumn }
})

const Plan = () => (
  <div className={styles.twoColumnContainer}>
    <div>
      <div>The Goal</div>
      <div>How We Accomplish It</div>
      <div>The Timeline</div>
      <div>FAQ</div>
    </div>
    <div className={styles.flexColumn}>
      Hi
    </div>
  </div>
)

export default Plan
