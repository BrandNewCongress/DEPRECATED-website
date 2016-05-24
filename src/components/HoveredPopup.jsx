import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    // transform: 'translate(-50%, -20px)',
    overflow: 'visible',
    opacity: 0,
    transition: 'opacity .1s'
  },
  hoverText: {
    fill: 'white',
    fontFamily: theme.fontFamily,
    fontSize: 14
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
    const bbox = this.refs.textItem.getBBox()
    this.updateBox(bbox)
    this.refs.hoveredContainer.setAttribute("style", "opacity: 1")
  }

  updateBox(bbox) {
    this.setState({
      boxWidth: bbox.width,
      boxHeight: bbox.height
    })
  }

  render() {
    return (
      <svg
        ref={'hoveredContainer'}
        className={styles.container}
        x={!this.props.coords ? 0 : this.props.coords[0] - (this.state.boxWidth / 2)}
        y={!this.props.coords ? 0 : this.props.coords[1] - (this.state.boxHeight * 2 + 3)}
        width={this.state.boxWidth + 10}
        height={this.state.boxHeight + 10}
      >
        <g>
          <rect
            className={styles.hoverBox}
            fill={'blue'}
            rx={4} ry={4}
            width={this.state.boxWidth + 10}
            height={this.state.boxHeight + 6}
          />
          <text
            className={styles.hoverText}
            x={5} y={20}
            ref={'textItem'}
          >
            {this.props.label}
          </text>
        </g>
      </svg>
    )
  }
}

export default HoveredPopup
