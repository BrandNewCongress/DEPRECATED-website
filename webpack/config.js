var webpack = require('webpack')
var AssetsWebpackPlugin = require('assets-webpack-plugin');
var path = require('path')
var DEBUG = process.env.NODE_ENV !== 'production'
var plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"' + process.env.NODE_ENV + '"'
  }),
]

var outputFile = '[name].js'
var assetsDir = process.env.ASSETS_DIR
var assetMapFile = process.env.ASSETS_MAP_FILE
if (!DEBUG) {
  plugins.push(new AssetsWebpackPlugin({ filename: assetMapFile }))
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }))
  outputFile = '[name].[chunkhash].js'
}

var config = {
  entry: {
    bundle: ['babel-polyfill', './src/client/index.jsx']
  },
  module: {
    noParse: [],
    loaders: [
      { test: /\.json$/, loader: 'json' },
      { test: /\.css$/, loader: 'style!css' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          cacheDirectory: DEBUG
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins,
  output: {
    filename: outputFile,
    path: DEBUG ? '/' : assetsDir,
    publicPath: '/assets/'
  }
}

if (DEBUG) {
  config.devtool = '#inline-source-map'
} else if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map'
}

module.exports = config
