/* */ 
(function(process) {
  var fs = require('fs'),
      esprima = require('esprima'),
      escodegen = require('../escodegen'),
      files = process.argv.splice(2);
  if (files.length === 0) {
    console.log('Usage:');
    console.log('   escodegen file.js');
    process.exit(1);
  }
  files.forEach(function(filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    console.log(escodegen.generate(esprima.parse(content)));
  });
})(require('process'));
