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
  secondaryHeaderBlack: {
    ...theme.text.header,
    paddingBottom: 20,
    color: theme.colors.black
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

  },
  extendedContentContainer: {
    backgroundColor: theme.colors.white,
    marginTop: 30,
    border: `1px solid ${theme.colors.lightGray}`
  },

  pressContainer: {
    ...theme.layouts.multiColumn.container
  },
  pressImageContainer: {
    ...theme.layouts.multiColumn.container
  },
  pressTitle: {
    ...theme.layouts.multiColumn.container
  },
  pressTitleColumn: {
    ...theme.layouts.multiColumn.flexColumn,
    paddingTop: 30,
    marginRight: 50,
    marginLeft: 30,
    [onTablet]: {
      marginLeft: 25,
      marginRight: 25
    }
  },
  pressVideos: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  video1: {
    float: 'left',
    textAlign: 'center',
    marginLeft: 30,
    [onTablet]: {
      marginLeft: 25,
      marginRight: 25
    }
  },
  caption: {
    display: 'block',
    fontWeight: 800
  },
  video2: {
    float: 'left',
    textAlign: 'center',
    marginLeft: 30,
    [onTablet]: {
      marginLeft: 25,
      marginRight: 25
    }
  },
  logo: {
    ...theme.layouts.multiColumn.flexColumn,
    display: 'inline-block',
    marginTop: 20,
    textAlign: 'center',
    [onTablet]: {
      marginRight: 'auto',
      marginLeft: 'auto'

    }
  },
  pressImage: {
    paddingRight: 50,
    height: 50
  },
  line: {
    border: `solid 1px ${theme.colors.veryLightGray}`,
    marginTop: 7
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
        <div className={styles.extendedContentContainer}>

            <div className={styles.pressTitle}>
                <div className={styles.pressTitleColumn}>
                <div className={styles.secondaryHeaderBlack}>
                        Learn More
                    </div>                              </div>

            </div>
            <div className={styles.pressContainer}>
                <div className={styles.pressVideos}>

                <div className={styles.video1}>
                        <iframe width='356' height='200' src='https://www.youtube.com/embed/rvGtVu8gmtg' frameBorder='0' allowFullScreen>
                        </iframe>
                        <span className={styles.caption}>
                            Rachel Maddow
                        </span>

                    </div>
                    <div className={styles.video2}>
                        <iframe src='https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FNowThisElection%2Fvideos%2F1255138781184276%2F&show_text=0' width='356' height='200' frameBorder='0' allowFullScreen='true'></iframe>
                        <span className={styles.caption}>
                            NowThis
                        </span>
                    </div>

</div>
            </div>
            <div className={styles.pressImageContainer}>

                <div className={styles.logo}>
                    <a href='https://www.washingtonpost.com/opinions/the-sanders-movement-is-only-just-beginning/2016/08/09/228b8744-5d87-11e6-9d2f-b1a3564181a1_story.html?utm_term=.e2feb4ead733'>
                        <img src='../images/washingtonPost.png' className={styles.pressImage} />
                    </a>
                    <a href='http://www.wsj.com/articles/sanders-supporters-seek-to-make-his-liberal-agenda-endure-1462485056' >
                        <img src='../images/wallstreetjournal.png' className={styles.pressImage} />
                    </a>

                    <a href='http://www.slate.com/articles/news_and_politics/the_next_20/2016/09/ralph_nader_and_the_tragedy_of_voter_as_consumer_politics.html'>
                        <img src='../images/slate.png' className={styles.pressImage} />
                    </a>

                    <a href='http://www.huffingtonpost.com/entry/bernie-sanders-congress_us_5720e608e4b0b49df6a9c933'>
                        <img src='../images/thehuffingtonpost.png' className={styles.pressImage} />
                    </a>

                    <a href='https://www.thenation.com/article/is-brand-new-congress-the-future-of-progressive-politics'>
                        <img src='../images/nation.png' className={styles.pressImage} />
                    </a>

                    <a href='https://www.wired.com/2016/05/bernie-wont-get-nomination-online-army-isnt-done/'>
                        <img src='../images/wired.png' className={styles.pressImage} />
                    </a>
                    <a href='http://www.rollcall.com/news/politics/whats-next-sanders-backers-replace-entire-congress'>
                        <img src='../images/rollcall.png' className={styles.pressImage} />
                    </a>

                    <a href='http://www.thedailybeast.com/articles/2016/05/02/where-does-the-bernie-sanders-movement-go-from-here.html'>
                        <img src='../images/dailybeast.png' className={styles.pressImage} />
                    </a>

                    <a href='http://www.salon.com/2016/07/24/whats_next_for_the_bernie_sanders_revolution_meet_the_groups_keeping_up_his_fight_for_progressive_values/'>
                        <img src='../images/salon.png' className={styles.pressImage} />
                    </a>

                </div>

            </div>
        </div>

      </div>
    )
  }
}
