/* */ 
"use strict";
var NameStack = require('./name-stack');
var state = {
  syntax: {},
  isStrict: function() {
    return this.directive["use strict"] || this.inClassBody || this.option.module;
  },
  inMoz: function() {
    return this.option.moz && !this.option.esnext;
  },
  inESNext: function(strict) {
    if (strict) {
      return !this.option.moz && this.option.esnext;
    }
    return this.option.moz || this.option.esnext;
  },
  inES5: function() {
    return !this.option.es3;
  },
  inES3: function() {
    return this.option.es3;
  },
  reset: function() {
    this.tokens = {
      prev: null,
      next: null,
      curr: null
    };
    this.option = {};
    this.ignored = {};
    this.directive = {};
    this.jsonMode = false;
    this.jsonWarnings = [];
    this.lines = [];
    this.tab = "";
    this.cache = {};
    this.ignoredLines = {};
    this.forinifcheckneeded = false;
    this.nameStack = new NameStack();
    this.inClassBody = false;
    this.ignoreLinterErrors = false;
  }
};
exports.state = state;
