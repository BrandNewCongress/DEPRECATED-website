import { Route } from 'react-router'
import Tour from './containers/Tour'
import Home from './components/Home'
import Plan from './components/Plan'
import App from './components/App'
import React from 'react'

const routes = (
  <Route path='/' component={App}>
    <Route path='tour' component={Tour} />
    <Route path='plan' component={Plan} />
    <Route path='home2' component={Home} />
  </Route>
)
export default routes
