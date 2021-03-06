/* */ 
(function(process) {
  var getLength = require('./getLength'),
      isLength = require('./isLength'),
      isObject = require('../lang/isObject'),
      values = require('../object/values');
  function toIterable(value) {
    if (value == null) {
      return [];
    }
    if (!isLength(getLength(value))) {
      return values(value);
    }
    return isObject(value) ? value : Object(value);
  }
  module.exports = toIterable;
})(require('process'));
