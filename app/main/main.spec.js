describe('MainController', function() {

  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('vm.hello', function() {

    var controller;

    beforeEach(function() {
      controller = $controller('MainController', {});
    });

    it('must be \'Hello, World!\'', function() {
      expect(controller.hello).toBe('Hello, World!');
    });
  });
});
