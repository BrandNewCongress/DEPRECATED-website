import { SELECT_STATE } from '../actions'
export default function (state = {}, action) {
  if (action.type === SELECT_STATE) {
    return action.payload
  }
  return state
}
