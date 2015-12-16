/* */ 
var fs = require('fs'),
    encode = require('./encode');
module.exports = function(filename, data, options, callback) {
  if (arguments.length < 3)
    callback = options, options = null;
  fs.stat(filename, function(error, stat) {
    if (error && error.code !== "ENOENT")
      return callback(error);
    if (!stat || stat.isFile()) {
      fs.writeFile(filename, data, options, callback);
    } else {
      fs.createWriteStream(filename, options && {flags: options.flag || "w"}).on("error", function(error) {
        callback(error.code === "EPIPE" ? null : error);
      }).end(encode(data, options), callback);
    }
  });
};
