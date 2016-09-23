(function() {
  angular
    .module('app')
    .controller('PixelsController', ['$interval', '$timeout', 'golService', PixelsController]);

  function PixelsController($interval, $timeout, golService) {
    var vm = this;

    vm.definition = [25, 25];

    vm.rows = setPixels(vm.definition[0], vm.definition[1]);

    vm.getColorStyle = getColorStyle;

    golService.run(vm.rows);

    vm.pixelClicked = function(pixel) {
      changePixel(pixel, golService.getNewPixelColor(pixel));
    };
  }

  function togglePixel(pixel) {
    if (pixel.color === 'black') {
      pixel.color = 'white';
      return;
    }

    pixel.color = 'black';

  }

  function changePixel(pixel, color) {
    pixel.color = color;
  }

  function getColorStyle(pixel) {
    return { 'background-color': pixel.color };
  }

  function setPixels(r, c) {

    var rows = [];

    for (var i = 0; i < r; i++) {
      rows.push({ pixels: buildWhiteRow(c) });
    }

    return rows;
  }

  function buildWhiteRow(numberOfColumns) {

    var pixels = [];

    for (var j = 0; j < numberOfColumns; j++) {
      pixels.push(buildPixelObject(getWhiteColor()));
    }

    return pixels;
  }

  function buildPixelObject(colorString) {
    return { color: colorString };
  }

  function getWhiteColor() {
    return 'white';
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function nextGeneration(pixel, count) {
    if (pixel.color === 'white' && count === 3) {
      togglePixel(pixel);
    }

    if (pixel.color === 'black' && (count < 2 || count > 3)) {
      togglePixel(pixel);
    }
  }
})();
