import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  circle: {
    transition: 'r 0.3s, stroke-width 0.3s',
    cursor: 'pointer',
    fill: theme.colors.orange,
    stroke: 'rgba(255,255,255, 0.5)',
    '@media (max-width: 775px)': {
      r: '7px !important'
    }
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
    onClick: React.PropTypes.func.isRequired,
    onMouseOver: React.PropTypes.func,
    onMouseOut: React.PropTypes.func
  }

  state = {
    showText: false
  }

  render() {
    const { centerX, centerY, radius, scale, onClick } = this.props
    const scaledRadius = radius
    let strokeWidth = 2 / scale

    return (
      <g>
        <circle
          cx={centerX}
          cy={centerY}
          className={styles.circle}
          r={scaledRadius}
          strokeWidth={strokeWidth}
          onClick={(e) => onClick(e)}
          onMouseOver={(e) => this.props.onMouseOver(e)}
          onMouseOut={(e) => this.props.onMouseOut(e)}
        />
      </g>
    )
  }
}
