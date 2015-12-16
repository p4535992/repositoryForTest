/* */ 
(function(process) {
  "use strict";
  var _ = require('lodash');
  var fs = require('fs');
  var cli = require('cli');
  var path = require('path');
  var shjs = require('shelljs');
  var minimatch = require('minimatch');
  var htmlparser = require('htmlparser2');
  var exit = require('exit');
  var stripJsonComments = require('strip-json-comments');
  var JSHINT = require('./jshint').JSHINT;
  var defReporter = require('./reporters/default').reporter;
  var OPTIONS = {
    "config": ["c", "Custom configuration file", "string", false],
    "reporter": ["reporter", "Custom reporter (<PATH>|jslint|checkstyle|unix)", "string", undefined],
    "exclude": ["exclude", "Exclude files matching the given filename pattern (same as .jshintignore)", "string", null],
    "exclude-path": ["exclude-path", "Pass in a custom jshintignore file path", "string", null],
    "filename": ["filename", "Pass in a filename when using STDIN to emulate config lookup for that file name", "string", null],
    "verbose": ["verbose", "Show message codes"],
    "show-non-errors": ["show-non-errors", "Show additional data generated by jshint"],
    "extra-ext": ["e", "Comma-separated list of file extensions to use (default is .js)", "string", ""],
    "extract": ["extract", "Extract inline scripts contained in HTML (auto|always|never, default to never)", "string", "never"],
    "jslint-reporter": ["jslint-reporter", deprecated("Use a jslint compatible reporter", "--reporter=jslint")],
    "checkstyle-reporter": ["checkstyle-reporter", deprecated("Use a CheckStyle compatible XML reporter", "--reporter=checkstyle")]
  };
  function deprecated(text, alt) {
    if (!alt) {
      return text + " (DEPRECATED)";
    }
    return text + " (DEPRECATED, use " + alt + " instead)";
  }
  function findConfig(file) {
    var dir = path.dirname(path.resolve(file));
    var envs = getHomeDir();
    if (!envs)
      return home;
    var home = path.normalize(path.join(envs, ".jshintrc"));
    var proj = findFile(".jshintrc", dir);
    if (proj)
      return proj;
    if (shjs.test("-e", home))
      return home;
    return null;
  }
  function getHomeDir() {
    var homePath = "";
    var environment = global.process.env;
    var paths = [environment.USERPROFILE, environment.HOME, environment.HOMEPATH, environment.HOMEDRIVE + environment.HOMEPATH];
    while (paths.length) {
      homePath = paths.shift();
      if (fs.existsSync(homePath)) {
        return homePath;
      }
    }
  }
  function loadNpmConfig(file) {
    var dir = path.dirname(path.resolve(file));
    var fp = findFile("package.json", dir);
    if (!fp)
      return null;
    try {
      return require(fp).jshintConfig;
    } catch (e) {
      return null;
    }
  }
  function loadReporter(fp) {
    try {
      return require(fp).reporter;
    } catch (err) {
      return null;
    }
  }
  var findFileResults = {};
  function findFile(name, cwd) {
    cwd = cwd || process.cwd();
    var filename = path.normalize(path.join(cwd, name));
    if (findFileResults[filename] !== undefined) {
      return findFileResults[filename];
    }
    var parent = path.resolve(cwd, "../");
    if (shjs.test("-e", filename)) {
      findFileResults[filename] = filename;
      return filename;
    }
    if (cwd === parent) {
      findFileResults[filename] = null;
      return null;
    }
    return findFile(name, parent);
  }
  function loadIgnores(params) {
    var file = findFile(params.excludePath || ".jshintignore", params.cwd) || "";
    if (!file && !params.exclude) {
      return [];
    }
    var lines = (file ? shjs.cat(file) : "").split("\n");
    lines.unshift(params.exclude || "");
    return lines.filter(function(line) {
      return !!line.trim();
    }).map(function(line) {
      if (line[0] === "!")
        return "!" + path.resolve(path.dirname(file), line.substr(1).trim());
      return path.join(path.dirname(file), line.trim());
    });
  }
  function isIgnored(fp, patterns) {
    return patterns.some(function(ip) {
      if (minimatch(path.resolve(fp), ip, {nocase: true})) {
        return true;
      }
      if (path.resolve(fp) === ip) {
        return true;
      }
      if (shjs.test("-d", fp) && ip.match(/^[^\/]*\/?$/) && fp.match(new RegExp("^" + ip + ".*"))) {
        return true;
      }
    });
  }
  function extract(code, when) {
    if (when !== "always" && (when !== "auto" || !/^\s*</.test(code)))
      return code;
    var inscript = false;
    var index = 0;
    var js = [];
    var startOffset;
    function onopen(name, attrs) {
      if (name !== "script")
        return;
      if (attrs.type && !/text\/javascript/.test(attrs.type.toLowerCase()))
        return;
      inscript = true;
      js.push.apply(js, code.slice(index, parser.endIndex).match(/\n\r|\n|\r/g));
      startOffset = null;
    }
    function onclose(name) {
      if (name !== "script" || !inscript)
        return;
      inscript = false;
      index = parser.startIndex;
      startOffset = null;
    }
    function ontext(data) {
      if (!inscript)
        return;
      var lines = data.split(/\n\r|\n|\r/);
      if (!startOffset) {
        lines.some(function(line) {
          if (!line)
            return;
          startOffset = /^(\s*)/.exec(line)[1];
          return true;
        });
      }
      if (startOffset) {
        lines = lines.map(function(line) {
          return line.replace(startOffset, "");
        });
        data = lines.join("\n");
      }
      js.push(data);
    }
    var parser = new htmlparser.Parser({
      onopentag: onopen,
      onclosetag: onclose,
      ontext: ontext
    });
    parser.parseComplete(code);
    return js.join("");
  }
  function extractOffsets(code, when) {
    if (when !== "always" && (when !== "auto" || !/^\s*</.test(code)))
      return;
    var inscript = false;
    var index = 0;
    var lineCounter = 0;
    var startOffset;
    var offsets = [];
    function onopen(name, attrs) {
      if (name !== "script")
        return;
      if (attrs.type && !/text\/javascript/.test(attrs.type.toLowerCase()))
        return;
      inscript = true;
      var fragment = code.slice(index, parser.endIndex);
      var n = (fragment.match(/\n\r|\n|\r/g) || []).length;
      lineCounter += n;
      startOffset = null;
    }
    function onclose(name) {
      if (name !== "script" || !inscript)
        return;
      inscript = false;
      index = parser.startIndex;
      startOffset = null;
    }
    function ontext(data) {
      if (!inscript)
        return;
      var lines = data.split(/\n\r|\n|\r/);
      if (!startOffset) {
        lines.some(function(line) {
          if (!line)
            return;
          startOffset = /^(\s*)/.exec(line)[1];
          return true;
        });
      }
      lines.forEach(function() {
        lineCounter += 1;
        if (startOffset) {
          offsets[lineCounter] = startOffset.length;
        } else {
          offsets[lineCounter] = 0;
        }
      });
    }
    var parser = new htmlparser.Parser({
      onopentag: onopen,
      onclosetag: onclose,
      ontext: ontext
    });
    parser.parseComplete(code);
    return offsets;
  }
  function collect(fp, files, ignores, ext) {
    if (ignores && isIgnored(fp, ignores)) {
      return;
    }
    if (!shjs.test("-e", fp)) {
      cli.error("Can't open " + fp);
      return;
    }
    if (shjs.test("-d", fp)) {
      shjs.ls(fp).forEach(function(item) {
        var itempath = path.join(fp, item);
        if (shjs.test("-d", itempath) || item.match(ext)) {
          collect(itempath, files, ignores, ext);
        }
      });
      return;
    }
    files.push(fp);
  }
  function lint(code, results, config, data, file) {
    var globals;
    var lintData;
    var buffer = [];
    config = config || {};
    config = JSON.parse(JSON.stringify(config));
    if (config.prereq) {
      config.prereq.forEach(function(fp) {
        fp = path.join(config.dirname, fp);
        if (shjs.test("-e", fp))
          buffer.push(shjs.cat(fp));
      });
      delete config.prereq;
    }
    if (config.globals) {
      globals = config.globals;
      delete config.globals;
    }
    if (config.overrides) {
      if (file) {
        _.each(config.overrides, function(options, pattern) {
          if (minimatch(path.normalize(file), pattern, {
            nocase: true,
            matchBase: true
          })) {
            if (options.globals) {
              globals = _.extend(globals || {}, options.globals);
              delete options.globals;
            }
            _.extend(config, options);
          }
        });
      }
      delete config.overrides;
    }
    delete config.dirname;
    buffer.push(code);
    buffer = buffer.join("\n");
    buffer = buffer.replace(/^\uFEFF/, "");
    if (!JSHINT(buffer, config, globals)) {
      JSHINT.errors.forEach(function(err) {
        if (err) {
          results.push({
            file: file || "stdin",
            error: err
          });
        }
      });
    }
    lintData = JSHINT.data();
    if (lintData) {
      lintData.file = file || "stdin";
      data.push(lintData);
    }
  }
  var exports = {
    extract: extract,
    exit: exit,
    getConfig: function(fp) {
      return loadNpmConfig(fp) || exports.loadConfig(findConfig(fp));
    },
    loadConfig: function(fp) {
      if (!fp) {
        return {};
      }
      if (!shjs.test("-e", fp)) {
        cli.error("Can't find config file: " + fp);
        exports.exit(1);
      }
      try {
        var config = JSON.parse(stripJsonComments(shjs.cat(fp)));
        config.dirname = path.dirname(fp);
        if (config['extends']) {
          var baseConfig = exports.loadConfig(path.resolve(config.dirname, config['extends']));
          config = _.merge({}, baseConfig, config, function(a, b) {
            if (_.isArray(a)) {
              return a.concat(b);
            }
          });
          delete config['extends'];
        }
        return config;
      } catch (err) {
        cli.error("Can't parse config file: " + fp + "\nError:" + err);
        exports.exit(1);
      }
    },
    gather: function(opts) {
      var files = [];
      var reg = new RegExp("\\.(js" + (!opts.extensions ? "" : "|" + opts.extensions.replace(/,/g, "|").replace(/[\. ]/g, "")) + ")$");
      var ignores = !opts.ignores ? loadIgnores({cwd: opts.cwd}) : opts.ignores.map(function(target) {
        return path.resolve(target);
      });
      opts.args.forEach(function(target) {
        collect(target, files, ignores, reg);
      });
      return files;
    },
    run: function(opts, cb) {
      var files = exports.gather(opts);
      var results = [];
      var data = [];
      if (opts.useStdin) {
        cli.withStdin(function(code) {
          var config = opts.config;
          var filename;
          if (opts.filename) {
            filename = path.resolve(opts.filename);
          }
          if (filename && !config) {
            config = loadNpmConfig(filename) || exports.loadConfig(findConfig(filename));
          }
          config = config || {};
          lint(extract(code, opts.extract), results, config, data, filename);
          (opts.reporter || defReporter)(results, data, {verbose: opts.verbose});
          cb(results.length === 0);
        });
        return null;
      }
      files.forEach(function(file) {
        var config = opts.config || exports.getConfig(file);
        var code;
        try {
          code = shjs.cat(file);
        } catch (err) {
          cli.error("Can't open " + file);
          exports.exit(1);
        }
        lint(extract(code, opts.extract), results, config, data, file);
        if (results.length) {
          var offsets = extractOffsets(code, opts.extract);
          if (offsets && offsets.length) {
            results.forEach(function(errorInfo) {
              var line = errorInfo.error.line;
              if (line >= 0 && line < offsets.length) {
                var offset = +offsets[line];
                errorInfo.error.character += offset;
              }
            });
          }
        }
      });
      (opts.reporter || defReporter)(results, data, {verbose: opts.verbose});
      return results.length === 0;
    },
    getBufferSize: function() {
      return process.stdout.bufferSize;
    },
    interpret: function(args) {
      cli.setArgv(args);
      cli.options = {};
      cli.enable("version", "glob", "help");
      cli.setApp(path.resolve(__dirname + "/../package.json"));
      var options = cli.parse(OPTIONS);
      var config;
      if (options.config) {
        config = exports.loadConfig(options.config);
      }
      switch (true) {
        case options.reporter === "jslint":
        case options["jslint-reporter"]:
          options.reporter = "./reporters/jslint_xml.js";
          break;
        case options.reporter === "checkstyle":
        case options["checkstyle-reporter"]:
          options.reporter = "./reporters/checkstyle.js";
          break;
        case options.reporter === "unix":
          options.reporter = "./reporters/unix.js";
          break;
        case options["show-non-errors"]:
          options.reporter = "./reporters/non_error.js";
          break;
        case options.reporter !== undefined:
          options.reporter = path.resolve(process.cwd(), options.reporter);
      }
      var reporter;
      if (options.reporter) {
        reporter = loadReporter(options.reporter);
        if (reporter === null) {
          cli.error("Can't load reporter file: " + options.reporter);
          exports.exit(1);
        }
      }
      function done(passed) {
        if (passed == null)
          return;
        exports.exit(passed ? 0 : 2);
      }
      done(exports.run({
        args: cli.args,
        config: config,
        reporter: reporter,
        ignores: loadIgnores({
          exclude: options.exclude,
          excludePath: options["exclude-path"]
        }),
        extensions: options["extra-ext"],
        verbose: options.verbose,
        extract: options.extract,
        filename: options.filename,
        useStdin: {
          "-": true,
          "/dev/stdin": true
        }[args[args.length - 1]]
      }, done));
    }
  };
  module.exports = exports;
})(require('process'));
