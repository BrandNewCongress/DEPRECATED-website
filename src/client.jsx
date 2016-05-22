import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import reducers from './reducers'
import log from './client-lib/log'
import errorCatcher from './client-lib/error-catcher'
import routes from './routes'

window.log = log
window.onerror = errorCatcher

const store = createStore(reducers)
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('mount')
)
