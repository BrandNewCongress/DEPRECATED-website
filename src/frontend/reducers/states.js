import { SELECT_STATE } from '../actions'
import initialStates from '../data/states'

function getInitialStates() {
  return initialStates.map((aState) => ({
    ...aState,
    selected: false
  }))
}

export default function (state = getInitialStates(), action) {
  switch (action.type) {
    case SELECT_STATE:
      return state.map((aState) => {
        if (aState.abbreviation === action.state) {
          return {
            ...aState,
            selected: true
          }
        }
        return {
          ...aState,
          selected: false
        }
      })
    default:
      return state
  }
}
