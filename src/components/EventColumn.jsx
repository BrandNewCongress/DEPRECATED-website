import React, { Component } from 'react'
import { StyleSheet } from 'react-look'
import moment from 'moment'
import theme from '../theme'
import EventListItem from './EventListItem'

const fontFamily = theme.fontFamily
const styles=StyleSheet.create({
  container: {
    flex: 1
  },
  stateContainer: {
    '@media (min-width: 750px)': {
      padding: 20,
      margin: 10,
      backgroundColor: 'whitesmoke',
      borderRadius: 5,
      paddingTop: 1,
      paddingBottom: 5,
      marginBottom: 20
    }
  },
  stateName: {
    fontSize: 22,
    fontWeight: 600,
    fontFamily,
    display: 'inline-block',
    padding: '0px 8px',
    color: theme.colors.darkGray,
    borderBottom: '2px solid',
    borderBottomColor: theme.colors.orange
  }
})


export default class EventColumn extends Component {
  static propTypes = {
    columnCount: React.PropTypes.number,
    datasource: React.PropTypes.array
  }

  render() {
    const { datasource, columnCount } = this.props
    return (
      <div className={styles.container} >
        {datasource.map((stateEvent) => {
          return (
            <div className={styles.stateContainer}>
              <h2 className={styles.stateName}>{stateEvent[0].state}</h2>
              {
                stateEvent.map((event, id) => (<EventListItem key={id} {...event} />))
              }
            </div>
          )
        })}
      </div>
    )
  }
}
