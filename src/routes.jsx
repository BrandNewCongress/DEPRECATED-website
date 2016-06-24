import { Route } from 'react-router'
import App from './containers/App'
import MarkdownPage from './containers/MarkdownPage'
import React from 'react'

const routes = (
    <Route path="/">
      <Route path='/tour' component={App} />
      <Route path='/eventsteam' component={MarkdownPage} />
    </Route>
)
export default routes
