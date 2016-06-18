import { Route } from 'react-router'
import Tour from './containers/Tour'
import Home from './components/Home'
import App from './components/App'
import React from 'react'

const routes = (
  <Route path='/' component={App}>
    <Route path='tour' component={Tour} />
    <Route path='home' component={Home} />
  </Route>
)
export default routes
