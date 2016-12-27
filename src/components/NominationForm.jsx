import React from 'react'
import yup from 'yup'
import BNCForm from './forms/BNCForm'
import Form from 'react-formal'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onTablet } from '../media-queries'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingTop: 50,
    paddingBottom: 30,
    [onTablet]: {
      paddingTop: 30
    },
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  formBlock: {
    borderRadius: 5,
    marginTop: 5,
    border: `1px solid ${theme.colors.lightGray}`,
    padding: 10
  },
  formBlockHeader: {
    ...theme.text.header,
    fontSize: 18,
    color: theme.colors.orange,
    paddingBottom: 0
  },
  formDescription: {
    ...theme.text.body,
    marginTop: 10
  },
  formContainer: {
    position: 'relative',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: theme.colors.white,
    padding: 20
  },
  formHeader: {
    ...theme.text.header,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center'
  },
  formSectionsContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    [onTablet]: {
      flexDirection: 'column'
    }
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 5,
    marginRight: 5
  }
})

export default class NominationForm extends React.Component {
  formSchema = yup.object({
    nominatorName: yup.string()
      .required(),
    nominatorEmail: yup.string()
      .transform((value) => value.replace(/\s/g, ''))
      .required()
      .email(),
    nominatorPhone: yup.string()
      .required(),
    nomineeName: yup.string()
      .required(),
    nomineeEmail: yup.string().email(),
    nomineePhone: yup.string(),
    nomineeCity: yup.string().required(),
    nomineeState: yup.string().required(),
    nomineeDistrict: yup.string(),
    nomineeFacebook: yup.string(),
    nomineeLinkedIn: yup.string(),
    nomineeTwitter: yup.string(),
    relationship: yup.string().required(),
    leadership: yup.string().required(),
    work: yup.string().required(),
    publicSpeaking: yup.string().required(),
    politicalViews: yup.string().required(),
    runForOffice: yup.bool().required(),
    officeRunResults: yup.string(),
    otherInfo: yup.string(),
    districtInfo: yup.string(),
    source: yup.string(),
    sourceTeamName: yup.string(),
    submitterEmail: yup.string().email()
  })

  state = {
    sending: false,
    error: false,
    submitted: false
  }

  handleRequestClose = () => {
    this.setState({
      error: false
    })
  }

  renderPostSubmission() {
    return (
      <div>
        Thank you for submitting your nomination! We review every nomination we get. 
        <RaisedButton
          label='Submit another!'
        />
      </div>
    )
  }

  renderNominationForm() {
    return (
      <div className={styles.container}>
        <div className={styles.formHeader}>
          Nominate a Candidate
        </div>
        <div className={styles.formDescription}>
          If this is your first time here, please read the information <a href='https://brandnewcongress.org/nominate'>on the nomination guide</a> before making your nomination. Please only nominate people who fit BNC's criteria.  Please do not nominate yourself. If you fit the criteria, please get someone else to nominate you!
        </div>
        <div className={styles.formDescription}>
          We’ve got very high standards for our candidates, which makes finding them very difficult work! That's why we really need YOUR help!
        </div>
        <div className={styles.formContainer}>
          <BNCForm
            schema={this.formSchema}
            onSubmit={async (formValues) => {
              this.setState({ sending: true })
            }}
          >
            <div className={styles.formSectionsContainer}>
              <div className={styles.formSection}>
                <div className={styles.formBlock}>
                  <div className={styles.formBlockHeader}>
                    About You
                  </div>
                  <Form.Field
                    name='nominatorName'
                    label='Your Name'
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nominatorEmail'
                    type='email'
                    label='Your Email'
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nominatorPhone'
                    type='tel'
                    label='Your Phone'
                    fullWidth
                  /><br />
                </div>
                <div className={styles.formBlock}>
                  <div className={styles.formBlockHeader}>
                    About Your Nominee - Basics
                  </div>
                  <Form.Field
                    name='nomineeName'
                    label="Nominee's Name"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineePhone'
                    type='email'
                    label="Nominee's Email"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineePhone'
                    type='tel'
                    label="Nominee's Phone"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeCity'
                    label="Nominee's City"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeState'
                    label="Nominee's State"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeDistrict'
                    label="Nominee's District"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeFacebook'
                    label="Nominee's Facebook"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeLinkedIn'
                    label="Nominee's LinkedIn"
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeTwitter'
                    label="Nominee's Twitter"
                    fullWidth
                  /><br />
                </div>
              </div>
              <div className={styles.formSection}>
                <div className={styles.formBlock}>
                  <div className={styles.formBlockHeader}>
                    About Your Nominee - Details
                  </div>
                  <Form.Field
                    name='relationship'
                    multiLine
                    fixedLabel='How do you know the nominee/how did you meet?'
                    label='Your relationship to the nominee'
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='leadership'
                    multiLine
                    fixedLabel='How has the nominee served or been a leader in their community? Please give us at least one specific example of how the nominee has sought to help others, led others, or tried to make the world a better place.'
                    label="Nominee's service record"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='work'
                    multiLine
                    fixedLabel="What is the nominee's current and previous occupations?"
                    label="Nominee's career"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='publicSpeaking'
                    multiLine
                    fixedLabel='Is the nominee good at public speaking? Please give us at least one specific example of how the nominee has sought to help others, led others, or tried to make the world a better place.'
                    label="Nominee's public speaking"                    
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='politicalViews'
                    multiLine
                    fixedLabel="What are the nominee's political views? Do you think they would support the BNC plan? Do they identify with any political party?"
                    label="Nominee's political views"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='runForOffice'
                    fixedLabel='Has the nominee run for office before?'
                    type='select'
                    choices={[{
                      label: 'Yes',
                      value: 'Yes'
                    }, {
                      label: 'No',
                      value: 'No'
                    }, {
                      label: 'Not Sure',
                      value: 'Not Sure'
                    }]}
                    fullWidth
                  /><br />
                  <Form.Field
                    name='officeRunResults'
                    multiLine
                    fixedLabel='If yes, what office did the run for? Did they win or lose? Was it a close race?'
                    fullWidth
                  /><br />
                  <Form.Field
                    name='otherInfo'
                    multiLine
                    fixedLabel="Is there anything else you'd like to tell us about the nominee?"
                    label="Other info"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='districtInfo'
                    multiLine
                    fixedLabel="What are the most important things we need to know about this district?"
                    label="District information"
                    hideLabel
                    fullWidth
                  /><br />
                </div>
              </div>
            </div>
            <Form.Button
              name='submit'
              type='submit'
              label='Nominate this person!'
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
        </div>
        <Snackbar
          open={this.state.error}
          message='There was an error with your nomination.  Try again!'
          bodyStyle={{
            maxWidth: '100%',
            backgroundColor: theme.colors.red
          }}
          action={null}
          autoHideDuration={10000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }

  render() {
    return this.state.submitted ? this.renderPostSubmission() : this.renderNominationForm()  
  }
}
