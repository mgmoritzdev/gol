define([
    'angular',
    'angularMocks',
    'app/pixels/pixelsController'
  ], PixelsSpecs);

function PixelsSpecs(angular, mocks, controller) {
  describe('PixelsController', function testPixelsController(angular, mocks, controller) {
    beforeEach(mocks.module('App'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    describe('vm.definition', testPixelsControllerDefinition);
    describe('vm.rows', testPixelsControllerRows);
  });
}

function testPixelsControllerDefinition() {
  var controller;

  beforeEach(function() {
    controller = $controller('PixelsController', {});
  });

  it('number of rows should be equal to difinitino[0]', function() {
    expect(controller.rows.length).toBe(controller.definition[0]);
    expect(controller.rows[0].pixels.length).toBe(controller.definition[1]);
  });
}

function testPixelsControllerRows() {
  var controller;

  beforeEach(function() {
    controller = $controller('PixelsController', {});
  });

  it('toggled black pixel should be white', function() {
    var testPixel = controller.rows[0].pixels[0];
    testPixel.color = 'black';
    controller.togglePixel(testPixel);

    expect('white').toBe(testPixel.color);
  });
}
