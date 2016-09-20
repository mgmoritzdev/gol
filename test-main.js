var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: './',
  paths: {
    angular: 'node_modules/angular/angular',
    angularMocks: 'node_modules/angular-mocks/angular-mocks',
    pixels: 'pixels/pixelsController'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    angularMocks: {
      deps: ['angular']
    },
    angularRoute: {
      deps: ['angular']
    }
  },

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

require(['angular', 'app'], function() {
  angular.bootstrap(document, ['app']);
});
