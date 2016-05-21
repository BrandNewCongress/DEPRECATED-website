import React from 'react'
import EventItem from './EventItem'
import { connect } from 'react-redux'
import d3 from 'd3'
import topojson from 'topojson'
import { StyleSheet } from 'react-look'

const rawStates = require('../../data/states.json')
const USStates = topojson.feature(rawStates, rawStates.objects.cb_2015_us_state_20m).features
const InitialScale = 1280
const [USLevelZoom, StateLevelZoom] = [0, 2]
const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: '#E1E4E0'
  },
  map: {
    marginLeft: '50%',
    transform: 'translate(-50%, 0)'
  },
  state: {
    fill: 'white',
    stroke: '#E1E4E0',
    strokeWidth: 1.5,
    transition: 'fill .1s',
    ':hover': {
      fill: '#F5FFF7'
    }
  }
})

class USMap extends React.Component {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      mapTranslate: [props.width / 2, props.height / 2],
      mapScale: InitialScale,
      zoomLevel: USLevelZoom,
      activeNode: d3.select(null)
    }
  }

  componentWillMount = () => {
    this.projection = d3.geo.albersUsa()
      .scale(this.state.mapScale)
      .translate(this.state.mapTranslate)

    this.path = d3.geo.path().projection(this.projection)
  }

  componentDidUpdate(prevObj, prevState) {
    const mapChange = (
      this.state.mapScale !== prevState.mapScale ||
      this.state.mapTranslate !== prevState.mapTranslate
    )

    if (mapChange) {
      const target = d3.select('#USMap-activityArea')
      if (!this.state.mapScale && !this.state.mapTranslate) {
        target
          .transition()
          .duration(750)
          .attr('transform', '')
      } else {
        target
          .transition()
          .duration(750)
          .attr(
            'transform',
            `translate(${this.state.mapTranslate})scale(${this.state.mapScale})`
          )
      }
    }
  }

  onClickUSState(state, event) {
    if (this.state.activeNode.node() === event.target) {
      // State has been clicked again
      this.setState({ mapScale: null,
                      mapTranslate: null,
                      activeNode: d3.select(null),
                      zoomLevel: USLevelZoom })
    } else {
      // New State has been clicked
      const bounds = this.path.bounds(state)
      const dx = bounds[1][0] - bounds[0][0]
      const dy = bounds[1][1] - bounds[0][1]
      const x = (bounds[0][0] + bounds[1][0]) / 2
      const y = (bounds[0][1] + bounds[1][1]) / 2
      const mapScale = 0.7 / Math.max(dx / this.props.width, dy / this.props.height)
      const mapTranslate = [
        this.props.width / 2 - mapScale * x,
        this.props.height / 2 - mapScale * y
      ]

      this.setState({
        mapScale,
        mapTranslate,
        activeNode: d3.select(event.target),
        zoomLevel: StateLevelZoom
      })
    }
  }

  reset() {
    this.state.activeNode.classed('active', false)
    this.setState({ activeNode: d3.select(null) })
  }

  render() {
    return (
      <div className={styles.mapContainer}>
        <svg
          className={styles.map}
          ref='svg_map'
          width={this.props.width}
          height={this.props.height}
        >
          <g id='USMap-activityArea'>
            {USStates.map((USState, id) => (
              <path
                key={id}
                className={styles.state}
                d={this.path(USState)}
                onClick={(e) => this.onClickUSState(USState, e)}
              />
            ))}

            {this.props.events.map((event, id) => {
              const coord = this.projection(
                [parseFloat(event.Longitude),
                parseFloat(event.Latitude)]
              )

              return (
                <EventItem
                  radius='5'
                  centerX={coord[0]}
                  centerY={coord[1]}
                  key={`event-item-${id}`}
                  scale={(this.state.mapScale === InitialScale
                    || !this.state.mapScale) ? 1 : this.state.mapScale}
                  onClick={() => {
                    console.log('CLICKED')
                  }}
                  {...event}
                />
              )
            })}
          </g>
        </svg>
      </div>
    )
  }
}

USMap.defaultProps = {
  width: 960,
  height: 600
}

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(USMap)
