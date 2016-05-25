import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    overflow: 'visible',
    top: 0,
    left: 0,
    position: 'absolute',
    transition: 'opacity .1s',
    backgroundColor: theme.colors.blue,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 3,
    whiteSpace: 'nowrap',
    transform: 'translate(-50%, -110%)'
  },
  hoverText: {
    color: 'white',
    fontFamily: theme.fontFamily,
    fontSize: 14,
    fontWeight: 600
  },
  hoverBox: {
    stroke: theme.colors.lightBlue,
    fill: theme.colors.darkBlue
  }
})

class HoveredPopup extends Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    coords: React.PropTypes.array.isRequired
  }
  constructor(props) {
    super(props)

    this.state = {
      boxWidth: 0,
      boxHeight: 0
    }
  }
  componentDidMount() {
    // this.refs.hoveredContainer.setAttribute("style", "opacity: 1")
  }

  render() {
    return (
      <div
        ref={'hoveredContainer'}
        className={styles.container}
        style={{
          left: this.props.coords[0],
          top: this.props.coords[1]
        }}
      >
        <span className={styles.hoverText}>
          {this.props.label}
        </span>
      </div>
    )
  }
}

export default HoveredPopup
