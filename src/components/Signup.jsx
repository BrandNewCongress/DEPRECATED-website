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
  header: {
    ...theme.text.header,
    paddingBottom: 30,
    color: theme.colors.orange
  },
  body: {
    ...theme.text.body,
    paddingBottom: 20
  },
  container: {
    width: '100%'
  },
  link: { ...theme.text.link },
  leadIn: {
    fontWeight: 800,
    color: theme.colors.purple
  },
  formHeader: {
    padding: '5px 5px 5px 5px',
    border: `1px solid ${theme.colors.lightGray}`
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
    error: false,
    submitted: false
  }

  formSchema = yup.object({
    fullName: yup.string(),
    phone: yup.string(),
    email: yup.string().transform((value) => value.replace(/\s/g, ''))
              .required()
              .email(),
    zip: yup.string().required()
  })

  handleRequestClose = () => {
    this.setState({
      error: false
    })
  }

  renderForm() {
    return (
      <Paper
        zDepth={1}
        style={{
          padding: '20px 20px 20px 20px'
        }}
      >
        <div id='sign-up' className={styles.formHeader}>
          {this.props.pledge}
        </div>
        <BNCForm
          schema={this.formSchema}
          onSubmit={async (formValues) => {
            this.setState({ sending: true })
            const response = await axios.post('/signup', formValues)
            this.setState({ sending: false })
            if (response.status !== 200) {
              this.setState({ error: true })
            } else {
              if (this.props.thankYouBody) {
                this.setState({ submitted: true })
              } else {
                location.href = 'https://secure.actblue.com/contribute/page/bncdec'
              }
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
          {this.props.showName ? <div><Form.Field
            name='fullName'
            type='text'
            label='Name'
            fullWidth
          /><br /></div> : '' }
          {this.props.showPhone ? <div><Form.Field
            name='phone'
            type='tel'
            label='Phone'
            fullWidth
          /><br /></div> : ''}
          <Form.Field
            name='zip'
            type='text'
            autoComplete='postal-code'
            label='Zip'
            fullWidth
          />
          <Form.Button
            name='submit'
            type='submit'
            label={this.props.submitLabel || 'Count Me In!'}
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

  renderPostSignup() {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.explanation}>
            <div className={styles.header}>
              {this.props.thankYouHeader || 'Thank you for signing up!'}
            </div>
            <div className={styles.body}>
              {this.props.thankYouBody}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderSignup() {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.explanation}>
            {this.props.content}
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

  render() {
    return this.state.submitted ? this.renderPostSignup() : this.renderSignup()
  }
}
