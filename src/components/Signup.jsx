import React from 'react'
import Form from 'react-formal'
import yup from 'yup'
import BNCForm from './forms/BNCForm'
import { StyleSheet } from 'react-look'
import { onMobile } from '../media-queries'
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
    marginLeft: 30
  },
  form: {
    width: 350,
    marginRight: 30,
    [onMobile]: {
      width: '80%',
      marginRight: 'auto',
      marginLeft: 'auto'
    }
  },
  line: {
    border: `solid 1px ${theme.colors.veryLightGray}`,
    marginTop: 7
  }
})
export default class Signup extends React.Component {

  state = {
    sending: false
  }

  formSchema = yup.object({
    email: yup.string().required(),
    fullName: yup.string().required(),
    phone: yup.string().required(),
    zip: yup.string().required()
  })

  renderForm() {
    return (
      <Paper
        zDepth={1}
        style={{
          padding: '20px 20px 20px 20px'
        }}
      >
        <div className={styles.formHeader}>
          <span className={styles.bold}>Sign up</span> to receive updates and see how you can help
        </div>
        <BNCForm
          schema={this.formSchema}
          onSubmit={async (formValues) => {
//            this.setState({ sending: true })
            const response = await axios
              .post('/signup', formValues)
            console.log(response)
            if (response.statusCode !== 200) {
              this.setState({ error: true })
            } else {
              location.href = 'https://secure.actblue.com/contribute/page/brandnewcongress'
            }
          }}
        >
          <Form.Field
            name='email'
            label='Email'
            fullWidth
          /><br />
          <Form.Field
            name='fullName'
            label='Full Name'
            fullWidth
          /><br />
          <Form.Field
            name='phone'
            label='Cell Phone'
            fullWidth
          /><br />
          <Form.Field
            name='zip'
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

  handleRequestClose = () => {
    this.setState({
      error: false
    })
  };

  renderErrorBar() {
    if (this.state.error) {
      return (
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          bodyStyle={{
            maxWidth: '100%',
            backgroundColor: theme.colors.red
          }}
          action={null}
          autoHideDuration={10000}
          onRequestClose={this.handleRequestClose}
        />
      )
    }
    return ''
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.explanation}>
            <div className={styles.header}>Congress is broken.
            </div>
            <div className={styles.body}>
            <a target='_blank' className={styles.link} href='http://www.realclearpolitics.com/epolls/other/congressional_job_approval-903.html'>80% of Americans agree.</a> Its decisions are <a target='_blank' className={styles.link} href='http://www.bbc.com/news/blogs-echochambers-27074746'>driven by a handful of wealthy individuals</a>, it is incapable of working together to enact real change, and <a target='_blank' className={styles.link} href='https://www.youtube.com/watch?v=Ylomy1Aw9Hk'>its members spend too much time dialing for dollars</a>.
            </div>
            <div className={styles.secondaryHeader}>
            Let's fix it.
            </div>
            <div className={styles.body}>
            We need <span className={styles.bold}>an honest, accountable Congress</span>, but trying to win each congressional seat one-by-one is impossible.  So let's replace Congress all at once. Our plan is to recruit and run 400+ candidates as a single, unified campaign with a single plan. By giving the people an option for big, tangible change, we plan to whip up the same enthusiasm, volunteerism, voter turnout, and grassroots donations as Bernie's presidential candidate. <span className={styles.leadIn}>Let's elect a Brand New Congress that works for the people.</span>
            </div>
          </div>
          <div className={styles.form}>
            {this.renderForm()}
          </div>
          {this.renderErrorBar()}
        </div>
      </div>
    )
  }
}
