export const SELECT_STATE = 'SELECT_STATE'

export function selectState(us_state) {
  return {
    type: SELECT_STATE,
    payload: us_state
  }
}
