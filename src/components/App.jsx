import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import bncTheme from '../bncMuiTheme'
import BNCTextField from '../components/forms/BNCTextField'
import Form from 'react-formal'
import { StyleSheet } from 'react-look'
import theme from '../theme'

Form.addInputTypes({
  string: BNCTextField
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.veryLightGray
  },
  body: {
    paddingTop: 10
  }
})

const App = ({ children }) => (
  <MuiThemeProvider muiTheme={bncTheme}>
    <div className={styles.container}>
      <Navigation />
      <div className={styles.body}>
        {children}
      </div>
      <Footer />
    </div>
  </MuiThemeProvider>
)

App.propTypes = {
  children: React.PropTypes.object
}

export default App
