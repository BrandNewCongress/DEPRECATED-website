import { Route } from 'react-router'
import Tour from './containers/Tour'
import App from './components/App'
import React from 'react'

const routes = (
  <Route path='/' component={App}>
    <Route path='tour' component={Tour} />
  </Route>
)
export default routes
