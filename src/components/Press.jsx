import React from 'react'
import theme from '../theme'
import { StyleSheet } from 'react-look'
import { onTablet } from '../media-queries'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.white
  },
  contentContainer: {
    ...theme.layouts.singleColumn
  },
  pressImageContainer: {
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 30,
    borderTop: `1px solid ${theme.colors.lightGray}`,
    textAlign: 'center'
  },
  pressTitle: {
    ...theme.text.header,
    paddingTop: 20,
    paddingBottom: 20,
    color: theme.colors.black
  },
  pressVideos: {
    display: 'flex',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    [onTablet]: {
      flexDirection: 'column'
    }
  },

  video: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  logoRow: {
    display: 'block'
  },
  caption: {
    marginTop: 15,
    fontWeight: 800,
    display: 'flex'
  },
  line: {
    border: `solid 1px ${theme.colors.veryLightGray}`,
    marginTop: 7
  }
})

const inlineStyles = {
  logo: {
    opacity: 0.6,
    paddingTop: 10,
    paddingRight: 20
  }
}

export default () => (
  <div className={styles.container}>
    <div className={styles.contentContainer}>
      <div className={styles.pressTitle}>
        Learn More
      </div>
      <div className={styles.videoContainer}>
        <div className={styles.pressVideos}>
          <div className={styles.video}>
            <iframe width='356' height='200' src='https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fbrandnewcongress%2Fvideos%2F844761672323970%2F&show_text=0' frameBorder='0' allowFullScreen='true'>
            </iframe>
            <div className={styles.caption}>
              Rachel Maddow
            </div>
          </div>
          <div className={styles.video}>
            <iframe src='https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FNowThisElection%2Fvideos%2F1255138781184276%2F&show_text=0' width='356' height='200' frameBorder='0' allowFullScreen='true'></iframe>
            <div className={styles.caption}>
              NowThis
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pressImageContainer}>
        <div className={styles.logoRow}>
          <a href='https://www.washingtonpost.com/opinions/the-sanders-movement-is-only-just-beginning/2016/08/09/228b8744-5d87-11e6-9d2f-b1a3564181a1_story.html?utm_term=.e2feb4ead733'>
            <img
              alt='Washington Post'
              src='../images/washingtonPost.png'
              style={{
                ...inlineStyles.logo,
                height: 80
              }}
            />
          </a>
        </div>
        <div className={styles.logoRow}>
          <a href='http://www.wsj.com/articles/sanders-supporters-seek-to-make-his-liberal-agenda-endure-1462485056' >
            <img
              alt='Wall Street Journal'
              src='../images/wallstreetjournal.png'
              style={{
                ...inlineStyles.logo,
                height: 35
              }}
            />
          </a>
          <a href='https://www.wired.com/2016/05/bernie-wont-get-nomination-online-army-isnt-done/'>
            <img
              alt='Wired'
              src='../images/wired.png'
              style={{
                ...inlineStyles.logo,
                height: 35
              }}
            />
          </a>
        </div>
        <div className={styles.logoRow}>
          <a href='http://www.slate.com/articles/news_and_politics/the_next_20/2016/09/ralph_nader_and_the_tragedy_of_voter_as_consumer_politics.html'>
            <img
                alt='Slate'
                src='../images/slate.png'
                style={{
                    ...inlineStyles.logo,
                    height: 20
                  }}  

            />
          </a>

          <a href='http://www.huffingtonpost.com/entry/bernie-sanders-congress_us_5720e608e4b0b49df6a9c933'>
            <img
                src='../images/thehuffingtonpost.png'                
                style={{
                    ...inlineStyles.logo,
                    height: 20
                  }}  
            />
          </a>

          <a href='https://www.thenation.com/article/is-brand-new-congress-the-future-of-progressive-politics'>
            <img src='../images/nation.png'
                 style={{
                     ...inlineStyles.logo,
                     height: 20
                   }}
            />
          </a>
          <a href='http://www.rollcall.com/news/politics/whats-next-sanders-backers-replace-entire-congress'>
            <img src='../images/rollcall.png'                 
                 style={{ ...inlineStyles.logo, height: 20 }}/>
          </a>

          <a href='http://www.thedailybeast.com/articles/2016/05/02/where-does-the-bernie-sanders-movement-go-from-here.html'>
            <img src='../images/dailybeast.png'
                 style={{ ...inlineStyles.logo, height: 20 }}/>
          </a>

          <a href='http://www.salon.com/2016/07/24/whats_next_for_the_bernie_sanders_revolution_meet_the_groups_keeping_up_his_fight_for_progressive_values/'>
            <img src='../images/salon.png'
                 style={{ ...inlineStyles.logo, height: 20 }}/>
          </a>
        </div>
      </div>
    </div>
  </div>
)
