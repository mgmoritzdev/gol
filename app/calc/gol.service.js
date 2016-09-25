(function() {
  angular.module('app').factory('golService', ['$interval', golService]);

  const numberOfPlayerClicks = 5;
  const numberOfAutomaticTurns = 15;
  const turnDelay = 400;
  let playerOneRemainingClick = numberOfPlayerClicks;
  let playerTwoRemainingClick = numberOfPlayerClicks;
  let isPlayerOneActive = true;
  let isRunningAuto = false;
  let interval = 0;
  let runner;
  let rows;

  function golService($interval) {
    interval = $interval;

    return {
      getNeighboursCount: getNeighboursCount,
      getNewPixelColor: getNewPixelColor,
      run: run,
      getScore: getScore
    };
  }

  function run(_rows) {
    rows = _rows;
  }

  function runAuto() {
    runner = interval(function() {
      var counters = getNeighboursCount(rows);

      for (var m = 0; m < rows.length; m++) {
        for (var n = 0; n < rows[m].pixels.length; n++) {
          let currentPixel = rows[m].pixels[n];
          let neighbourColors = counters[m * rows[m].pixels.length + n];
          currentPixel.color = pixelNextGenerationColor(
            currentPixel,
            neighbourColors.red, neighbourColors.blue);
        }
      }
    }, turnDelay, numberOfAutomaticTurns).then(function() {
      isRunningAuto = false;
    });
  }

  function getNewPixelColor(pixel) {
    if (isRunningAuto) {
      return pixel.color;
    }

    if (isPlayerOneActive) {
      return playerOneClick(pixel);
    } else {
      return playerTwoClick(pixel);
    }
  }

  function playerOneClick(pixel) {
    let color = (pixel.color !== 'white') ? 'white' : 'blue';
    isPlayerOneActive = (--playerOneRemainingClick > 0);
    return color;
  }

  function playerTwoClick(pixel) {
    let color = (pixel.color !== 'white') ? 'white' : 'red';
    if (--playerTwoRemainingClick === 0) {
      endOfTurn();
    }
    return color;
  }

  function endOfTurn() {
    isPlayerOneActive = true;
    isRunningAuto = true;
    playerOneRemainingClick = numberOfPlayerClicks;
    playerTwoRemainingClick = numberOfPlayerClicks;
    runAuto();
  }

  function getNeighboursCount() {
    let counters = [];

    // TODO: you can do better than that
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].pixels.length; j++) {
        let count = countAliveNeighboursByColor(i, j);
        counters.push(count);
      }
    }

    return counters;
  }

  function countAliveNeighboursByColor(r, c) {
    let neighbours = getNeighbours(r, c);

    let colors = neighbours
      .map(x => x.color)
      .reduce((amount, color) => {
        amount[color] = ++amount[color] || 1;
        return amount;
      }, {});

    return colors;
  }

  function getScore() {
    if (!rows) {return {'red': 0, 'blue':0};}
    let pixels = [];
    for (let i = 0; i < rows.length; i++){
      for (let j = 0; j < rows[i].pixels.length; j++){
        pixels.push(rows[i].pixels[j]);
      }
    }

    let colors = pixels
      .map(pixel => pixel.color)
      .reduce((amount, color) => {
        amount[color] = ++amount[color] || 1;
        return amount;
      }, {white: 0, red: 0, blue: 0});

    return colors;
  }

  function getNeighbours(r, c) {
    let belowIndex = r === rows.length - 1 ? 0 : r + 1;
    let aboveIndex = r === 0 ? rows.length - 1 : r - 1;
    let leftIndex = c === 0 ? rows[0].pixels.length - 1 : c - 1;
    let rightIndex = c === rows[0].pixels.length - 1 ? 0 : c + 1;

    let neighbours = [];
    neighbours.push(rows[aboveIndex].pixels[leftIndex]);
    neighbours.push(rows[aboveIndex].pixels[c]);
    neighbours.push(rows[aboveIndex].pixels[rightIndex]);
    neighbours.push(rows[r].pixels[leftIndex]);
    neighbours.push(rows[r].pixels[rightIndex]);
    neighbours.push(rows[belowIndex].pixels[leftIndex]);
    neighbours.push(rows[belowIndex].pixels[c]);
    neighbours.push(rows[belowIndex].pixels[rightIndex]);

    return neighbours;
  }

  function pixelNextGenerationColor(pixel, reds, blues) {
    const r = reds || 0;
    const b = blues || 0;
    const total = r + b;

    if (pixel.color === 'white' && r + b === 3) {
      return r > b ? 'red' : 'blue';
    }

    if (pixel.color !== 'white' && (total < 2 || total > 3)) {
      return 'white';
    }

    return pixel.color;
  }
})();
