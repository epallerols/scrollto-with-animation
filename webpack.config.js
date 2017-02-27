const path = require('path')
const webpack = require('webpack')

module.exports = {
  debug: true,
  cache: false,
  process: true,
  stats: {
    colors: true
  },
  entry: {
    'scrollto-with-animation': path.join(__dirname, '.')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map'
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        presets: ['es2015', 'stage-2']
      }
    }]
  }
}
