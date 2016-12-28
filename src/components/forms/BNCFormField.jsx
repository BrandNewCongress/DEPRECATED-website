import React from 'react'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  labelStyle: {
    paddingBottom: 5,
    fontWeight: 500,
    fontSize: 16
  }
})

export default class BNCFormField extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props.value === nextProps.value && this.props.errorText === nextProps.errorText)
  }

  floatingLabelText() {
    return this.props.floatingLabelText === false || this.props.hideLabel ? null : this.props.floatingLabelText || this.props.label
  }

  fixedLabel() {
    if (this.props.fixedLabel) {
      return (
        <div className={styles.labelStyle}>
          {this.props.fixedLabel}
        </div>
      )
    }
    return ''
  }
}
