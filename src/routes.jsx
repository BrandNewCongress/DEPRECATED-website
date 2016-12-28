import { Route } from 'react-router'
import Home from './components/Home'
import Call from './components/Call'
import App from './components/App'
import About from './components/About'
import React from 'react'
import HostCall from './components/HostCall'
import StaticSiteRenderer from './containers/StaticSiteRenderer'
import NominationForm from './components/NominationForm'

export default (staticSite) => {
  let childRoutes = [
    <Route path='home' key='home' component={Home} />,
    <Route path='about' key='about' component={About} />,
    <Route path='call' key='call' component={Call} />,
    <Route path='hostcall' key='host' component={HostCall} />,
    <Route path='submit-nominee' key='submit-nominee' component={NominationForm} />
  ]

  Object.keys(staticSite).forEach((route) => {
    childRoutes.push(<Route
      key={route}
      path={route}
      component={StaticSiteRenderer}
    />)
  })

  return (
    <Route path='/' component={App}>
      {childRoutes}
    </Route>
  )
}
