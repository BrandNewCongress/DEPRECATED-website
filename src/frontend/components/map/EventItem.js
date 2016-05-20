import React, { Component } from 'react';
import RSVPForm from './RSVPForm';
import d3 from 'd3';
import Queue, { queue } from 'd3-queue';
import topojson from 'topojson';

class EventItem extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    let { cx, cy, r, scale, City, State, EventDate } = this.props;

    r = r/scale;
    let strokeWidth = 2/scale;
    let fontSize = 12/scale;

    let transX = 10/scale;
    let transY = 5/scale;

    let translate = `translate(${transX},${transY})`;

    return(
        <g className="EventItem">
          <circle
            className="event"
            cx={cx}
            cy={cy}
            r={r}
            strokeWidth={strokeWidth}
            onClick={(e) => this.props.onClick() }
          />
          <text x={cx} y={cy} fontSize={fontSize} transform={translate}>{`${City}, ${State} - ${EventDate}`}</text>
        </g>
    );
  }
}

export default EventItem;
