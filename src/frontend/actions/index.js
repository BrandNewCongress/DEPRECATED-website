export const STATE_SELECTED = 'STATE_SELECTED'
export const SUBMIT_RSVP = 'SUBMIT_RSVP'
export function selectState(selectedState) {
  return {
    type: STATE_SELECTED,
    payload: selectedState
  }
}

export function submitRsvp() {
  return {
    type: SUBMIT_RSVP,
    payload: 'FORM'
  }
}

// eventId, firstname, lastname, email, phone
// export function rsvpEvent(eventId, firstname, lastname, email, phone) { }
