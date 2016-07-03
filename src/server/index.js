import path from 'path'
import axios from 'axios'
import bodyParser from 'body-parser'
import 'babel-polyfill'
import express from 'express'
import log from './log'
import proxy from 'http-proxy-middleware'
import clientRouteHandler from './middleware/client-route-handler'
import legacySite, { SITE_DIR as STATIC_SITE_DIR } from './middleware/legacy-site'
import wrap from './wrap'
import mail from './mail'

const app = express()
const port = process.env.PORT
app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In development, we use webpack server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }))
}

app.use([
  '/teams',
  '/forms',
  '/helpdesk',
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

// This is temporary until we figure out how to just use webpack to build our image assets
app.use('/images', express.static(
  path.resolve(process.cwd(), 'src/images')))

app.use('/static-assets', express.static(path.resolve(STATIC_SITE_DIR, 'assets')))

app.use([
  '/callteam',
  '/home',
  '/about',
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
  '/travelteam'], legacySite)

app.get('/', wrap(async (req, res) => {
  res.redirect('/home')
}))

app.post('/signup', wrap(async (req, res) => {
  const body = req.body
  const nameParts = body.fullName.split(/\s+/)
  const firstName = nameParts.shift()
  const lastName = nameParts.join(' ')
  const requestBody = {
    person: {
      email1: body.email,
      phone: body.phone,
      first_name: firstName,
      last_name: lastName,
      primary_address: {
        zip: body.zip
      }
    }
  }

  let response = null
  response = await axios
    .post(`https://${process.env.NATIONBUILDER_SLUG}.nationbuilder.com/api/v1/people?access_token=${process.env.NATIONBUILDER_TOKEN}`, requestBody, { headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, validateStatus: () => true })

  if (response && (response.status === 201 || response.status === 409)) {
    await mail.sendEmailTemplate(body.email, 'Thanks for signing up. This is what you can do now.', 'signup', {name: firstName })
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
}))

app.get('/techteam', (req, res) => {
  res.redirect('https://github.com/BrandNewCongress/welcome/blob/master/README.md')
})

app.use(clientRouteHandler)
app.listen(port, () => {
  log.info(`Node app is running on port ${port}`)
})
