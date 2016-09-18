require.config({
  baseUrl: '/app',
  paths: {
    angular: '../node_modules/angular/angular'
  },
  shim: {
    'angular': {
      exports: 'angular'
    }
  }
});

require(['angular', 'app'], function() {
  angular.bootstrap(document, ['app']);
});
