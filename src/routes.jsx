import { Route } from 'react-router'
import Tour from './containers/Tour'
import Home from './components/Home'
import Plan from './components/Plan'
import App from './components/App'
import React from 'react'
import MarkdownPage from './components/MarkdownPage'

export default (staticSite) => {
  let childRoutes = [
    <Route path='tour' component={Tour} />,
    <Route path='plan' component={Plan} />,
    <Route path='home' component={Home} />
  ]

  Object.keys(staticSite).forEach((route) => {
    childRoutes.push(<Route key={route} path={route} component={MarkdownPage} />)
  })

  return (
    <Route path='/' component={App}>
      {childRoutes}
    </Route>
  )
}
