// const webpackcfg = require('./../cfg/webpack.config')
const path = require('path')
const ROOT_PATH = path.join(__dirname, '..')

module.exports = function (config) {
  config.set({
    // list of files to exclude
    exclude: [],
    // list of files / patterns to load in the browser
    files: [
      ROOT_PATH + '/node_modules/phantomjs-polyfill/bind-polyfill.js',
      ROOT_PATH + '/test/*'
    ],
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*': ['webpack', 'sourcemap']
    },
    // webpack: {
    //   module: webpackcfg.module
    // },
    plugins: [
      'karma-jasmine',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['PhantomJS'],
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 100000,
    browserNoActivityTimeout: 30000,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    logColors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false
  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  // singleRun: !process.env.CONTINUOUS_INTEGRATION
  })
}
