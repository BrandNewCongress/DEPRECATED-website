/*************************/
/* THIS FILE IS NOT USED */
/*************************/
import React from 'react'
import { reduxForm } from 'redux-form'

// import action
import { submitRsvp, showForm } from '../../actions/index'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const RSVP_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=rapicastillo'

class RSVPForm extends React.Component {
  constructor(props) {
    super(props)

    this.event_id = 0
    this.state = {
      event_id: this.props.EventId,
      firstname: '',
      lastname: '',
      email: '',
      phone_number: '',
      formSubmitted: false
    }
  }

  componentDidMount() {
    console.log('XXXX', this.props)
    this.setState({ event_id: this.props.chosen_event.EventId })
    this.props.fields.event_id.onChange(this.props.chosen_event.EventId)
  }

  buildThankYou() {
    return (
      <div className='row'>
        <h5>Thank you for signing up!</h5>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps)
    if (prevProps.chosen_event.EventId !== this.props.chosen_event.EventId) {
      console.log('Event ID Updated')
      this.setState({ event_id: this.props.chosen_event.EventId })
      this.props.fields.event_id.onChange(this.props.chosen_event.EventId)
    }
  }

  render() {

    // let date = moment(this.props.eventDate).format("MMM DD [@ 7PM]"); // h:mm a
    // let eventId = this.props.eventId || '';

    const { fields: { event_id, firstname, lastname, email, phone_number }, handleSubmit } = this.props

    console.log(this.props)
    if (this.props.attending_events.indexOf(this.props.chosen_event.EventId) >= 0) {
      return (
        <div className='RSVPForm'>
          <div className='RSVPForm-container'>
            <a href='javascript: void(null)' onClick={(e) => { this.props.showForm(false) }} className='close-button'>x</a>
            <h1>{this.props.chosen_event.City}, {this.props.chosen_event.State}</h1>
            <h2>{this.props.chosen_event.EventDate}</h2>
            <div>
              <p>You are attending this event!</p>
              <br />
            </div>
            <a href='#' className='btn btn-primary'>Donate</a>
          </div>
        </div>
      )
    }

    return (
      <div className='RSVPForm'>
        <div className='RSVPForm-container'>
          <a href='javascript: void(null)' onClick={(e) => { this.props.showForm(false) }} className='close-button'>x</a>
          <h1>{this.props.chosen_event.City || ''}, {this.props.chosen_event.State || ''}</h1>
          <h2>{this.props.chosen_event.EventDate || ''}</h2>
          <form className='form' onSubmit={handleSubmit(this.props.submitRsvp)}>
            <div>
              <input type='hidden' {...event_id} value={this.state.event_id} />
              <label>First Name</label>
              <div className='form-group'>
                <input type='text' className='form-control' placeholder='First Name' {...firstname} />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div className='form-group'>
                <input type='text' className='form-control' placeholder='Last Name' { ...lastname } />
              </div>
            </div>
            <div>
              <label>Email</label>
              <div className='form-group'>
                <input type='email' className='form-control' placeholder='Email' {...email} />
              </div>
            </div>
            <div>
              <label>Phone Number</label>
              <div className='form-group'>
                <input type='text' className='form-control' placeholder='Phone Number' {...phone_number} />
              </div>
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary'>RSVP</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  // render() {
  //   // const initialState = {key: 'value'};
  //   // const store = createStore(initialState);
  //
  //   return (
  //     <div className="RSVPForm">
  //       <form onSubmit={handleSubmit}>
  //       </form>
  //     </div>
  //   )
  // }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ submitRsvp: submitRsvp}, dispatch);
// }

function mapStateToProps(state) {

  return { attending_events: state.attending_events,
            is_form_shown: state.is_form_shown,
            chosen_event: state.chosen_event }
}

// export default connect(null, mapDispatchToProps)(RSVPForm);
//
// export default RSVPForm;

export default reduxForm({
  form: 'NewRSVPForm',
  fields: ['event_id', 'firstname', 'lastname', 'email', 'phone_number']
}, mapStateToProps, { submitRsvp, showForm })(RSVPForm)
