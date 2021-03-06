/* */ 
(function(process) {
  var cli = exports,
      argv,
      curr_opt,
      curr_val,
      full_opt,
      is_long,
      short_tags = [],
      opt_list,
      parsed = {},
      usage,
      argv_parsed,
      command_list,
      commands,
      daemon,
      daemon_arg,
      no_color,
      show_debug;
  cli.app = null;
  cli.version = null;
  cli.argv = [];
  cli.argc = 0;
  cli.options = {};
  cli.args = [];
  cli.command = null;
  cli.width = 70;
  cli.option_width = 25;
  cli.native = {};
  var define_native = function(module) {
    Object.defineProperty(cli.native, module, {
      enumerable: true,
      configurable: true,
      get: function() {
        delete cli.native[module];
        return (cli.native[module] = require(module));
      }
    });
  };
  var natives = process.binding('natives');
  for (var module in natives) {
    define_native(module);
  }
  cli.output = console.log;
  cli.exit = require('exit');
  var enable = {
    help: true,
    version: false,
    daemon: false,
    status: false,
    timeout: false,
    catchall: false,
    glob: false
  };
  cli.enable = function() {
    Array.prototype.slice.call(arguments).forEach(function(plugin) {
      switch (plugin) {
        case 'daemon':
          try {
            daemon = require('daemon');
            if (typeof daemon.daemonize !== 'function') {
              throw 'Invalid module';
            }
          } catch (e) {
            cli.fatal('daemon.node not installed. Please run `npm install daemon`');
          }
          break;
        case 'catchall':
          process.on('uncaughtException', function(err) {
            cli.error('Uncaught exception: ' + (err.msg || err));
          });
          break;
        case 'help':
        case 'version':
        case 'status':
        case 'autocomplete':
        case 'timeout':
          break;
        case 'glob':
          cli.glob = require('glob');
          break;
        default:
          cli.fatal('Unknown plugin "' + plugin + '"');
          break;
      }
      enable[plugin] = true;
    });
    return cli;
  };
  cli.disable = function() {
    Array.prototype.slice.call(arguments).forEach(function(plugin) {
      if (enable[plugin]) {
        enable[plugin] = false;
      }
    });
    return cli;
  };
  cli.setArgv = function(arr, keep_arg0) {
    if (typeof arr == 'string') {
      arr = arr.split(' ');
    } else {
      arr = arr.slice();
    }
    cli.app = arr.shift();
    if (!keep_arg0 && (['node', 'node.exe'].indexOf(cli.native.path.basename(cli.app)) !== -1 || cli.native.path.basename(process.execPath) === cli.app || process.execPath === cli.app)) {
      cli.app = arr.shift();
    }
    cli.app = cli.native.path.basename(cli.app);
    argv_parsed = false;
    cli.args = cli.argv = argv = arr;
    cli.argc = argv.length;
    cli.options = {};
    cli.command = null;
  };
  cli.setArgv(process.argv);
  cli.next = function() {
    if (!argv_parsed) {
      cli.args = [];
      argv_parsed = true;
    }
    curr_val = null;
    if (short_tags.length) {
      curr_opt = short_tags.shift();
      full_opt = '-' + curr_opt;
      return curr_opt;
    }
    if (!argv.length) {
      return false;
    }
    curr_opt = argv.shift();
    if (curr_opt === '-' || curr_opt === '--') {
      while (argv.length) {
        cli.args.push(argv.shift());
      }
      return false;
    }
    if (curr_opt[0] !== '-') {
      cli.args.push(curr_opt);
      return cli.next();
    } else {
      is_long = curr_opt[1] === '-';
      curr_opt = curr_opt.substr(is_long ? 2 : 1);
    }
    if (!is_long && curr_opt.length > 1) {
      short_tags = curr_opt.split('');
      return cli.next();
    }
    var eq,
        len;
    if (is_long && (eq = curr_opt.indexOf('=')) >= 0) {
      curr_val = curr_opt.substr(eq + 1);
      curr_opt = curr_opt.substr(0, eq);
      len = curr_val.length;
      if ((curr_val[0] === '"' && curr_val[len - 1] === '"') || (curr_val[0] === "'" && curr_val[len - 1] === "'")) {
        curr_val = curr_val.substr(1, len - 2);
      }
      if (curr_val.match(/^[0-9]+$/)) {
        curr_val = parseInt(curr_val, 10);
      }
    }
    full_opt = (is_long ? '--' : '-') + curr_opt;
    return curr_opt;
  };
  cli.parse = function(opts, command_def) {
    var default_val,
        i,
        parsed = cli.options,
        seen,
        catch_all = !opts;
    opt_list = opts || {};
    commands = command_def;
    command_list = commands || [];
    if (commands && !Array.isArray(commands)) {
      command_list = Object.keys(commands);
    }
    while ((o = cli.next())) {
      seen = false;
      for (var opt in opt_list) {
        if (!(opt_list[opt] instanceof Array)) {
          continue;
        }
        if (!opt_list[opt][0]) {
          opt_list[opt][0] = opt;
        }
        if (o === opt || o === opt_list[opt][0]) {
          seen = true;
          if (opt_list[opt].length === 2) {
            parsed[opt] = true;
            break;
          }
          default_val = null;
          if (opt_list[opt].length === 4) {
            default_val = opt_list[opt][3];
          }
          if (opt_list[opt][2] instanceof Array) {
            for (i = 0, l = opt_list[opt][2].length; i < l; i++) {
              if (typeof opt_list[opt][2][i] === 'number') {
                opt_list[opt][2][i] += '';
              }
            }
            parsed[opt] = cli.getArrayValue(opt_list[opt][2], is_long ? null : default_val);
            break;
          }
          if (opt_list[opt][2].toLowerCase) {
            opt_list[opt][2] = opt_list[opt][2].toLowerCase();
          }
          switch (opt_list[opt][2]) {
            case 'string':
            case 1:
            case true:
              parsed[opt] = cli.getValue(default_val);
              break;
            case 'int':
            case 'number':
            case 'num':
            case 'time':
            case 'seconds':
            case 'secs':
            case 'minutes':
            case 'mins':
            case 'x':
            case 'n':
              parsed[opt] = cli.getInt(default_val);
              break;
            case 'float':
            case 'decimal':
              parsed[opt] = cli.getFloat(default_val);
              break;
            case 'path':
            case 'file':
            case 'directory':
            case 'dir':
              parsed[opt] = cli.getPath(default_val, opt_list[opt][2]);
              break;
            case 'email':
              parsed[opt] = cli.getEmail(default_val);
              break;
            case 'url':
            case 'uri':
            case 'domain':
            case 'host':
              parsed[opt] = cli.getUrl(default_val, opt_list[opt][2]);
              break;
            case 'ip':
              parsed[opt] = cli.getIp(default_val);
              break;
            case 'bool':
            case 'boolean':
            case 'on':
              parsed[opt] = true;
              break;
            case 'false':
            case 'off':
            case false:
            case 0:
              parsed[opt] = false;
              break;
            default:
              cli.fatal('Unknown opt type "' + opt_list[opt][2] + '"');
          }
          break;
        }
      }
      if (process.env.NODE_DISABLE_COLORS) {
        no_color = true;
      }
      if (!seen) {
        if (enable.help && (o === 'h' || o === 'help')) {
          cli.getUsage();
        } else if (enable.version && (o === 'v' || o === 'version')) {
          if (cli.version == null) {
            cli.parsePackageJson();
          }
          console.error(cli.app + ' v' + cli.version);
          cli.exit();
          break;
        } else if (enable.daemon && (o === 'd' || o === 'daemon')) {
          daemon_arg = cli.getArrayValue(['start', 'stop', 'restart', 'pid', 'log'], is_long ? null : 'start');
          continue;
        } else if (enable.catchall && (o === 'c' || o === 'catch')) {
          continue;
        } else if (enable.status && (o === 'k' || o === 'no-color' || o === 'debug')) {
          no_color = (o === 'k' || o === 'no-color');
          show_debug = o === 'debug';
          continue;
        } else if (enable.timeout && (o === 't' || o === 'timeout')) {
          var secs = cli.getInt();
          setTimeout(function() {
            cli.fatal('Process timed out after ' + secs + 's');
          }, secs * 1000);
          continue;
        } else if (catch_all) {
          parsed[o] = curr_val || true;
          continue;
        }
        cli.fatal('Unknown option ' + full_opt);
      }
    }
    for (var opt in opt_list) {
      default_val = opt_list[opt].length === 4 ? opt_list[opt][3] : null;
      if (!(opt_list[opt] instanceof Array)) {
        parsed[opt] = opt_list[opt];
        continue;
      } else if (typeof parsed[opt] === 'undefined') {
        parsed[opt] = default_val;
      }
    }
    if (command_list.length) {
      if (cli.args.length === 0) {
        if (enable.help) {
          cli.getUsage();
        } else {
          cli.fatal('A command is required (' + command_list.join(', ') + ').');
        }
        return cli.exit(1);
      } else {
        cli.command = cli.autocompleteCommand(cli.args.shift());
      }
    }
    cli.argc = cli.args.length;
    return parsed;
  };
  cli.autocompleteCommand = function(command) {
    var list;
    if (!(command_list instanceof Array)) {
      list = Object.keys(command_list);
    } else {
      list = command_list;
    }
    var i,
        j = 0,
        c = command.length,
        tmp_list;
    if (list.length === 0 || list.indexOf(command) !== -1) {
      return command;
    }
    for (i = 0; i < c; i++) {
      tmp_list = [];
      l = list.length;
      if (l <= 1)
        break;
      for (j = 0; j < l; j++)
        if (list[j].length >= i && list[j][i] === command[i])
          tmp_list.push(list[j]);
      list = tmp_list;
    }
    l = list.length;
    if (l === 1) {
      return list[0];
    } else if (l === 0) {
      cli.fatal('Unknown command "' + command + '"' + (enable.help ? '. Please see --help for more information' : ''));
    } else {
      list.sort();
      cli.fatal('The command "' + command + '" is ambiguous and could mean "' + list.join('", "') + '"');
    }
  };
  cli.status = function(msg, type) {
    var pre;
    switch (type) {
      case 'info':
        pre = no_color ? 'INFO:' : '\x1B[33mINFO\x1B[0m:';
        break;
      case 'debug':
        pre = no_color ? 'DEBUG:' : '\x1B[36mDEBUG\x1B[0m:';
        break;
      case 'error':
      case 'fatal':
        pre = no_color ? 'ERROR:' : '\x1B[31mERROR\x1B[0m:';
        break;
      case 'ok':
        pre = no_color ? 'OK:' : '\x1B[32mOK\x1B[0m:';
        break;
    }
    msg = pre + ' ' + msg;
    if (type === 'fatal') {
      console.error(msg);
      return cli.exit(1);
    }
    if (enable.status && !show_debug && type === 'debug') {
      return;
    }
    console.error(msg);
  };
  ['info', 'error', 'ok', 'debug', 'fatal'].forEach(function(type) {
    cli[type] = function(msg) {
      cli.status(msg, type);
    };
  });
  cli.setApp = function(name, version) {
    if (name.indexOf('package.json') !== -1) {
      cli.parsePackageJson(name);
    } else {
      cli.app = name;
      cli.version = version;
    }
    return cli;
  };
  cli.parsePackageJson = function(path) {
    var parse_packagejson = function(path) {
      var packagejson = JSON.parse(cli.native.fs.readFileSync(path, 'utf8'));
      cli.version = packagejson.version;
      cli.app = packagejson.name;
    };
    var try_all = function(arr, func, err) {
      for (var i = 0,
          l = arr.length; i < l; i++) {
        try {
          func(arr[i]);
          return;
        } catch (e) {
          if (i === l - 1) {
            cli.fatal(err);
          }
        }
      }
    };
    try {
      if (path) {
        return parse_packagejson(path);
      }
      try_all([__dirname + '/package.json', __dirname + '/../package.json', __dirname + '/../../package.json'], parse_packagejson);
    } catch (e) {
      cli.fatal('Could not detect ' + cli.app + ' version');
    }
  };
  cli.setUsage = function(u) {
    usage = u;
    return cli;
  };
  var pad = function(str, len) {
    if (typeof len === 'undefined') {
      len = str;
      str = '';
    }
    if (str.length < len) {
      len -= str.length;
      while (len--)
        str += ' ';
    }
    return str;
  };
  cli.getUsage = function(code) {
    var short,
        desc,
        optional,
        line,
        seen_opts = [],
        switch_pad = cli.option_width;
    var trunc_desc = function(pref, desc, len) {
      var pref_len = pref.length,
          desc_len = cli.width - pref_len,
          truncated = '';
      if (desc.length <= desc_len) {
        return desc;
      }
      var desc_words = (desc + '').split(' '),
          chars = 0,
          word;
      while (desc_words.length) {
        truncated += (word = desc_words.shift()) + ' ';
        chars += word.length;
        if (desc_words.length && chars + desc_words[0].length > desc_len) {
          truncated += '\n' + pad(pref_len);
          chars = 0;
        }
      }
      return truncated;
    };
    usage = usage || cli.app + ' [OPTIONS]' + (command_list.length ? ' <command>' : '') + ' [ARGS]';
    if (no_color) {
      console.error('Usage:\n  ' + usage);
      console.error('Options: ');
    } else {
      console.error('\x1b[1mUsage\x1b[0m:\n  ' + usage);
      console.error('\n\x1b[1mOptions\x1b[0m: ');
    }
    for (var opt in opt_list) {
      if (opt.length === 1) {
        long = opt_list[opt][0];
        short = opt;
      } else {
        long = opt;
        short = opt_list[opt][0];
      }
      desc = opt_list[opt][1].trim();
      type = opt_list[opt].length >= 3 ? opt_list[opt][2] : null;
      optional = opt_list[opt].length === 4 ? opt_list[opt][3] : null;
      if (short === long) {
        if (short.length === 1) {
          line = '  -' + short;
        } else {
          line = '      --' + long;
        }
      } else if (short) {
        line = '  -' + short + ', --' + long;
      } else {
        line = '      --' + long;
      }
      line += ' ';
      if (type) {
        if (type instanceof Array) {
          desc += '. VALUE must be either [' + type.join('|') + ']';
          type = 'VALUE';
        }
        if (type === true || type === 1) {
          type = long.toUpperCase();
        }
        type = type.toUpperCase();
        if (type === 'FLOAT' || type === 'INT') {
          type = 'NUMBER';
        }
        line += optional ? '[' + type + ']' : type;
      }
      line = pad(line, switch_pad);
      line += trunc_desc(line, desc);
      line += optional ? ' (Default is ' + optional + ')' : '';
      console.error(line.replace('%s', '%\0s'));
      seen_opts.push(short);
      seen_opts.push(long);
    }
    if (enable.timeout && seen_opts.indexOf('t') === -1 && seen_opts.indexOf('timeout') === -1) {
      console.error(pad('  -t, --timeout N', switch_pad) + 'Exit if the process takes longer than N seconds');
    }
    if (enable.status) {
      if (seen_opts.indexOf('k') === -1 && seen_opts.indexOf('no-color') === -1) {
        console.error(pad('  -k, --no-color', switch_pad) + 'Omit color from output');
      }
      if (seen_opts.indexOf('debug') === -1) {
        console.error(pad('      --debug', switch_pad) + 'Show debug information');
      }
    }
    if (enable.catchall && seen_opts.indexOf('c') === -1 && seen_opts.indexOf('catch') === -1) {
      console.error(pad('  -c, --catch', switch_pad) + 'Catch unanticipated errors');
    }
    if (enable.daemon && seen_opts.indexOf('d') === -1 && seen_opts.indexOf('daemon') === -1) {
      console.error(pad('  -d, --daemon [ARG]', switch_pad) + 'Daemonize the process. Control the daemon using [start, stop, restart, log, pid]');
    }
    if (enable.version && seen_opts.indexOf('v') === -1 && seen_opts.indexOf('version') === -1) {
      console.error(pad('  -v, --version', switch_pad) + 'Display the current version');
    }
    if (enable.help && seen_opts.indexOf('h') === -1 && seen_opts.indexOf('help') === -1) {
      console.error(pad('  -h, --help', switch_pad) + 'Display help and usage details');
    }
    if (command_list.length) {
      console.error('\n\x1b[1mCommands\x1b[0m: ');
      if (!Array.isArray(commands)) {
        for (var c in commands) {
          line = '  ' + pad(c, switch_pad - 2);
          line += trunc_desc(line, commands[c]);
          console.error(line);
        }
      } else {
        command_list.sort();
        console.error('  ' + trunc_desc('  ', command_list.join(', ')));
      }
    }
    return cli.exit(code);
  };
  cli.getOptError = function(expects, type) {
    var err = full_opt + ' expects ' + expects + '. Use `' + cli.app + ' ' + full_opt + (is_long ? '=' : ' ') + type + '`';
    return err;
  };
  cli.getValue = function(default_val, validate_func, err_msg) {
    err_msg = err_msg || cli.getOptError('a value', 'VALUE');
    var value;
    try {
      if (curr_val) {
        if (validate_func) {
          curr_val = validate_func(curr_val);
        }
        return curr_val;
      }
      if (short_tags.length) {
        throw 'Short tags';
      }
      if (!argv.length || (argv[0].length === 1 && argv[0][0] === '-')) {
        throw 'No value';
      }
      value = argv.shift();
      if (value.match(/^[0-9]+$/)) {
        value = parseInt(value, 10);
      }
      if (validate_func) {
        value = validate_func(value);
      }
    } catch (e) {
      if (value) {
        argv.unshift(value);
      }
      return default_val != null ? default_val : cli.fatal(err_msg);
    }
    return value;
  };
  cli.getInt = function(default_val) {
    return cli.getValue(default_val, function(value) {
      if (typeof value === 'number')
        return value;
      if (!value.match(/^(?:-?(?:0|[1-9][0-9]*))$/)) {
        throw 'Invalid int';
      }
      return parseInt(value);
    }, cli.getOptError('a number', 'NUMBER'));
  };
  cli.getFloat = function(default_val) {
    return cli.getValue(default_val, function(value) {
      if (!value.match(/^(?:-?(?:0|[1-9][0-9]*))?(?:\.[0-9]*)?$/)) {
        throw 'Invalid float';
      }
      return parseFloat(value, 10);
    }, cli.getOptError('a number', 'NUMBER'));
  };
  cli.getUrl = function(default_val, identifier) {
    identifier = identifier || 'url';
    return cli.getValue(default_val, function(value) {
      if (!value.match(/^(?:(?:ht|f)tp(?:s?)\:\/\/|~\/|\/)?(?:\w+:\w+@)?((?:(?:[-\w\d{1-3}]+\.)+(?:com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|edu|co\.uk|ac\.uk|it|fr|tv|museum|asia|local|travel|[a-z]{2})?)|((\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)(\.(\b25[0-5]\b|\b[2][0-4][0-9]\b|\b[0-1]?[0-9]?[0-9]\b)){3}))(?::[\d]{1,5})?(?:(?:(?:\/(?:[-\w~!$+|.,=]|%[a-f\d]{2})+)+|\/)+|\?|#)?(?:(?:\?(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)(?:&(?:[-\w~!$+|.,*:]|%[a-f\d{2}])+=?(?:[-\w~!$+|.,*:=]|%[a-f\d]{2})*)*)*(?:#(?:[-\w~!$ |\/.,*:;=]|%[a-f\d]{2})*)?$/i)) {
        throw 'Invalid URL';
      }
      return value;
    }, cli.getOptError('a ' + identifier, identifier.toUpperCase()));
  };
  cli.getEmail = function(default_val) {
    return cli.getValue(default_val, function(value) {
      if (!value.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) {
        throw 'Invalid email';
      }
      return value;
    }, cli.getOptError('an email', 'EMAIL'));
  };
  cli.getIp = function(default_val) {
    return cli.getValue(default_val, function(value) {
      if (!value.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
        throw 'Invalid IP';
      }
      return value;
    }, cli.getOptError('an IP', 'IP'));
  };
  cli.getPath = function(default_val, identifier) {
    identifier = identifier || 'path';
    return cli.getValue(default_val, function(value) {
      if (value.match(/[?*;{}]/)) {
        throw 'Invalid path';
      }
      return value;
    }, cli.getOptError('a ' + identifier, identifier.toUpperCase()));
  };
  cli.getArrayValue = function(arr, default_val) {
    return cli.getValue(default_val, function(value) {
      if (arr.indexOf(value) === -1) {
        throw 'Unexpected value';
      }
      return value;
    }, cli.getOptError('either [' + arr.join('|') + ']', 'VALUE'));
  };
  cli.withStdin = function(encoding, callback) {
    if (typeof encoding === 'function') {
      callback = encoding;
      encoding = 'utf8';
    }
    var stream = process.openStdin(),
        data = '';
    stream.setEncoding(encoding);
    stream.on('data', function(chunk) {
      data += chunk;
    });
    stream.on('end', function() {
      callback.apply(cli, [data]);
    });
  };
  cli.withStdinLines = function(callback) {
    cli.withStdin(function(data) {
      var sep = data.indexOf('\r\n') !== -1 ? '\r\n' : '\n';
      callback.apply(cli, [data.split(sep), sep]);
    });
  };
  cli.withInput = function(file, encoding, callback) {
    if (typeof encoding === 'function') {
      callback = encoding;
      encoding = 'utf8';
    } else if (typeof file === 'function') {
      callback = file;
      encoding = 'utf8';
      file = 'stdin';
    }
    if (file === 'stdin') {
      file = process.openStdin();
    } else {
      try {
        file = cli.native.fs.createReadStream(file);
        file.on('error', cli.fatal);
      } catch (e) {
        return cli.fatal(e);
      }
    }
    file.setEncoding(encoding);
    var lines = [],
        data = '',
        eof,
        sep;
    file.on('data', function(chunk) {
      if (eof)
        return;
      data += chunk;
      if (!sep) {
        if (data.indexOf('\r\n') !== -1) {
          sep = '\r\n';
        } else if (data.indexOf('\n') !== -1) {
          sep = '\n';
        } else {
          last_line = data;
          return;
        }
      }
      lines = data.split(sep);
      data = eof ? null : lines.pop();
      while (lines.length) {
        callback.apply(cli, [lines.shift(), sep, false]);
      }
    });
    file.on('end', function() {
      eof = true;
      if (data.length) {
        callback.apply(cli, [data, sep || '', false]);
      }
      callback.apply(cli, [null, null, true]);
    });
  };
  cli.daemon = function(arg, callback) {
    if (typeof daemon === 'undefined') {
      cli.fatal('Daemon is not initialized');
    }
    if (typeof arg === 'function') {
      callback = arg;
      arg = 'start';
    }
    var lock_file = '/tmp/' + cli.app + '.pid',
        log_file = '/tmp/' + cli.app + '.log';
    var start = function() {
      daemon.daemonize(log_file, lock_file, function(err) {
        if (err)
          return cli.error('Error starting daemon: ' + err);
        callback();
      });
    };
    var stop = function() {
      try {
        cli.native.fs.readFileSync(lock_file);
      } catch (e) {
        return cli.error('Daemon is not running');
      }
      daemon.kill(lock_file, function(err, pid) {
        if (err && err.errno === 3) {
          return cli.error('Daemon is not running');
        } else if (err) {
          return cli.error('Error stopping daemon: ' + err.errno);
        }
        cli.ok('Successfully stopped daemon with pid: ' + pid);
      });
    };
    switch (arg) {
      case 'stop':
        stop();
        break;
      case 'restart':
        daemon.stop(lock_file, function() {
          start();
        });
        break;
      case 'log':
        try {
          cli.native.fs.createReadStream(log_file, {encoding: 'utf8'}).pipe(process.stdout);
        } catch (e) {
          return cli.error('No daemon log file');
        }
        break;
      case 'pid':
        try {
          var pid = cli.native.fs.readFileSync(lock_file, 'utf8');
          cli.native.fs.statSync('/proc/' + pid);
          cli.info(pid);
        } catch (e) {
          return cli.error('Daemon is not running');
        }
        break;
      default:
        start();
        break;
    }
  };
  cli.main = function(callback) {
    var after = function() {
      callback.apply(cli, [cli.args, cli.options]);
    };
    if (enable.daemon && daemon_arg) {
      cli.daemon(daemon_arg, after);
    } else {
      after();
    }
  };
  cli.createServer = function() {
    var defaultStackErrorHandler = function(req, res, err) {
      if (err) {
        console.error(err.stack);
        res.writeHead(500, {"Content-Type": "text/plain"});
        return res.end(err.stack + "\n");
      }
      res.writeHead(404, {"Content-Type": "text/plain"});
      res.end("Not Found\n");
    };
    var handle,
        error;
    handle = error = defaultStackErrorHandler;
    var layers = Array.prototype.slice.call(arguments);
    if (layers.length && layers[0] instanceof Array) {
      layers = layers[0];
    }
    layers.reverse().forEach(function(layer) {
      var child = handle;
      handle = function(req, res) {
        try {
          layer(req, res, function(err) {
            if (err)
              return error(req, res, err);
            child(req, res);
          });
        } catch (err) {
          error(req, res, err);
        }
      };
    });
    return cli.native.http.createServer(handle);
  };
  cli.exec = function(cmd, callback, errback) {
    cli.native.child_process.exec(cmd, function(err, stdout, stderr) {
      err = err || stderr;
      if (err) {
        if (errback) {
          return errback(err, stdout);
        }
        return cli.fatal('exec() failed\n' + err);
      }
      if (callback) {
        callback(stdout.split('\n'));
      }
    });
  };
  var last_progress_call,
      progress_len = 74;
  cli.progress = function(progress, decimals, stream) {
    stream = stream || process.stdout;
    if (progress < 0 || progress > 1 || isNaN(progress))
      return;
    if (!decimals)
      decimals = 0;
    var now = (new Date()).getTime();
    if (last_progress_call && (now - last_progress_call) < 100 && progress !== 1) {
      return;
    }
    last_progress_call = now;
    var barLength = Math.floor(progress_len * progress),
        str = '';
    if (barLength == 0 && progress > 0) {
      barLength = 1;
    }
    for (var i = 1; i <= progress_len; i++) {
      str += i <= barLength ? '#' : ' ';
    }
    var pwr = Math.pow(10, decimals);
    var percentage = Math.floor(progress * 100 * pwr) / pwr + '%';
    for (i = 0; i < decimals; i++) {
      percentage += ' ';
    }
    stream.clearLine();
    stream.write('[' + str + '] ' + percentage);
    if (progress === 1) {
      stream.write('\n');
    } else {
      stream.cursorTo(0);
    }
  };
  var spinnerInterval;
  cli.spinner = function(prefix, end, stream) {
    stream = stream || process.stdout;
    if (end) {
      stream.clearLine();
      stream.cursorTo(0);
      stream.write(prefix + '\n');
      return clearInterval(spinnerInterval);
    }
    prefix = prefix + ' ' || '';
    var spinner = ['-', '\\', '|', '/'],
        i = 0,
        l = spinner.length;
    spinnerInterval = setInterval(function() {
      stream.clearLine();
      stream.cursorTo(0);
      stream.write(prefix + spinner[i++]);
      if (i == l)
        i = 0;
    }, 200);
  };
})(require('process'));
