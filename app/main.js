require.config({
  baseUrl: '/app',
  paths: {
    angular: '../node_modules/angular/angular',
    angularRoute: '../node_modules/angular-route/angular-route',
    pixels: 'pixels/pixels'
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    angularRoute: {
      deps: ['angular']
    }
  }
});

require(['angular', 'app'], function() {
  angular.bootstrap(document, ['app']);
});
