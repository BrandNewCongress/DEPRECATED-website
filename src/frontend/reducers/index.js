import { reducer as formReducer } from 'redux-form'
import events from './events'
import selected_state from './selected_state'
import is_form_shown from './is_form_shown'
import chosen_event from './chosen_event'

export default {
  events,
  is_form_shown,
  chosen_event,
  form: formReducer
}
