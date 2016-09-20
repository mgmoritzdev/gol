(function() {
  app.controller('PixelsController', ['$interval', '$timeout', 'golService', PixelsController]);

  function PixelsController($interval, $timeout, golService) {
    var vm = this;

    vm.definition = [25, 25];
    vm.totalClicksPerPlayer = 5
    vm.remainingClicks = vm.totalClicksPerPlayer;
    vm.currentPlayer = false;

    vm.rows = setPixels(vm.definition[0], vm.definition[1]);

    vm.getColorStyle = getColorStyle;
    vm.togglePixel = function(pixel) {
      if (vm.remainingClicks > 0){
        if (vm.currentPlayer){
          changePixel(pixel, 'red');
          vm.remainingClicks--;
        } else {
          changePixel(pixel, 'blue');
          vm.remainingClicks--;
          if (vm.remainingClicks == 0){
            vm.currentPlayer = true;
            vm.remainingClicks = vm.totalClicksPerPlayer;
          }
        }
      }
    };

    $timeout(function() {
      $interval(function() {
        
        var counters = golService.getNeighboursCount(vm.rows);

        for (var m = 0; m < vm.rows.length; m++) {
          for (var n = 0; n < vm.rows[m].pixels.length; n++) {
            nextGeneration2(vm.rows[m].pixels[n], counters[m * vm.rows[m].pixels.length + n]);
          }
        }
      }, 500);
    }, 10000);
  }

  function togglePixel(pixel) {
    if (pixel.color == 'black') {
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

  function nextGeneration2(pixel, count) {
    if (pixel.color === 'white' && count === 3) {
      changePixel(pixel, 'red');
    }

    if (pixel.color !== 'white' && (count < 2 || count > 3)) {
      changePixel(pixel, 'white');
    }
  }
})();
