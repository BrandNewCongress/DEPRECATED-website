import { SHOW_FORM } from '../actions/index';

export default function(state = false, action) {
  if ( action.type == SHOW_FORM) { return action.payload.showForm; }
  return state;
}
