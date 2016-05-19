import axios from 'axios';

export const STATE_SELECTED = 'STATE_SELECTED',
             SUBMIT_RSVP = 'SUBMIT_RSVP',
             SHOW_FORM = 'SHOW_FORM';

export function selectState(selectedState) {

  return {
    type: STATE_SELECTED,
    payload: selectedState
  }

}

export function submitRsvp(props) {
  console.log("Submit RSVP", props);

  return {
    type: SUBMIT_RSVP,
    payload: { event_id: props.event_id }
  }
}

//eventId, firstname, lastname, email, phone
export function showForm(show = false, event) {
  console.log(show, event);
 return {
   type: SHOW_FORM,
   payload: {
     showForm: show,
     chosenEvent: event
   }
 }
}
