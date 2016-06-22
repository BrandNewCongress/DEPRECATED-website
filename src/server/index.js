import path from 'path'

import 'babel-polyfill'
import express from 'express'
import log from './log'
import proxy from 'http-proxy-middleware'
import clientRouteHandler from './client-route-handler'
import legacySite, { SITE_DIR as STATIC_SITE_DIR } from './middleware/legacy-site'

const app = express()
const port = process.env.PORT
app.enable('trust proxy')

app.get('/', (req, res) => {
  res.redirect('/home')
})

app.get('/techteam', (req, res) => {
  res.redirect('https://github.com/BrandNewCongress/welcome/blob/master/README.md')
})

// In development, we use webpack server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }))
}

app.use('/go',
  proxy({
    target: 'http:/go.brandnewcongress.org',
    changeOrigin: true,
    pathRewrite: {
      '^/go': '/'
    }
  })
)

app.use([
  '/teams',
  '/forms',
  '/talentteam',
  '/eventsteam',
  '/legal_team',
  '/moneyteam',
  '/travelteam',
  '/crmteam',
  '/analytics_team',
  '/web_team',
  '/platformteam',
  '/creative_team',
  '/social_media',
  '/email_team',
  '/pressteam'],
  proxy({
    target: 'http://go.brandnewcongress.org',
    changeOrigin: true
  }))

app.use('/static-assets', express.static(path.resolve(STATIC_SITE_DIR, 'assets')))

app.use([
  '/home',
  '/callteam',
  '/about',
  '/abteam',
  '/adteam',
  '/call',
  '/conferencecallteam',
  '/dataentryteam',
  '/helpdesk',
  '/faq',
  '/officeteam',
  '/researchteam',
  '/shareteam',
  '/spreadsheetteam',
  '/textingteam',
  '/wikiteam',
  '/travelteam'], legacySite)

app.use(clientRouteHandler)
app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})
