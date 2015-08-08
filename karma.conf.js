module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      'test/spec/*Spec.js'
    ],

    exclude: [],

    preprocessors: {
      'test/**/*.js': 'browserify'
    },

    browserify: {
      debug: true,
      transform: ['babelify']
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir : 'test/coverage',
      reporters: [
        { type : 'lcov', subdir: 'report-lcov' },
        { type : 'html', subdir: 'report-html' }
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },

    port: 8080,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
