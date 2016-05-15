import React from 'react'
import Navigation from './Navigation'
import OpenStreetMap from './OpenstreetMap'
import WelcomeMessage from './WelcomeMessage'

export default () => (
  <div className='container'>
    <div className='row' id='navigation-area'>
      <Navigation />
    </div>
    <div className='row'>
      <WelcomeMessage />
    </div>
    <div className='row' style={{ position: 'relative' }}>
      <OpenStreetMap />
    </div>
  </div>
)

