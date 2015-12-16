/* */ 
(function(Buffer) {
  var os = require('os');
  var writer = require('./writer');
  module.exports = function(filePath) {
    var write = writer(filePath),
        eol = os.EOL,
        encoding = "utf8";
    return function writeLine(line, callback) {
      if (!callback)
        throw new Error("callback is required");
      write(line == null ? null : new Buffer(line + eol, encoding), callback);
    };
  };
})(require('buffer').Buffer);
