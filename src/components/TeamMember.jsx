import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onTablet, onMobile } from '../media-queries'

const styles = StyleSheet.create({
  wrapper: {
    ...theme.layouts.singleColumn,
    display: 'table',
    marginTop: 20,
    marginBottom: 20,
    [onMobile]: {
      width: '100%'
    }
  },
  thumbnail: {
    display: 'table-cell',
    borderRadius: '50%',
    width: 180,
    [onMobile]: {
      width: 140,
      float: 'right',
      display: 'inline',
      margin: '0 0 20px 20px'
    }
  },
  copyColumn: {
    display: 'table-cell',
    verticalAlign: 'top',
    paddingLeft: 20,
    [onMobile]: {
      display: 'inline',
      padding: 0
    }
  },
  name: {
    fontSize: '120%',
    margin: 0
  },
  location: {
    margin: 0
  }
})

export default ({teamMember: {name, location, headshot, copy}}) => (
    <div className={styles.wrapper}>
      <img src={`/static-assets/img/endorsers/${headshot}`} className={styles.thumbnail} />
      <div className={styles.copyColumn}>
        <h4 className={styles.name}>{name}</h4>
        <h5 className={styles.location}>{location}</h5>
        <p>{copy}</p>
      </div>
    </div>
)
