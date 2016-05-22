import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import log from './log'
import errorCatcher from './error-catcher'
import routes from '../routes'
import { configureStore } from '../store'

window.log = log
window.onerror = errorCatcher

const store = configureStore(browserHistory, window.INITIAL_STATE)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('mount')
)
