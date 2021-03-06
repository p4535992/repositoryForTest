/* */ 
var hashset = require('./hashset'),
    hashmap = require('./hashmap'),
    hashPoint = require('./point-hash'),
    equalPoint = require('./point-equal');
module.exports = function(topology) {
  var coordinates = topology.coordinates,
      lines = topology.lines,
      rings = topology.rings,
      indexes = index(),
      visitedByIndex = new Int32Array(coordinates.length),
      leftByIndex = new Int32Array(coordinates.length),
      rightByIndex = new Int32Array(coordinates.length),
      junctionByIndex = new Int8Array(coordinates.length),
      junctionCount = 0;
  for (var i = 0,
      n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = leftByIndex[i] = rightByIndex[i] = -1;
  }
  for (var i = 0,
      n = lines.length; i < n; ++i) {
    var line = lines[i],
        lineStart = line[0],
        lineEnd = line[1],
        previousIndex,
        currentIndex = indexes[lineStart],
        nextIndex = indexes[++lineStart];
    ++junctionCount, junctionByIndex[currentIndex] = 1;
    while (++lineStart <= lineEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[lineStart]);
    }
    ++junctionCount, junctionByIndex[nextIndex] = 1;
  }
  for (var i = 0,
      n = coordinates.length; i < n; ++i) {
    visitedByIndex[i] = -1;
  }
  for (var i = 0,
      n = rings.length; i < n; ++i) {
    var ring = rings[i],
        ringStart = ring[0] + 1,
        ringEnd = ring[1],
        previousIndex = indexes[ringEnd - 1],
        currentIndex = indexes[ringStart - 1],
        nextIndex = indexes[ringStart];
    sequence(i, previousIndex, currentIndex, nextIndex);
    while (++ringStart <= ringEnd) {
      sequence(i, previousIndex = currentIndex, currentIndex = nextIndex, nextIndex = indexes[ringStart]);
    }
  }
  function sequence(i, previousIndex, currentIndex, nextIndex) {
    if (visitedByIndex[currentIndex] === i)
      return;
    visitedByIndex[currentIndex] = i;
    var leftIndex = leftByIndex[currentIndex];
    if (leftIndex >= 0) {
      var rightIndex = rightByIndex[currentIndex];
      if ((leftIndex !== previousIndex || rightIndex !== nextIndex) && (leftIndex !== nextIndex || rightIndex !== previousIndex)) {
        ++junctionCount, junctionByIndex[currentIndex] = 1;
      }
    } else {
      leftByIndex[currentIndex] = previousIndex;
      rightByIndex[currentIndex] = nextIndex;
    }
  }
  function index() {
    var indexByPoint = hashmap(coordinates.length * 1.4, hashIndex, equalIndex, Int32Array, -1, Int32Array),
        indexes = new Int32Array(coordinates.length);
    for (var i = 0,
        n = coordinates.length; i < n; ++i) {
      indexes[i] = indexByPoint.maybeSet(i, i);
    }
    return indexes;
  }
  function hashIndex(i) {
    return hashPoint(coordinates[i]);
  }
  function equalIndex(i, j) {
    return equalPoint(coordinates[i], coordinates[j]);
  }
  visitedByIndex = leftByIndex = rightByIndex = null;
  var junctionByPoint = hashset(junctionCount * 1.4, hashPoint, equalPoint);
  for (var i = 0,
      n = coordinates.length,
      j; i < n; ++i) {
    if (junctionByIndex[j = indexes[i]]) {
      junctionByPoint.add(coordinates[j]);
    }
  }
  return junctionByPoint;
};
