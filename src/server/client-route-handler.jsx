import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes'
import { Provider } from 'react-redux'
import React from 'react'
import renderIndex from './render-index'
import { configureStore } from '../store'
import { LookRoot, Presets, StyleSheet } from 'react-look'
import axios from 'axios'
import Baby from 'babyparse'
import wrap from './wrap'
import fs from 'fs'

const Zips = Baby.parseFiles(`${__dirname}/../data/zip-codes.csv`, { header: true }).data
const ZipCodeDB = {}
Zips.forEach((row) => {
  ZipCodeDB[row.zip] = row
})
let assetMap = {
  bundle: { js: '/assets/bundle.js' }
}
if (process.env.NODE_ENV === 'production') {
  assetMap = JSON.parse(fs.readFileSync(process.env.ASSETS_MAP_FILE))
}

export default wrap(async (req, res) => {
  const dataRequest = await axios.get('https://docs.google.com/spreadsheets/d/1KgT7FWC-ow-yLbVSe1jriImGFE_SGRiVdq9t9khuH_4/pub?gid=0&single=true&output=csv')
  const events = Baby.parse(dataRequest.data, { header: true })
  .data
  .map((event) => {
    const zipInfo = ZipCodeDB[event.Zip]
    return {
      city: event.City,
      state: event.State,
      zip: event.Zip,
      date: event.Date,
      rsvpUrl: event['NB Event Link'],
      latitude: zipInfo.latitude,
      longitude: zipInfo.longitude
    }
  }).sort((a, b) => new Date(a.date) - new Date(b.date))

  const serverConfig = Presets['react-dom']
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory, { events })
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

      res.send(renderIndex(html, css, assetMap, store))
    } else {
      res.status(404).send('Not found')
    }
  })
})
