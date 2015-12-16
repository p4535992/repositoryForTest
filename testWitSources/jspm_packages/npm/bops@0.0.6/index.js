/* */ 
var proto = {};
module.exports = proto;
proto.from = require('./typedarray/from');
proto.to = require('./typedarray/to');
proto.is = require('./typedarray/is');
proto.subarray = require('./typedarray/subarray');
proto.join = require('./typedarray/join');
proto.copy = require('./typedarray/copy');
proto.create = require('./typedarray/create');
mix(require('./typedarray/read'), proto);
mix(require('./typedarray/write'), proto);
function mix(from, into) {
  for (var key in from) {
    into[key] = from[key];
  }
}
