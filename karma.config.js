const webpackConfig = require('./../cfg/webpack.config')

module.exports = function (config) {
  config.set({
    exclude: [],
    basePath: __dirname,
    files: [
      'test/**/*.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    webpack: {
      module: webpackConfig.module
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
    logLevel: config.LOG_INFO
  })
}
