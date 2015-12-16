/* */ 
(function(Buffer) {
  var reader = require('./reader');
  module.exports = function(filePath) {
    var read = reader(filePath),
        defers,
        buffer = new Buffer(0),
        bufferIndex = 0,
        bufferLength = 0,
        encoding = "utf8",
        fragments = null;
    return function readLine(callback) {
      if (!callback)
        throw new Error("callback is required");
      if (!buffer)
        return void callback(null, null);
      if (bufferIndex >= bufferLength) {
        if (defers)
          return void defers.push(callback);
        defers = [callback];
        return void read(function(error_, buffer_) {
          error = error_;
          buffer = buffer_;
          bufferIndex = 0;
          bufferLength = buffer && buffer.length;
          var defers_ = defers;
          defers = null;
          defers_.forEach(readLine);
        });
      }
      var bufferIndex0 = bufferIndex,
          eol = 0;
      while (bufferIndex < bufferLength) {
        var character = buffer[bufferIndex++];
        if (character === 10) {
          ++eol;
          break;
        }
        if (character === 13) {
          ++eol;
          if (buffer[bufferIndex] === 10)
            ++bufferIndex, ++eol;
          break;
        }
      }
      var fragment = buffer.slice(bufferIndex0, bufferIndex - eol);
      if (eol) {
        if (fragments) {
          fragments.push(fragment);
          fragment = Buffer.concat(fragments);
          fragments = null;
        }
        return void callback(null, fragment.toString(encoding));
      }
      if (fragments)
        fragments.push(fragment);
      else
        fragments = [fragment];
      readLine(callback);
    };
  };
})(require('buffer').Buffer);
