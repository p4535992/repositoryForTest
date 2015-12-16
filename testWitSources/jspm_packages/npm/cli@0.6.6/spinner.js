/* */ 
var cli = require('./cli');
cli.spinner('Working..');
setTimeout(function() {
  cli.spinner('Working.. done!', true);
}, 3000);
