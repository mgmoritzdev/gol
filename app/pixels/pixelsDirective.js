(function() {
  angular.module('app')
    .directive('pixels', pixelsDirective)

  function pixelsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/pixels/pixels.html',
      controller: 'PixelsController',
      controllerAs: 'vm',
      scope: {
        rows: '&',
        getColorStyle: '&',
        pixelClicked: '&'
      },
      bindToController: true
    };
  }
})();
