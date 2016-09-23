describe('PixelsController', function() {

  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('vm.definition', function() {

    var controller;

    beforeEach(function() {
      controller = $controller('PixelsController', {});
    });

    it('number of rows should be equal to difinitino[0]', function() {
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
      controller.togglePixel(testPixel);

      expect('white').toBe(testPixel.color);
    });
  });
});
