import { Route } from 'react-router'
import Home from './components/Home'
import Call from './components/Call'
import App from './components/App'
import React from 'react'
import HostCall from './components/HostCall'
import StaticSiteRenderer from './containers/StaticSiteRenderer'
import TrumpPetition from './components/TrumpPetition'

export default (staticSite) => {
  let childRoutes = [
    <Route path='home' component={Home} />,
    <Route path='call' component={Call} />,
    <Route path='hostcall' component={HostCall} />,
    <Route path='petitions/trump-denounce-hate' component={TrumpPetition} />
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
