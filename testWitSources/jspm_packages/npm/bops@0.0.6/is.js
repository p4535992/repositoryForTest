/* */ 
(function(Buffer) {
  var Buffer = require('buffer').Buffer;
  module.exports = function(buffer) {
    return Buffer.isBuffer(buffer);
  };
})(require('buffer').Buffer);
