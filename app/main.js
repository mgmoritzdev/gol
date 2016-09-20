require.config({
  baseUrl: '/app',
  paths: {
    angular: '../node_modules/angular/angular',
    pixels: 'pixels/pixelsController'
  },
  shim: {
    'angular': {
      exports: 'angular'
    }
  }
});

require(['angular', 'app', 'pixels'], function(angular, app, pixels) {
  angular.bootstrap(document, ['app']);

  require(['app'], pixels);
});
