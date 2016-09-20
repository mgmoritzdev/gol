define(['angular'], function(angular) {
  var app = angular.module('app', []);

  app.config([
    '$controllerProvider',
    // '$compileProvider',
    // '$filterProvider',
    // '$provide',
    function($controllerProvider) {
      app.controller = $controllerProvider.register;
    }
  ]);

  return app;
});
