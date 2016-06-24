import fs from 'fs'
import path from 'path'

import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { StyleSheet } from 'react-look'
import { connect } from 'react-redux'
import theme from '../theme'
import { onMobile } from '../media-queries'

const styles = StyleSheet.create({
      map: {
        height: '100%'
      },
      container: {
        height: '100vh',
        width: '100%',
        position: 'relative'
      },
      link: {
          ...theme.link
    },
    hero: {
  paddingTop: 10,
      paddingBottom: 10,
      position: 'relative',
      height: 'calc(100vh - 170px)',
      width: '100%',
      backgroundColor: 'white',
      [onMobile]: {
    paddingTop: 0,
        paddingBottom: 0
  }
},
welcomeMessage: {
  textAlign: 'center',
      fontFamily: 'Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif',
      fontWeight: 300,
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '1em'
},
welcomeBackground: {
  backgroundColor: theme.colors.lightGray,
      opacity: 0.5,
      height: '100%',
      width: '100%',
      position: 'absolute',
      zIndex: -1,
      margin: '-1em'
},
welcomeLine1: {
  fontSize: '2vw',
      color: theme.colors.blue,
      paddingTop: '1em',
      paddingBottom: '0.5em',
      '@media (max-width: 750px)': {
    fontSize: 16,
        width: 350,
        margin: 'auto'
  },
  '@media (max-width: 400px)': {
    display: 'none'
  }
},
signupForm: {
  backgroundColor: theme.colors.lightGray
},
welcomeLine2: {
  fontSize: '3vw',
      '@media (max-width:750px)': {
    fontSize: '24px'
  },
  '@media (max-width: 750px)': {
    fontSize: 16,
        width: 350,
        margin: 'auto'
  },
  color: theme.colors.darkGray
},
rsvpButton: {
  marginTop: '1em',
      marginBottom: '1em',
      backgroundColor: theme.colors.blue,
      color: 'white',
      padding: '0.2em 1em',
      display: 'inline-block',
      fontWeight: 600,
      fontSize: '3vw',
      cursor: 'pointer',
      borderRadius: 5,
      ':hover': {
    backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))'
  },
  '@media (max-width:750px)': {
    fontSize: '24px'
  }
},
cantMakeIt: {
  fontSize: '1.2vw',
      padding: '1em 1em 1em 1em',
      '@media (max-width:750px)': {
    fontSize: '10px'
  },
  position: 'absolute',
      textAlign: 'right',
      zIndex: 1000,
      top: 0,
      right: 30,
      color: theme.colors.gray
},
highlight: {
  color: theme.colors.orange,
      fontWeight: 600
},
welcomeMessageContainer: {
  width: '100%',
      height: '80vmin',
      position: 'absolute',
      zIndex: 1000
},
nav: {
  width: '100%',
      minHeight: 77
},
markdown_content: {
  width: '100%',
      maxWidth: '900px',
      'margin': '0px auto'
}
}
)

function mapStateToProps(state) {
  return {
    events: state.events
  }
}

class MarkdownPage extends React.Component {

  static propTypes = {
    events: React.PropTypes.array,
    selectedState: React.PropTypes.string
  }

  state = {
    introMode: false
  }

  showPage() {
    var pathname = this.props.location.pathname //'/eventsteam'
    var SITE_DIR = path.resolve(process.cwd(), 'src/static-site')
    var markdownPagePath = path.join('./src/static-site', `${pathname}.markdown`)
    if (fs.statSync(markdownPagePath).isFile()) {
      var page = fs.readFileSync(markdownPagePath, 'utf8');
      var markdown = require( "markdown" ).markdown;
      var content = ("<div class='markdown_content'>" + markdown.toHTML( page ) + "</div>");
      return (
          <div className={styles.markdown_content} dangerouslySetInnerHTML={{__html: content}} />
      );
    }
return ''
}


render() {
  return (
      <div style={{ position: 'relative' }}>
<Navigation />
<div className={styles.container}>
<div className={styles.hero}>
{this.showPage()}
</div>
</div>
<Footer />
</div>
)
}
}

export default connect(mapStateToProps)(MarkdownPage)
