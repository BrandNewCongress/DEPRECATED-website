import React from 'react'
import yup from 'yup'
import BNCForm from './forms/BNCForm'
import Form from 'react-formal'
import { StyleSheet } from 'react-look'
import theme from '../theme'
import { onTablet } from '../media-queries'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import axios from 'axios'

const states = [
  {
    'label': 'Alabama',
    'value': 'Alabama',
  },
  {
    'label': 'Alaska',
    'value': 'Alaska',
  },
  {
    'label': 'American Samoa',
    'value': 'American Samoa',
  },
  {
    'label': 'Arizona',
    'value': 'Arizona',
  },
  {
    'label': 'Arkansas',
    'value': 'Arkansas',
  },
  {
    'label': 'California',
    'value': 'California',
  },
  {
    'label': 'Colorado',
    'value': 'Colorado',
  },
  {
    'label': 'Connecticut',
    'value': 'Connecticut',
  },
  {
    'label': 'Delaware',
    'value': 'Delaware',
  },
  {
    'label': 'District Of Columbia',
    'value': 'District Of Columbia',
  },
  {
    'label': 'Florida',
    'value': 'Florida',
  },
  {
    'label': 'Georgia',
    'value': 'Georgia',
  },
  {
    'label': 'Guam',
    'value': 'Guam',
  },
  {
    'label': 'Hawaii',
    'value': 'Hawaii',
  },
  {
    'label': 'Idaho',
    'value': 'Idaho',
  },
  {
    'label': 'Illinois',
    'value': 'Illinois',
  },
  {
    'label': 'Indiana',
    'value': 'Indiana',
  },
  {
    'label': 'Iowa',
    'value': 'Iowa',
  },
  {
    'label': 'Kansas',
    'value': 'Kansas',
  },
  {
    'label': 'Kentucky',
    'value': 'Kentucky',
  },
  {
    'label': 'Louisiana',
    'value': 'Louisiana',
  },
  {
    'label': 'Maine',
    'value': 'Maine',
  },
  {
    'label': 'Maryland',
    'value': 'Maryland',
  },
  {
    'label': 'Massachusetts',
    'value': 'Massachusetts',
  },
  {
    'label': 'Michigan',
    'value': 'Michigan',
  },
  {
    'label': 'Minnesota',
    'value': 'Minnesota',
  },
  {
    'label': 'Mississippi',
    'value': 'Mississippi',
  },
  {
    'label': 'Missouri',
    'value': 'Missouri',
  },
  {
    'label': 'Montana',
    'value': 'Montana',
  },
  {
    'label': 'Nebraska',
    'value': 'Nebraska',
  },
  {
    'label': 'Nevada',
    'value': 'Nevada',
  },
  {
    'label': 'New Hampshire',
    'value': 'New Hampshire',
  },
  {
    'label': 'New Jersey',
    'value': 'New Jersey',
  },
  {
    'label': 'New Mexico',
    'value': 'New Mexico',
  },
  {
    'label': 'New York',
    'value': 'New York',
  },
  {
    'label': 'North Carolina',
    'value': 'North Carolina',
  },
  {
    'label': 'North Dakota',
    'value': 'North Dakota',
  },
  {
    'label': 'Northern Mariana Islands',
    'value': 'Northern Mariana Islands',
  },
  {
    'label': 'Ohio',
    'value': 'Ohio',
  },
  {
    'label': 'Oklahoma',
    'value': 'Oklahoma',
  },
  {
    'label': 'Oregon',
    'value': 'Oregon',
  },
  {
    'label': 'Pennsylvania',
    'value': 'Pennsylvania',
  },
  {
    'label': 'Puerto Rico',
    'value': 'Puerto Rico',
  },
  {
    'label': 'Rhode Island',
    'value': 'Rhode Island',
  },
  {
    'label': 'South Carolina',
    'value': 'South Carolina',
  },
  {
    'label': 'South Dakota',
    'value': 'South Dakota',
  },
  {
    'label': 'Tennessee',
    'value': 'Tennessee',
  },
  {
    'label': 'Texas',
    'value': 'Texas',
  },
  {
    'label': 'Utah',
    'value': 'Utah',
  },
  {
    'label': 'Vermont',
    'value': 'Vermont',
  },
  {
    'label': 'Virgin Islands',
    'value': 'Virgin Islands',
  },
  {
    'label': 'Virginia',
    'value': 'Virginia',
  },
  {
    'label': 'Washington',
    'value': 'Washington',
  },
  {
    'label': 'West Virginia',
    'value': 'West Virginia',
  },
  {
    'label': 'Wisconsin',
    'value': 'Wisconsin',
  },
  {
    'label': 'Wyoming',
    'value': 'Wyoming',
  }
]

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
  buttonContainer: {
    marginLeft: 10,
    display: 'inline-block'
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
    nomineeDistrict: yup.string()
      .test({
        name: 'is-number',
        message: '${path} should be entered as a number only',
        test: (val) => val.match(/^[0-9]*$/) || val.match(/^AL$/)
      }),
    nomineeFacebook: yup.string()
      .test({
        name: 'is-facebook-link',
        message: '${path} is not a valid Facebook link',
        test: (val) => !val || !!val.match(/facebook.com/)
      }),
    nomineeLinkedIn: yup.string()
      .test({
        name: 'is-linkedin-link',
        message: '${path} is not a valid LinkedIn link',
        test: (val) => !val || !!val.match(/linkedin.com/)
      }),
    nomineeTwitter: yup.string()
      .test({
        name: 'is-twitter-link',
        message: '${path}is not a valid Twitter link',
        test: (val) => !val || !!val.match(/twitter.com/)
      }),
    relationship: yup.string().required(),
    leadership: yup.string().required(),
    work: yup.string().required(),
    publicSpeaking: yup.string().required(),
    politicalViews: yup.string().required(),
    runForOffice: yup.string().required(),
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
      <div className={styles.container}>
        Thank you for submitting your nomination! We review every nomination we get.
        <div className={styles.buttonContainer}>
          <RaisedButton
            label='Submit another!'
            onTouchTap={() => { this.setState({ submitted: false }) }}
          />
        </div>
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
              const valuesToSubmit = {
                ...formValues,
                source: formValues.source || 'BNC Website Submission',
                sourceDetails: formValues.sourceDetails || '',
                sourceTeam: formValues.sourceTeam || 'America',
                submitterEmail: formValues.submitterEmail || formValues.nominaterEmail
              }
              const response = await axios.post(`${window.BNC_API_URL}/nominations`, formValues)
              this.setState({ sending: false })
              if (response.status !== 200) {
                this.setState({ error: true })
              } else {
                this.setState({ submitted: true })
              }
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
                    fixedLabel='Your Name'
                    label='Your Name'
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nominatorEmail'
                    type='email'
                    fixedLabel='Your Email'
                    label='Your Email'
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nominatorPhone'
                    type='tel'
                    fixedLabel='Your Phone'
                    label='Your Phone'
                    hideLabel
                    fullWidth
                  /><br />
                </div>
                <div className={styles.formBlock}>
                  <div className={styles.formBlockHeader}>
                    About The Nominee - Basics
                  </div>
                  <Form.Field
                    name='nomineeName'
                    fixedLabel="Nominee's Name"
                    label="Nominee's Name"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeEmail'
                    type='email'
                    fixedLabel="Nominee's Email"
                    label="Nominee's Email"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineePhone'
                    type='tel'
                    fixedLabel="Nominee's Phone"
                    label="Nominee's Phone"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeCity'
                    fixedLabel="Nominee's City"
                    label="Nominee's City"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeState'
                    type='select'
                    fixedLabel="Nominee's State"
                    label="Nominee's State"
                    choices={states}
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeDistrict'
                    fixedLabel="Nominee's Congressional District"
                    label="Nominee's District"
                    hintText="A number or 'AL' for at-large"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeFacebook'
                    fixedLabel="Nominee's Facebook"
                    label="Nominee's Facebook"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeLinkedIn'
                    fixedLabel="Nominee's LinkedIn"
                    label="Nominee's LinkedIn"
                    hideLabel
                    fullWidth
                  /><br />
                  <Form.Field
                    name='nomineeTwitter'
                    fixedLabel="Nominee's Twitter"
                    label="Nominee's Twitter"
                    hideLabel
                    fullWidth
                  /><br />
                </div>
              </div>
              <div className={styles.formSection}>
                <div className={styles.formBlock}>
                  <div className={styles.formBlockHeader}>
                    About The Nominee - Details
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
                    label='Nominee has run for office'
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
                    hideLabel
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
