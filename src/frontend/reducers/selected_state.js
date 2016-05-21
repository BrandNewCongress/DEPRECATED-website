import { SELECT_STATE } from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case SELECT_STATE :
      return action.payload
  }
  return state
}
