import express from 'express'
import fallback from 'express-history-api-fallback'
import path from 'path'
import log from './log'

// Properly catch async exceptions, log them, and re-throw them on the main process to crash the program
const wrap = (fn) => {
  return (...args) =>
  {
    return fn(...args)
      .catch((ex) => {
        log.error(ex)
        process.nextTick(() => { throw ex })
      })
  }
}
const app = express()
const port = process.env.PORT
const publicPath = path.resolve(__dirname, '../../build/frontend')

// This serves index.html
app.use(express.static(publicPath, {
  maxAge: '180 days'
}))

app.get('/hello-world', wrap(async (req, res) => {
  log.info('Hello World!')
  res.send('Hello World!')
}))

app.listen(port, function() {
  console.log(`Node app is running on port ${port}`);
});

// This lets us use client-side routing for any routes not defined in server.js
app.use(fallback('index.html', {
  root: publicPath,
  maxAge: 0
}))
