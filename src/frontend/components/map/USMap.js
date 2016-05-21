import React from 'react'
import EventItem from './EventItem'
import { connect } from 'react-redux'
import { rsvpEvent, showForm } from '../../actions/index'
import { bindActionCreators } from 'redux'
import d3 from 'd3'
import { queue } from 'd3-queue'
import topojson from 'topojson'

const STATES_JSON = 'http://localhost:8090/static/data/states.json'
const EVENTS_CSV = 'http://localhost:8090/static/data/upcoming.csv'
const [DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SCALE] = [960, 600, 1280]
const [US_LEVEL_ZOOM, STATE_LEVEL_ZOOM] = [0, 2]

class USMap extends React.Component {
  static propTypes = {
    mapTranslate: React.propTypes.number.isRequired,
    mapScale: React.propTypes.number.isRequired,
    width: React.propTypes.number.isRequired,
    height: React.propTypes.number.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      USStates: [],
      events: [],
      mapTranslate: props.mapTranslate,
      mapScale: props.mapScale,
      zoomLevel: US_LEVEL_ZOOM,
      activeNode: d3.select(null)
    }
    // this.rsvpEventProxy = this.rsvpEventProxy.bind(this)
    // this.dataLoaded = this.dataLoaded.bind(this)

    // this.onMouseOverUSState = this.onMouseOverUSState.bind(this)
    // this.onClickUSState = this.onClickUSState.bind(this)
  }
  componentWillMount = () => {
    this.projection = d3.geo.albersUsa()
        .scale(this.props.mapScale)
        .translate(this.props.mapTranslate)

    this.path = d3.geo.path().projection(this.projection)

    queue()
      .defer(d3.json, STATES_JSON)
      .await((error, us) => {
        this.setState({
          //   // convert counties to individual features
          USStates: topojson.feature(us, us.objects.cb_2015_USState_20m).features
          //   // states don't need to be shaded, so can just be a mesh
          //   states: topojson.mesh(us, us.objects.states, function(a, b) { return a !== b })
        })
      })

    queue()
      .defer(d3.csv, EVENTS_CSV)
      .await((error, events) => {
        this.setState({ events })
      })
    // d3.json(STATES_JSON,)
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
                      zoomLevel: US_LEVEL_ZOOM })
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

      this.setState({ mapScale, mapTranslate,
                      activeNode: d3.select(event.target),
                      zoomLevel: STATE_LEVEL_ZOOM })
    }
  }

  reset() {
    this.state.activeNode.classed('active', false)
    this.setState({ activeNode: d3.select(null) })
    // transition
  }

  render() {
    return (
      <div className='USMap'>
        <svg ref='svg_map' width={this.props.width} height={this.props.height}>
          <g id='USMap-activityArea'>
            {this.state.USStates.map((USState, id) => (
              <path
                key={id}
                className={`us-state ${USState.properties.STUSPS}`}
                d={this.path(USState)}
                onMouseEnter={(e) => { this.onMouseOverUSState(USState, e) }}
                onClick={(e) => this.onClickUSState(USState, e)}
              />
            ))}

            {this.state.events.map((event, id) => {
              const coord = this.projection(
                [parseFloat(event.Longitude),
                parseFloat(event.Latitude)]
              )

              return (
                <EventItem
                  r='5'
                  cx={coord[0]}
                  cy={coord[1]}
                  key={`event-item-${id}`}
                  scale={(this.state.mapScale === DEFAULT_SCALE
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
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  mapScale: DEFAULT_SCALE,
  mapTranslate: [DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2]
}

function mapStateToProps(state) {
  // whatever is returned here will showup as props
  return {
    events: state.events
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rsvpEvent, showForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(USMap)
