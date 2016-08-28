import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import bncTheme from '../bncMuiTheme'
import BNCTextField from '../components/forms/BNCTextField'
import Form from 'react-formal'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import BNCPhoneField from '../components/forms/BNCPhoneField'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

Form.addInputTypes({
  email: BNCTextField,
  text: BNCTextField,
  tel: BNCPhoneField
})

const styles = StyleSheet.create({
  container: {
    ...theme.text.body,
    backgroundColor: theme.colors.veryLightGray,
    position: 'relative'
  },
  body: {
    position: 'relative'
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
