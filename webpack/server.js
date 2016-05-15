import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import express from 'express';
import config from './config'

const webpackPort = 3000
const appPort = process.env.APP_PORT
config['output'] = {
  filename: 'app.js',
  path: '/'
}
config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${webpackPort}/`);
let compiler = webpack(config);

let connstring = `http://localhost:${appPort}`

console.log('Proxying requests to:',connstring)

let app = new WebpackDevServer(compiler, {
  contentBase: '/assets/js/',
  publicPath: '/assets/js/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '*': `http://localhost:${appPort}`
  },
  stats: {colors: true},
});

const publicPath = path.resolve(__dirname, '../build/frontend');
app.use(express.static(publicPath))
app.listen(webpackPort, () => {
  console.log(`Webpack dev server is now running on http://localhost:${webpackPort}`);
});
