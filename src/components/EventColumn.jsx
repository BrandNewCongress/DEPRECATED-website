import React from 'react'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import EventListItem from './EventListItem'

const styles = StyleSheet.create({
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
    display: 'inline-block',
    padding: '0px 8px',
    color: theme.colors.darkGray,
    borderBottom: '2px solid',
    borderBottomColor: theme.colors.orange
  }
})


export default function EventColumn(props) {
  const { datasource } = props
  return (
    <div className={styles.container} >
      {datasource.map((stateEvent, containerId) => (
        <div key={containerId} className={styles.stateContainer}>
          <h2 className={styles.stateName}>{stateEvent[0].state}</h2>
          {stateEvent.map((event, id) => (<EventListItem key={id} {...event} />))}
        </div>
      ))}
    </div>
  )
}
EventColumn.propTypes = {
  datasource: React.PropTypes.array
}
