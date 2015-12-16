/* */ 
(function(process) {
  var fs = require('fs'),
      esprima = require('esprima'),
      escodegen = require('../escodegen'),
      files = process.argv.splice(2);
  if (files.length === 0) {
    console.log('Usage:');
    console.log('   esgenerate file.json');
    process.exit(1);
  }
  files.forEach(function(filename) {
    var content = fs.readFileSync(filename, 'utf-8');
    console.log(escodegen.generate(JSON.parse(content)));
  });
})(require('process'));
