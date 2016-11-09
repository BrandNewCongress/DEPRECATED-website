import React from 'react'
import Form from 'react-formal'
import yup from 'yup'
import BNCForm from './forms/BNCForm'
import { StyleSheet } from 'react-look'
import { onTablet } from '../media-queries'
import Paper from 'material-ui/Paper'
import theme from '../theme'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar'

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  link: { ...theme.text.link },
  bold: {
    fontWeight: 800
  },
  leadIn: {
    fontWeight: 800,
    color: theme.colors.purple
  },
  formHeader: {
    padding: '5px 5px 5px 5px',
    border: `1px solid ${theme.colors.lightGray}`
  },
  header: {
    ...theme.text.header,
    paddingBottom: 20,
    color: theme.colors.orange
  },
  secondaryHeader: {
    ...theme.text.header,
    paddingBottom: 20,
    color: theme.colors.purple
  },
  body: {
    display: 'block',
    paddingBottom: 30,
    lineHeight: '1.5em'
  },
  contentContainer: theme.layouts.multiColumn.container,
  explanation: {
    ...theme.layouts.multiColumn.flexColumn,
    marginRight: 50,
    marginLeft: 30,
    [onTablet]: {
      marginLeft: 25,
      marginRight: 25
    }
  },
  form: {
    width: 350,
    marginRight: 30,
    [onTablet]: {
      width: '80%',
      marginRight: 'auto',
      marginLeft: 'auto'
    }

  }
})
export default class Signup extends React.Component {

  state = {
    sending: false,
    error: false
  }

  formSchema = yup.object({
    email: yup.string().transform((value) => value.replace(/\s/g, '')).required().email(),
    zip: yup.string().required()
  })

  handleRequestClose = () => {
    this.setState({
      error: false
    })
  };

  renderForm() {
    return (
      <Paper
        zDepth={1}
        style={{
          padding: '20px 20px 20px 20px'
        }}
      >
        <div id='sign-up' className={styles.formHeader}>
          <span className={styles.bold}>Add your name:</span> I am not giving up! I will support candidates of integrity for 2018 who pledge to rebuild the economy and fix our broken system.
        </div>
        <BNCForm
          schema={this.formSchema}
          onSubmit={async (formValues) => {
            this.setState({ sending: true })
            const response = await axios.post('/signup', formValues)
            this.setState({ sending: false })
            console.log(response)
            if (response.status !== 200) {
              this.setState({ error: true })
            } else {
              location.href = 'https://secure.actblue.com/contribute/page/bncsignup'
            }
          }}
        >
          <Form.Field
            name='email'
            type='email'
            autoComplete='email'
            label='Email'
            fullWidth
          /><br />
          <Form.Field
            name='zip'
            type='tel'
            autoComplete='postal-code'
            label='Zip'
            fullWidth
          />
          <Form.Button
            name='submit'
            type='submit'
            label='Count Me In!'
            disabled={this.state.sending}
            style={{
              marginTop: 15,
              width: '100%'
            }}
            labelStyle={{
              fontSize: 18
            }}
            fullWidth
          />
        </BNCForm>
      </Paper>
    )
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.explanation}>
            <div className={styles.header}>Welcome to the resistance.
            </div>
            <div className={styles.body}>
              We had a two party system. That system let the people down so badly that a reality TV star mopped the floor with BOTH parties while turning America against itself. Now it’s truly time that We the People take back our government.
            </div>
            <div className={styles.secondaryHeader}>
              We're here to take back the country.
            </div>
            <div className={styles.body}>
              We’re recruiting and running 400+ candidates as a single, unified campaign for Congress in 2018. They will pass a radical and practical plan to get everyone good jobs, get incomes rising again and rid our government of corruption. Americans are hungry to rebuild their country together with everyone from every community, region, race and culture. <span className={styles.leadIn}>Step 1 is electing a Brand New Congress in 2018.</span>
            </div>
          </div>
          <div className={styles.form}>
            {this.renderForm()}
          </div>
          <Snackbar
            open={this.state.error}
            message='There was an error with your sign up.  Try again!'
            bodyStyle={{
              maxWidth: '100%',
              backgroundColor: theme.colors.red
            }}
            action={null}
            autoHideDuration={10000}
            onRequestClose={this.handleRequestClose}
          />
        </div>
      </div>
    )
  }
}
