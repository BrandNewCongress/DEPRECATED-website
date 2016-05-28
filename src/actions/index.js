export const SELECT_STATE = 'SELECT_STATE'

export function selectState(state) {
  return {
    type: SELECT_STATE,
    payload: state
  }
}
