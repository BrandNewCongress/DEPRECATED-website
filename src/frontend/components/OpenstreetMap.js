import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import RSVPForm from './map/RSVPForm'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'
import { rsvpEvent } from '../actions/index'
import { bindActionCreators } from 'redux'

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%'
  }
})

class OpenStreetMap extends React.Component {
  static propTypes = {
    states: React.PropTypes.array,
    events: React.PropTypes.array
  }

  getCentralPosition() {
    const DEFAULT_CENTER = [38.8858079, -100.2705783]
    const selectedState = this.selectedState()

    if (!selectedState) {
      return [5, DEFAULT_CENTER]
    }

    const abbrev = selectedState.abbreviation
    const selectedEvents = this.props.events.filter(
      (event) => event.StateAbbrev === abbrev
    )

    if (selectedEvents.length > 0) {
      return [3, [selectedEvents[0].Latitude, selectedEvents[0].Longitude]]
    }
    return [5, DEFAULT_CENTER]
  }

  selectedState() {
    this.props.states.reduce((prev, cur) => {
      if (cur.selected) {
        return cur
      }
      return null
    })
  }

  // Render Markers
  renderEventsList() {
    return this.props.events.map((event) => {
      const position = [event.Latitude, event.Longitude]

      return (
        <Marker
          position={position}
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
        </Marker>
      )
    })
  }

  render() {
    let [zoom, latLng] = this.getCentralPosition()
    return (
      <Map
        center={latLng}
        zoom={zoom}
        touchZoom={false}
        scrollWheelZoom={false}
        zoomControl={false}
        doubleClickZoom={false}
        className={styles.map}
      >
        <TileLayer
          url='http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png?api_key=e2a2a420e246c1db322327db3d2542e3403b3bcd'
          attribution='<a href="https://www.mapzen.com/rights">Attribution</a>. Data &copy;<a href="https://openstreetmap.org/copyright">OSM</a> contributors.'
        />
        {this.renderEventsList()}
      </Map>
    )
  }
}

function mapStateToProps(state) {
  return {
    events: state.events,
    states: state.states
  }
}

export default connect(mapStateToProps)(OpenStreetMap)
