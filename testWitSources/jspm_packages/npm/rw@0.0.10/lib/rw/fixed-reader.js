/* */ 
(function(Buffer) {
  var reader = require('./reader');
  module.exports = function(filePath) {
    var read = reader(filePath),
        defers,
        buffer = new Buffer(0),
        bufferIndex = 0,
        bufferLength = 0,
        fragments = null;
    return function readFixed(length, callback) {
      if (!((length = +length) >= 0))
        throw new Error("invalid length");
      if (!callback)
        throw new Error("callback is required");
      if (!buffer) {
        if (fragments) {
          fragment = Buffer.concat(fragments);
          fragments = null;
          return void callback(null, fragment);
        }
        return void callback(null, null);
      }
      if (bufferIndex >= bufferLength) {
        var defer = [length, callback];
        if (defers)
          return void defers.push(defer);
        defers = [defer];
        return void read(function(error_, buffer_) {
          error = error_;
          buffer = buffer_;
          bufferIndex = 0;
          bufferLength = buffer && buffer.length;
          var defers_ = defers;
          defers = null;
          defers_.forEach(function(defer) {
            readFixed(defer[0], defer[1]);
          });
        });
      }
      var bufferAvailable = bufferLength - bufferIndex,
          fragment = buffer.slice(bufferIndex, bufferIndex += length);
      if (bufferIndex <= bufferLength) {
        if (fragments) {
          fragments.push(fragment);
          fragment = Buffer.concat(fragments);
          fragments = null;
        }
        return void callback(null, fragment);
      }
      if (fragments)
        fragments.push(fragment);
      else
        fragments = [fragment];
      readFixed(length - bufferAvailable, callback);
    };
  };
})(require('buffer').Buffer);
