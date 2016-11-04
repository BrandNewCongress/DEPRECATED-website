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
    fullName: yup.string().trim().required(),
    phone: yup.string().required().min(10),
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
          <span className={styles.bold}>Sign up</span> to receive updates and see how you can help
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
            name='fullName'
            type='text'
            autoComplete='name'
            label='Full Name'
            fullWidth
          /><br />
          <Form.Field
            name='phone'
            type='tel'
            autoComplete='tel'
            label='Phone (Cell preferred)'
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
            <div className={styles.header}>Congress is broken.
            </div>
            <div className={styles.body}>
            80% of Americans agree. Its decisions are driven by a handful of wealthy individuals, it is incapable of working together to enact real change, and its members spend too much time dialing for dollars.
            </div>
            <div className={styles.secondaryHeader}>
            Let's fix it.
            </div>
            <div className={styles.body}>
            We need <span className={styles.bold}>an honest, accountable Congress</span>, but trying to win each congressional seat one-by-one is impossible.  So let's replace Congress all at once. Our plan is to recruit and run 400+ candidates as a single, unified campaign with a single plan. By giving the people an option for big, tangible change, we plan to generate the same enthusiasm, volunteerism, voter turnout, and grassroots donations as Bernie's presidential campaign. <span className={styles.leadIn}>Let's elect a Brand New Congress that works for the people.</span>
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
