import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    padding: '5px 5px 0px 5px',
    margin: 10,
    borderRadius: 5,
    bottom: 0,
    left: 0,
    cursor: 'pointer',
    backgroundColor: theme.colors.orange
  },
  icon: {
    display: 'inline-block',
    width: 32,
    height: 32,
    fill: 'white'
  }
})

export default class MapZoomOut extends Component {
  static propTypes = {
    onClick: React.PropTypes.func
  }

  render() {
    return (
      <div
        className={styles.buttonContainer}
        onClick={() => this.props.onClick()}
      >
        <svg width='24' height='24' viewBox='0 0 24 24'>
          <path d='M6.426 10.668l-3.547-3.547-2.879 2.879v-10h10l-2.879 2.879 3.547 3.547-4.242 4.242zm11.148 2.664l3.547 3.547 2.879-2.879v10h-10l2.879-2.879-3.547-3.547 4.242-4.242zm-6.906 4.242l-3.547 3.547 2.879 2.879h-10v-10l2.879 2.879 3.547-3.547 4.242 4.242zm2.664-11.148l3.547-3.547-2.879-2.879h10v10l-2.879-2.879-3.547 3.547-4.242-4.242z'/>
        </svg>
      </div>
    )
  }
}
