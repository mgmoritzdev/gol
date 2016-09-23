(function () {
  app.factory('golService', golService);

  function golService() {
    return {
      getNeighboursCount: getNeighboursCount
    }
  }

  function getNeighboursCount(rows) {
    var counters = [];

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < rows[i].pixels.length; j++) {
        var count = countAliveNeighbours(rows, i, j);
        counters.push(count);
      }
    }

    return counters;
  }

  function countAliveNeighbours(rows, r, c) {
    var neighbours = getNeighbours(rows, r, c);
    
    var count = neighbours.filter(x => x.color!=='white').length;

    return count;
  }

  function countAliveNeighboursByColor(rows, r, c) {
    var neighbours = getNeighbours(rows, r, c);
        
    var colors = neighbours
      .map(x => x.color)
      .reduce((amount, color) => {
        amount[color] = ++amount[color] || 1;
        return amount;
      }, {});

    return colors;
  }

  function getNeighbours(rows, r, c) {
    var belowIndex = r === rows.length -1 ? 0 : r + 1;
    var aboveIndex = r === 0 ? rows.length - 1 : r - 1;
    var leftIndex = c === 0 ? rows[0].pixels.length - 1 : c - 1;
    var rightIndex = c === rows[0].pixels.length - 1 ? 0 : c + 1;

    var neighbours = [];
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
})();