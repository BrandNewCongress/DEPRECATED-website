import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes'
import { Provider } from 'react-redux'
import React from 'react'
import renderIndex from './render-index'
import { configureStore } from '../store'
import { LookRoot, Presets, StyleSheet } from 'react-look'

function clientRouteHandler(req, res) {
  const initialState = {
    events: [{
      Date: 'Jun 15',
      City: 'San Bernardino',
      State: 'California',
      StateAbbrev: 'CA',
      Zip: 92401,
      Latitude: 34.0971415,
      Longitude: -117.2940637,
      Type: 'R&D phase (AKA Cookout Phase)'
    }]
  }
  const serverConfig = Presets['react-dom']
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory, initialState)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      serverConfig.userAgent = req.headers['user-agent']
      serverConfig.styleElementId = '_look'
      const html = renderToString(
        <Provider store={store}>
          <LookRoot config={serverConfig}>
            <RouterContext {...renderProps} />
          </LookRoot>
        </Provider>
      )
      const css = StyleSheet.renderToString(serverConfig.prefixer)
      res.send(renderIndex(html, css, store))
    } else {
      res.status(404).send('Not found')
    }
  })
}
export default clientRouteHandler
