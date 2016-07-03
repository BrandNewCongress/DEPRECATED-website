import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class BNCSubmitButton extends React.Component {
  render() {
    return (
      <RaisedButton
        primary
        type='submit'
        value='submit'
        {...this.props}
      />
    )
  }
}
