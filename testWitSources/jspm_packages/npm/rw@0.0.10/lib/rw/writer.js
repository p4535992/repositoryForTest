/* */ 
(function(Buffer) {
  var fs = require('fs');
  module.exports = function(filePath) {
    var error = null,
        defers = [],
        descriptor = null,
        bufferLength = 1 << 14,
        buffer = new Buffer(bufferLength),
        bufferIndex = 0;
    function write(data, callback) {
      if (!callback)
        throw new Error("callback is required");
      if (error)
        return void callback(error);
      if (defers)
        return void defers.push([data, callback]);
      if (data == null) {
        error = new Error("already closed");
        return void writeAll(descriptor, buffer, 0, bufferIndex, function(error_) {
          if (error_)
            return void callback(error_);
          fs.close(descriptor, callback);
        });
      }
      var bufferAdded = Math.min(bufferLength - bufferIndex, data.length);
      data.copy(buffer, bufferIndex, 0, bufferAdded);
      bufferIndex += bufferAdded;
      if (bufferIndex < bufferLength)
        return void callback(null);
      defers = [[data.slice(bufferAdded), callback]];
      writeAll(descriptor, buffer, 0, bufferIndex, function(error_) {
        error = error_;
        bufferIndex = 0;
        var defers_ = defers;
        defers = null;
        defers_.forEach(function(defer) {
          write(defer[0], defer[1]);
        });
      });
    }
    fs.open(filePath, "w", 438, function(error_, descriptor_) {
      error = error_;
      descriptor = descriptor_;
      var defers_ = defers;
      defers = null;
      defers_.forEach(function(defer) {
        write(defer[0], defer[1]);
      });
    });
    return write;
  };
  function writeAll(descriptor, buffer, bufferIndex, bufferLength, callback) {
    fs.write(descriptor, buffer, bufferIndex, bufferLength, null, function(error_, bufferLength_) {
      if (error_)
        return void callback(error_.code === "EPIPE" ? null : error_);
      if (bufferLength_ < bufferLength)
        return void writeAll(descriptor, buffer, bufferIndex + bufferLength_, bufferLength - bufferLength_, callback);
      callback(null);
    });
  }
})(require('buffer').Buffer);
