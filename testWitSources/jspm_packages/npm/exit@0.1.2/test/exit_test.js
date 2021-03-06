/* */ 
(function(process) {
  'use strict';
  var fs = require('fs');
  var exec = require('child_process').exec;
  var _which = require('which').sync;
  function which(command) {
    try {
      _which(command);
      return command;
    } catch (err) {
      return false;
    }
  }
  var grep = which('grep') || process.platform === 'win32' && which('find');
  exports['exit'] = {
    setUp: function(done) {
      this.origCwd = process.cwd();
      process.chdir('test/fixtures');
      done();
    },
    tearDown: function(done) {
      process.chdir(this.origCwd);
      done();
    },
    'grep': function(test) {
      test.expect(1);
      test.ok(grep, 'A suitable "grep" or "find" program was not found in the PATH.');
      test.done();
    }
  };
  function normalizeLineEndings(s) {
    return s.replace(/\r?\n/g, '\n');
  }
  function run(command, callback) {
    exec(command, function(error, stdout) {
      callback(error ? error.code : 0, normalizeLineEndings(stdout));
    });
  }
  function fixture(filename) {
    return normalizeLineEndings(String(fs.readFileSync(filename)));
  }
  function buildTests() {
    var counts = [10, 100, 1000];
    var outputs = [' stdout stderr', ' stdout', ' stderr'];
    var pipes = ['', ' | ' + grep + ' "std"'];
    counts.forEach(function(count) {
      outputs.forEach(function(output) {
        pipes.forEach(function(pipe) {
          var command = 'node log.js 0 ' + count + output + ' 2>&1' + pipe;
          exports['exit']['output (' + command + ')'] = function(test) {
            test.expect(2);
            run(command, function(code, actual) {
              var expected = fixture(count + output.replace(/ /g, '-') + '.txt');
              test.equal(actual.length, expected.length, 'should be the same length.');
              test.ok(actual.indexOf('fail') === -1, 'should not output after exit is called.');
              test.done();
            });
          };
        });
      });
    });
    var codes = [0, 1, 123];
    codes.forEach(function(code) {
      var command = 'node log.js ' + code + ' 10 stdout stderr';
      exports['exit']['exit code (' + command + ')'] = function(test) {
        test.expect(1);
        run(command, function(actual) {
          test.equal(actual, code, 'should exit with ' + code + ' error code.');
          test.done();
        });
      };
    });
  }
  if (grep) {
    buildTests();
  }
})(require('process'));
