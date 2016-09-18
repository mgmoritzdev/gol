module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      'test-main.js',
      'app/**/*.js',
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js'
    ],
    exclude: [
      'app/main.js'
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
