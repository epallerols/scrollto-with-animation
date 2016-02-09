const webpackcfg = require('./../cfg/webpack.config')
const path = require('path')
const ROOT_PATH = path.join(__dirname, '..')

module.exports = function (config) {
  config.set({
    exclude: [],
    basePath: ROOT_PATH,
    files: [
      'test/**/*.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackcfg.module
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    browsers: ['PhantomJS'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    captureTimeout: 100000,
    browserNoActivityTimeout: 30000,
    colors: true,
    logColors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false
  })
}
