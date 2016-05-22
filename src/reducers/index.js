import events from './events'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export default combineReducers({
  events,
  routing: routerReducer
})
