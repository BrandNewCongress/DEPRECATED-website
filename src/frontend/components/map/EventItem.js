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
  centerX: React.propTypes.number.isRequired,
  centerY: React.propTypes.number.isRequired,
  radius: React.propTypes.number.isRequired,
  scale: React.propTypes.number.isRequired,
  city: React.propTypes.string.isRequired,
  state: React.propTypes.string.isRequired,
  eventDate: React.propTypes.string.isRequired,
  onClick: React.propTypes.func.isRequired
}

export default EventItem
