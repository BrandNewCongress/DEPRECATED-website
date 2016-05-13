import express from 'express'
import fallback from 'express-history-api-fallback'
import path from 'path'

const app = express()
const port = process.env.PORT
const publicPath = path.resolve(__dirname, '../../build/frontend')

// This serves index.html
app.use(express.static(publicPath, {
  maxAge: '180 days'
}))

app.listen(port, function() {
  console.log(`Node app is running on port ${port}`);
});

// This lets us use client-side routing for any routes not defined in server.js
app.use(fallback('index.html', {
  root: publicPath,
  maxAge: 0
}))
