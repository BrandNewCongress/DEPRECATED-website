import { STATE_SELECTED } from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case STATE_SELECTED:
      return action.payload
    default:
      return state
  }
}
