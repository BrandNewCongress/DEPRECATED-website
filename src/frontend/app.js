import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import log from './log'
import reducers from './reducers'
import App from './components/App'

window.log = log
window.onerror = (msg, file, line, col, error) => {
  if (!error) {
    log.error('Uncaught exception with null error object')
    return
  }

  log.error(error)

  if (window.location.href.split('/')[2].split(':')[0] !== 'localhost') {
    setTimeout(() => {
      alert(`Whoops! Something went wrong. We\'re looking into it,
        but in the meantime please refresh your browser.`)
      document.location.reload(true)
    }, 2000)
  }
}

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('mount')
)
