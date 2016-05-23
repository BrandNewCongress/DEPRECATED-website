import 'babel-polyfill'
import express from 'express'
import path from 'path'
import log from './log'
import proxy from 'http-proxy-middleware'
import clientRouteHandler from './client-route-handler'

const app = express()
const port = process.env.PORT
app.enable('trust proxy')

app.get('/', (req, res) => {
  res.redirect('/home')
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
  '/platformteam',
  '/creative_team',
  '/social_media',
  '/email_team',
  '/pressteam'],
  proxy({
    target: 'http://go.brandnewcongress.org',
    changeOrigin: true
  }))

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
  '/wikiteam',
  '/travelteam'],
  proxy({
    target: 'http://brandnewcongress.github.io',
    changeOrigin: true
  }))

app.use(clientRouteHandler)
app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})
