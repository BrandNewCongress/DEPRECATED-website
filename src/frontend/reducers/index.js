import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import events from './events'
import states from './states'
import selected_state from './selected_state'
import attending_events from './attending_events'
import is_form_shown from './is_form_shown'
import chosen_event from './chosen_event'

export default {
  events,
  states,
  is_form_shown,
  attending_events,
  chosen_event,
  form: formReducer
};
