define(['app'], function() {
  var PixelsController = function($interval, $timeout) {
    var vm = this;
    vm.hello = 'Hello from vm';

    vm.definition = [25, 25];

    vm.rows = setPixels(vm.definition[0], vm.definition[1]);

    vm.getColorStyle = getColorStyle;
    vm.togglePixel = togglePixel;

    var initialInterval = 1000;
    var intervalDelta = -100;
    var beans;

    $timeout(function() {
      $interval(function() {
        var counters = [];

        for (var i = 0; i < vm.rows.length; i++) {
          for (var j = 0; j < vm.rows[i].pixels.length; j++) {
            var count = countAliveNeighbours(vm.rows, i, j);
            counters.push(count);
          }
        }
        for (var m = 0; m < vm.rows.length; m++) {
          for (var n = 0; n < vm.rows[m].pixels.length; n++) {
            nextGeneration(vm.rows[m].pixels[n], counters[m * vm.rows[m].pixels.length + n]);
          }
        }
      }, 700);
    }, 7000);
  };

  function togglePixel(pixel) {
    if (pixel.color === 'black') {
      pixel.color = 'white';
      return;
    }

    pixel.color = 'black';

  }

  function getColorStyle(pixel) {
    return { 'background-color': pixel.color };
  }

  function setPixels(r, c) {

    var rows = [];

    for (var i = 0; i < r; i++) {
      rows.push({ pixels: setRow(c) });
    }

    return rows;
  }

  function setRow(c) {

    var pixels = [];

    for (var j = 0; j < c; j++) {
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

  function countAliveNeighbours(rows, r, c) {
    var count = 0;
    var belowIndex = r + 1;
    var aboveIndex = r - 1;
    var leftIndex = c - 1;
    var rightIndex = c + 1;

    if (r === 0) {
      aboveIndex = rows.length - 1;
    }

    if (r === rows.length - 1) {
      belowIndex = 0;
    }

    if (c === 0) {
      leftIndex = rows[0].pixels.length - 1;
    }

    if (c === rows[0].pixels.length - 1) {
      rightIndex = 0;
    }

    count += rows[aboveIndex].pixels[leftIndex].color === 'black' ? 1 : 0;
    count += rows[aboveIndex].pixels[c].color === 'black' ? 1 : 0;
    count += rows[aboveIndex].pixels[rightIndex].color === 'black' ? 1 : 0;
    count += rows[r].pixels[leftIndex].color === 'black' ? 1 : 0;
    count += rows[r].pixels[rightIndex].color === 'black' ? 1 : 0;
    count += rows[belowIndex].pixels[leftIndex].color === 'black' ? 1 : 0;
    count += rows[belowIndex].pixels[c].color === 'black' ? 1 : 0;
    count += rows[belowIndex].pixels[rightIndex].color === 'black' ? 1 : 0;

    return count;
  }

  function nextGeneration(pixel, count) {
    if (pixel.color === 'white' && count === 3) {
      togglePixel(pixel);
    }

    if (pixel.color === 'black' && (count < 2 || count > 3)) {
      togglePixel(pixel);
    }
  }

  // PixelsController.$inject = ['$interval', '$timeout'];

  // app.controller('PixelsController', PixelsController);

  return ['$interval', '$timeout', PixelsController];
});
