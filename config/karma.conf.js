var configuration = {
  basePath: '..',
  frameworks: ['jasmine'],
  plugins: [
    require('karma-jasmine'),
    require('karma-coverage'),
    require('karma-chrome-launcher'),
    require('karma-mocha-reporter')
  ],
  customLaunchers: {
    // chrome setup for travis CI using chromium
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  },
  files: [
    { pattern: 'dist/vendor/es6-shim/es6-shim.js', included: true, watched: false },
    { pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false },
    { pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false },
    { pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false },
    { pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false },
    { pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false },
    { pattern: 'dist/vendor/zone.js/dist/fake-async-test.js', included: true, watched: false },


    { pattern: 'config/karma-test-shim.js', included: true, watched: true },

    // Distribution folder.
    { pattern: 'dist/**/*', included: false, watched: true }
  ],
  exclude: [
    // Vendor packages might include spec files. We don't want to use those.
    'dist/vendor/**/*.spec.js'
  ],
  preprocessors: {
    'dist/app/**/!(*spec|*mock).js': ['coverage']
  },
  reporters: ['mocha', 'coverage'],
  port: 9876,
  colors: true,
  autoWatch: true,
  browsers: ['Chrome'],
  singleRun: false,

  coverageReporter: {
    type: 'lcov',
    dir: 'coverage/',
    subdir: '.',
    file: 'lcov.info'
  },
};

if (process.env.TRAVIS) {
  configuration.browsers = ['Chrome_travis_ci'];
}

module.exports = function (config) {
  configuration.logLevel = config.LOG_INFO;

  config.set(configuration);
};
