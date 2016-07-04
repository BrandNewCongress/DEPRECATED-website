import React from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-look'
import theme from '../theme'

const styles = StyleSheet.create({
  content: {
    ...theme.layouts.singleColumn
  },
  container: {
    backgroundColor: 'white',
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30
  }
})

class StaticSiteRenderer extends React.Component {
  static propTypes = {
    location: React.PropTypes.object,
    staticSite: React.PropTypes.object
  }

  render() {
    const pathName = this.props.location.pathname
    let content = 'Not Found!'
    Object.keys(this.props.staticSite).forEach((key) => {
      const regexp = new RegExp(`${key}$`)
      if (pathName.match(regexp)) {
        content = this.props.staticSite[key]
      }
    })

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <ReactMarkdown source={content} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    staticSite: state.staticSite
  }
}

export default connect(mapStateToProps)(StaticSiteRenderer)
