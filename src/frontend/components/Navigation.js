import React from 'react'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#f16432',
    padding: '10px 5px 5px',
    width: 110,
    marginTop: 5,
    float: 'left'
  },
  logoText: {
    color: 'white',
    padding: '5px 5px 5px 10px',
    marginLeft: 10,
    border: 'solid white',
    borderWidth: '0 0 0 4px',
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    fontFamily: 'Open Sans'

  },
  navBar: {
    float: 'left'
  }
})
{ /* <div>
  <div>
    We're coming to a city near you
  </div>
  <div>
    RSVP below, and let's get together to elect a Brand New Congress that works for all. Can't make it? Get involved anyway.
  </div>
</div>*/ }
export default () => (
  <div className='Navigator container'>
    <div className={styles.logo}>
      <div className={styles.logoText}>
        Brand New Congress
      </div>
    </div>

    <div className={styles.navBar}>

    </div>
  </div>
)
