const path = require('path')
const webpack = require('webpack')
const ROOT_PATH = path.join(__dirname, '..')
const ENTRY_PATH = path.join(ROOT_PATH, 'src')
const DIST_PATH = path.join(ROOT_PATH, 'dist')

module.exports = {
  debug: true,
  cache: false,
  process: true,
  stats: {
    colors: true
  },
  entry: {
    'scrollto-with-animation': [
      ENTRY_PATH
    ]
  },
  output: {
    path: DIST_PATH,
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-0']
      }
    }]
  }
}
