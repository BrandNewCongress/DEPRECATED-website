import { Route } from 'react-router'
import Tour from './containers/Tour'
import Home from './components/Home'
import App from './components/App'
import React from 'react'
import StaticSiteRenderer from './containers/StaticSiteRenderer'

export default (staticSite) => {
  let childRoutes = [
    <Route path='tour' component={Tour} />,
    <Route path='home' component={Home} />
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
