import React from 'react'
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import RSVPForm from './RSVPForm'
import EventItem from './EventItem'

import { connect } from 'react-redux'

import { rsvpEvent, showForm } from '../../actions/index'
import { bindActionCreators } from 'redux'

import d3 from 'd3'
import { queue } from 'd3-queue'
import topojson from 'topojson'

const MAP_ID = 'map1'
const STATES_JSON = 'http://localhost:8090/static/data/states.json'
const EVENTS_CSV = 'http://localhost:8090/static/data/upcoming.csv'

const [DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SCALE] = [960, 600, 1280]

const [US_LEVEL_ZOOM, REGION_LEVEL_ZOOM, STATE_LEVEL_ZOOM] = [0, 1, 2]

class USMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      us_states: [],
      events: [],
      map_translate: props.map_translate,
      map_scale: props.map_scale,
      zoom_level: US_LEVEL_ZOOM,
      active_node: d3.select(null),
      show_form: false
    }
    // this.rsvpEventProxy = this.rsvpEventProxy.bind(this)
    // this.dataLoaded = this.dataLoaded.bind(this)

    // this.onMouseOverUSState = this.onMouseOverUSState.bind(this)
    // this.onClickUSState = this.onClickUSState.bind(this)
  }
  componentWillMount() {
    var _that = this
    this.projection = d3.geo.albersUsa()
        .scale(this.props.map_scale)
        .translate(this.props.map_translate)

    this.path = d3.geo.path().projection(this.projection)

    queue()
      .defer(d3.json, STATES_JSON)
      .await((error, us) => {
        _that.setState({
          //   // convert counties to individual features
          us_states: topojson.feature(us, us.objects.cb_2015_us_state_20m).features
          //   // states don't need to be shaded, so can just be a mesh
          //   states: topojson.mesh(us, us.objects.states, function(a, b) { return a !== b })
        })
      })

    queue()
      .defer(d3.csv, EVENTS_CSV)
      .await((error, events) => {
        this.setState({ events: events })
      })
    // d3.json(STATES_JSON,)
  }

  componentDidMount() {
    console.log(this.props)
    // let [zoom, lat_lng]  = this.getCentralPosition()
  }

  componentDidUpdate(prevObj, prevState) {
    let mapChange = (
      this.state.map_scale !== prevState.map_scale ||
      this.state.map_translate !== prevState.map_translate
    )

    if (mapChange) {
      let target = d3.select('#USMap-activityArea')
      if (!this.state.map_scale && !this.state.map_translate) {
        target
          .transition()
          .duration(750)
          .attr('transform', '')
      } else {
        target
          .transition()
          .duration(750)
          .attr('transform', 'translate(' + this.state.map_translate + ')scale(' + this.state.map_scale + ')')
      }

    }
  }

  showForm() {
    return (
      <div className='form-area'>
        <RSVPForm />
      </div>
    )
  }

  render() {

    var _that = this
    return (
      <div className='USMap'>
        {this.props.is_form_shown ? this.showForm() : ''}

        <svg ref='svg_map' id={MAP_ID} width={this.props.width} height={this.props.height}>
          <g id='USMap-activityArea'>
            {this.state.us_states.map((us_state, id) => {

              return (
                <path key={id}
                  className={`us-state ${us_state.properties.STUSPS}`}
                  d={_that.path(us_state)}
                  onMouseEnter={(e) => { _that.onMouseOverUSState(us_state, e) }}
                  onClick={(e) => _that.onClickUSState(us_state, e)}
                />
              )
            })}

            {this.state.events.map((event, id) => {
              var coord = this.projection([parseFloat(event.Longitude), parseFloat(event.Latitude)])

              return (
                <EventItem
                  r='5'
                  cx={coord[0]}
                  cy={coord[1]}
                  key={`event-item-${id}`}
                  scale={(this.state.map_scale == DEFAULT_SCALE || !this.state.map_scale) ? 1 : this.state.map_scale}
                  onClick={(e) => {
                    this.props.showForm(true, event)
                  }}

                  {...event}

                />
              )
            })

            }
          </g>
        </svg>
      </div>
    )
  }

  onMouseOverUSState(state, event) {
    // console.log("Hover", state, event)
  }

  onClickUSState(state, event) {

    console.log(this.props)

    this.props.showForm(false)

    if (this.state.active_node.node() == event.target) {
      // State has been clicked again
      this.setState({ map_scale: null,
                      map_translate: null,
                      active_node: d3.select(null),
                      zoom_level: US_LEVEL_ZOOM })
    } else {
      // New State has been clicked
      let bounds = this.path.bounds(state),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        map_scale = .7 / Math.max(dx / this.props.width, dy / this.props.height),
        map_translate = [this.props.width / 2 - map_scale * x, this.props.height / 2 - map_scale * y]

      this.setState({ map_scale, map_translate,
                      active_node: d3.select(event.target),
                      zoom_level: STATE_LEVEL_ZOOM })
    }
  }

  reset(e) {
    this.state.active_node.classed('active', false)
    this.setState({ active_node: d3.select(null) })


    // transition
  }

}

USMap.defaultProps = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  map_scale: DEFAULT_SCALE,
  map_translate: [DEFAULT_WIDTH / 2, DEFAULT_HEIGHT / 2]
}

function mapStateToProps(state) {
  // whatever is returned here will showup as props
  return {
    events: state.events,
    selected_state: state.selected_state,
    is_form_shown: state.is_form_shown
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rsvpEvent, showForm }, dispatch)
}

console.log(connect(mapStateToProps, mapDispatchToProps)(USMap))

export default connect(mapStateToProps, mapDispatchToProps)(USMap)
