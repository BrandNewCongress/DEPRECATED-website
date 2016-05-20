import 'babel-polyfill'
import express from 'express'
import fallback from 'express-history-api-fallback'
import path from 'path'
import log from './log'
import proxy from 'express-http-proxy'
import url from 'url'

// Properly catch async exceptions, log them, and re-throw them
// on the main process to crash the program
const wrap = (fn) =>
  (...args) =>
    fn(...args)
      .catch((ex) => {
        log.error(ex)
        process.nextTick(() => { throw ex })
      })
const app = express()
const port = process.env.PORT
const publicPath = path.resolve(__dirname, '../../build/frontend')
app.enable('trust proxy')

app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.redirect('/home')
})

app.use(express.static(publicPath, {
  maxAge: '180 days'
}))

app.use('/go', proxy('brandnewcongress.nationbuilder.com', {
  forwardPath: (req) => url.parse(req.url).path.replace(/^\/go/, '/')
}))

// These are pages we want to move into this repo
app.use([
  '/teams',
  '/callteam',
  '/helpdesk',
  '/talentteam',
  '/eventsteam',
  '/legal_team',
  '/moneyteam',
  '/travelteam',
  '/crmteam',
  '/analytics_team',
  '/web_team',
  '/techteam',
  '/wikiteam',
  '/platformteam',
  '/creative_team',
  '/social_media',
  '/email_team',
  '/pressteam'],
  proxy('brandnewcongress.nationbuilder.com', {
    forwardPath: (req) => url.parse(req.url).path
  })
)

app.use([
  '/home',
  '/assets',
  '/about',
  '/teams',
  '/abteam',
  '/adteam',
  '/call',
  '/conferencecallteam',
  '/dataentryteam',
  '/faq',
  '/officeteam',
  '/researchteam',
  '/shareteam',
  '/spreadsheetteam',
  '/textingteam',
  '/travelteam'],
  proxy('brandnewcongress.github.io', (req) => url.parse(req.url).path
  )
)

app.use(fallback('index.html', {
  root: publicPath,
  maxAge: 0
}))
