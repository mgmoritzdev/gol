(function() {
  angular.module('app')
    .directive('score', scoreDirective)
    .controller('ScoreController', ['$interval', 'golService', ScoreController]);

  function scoreDirective() {
    return {
      restrict: 'E',
      templateUrl: 'app/score/score.html',
      controller: 'ScoreController',
      controllerAs: 'vm',
      scope: {
        score: '&'
      },
      bindToController: true
    };
  }

  function ScoreController($interval, golService) {
    var vm = this;
    vm.color = 'red';

    vm.score = golService.getScore();
    $interval(function() {
    	vm.score = golService.getScore();	
    }, 1000);
  }
})();
