import { SUBMIT_RSVP } from '../actions/index'

export default function (state = [], action) {
  if (action.type == SUBMIT_RSVP) {
    return [...state, action.payload.event_id]
  }

  return state
}
