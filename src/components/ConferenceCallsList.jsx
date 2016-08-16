import React from 'react'
import axios from 'axios'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  link: {
    ...theme.text.link
  },
  loading: {
    fontWeight: 600,
    marginTop: 10,
    marginLeft: 10
  }
})

export default class ConferenceCallsList extends React.Component {
  state = {
    conferenceCalls: null
  }

  async componentDidMount() {
    const calls = await axios.get('https://bnc-website.herokuapp.com/maestro/upcomingConferences', {
      params: {
        nameContains: this.props.nameFilter
      }
    })
    this.setState({ conferenceCalls: calls.data.conferences })
  }

  render() {
    if (this.state.conferenceCalls === null) {
      return (
        <div className={styles.loading}>Loading calls...</div>
      )
    } else if (this.state.conferenceCalls.length < 1) {
      return (
        <div>Sorry, all calls are full. Check back later.</div>
      )
    }
    return (
      <ul>
        {this.state.conferenceCalls.map((call) => {
          const freeSlots = this.props.maxSignups - call.currentSignups
          if (freeSlots < 1) {
            return null
          }
          return (
            <li>
              <a
                className={styles.link}
                href={call.registrationLink}
                target='_blank'
              >
                {call.date} &mdash; {call.time}
              </a>
            </li>
          )
        }).filter((row) => row !== null)}
      </ul>
    )
  }
}

ConferenceCallsList.propTypes = {
  nameFilter: React.PropTypes.string,
  maxSignups: React.PropTypes.number
}
