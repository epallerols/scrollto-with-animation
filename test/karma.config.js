const webpackConfig = require('./../webpack.config')

module.exports = (config) => {
  config.set({
    basePath: __dirname,
    files: [
      '**/*.js'
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      '**/*.js': ['webpack', 'sourcemap']
    },
    webpack: { module: webpackConfig.module },
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
