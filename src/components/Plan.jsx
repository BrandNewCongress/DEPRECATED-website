import React from 'react'
import theme from '../theme'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  header: { ...theme.text.header },
  body: { ...theme.text.body },
  contentContainer: { ...theme.layouts.singleColumn },
  twoColumnContainer: { ...theme.layouts.multiColumn.container },
  sideBar: { ...theme.layouts.multiColumn.flexColumn }
})

const Plan = () => (
  <div className={styles.contentContainer}>
    <div className={styles.contentContainer}>
      <div className={styles.header}>
        What's the timeline? And how is this actually going to work?
      </div>
      <div className={styles.body}>
        Trying to replace virtually everyone in Congress in one fell swoop may sound like a daunting project, but we believe there's now a way to do this by running a single unified campaign that all of America can get excited about and participate in.
      </div>
    </div>
    <div className={styles.twoColumnContainer}>
      <div>
        April 2016
      </div>
      <div>
        <div>
          Propose this idea to the Bernie movement and to America
        </div>
        <div>
          We're pitching this idea to volunteers in the Bernie movement, and getting to work with people who like it.
        </div>
      </div>
    </div>
  </div>
)

export default Plan
