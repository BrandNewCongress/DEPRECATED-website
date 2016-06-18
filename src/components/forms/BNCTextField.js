import React from 'react';
import TextField from 'material-ui/TextField';
import BNCFormField from './BNCFormField';

export default class BNCTextField extends BNCFormField {
  render() {
    return <TextField
      floatingLabelText={this.floatingLabelText()}
      floatingLabelStyle={{
        zIndex: 0
      }}
      {...this.props}
      onChange={(event) => {
        this.props.onChange(event.target.value)
      }}
    />
  }
}