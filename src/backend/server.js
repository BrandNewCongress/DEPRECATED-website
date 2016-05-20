import 'babel-polyfill'
import express from 'express'
import fallback from 'express-history-api-fallback'
import path from 'path'
import log from './log'
import proxy from 'http-proxy-middleware'

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
  res.redirect('/index')
})

app.use(express.static(publicPath, {
  maxAge: '180 days'
}))

app.use([
  '/teams',
  '/about'],
  proxy({
    target: 'http://brandnewcongress.nationbuilder.com/',
    changeOrigin: true
  }))

app.use([
  '/index',
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
  proxy({
    target: 'http://brandnewcongress.github.io/',
    changeOrigin: true
  }))

app.use(fallback('index.html', {
  root: publicPath,
  maxAge: 0
}))
