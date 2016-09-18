define([
  'angular',
  'angularRoute'
], function(angular) {
  angular.module('pixels', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/pixels', {
        templateUrl: '/app/pixels/pixels.html',
        controller: 'PixelsController',
        controllerAs: 'vm'
      });
    }])
    .controller('PixelsController', ['$injector', function($injector) {
      require(['/app/pixels/pixelsController.js'], [function(PixelsController) {
        $injector.invoke(
          PixelsController,
          this,
          {});
      }]);
    }]);
});
