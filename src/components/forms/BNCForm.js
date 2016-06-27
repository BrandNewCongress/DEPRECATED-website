import React from 'react'
import Form from 'react-formal'
import BNCSubmitButton from './BNCSubmitButton'

export default class BNCForm extends React.Component {
  static propTypes = {
    value: React.PropTypes.object,
    defaultValue: React.PropTypes.object,
    onChange: React.PropTypes.func,
    children: React.PropTypes.object
  }

  state = {
    formErrors: null,
    isSubmitting: false,
    model: null
  }

  renderChildren(children) {
    return React.Children.map(children, (child) => {
      if (child === null) {
        return child
      } else if (child.type === Form.Field) {
        const name = child.props.name
        let error = this.state.formErrors ? this.state.formErrors[name] : null
        let clonedElement = child
        if (error) {
          error = error[0] ? error[0].message.replace(name, child.props.label) : null
          clonedElement = React.cloneElement(child, {
            errorText: error
          })
        }
        return React.cloneElement(clonedElement, {
          events: ['onBlur']
        })
      } else if (child.type === Form.Button) {
        return React.cloneElement(child, {
          component: BNCSubmitButton
        })
      } else if (child.props && child.props.children) {
        return React.cloneElement(child, {
          children: this.renderChildren(child.props.children)
        })
      }
      return child
    })
  }

  render() {
    return (
      <Form
        value={this.props.value || this.state.model || this.props.defaultValue}
        onChange={model => {
          console.log('OASNETHU')
          this.setState({ model })
          if (this.props.onChange) {
            this.props.onChange(model)
          }
        }}
        onError={(errors) => {
          console.log('error', errors)
          this.setState({ formErrors: errors })
        }}
        onInvalidSubmit={(formValue) => {
          console.log('HERE 2')
        }}

        onSubmit={(formValue) => {
          console.log('HERE')
        }}
        {...this.props}
      >
        {this.renderChildren(this.props.children)}
      </Form>
    )
  }
}
