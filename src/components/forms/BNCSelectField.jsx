import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import BNCFormField from './BNCFormField'

export default class BNCSelectField extends BNCFormField {
  createMenuItems() {
    return this.props.choices.map(({ value, label }) => (
        <MenuItem
          value={value}
          key={value}
          primaryText={label}
          label={label}
        />
      ))
  }

  render() {
    return (
      <div>
        {this.fixedLabel()}
        <SelectField 
          value={this.props.value} 
          floatingLabelText={this.props.label}
          onChange={(event, index, value) => {
            this.props.onChange(value)
          }}
          {...this.props}
        >
          {this.createMenuItems()}
        </SelectField>
      </div>
    )
  }
}
