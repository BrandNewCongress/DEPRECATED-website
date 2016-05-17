import React from 'react'
import moment from 'moment'
import axios from 'axios'

const RSVP_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=rapicastillo'

class RSVPForm extends React.Component {
  static propTypes = {
    eventId: React.PropTypes.string,
    rsvpEventProxy: React.PropTypes.func,
    eventDate: React.PropTypes.object,
    eventTitle: React.PropTypes.string
  }

  constructor(props) {
    super(props)
    this.onSubmitRSVP = this.onSubmitRSVP.bind(this)

    this.state = {
      event_id: this.props.eventId,
      firstname: '',
      lastname: '',
      email: '',
      phone_number: '',

      formSubmitted: false
    }
  }

  async onSubmitRSVP(event) {
    // console.log(event);

    const { event_id, firstname, lastname, email, phone_number } = this.state
    // console.log( { event_id, firstname, lastname, email, phone_number } )

    const formAPI = {
      title: 'Sample Title',
      categories: 'Sample Categories',
      content: 'Sample Content'
    }

    // axios.post(`${RSVP_URL}`,  { event_id, firstname, lastname, email, phone_number } )
    await axios.post(`${RSVP_URL}/posts${API_KEY}`, formAPI)
    this.setState({ formSubmitted: true })
    event.preventDefault()
    // console.log(this.props);

    this.props.rsvpEventProxy(event_id, firstname, lastname, email, phone_number)

    return false
  }

  buildThankYou() {
    return (
      <div className='row'>
        <h5>Thank you for signing up!</h5>
      </div>
    )
  }

  buildForm() {
    let date = moment(this.props.eventDate).format('MMM DD [@ 7PM]')
    return (
      <div className='row'>
        <h3>{this.props.eventTitle}</h3>
        <h5>{date}</h5>
        <form className='form' onSubmit={this.onSubmitRSVP}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='First Name'
              name='firstname'
              onChange={(event) => {
                this.setState({ firstname: event.target.value })
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Last Name'
              name='lastname'
              onChange={(event) => {
                this.setState({ lastname: event.target.value })
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              name='email'
              onChange={(event) => {
                this.setState({ email: event.target.value })
              }}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Phone Number'
              name='phone_number'
              onChange={(event) => {
                this.setState({ phone_number: event.target.value })
              }}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-default'>RSVP</button>
          </div>
        </form>
      </div>
    )
  }
  render() {
    return (
      <div className='container-fluid'>
        {this.state.formSubmitted ? this.buildThankYou() : this.buildForm()}
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ submitRsvp: submitRsvp}, dispatch);
// }

// export default connect(null, mapDispatchToProps)(RSVPForm);

export default RSVPForm

// export default reduxForm({
//   form: 'NewRSVPForm',
//   fields: ['firstname', 'lastname', 'email', 'phone_number']
// }, null, { submitRsvp })(RSVPForm);
