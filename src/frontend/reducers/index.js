import { combineReducers } from 'redux'
import EventsReducer from './reducer_events'
import StatesReducer from './reducer_states'
import SelectedStateReducer from './reducer_selected_state'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  events: EventsReducer,
  states: StatesReducer,
  selectedState: SelectedStateReducer,
  noEventsOnState: false,
  form: formReducer
})

export default rootReducer
