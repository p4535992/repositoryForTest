/* */ 
(function(Buffer) {
  var fs = require('fs');
  module.exports = function(filePath) {
    var error = null,
        eof = false,
        defers = [],
        descriptor = null,
        bufferLength = 1 << 14;
    function read(callback) {
      if (!callback)
        throw new Error("callback is required");
      if (error)
        return void callback(error);
      if (eof)
        return void callback(null, null);
      if (defers)
        return void defers.push(callback);
      defers = [];
      fs.read(descriptor, new Buffer(bufferLength), 0, bufferLength, null, function(error_, bufferLength_, buffer) {
        error = error_;
        if (bufferLength_)
          callback(null, bufferLength_ < bufferLength ? buffer.slice(0, bufferLength_) : buffer);
        else
          eof = true, fs.close(descriptor, callback);
        var defers_ = defers;
        defers = null;
        defers_.forEach(read);
      });
    }
    fs.open(filePath, "r", 438, function(error_, descriptor_) {
      error = error_;
      descriptor = descriptor_;
      var defers_ = defers;
      defers = null;
      defers_.forEach(read);
    });
    return read;
  };
})(require('buffer').Buffer);
