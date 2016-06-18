import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class BNCSubmitButton extends React.Component {
  render() {
    return <RaisedButton
      primary={true}
      type='submit'
      value='submit'
      {...this.props}
    />
  }
}