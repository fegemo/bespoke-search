const puppeteer = require('puppeteer')

process.env.CHROME_BIN = puppeteer.executablePath()

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: ['test/spec/*Spec.js', 'lib/**/*.js'],
    exclude: [],

    client: {
      jasmine: {
        random: false
      }
    },

    preprocessors: {
      'test/spec/*.js': 'browserify',
      'lib/*.js': ['browserify', 'coverage'],
    },
    browserify: {
      debug: false,
      basedir: __dirname,
      transform: [
        ['browserify-css', { global: true, rootDir: './lib' }],
      ]
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'lcov',
      dir: 'test/coverage',
      instrumenterOptions: {
        istanbul: { noCompact: true },
      },
    },

    port: 9090,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true
  })
}
