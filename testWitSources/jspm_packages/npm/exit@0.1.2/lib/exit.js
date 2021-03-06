/* */ 
(function(process) {
  'use strict';
  module.exports = function exit(exitCode, streams) {
    if (!streams) {
      streams = [process.stdout, process.stderr];
    }
    var drainCount = 0;
    function tryToExit() {
      if (drainCount === streams.length) {
        process.exit(exitCode);
      }
    }
    streams.forEach(function(stream) {
      if (stream.bufferSize === 0) {
        drainCount++;
      } else {
        stream.write('', 'utf-8', function() {
          drainCount++;
          tryToExit();
        });
      }
      stream.write = function() {};
    });
    tryToExit();
    process.on('exit', function() {
      process.exit(exitCode);
    });
  };
})(require('process'));
