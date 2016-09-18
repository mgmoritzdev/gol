define(['angular', 'angularRoute', 'pixels'], function(angular, angularRoute, pixels) {
  var app = angular.module('app', ['ngRoute', 'pixels']);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/pixels'});
  }]);

  return app;
});
