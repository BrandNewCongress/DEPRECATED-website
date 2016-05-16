// Action Types
export const SELECT_STATE = 'SELECT_STATE'

// Action Creators
export function selectState(state) {
  return { type: SELECT_STATE, state }
}
