import React from 'react'
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet'
import RSVPForm from './map/RSVPForm'
import StateSelector from './map/StateSelector'
import { connect } from 'react-redux'
import { rsvpEvent } from '../actions/index'
import { bindActionCreators } from 'redux'
import log from '../log'

class OpenStreetMap extends React.Component {
  static propTypes = {
    selectedState: React.PropTypes.string,
    events: React.PropTypes.array
  }

  constructor(props) {
    super(props)
    this.rsvpEventProxy = this.rsvpEventProxy.bind(this)
  }

  getCentralPosition() {
    const DEFAULT_CENTER = [38.8858079, -100.2705783]

    if (!this.props.selectedState) {
      return [5, DEFAULT_CENTER]
    }

    const abbrev = this.props.selectedState.abbreviation
    const selectedEvents = this.props.events.filter(
      (event) => event.StateAbbrev === abbrev
    )


    if (selectedEvents.length > 0) {
      return [6, [selectedEvents[0].Latitude, selectedEvents[0].Longitude]]
    }
    return [5, DEFAULT_CENTER]
  }

  // This action is for when we call the RSVP Event endpoint
  rsvpEventProxy(eventId, firstname, lastname, email, phone) {
    log.debug('DOING PROXY FOR', eventId, firstname, lastname, email, phone)
  }

  // Render Markers
  renderEventsList() {
    return this.props.events.map((event) => {
      const position = [event.Latitude, event.Longitude]

      return (
        <CircleMarker
          center={position}
          fillColor={'#f16432'}
          fillOpacity={0.6}
          color={'#f16432'}
          weight={2}
          opacity={1}
          radius={10}
          key={`${event.City} ${event.State} ${event.Date}`}
        >
          <Popup>
            <RSVPForm
              rsvpEventProxy={this.rsvpEventProxy}
              eventId={`${event.City}, ${event.State}`}
              eventDate={new Date(event.Date)}
              eventTitle={`${event.City}, ${event.State}`}
            />
          </Popup>
        </CircleMarker>
      )
    })
  }

  render() {
    let [zoom, latLng] = this.getCentralPosition()

    return (
      <div className='container'>
        <StateSelector />
        <Map
          center={latLng}
          zoom={zoom}
          touchZoom={false}
          scrollWheelZoom={false}
          zoomControl={false}
          doubleClickZoom={false}
        >
          <TileLayer
            url='http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png?api_key=e2a2a420e246c1db322327db3d2542e3403b3bcd'
            attribution='<a href="https://www.mapzen.com/rights">Attribution</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'
          />
          {this.renderEventsList()}
        </Map>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // whatever is returned here will showup as props
  return {
    events: state.events,
    selectedState: state.selectedState
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ rsvpEvent }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OpenStreetMap)
