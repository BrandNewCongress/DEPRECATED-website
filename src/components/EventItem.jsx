import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  circle: {
    transition: 'r 0.6s, stroke-width 0.4s',
    cursor: 'pointer',
    fill: theme.colors.orange,
    stroke: 'rgba(255,255,255, 0.5)'
  }
})

export default class EventItem extends React.Component {
  static propTypes = {
    centerX: React.PropTypes.number.isRequired,
    centerY: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
    scale: React.PropTypes.number.isRequired,
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  }

  state = {
    showText: false
  }

  textBox() {
    const { centerX, centerY, scale, city, state } = this.props
    const fontSize = 12 / scale
    const transX = 10 / scale
    const transY = 5 / scale
    const translate = `translate(${transX},${transY})`
    if (this.state.showText) {
      return (
        <text
          x={centerX}
          y={centerY}
          fontSize={fontSize}
          transform={translate}
        >
          {`${city}, ${state}`}
        </text>
      )
    }
    return ''
  }

  render() {
    const { centerX, centerY, radius, scale, onClick } = this.props
    const scaledRadius = radius / scale
    let strokeWidth = 2 / scale

    return (
      <g>
        <circle
          cx={centerX}
          cy={centerY}
          className={styles.circle}
          r={scaledRadius}
          strokeWidth={strokeWidth}
          onClick={() => onClick()}
          onMouseOver={() => this.setState({ showText: true })}
          onMouseOut={() => this.setState({ showText: false })}
        />
        {this.textBox()}
      </g>
    )
  }
}
