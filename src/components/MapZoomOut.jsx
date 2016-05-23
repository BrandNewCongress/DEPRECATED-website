import React, { Component } from 'react'
import { StyleSheet } from 'react-look'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    padding: 20,
    bottom: 0,
    left: 0,
    cursor: 'pointer'
  }
})

export default class MapZoomOut extends Component {
  static propTypes = {
    onClick: React.PropTypes.func
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div
        className={styles.buttonContainer}
        onClick={() => this.props.onClick()}
      >
        <img
          src={'http://placehold.it/50x50'}
          role={'presentation'}
        />
      </div>
    )
  }
}
