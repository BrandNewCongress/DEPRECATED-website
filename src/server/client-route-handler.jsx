import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../routes'
import reducers from '../reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import React from 'react'
import App from '../containers/App'
import renderIndex from './render-index'
import { LookRoot, Presets, StyleSheet } from 'react-look'

const serverConfig = Presets['react-dom']

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

  serverConfig.userAgent = req.headers['user-agent']
  serverConfig.styleElementId = '_look'
  // Create a new Redux store instance
  const store = createStore(reducers, initialState)
  const html = renderToString(
    <Provider store={store}>
      <LookRoot config={serverConfig}>
        <App />
      </LookRoot>
    </Provider>
  )

  const css = StyleSheet.renderToString(serverConfig.prefixer)

  // Grab the initial state from our Redux store
  const finalState = store.getState()

  // Send the rendered page back to the client
  res.send(renderIndex(html, css, finalState))
}
export default clientRouteHandler
