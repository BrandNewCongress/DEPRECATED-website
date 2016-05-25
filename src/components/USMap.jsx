import React from 'react'
import EventItem from './EventItem'
import d3 from 'd3'
import topojson from 'topojson'
import { StyleSheet } from 'react-look'
import EventDetails from './EventDetails'
import theme from '../theme'
import MapZoomOut from './MapZoomOut'
import HoveredPopup from './HoveredPopup'
import { connect } from 'react-redux'
import { selectState } from '../actions'
import moment from 'moment'

const rawStates = require('../data/states.json')
const usStates = topojson.feature(rawStates, rawStates.objects.cb_2015_us_state_20m).features
const rawRegions = require('../data/regions.json')
const usRegions = topojson.feature(rawRegions, rawRegions.objects.regions).features
const InitialScale = 1280
const [USLevelZoom, StateLevelZoom] = [0, 2]
const styles = StyleSheet.create({
  mapContainer: {
    position: 'relative',
    backgroundColor: 'white',
    '@media (min-width: 775px)': {
      height: '100%'
    }
  },
  map: {
    height: 'auto',
    maxHeight: '100%'
  },
  region: {
    fill: 'transparent',
    stroke: 'transparent',
    strokeWidth: 1.5,
    transition: 'fill .1s',
    cursor: 'pointer',
    ':hover': {
      fill: theme.colors.lightGreen
    },
    ':click': {
      fill: 'transparent'
    }
  },
  state: {
    cursor: 'pointer',
    fill: 'white',
    stroke: theme.colors.gray,
    strokeWidth: 1.5,
    transition: 'fill .1s',
    ':hover': {
      fill: theme.colors.lightGreen
    }
  }
})

class USMap extends React.Component {
  static propTypes = {
    events: React.PropTypes.arrayOf(React.PropTypes.shape({
      city: React.PropTypes.string,
      state: React.PropTypes.string,
      date: React.PropTypes.string,
      rsvpUrl: React.PropTypes.string,
      latitude: React.PropTypes.string,
      longitude: React.PropTypes.string
    })).isRequired,
    selectState: React.PropTypes.func.isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired
  }

  static defaultProps = {
    width: 960,
    height: 600
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedEvent: null,
      mapTranslate: [props.width / 2, props.height / 2],
      mapScale: InitialScale,
      zoomLevel: USLevelZoom,
      activeNode: d3.select(null),
      hoveredEvent: null,
      coords: [0,0]
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
          .duration(600)
          .attr('transform', '')
      } else {
        target
          .transition()
          .duration(600)
          .attr(
            'transform',
            `translate(${this.state.mapTranslate})scale(${this.state.mapScale})`
          )
      }
    }
  }

  onClickUsRegion(region, event) {
    this.props.selectState(null)
    // New State has been clicked
    const [mapScale, mapTranslate] = this.getBounds(region)
    this.setState({
      mapScale,
      mapTranslate,
      activeNode: d3.select(event.target),
      selectedEvent: null,
      zoomLevel: StateLevelZoom
    })
    this.props.selectState(region)
  }

  onClickUsState(state, event) {
    const [mapScale, mapTranslate] = this.getBounds(state)
    this.setState({
      mapScale,
      mapTranslate,
      activeNode: d3.select(event.target),
      selectedEvent: null,
      zoomLevel: StateLevelZoom
    })
    this.props.selectState(state)
  }

  getBounds(pathArea) {
    const bounds = this.path.bounds(pathArea)
    const dx = bounds[1][0] - bounds[0][0]
    const dy = bounds[1][1] - bounds[0][1]
    const x = (bounds[0][0] + bounds[1][0]) / 2
    const y = (bounds[0][1] + bounds[1][1]) / 2
    const mapScale = 0.7 / Math.max(dx / this.props.width, dy / this.props.height)
    const mapTranslate = [
      this.props.width / 2 - mapScale * x,
      this.props.height / 2 - mapScale * y
    ]

    return [mapScale, mapTranslate]
  }

  reset() {
    this.state.activeNode.classed('active', false)
    this.setState({ activeNode: d3.select(null) })
  }

  showEventDetails() {
    return (
      <EventDetails
        event={this.state.selectedEvent}
        onClose={() => this.setState({ selectedEvent: null })}
      />
    )
  }

  renderHoveredEvent() {

    const offsetTop = this.refs.usmap_container ? this.refs.usmap_container.getBoundingClientRect().top : 0

    if (!this.state.hoveredEvent) return null
//
    const city = this.state.hoveredEvent.city
    const state = this.state.hoveredEvent.state
    const dateText = moment(new Date(this.state.hoveredEvent.date)).format('MMM DD')

    return (
      <HoveredPopup
        label={`${city}, ${state} - ${dateText}`}
        coords={[this.state.coords[0], this.state.coords[1] - offsetTop - 10]}
      />
    )
  }

  renderRegions() {
    return usRegions.map((usRegion, id) => {
      if (usRegion.properties.NAME !== 'Northeast') return null
      return (
        <path
          key={id}
          ref={usRegion.properties.NAME}
          className={styles.region}
          d={this.path(usRegion)}
          onClick={(e) => this.onClickUsRegion(usRegion, e)}
        />
      )
    })
  }

  hoverCircle(event, circle) {
    const bounds = circle.target.getBoundingClientRect()

    this.setState({ hoveredEvent: event, coords: [bounds.left + (bounds.width/2), bounds.top] })
  }

  render() {
    return (
      <div ref='usmap_container' className={styles.mapContainer}>
        {this.state.selectedEvent ? this.showEventDetails() : ''}
        <svg
          className={styles.map}
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          <g id='USMap-activityArea'>
            {usStates.map((usState, id) => (
              <path
                key={id}
                className={styles.state}
                d={this.path(usState)}
                onClick={(e) => {
                  this.onClickUsState(usState, e)
                  this.props.selectState(usState)
                }}
              />
            ))}
            {this.renderRegions()}
            {this.props.events.map((event, id) => {
              const coord = this.projection(
                [parseFloat(event.longitude),
                parseFloat(event.latitude)]
              )
              if (coord === null) {
                return ''
              }

              return (
                <EventItem
                  ref={`eventitem_${id}`}
                  radius={this.state.hoveredEvent === event ? 9 : 5}
                  centerX={coord[0]}
                  centerY={coord[1]}
                  key={`event-item-${id}`}
                  scale={(this.state.mapScale === InitialScale
                    || !this.state.mapScale) ? 1 : this.state.mapScale}
                  onClick={() => {
                    this.setState({ selectedEvent: event })
                  }}
                  city={event.city}
                  state={event.state}
                  onMouseOver={(e) => this.hoverCircle(event, e)
                  //   {
                  //
                  //   console.log(this.refs[`eventitem_${id}`], this.refs[`eventitem_${id}`].getBoundingClientRect())
                  //
                  //
                  // }
                  }
                  onMouseOut={(e) => {
                    this.setState({ hoveredEvent: null, coords: null })
                  }}
                />
              )
            })}
          </g>
        </svg>
        {this.renderHoveredEvent()}
        {(this.state.mapScale !== InitialScale && this.state.mapScale) ?
            (<MapZoomOut
              onClick={() => {
                this.setState({ mapScale: null, mapTranslate: null })
                this.props.selectState(null)
              }}
            />)
            : ''}
      </div>
    )
  }
}


export default connect(null, { selectState })(USMap)
