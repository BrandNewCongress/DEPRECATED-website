import React from 'react'
import TextField from 'material-ui/TextField'
import BNCFormField from './BNCFormField'

export default class BNCPhoneField extends BNCFormField {
  render() {
    let formattedPhone = this.props.value && this.props.value.length === 10 ? `(${this.props.value.substring(0, 3)}) ${this.props.value.substring(3, 6)}-${this.props.value.substring(6, 10)}` : this.props.value

    return (<TextField
      {...this.props}
      value={formattedPhone}
      floatingLabelText={this.floatingLabelText()}
      hintText={this.props.label}
      onChange={(event) => {
        let val = event.target.value.replace(/\D/g, '')
        if (val.length > 10)
          val = val.substring(0, 10)
        this.props.onChange(val)
      }}
    />)
  }
}
