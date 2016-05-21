export const SELECT_STATE = 'SELECT_STATE'
export const SUBMIT_RSVP = 'SUBMIT_RSVP'
export const SHOW_FORM = 'SHOW_FORM'

export function selectState(selectedState) {
  return {
    type: SELECT_STATE,
    payload: selectedState
  }
}

export function submitRsvp(props) {
  console.log('Submit RSVP', props)

  return {
    type: SUBMIT_RSVP,
    payload: { event_id: props.event_id }
  }
}

// eventId, firstname, lastname, email, phone
export function showForm(show = false, event) {
  console.log(show, event)
  return {
    type: SHOW_FORM,
    payload: {
      showForm: show,
      chosenEvent: event
    }
  }
}
