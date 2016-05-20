import { SHOW_FORM } from '../actions/index'

export default function (state = {}, action) {

  console.log('!!!!!', action)
  if (action.type == SHOW_FORM && action.payload.chosenEvent) {

    return action.payload.chosenEvent
  }
  return state
}
