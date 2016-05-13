import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import config from './config'

const port = process.env.WEBPACK_PORT
config['output'] = {
  filename: 'app.js',
  path: '/'
}
config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${process.env.WEBPACK_PORT}/`);
let compiler = webpack(config);

let connstring = `http://${process.env.APP_HOST||'localhost'}:${process.env.WEBPACK_PROXY_PORT}`

console.log('Proxying requests to:',connstring)

let app = new WebpackDevServer(compiler, {
  contentBase: '/assets/js/',
  publicPath: '/assets/js/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '*': `http://${process.env.APP_HOST}:${process.env.WEBPACK_PROXY_PORT}`
  },
  stats: {colors: true},
});

const publicPath = path.resolve(__dirname, '../build/frontend');
app.use(express.static(publicPath))
app.listen(port, () => {
  console.log(`Webpack dev server is now running on http://localhost:${port}`);
});
