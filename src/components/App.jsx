import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

const App = ({ children }) => (
  <div>
    <Navigation />
    {children}
    <Footer />
  </div>
)

App.propTypes = {
  children: React.PropTypes.object
}

export default App
