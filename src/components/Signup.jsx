import React from 'react'
import Form from 'react-formal'
import yup from 'yup'
import BNCForm from './forms/BNCForm'
import { StyleSheet } from 'react-look'
import { onMobile, onDesktop } from '../media-queries'
import Paper from 'material-ui/Paper'
import theme from '../theme'

const headerStyle = {
  fontWeight: 600,
  display: 'block',
  paddingBottom: 10,
  fontSize: '2.5vw',
  [onMobile]: {
    fontSize: '25px'
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 0,
    width: '100%'
  },
  link: { ...theme.link },
  bold: {
    fontWeight: 800
  },
  leadIn: {
    fontWeight: 800,
    color: theme.colors.orange
  },
  formHeader: {
    fontSize: '1.5vw',
    fontWeight: 300,
    [onMobile]: {
      fontSize: '14px'
    }
  },
  header: {
    color: theme.colors.orange,
    ...headerStyle
  },
  secondaryHeader: {
    color: theme.colors.purple,
    ...headerStyle
  },

  body: {
    color: theme.colors.darkGray,
    fontWeight: 300,
    fontSize: '1.5vw',
    display: 'block',
    paddingBottom: 30,
    lineHeight: '1.5em',
    [onMobile]: {
      fontSize: '14px'
    }
  },
  contentContainer: {
    display: 'flex',
    maxWidth: 1024,
    marginLeft: 'auto',
    marginRight: 'auto',
    [onDesktop]: {
      flexDirection: 'row'
    },
    [onMobile]: {
      flexDirection: 'column'
    }
  },
  explanation: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    marginLeft: 30,
    flex: 1
  },
  form: {
    width: 400,
    marginRight: 30,
    [onMobile]: {
      width: '100%'
    }
  },
  line: {
    border: `solid 1px ${theme.colors.veryLightGray}`,
    marginTop: 7
  }
})
export default class Signup extends React.Component {

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
        <div className={styles.line} />
        <BNCForm
          schema={this.formSchema}
          onSubmit={(formValue) => {
            console.log(formValue)
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
            label='Count Me In!'
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
            <a className={styles.link} href='http://www.realclearpolitics.com/epolls/other/congressional_job_approval-903.html'>80% of Americans agree.</a> Its decisions are <a className={styles.link} href='http://www.bbc.com/news/blogs-echochambers-27074746'>driven by a handful of wealthy individuals</a>, it is incapable of  working together to enact real change, and <a className={styles.link} href='https://www.youtube.com/watch?v=Ylomy1Aw9Hk'>its members spend too much time dialing for dollars instead of working</a>.
            </div>
            <div className={styles.secondaryHeader}>
            Let's fix it.
            </div>
            <div className={styles.body}>
            We need <span className={styles.bold}>an honest, accountable Congress</span>, but trying to win each congressional seat one-by-one is impossible.  So let's replace Congress all at once. Our plan is to recruit and run 400+ candidates as a single, unified campaign with a single plan. By giving the people an option for big, palpable change, we plan to whip up the same enthusiasm, volunteerism, voter turnout, and grassroots donations as Bernie's presidential candidate. <span className={styles.leadIn}>Let's elect a Brand New Congress that works for the people because it was put in power by the people.</span>
            </div>
          </div>
          <div className={styles.form}>
            {this.renderForm()}
          </div>
        </div>
      </div>
    )
  }
}
