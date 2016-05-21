import React from 'react'

function EventItem({ centerX, centerY, radius, scale, city, state, eventDate, onClick }) {
  const scaledRadius = radius / scale
  let strokeWidth = 2 / scale
  let fontSize = 12 / scale

  const transX = 10 / scale
  const transY = 5 / scale

  let translate = `translate(${transX},${transY})`

  return (
    <g className='EventItem'>
      <circle
        className='event'
        cx={centerX}
        cy={centerY}
        r={scaledRadius}
        strokeWidth={strokeWidth}
        onClick={() => onClick()}
      />
      <text
        x={centerX}
        y={centerY}
        fontSize={fontSize}
        transform={translate}
      >
        {`${city}, ${state} - ${eventDate}`}
      </text>
    </g>
  )
}

EventItem.propTypes = {
  centerX: React.PropTypes.number.isRequired,
  centerY: React.PropTypes.number.isRequired,
  radius: React.PropTypes.number.isRequired,
  scale: React.PropTypes.number.isRequired,
  city: React.PropTypes.string.isRequired,
  state: React.PropTypes.string.isRequired,
  eventDate: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default EventItem
