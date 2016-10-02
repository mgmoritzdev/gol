describe('PixelsController', function() {

  var $interval;
  var $timeout;
  var golService;

  beforeEach(function() {
    module('app');

    module(function($provide) {
      $provide.factory('golService', function() {
        return {
          getNeighboursCount: function() {},
          getNewPixelColor: getWhite,
          run: function() {},
          getScore: getScore
        };

        function getScore() {
          return {
            'red': 10,
            'blue': 20
          };
        }

        function getWhite() {
          return 'white';
        }
      });
    });
  });

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var controller;

  beforeEach(inject(function($interval, $timeout, _golService_) {
    golService = _golService_;
    controller = $controller('PixelsController', {
      '$interval': $interval,
      '$timeout': $timeout,
      'golService': golService
    });
  }));

  describe('vm.definition', function() {

    it('number of rows should be equal to definition[0]', function() {
      expect(controller.rows.length).toBe(controller.definition[0]);
      expect(controller.rows[0].pixels.length).toBe(controller.definition[1]);
    });
  });

  describe('vm.rows', function() {

    var controller;

    beforeEach(function() {
      controller = $controller('PixelsController', {});
    });

    it('toggled black pixel should be white', function() {
      var testPixel = controller.rows[0].pixels[0];
      testPixel.color = 'black';
      controller.pixelClicked(testPixel, 'white');

      expect('white').toBe(testPixel.color);
    });
  });

  // describe('vm.rows', function() {

  //   var controller;

  //   beforeEach(function() {
  //     controller = $controller('PixelsController', {});
  //   });

  //   it('toggled black pixel should be white', function() {
  //     var testPixel = controller.rows[0].pixels[0];
  //     testPixel.color = 'black';
  //     controller.togglePixel(testPixel);

  //     expect('white').toBe(testPixel.color);
  //   });
  // });
});
