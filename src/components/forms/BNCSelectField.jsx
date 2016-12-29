import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import BNCFormField from './BNCFormField'

export default class BNCSelectField extends BNCFormField {
  createMenuItems() {
    return this.props.choices.map(({ value, label }, index) => (
        <MenuItem
          value={value}
          key={index}
          primaryText={label}
          label={label}
        />
      ))
  }

  handleChange = (event, index, value) => {
    this.props.onChange(value)
  }

  render() {
    return (
      <div>
        {this.fixedLabel()}
        <SelectField
          value={this.props.value} 
          floatingLabelText={this.floatingLabelText()}
          {...this.props}
          onChange={this.handleChange}
        >
          {this.createMenuItems()}
        </SelectField>
      </div>
    )
  }
}
