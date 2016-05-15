import React from 'react'

export default () => (
  <div className='container'>
    <h3>Thank you for RSVPing!</h3>
    <p>If you can please donate</p>
    <form>
      <div className='form-group'>
        <input type='text' className='form-control' placeholder='Amount' />
      </div>
      <div className='form-group'>
        <input type='email' className='form-control' placeholder='Email' />
      </div>
      <div className='form-group'>
        <input type='text' className='form-control' placeholder='Name' />
      </div>
      <button type='submit' className='btn btn-default'>RSVP</button>
    </form>
  </div>
)
