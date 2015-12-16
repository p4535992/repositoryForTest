/* */ 
(function(process) {
  var Stream = require('stream');
  exports = module.exports = through;
  through.through = through;
  function through(write, end) {
    write = write || function(data) {
      this.queue(data);
    };
    end = end || function() {
      this.queue(null);
    };
    var ended = false,
        destroyed = false,
        buffer = [];
    var stream = new Stream();
    stream.readable = stream.writable = true;
    stream.paused = false;
    stream.write = function(data) {
      write.call(this, data);
      return !stream.paused;
    };
    function drain() {
      while (buffer.length && !stream.paused) {
        var data = buffer.shift();
        if (null === data)
          return stream.emit('end');
        else
          stream.emit('data', data);
      }
    }
    stream.queue = stream.push = function(data) {
      buffer.push(data);
      drain();
      return stream;
    };
    stream.on('end', function() {
      stream.readable = false;
      if (!stream.writable)
        process.nextTick(function() {
          stream.destroy();
        });
    });
    function _end() {
      stream.writable = false;
      end.call(stream);
      if (!stream.readable)
        stream.destroy();
    }
    stream.end = function(data) {
      if (ended)
        return;
      ended = true;
      if (arguments.length)
        stream.write(data);
      _end();
      return stream;
    };
    stream.destroy = function() {
      if (destroyed)
        return;
      destroyed = true;
      ended = true;
      buffer.length = 0;
      stream.writable = stream.readable = false;
      stream.emit('close');
      return stream;
    };
    stream.pause = function() {
      if (stream.paused)
        return;
      stream.paused = true;
      stream.emit('pause');
      return stream;
    };
    stream.resume = function() {
      if (stream.paused) {
        stream.paused = false;
      }
      drain();
      if (!stream.paused)
        stream.emit('drain');
      return stream;
    };
    return stream;
  }
})(require('process'));
