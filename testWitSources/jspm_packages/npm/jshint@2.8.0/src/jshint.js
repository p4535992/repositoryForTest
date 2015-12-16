/* */ 
(function(process) {
  var _ = require('lodash');
  var events = require('events');
  var vars = require('./vars');
  var messages = require('./messages');
  var Lexer = require('./lex').Lexer;
  var reg = require('./reg');
  var state = require('./state').state;
  var style = require('./style');
  var options = require('./options');
  var console = require('console-browserify');
  var JSHINT = (function() {
    "use strict";
    var api,
        bang = {
          "<": true,
          "<=": true,
          "==": true,
          "===": true,
          "!==": true,
          "!=": true,
          ">": true,
          ">=": true,
          "+": true,
          "-": true,
          "*": true,
          "/": true,
          "%": true
        },
        declared,
        exported,
        functionicity = ["closure", "exception", "global", "label", "outer", "unused", "var"],
        funct,
        functions,
        global,
        implied,
        inblock,
        indent,
        lookahead,
        lex,
        member,
        membersOnly,
        predefined,
        scope,
        stack,
        unuseds,
        urls,
        extraModules = [],
        emitter = new events.EventEmitter();
    function checkOption(name, t) {
      name = name.trim();
      if (/^[+-]W\d{3}$/g.test(name)) {
        return true;
      }
      if (options.validNames.indexOf(name) === -1) {
        if (t.type !== "jslint" && !_.has(options.removed, name)) {
          error("E001", t, name);
          return false;
        }
      }
      return true;
    }
    function isString(obj) {
      return Object.prototype.toString.call(obj) === "[object String]";
    }
    function isIdentifier(tkn, value) {
      if (!tkn)
        return false;
      if (!tkn.identifier || tkn.value !== value)
        return false;
      return true;
    }
    function isReserved(token) {
      if (!token.reserved) {
        return false;
      }
      var meta = token.meta;
      if (meta && meta.isFutureReservedWord && state.inES5()) {
        if (!meta.es5) {
          return false;
        }
        if (meta.strictOnly) {
          if (!state.option.strict && !state.isStrict()) {
            return false;
          }
        }
        if (token.isProperty) {
          return false;
        }
      }
      return true;
    }
    function supplant(str, data) {
      return str.replace(/\{([^{}]*)\}/g, function(a, b) {
        var r = data[b];
        return typeof r === "string" || typeof r === "number" ? r : a;
      });
    }
    function combine(dest, src) {
      Object.keys(src).forEach(function(name) {
        if (_.has(JSHINT.blacklist, name))
          return;
        dest[name] = src[name];
      });
    }
    function processenforceall() {
      if (state.option.enforceall) {
        for (var enforceopt in options.bool.enforcing) {
          if (state.option[enforceopt] === undefined && !options.noenforceall[enforceopt]) {
            state.option[enforceopt] = true;
          }
        }
        for (var relaxopt in options.bool.relaxing) {
          if (state.option[relaxopt] === undefined) {
            state.option[relaxopt] = false;
          }
        }
      }
    }
    function assume() {
      processenforceall();
      if (!state.option.es3) {
        combine(predefined, vars.ecmaIdentifiers[5]);
      }
      if (state.option.esnext) {
        combine(predefined, vars.ecmaIdentifiers[6]);
      }
      if (state.option.module) {
        if (!hasParsedCode(funct)) {
          error("E055", state.tokens.next, "module");
        }
        if (!state.inESNext()) {
          warning("W134", state.tokens.next, "module", 6);
        }
      }
      if (state.option.couch) {
        combine(predefined, vars.couch);
      }
      if (state.option.qunit) {
        combine(predefined, vars.qunit);
      }
      if (state.option.rhino) {
        combine(predefined, vars.rhino);
      }
      if (state.option.shelljs) {
        combine(predefined, vars.shelljs);
        combine(predefined, vars.node);
      }
      if (state.option.typed) {
        combine(predefined, vars.typed);
      }
      if (state.option.phantom) {
        combine(predefined, vars.phantom);
      }
      if (state.option.prototypejs) {
        combine(predefined, vars.prototypejs);
      }
      if (state.option.node) {
        combine(predefined, vars.node);
        combine(predefined, vars.typed);
      }
      if (state.option.devel) {
        combine(predefined, vars.devel);
      }
      if (state.option.dojo) {
        combine(predefined, vars.dojo);
      }
      if (state.option.browser) {
        combine(predefined, vars.browser);
        combine(predefined, vars.typed);
      }
      if (state.option.browserify) {
        combine(predefined, vars.browser);
        combine(predefined, vars.typed);
        combine(predefined, vars.browserify);
      }
      if (state.option.nonstandard) {
        combine(predefined, vars.nonstandard);
      }
      if (state.option.jasmine) {
        combine(predefined, vars.jasmine);
      }
      if (state.option.jquery) {
        combine(predefined, vars.jquery);
      }
      if (state.option.mootools) {
        combine(predefined, vars.mootools);
      }
      if (state.option.worker) {
        combine(predefined, vars.worker);
      }
      if (state.option.wsh) {
        combine(predefined, vars.wsh);
      }
      if (state.option.globalstrict && state.option.strict !== false) {
        state.option.strict = true;
      }
      if (state.option.yui) {
        combine(predefined, vars.yui);
      }
      if (state.option.mocha) {
        combine(predefined, vars.mocha);
      }
    }
    function quit(code, line, chr) {
      var percentage = Math.floor((line / state.lines.length) * 100);
      var message = messages.errors[code].desc;
      throw {
        name: "JSHintError",
        line: line,
        character: chr,
        message: message + " (" + percentage + "% scanned).",
        raw: message,
        code: code
      };
    }
    function isundef(scope, code, token, a) {
      if (!state.ignored[code] && state.option.undef !== false) {
        JSHINT.undefs.push([scope, code, token, a]);
      }
    }
    function removeIgnoredMessages() {
      var ignored = state.ignoredLines;
      if (_.isEmpty(ignored))
        return;
      JSHINT.errors = _.reject(JSHINT.errors, function(err) {
        return ignored[err.line];
      });
    }
    function warning(code, t, a, b, c, d) {
      var ch,
          l,
          w,
          msg;
      if (/^W\d{3}$/.test(code)) {
        if (state.ignored[code])
          return;
        msg = messages.warnings[code];
      } else if (/E\d{3}/.test(code)) {
        msg = messages.errors[code];
      } else if (/I\d{3}/.test(code)) {
        msg = messages.info[code];
      }
      t = t || state.tokens.next || {};
      if (t.id === "(end)") {
        t = state.tokens.curr;
      }
      l = t.line || 0;
      ch = t.from || 0;
      w = {
        id: "(error)",
        raw: msg.desc,
        code: msg.code,
        evidence: state.lines[l - 1] || "",
        line: l,
        character: ch,
        scope: JSHINT.scope,
        a: a,
        b: b,
        c: c,
        d: d
      };
      w.reason = supplant(msg.desc, w);
      JSHINT.errors.push(w);
      removeIgnoredMessages();
      if (JSHINT.errors.length >= state.option.maxerr)
        quit("E043", l, ch);
      return w;
    }
    function warningAt(m, l, ch, a, b, c, d) {
      return warning(m, {
        line: l,
        from: ch
      }, a, b, c, d);
    }
    function error(m, t, a, b, c, d) {
      warning(m, t, a, b, c, d);
    }
    function errorAt(m, l, ch, a, b, c, d) {
      return error(m, {
        line: l,
        from: ch
      }, a, b, c, d);
    }
    function addInternalSrc(elem, src) {
      var i;
      i = {
        id: "(internal)",
        elem: elem,
        value: src
      };
      JSHINT.internals.push(i);
      return i;
    }
    function addlabel(name, opts) {
      var type = opts.type;
      var token = opts.token;
      var isblockscoped = opts.isblockscoped;
      if (type === "exception") {
        if (_.has(funct["(context)"], name)) {
          if (funct[name] !== true && !state.option.node) {
            warning("W002", state.tokens.next, name);
          }
        }
      }
      if (_.has(funct, name) && !funct["(global)"]) {
        if (funct[name] === true) {
          if (state.option.latedef) {
            if ((state.option.latedef === true && _.contains([funct[name], type], "unction")) || !_.contains([funct[name], type], "unction")) {
              warning("W003", state.tokens.next, name);
            }
          }
        } else {
          if ((!state.option.shadow || _.contains(["inner", "outer"], state.option.shadow)) && type !== "exception" || funct["(blockscope)"].getlabel(name)) {
            warning("W004", state.tokens.next, name);
          }
        }
      }
      if (funct["(context)"] && _.has(funct["(context)"], name) && type !== "function") {
        if (state.option.shadow === "outer") {
          warning("W123", state.tokens.next, name);
        }
      }
      if (isblockscoped) {
        funct["(blockscope)"].current.add(name, type, state.tokens.curr);
        if (funct["(blockscope)"].atTop() && exported[name]) {
          state.tokens.curr.exported = true;
        }
      } else {
        funct["(blockscope)"].shadow(name);
        funct[name] = type;
        if (token) {
          funct["(tokens)"][name] = token;
        }
        if (funct["(global)"]) {
          global[name] = funct;
          if (_.has(implied, name)) {
            if (state.option.latedef) {
              if ((state.option.latedef === true && _.contains([funct[name], type], "unction")) || !_.contains([funct[name], type], "unction")) {
                warning("W003", state.tokens.next, name);
              }
            }
            delete implied[name];
          }
        } else {
          scope[name] = funct;
        }
      }
    }
    function doOption() {
      var nt = state.tokens.next;
      var body = nt.body.split(",").map(function(s) {
        return s.trim();
      });
      var predef = {};
      if (nt.type === "globals") {
        body.forEach(function(g) {
          g = g.split(":");
          var key = (g[0] || "").trim();
          var val = (g[1] || "").trim();
          if (key.charAt(0) === "-") {
            key = key.slice(1);
            val = false;
            JSHINT.blacklist[key] = key;
            delete predefined[key];
          } else {
            predef[key] = (val === "true");
          }
        });
        combine(predefined, predef);
        for (var key in predef) {
          if (_.has(predef, key)) {
            declared[key] = nt;
          }
        }
      }
      if (nt.type === "exported") {
        body.forEach(function(e) {
          exported[e] = true;
        });
      }
      if (nt.type === "members") {
        membersOnly = membersOnly || {};
        body.forEach(function(m) {
          var ch1 = m.charAt(0);
          var ch2 = m.charAt(m.length - 1);
          if (ch1 === ch2 && (ch1 === "\"" || ch1 === "'")) {
            m = m.substr(1, m.length - 2).replace("\\\"", "\"");
          }
          membersOnly[m] = false;
        });
      }
      var numvals = ["maxstatements", "maxparams", "maxdepth", "maxcomplexity", "maxerr", "maxlen", "indent"];
      if (nt.type === "jshint" || nt.type === "jslint") {
        body.forEach(function(g) {
          g = g.split(":");
          var key = (g[0] || "").trim();
          var val = (g[1] || "").trim();
          if (!checkOption(key, nt)) {
            return;
          }
          if (numvals.indexOf(key) >= 0) {
            if (val !== "false") {
              val = +val;
              if (typeof val !== "number" || !isFinite(val) || val <= 0 || Math.floor(val) !== val) {
                error("E032", nt, g[1].trim());
                return;
              }
              state.option[key] = val;
            } else {
              state.option[key] = key === "indent" ? 4 : false;
            }
            return;
          }
          if (key === "es5") {
            if (val === "true" && state.option.es5) {
              warning("I003");
            }
          }
          if (key === "validthis") {
            if (funct["(global)"])
              return void error("E009");
            if (val !== "true" && val !== "false")
              return void error("E002", nt);
            state.option.validthis = (val === "true");
            return;
          }
          if (key === "quotmark") {
            switch (val) {
              case "true":
              case "false":
                state.option.quotmark = (val === "true");
                break;
              case "double":
              case "single":
                state.option.quotmark = val;
                break;
              default:
                error("E002", nt);
            }
            return;
          }
          if (key === "shadow") {
            switch (val) {
              case "true":
                state.option.shadow = true;
                break;
              case "outer":
                state.option.shadow = "outer";
                break;
              case "false":
              case "inner":
                state.option.shadow = "inner";
                break;
              default:
                error("E002", nt);
            }
            return;
          }
          if (key === "unused") {
            switch (val) {
              case "true":
                state.option.unused = true;
                break;
              case "false":
                state.option.unused = false;
                break;
              case "vars":
              case "strict":
                state.option.unused = val;
                break;
              default:
                error("E002", nt);
            }
            return;
          }
          if (key === "latedef") {
            switch (val) {
              case "true":
                state.option.latedef = true;
                break;
              case "false":
                state.option.latedef = false;
                break;
              case "nofunc":
                state.option.latedef = "nofunc";
                break;
              default:
                error("E002", nt);
            }
            return;
          }
          if (key === "ignore") {
            switch (val) {
              case "start":
                state.ignoreLinterErrors = true;
                break;
              case "end":
                state.ignoreLinterErrors = false;
                break;
              case "line":
                state.ignoredLines[nt.line] = true;
                removeIgnoredMessages();
                break;
              default:
                error("E002", nt);
            }
            return;
          }
          var match = /^([+-])(W\d{3})$/g.exec(key);
          if (match) {
            state.ignored[match[2]] = (match[1] === "-");
            return;
          }
          var tn;
          if (val === "true" || val === "false") {
            if (nt.type === "jslint") {
              tn = options.renamed[key] || key;
              state.option[tn] = (val === "true");
              if (options.inverted[tn] !== undefined) {
                state.option[tn] = !state.option[tn];
              }
            } else {
              state.option[key] = (val === "true");
            }
            if (key === "newcap") {
              state.option["(explicitNewcap)"] = true;
            }
            return;
          }
          error("E002", nt);
        });
        assume();
      }
    }
    function peek(p) {
      var i = p || 0,
          j = 0,
          t;
      while (j <= i) {
        t = lookahead[j];
        if (!t) {
          t = lookahead[j] = lex.token();
        }
        j += 1;
      }
      if (!t && state.tokens.next.id === "(end)") {
        return state.tokens.next;
      }
      return t;
    }
    function peekIgnoreEOL() {
      var i = 0;
      var t;
      do {
        t = peek(i++);
      } while (t.id === "(endline)");
      return t;
    }
    function advance(id, t) {
      switch (state.tokens.curr.id) {
        case "(number)":
          if (state.tokens.next.id === ".") {
            warning("W005", state.tokens.curr);
          }
          break;
        case "-":
          if (state.tokens.next.id === "-" || state.tokens.next.id === "--") {
            warning("W006");
          }
          break;
        case "+":
          if (state.tokens.next.id === "+" || state.tokens.next.id === "++") {
            warning("W007");
          }
          break;
      }
      if (id && state.tokens.next.id !== id) {
        if (t) {
          if (state.tokens.next.id === "(end)") {
            error("E019", t, t.id);
          } else {
            error("E020", state.tokens.next, id, t.id, t.line, state.tokens.next.value);
          }
        } else if (state.tokens.next.type !== "(identifier)" || state.tokens.next.value !== id) {
          warning("W116", state.tokens.next, id, state.tokens.next.value);
        }
      }
      state.tokens.prev = state.tokens.curr;
      state.tokens.curr = state.tokens.next;
      for (; ; ) {
        state.tokens.next = lookahead.shift() || lex.token();
        if (!state.tokens.next) {
          quit("E041", state.tokens.curr.line);
        }
        if (state.tokens.next.id === "(end)" || state.tokens.next.id === "(error)") {
          return;
        }
        if (state.tokens.next.check) {
          state.tokens.next.check();
        }
        if (state.tokens.next.isSpecial) {
          doOption();
        } else {
          if (state.tokens.next.id !== "(endline)") {
            break;
          }
        }
      }
    }
    function isInfix(token) {
      return token.infix || (!token.identifier && !token.template && !!token.led);
    }
    function isEndOfExpr() {
      var curr = state.tokens.curr;
      var next = state.tokens.next;
      if (next.id === ";" || next.id === "}" || next.id === ":") {
        return true;
      }
      if (isInfix(next) === isInfix(curr) || (curr.id === "yield" && state.inMoz())) {
        return curr.line !== startLine(next);
      }
      return false;
    }
    function isBeginOfExpr(prev) {
      return !prev.left && prev.arity !== "unary";
    }
    function expression(rbp, initial) {
      var left,
          isArray = false,
          isObject = false,
          isLetExpr = false;
      state.nameStack.push();
      if (!initial && state.tokens.next.value === "let" && peek(0).value === "(") {
        if (!state.inMoz()) {
          warning("W118", state.tokens.next, "let expressions");
        }
        isLetExpr = true;
        funct["(blockscope)"].stack();
        advance("let");
        advance("(");
        state.tokens.prev.fud();
        advance(")");
      }
      if (state.tokens.next.id === "(end)")
        error("E006", state.tokens.curr);
      var isDangerous = state.option.asi && state.tokens.prev.line !== startLine(state.tokens.curr) && _.contains(["]", ")"], state.tokens.prev.id) && _.contains(["[", "("], state.tokens.curr.id);
      if (isDangerous)
        warning("W014", state.tokens.curr, state.tokens.curr.id);
      advance();
      if (initial) {
        funct["(verb)"] = state.tokens.curr.value;
        state.tokens.curr.beginsStmt = true;
      }
      if (initial === true && state.tokens.curr.fud) {
        left = state.tokens.curr.fud();
      } else {
        if (state.tokens.curr.nud) {
          left = state.tokens.curr.nud();
        } else {
          error("E030", state.tokens.curr, state.tokens.curr.id);
        }
        while ((rbp < state.tokens.next.lbp || state.tokens.next.type === "(template)") && !isEndOfExpr()) {
          isArray = state.tokens.curr.value === "Array";
          isObject = state.tokens.curr.value === "Object";
          if (left && (left.value || (left.first && left.first.value))) {
            if (left.value !== "new" || (left.first && left.first.value && left.first.value === ".")) {
              isArray = false;
              if (left.value !== state.tokens.curr.value) {
                isObject = false;
              }
            }
          }
          advance();
          if (isArray && state.tokens.curr.id === "(" && state.tokens.next.id === ")") {
            warning("W009", state.tokens.curr);
          }
          if (isObject && state.tokens.curr.id === "(" && state.tokens.next.id === ")") {
            warning("W010", state.tokens.curr);
          }
          if (left && state.tokens.curr.led) {
            left = state.tokens.curr.led(left);
          } else {
            error("E033", state.tokens.curr, state.tokens.curr.id);
          }
        }
      }
      if (isLetExpr) {
        funct["(blockscope)"].unstack();
      }
      state.nameStack.pop();
      return left;
    }
    function startLine(token) {
      return token.startLine || token.line;
    }
    function nobreaknonadjacent(left, right) {
      left = left || state.tokens.curr;
      right = right || state.tokens.next;
      if (!state.option.laxbreak && left.line !== startLine(right)) {
        warning("W014", right, right.value);
      }
    }
    function nolinebreak(t) {
      t = t || state.tokens.curr;
      if (t.line !== startLine(state.tokens.next)) {
        warning("E022", t, t.value);
      }
    }
    function nobreakcomma(left, right) {
      if (left.line !== startLine(right)) {
        if (!state.option.laxcomma) {
          if (comma.first) {
            warning("I001");
            comma.first = false;
          }
          warning("W014", left, right.value);
        }
      }
    }
    function comma(opts) {
      opts = opts || {};
      if (!opts.peek) {
        nobreakcomma(state.tokens.curr, state.tokens.next);
        advance(",");
      } else {
        nobreakcomma(state.tokens.prev, state.tokens.curr);
      }
      if (state.tokens.next.identifier && !(opts.property && state.inES5())) {
        switch (state.tokens.next.value) {
          case "break":
          case "case":
          case "catch":
          case "continue":
          case "default":
          case "do":
          case "else":
          case "finally":
          case "for":
          case "if":
          case "in":
          case "instanceof":
          case "return":
          case "switch":
          case "throw":
          case "try":
          case "var":
          case "let":
          case "while":
          case "with":
            error("E024", state.tokens.next, state.tokens.next.value);
            return false;
        }
      }
      if (state.tokens.next.type === "(punctuator)") {
        switch (state.tokens.next.value) {
          case "}":
          case "]":
          case ",":
            if (opts.allowTrailing) {
              return true;
            }
          case ")":
            error("E024", state.tokens.next, state.tokens.next.value);
            return false;
        }
      }
      return true;
    }
    function symbol(s, p) {
      var x = state.syntax[s];
      if (!x || typeof x !== "object") {
        state.syntax[s] = x = {
          id: s,
          lbp: p,
          value: s
        };
      }
      return x;
    }
    function delim(s) {
      var x = symbol(s, 0);
      x.delim = true;
      return x;
    }
    function stmt(s, f) {
      var x = delim(s);
      x.identifier = x.reserved = true;
      x.fud = f;
      return x;
    }
    function blockstmt(s, f) {
      var x = stmt(s, f);
      x.block = true;
      return x;
    }
    function reserveName(x) {
      var c = x.id.charAt(0);
      if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
        x.identifier = x.reserved = true;
      }
      return x;
    }
    function prefix(s, f) {
      var x = symbol(s, 150);
      reserveName(x);
      x.nud = (typeof f === "function") ? f : function() {
        this.arity = "unary";
        this.right = expression(150);
        if (this.id === "++" || this.id === "--") {
          if (state.option.plusplus) {
            warning("W016", this, this.id);
          } else if (this.right && (!this.right.identifier || isReserved(this.right)) && this.right.id !== "." && this.right.id !== "[") {
            warning("W017", this);
          }
          if (this.right && this.right.identifier) {
            if (funct["(blockscope)"].labeltype(this.right.value) === "const") {
              error("E013", this, this.right.value);
            }
          }
        }
        return this;
      };
      return x;
    }
    function type(s, f) {
      var x = delim(s);
      x.type = s;
      x.nud = f;
      return x;
    }
    function reserve(name, func) {
      var x = type(name, func);
      x.identifier = true;
      x.reserved = true;
      return x;
    }
    function FutureReservedWord(name, meta) {
      var x = type(name, (meta && meta.nud) || function() {
        return this;
      });
      meta = meta || {};
      meta.isFutureReservedWord = true;
      x.value = name;
      x.identifier = true;
      x.reserved = true;
      x.meta = meta;
      return x;
    }
    function reservevar(s, v) {
      return reserve(s, function() {
        if (typeof v === "function") {
          v(this);
        }
        return this;
      });
    }
    function infix(s, f, p, w) {
      var x = symbol(s, p);
      reserveName(x);
      x.infix = true;
      x.led = function(left) {
        if (!w) {
          nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
        }
        if ((s === "in" || s === "instanceof") && left.id === "!") {
          warning("W018", left, "!");
        }
        if (typeof f === "function") {
          return f(left, this);
        } else {
          this.left = left;
          this.right = expression(p);
          return this;
        }
      };
      return x;
    }
    function application(s) {
      var x = symbol(s, 42);
      x.led = function(left) {
        nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
        this.left = left;
        this.right = doFunction({
          type: "arrow",
          loneArg: left
        });
        return this;
      };
      return x;
    }
    function relation(s, f) {
      var x = symbol(s, 100);
      x.led = function(left) {
        nobreaknonadjacent(state.tokens.prev, state.tokens.curr);
        this.left = left;
        var right = this.right = expression(100);
        if (isIdentifier(left, "NaN") || isIdentifier(right, "NaN")) {
          warning("W019", this);
        } else if (f) {
          f.apply(this, [left, right]);
        }
        if (!left || !right) {
          quit("E041", state.tokens.curr.line);
        }
        if (left.id === "!") {
          warning("W018", left, "!");
        }
        if (right.id === "!") {
          warning("W018", right, "!");
        }
        return this;
      };
      return x;
    }
    function isPoorRelation(node) {
      return node && ((node.type === "(number)" && +node.value === 0) || (node.type === "(string)" && node.value === "") || (node.type === "null" && !state.option.eqnull) || node.type === "true" || node.type === "false" || node.type === "undefined");
    }
    var typeofValues = {};
    typeofValues.legacy = ["xml", "unknown"];
    typeofValues.es3 = ["undefined", "boolean", "number", "string", "function", "object"];
    typeofValues.es3 = typeofValues.es3.concat(typeofValues.legacy);
    typeofValues.es6 = typeofValues.es3.concat("symbol");
    function isTypoTypeof(left, right, state) {
      var values;
      if (state.option.notypeof)
        return false;
      if (!left || !right)
        return false;
      values = state.inESNext() ? typeofValues.es6 : typeofValues.es3;
      if (right.type === "(identifier)" && right.value === "typeof" && left.type === "(string)")
        return !_.contains(values, left.value);
      return false;
    }
    function isGlobalEval(left, state, funct) {
      var isGlobal = false;
      if (left.type === "this" && funct["(context)"] === null) {
        isGlobal = true;
      } else if (left.type === "(identifier)") {
        if (state.option.node && left.value === "global") {
          isGlobal = true;
        } else if (state.option.browser && (left.value === "window" || left.value === "document")) {
          isGlobal = true;
        }
      }
      return isGlobal;
    }
    function findNativePrototype(left) {
      var natives = ["Array", "ArrayBuffer", "Boolean", "Collator", "DataView", "Date", "DateTimeFormat", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Infinity", "Intl", "Int16Array", "Int32Array", "Int8Array", "Iterator", "Number", "NumberFormat", "Object", "RangeError", "ReferenceError", "RegExp", "StopIteration", "String", "SyntaxError", "TypeError", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "URIError"];
      function walkPrototype(obj) {
        if (typeof obj !== "object")
          return;
        return obj.right === "prototype" ? obj : walkPrototype(obj.left);
      }
      function walkNative(obj) {
        while (!obj.identifier && typeof obj.left === "object")
          obj = obj.left;
        if (obj.identifier && natives.indexOf(obj.value) >= 0)
          return obj.value;
      }
      var prototype = walkPrototype(left);
      if (prototype)
        return walkNative(prototype);
    }
    function assignop(s, f, p) {
      var x = infix(s, typeof f === "function" ? f : function(left, that) {
        that.left = left;
        if (left) {
          if (state.option.freeze) {
            var nativeObject = findNativePrototype(left);
            if (nativeObject)
              warning("W121", left, nativeObject);
          }
          if (predefined[left.value] === false && scope[left.value]["(global)"] === true) {
            warning("W020", left);
          } else if (left["function"]) {
            warning("W021", left, left.value);
          }
          if (funct["(blockscope)"].labeltype(left.value) === "const") {
            error("E013", left, left.value);
          }
          if (left.id === ".") {
            if (!left.left) {
              warning("E031", that);
            } else if (left.left.value === "arguments" && !state.isStrict()) {
              warning("E031", that);
            }
            state.nameStack.set(state.tokens.prev);
            that.right = expression(10);
            return that;
          } else if (left.id === "[") {
            if (state.tokens.curr.left.first) {
              state.tokens.curr.left.first.forEach(function(t) {
                if (t && funct[t.value] === "const") {
                  error("E013", t, t.value);
                }
              });
            } else if (!left.left) {
              warning("E031", that);
            } else if (left.left.value === "arguments" && !state.isStrict()) {
              warning("E031", that);
            }
            state.nameStack.set(left.right);
            that.right = expression(10);
            return that;
          } else if (left.identifier && !isReserved(left)) {
            if (funct[left.value] === "exception") {
              warning("W022", left);
            }
            state.nameStack.set(left);
            that.right = expression(10);
            return that;
          }
          if (left === state.syntax["function"]) {
            warning("W023", state.tokens.curr);
          }
        }
        error("E031", that);
      }, p);
      x.exps = true;
      x.assign = true;
      return x;
    }
    function bitwise(s, f, p) {
      var x = symbol(s, p);
      reserveName(x);
      x.led = (typeof f === "function") ? f : function(left) {
        if (state.option.bitwise) {
          warning("W016", this, this.id);
        }
        this.left = left;
        this.right = expression(p);
        return this;
      };
      return x;
    }
    function bitwiseassignop(s) {
      return assignop(s, function(left, that) {
        if (state.option.bitwise) {
          warning("W016", that, that.id);
        }
        if (left) {
          if (left.id === "." || left.id === "[" || (left.identifier && !isReserved(left))) {
            expression(10);
            return that;
          }
          if (left === state.syntax["function"]) {
            warning("W023", state.tokens.curr);
          }
          return that;
        }
        error("E031", that);
      }, 20);
    }
    function suffix(s) {
      var x = symbol(s, 150);
      x.led = function(left) {
        if (state.option.plusplus) {
          warning("W016", this, this.id);
        } else if ((!left.identifier || isReserved(left)) && left.id !== "." && left.id !== "[") {
          warning("W017", this);
        }
        if (left && left.identifier) {
          if (funct["(blockscope)"].labeltype(left.value) === "const") {
            error("E013", this, left.value);
          }
        }
        this.left = left;
        return this;
      };
      return x;
    }
    function optionalidentifier(fnparam, prop, preserve) {
      if (!state.tokens.next.identifier) {
        return;
      }
      if (!preserve) {
        advance();
      }
      var curr = state.tokens.curr;
      var val = state.tokens.curr.value;
      if (!isReserved(curr)) {
        return val;
      }
      if (prop) {
        if (state.inES5()) {
          return val;
        }
      }
      if (fnparam && val === "undefined") {
        return val;
      }
      warning("W024", state.tokens.curr, state.tokens.curr.id);
      return val;
    }
    function identifier(fnparam, prop) {
      var i = optionalidentifier(fnparam, prop, false);
      if (i) {
        return i;
      }
      if (state.tokens.next.value === "...") {
        if (!state.option.esnext) {
          warning("W119", state.tokens.next, "spread/rest operator");
        }
        advance();
        if (checkPunctuators(state.tokens.next, ["..."])) {
          warning("E024", state.tokens.next, "...");
          while (checkPunctuators(state.tokens.next, ["..."])) {
            advance();
          }
        }
        if (!state.tokens.next.identifier) {
          warning("E024", state.tokens.curr, "...");
          return;
        }
        return identifier(fnparam, prop);
      } else {
        error("E030", state.tokens.next, state.tokens.next.value);
        if (state.tokens.next.id !== ";") {
          advance();
        }
      }
    }
    function reachable(controlToken) {
      var i = 0,
          t;
      if (state.tokens.next.id !== ";" || controlToken.inBracelessBlock) {
        return;
      }
      for (; ; ) {
        do {
          t = peek(i);
          i += 1;
        } while (t.id !== "(end)" && t.id === "(comment)");
        if (t.reach) {
          return;
        }
        if (t.id !== "(endline)") {
          if (t.id === "function") {
            if (state.option.latedef === true) {
              warning("W026", t);
            }
            break;
          }
          warning("W027", t, t.value, controlToken.value);
          break;
        }
      }
    }
    function parseFinalSemicolon() {
      if (state.tokens.next.id !== ";") {
        if (state.tokens.next.isUnclosed)
          return advance();
        if (!state.option.asi) {
          if (!state.option.lastsemic || state.tokens.next.id !== "}" || startLine(state.tokens.next) !== state.tokens.curr.line) {
            warningAt("W033", state.tokens.curr.line, state.tokens.curr.character);
          }
        }
      } else {
        advance(";");
      }
    }
    function statement() {
      var i = indent,
          r,
          s = scope,
          t = state.tokens.next;
      if (t.id === ";") {
        advance(";");
        return;
      }
      var res = isReserved(t);
      if (res && t.meta && t.meta.isFutureReservedWord && peek().id === ":") {
        warning("W024", t, t.id);
        res = false;
      }
      if (t.value === "module" && t.type === "(identifier)") {
        if (peek().type === "(identifier)") {
          if (!state.inESNext()) {
            warning("W119", state.tokens.curr, "module");
          }
          advance("module");
          var name = identifier();
          addlabel(name, {
            type: "unused",
            token: state.tokens.curr
          });
          advance("from");
          advance("(string)");
          parseFinalSemicolon();
          return;
        }
      }
      if (t.identifier && !res && peek().id === ":") {
        advance();
        advance(":");
        scope = Object.create(s);
        addlabel(t.value, {type: "label"});
        if (!state.tokens.next.labelled && state.tokens.next.value !== "{") {
          warning("W028", state.tokens.next, t.value, state.tokens.next.value);
        }
        state.tokens.next.label = t.value;
        t = state.tokens.next;
      }
      if (t.id === "{") {
        var iscase = (funct["(verb)"] === "case" && state.tokens.curr.value === ":");
        block(true, true, false, false, iscase);
        return;
      }
      r = expression(0, true);
      if (r && (!r.identifier || r.value !== "function") && (r.type !== "(punctuator)")) {
        if (!state.isStrict() && state.option.globalstrict && state.option.strict) {
          warning("E007");
        }
      }
      if (!t.block) {
        if (!state.option.expr && (!r || !r.exps)) {
          warning("W030", state.tokens.curr);
        } else if (state.option.nonew && r && r.left && r.id === "(" && r.left.id === "new") {
          warning("W031", t);
        }
        parseFinalSemicolon();
      }
      indent = i;
      scope = s;
      return r;
    }
    function statements() {
      var a = [],
          p;
      while (!state.tokens.next.reach && state.tokens.next.id !== "(end)") {
        if (state.tokens.next.id === ";") {
          p = peek();
          if (!p || (p.id !== "(" && p.id !== "[")) {
            warning("W032");
          }
          advance(";");
        } else {
          a.push(statement());
        }
      }
      return a;
    }
    function directives() {
      var i,
          p,
          pn;
      while (state.tokens.next.id === "(string)") {
        p = peek(0);
        if (p.id === "(endline)") {
          i = 1;
          do {
            pn = peek(i++);
          } while (pn.id === "(endline)");
          if (pn.id === ";") {
            p = pn;
          } else if (pn.value === "[" || pn.value === ".") {
            return;
          } else if (!state.option.asi || pn.value === "(") {
            warning("W033", state.tokens.next);
          }
        } else if (p.id === "." || p.id === "[") {
          return;
        } else if (p.id !== ";") {
          warning("W033", p);
        }
        advance();
        if (state.directive[state.tokens.curr.value]) {
          warning("W034", state.tokens.curr, state.tokens.curr.value);
        }
        if (state.tokens.curr.value === "use strict") {
          if (!state.option["(explicitNewcap)"]) {
            state.option.newcap = true;
          }
          state.option.undef = true;
        }
        state.directive[state.tokens.curr.value] = true;
        if (p.id === ";") {
          advance(";");
        }
      }
    }
    function block(ordinary, stmt, isfunc, isfatarrow, iscase) {
      var a,
          b = inblock,
          old_indent = indent,
          m,
          s = scope,
          t,
          line,
          d;
      inblock = ordinary;
      if (!ordinary || !state.option.funcscope)
        scope = Object.create(scope);
      t = state.tokens.next;
      var metrics = funct["(metrics)"];
      metrics.nestedBlockDepth += 1;
      metrics.verifyMaxNestedBlockDepthPerFunction();
      if (state.tokens.next.id === "{") {
        advance("{");
        funct["(blockscope)"].stack();
        line = state.tokens.curr.line;
        if (state.tokens.next.id !== "}") {
          indent += state.option.indent;
          while (!ordinary && state.tokens.next.from > indent) {
            indent += state.option.indent;
          }
          if (isfunc) {
            m = {};
            for (d in state.directive) {
              if (_.has(state.directive, d)) {
                m[d] = state.directive[d];
              }
            }
            directives();
            if (state.option.strict && funct["(context)"]["(global)"]) {
              if (!m["use strict"] && !state.isStrict()) {
                warning("E007");
              }
            }
          }
          a = statements();
          metrics.statementCount += a.length;
          if (isfunc) {
            state.directive = m;
          }
          indent -= state.option.indent;
        }
        advance("}", t);
        funct["(blockscope)"].unstack();
        indent = old_indent;
      } else if (!ordinary) {
        if (isfunc) {
          m = {};
          if (stmt && !isfatarrow && !state.inMoz()) {
            error("W118", state.tokens.curr, "function closure expressions");
          }
          if (!stmt) {
            for (d in state.directive) {
              if (_.has(state.directive, d)) {
                m[d] = state.directive[d];
              }
            }
          }
          expression(10);
          if (state.option.strict && funct["(context)"]["(global)"]) {
            if (!m["use strict"] && !state.isStrict()) {
              warning("E007");
            }
          }
        } else {
          error("E021", state.tokens.next, "{", state.tokens.next.value);
        }
      } else {
        funct["(noblockscopedvar)"] = true;
        if (!stmt || state.option.curly) {
          warning("W116", state.tokens.next, "{", state.tokens.next.value);
        }
        state.tokens.next.inBracelessBlock = true;
        indent += state.option.indent;
        a = [statement()];
        indent -= state.option.indent;
        delete funct["(noblockscopedvar)"];
      }
      switch (funct["(verb)"]) {
        case "break":
        case "continue":
        case "return":
        case "throw":
          if (iscase) {
            break;
          }
        default:
          funct["(verb)"] = null;
      }
      if (!ordinary || !state.option.funcscope)
        scope = s;
      inblock = b;
      if (ordinary && state.option.noempty && (!a || a.length === 0)) {
        warning("W035", state.tokens.prev);
      }
      metrics.nestedBlockDepth -= 1;
      return a;
    }
    function countMember(m) {
      if (membersOnly && typeof membersOnly[m] !== "boolean") {
        warning("W036", state.tokens.curr, m);
      }
      if (typeof member[m] === "number") {
        member[m] += 1;
      } else {
        member[m] = 1;
      }
    }
    function note_implied(tkn) {
      var name = tkn.value;
      var desc = Object.getOwnPropertyDescriptor(implied, name);
      if (!desc)
        implied[name] = [tkn.line];
      else
        desc.value.push(tkn.line);
    }
    type("(number)", function() {
      return this;
    });
    type("(string)", function() {
      return this;
    });
    state.syntax["(identifier)"] = {
      type: "(identifier)",
      lbp: 0,
      identifier: true,
      nud: function() {
        var v = this.value;
        var s = scope[v];
        var f;
        var block;
        if (state.tokens.next.id === "=>") {
          return this;
        }
        block = funct["(blockscope)"].getlabel(v);
        if (typeof s === "function") {
          s = undefined;
        } else if (!block && typeof s === "boolean") {
          f = funct;
          funct = functions[0];
          addlabel(v, {type: "var"});
          s = funct;
          funct = f;
        }
        if (funct === s || block) {
          switch (block ? block[v]["(type)"] : funct[v]) {
            case "unused":
              if (block)
                block[v]["(type)"] = "var";
              else
                funct[v] = "var";
              break;
            case "unction":
              if (block)
                block[v]["(type)"] = "function";
              else
                funct[v] = "function";
              this["function"] = true;
              break;
            case "const":
              block[v]["(unused)"] = false;
              break;
            case "function":
              this["function"] = true;
              break;
            case "label":
              warning("W037", state.tokens.curr, v);
              break;
          }
        } else {
          switch (funct[v]) {
            case "closure":
            case "function":
            case "var":
            case "unused":
              warning("W038", state.tokens.curr, v);
              break;
            case "label":
              warning("W037", state.tokens.curr, v);
              break;
            case "outer":
            case "global":
              break;
            default:
              if (s === true) {
                funct[v] = true;
              } else if (s === null) {
                warning("W039", state.tokens.curr, v);
                note_implied(state.tokens.curr);
              } else if (typeof s !== "object") {
                if (!funct["(comparray)"].check(v)) {
                  isundef(funct, "W117", state.tokens.curr, v);
                }
                if (!funct["(global)"]) {
                  funct[v] = true;
                }
                note_implied(state.tokens.curr);
              } else {
                switch (s[v]) {
                  case "function":
                  case "unction":
                    this["function"] = true;
                    s[v] = "closure";
                    funct[v] = s["(global)"] ? "global" : "outer";
                    break;
                  case "var":
                  case "unused":
                    s[v] = "closure";
                    funct[v] = s["(global)"] ? "global" : "outer";
                    break;
                  case "closure":
                    funct[v] = s["(global)"] ? "global" : "outer";
                    break;
                  case "label":
                    warning("W037", state.tokens.curr, v);
                }
              }
          }
        }
        return this;
      },
      led: function() {
        error("E033", state.tokens.next, state.tokens.next.value);
      }
    };
    var baseTemplateSyntax = {
      lbp: 0,
      identifier: false,
      template: true
    };
    state.syntax["(template)"] = _.extend({
      type: "(template)",
      nud: doTemplateLiteral,
      led: doTemplateLiteral,
      noSubst: false
    }, baseTemplateSyntax);
    state.syntax["(template middle)"] = _.extend({
      type: "(template middle)",
      middle: true,
      noSubst: false
    }, baseTemplateSyntax);
    state.syntax["(template tail)"] = _.extend({
      type: "(template tail)",
      tail: true,
      noSubst: false
    }, baseTemplateSyntax);
    state.syntax["(no subst template)"] = _.extend({
      type: "(template)",
      nud: doTemplateLiteral,
      led: doTemplateLiteral,
      noSubst: true,
      tail: true
    }, baseTemplateSyntax);
    type("(regexp)", function() {
      return this;
    });
    delim("(endline)");
    delim("(begin)");
    delim("(end)").reach = true;
    delim("(error)").reach = true;
    delim("}").reach = true;
    delim(")");
    delim("]");
    delim("\"").reach = true;
    delim("'").reach = true;
    delim(";");
    delim(":").reach = true;
    delim("#");
    reserve("else");
    reserve("case").reach = true;
    reserve("catch");
    reserve("default").reach = true;
    reserve("finally");
    reservevar("arguments", function(x) {
      if (state.isStrict() && funct["(global)"]) {
        warning("E008", x);
      }
    });
    reservevar("eval");
    reservevar("false");
    reservevar("Infinity");
    reservevar("null");
    reservevar("this", function(x) {
      if (state.isStrict() && !isMethod() && !state.option.validthis && ((funct["(statement)"] && funct["(name)"].charAt(0) > "Z") || funct["(global)"])) {
        warning("W040", x);
      }
    });
    reservevar("true");
    reservevar("undefined");
    assignop("=", "assign", 20);
    assignop("+=", "assignadd", 20);
    assignop("-=", "assignsub", 20);
    assignop("*=", "assignmult", 20);
    assignop("/=", "assigndiv", 20).nud = function() {
      error("E014");
    };
    assignop("%=", "assignmod", 20);
    bitwiseassignop("&=");
    bitwiseassignop("|=");
    bitwiseassignop("^=");
    bitwiseassignop("<<=");
    bitwiseassignop(">>=");
    bitwiseassignop(">>>=");
    infix(",", function(left, that) {
      var expr;
      that.exprs = [left];
      if (state.option.nocomma) {
        warning("W127");
      }
      if (!comma({peek: true})) {
        return that;
      }
      while (true) {
        if (!(expr = expression(10))) {
          break;
        }
        that.exprs.push(expr);
        if (state.tokens.next.value !== "," || !comma()) {
          break;
        }
      }
      return that;
    }, 10, true);
    infix("?", function(left, that) {
      increaseComplexityCount();
      that.left = left;
      that.right = expression(10);
      advance(":");
      that["else"] = expression(10);
      return that;
    }, 30);
    var orPrecendence = 40;
    infix("||", function(left, that) {
      increaseComplexityCount();
      that.left = left;
      that.right = expression(orPrecendence);
      return that;
    }, orPrecendence);
    infix("&&", "and", 50);
    bitwise("|", "bitor", 70);
    bitwise("^", "bitxor", 80);
    bitwise("&", "bitand", 90);
    relation("==", function(left, right) {
      var eqnull = state.option.eqnull && (left.value === "null" || right.value === "null");
      switch (true) {
        case !eqnull && state.option.eqeqeq:
          this.from = this.character;
          warning("W116", this, "===", "==");
          break;
        case isPoorRelation(left):
          warning("W041", this, "===", left.value);
          break;
        case isPoorRelation(right):
          warning("W041", this, "===", right.value);
          break;
        case isTypoTypeof(right, left, state):
          warning("W122", this, right.value);
          break;
        case isTypoTypeof(left, right, state):
          warning("W122", this, left.value);
          break;
      }
      return this;
    });
    relation("===", function(left, right) {
      if (isTypoTypeof(right, left, state)) {
        warning("W122", this, right.value);
      } else if (isTypoTypeof(left, right, state)) {
        warning("W122", this, left.value);
      }
      return this;
    });
    relation("!=", function(left, right) {
      var eqnull = state.option.eqnull && (left.value === "null" || right.value === "null");
      if (!eqnull && state.option.eqeqeq) {
        this.from = this.character;
        warning("W116", this, "!==", "!=");
      } else if (isPoorRelation(left)) {
        warning("W041", this, "!==", left.value);
      } else if (isPoorRelation(right)) {
        warning("W041", this, "!==", right.value);
      } else if (isTypoTypeof(right, left, state)) {
        warning("W122", this, right.value);
      } else if (isTypoTypeof(left, right, state)) {
        warning("W122", this, left.value);
      }
      return this;
    });
    relation("!==", function(left, right) {
      if (isTypoTypeof(right, left, state)) {
        warning("W122", this, right.value);
      } else if (isTypoTypeof(left, right, state)) {
        warning("W122", this, left.value);
      }
      return this;
    });
    relation("<");
    relation(">");
    relation("<=");
    relation(">=");
    bitwise("<<", "shiftleft", 120);
    bitwise(">>", "shiftright", 120);
    bitwise(">>>", "shiftrightunsigned", 120);
    infix("in", "in", 120);
    infix("instanceof", "instanceof", 120);
    infix("+", function(left, that) {
      var right;
      that.left = left;
      that.right = right = expression(130);
      if (left && right && left.id === "(string)" && right.id === "(string)") {
        left.value += right.value;
        left.character = right.character;
        if (!state.option.scripturl && reg.javascriptURL.test(left.value)) {
          warning("W050", left);
        }
        return left;
      }
      return that;
    }, 130);
    prefix("+", "num");
    prefix("+++", function() {
      warning("W007");
      this.arity = "unary";
      this.right = expression(150);
      return this;
    });
    infix("+++", function(left) {
      warning("W007");
      this.left = left;
      this.right = expression(130);
      return this;
    }, 130);
    infix("-", "sub", 130);
    prefix("-", "neg");
    prefix("---", function() {
      warning("W006");
      this.arity = "unary";
      this.right = expression(150);
      return this;
    });
    infix("---", function(left) {
      warning("W006");
      this.left = left;
      this.right = expression(130);
      return this;
    }, 130);
    infix("*", "mult", 140);
    infix("/", "div", 140);
    infix("%", "mod", 140);
    suffix("++");
    prefix("++", "preinc");
    state.syntax["++"].exps = true;
    suffix("--");
    prefix("--", "predec");
    state.syntax["--"].exps = true;
    prefix("delete", function() {
      var p = expression(10);
      if (!p) {
        return this;
      }
      if (p.id !== "." && p.id !== "[") {
        warning("W051");
      }
      this.first = p;
      if (p.identifier && !state.isStrict()) {
        p.forgiveUndef = true;
      }
      return this;
    }).exps = true;
    prefix("~", function() {
      if (state.option.bitwise) {
        warning("W016", this, "~");
      }
      this.arity = "unary";
      expression(150);
      return this;
    });
    prefix("...", function() {
      if (!state.option.esnext) {
        warning("W119", this, "spread/rest operator");
      }
      if (!state.tokens.next.identifier && state.tokens.next.type !== "(string)" && !checkPunctuators(state.tokens.next, ["[", "("])) {
        error("E030", state.tokens.next, state.tokens.next.value);
      }
      expression(150);
      return this;
    });
    prefix("!", function() {
      this.arity = "unary";
      this.right = expression(150);
      if (!this.right) {
        quit("E041", this.line || 0);
      }
      if (bang[this.right.id] === true) {
        warning("W018", this, "!");
      }
      return this;
    });
    prefix("typeof", (function() {
      var p = expression(150);
      this.first = p;
      if (p.identifier) {
        p.forgiveUndef = true;
      }
      return this;
    }));
    prefix("new", function() {
      var c = expression(155),
          i;
      if (c && c.id !== "function") {
        if (c.identifier) {
          c["new"] = true;
          switch (c.value) {
            case "Number":
            case "String":
            case "Boolean":
            case "Math":
            case "JSON":
              warning("W053", state.tokens.prev, c.value);
              break;
            case "Symbol":
              if (state.option.esnext) {
                warning("W053", state.tokens.prev, c.value);
              }
              break;
            case "Function":
              if (!state.option.evil) {
                warning("W054");
              }
              break;
            case "Date":
            case "RegExp":
            case "this":
              break;
            default:
              if (c.id !== "function") {
                i = c.value.substr(0, 1);
                if (state.option.newcap && (i < "A" || i > "Z") && !_.has(global, c.value)) {
                  warning("W055", state.tokens.curr);
                }
              }
          }
        } else {
          if (c.id !== "." && c.id !== "[" && c.id !== "(") {
            warning("W056", state.tokens.curr);
          }
        }
      } else {
        if (!state.option.supernew)
          warning("W057", this);
      }
      if (state.tokens.next.id !== "(" && !state.option.supernew) {
        warning("W058", state.tokens.curr, state.tokens.curr.value);
      }
      this.first = c;
      return this;
    });
    state.syntax["new"].exps = true;
    prefix("void").exps = true;
    infix(".", function(left, that) {
      var m = identifier(false, true);
      if (typeof m === "string") {
        countMember(m);
      }
      that.left = left;
      that.right = m;
      if (m && m === "hasOwnProperty" && state.tokens.next.value === "=") {
        warning("W001");
      }
      if (left && left.value === "arguments" && (m === "callee" || m === "caller")) {
        if (state.option.noarg)
          warning("W059", left, m);
        else if (state.isStrict())
          error("E008");
      } else if (!state.option.evil && left && left.value === "document" && (m === "write" || m === "writeln")) {
        warning("W060", left);
      }
      if (!state.option.evil && (m === "eval" || m === "execScript")) {
        if (isGlobalEval(left, state, funct)) {
          warning("W061");
        }
      }
      return that;
    }, 160, true);
    infix("(", function(left, that) {
      if (state.option.immed && left && !left.immed && left.id === "function") {
        warning("W062");
      }
      var n = 0;
      var p = [];
      if (left) {
        if (left.type === "(identifier)") {
          if (left.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)) {
            if ("Number String Boolean Date Object Error Symbol".indexOf(left.value) === -1) {
              if (left.value === "Math") {
                warning("W063", left);
              } else if (state.option.newcap) {
                warning("W064", left);
              }
            }
          }
        }
      }
      if (state.tokens.next.id !== ")") {
        for (; ; ) {
          p[p.length] = expression(10);
          n += 1;
          if (state.tokens.next.id !== ",") {
            break;
          }
          comma();
        }
      }
      advance(")");
      if (typeof left === "object") {
        if (state.inES3() && left.value === "parseInt" && n === 1) {
          warning("W065", state.tokens.curr);
        }
        if (!state.option.evil) {
          if (left.value === "eval" || left.value === "Function" || left.value === "execScript") {
            warning("W061", left);
            if (p[0] && [0].id === "(string)") {
              addInternalSrc(left, p[0].value);
            }
          } else if (p[0] && p[0].id === "(string)" && (left.value === "setTimeout" || left.value === "setInterval")) {
            warning("W066", left);
            addInternalSrc(left, p[0].value);
          } else if (p[0] && p[0].id === "(string)" && left.value === "." && left.left.value === "window" && (left.right === "setTimeout" || left.right === "setInterval")) {
            warning("W066", left);
            addInternalSrc(left, p[0].value);
          }
        }
        if (!left.identifier && left.id !== "." && left.id !== "[" && left.id !== "(" && left.id !== "&&" && left.id !== "||" && left.id !== "?" && !(state.option.esnext && left["(name)"])) {
          warning("W067", that);
        }
      }
      that.left = left;
      return that;
    }, 155, true).exps = true;
    prefix("(", function() {
      var pn = state.tokens.next,
          pn1,
          i = -1;
      var ret,
          triggerFnExpr,
          first,
          last;
      var parens = 1;
      var opening = state.tokens.curr;
      var preceeding = state.tokens.prev;
      var isNecessary = !state.option.singleGroups;
      do {
        if (pn.value === "(") {
          parens += 1;
        } else if (pn.value === ")") {
          parens -= 1;
        }
        i += 1;
        pn1 = pn;
        pn = peek(i);
      } while (!(parens === 0 && pn1.value === ")") && pn.value !== ";" && pn.type !== "(end)");
      if (state.tokens.next.id === "function") {
        triggerFnExpr = state.tokens.next.immed = true;
      }
      if (pn.value === "=>") {
        return doFunction({
          type: "arrow",
          parsedOpening: true
        });
      }
      var exprs = [];
      if (state.tokens.next.id !== ")") {
        for (; ; ) {
          exprs.push(expression(10));
          if (state.tokens.next.id !== ",") {
            break;
          }
          if (state.option.nocomma) {
            warning("W127");
          }
          comma();
        }
      }
      advance(")", this);
      if (state.option.immed && exprs[0] && exprs[0].id === "function") {
        if (state.tokens.next.id !== "(" && state.tokens.next.id !== "." && state.tokens.next.id !== "[") {
          warning("W068", this);
        }
      }
      if (!exprs.length) {
        return;
      }
      if (exprs.length > 1) {
        ret = Object.create(state.syntax[","]);
        ret.exprs = exprs;
        first = exprs[0];
        last = exprs[exprs.length - 1];
        if (!isNecessary) {
          isNecessary = preceeding.assign || preceeding.delim;
        }
      } else {
        ret = first = last = exprs[0];
        if (!isNecessary) {
          isNecessary = (opening.beginsStmt && (ret.id === "{" || triggerFnExpr || isFunctor(ret))) || (triggerFnExpr && (!isEndOfExpr() || state.tokens.prev.id !== "}")) || (isFunctor(ret) && !isEndOfExpr()) || (ret.id === "{" && preceeding.id === "=>");
        }
      }
      if (ret) {
        if (!isNecessary && (first.left || ret.exprs)) {
          isNecessary = (!isBeginOfExpr(preceeding) && first.lbp <= preceeding.lbp) || (!isEndOfExpr() && last.lbp < state.tokens.next.lbp);
        }
        if (!isNecessary) {
          warning("W126", opening);
        }
        ret.paren = true;
      }
      return ret;
    });
    application("=>");
    infix("[", function(left, that) {
      var e = expression(10),
          s;
      if (e && e.type === "(string)") {
        if (!state.option.evil && (e.value === "eval" || e.value === "execScript")) {
          if (isGlobalEval(left, state, funct)) {
            warning("W061");
          }
        }
        countMember(e.value);
        if (!state.option.sub && reg.identifier.test(e.value)) {
          s = state.syntax[e.value];
          if (!s || !isReserved(s)) {
            warning("W069", state.tokens.prev, e.value);
          }
        }
      }
      advance("]", that);
      if (e && e.value === "hasOwnProperty" && state.tokens.next.value === "=") {
        warning("W001");
      }
      that.left = left;
      that.right = e;
      return that;
    }, 160, true);
    function comprehensiveArrayExpression() {
      var res = {};
      res.exps = true;
      funct["(comparray)"].stack();
      var reversed = false;
      if (state.tokens.next.value !== "for") {
        reversed = true;
        if (!state.inMoz()) {
          warning("W116", state.tokens.next, "for", state.tokens.next.value);
        }
        funct["(comparray)"].setState("use");
        res.right = expression(10);
      }
      advance("for");
      if (state.tokens.next.value === "each") {
        advance("each");
        if (!state.inMoz()) {
          warning("W118", state.tokens.curr, "for each");
        }
      }
      advance("(");
      funct["(comparray)"].setState("define");
      res.left = expression(130);
      if (_.contains(["in", "of"], state.tokens.next.value)) {
        advance();
      } else {
        error("E045", state.tokens.curr);
      }
      funct["(comparray)"].setState("generate");
      expression(10);
      advance(")");
      if (state.tokens.next.value === "if") {
        advance("if");
        advance("(");
        funct["(comparray)"].setState("filter");
        res.filter = expression(10);
        advance(")");
      }
      if (!reversed) {
        funct["(comparray)"].setState("use");
        res.right = expression(10);
      }
      advance("]");
      funct["(comparray)"].unstack();
      return res;
    }
    prefix("[", function() {
      var blocktype = lookupBlockType();
      if (blocktype.isCompArray) {
        if (!state.inESNext()) {
          warning("W119", state.tokens.curr, "array comprehension");
        }
        return comprehensiveArrayExpression();
      } else if (blocktype.isDestAssign && !state.inESNext()) {
        warning("W104", state.tokens.curr, "destructuring assignment");
      }
      var b = state.tokens.curr.line !== startLine(state.tokens.next);
      this.first = [];
      if (b) {
        indent += state.option.indent;
        if (state.tokens.next.from === indent + state.option.indent) {
          indent += state.option.indent;
        }
      }
      while (state.tokens.next.id !== "(end)") {
        while (state.tokens.next.id === ",") {
          if (!state.option.elision) {
            if (!state.inES5()) {
              warning("W070");
            } else {
              warning("W128");
              do {
                advance(",");
              } while (state.tokens.next.id === ",");
              continue;
            }
          }
          advance(",");
        }
        if (state.tokens.next.id === "]") {
          break;
        }
        this.first.push(expression(10));
        if (state.tokens.next.id === ",") {
          comma({allowTrailing: true});
          if (state.tokens.next.id === "]" && !state.inES5(true)) {
            warning("W070", state.tokens.curr);
            break;
          }
        } else {
          break;
        }
      }
      if (b) {
        indent -= state.option.indent;
      }
      advance("]", this);
      return this;
    });
    function isMethod() {
      return funct["(statement)"] && funct["(statement)"].type === "class" || funct["(context)"] && funct["(context)"]["(verb)"] === "class";
    }
    function isPropertyName(token) {
      return token.identifier || token.id === "(string)" || token.id === "(number)";
    }
    function propertyName(preserveOrToken) {
      var id;
      var preserve = true;
      if (typeof preserveOrToken === "object") {
        id = preserveOrToken;
      } else {
        preserve = preserveOrToken;
        id = optionalidentifier(false, true, preserve);
      }
      if (!id) {
        if (state.tokens.next.id === "(string)") {
          id = state.tokens.next.value;
          if (!preserve) {
            advance();
          }
        } else if (state.tokens.next.id === "(number)") {
          id = state.tokens.next.value.toString();
          if (!preserve) {
            advance();
          }
        }
      } else if (typeof id === "object") {
        if (id.id === "(string)" || id.id === "(identifier)")
          id = id.value;
        else if (id.id === "(number)")
          id = id.value.toString();
      }
      if (id === "hasOwnProperty") {
        warning("W001");
      }
      return id;
    }
    function functionparams(options) {
      var next;
      var params = [];
      var ident;
      var tokens = [];
      var t;
      var pastDefault = false;
      var pastRest = false;
      var loneArg = options && options.loneArg;
      if (loneArg && loneArg.identifier === true) {
        addlabel(loneArg.value, {
          type: "unused",
          token: loneArg
        });
        return [loneArg.value];
      }
      next = state.tokens.next;
      if (!options || !options.parsedOpening) {
        advance("(");
      }
      if (state.tokens.next.id === ")") {
        advance(")");
        return;
      }
      for (; ; ) {
        if (_.contains(["{", "["], state.tokens.next.id)) {
          tokens = destructuringExpression();
          for (t in tokens) {
            t = tokens[t];
            if (t.id) {
              params.push(t.id);
              addlabel(t.id, {
                type: "unused",
                token: t.token
              });
            }
          }
        } else {
          if (checkPunctuators(state.tokens.next, ["..."]))
            pastRest = true;
          ident = identifier(true);
          if (ident) {
            params.push(ident);
            addlabel(ident, {
              type: "unused",
              token: state.tokens.curr
            });
          } else {
            while (!checkPunctuators(state.tokens.next, [",", ")"]))
              advance();
          }
        }
        if (pastDefault) {
          if (state.tokens.next.id !== "=") {
            error("E051", state.tokens.current);
          }
        }
        if (state.tokens.next.id === "=") {
          if (!state.inESNext()) {
            warning("W119", state.tokens.next, "default parameters");
          }
          advance("=");
          pastDefault = true;
          expression(10);
        }
        if (state.tokens.next.id === ",") {
          if (pastRest) {
            warning("W131", state.tokens.next);
          }
          comma();
        } else {
          advance(")", next);
          return params;
        }
      }
    }
    function functor(name, token, scope, overwrites) {
      var funct = {
        "(name)": name,
        "(breakage)": 0,
        "(loopage)": 0,
        "(scope)": scope,
        "(tokens)": {},
        "(properties)": {},
        "(catch)": false,
        "(global)": false,
        "(line)": null,
        "(character)": null,
        "(metrics)": null,
        "(statement)": null,
        "(context)": null,
        "(blockscope)": null,
        "(comparray)": null,
        "(generator)": null,
        "(params)": null
      };
      if (token) {
        _.extend(funct, {
          "(line)": token.line,
          "(character)": token.character,
          "(metrics)": createMetrics(token)
        });
      }
      _.extend(funct, overwrites);
      if (funct["(context)"]) {
        funct["(blockscope)"] = funct["(context)"]["(blockscope)"];
        funct["(comparray)"] = funct["(context)"]["(comparray)"];
      }
      return funct;
    }
    function isFunctor(token) {
      return "(scope)" in token;
    }
    function hasParsedCode(funct) {
      return funct["(global)"] && !funct["(verb)"];
    }
    function doTemplateLiteral(left) {
      var ctx = this.context;
      var noSubst = this.noSubst;
      var depth = this.depth;
      if (!noSubst) {
        while (!end()) {
          if (!state.tokens.next.template || state.tokens.next.depth > depth) {
            expression(0);
          } else {
            advance();
          }
        }
      }
      return {
        id: "(template)",
        type: "(template)",
        tag: left
      };
      function end() {
        if (state.tokens.curr.template && state.tokens.curr.tail && state.tokens.curr.context === ctx)
          return true;
        var complete = (state.tokens.next.template && state.tokens.next.tail && state.tokens.next.context === ctx);
        if (complete)
          advance();
        return complete || state.tokens.next.isUnclosed;
      }
    }
    function doFunction(options) {
      var f,
          name,
          statement,
          classExprBinding,
          isGenerator,
          isArrow;
      var oldOption = state.option;
      var oldIgnored = state.ignored;
      var oldScope = scope;
      if (options) {
        name = options.name;
        statement = options.statement;
        classExprBinding = options.classExprBinding;
        isGenerator = options.type === "generator";
        isArrow = options.type === "arrow";
      }
      state.option = Object.create(state.option);
      state.ignored = Object.create(state.ignored);
      scope = Object.create(scope);
      funct = functor(name || state.nameStack.infer(), state.tokens.next, scope, {
        "(statement)": statement,
        "(context)": funct,
        "(generator)": isGenerator
      });
      f = funct;
      state.tokens.curr.funct = funct;
      functions.push(funct);
      if (name) {
        addlabel(name, {type: "function"});
      }
      if (classExprBinding) {
        addlabel(classExprBinding, {type: "function"});
      }
      funct["(params)"] = functionparams(options);
      funct["(metrics)"].verifyMaxParametersPerFunction(funct["(params)"]);
      if (isArrow) {
        if (!state.option.esnext) {
          warning("W119", state.tokens.curr, "arrow function syntax (=>)");
        }
        if (!options.loneArg) {
          advance("=>");
        }
      }
      block(false, true, true, isArrow);
      if (!state.option.noyield && isGenerator && funct["(generator)"] !== "yielded") {
        warning("W124", state.tokens.curr);
      }
      funct["(metrics)"].verifyMaxStatementsPerFunction();
      funct["(metrics)"].verifyMaxComplexityPerFunction();
      funct["(unusedOption)"] = state.option.unused;
      scope = oldScope;
      state.option = oldOption;
      state.ignored = oldIgnored;
      funct["(last)"] = state.tokens.curr.line;
      funct["(lastcharacter)"] = state.tokens.curr.character;
      _.map(Object.keys(funct), function(key) {
        if (key[0] === "(")
          return;
        funct["(blockscope)"].unshadow(key);
      });
      funct = funct["(context)"];
      return f;
    }
    function createMetrics(functionStartToken) {
      return {
        statementCount: 0,
        nestedBlockDepth: -1,
        ComplexityCount: 1,
        verifyMaxStatementsPerFunction: function() {
          if (state.option.maxstatements && this.statementCount > state.option.maxstatements) {
            warning("W071", functionStartToken, this.statementCount);
          }
        },
        verifyMaxParametersPerFunction: function(params) {
          params = params || [];
          if (_.isNumber(state.option.maxparams) && params.length > state.option.maxparams) {
            warning("W072", functionStartToken, params.length);
          }
        },
        verifyMaxNestedBlockDepthPerFunction: function() {
          if (state.option.maxdepth && this.nestedBlockDepth > 0 && this.nestedBlockDepth === state.option.maxdepth + 1) {
            warning("W073", null, this.nestedBlockDepth);
          }
        },
        verifyMaxComplexityPerFunction: function() {
          var max = state.option.maxcomplexity;
          var cc = this.ComplexityCount;
          if (max && cc > max) {
            warning("W074", functionStartToken, cc);
          }
        }
      };
    }
    function increaseComplexityCount() {
      funct["(metrics)"].ComplexityCount += 1;
    }
    function checkCondAssignment(expr) {
      var id,
          paren;
      if (expr) {
        id = expr.id;
        paren = expr.paren;
        if (id === "," && (expr = expr.exprs[expr.exprs.length - 1])) {
          id = expr.id;
          paren = paren || expr.paren;
        }
      }
      switch (id) {
        case "=":
        case "+=":
        case "-=":
        case "*=":
        case "%=":
        case "&=":
        case "|=":
        case "^=":
        case "/=":
          if (!paren && !state.option.boss) {
            warning("W084");
          }
      }
    }
    function checkProperties(props) {
      if (state.inES5()) {
        for (var name in props) {
          if (_.has(props, name) && props[name].setterToken && !props[name].getterToken) {
            warning("W078", props[name].setterToken);
          }
        }
      }
    }
    (function(x) {
      x.nud = function() {
        var b,
            f,
            i,
            p,
            t,
            isGeneratorMethod = false,
            nextVal;
        var props = {};
        b = state.tokens.curr.line !== startLine(state.tokens.next);
        if (b) {
          indent += state.option.indent;
          if (state.tokens.next.from === indent + state.option.indent) {
            indent += state.option.indent;
          }
        }
        for (; ; ) {
          if (state.tokens.next.id === "}") {
            break;
          }
          nextVal = state.tokens.next.value;
          if (state.tokens.next.identifier && (peekIgnoreEOL().id === "," || peekIgnoreEOL().id === "}")) {
            if (!state.inESNext()) {
              warning("W104", state.tokens.next, "object short notation");
            }
            i = propertyName(true);
            saveProperty(props, i, state.tokens.next);
            expression(10);
          } else if (peek().id !== ":" && (nextVal === "get" || nextVal === "set")) {
            advance(nextVal);
            if (!state.inES5()) {
              error("E034");
            }
            i = propertyName();
            if (!i && !state.inESNext()) {
              error("E035");
            }
            if (i) {
              saveAccessor(nextVal, props, i, state.tokens.curr);
            }
            t = state.tokens.next;
            f = doFunction();
            p = f["(params)"];
            if (nextVal === "get" && i && p) {
              warning("W076", t, p[0], i);
            } else if (nextVal === "set" && i && (!p || p.length !== 1)) {
              warning("W077", t, i);
            }
          } else {
            if (state.tokens.next.value === "*" && state.tokens.next.type === "(punctuator)") {
              if (!state.inESNext()) {
                warning("W104", state.tokens.next, "generator functions");
              }
              advance("*");
              isGeneratorMethod = true;
            } else {
              isGeneratorMethod = false;
            }
            if (state.tokens.next.id === "[") {
              i = computedPropertyName();
              state.nameStack.set(i);
            } else {
              state.nameStack.set(state.tokens.next);
              i = propertyName();
              saveProperty(props, i, state.tokens.next);
              if (typeof i !== "string") {
                break;
              }
            }
            if (state.tokens.next.value === "(") {
              if (!state.inESNext()) {
                warning("W104", state.tokens.curr, "concise methods");
              }
              doFunction({type: isGeneratorMethod ? "generator" : null});
            } else {
              advance(":");
              expression(10);
            }
          }
          countMember(i);
          if (state.tokens.next.id === ",") {
            comma({
              allowTrailing: true,
              property: true
            });
            if (state.tokens.next.id === ",") {
              warning("W070", state.tokens.curr);
            } else if (state.tokens.next.id === "}" && !state.inES5(true)) {
              warning("W070", state.tokens.curr);
            }
          } else {
            break;
          }
        }
        if (b) {
          indent -= state.option.indent;
        }
        advance("}", this);
        checkProperties(props);
        return this;
      };
      x.fud = function() {
        error("E036", state.tokens.curr);
      };
    }(delim("{")));
    function destructuringExpression() {
      var id,
          ids;
      var identifiers = [];
      if (!state.inESNext()) {
        warning("W104", state.tokens.curr, "destructuring expression");
      }
      var nextInnerDE = function() {
        var ident;
        if (checkPunctuators(state.tokens.next, ["[", "{"])) {
          ids = destructuringExpression();
          for (var id in ids) {
            id = ids[id];
            identifiers.push({
              id: id.id,
              token: id.token
            });
          }
        } else if (checkPunctuators(state.tokens.next, [","])) {
          identifiers.push({
            id: null,
            token: state.tokens.curr
          });
        } else if (checkPunctuators(state.tokens.next, ["("])) {
          advance("(");
          nextInnerDE();
          advance(")");
        } else {
          var is_rest = checkPunctuators(state.tokens.next, ["..."]);
          ident = identifier();
          if (ident)
            identifiers.push({
              id: ident,
              token: state.tokens.curr
            });
          return is_rest;
        }
        return false;
      };
      if (checkPunctuators(state.tokens.next, ["["])) {
        advance("[");
        var element_after_rest = false;
        if (nextInnerDE() && checkPunctuators(state.tokens.next, [","]) && !element_after_rest) {
          warning("W130", state.tokens.next);
          element_after_rest = true;
        }
        while (!checkPunctuators(state.tokens.next, ["]"])) {
          advance(",");
          if (checkPunctuators(state.tokens.next, ["]"])) {
            break;
          }
          if (nextInnerDE() && checkPunctuators(state.tokens.next, [","]) && !element_after_rest) {
            warning("W130", state.tokens.next);
            element_after_rest = true;
          }
        }
        advance("]");
      } else if (checkPunctuators(state.tokens.next, ["{"])) {
        advance("{");
        id = identifier();
        if (checkPunctuators(state.tokens.next, [":"])) {
          advance(":");
          nextInnerDE();
        } else {
          identifiers.push({
            id: id,
            token: state.tokens.curr
          });
        }
        while (!checkPunctuators(state.tokens.next, ["}"])) {
          advance(",");
          if (checkPunctuators(state.tokens.next, ["}"])) {
            break;
          }
          id = identifier();
          if (checkPunctuators(state.tokens.next, [":"])) {
            advance(":");
            nextInnerDE();
          } else {
            identifiers.push({
              id: id,
              token: state.tokens.curr
            });
          }
        }
        advance("}");
      }
      return identifiers;
    }
    function destructuringExpressionMatch(tokens, value) {
      var first = value.first;
      if (!first)
        return;
      _.zip(tokens, Array.isArray(first) ? first : [first]).forEach(function(val) {
        var token = val[0];
        var value = val[1];
        if (token && value)
          token.first = value;
        else if (token && token.first && !value)
          warning("W080", token.first, token.first.value);
      });
    }
    function blockVariableStatement(type, statement, context) {
      var prefix = context && context.prefix;
      var inexport = context && context.inexport;
      var isLet = type === "let";
      var isConst = type === "const";
      var tokens,
          lone,
          value,
          letblock;
      if (!state.inESNext()) {
        warning("W104", state.tokens.curr, type);
      }
      if (isLet && state.tokens.next.value === "(") {
        if (!state.inMoz()) {
          warning("W118", state.tokens.next, "let block");
        }
        advance("(");
        funct["(blockscope)"].stack();
        letblock = true;
      } else if (funct["(noblockscopedvar)"]) {
        error("E048", state.tokens.curr, isConst ? "Const" : "Let");
      }
      statement.first = [];
      for (; ; ) {
        var names = [];
        if (_.contains(["{", "["], state.tokens.next.value)) {
          tokens = destructuringExpression();
          lone = false;
        } else {
          tokens = [{
            id: identifier(),
            token: state.tokens.curr
          }];
          lone = true;
          if (inexport) {
            exported[state.tokens.curr.value] = true;
            state.tokens.curr.exported = true;
          }
        }
        for (var t in tokens) {
          if (tokens.hasOwnProperty(t)) {
            t = tokens[t];
            if (state.inESNext()) {
              if (funct["(blockscope)"].current.labeltype(t.id) === "const") {
                warning("E011", null, t.id);
              }
            }
            if (funct["(global)"]) {
              if (predefined[t.id] === false) {
                warning("W079", t.token, t.id);
              }
            }
            if (t.id && !funct["(noblockscopedvar)"]) {
              addlabel(t.id, {
                type: isConst ? "const" : "unused",
                token: t.token,
                isblockscoped: true
              });
              names.push(t.token);
            }
          }
        }
        statement.first = statement.first.concat(names);
        if (!prefix && isConst && state.tokens.next.id !== "=") {
          warning("E012", state.tokens.curr, state.tokens.curr.value);
        }
        if (state.tokens.next.id === "=") {
          advance("=");
          if (!prefix && state.tokens.next.id === "undefined") {
            warning("W080", state.tokens.prev, state.tokens.prev.value);
          }
          if (!prefix && peek(0).id === "=" && state.tokens.next.identifier) {
            warning("W120", state.tokens.next, state.tokens.next.value);
          }
          value = expression(prefix ? 120 : 10);
          if (lone) {
            tokens[0].first = value;
          } else {
            destructuringExpressionMatch(names, value);
          }
        }
        if (state.tokens.next.id !== ",") {
          break;
        }
        comma();
      }
      if (letblock) {
        advance(")");
        block(true, true);
        statement.block = true;
        funct["(blockscope)"].unstack();
      }
      return statement;
    }
    var conststatement = stmt("const", function(context) {
      return blockVariableStatement("const", this, context);
    });
    conststatement.exps = true;
    var letstatement = stmt("let", function(context) {
      return blockVariableStatement("let", this, context);
    });
    letstatement.exps = true;
    var varstatement = stmt("var", function(context) {
      var prefix = context && context.prefix;
      var inexport = context && context.inexport;
      var tokens,
          lone,
          value;
      var implied = context && context.implied;
      var report = !(context && context.ignore);
      this.first = [];
      for (; ; ) {
        var names = [];
        if (_.contains(["{", "["], state.tokens.next.value)) {
          tokens = destructuringExpression();
          lone = false;
        } else {
          tokens = [{
            id: identifier(),
            token: state.tokens.curr
          }];
          lone = true;
          if (inexport) {
            exported[state.tokens.curr.value] = true;
            state.tokens.curr.exported = true;
          }
        }
        for (var t in tokens) {
          if (tokens.hasOwnProperty(t)) {
            t = tokens[t];
            if (state.inESNext()) {
              if (funct["(blockscope)"].labeltype(t.id) === "const") {
                warning("E011", null, t.id);
              }
            }
            if (!implied && funct["(global)"]) {
              if (predefined[t.id] === false) {
                warning("W079", t.token, t.id);
              } else if (state.option.futurehostile === false) {
                if ((!state.inES5() && vars.ecmaIdentifiers[5][t.id] === false) || (!state.inESNext() && vars.ecmaIdentifiers[6][t.id] === false)) {
                  warning("W129", t.token, t.id);
                }
              }
            }
            if (t.id) {
              if (implied === "for") {
                var ident = t.token.value;
                switch (funct[ident]) {
                  case "unused":
                    funct[ident] = "var";
                    break;
                  case "var":
                    break;
                  default:
                    if (!funct["(blockscope)"].getlabel(ident) && !(scope[ident] || {})[ident]) {
                      if (report)
                        warning("W088", t.token, ident);
                    }
                }
              } else {
                addlabel(t.id, {
                  type: "unused",
                  token: t.token
                });
              }
              names.push(t.token);
            }
          }
        }
        if (!prefix && report && state.option.varstmt) {
          warning("W132", this);
        }
        this.first = this.first.concat(names);
        if (state.tokens.next.id === "=") {
          state.nameStack.set(state.tokens.curr);
          advance("=");
          if (!prefix && report && state.tokens.next.id === "undefined") {
            warning("W080", state.tokens.prev, state.tokens.prev.value);
          }
          if (peek(0).id === "=" && state.tokens.next.identifier) {
            if (!prefix && report && !funct["(params)"] || funct["(params)"].indexOf(state.tokens.next.value) === -1) {
              warning("W120", state.tokens.next, state.tokens.next.value);
            }
          }
          value = expression(prefix ? 120 : 10);
          if (lone) {
            tokens[0].first = value;
          } else {
            destructuringExpressionMatch(names, value);
          }
        }
        if (state.tokens.next.id !== ",") {
          break;
        }
        comma();
      }
      return this;
    });
    varstatement.exps = true;
    blockstmt("class", function() {
      return classdef.call(this, true);
    });
    function classdef(isStatement) {
      if (!state.inESNext()) {
        warning("W104", state.tokens.curr, "class");
      }
      if (isStatement) {
        this.name = identifier();
        addlabel(this.name, {
          type: "unused",
          token: state.tokens.curr
        });
      } else if (state.tokens.next.identifier && state.tokens.next.value !== "extends") {
        this.name = identifier();
        this.namedExpr = true;
      } else {
        this.name = state.nameStack.infer();
      }
      classtail(this);
      return this;
    }
    function classtail(c) {
      var wasInClassBody = state.inClassBody;
      if (state.tokens.next.value === "extends") {
        advance("extends");
        c.heritage = expression(10);
      }
      state.inClassBody = true;
      advance("{");
      c.body = classbody(c);
      advance("}");
      state.inClassBody = wasInClassBody;
    }
    function classbody(c) {
      var name;
      var isStatic;
      var isGenerator;
      var getset;
      var props = {};
      var staticProps = {};
      var computed;
      for (var i = 0; state.tokens.next.id !== "}"; ++i) {
        name = state.tokens.next;
        isStatic = false;
        isGenerator = false;
        getset = null;
        if (name.id === ";") {
          warning("W032");
          advance(";");
          continue;
        }
        if (name.id === "*") {
          isGenerator = true;
          advance("*");
          name = state.tokens.next;
        }
        if (name.id === "[") {
          name = computedPropertyName();
          computed = true;
        } else if (isPropertyName(name)) {
          advance();
          computed = false;
          if (name.identifier && name.value === "static") {
            if (checkPunctuators(state.tokens.next, ["*"])) {
              isGenerator = true;
              advance("*");
            }
            if (isPropertyName(state.tokens.next) || state.tokens.next.id === "[") {
              computed = state.tokens.next.id === "[";
              isStatic = true;
              name = state.tokens.next;
              if (state.tokens.next.id === "[") {
                name = computedPropertyName();
              } else
                advance();
            }
          }
          if (name.identifier && (name.value === "get" || name.value === "set")) {
            if (isPropertyName(state.tokens.next) || state.tokens.next.id === "[") {
              computed = state.tokens.next.id === "[";
              getset = name;
              name = state.tokens.next;
              if (state.tokens.next.id === "[") {
                name = computedPropertyName();
              } else
                advance();
            }
          }
        } else {
          warning("W052", state.tokens.next, state.tokens.next.value || state.tokens.next.type);
          advance();
          continue;
        }
        if (!checkPunctuators(state.tokens.next, ["("])) {
          error("E054", state.tokens.next, state.tokens.next.value);
          while (state.tokens.next.id !== "}" && !checkPunctuators(state.tokens.next, ["("])) {
            advance();
          }
          if (state.tokens.next.value !== "(") {
            doFunction({statement: c});
          }
        }
        if (!computed) {
          if (getset) {
            saveAccessor(getset.value, isStatic ? staticProps : props, name.value, name, true, isStatic);
          } else {
            if (name.value === "constructor") {
              state.nameStack.set(c);
            } else {
              state.nameStack.set(name);
            }
            saveProperty(isStatic ? staticProps : props, name.value, name, true, isStatic);
          }
        }
        if (getset && name.value === "constructor") {
          var propDesc = getset.value === "get" ? "class getter method" : "class setter method";
          error("E049", name, propDesc, "constructor");
        } else if (name.value === "prototype") {
          error("E049", name, "class method", "prototype");
        }
        propertyName(name);
        doFunction({
          statement: c,
          type: isGenerator ? "generator" : null,
          classExprBinding: c.namedExpr ? c.name : null
        });
      }
      checkProperties(props);
    }
    blockstmt("function", function() {
      var generator = false;
      if (state.tokens.next.value === "*") {
        advance("*");
        if (state.inESNext({strict: true})) {
          generator = true;
        } else {
          warning("W119", state.tokens.curr, "function*");
        }
      }
      if (inblock) {
        warning("W082", state.tokens.curr);
      }
      var i = optionalidentifier();
      if (i === undefined) {
        warning("W025");
      }
      if (funct["(blockscope)"].labeltype(i) === "const") {
        warning("E011", null, i);
      }
      addlabel(i, {
        type: "unction",
        token: state.tokens.curr
      });
      doFunction({
        name: i,
        statement: this,
        type: generator ? "generator" : null
      });
      if (state.tokens.next.id === "(" && state.tokens.next.line === state.tokens.curr.line) {
        error("E039");
      }
      return this;
    });
    prefix("function", function() {
      var generator = false;
      if (state.tokens.next.value === "*") {
        if (!state.inESNext()) {
          warning("W119", state.tokens.curr, "function*");
        }
        advance("*");
        generator = true;
      }
      var i = optionalidentifier();
      var fn = doFunction({
        name: i,
        type: generator ? "generator" : null
      });
      function isVariable(name) {
        return name[0] !== "(";
      }
      function isLocal(name) {
        return fn[name] === "var";
      }
      if (!state.option.loopfunc && funct["(loopage)"]) {
        if (_.some(fn, function(val, name) {
          return isVariable(name) && !isLocal(name);
        })) {
          warning("W083");
        }
      }
      return this;
    });
    blockstmt("if", function() {
      var t = state.tokens.next;
      increaseComplexityCount();
      state.condition = true;
      advance("(");
      var expr = expression(0);
      checkCondAssignment(expr);
      var forinifcheck = null;
      if (state.option.forin && state.forinifcheckneeded) {
        state.forinifcheckneeded = false;
        forinifcheck = state.forinifchecks[state.forinifchecks.length - 1];
        if (expr.type === "(punctuator)" && expr.value === "!") {
          forinifcheck.type = "(negative)";
        } else {
          forinifcheck.type = "(positive)";
        }
      }
      advance(")", t);
      state.condition = false;
      var s = block(true, true);
      if (forinifcheck && forinifcheck.type === "(negative)") {
        if (s && s.length === 1 && s[0].type === "(identifier)" && s[0].value === "continue") {
          forinifcheck.type = "(negative-with-continue)";
        }
      }
      if (state.tokens.next.id === "else") {
        advance("else");
        if (state.tokens.next.id === "if" || state.tokens.next.id === "switch") {
          statement();
        } else {
          block(true, true);
        }
      }
      return this;
    });
    blockstmt("try", function() {
      var b;
      function doCatch() {
        var oldScope = scope;
        var e;
        advance("catch");
        advance("(");
        scope = Object.create(oldScope);
        e = state.tokens.next.value;
        if (state.tokens.next.type !== "(identifier)") {
          e = null;
          warning("E030", state.tokens.next, e);
        }
        advance();
        funct = functor("(catch)", state.tokens.next, scope, {
          "(context)": funct,
          "(breakage)": funct["(breakage)"],
          "(loopage)": funct["(loopage)"],
          "(statement)": false,
          "(catch)": true
        });
        if (e) {
          addlabel(e, {type: "exception"});
        }
        if (state.tokens.next.value === "if") {
          if (!state.inMoz()) {
            warning("W118", state.tokens.curr, "catch filter");
          }
          advance("if");
          expression(0);
        }
        advance(")");
        state.tokens.curr.funct = funct;
        functions.push(funct);
        block(false);
        scope = oldScope;
        funct["(last)"] = state.tokens.curr.line;
        funct["(lastcharacter)"] = state.tokens.curr.character;
        funct = funct["(context)"];
      }
      block(true);
      while (state.tokens.next.id === "catch") {
        increaseComplexityCount();
        if (b && (!state.inMoz())) {
          warning("W118", state.tokens.next, "multiple catch blocks");
        }
        doCatch();
        b = true;
      }
      if (state.tokens.next.id === "finally") {
        advance("finally");
        block(true);
        return;
      }
      if (!b) {
        error("E021", state.tokens.next, "catch", state.tokens.next.value);
      }
      return this;
    });
    blockstmt("while", function() {
      var t = state.tokens.next;
      funct["(breakage)"] += 1;
      funct["(loopage)"] += 1;
      increaseComplexityCount();
      advance("(");
      checkCondAssignment(expression(0));
      advance(")", t);
      block(true, true);
      funct["(breakage)"] -= 1;
      funct["(loopage)"] -= 1;
      return this;
    }).labelled = true;
    blockstmt("with", function() {
      var t = state.tokens.next;
      if (state.isStrict()) {
        error("E010", state.tokens.curr);
      } else if (!state.option.withstmt) {
        warning("W085", state.tokens.curr);
      }
      advance("(");
      expression(0);
      advance(")", t);
      block(true, true);
      return this;
    });
    blockstmt("switch", function() {
      var t = state.tokens.next;
      var g = false;
      var noindent = false;
      funct["(breakage)"] += 1;
      advance("(");
      checkCondAssignment(expression(0));
      advance(")", t);
      t = state.tokens.next;
      advance("{");
      if (state.tokens.next.from === indent)
        noindent = true;
      if (!noindent)
        indent += state.option.indent;
      this.cases = [];
      for (; ; ) {
        switch (state.tokens.next.id) {
          case "case":
            switch (funct["(verb)"]) {
              case "yield":
              case "break":
              case "case":
              case "continue":
              case "return":
              case "switch":
              case "throw":
                break;
              default:
                if (!reg.fallsThrough.test(state.lines[state.tokens.next.line - 2])) {
                  warning("W086", state.tokens.curr, "case");
                }
            }
            advance("case");
            this.cases.push(expression(0));
            increaseComplexityCount();
            g = true;
            advance(":");
            funct["(verb)"] = "case";
            break;
          case "default":
            switch (funct["(verb)"]) {
              case "yield":
              case "break":
              case "continue":
              case "return":
              case "throw":
                break;
              default:
                if (this.cases.length) {
                  if (!reg.fallsThrough.test(state.lines[state.tokens.next.line - 2])) {
                    warning("W086", state.tokens.curr, "default");
                  }
                }
            }
            advance("default");
            g = true;
            advance(":");
            break;
          case "}":
            if (!noindent)
              indent -= state.option.indent;
            advance("}", t);
            funct["(breakage)"] -= 1;
            funct["(verb)"] = undefined;
            return;
          case "(end)":
            error("E023", state.tokens.next, "}");
            return;
          default:
            indent += state.option.indent;
            if (g) {
              switch (state.tokens.curr.id) {
                case ",":
                  error("E040");
                  return;
                case ":":
                  g = false;
                  statements();
                  break;
                default:
                  error("E025", state.tokens.curr);
                  return;
              }
            } else {
              if (state.tokens.curr.id === ":") {
                advance(":");
                error("E024", state.tokens.curr, ":");
                statements();
              } else {
                error("E021", state.tokens.next, "case", state.tokens.next.value);
                return;
              }
            }
            indent -= state.option.indent;
        }
      }
    }).labelled = true;
    stmt("debugger", function() {
      if (!state.option.debug) {
        warning("W087", this);
      }
      return this;
    }).exps = true;
    (function() {
      var x = stmt("do", function() {
        funct["(breakage)"] += 1;
        funct["(loopage)"] += 1;
        increaseComplexityCount();
        this.first = block(true, true);
        advance("while");
        var t = state.tokens.next;
        advance("(");
        checkCondAssignment(expression(0));
        advance(")", t);
        funct["(breakage)"] -= 1;
        funct["(loopage)"] -= 1;
        return this;
      });
      x.labelled = true;
      x.exps = true;
    }());
    blockstmt("for", function() {
      var s,
          t = state.tokens.next;
      var letscope = false;
      var foreachtok = null;
      if (t.value === "each") {
        foreachtok = t;
        advance("each");
        if (!state.inMoz()) {
          warning("W118", state.tokens.curr, "for each");
        }
      }
      funct["(breakage)"] += 1;
      funct["(loopage)"] += 1;
      increaseComplexityCount();
      advance("(");
      var nextop;
      var i = 0;
      var inof = ["in", "of"];
      var level = 0;
      var comma;
      var initializer;
      if (checkPunctuators(state.tokens.next, ["{", "["]))
        ++level;
      do {
        nextop = peek(i);
        ++i;
        if (checkPunctuators(nextop, ["{", "["]))
          ++level;
        else if (checkPunctuators(nextop, ["}", "]"]))
          --level;
        if (level < 0)
          break;
        if (level === 0) {
          if (!comma && checkPunctuators(nextop, [","]))
            comma = nextop;
          else if (!initializer && checkPunctuators(nextop, ["="]))
            initializer = nextop;
        }
      } while (level > 0 || !_.contains(inof, nextop.value) && nextop.value !== ";" && nextop.type !== "(end)");
      if (_.contains(inof, nextop.value)) {
        if (!state.inESNext() && nextop.value === "of") {
          error("W104", nextop, "for of");
        }
        var ok = !(initializer || comma);
        if (initializer) {
          error("W133", comma, nextop.value, "initializer is forbidden");
        }
        if (comma) {
          error("W133", comma, nextop.value, "more than one ForBinding");
        }
        if (state.tokens.next.id === "var") {
          advance("var");
          state.tokens.curr.fud({prefix: true});
        } else if (state.tokens.next.id === "let" || state.tokens.next.id === "const") {
          advance(state.tokens.next.id);
          letscope = true;
          funct["(blockscope)"].stack();
          state.tokens.curr.fud({prefix: true});
        } else {
          Object.create(varstatement).fud({
            prefix: true,
            implied: "for",
            ignore: !ok
          });
        }
        advance(nextop.value);
        expression(20);
        advance(")", t);
        if (nextop.value === "in" && state.option.forin) {
          state.forinifcheckneeded = true;
          if (state.forinifchecks === undefined) {
            state.forinifchecks = [];
          }
          state.forinifchecks.push({type: "(none)"});
        }
        s = block(true, true);
        if (nextop.value === "in" && state.option.forin) {
          if (state.forinifchecks && state.forinifchecks.length > 0) {
            var check = state.forinifchecks.pop();
            if (s && s.length > 0 && (typeof s[0] !== "object" || s[0].value !== "if") || check.type === "(positive)" && s.length > 1 || check.type === "(negative)") {
              warning("W089", this);
            }
          }
          state.forinifcheckneeded = false;
        }
        funct["(breakage)"] -= 1;
        funct["(loopage)"] -= 1;
      } else {
        if (foreachtok) {
          error("E045", foreachtok);
        }
        if (state.tokens.next.id !== ";") {
          if (state.tokens.next.id === "var") {
            advance("var");
            state.tokens.curr.fud();
          } else if (state.tokens.next.id === "let") {
            advance("let");
            letscope = true;
            funct["(blockscope)"].stack();
            state.tokens.curr.fud();
          } else {
            for (; ; ) {
              expression(0, "for");
              if (state.tokens.next.id !== ",") {
                break;
              }
              comma();
            }
          }
        }
        nolinebreak(state.tokens.curr);
        advance(";");
        if (state.tokens.next.id !== ";") {
          checkCondAssignment(expression(0));
        }
        nolinebreak(state.tokens.curr);
        advance(";");
        if (state.tokens.next.id === ";") {
          error("E021", state.tokens.next, ")", ";");
        }
        if (state.tokens.next.id !== ")") {
          for (; ; ) {
            expression(0, "for");
            if (state.tokens.next.id !== ",") {
              break;
            }
            comma();
          }
        }
        advance(")", t);
        block(true, true);
        funct["(breakage)"] -= 1;
        funct["(loopage)"] -= 1;
      }
      if (letscope) {
        funct["(blockscope)"].unstack();
      }
      return this;
    }).labelled = true;
    stmt("break", function() {
      var v = state.tokens.next.value;
      if (funct["(breakage)"] === 0)
        warning("W052", state.tokens.next, this.value);
      if (!state.option.asi)
        nolinebreak(this);
      if (state.tokens.next.id !== ";" && !state.tokens.next.reach) {
        if (state.tokens.curr.line === startLine(state.tokens.next)) {
          if (funct[v] !== "label") {
            warning("W090", state.tokens.next, v);
          } else if (scope[v] !== funct) {
            warning("W091", state.tokens.next, v);
          }
          this.first = state.tokens.next;
          advance();
        }
      }
      reachable(this);
      return this;
    }).exps = true;
    stmt("continue", function() {
      var v = state.tokens.next.value;
      if (funct["(breakage)"] === 0)
        warning("W052", state.tokens.next, this.value);
      if (!state.option.asi)
        nolinebreak(this);
      if (state.tokens.next.id !== ";" && !state.tokens.next.reach) {
        if (state.tokens.curr.line === startLine(state.tokens.next)) {
          if (funct[v] !== "label") {
            warning("W090", state.tokens.next, v);
          } else if (scope[v] !== funct) {
            warning("W091", state.tokens.next, v);
          }
          this.first = state.tokens.next;
          advance();
        }
      } else if (!funct["(loopage)"]) {
        warning("W052", state.tokens.next, this.value);
      }
      reachable(this);
      return this;
    }).exps = true;
    stmt("return", function() {
      if (this.line === startLine(state.tokens.next)) {
        if (state.tokens.next.id !== ";" && !state.tokens.next.reach) {
          this.first = expression(0);
          if (this.first && this.first.type === "(punctuator)" && this.first.value === "=" && !this.first.paren && !state.option.boss) {
            warningAt("W093", this.first.line, this.first.character);
          }
        }
      } else {
        if (state.tokens.next.type === "(punctuator)" && ["[", "{", "+", "-"].indexOf(state.tokens.next.value) > -1) {
          nolinebreak(this);
        }
      }
      reachable(this);
      return this;
    }).exps = true;
    (function(x) {
      x.exps = true;
      x.lbp = 25;
    }(prefix("yield", function() {
      var prev = state.tokens.prev;
      if (state.inESNext(true) && !funct["(generator)"]) {
        if (!("(catch)" === funct["(name)"] && funct["(context)"]["(generator)"])) {
          error("E046", state.tokens.curr, "yield");
        }
      } else if (!state.inESNext()) {
        warning("W104", state.tokens.curr, "yield");
      }
      funct["(generator)"] = "yielded";
      var delegatingYield = false;
      if (state.tokens.next.value === "*") {
        delegatingYield = true;
        advance("*");
      }
      if (this.line === startLine(state.tokens.next) || !state.inMoz()) {
        if (delegatingYield || (state.tokens.next.id !== ";" && !state.tokens.next.reach && state.tokens.next.nud)) {
          nobreaknonadjacent(state.tokens.curr, state.tokens.next);
          this.first = expression(10);
          if (this.first.type === "(punctuator)" && this.first.value === "=" && !this.first.paren && !state.option.boss) {
            warningAt("W093", this.first.line, this.first.character);
          }
        }
        if (state.inMoz() && state.tokens.next.id !== ")" && (prev.lbp > 30 || (!prev.assign && !isEndOfExpr()) || prev.id === "yield")) {
          error("E050", this);
        }
      } else if (!state.option.asi) {
        nolinebreak(this);
      }
      return this;
    })));
    stmt("throw", function() {
      nolinebreak(this);
      this.first = expression(20);
      reachable(this);
      return this;
    }).exps = true;
    stmt("import", function() {
      if (!state.inESNext()) {
        warning("W119", state.tokens.curr, "import");
      }
      if (state.tokens.next.type === "(string)") {
        advance("(string)");
        return this;
      }
      if (state.tokens.next.identifier) {
        this.name = identifier();
        addlabel(this.name, {
          type: "unused",
          token: state.tokens.curr
        });
        if (state.tokens.next.value === ",") {
          advance(",");
        } else {
          advance("from");
          advance("(string)");
          return this;
        }
      }
      if (state.tokens.next.id === "*") {
        advance("*");
        advance("as");
        if (state.tokens.next.identifier) {
          this.name = identifier();
          addlabel(this.name, {
            type: "unused",
            token: state.tokens.curr
          });
        }
      } else {
        advance("{");
        for (; ; ) {
          if (state.tokens.next.value === "}") {
            advance("}");
            break;
          }
          var importName;
          if (state.tokens.next.type === "default") {
            importName = "default";
            advance("default");
          } else {
            importName = identifier();
          }
          if (state.tokens.next.value === "as") {
            advance("as");
            importName = identifier();
          }
          addlabel(importName, {
            type: "unused",
            token: state.tokens.curr
          });
          if (state.tokens.next.value === ",") {
            advance(",");
          } else if (state.tokens.next.value === "}") {
            advance("}");
            break;
          } else {
            error("E024", state.tokens.next, state.tokens.next.value);
            break;
          }
        }
      }
      advance("from");
      advance("(string)");
      return this;
    }).exps = true;
    stmt("export", function() {
      var ok = true;
      var token;
      var identifier;
      if (!state.inESNext()) {
        warning("W119", state.tokens.curr, "export");
        ok = false;
      }
      if (!funct["(global)"] || !funct["(blockscope)"].atTop()) {
        error("E053", state.tokens.curr);
        ok = false;
      }
      if (state.tokens.next.value === "*") {
        advance("*");
        advance("from");
        advance("(string)");
        return this;
      }
      if (state.tokens.next.type === "default") {
        state.nameStack.set(state.tokens.next);
        advance("default");
        if (state.tokens.next.id === "function" || state.tokens.next.id === "class") {
          this.block = true;
        }
        token = peek();
        expression(10);
        if (state.tokens.next.id === "class") {
          identifier = token.name;
        } else {
          identifier = token.value;
        }
        addlabel(identifier, {
          type: "function",
          token: token
        });
        return this;
      }
      if (state.tokens.next.value === "{") {
        advance("{");
        var exportedTokens = [];
        for (; ; ) {
          if (!state.tokens.next.identifier) {
            error("E030", state.tokens.next, state.tokens.next.value);
          }
          advance();
          state.tokens.curr.exported = ok;
          exportedTokens.push(state.tokens.curr);
          if (state.tokens.next.value === "as") {
            advance("as");
            if (!state.tokens.next.identifier) {
              error("E030", state.tokens.next, state.tokens.next.value);
            }
            advance();
          }
          if (state.tokens.next.value === ",") {
            advance(",");
          } else if (state.tokens.next.value === "}") {
            advance("}");
            break;
          } else {
            error("E024", state.tokens.next, state.tokens.next.value);
            break;
          }
        }
        if (state.tokens.next.value === "from") {
          advance("from");
          advance("(string)");
        } else if (ok) {
          exportedTokens.forEach(function(token) {
            if (!funct[token.value]) {
              isundef(funct, "W117", token, token.value);
            }
            exported[token.value] = true;
            funct["(blockscope)"].setExported(token.value);
          });
        }
        return this;
      }
      if (state.tokens.next.id === "var") {
        advance("var");
        state.tokens.curr.fud({inexport: true});
      } else if (state.tokens.next.id === "let") {
        advance("let");
        state.tokens.curr.fud({inexport: true});
      } else if (state.tokens.next.id === "const") {
        advance("const");
        state.tokens.curr.fud({inexport: true});
      } else if (state.tokens.next.id === "function") {
        this.block = true;
        advance("function");
        exported[state.tokens.next.value] = ok;
        state.tokens.next.exported = true;
        state.syntax["function"].fud();
      } else if (state.tokens.next.id === "class") {
        this.block = true;
        advance("class");
        exported[state.tokens.next.value] = ok;
        state.tokens.next.exported = true;
        state.syntax["class"].fud();
      } else {
        error("E024", state.tokens.next, state.tokens.next.value);
      }
      return this;
    }).exps = true;
    FutureReservedWord("abstract");
    FutureReservedWord("boolean");
    FutureReservedWord("byte");
    FutureReservedWord("char");
    FutureReservedWord("class", {
      es5: true,
      nud: classdef
    });
    FutureReservedWord("double");
    FutureReservedWord("enum", {es5: true});
    FutureReservedWord("export", {es5: true});
    FutureReservedWord("extends", {es5: true});
    FutureReservedWord("final");
    FutureReservedWord("float");
    FutureReservedWord("goto");
    FutureReservedWord("implements", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("import", {es5: true});
    FutureReservedWord("int");
    FutureReservedWord("interface", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("long");
    FutureReservedWord("native");
    FutureReservedWord("package", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("private", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("protected", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("public", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("short");
    FutureReservedWord("static", {
      es5: true,
      strictOnly: true
    });
    FutureReservedWord("super", {es5: true});
    FutureReservedWord("synchronized");
    FutureReservedWord("transient");
    FutureReservedWord("volatile");
    var lookupBlockType = function() {
      var pn,
          pn1;
      var i = -1;
      var bracketStack = 0;
      var ret = {};
      if (checkPunctuators(state.tokens.curr, ["[", "{"]))
        bracketStack += 1;
      do {
        pn = (i === -1) ? state.tokens.next : peek(i);
        pn1 = peek(i + 1);
        i = i + 1;
        if (checkPunctuators(pn, ["[", "{"])) {
          bracketStack += 1;
        } else if (checkPunctuators(pn, ["]", "}"])) {
          bracketStack -= 1;
        }
        if (pn.identifier && pn.value === "for" && bracketStack === 1) {
          ret.isCompArray = true;
          ret.notJson = true;
          break;
        }
        if (checkPunctuators(pn, ["}", "]"]) && bracketStack === 0) {
          if (pn1.value === "=") {
            ret.isDestAssign = true;
            ret.notJson = true;
            break;
          } else if (pn1.value === ".") {
            ret.notJson = true;
            break;
          }
        }
        if (pn.value === ";") {
          ret.isBlock = true;
          ret.notJson = true;
        }
      } while (bracketStack > 0 && pn.id !== "(end)");
      return ret;
    };
    function saveProperty(props, name, tkn, isClass, isStatic) {
      var msg = ["key", "class method", "static class method"];
      msg = msg[(isClass || false) + (isStatic || false)];
      if (tkn.identifier) {
        name = tkn.value;
      }
      if (props[name] && _.has(props, name)) {
        warning("W075", state.tokens.next, msg, name);
      } else {
        props[name] = {};
      }
      props[name].basic = true;
      props[name].basictkn = tkn;
    }
    function saveAccessor(accessorType, props, name, tkn, isClass, isStatic) {
      var flagName = accessorType === "get" ? "getterToken" : "setterToken";
      var msg = "";
      if (isClass) {
        if (isStatic) {
          msg += "static ";
        }
        msg += accessorType + "ter method";
      } else {
        msg = "key";
      }
      state.tokens.curr.accessorType = accessorType;
      state.nameStack.set(tkn);
      if (props[name] && _.has(props, name)) {
        if (props[name].basic || props[name][flagName]) {
          warning("W075", state.tokens.next, msg, name);
        }
      } else {
        props[name] = {};
      }
      props[name][flagName] = tkn;
    }
    function computedPropertyName() {
      advance("[");
      if (!state.option.esnext) {
        warning("W119", state.tokens.curr, "computed property names");
      }
      var value = expression(10);
      advance("]");
      return value;
    }
    function checkPunctuators(token, values) {
      return token.type === "(punctuator)" && _.contains(values, token.value);
    }
    function destructuringAssignOrJsonValue() {
      var block = lookupBlockType();
      if (block.notJson) {
        if (!state.inESNext() && block.isDestAssign) {
          warning("W104", state.tokens.curr, "destructuring assignment");
        }
        statements();
      } else {
        state.option.laxbreak = true;
        state.jsonMode = true;
        jsonValue();
      }
    }
    var arrayComprehension = function() {
      var CompArray = function() {
        this.mode = "use";
        this.variables = [];
      };
      var _carrays = [];
      var _current;
      function declare(v) {
        var l = _current.variables.filter(function(elt) {
          if (elt.value === v) {
            elt.undef = false;
            return v;
          }
        }).length;
        return l !== 0;
      }
      function use(v) {
        var l = _current.variables.filter(function(elt) {
          if (elt.value === v && !elt.undef) {
            if (elt.unused === true) {
              elt.unused = false;
            }
            return v;
          }
        }).length;
        return (l === 0);
      }
      return {
        stack: function() {
          _current = new CompArray();
          _carrays.push(_current);
        },
        unstack: function() {
          _current.variables.filter(function(v) {
            if (v.unused)
              warning("W098", v.token, v.raw_text || v.value);
            if (v.undef)
              isundef(v.funct, "W117", v.token, v.value);
          });
          _carrays.splice(-1, 1);
          _current = _carrays[_carrays.length - 1];
        },
        setState: function(s) {
          if (_.contains(["use", "define", "generate", "filter"], s))
            _current.mode = s;
        },
        check: function(v) {
          if (!_current) {
            return;
          }
          if (_current && _current.mode === "use") {
            if (use(v)) {
              _current.variables.push({
                funct: funct,
                token: state.tokens.curr,
                value: v,
                undef: true,
                unused: false
              });
            }
            return true;
          } else if (_current && _current.mode === "define") {
            if (!declare(v)) {
              _current.variables.push({
                funct: funct,
                token: state.tokens.curr,
                value: v,
                undef: false,
                unused: true
              });
            }
            return true;
          } else if (_current && _current.mode === "generate") {
            isundef(funct, "W117", state.tokens.curr, v);
            return true;
          } else if (_current && _current.mode === "filter") {
            if (use(v)) {
              isundef(funct, "W117", state.tokens.curr, v);
            }
            return true;
          }
          return false;
        }
      };
    };
    function jsonValue() {
      function jsonObject() {
        var o = {},
            t = state.tokens.next;
        advance("{");
        if (state.tokens.next.id !== "}") {
          for (; ; ) {
            if (state.tokens.next.id === "(end)") {
              error("E026", state.tokens.next, t.line);
            } else if (state.tokens.next.id === "}") {
              warning("W094", state.tokens.curr);
              break;
            } else if (state.tokens.next.id === ",") {
              error("E028", state.tokens.next);
            } else if (state.tokens.next.id !== "(string)") {
              warning("W095", state.tokens.next, state.tokens.next.value);
            }
            if (o[state.tokens.next.value] === true) {
              warning("W075", state.tokens.next, "key", state.tokens.next.value);
            } else if ((state.tokens.next.value === "__proto__" && !state.option.proto) || (state.tokens.next.value === "__iterator__" && !state.option.iterator)) {
              warning("W096", state.tokens.next, state.tokens.next.value);
            } else {
              o[state.tokens.next.value] = true;
            }
            advance();
            advance(":");
            jsonValue();
            if (state.tokens.next.id !== ",") {
              break;
            }
            advance(",");
          }
        }
        advance("}");
      }
      function jsonArray() {
        var t = state.tokens.next;
        advance("[");
        if (state.tokens.next.id !== "]") {
          for (; ; ) {
            if (state.tokens.next.id === "(end)") {
              error("E027", state.tokens.next, t.line);
            } else if (state.tokens.next.id === "]") {
              warning("W094", state.tokens.curr);
              break;
            } else if (state.tokens.next.id === ",") {
              error("E028", state.tokens.next);
            }
            jsonValue();
            if (state.tokens.next.id !== ",") {
              break;
            }
            advance(",");
          }
        }
        advance("]");
      }
      switch (state.tokens.next.id) {
        case "{":
          jsonObject();
          break;
        case "[":
          jsonArray();
          break;
        case "true":
        case "false":
        case "null":
        case "(number)":
        case "(string)":
          advance();
          break;
        case "-":
          advance("-");
          advance("(number)");
          break;
        default:
          error("E003", state.tokens.next);
      }
    }
    var warnUnused = function(name, tkn, type, unused_opt) {
      var line = tkn.line;
      var chr = tkn.from;
      var raw_name = tkn.raw_text || name;
      if (unused_opt === undefined) {
        unused_opt = state.option.unused;
      }
      if (unused_opt === true) {
        unused_opt = "last-param";
      }
      var warnable_types = {
        "vars": ["var"],
        "last-param": ["var", "param"],
        "strict": ["var", "param", "last-param"]
      };
      if (unused_opt) {
        if (warnable_types[unused_opt] && warnable_types[unused_opt].indexOf(type) !== -1) {
          if (!tkn.exported) {
            warningAt("W098", line, chr, raw_name);
          }
        }
      }
      unuseds.push({
        name: name,
        line: line,
        character: chr
      });
    };
    var blockScope = function() {
      var _current = {};
      var _variables = [_current];
      function _checkBlockLabels() {
        for (var t in _current) {
          var label = _current[t],
              labelType = label["(type)"];
          if (labelType === "unused" || (labelType === "const" && label["(unused)"])) {
            if (state.option.unused) {
              var tkn = _current[t]["(token)"];
              if (tkn.exported) {
                continue;
              }
              warnUnused(t, tkn, "var");
            }
          }
        }
      }
      function _getLabel(l) {
        for (var i = _variables.length - 1; i >= 0; --i) {
          if (_.has(_variables[i], l) && !_variables[i][l]["(shadowed)"]) {
            return _variables[i];
          }
        }
      }
      return {
        stack: function() {
          _current = {};
          _variables.push(_current);
        },
        unstack: function() {
          _checkBlockLabels();
          _variables.splice(_variables.length - 1, 1);
          _current = _.last(_variables);
        },
        getlabel: _getLabel,
        labeltype: function(l) {
          var block = _getLabel(l);
          if (block) {
            return block[l]["(type)"];
          }
          return null;
        },
        shadow: function(name) {
          for (var i = _variables.length - 1; i >= 0; i--) {
            if (_.has(_variables[i], name)) {
              _variables[i][name]["(shadowed)"] = true;
            }
          }
        },
        unshadow: function(name) {
          for (var i = _variables.length - 1; i >= 0; i--) {
            if (_.has(_variables[i], name)) {
              _variables[i][name]["(shadowed)"] = false;
            }
          }
        },
        atTop: function() {
          return _variables.length === 1;
        },
        setExported: function(id) {
          if (funct["(blockscope)"].atTop()) {
            var item = _current[id];
            if (item && item["(token)"]) {
              item["(token)"].exported = true;
            }
          }
        },
        current: {
          labeltype: function(t) {
            if (_current[t]) {
              return _current[t]["(type)"];
            }
            return null;
          },
          has: function(t) {
            return _.has(_current, t);
          },
          add: function(t, type, tok) {
            _current[t] = {
              "(type)": type,
              "(token)": tok,
              "(shadowed)": false,
              "(unused)": true
            };
          }
        }
      };
    };
    var escapeRegex = function(str) {
      return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    var itself = function(s, o, g) {
      var i,
          k,
          x,
          reIgnoreStr,
          reIgnore;
      var optionKeys;
      var newOptionObj = {};
      var newIgnoredObj = {};
      o = _.clone(o);
      state.reset();
      if (o && o.scope) {
        JSHINT.scope = o.scope;
      } else {
        JSHINT.errors = [];
        JSHINT.undefs = [];
        JSHINT.internals = [];
        JSHINT.blacklist = {};
        JSHINT.scope = "(main)";
      }
      predefined = Object.create(null);
      combine(predefined, vars.ecmaIdentifiers[3]);
      combine(predefined, vars.reservedVars);
      combine(predefined, g || {});
      declared = Object.create(null);
      exported = Object.create(null);
      function each(obj, cb) {
        if (!obj)
          return;
        if (!Array.isArray(obj) && typeof obj === "object")
          obj = Object.keys(obj);
        obj.forEach(cb);
      }
      if (o) {
        each(o.predef || null, function(item) {
          var slice,
              prop;
          if (item[0] === "-") {
            slice = item.slice(1);
            JSHINT.blacklist[slice] = slice;
            delete predefined[slice];
          } else {
            prop = Object.getOwnPropertyDescriptor(o.predef, item);
            predefined[item] = prop ? prop.value : false;
          }
        });
        each(o.exported || null, function(item) {
          exported[item] = true;
        });
        delete o.predef;
        delete o.exported;
        optionKeys = Object.keys(o);
        for (x = 0; x < optionKeys.length; x++) {
          if (/^-W\d{3}$/g.test(optionKeys[x])) {
            newIgnoredObj[optionKeys[x].slice(1)] = true;
          } else {
            var optionKey = optionKeys[x];
            newOptionObj[optionKey] = o[optionKey];
            if (optionKey === "es5") {
              if (o[optionKey]) {
                warning("I003");
              }
            }
            if (optionKeys[x] === "newcap" && o[optionKey] === false)
              newOptionObj["(explicitNewcap)"] = true;
          }
        }
      }
      state.option = newOptionObj;
      state.ignored = newIgnoredObj;
      state.option.indent = state.option.indent || 4;
      state.option.maxerr = state.option.maxerr || 50;
      indent = 1;
      global = Object.create(predefined);
      scope = global;
      funct = functor("(global)", null, scope, {
        "(global)": true,
        "(blockscope)": blockScope(),
        "(comparray)": arrayComprehension(),
        "(metrics)": createMetrics(state.tokens.next)
      });
      functions = [funct];
      urls = [];
      stack = null;
      member = {};
      membersOnly = null;
      implied = {};
      inblock = false;
      lookahead = [];
      unuseds = [];
      if (!isString(s) && !Array.isArray(s)) {
        errorAt("E004", 0);
        return false;
      }
      api = {
        get isJSON() {
          return state.jsonMode;
        },
        getOption: function(name) {
          return state.option[name] || null;
        },
        getCache: function(name) {
          return state.cache[name];
        },
        setCache: function(name, value) {
          state.cache[name] = value;
        },
        warn: function(code, data) {
          warningAt.apply(null, [code, data.line, data.char].concat(data.data));
        },
        on: function(names, listener) {
          names.split(" ").forEach(function(name) {
            emitter.on(name, listener);
          }.bind(this));
        }
      };
      emitter.removeAllListeners();
      (extraModules || []).forEach(function(func) {
        func(api);
      });
      state.tokens.prev = state.tokens.curr = state.tokens.next = state.syntax["(begin)"];
      if (o && o.ignoreDelimiters) {
        if (!Array.isArray(o.ignoreDelimiters)) {
          o.ignoreDelimiters = [o.ignoreDelimiters];
        }
        o.ignoreDelimiters.forEach(function(delimiterPair) {
          if (!delimiterPair.start || !delimiterPair.end)
            return;
          reIgnoreStr = escapeRegex(delimiterPair.start) + "[\\s\\S]*?" + escapeRegex(delimiterPair.end);
          reIgnore = new RegExp(reIgnoreStr, "ig");
          s = s.replace(reIgnore, function(match) {
            return match.replace(/./g, " ");
          });
        });
      }
      lex = new Lexer(s);
      lex.on("warning", function(ev) {
        warningAt.apply(null, [ev.code, ev.line, ev.character].concat(ev.data));
      });
      lex.on("error", function(ev) {
        errorAt.apply(null, [ev.code, ev.line, ev.character].concat(ev.data));
      });
      lex.on("fatal", function(ev) {
        quit("E041", ev.line, ev.from);
      });
      lex.on("Identifier", function(ev) {
        emitter.emit("Identifier", ev);
      });
      lex.on("String", function(ev) {
        emitter.emit("String", ev);
      });
      lex.on("Number", function(ev) {
        emitter.emit("Number", ev);
      });
      lex.start();
      for (var name in o) {
        if (_.has(o, name)) {
          checkOption(name, state.tokens.curr);
        }
      }
      assume();
      combine(predefined, g || {});
      comma.first = true;
      try {
        advance();
        switch (state.tokens.next.id) {
          case "{":
          case "[":
            destructuringAssignOrJsonValue();
            break;
          default:
            directives();
            if (state.isStrict()) {
              if (!state.option.globalstrict) {
                if (!(state.option.module || state.option.node || state.option.phantom || state.option.browserify)) {
                  warning("W097", state.tokens.prev);
                }
              }
            }
            statements();
        }
        if (state.tokens.next.id !== "(end)") {
          quit("E041", state.tokens.curr.line);
        }
        funct["(blockscope)"].unstack();
        var markDefined = function(name, context) {
          do {
            if (typeof context[name] === "string") {
              if (context[name] === "unused")
                context[name] = "var";
              else if (context[name] === "unction")
                context[name] = "closure";
              return true;
            }
            context = context["(context)"];
          } while (context);
          return false;
        };
        var clearImplied = function(name, line) {
          if (!implied[name])
            return;
          var newImplied = [];
          for (var i = 0; i < implied[name].length; i += 1) {
            if (implied[name][i] !== line)
              newImplied.push(implied[name][i]);
          }
          if (newImplied.length === 0)
            delete implied[name];
          else
            implied[name] = newImplied;
        };
        var checkUnused = function(func, key) {
          var type = func[key];
          var tkn = func["(tokens)"][key];
          if (key.charAt(0) === "(")
            return;
          if (type !== "unused" && type !== "unction")
            return;
          if (func["(params)"] && func["(params)"].indexOf(key) !== -1)
            return;
          if (func["(global)"] && _.has(exported, key))
            return;
          warnUnused(key, tkn, "var");
        };
        for (i = 0; i < JSHINT.undefs.length; i += 1) {
          k = JSHINT.undefs[i].slice(0);
          if (markDefined(k[2].value, k[0]) || k[2].forgiveUndef) {
            clearImplied(k[2].value, k[2].line);
          } else if (state.option.undef) {
            warning.apply(warning, k.slice(1));
          }
        }
        functions.forEach(function(func) {
          if (func["(unusedOption)"] === false) {
            return;
          }
          for (var key in func) {
            if (_.has(func, key)) {
              checkUnused(func, key);
            }
          }
          if (!func["(params)"])
            return;
          var params = func["(params)"].slice();
          var param = params.pop();
          var type,
              unused_opt;
          while (param) {
            type = func[param];
            unused_opt = func["(unusedOption)"] || state.option.unused;
            unused_opt = unused_opt === true ? "last-param" : unused_opt;
            if (param === "undefined")
              return;
            if (type === "unused" || type === "unction") {
              warnUnused(param, func["(tokens)"][param], "param", func["(unusedOption)"]);
            } else if (unused_opt === "last-param") {
              return;
            }
            param = params.pop();
          }
        });
        for (var key in declared) {
          if (_.has(declared, key) && !_.has(global, key) && !_.has(exported, key)) {
            warnUnused(key, declared[key], "var");
          }
        }
      } catch (err) {
        if (err && err.name === "JSHintError") {
          var nt = state.tokens.next || {};
          JSHINT.errors.push({
            scope: "(main)",
            raw: err.raw,
            code: err.code,
            reason: err.message,
            line: err.line || nt.line,
            character: err.character || nt.from
          }, null);
        } else {
          throw err;
        }
      }
      if (JSHINT.scope === "(main)") {
        o = o || {};
        for (i = 0; i < JSHINT.internals.length; i += 1) {
          k = JSHINT.internals[i];
          o.scope = k.elem;
          itself(k.value, o, g);
        }
      }
      return JSHINT.errors.length === 0;
    };
    itself.addModule = function(func) {
      extraModules.push(func);
    };
    itself.addModule(style.register);
    itself.data = function() {
      var data = {
        functions: [],
        options: state.option
      };
      var implieds = [];
      var members = [];
      var fu,
          f,
          i,
          j,
          n,
          globals;
      if (itself.errors.length) {
        data.errors = itself.errors;
      }
      if (state.jsonMode) {
        data.json = true;
      }
      for (n in implied) {
        if (_.has(implied, n)) {
          implieds.push({
            name: n,
            line: implied[n]
          });
        }
      }
      if (implieds.length > 0) {
        data.implieds = implieds;
      }
      if (urls.length > 0) {
        data.urls = urls;
      }
      globals = Object.keys(scope);
      if (globals.length > 0) {
        data.globals = globals;
      }
      for (i = 1; i < functions.length; i += 1) {
        f = functions[i];
        fu = {};
        for (j = 0; j < functionicity.length; j += 1) {
          fu[functionicity[j]] = [];
        }
        for (j = 0; j < functionicity.length; j += 1) {
          if (fu[functionicity[j]].length === 0) {
            delete fu[functionicity[j]];
          }
        }
        fu.name = f["(name)"];
        fu.param = f["(params)"];
        fu.line = f["(line)"];
        fu.character = f["(character)"];
        fu.last = f["(last)"];
        fu.lastcharacter = f["(lastcharacter)"];
        fu.metrics = {
          complexity: f["(metrics)"].ComplexityCount,
          parameters: (f["(params)"] || []).length,
          statements: f["(metrics)"].statementCount
        };
        data.functions.push(fu);
      }
      if (unuseds.length > 0) {
        data.unused = unuseds;
      }
      members = [];
      for (n in member) {
        if (typeof member[n] === "number") {
          data.member = member;
          break;
        }
      }
      return data;
    };
    itself.jshint = itself;
    return itself;
  }());
  if (typeof exports === "object" && exports) {
    exports.JSHINT = JSHINT;
  }
})(require('process'));