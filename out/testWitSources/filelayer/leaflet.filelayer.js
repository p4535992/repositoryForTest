System.registerModule("../../../testWitSources/filelayer/csv2geojson.js", [], function() {
  "use strict";
  var __moduleName = "../../../testWitSources/filelayer/csv2geojson.js";
  !function(e) {
    if ("object" == (typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) && "undefined" != typeof module)
      module.exports = e();
    else if ("function" == typeof define && define.amd)
      define([], e);
    else {
      var o;
      "undefined" != typeof window ? o = window : "undefined" != typeof global ? o = global : "undefined" != typeof self && (o = self), o.csv2geojson = e();
    }
  }(function() {
    var define,
        module,
        exports;
    return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;
            if (!u && a)
              return a(o, !0);
            if (i)
              return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }
          var l = n[o] = {exports: {}};
          t[o][0].call(l.exports, function(e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }
        return n[o].exports;
      }
      var i = typeof require == "function" && require;
      for (var o = 0; o < r.length; o++)
        s(r[o]);
      return s;
    })({
      1: [function(require, module, exports) {
        var dsv = require('dsv'),
            sexagesimal = require('sexagesimal');
        function isLat(f) {
          return !!f.match(/(Lat)(itude)?/gi);
        }
        function isLon(f) {
          return !!f.match(/(L)(on|ng)(gitude)?/i);
        }
        function keyCount(o) {
          return ((typeof o === 'undefined' ? 'undefined' : $traceurRuntime.typeof(o)) == 'object') ? Object.keys(o).length : 0;
        }
        function autoDelimiter(x) {
          var delimiters = [',', '\t', '|', ';', String.fromCharCode(30), String.fromCharCode(31)];
          var results = [];
          delimiters.forEach(function(delimiter) {
            var res = dsv(delimiter).parse(x);
            if (res.length >= 1) {
              var count = keyCount(res[0]);
              for (var i = 0; i < res.length; i++) {
                if (keyCount(res[i]) !== count)
                  return;
              }
              results.push({
                delimiter: delimiter,
                arity: Object.keys(res[0]).length
              });
            }
          });
          if (results.length) {
            return results.sort(function(a, b) {
              return b.arity - a.arity;
            })[0].delimiter;
          } else {
            return null;
          }
        }
        function auto(x) {
          var delimiter = autoDelimiter(x);
          if (!delimiter)
            return null;
          return dsv(delimiter).parse(x);
        }
        function csv2geojson(x, options, callback) {
          if (!callback) {
            callback = options;
            options = {};
          }
          options.delimiter = options.delimiter || ',';
          var latfield = options.latfield || '',
              lonfield = options.lonfield || '',
              crs = options.crs || '';
          var features = [],
              featurecollection = {
                type: 'FeatureCollection',
                features: features
              };
          if (crs !== '') {
            featurecollection.crs = {
              type: 'name',
              properties: {name: crs}
            };
          }
          if (options.delimiter === 'auto' && typeof x == 'string') {
            options.delimiter = autoDelimiter(x);
            if (!options.delimiter)
              return callback({
                type: 'Error',
                message: 'Could not autodetect delimiter'
              });
          }
          var parsed = (typeof x == 'string') ? dsv(options.delimiter).parse(x) : x;
          if (!parsed.length)
            return callback(null, featurecollection);
          if (!latfield || !lonfield) {
            for (var f in parsed[0]) {
              if (!latfield && isLat(f))
                latfield = f;
              if (!lonfield && isLon(f))
                lonfield = f;
            }
            if (!latfield || !lonfield) {
              var fields = [];
              for (var k in parsed[0])
                fields.push(k);
              return callback({
                type: 'Error',
                message: 'Latitude and longitude fields not present',
                data: parsed,
                fields: fields
              });
            }
          }
          var errors = [];
          for (var i = 0; i < parsed.length; i++) {
            if (parsed[i][lonfield] !== undefined && parsed[i][lonfield] !== undefined) {
              var lonk = parsed[i][lonfield],
                  latk = parsed[i][latfield],
                  lonf = void 0,
                  latf = void 0,
                  a = void 0;
              a = sexagesimal(lonk, 'EW');
              if (a)
                lonk = a;
              a = sexagesimal(latk, 'NS');
              if (a)
                latk = a;
              lonf = parseFloat(lonk);
              latf = parseFloat(latk);
              if (isNaN(lonf) || isNaN(latf)) {
                errors.push({
                  message: 'A row contained an invalid value for latitude or longitude',
                  row: parsed[i]
                });
              } else {
                if (!options.includeLatLon) {
                  delete parsed[i][lonfield];
                  delete parsed[i][latfield];
                }
                features.push({
                  type: 'Feature',
                  properties: parsed[i],
                  geometry: {
                    type: 'Point',
                    coordinates: [parseFloat(lonf), parseFloat(latf)]
                  }
                });
              }
            }
          }
          callback(errors.length ? errors : null, featurecollection);
        }
        function toLine(gj) {
          var features = gj.features;
          var line = {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: []
            }
          };
          for (var i = 0; i < features.length; i++) {
            line.geometry.coordinates.push(features[i].geometry.coordinates);
          }
          line.properties = features[0].properties;
          return {
            type: 'FeatureCollection',
            features: [line]
          };
        }
        function toPolygon(gj) {
          var features = gj.features;
          var poly = {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[]]
            }
          };
          for (var i = 0; i < features.length; i++) {
            poly.geometry.coordinates[0].push(features[i].geometry.coordinates);
          }
          poly.properties = features[0].properties;
          return {
            type: 'FeatureCollection',
            features: [poly]
          };
        }
        module.exports = {
          isLon: isLon,
          isLat: isLat,
          csv: dsv.csv.parse,
          tsv: dsv.tsv.parse,
          dsv: dsv,
          auto: auto,
          csv2geojson: csv2geojson,
          toLine: toLine,
          toPolygon: toPolygon
        };
      }, {
        "dsv": 2,
        "sexagesimal": 3
      }],
      2: [function(require, module, exports) {
        module.exports = new Function("dsv.version = \"0.0.3\";\n\ndsv.tsv = dsv(\"\\t\");\ndsv.csv = dsv(\",\");\n\nfunction dsv(delimiter) {\n  var dsv = {},\n      reFormat = new RegExp(\"[\\\"\" + delimiter + \"\\n]\"),\n      delimiterCode = delimiter.charCodeAt(0);\n\n  dsv.parse = function(text, f) {\n    var o;\n    return dsv.parseRows(text, function(row, i) {\n      if (o) return o(row, i - 1);\n      var a = new Function(\"d\", \"return {\" + row.map(function(name, i) {\n        return JSON.stringify(name) + \": d[\" + i + \"]\";\n      }).join(\",\") + \"}\");\n      o = f ? function(row, i) { return f(a(row), i); } : a;\n    });\n  };\n\n  dsv.parseRows = function(text, f) {\n    var EOL = {}, // sentinel value for end-of-line\n        EOF = {}, // sentinel value for end-of-file\n        rows = [], // output rows\n        N = text.length,\n        I = 0, // current character index\n        n = 0, // the current line number\n        t, // the current token\n        eol; // is the current token followed by EOL?\n\n    function token() {\n      if (I >= N) return EOF; // special case: end of file\n      if (eol) return eol = false, EOL; // special case: end of line\n\n      // special case: quotes\n      var j = I;\n      if (text.charCodeAt(j) === 34) {\n        var i = j;\n        while (i++ < N) {\n          if (text.charCodeAt(i) === 34) {\n            if (text.charCodeAt(i + 1) !== 34) break;\n            ++i;\n          }\n        }\n        I = i + 2;\n        var c = text.charCodeAt(i + 1);\n        if (c === 13) {\n          eol = true;\n          if (text.charCodeAt(i + 2) === 10) ++I;\n        } else if (c === 10) {\n          eol = true;\n        }\n        return text.substring(j + 1, i).replace(/\"\"/g, \"\\\"\");\n      }\n\n      // common case: find next delimiter or newline\n      while (I < N) {\n        var c = text.charCodeAt(I++), k = 1;\n        if (c === 10) eol = true; // \\n\n        else if (c === 13) { eol = true; if (text.charCodeAt(I) === 10) ++I, ++k; } // \\r|\\r\\n\n        else if (c !== delimiterCode) continue;\n        return text.substring(j, I - k);\n      }\n\n      // special case: last token before EOF\n      return text.substring(j);\n    }\n\n    while ((t = token()) !== EOF) {\n      var a = [];\n      while (t !== EOL && t !== EOF) {\n        a.push(t);\n        t = token();\n      }\n      if (f && !(a = f(a, n++))) continue;\n      rows.push(a);\n    }\n\n    return rows;\n  };\n\n  dsv.format = function(rows) {\n    if (Array.isArray(rows[0])) return dsv.formatRows(rows); // deprecated; use formatRows\n    var fieldSet = {}, fields = [];\n\n    // Compute unique fields in order of discovery.\n    rows.forEach(function(row) {\n      for (var field in row) {\n        if (!(field in fieldSet)) {\n          fields.push(fieldSet[field] = field);\n        }\n      }\n    });\n\n    return [fields.map(formatValue).join(delimiter)].concat(rows.map(function(row) {\n      return fields.map(function(field) {\n        return formatValue(row[field]);\n      }).join(delimiter);\n    })).join(\"\\n\");\n  };\n\n  dsv.formatRows = function(rows) {\n    return rows.map(formatRow).join(\"\\n\");\n  };\n\n  function formatRow(row) {\n    return row.map(formatValue).join(delimiter);\n  }\n\n  function formatValue(text) {\n    return reFormat.test(text) ? \"\\\"\" + text.replace(/\\\"/g, \"\\\"\\\"\") + \"\\\"\" : text;\n  }\n\n  return dsv;\n}\n" + ";return dsv")();
      }, {}],
      3: [function(require, module, exports) {
        module.exports = element;
        module.exports.pair = pair;
        module.exports.format = format;
        module.exports.formatPair = formatPair;
        function element(x, dims) {
          return search(x, dims).val;
        }
        function formatPair(x) {
          return format(x.lat, 'lat') + ' ' + format(x.lon, 'lon');
        }
        function format(x, dim) {
          var dirs = {
            lat: ['N', 'S'],
            lon: ['E', 'W']
          }[dim] || '',
              dir = dirs[x >= 0 ? 0 : 1],
              abs = Math.abs(x),
              whole = Math.floor(abs),
              fraction = abs - whole,
              fractionMinutes = fraction * 60,
              minutes = Math.floor(fractionMinutes),
              seconds = Math.floor((fractionMinutes - minutes) * 60);
          return whole + '° ' + (minutes ? minutes + "' " : '') + (seconds ? seconds + '" ' : '') + dir;
        }
        function search(x, dims, r) {
          if (!dims)
            dims = 'NSEW';
          if (typeof x !== 'string')
            return {
              val: null,
              regex: r
            };
          r = r || /[\s\,]*([\-|\—|\―]?[0-9.]+)°? *(?:([0-9.]+)['’′‘] *)?(?:([0-9.]+)(?:''|"|”|″) *)?([NSEW])?/gi;
          var m = r.exec(x);
          if (!m)
            return {
              val: null,
              regex: r
            };
          else if (m[4] && dims.indexOf(m[4]) === -1)
            return {
              val: null,
              regex: r
            };
          else
            return {
              val: (((m[1]) ? parseFloat(m[1]) : 0) + ((m[2] ? parseFloat(m[2]) / 60 : 0)) + ((m[3] ? parseFloat(m[3]) / 3600 : 0))) * ((m[4] && m[4] === 'S' || m[4] === 'W') ? -1 : 1),
              regex: r,
              raw: m[0],
              dim: m[4]
            };
        }
        function pair(x, dims) {
          x = x.trim();
          var one = search(x, dims);
          if (one.val === null)
            return null;
          var two = search(x, dims, one.regex);
          if (two.val === null)
            return null;
          if (one.raw + two.raw !== x)
            return null;
          if (one.dim)
            return swapdim(one.val, two.val, one.dim);
          else
            return [one.val, two.val];
        }
        function swapdim(a, b, dim) {
          if (dim == 'N' || dim == 'S')
            return [a, b];
          if (dim == 'W' || dim == 'E')
            return [b, a];
        }
      }, {}]
    }, {}, [1])(1);
  });
  return {};
});
System.registerModule("../../../testWitSources/filelayer/leaflet.filelayer.js", [], function() {
  "use strict";
  var __moduleName = "../../../testWitSources/filelayer/leaflet.filelayer.js";
  var csv2geojson = System.get("../../../testWitSources/filelayer/csv2geojson.js");
  var FileLoader = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
      layerOptions: {},
      fileSizeLimit: 1024,
      headers: true,
      latitudeColumn: 'lat',
      longitudeColumn: 'lng',
      titleForSearch: 'title',
      titlesToInspect: [],
      rootTag: {
        root: "Root",
        subRoot: "Row"
      },
      rdfLink: [],
      rdfAbout: 'rdf:about',
      rdfAboutLink: 'rdf:about',
      layer: new L.geoJson(),
      popupTable: false,
      validateGeoJson: false
    },
    initialize: function(map, options) {
      this._map = map;
      L.Util.setOptions(this, options);
      this._parsers = {
        'json': this._loadGeoJSON,
        'geojson': this._loadGeoJSON,
        'gpx': this._convertToGeoJSON,
        'kml': this._convertToGeoJSON,
        'csv': this._csvToGeoJSON,
        'xml': this._XMLToGeoJSON,
        'rdf': this._RDFToGeoJSON,
        'input': this._gtfsToGeoJSON
      };
    },
    load: function(file) {
      var fileSize;
      if (typeof file == 'undefined')
        fileSize = 1024;
      else
        fileSize = (file.size / 1024).toFixed(4);
      if (fileSize > this.options.fileSizeLimit) {
        this.fire('data:error', {error: new Error('File size exceeds limit (' + fileSize + ' > ' + this.options.fileSizeLimit + 'kb)')});
        return;
      }
      var ext = file.name.split('.').pop();
      var parser = this._parsers[ext];
      if (ext == "zip") {
        try {
          this.fire('data:loading', {
            filename: file.name,
            format: ext
          });
          this.fire('data:loaded', {
            filename: file.name,
            format: ext
          });
        } catch (err) {
          this.fire('data:error', {error: err});
        }
        return this._gtfsZipToGEOJSON(file);
      } else {
        if (!parser) {
          this.fire('data:error', {error: new Error('Unsupported file type ' + file.type + '(' + ext + ')')});
          return;
        }
        var reader = new FileReader();
        reader.onload = L.Util.bind(function(e) {
          try {
            this.fire('data:loading', {
              filename: file.name,
              format: ext
            });
            var layer = parser.call(this, e.target.result, ext);
            this.fire('data:loaded', {
              layer: layer,
              filename: file.name,
              format: ext
            });
          } catch (err) {
            this.fire('data:error', {error: err});
          }
        }, this);
        reader.readAsText(file);
        return reader;
      }
    },
    _loadGeoJSON: function(content) {
      if (typeof content == 'string') {
        content = JSON.parse(content);
      }
      var layer = this.options.layer;
      if (layer.getLayers().length > 0) {
        layer.addLayer(new L.geoJson(content, this.options.layerOptions));
      } else {
        try {
          layer = L.geoJson(content, this.options.layerOptions);
        } catch (e) {
          console.error(e.message);
        }
      }
      if (layer.getLayers().length === 0) {
        this.fire('data:error', {error: new Error('GeoJSON has no valid layers.\n' + 'if you try to load a CSV/RDF/XML file make sure to have setted the corrected name of the columns')});
      }
      if (this.options.addToMap) {
        layer.addTo(this._map);
      }
      return layer;
    },
    _convertToGeoJSON: function(content, format) {
      if (typeof content == 'string') {
        content = (new window.DOMParser()).parseFromString(content, "text/xml");
      }
      var geojson = toGeoJSON[format](content);
      return this._loadGeoJSON(geojson);
    },
    _csvToGeoJSON: function(content) {
      try {
        if (!this.options.headers) {
          this.fire('data:error', {error: new Error('The file CSV must have the Headers')});
        }
        var json;
        alert(0);
        alert(JSON.stringify(r, undefined, 2));
        alert(1);
        json = {data: []};
        json.data = d3.csv.parse(content, function(data) {
          alert("A" + JSON.stringify(data, undefined, 2));
          var dataset = data.forEach(function(d) {
            alert("D" + JSON.stringify(d, undefined, 2));
            var array = [];
            for (var i = 0; i < Object.keys(d).length; i++) {
              alert("Key:" + Object.keys(d)[i] + ",Value:" + d[Object.keys(d)[i]]);
              array.push(d[Object.keys(d)[i]]);
            }
            return array;
          });
        });
        alert("E" + JSON.stringify(json.data, undefined, 2));
        json = this._addFeatureToJson(json.data);
        return this._loadGeoJSON(json);
      } catch (e) {
        console.error(e.message);
        this.fire('data:error', {error: e});
      }
    },
    _getDelimiter2: function(content) {
      var delimChoices = [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP];
      var bestDelim,
          bestDelta,
          fieldCountPrevRow;
      for (var i = 0; i < delimChoices.length; i++) {
        var delim = delimChoices[i];
        var delta = 0,
            avgFieldCount = 0;
        fieldCountPrevRow = undefined;
        alert("CONTENT" + content);
        for (var j = 0; j < content.length; j++) {
          alert("CONTENT" + content[j]);
          var fieldCount = content[j].length;
          avgFieldCount += fieldCount;
          if (typeof fieldCountPrevRow === 'undefined') {
            fieldCountPrevRow = fieldCount;
            continue;
          } else if (fieldCount > 1) {
            delta += Math.abs(fieldCount - fieldCountPrevRow);
            fieldCountPrevRow = fieldCount;
          }
        }
        if (content.length > 0)
          avgFieldCount /= content.length;
        if ((typeof bestDelta === 'undefined' || delta < bestDelta) && avgFieldCount > 1.99) {
          bestDelta = delta;
          bestDelim = delim;
        }
      }
    },
    _keyCount: function(o) {
      return ((typeof o === 'undefined' ? 'undefined' : $traceurRuntime.typeof(o)) == 'object') ? Object.keys(o).length : 0;
    },
    _addFeatureToJson: function(json) {
      if (json === null || typeof json === 'undefined' || Object.keys(json).length == 0) {
        console.error("Be sure to add the feature geojson to a Array or a Object of objects.");
        return;
      }
      var titles = this._titles;
      var columnLat = this.options.latitudeColumn;
      var columnLng = this.options.longitudeColumn;
      var popupTable = this.options.popupTable;
      json = {
        type: "FeatureCollection",
        features: Object.keys(json).map(function(id) {
          var obj = json[id];
          if (obj === null || typeof obj === 'undefined' || id >= Object.keys(json).length - 1) {
            console.warn("Ignore line ", id, " invalid data");
            return;
          } else {
            if (!titles.length > 0)
              titles = Object.keys(obj);
            return {
              type: 'Feature',
              properties: {
                id: id,
                title: (function() {
                  for (var search = void 0,
                      i = 0; search = titles[i++]; ) {
                    if (titles[i] == search)
                      return obj[search];
                  }
                  return id;
                })(),
                popupContent: (function() {
                  var content = '';
                  if (popupTable) {
                    content = '<div class="popup-content">' + '<table class="table table-striped table-bordered table-condensed">';
                  }
                  for (var title = void 0,
                      i = 0; title = titles[i++]; ) {
                    try {
                      if (obj.hasOwnProperty(title)) {
                        if (popupTable) {
                          var href = '';
                          if (obj[title].indexOf('http') === 0) {
                            href = '<a target="_blank" href="' + obj[title] + '">' + obj[title] + '</a>';
                          }
                          if (href.length > 0)
                            content += '<tr><th>' + title + '</th><td>' + href + '</td></tr>';
                          else
                            content += '<tr><th>' + title + '</th><td>' + obj[title] + '</td></tr>';
                        } else {
                          content[title] = obj[title];
                        }
                      }
                    } catch (e) {
                      console.warn("Undefined field for the json:" + JSON.stringify(obj) + ",Title:" + title + "->" + e.message);
                    }
                  }
                  if (popupTable)
                    content += "</table></div>";
                  return content;
                })()
              },
              geometry: {
                type: "Point",
                coordinates: (function() {
                  var lng = obj[columnLng].toString();
                  var lat = obj[columnLat].toString();
                  try {
                    if (/[a-z]/.test(lng.toLowerCase()) || /[a-z]/.test(lat.toLowerCase()) || isNaN(lng) || isNaN(lat) || !isFinite(lng) || !isFinite(lat)) {
                      console.warn("Coords lnglat:[" + lng + "," + lat + "] ,id:" + id);
                      return;
                    } else {
                      lng = parseFloat(obj[columnLng]);
                      lat = parseFloat(obj[columnLat]);
                      if (!(lng < 180 && lng > -180 && lat < 90 && lat > -90)) {
                        console.warn("Something wrong with the coordinates, ignore line", id, " invalid data");
                        return;
                      }
                    }
                  } catch (e) {
                    console.warn("Not valid coordinates avoid this line ->" + "Coords:" + lng + "," + lat + ",id:" + id);
                    return;
                  }
                  return [lng, lat];
                })()
              }
            };
          }
        })
      };
      this._cleanJson(json);
      if (this.options.validateGeoJson) {
        ajax._validateGeoJson(json, function(message) {
          ajax.processSuccess(message);
        });
        if (ajax.result.isCorrect)
          return json;
        else
          console.error("The geo json generated is wrong:" + JSON.stringify(ajax.result.response, undefined, 2));
      } else
        return json;
    },
    _RDFToGeoJSON: function(content) {
      try {
        var xml = this._toXML(content);
        var json = this._XMLToJSON(xml);
        for (var i = 0; i < Object.keys(this.options.rootTag).length; i++) {
          json = json[this.options.rootTag[Object.keys(this.options.rootTag)[i]]];
        }
        this._simplifyJson(json);
        this._mergeRdfJson(this._root.data);
        for (i = 0; i < this._root.data.length; i++) {
          if (!(this._root.data[i].hasOwnProperty(this.options.latitudeColumn) && this._root.data[i].hasOwnProperty(this.options.longitudeColumn))) {
            delete this._root.data[i];
          }
        }
        this._depth = this._root.data.length;
        json = this._addFeatureToJson(this._root.data);
        return this._loadGeoJSON(json);
      } catch (e) {
        console.error(e.message);
      }
    },
    _toXML: function(content) {
      var xml;
      try {
        if (window.DOMParser) {
          xml = new DOMParser().parseFromString(content, "text/xml");
        } else {
          try {
            xml = new ActiveXObject("Microsoft.XMLDOM");
            xml.async = false;
            xml.validateOnParse = false;
            xml.resolveExternals = false;
            xml.loadXML(content);
          } catch (e) {
            try {
              Document.prototype.loadXML = function(s) {
                var doc2 = (new DOMParser()).parseFromString(s, "text/xml");
                while (this.hasChildNodes()) {
                  this.removeChild(this.lastChild);
                }
                for (var i = 0; i < doc2.childNodes.length; i++) {
                  this.appendChild(this.importNode(doc2.childNodes[i], true));
                }
              };
              xml = document.implementation.createDocument('', '', null);
              xml.loadXML(content);
            } catch (e) {
              this.fire('data:error', {error: new Error(e.message)});
            }
          }
        }
      } catch (e) {
        throw new Error(e.message);
      }
      return xml;
    },
    _XMLToJSON: function(content) {
      var attr,
          child,
          attrs = content.attributes,
          children = content.childNodes,
          key = content.nodeType,
          json = {},
          i = -1;
      if (key == 1 && attrs.length) {
        json[key = '@attributes'] = {};
        while (attr = attrs.item(++i)) {
          json[key][attr.nodeName] = attr.nodeValue;
        }
        i = -1;
      } else if (key == 3) {
        json = content.nodeValue;
      }
      while (child = children.item(++i)) {
        key = child.nodeName;
        if (json.hasOwnProperty(key)) {
          if (json.toString.call(json[key]) != '[object Array]') {
            json[key] = [json[key]];
          }
          json[key].push(this._XMLToJSON(child));
        } else {
          json[key] = this._XMLToJSON(child);
        }
      }
      return json;
    },
    _XMLToGeoJSON: function(content) {
      var xml = this._toXML(content);
      var json = this._XMLToJSON(xml);
      for (var i = 0; i < Object.keys(this.options.rootTag).length; i++) {
        json = json[this.options.rootTag[Object.keys(this.options.rootTag)[i]]];
      }
      this._simplifyJson(json);
      for (i = 0; i < this._root.data.length; i++) {
        if (!(this._root.data[i].hasOwnProperty(this.options.latitudeColumn) && this._root.data[i].hasOwnProperty(this.options.longitudeColumn))) {
          delete this._root.data[i];
        }
      }
      this._depth = this._root.data.length;
      json = this._addFeatureToJson(this._root.data);
      return this._loadGeoJSON(json);
    },
    _simplifyJson: function(json) {
      if (!(Object.prototype.toString.call(json) === '[object Array]')) {
        this.fire('data:error', {error: new Error('Try to simplify a not json array, please re-set your root tag path, ' + 'e.g. xmlRootTag:["some","pathTo","Array"], we need a json array')});
        return;
      }
      var root = {data: []};
      for (var i = 0; i < Object.keys(json).length; i++) {
        var obj = void 0;
        if (typeof json[i] === 'undefined')
          break;
        else
          obj = json[i];
        var info = {};
        try {
          var elements = void 0;
          if (Object.keys(obj).length > 1)
            elements = Object.keys(obj).toString().split(",");
          else
            elements = Object.keys(obj).toString();
          for (var element = void 0,
              k = 0; element = elements[k++]; ) {
            var key = void 0,
                value = void 0;
            if (element.toString() == "#text") {
              if (Object.prototype.toString.call(obj[element]) === '[object Array]') {
                continue;
              } else {
                key = element;
                value = obj[element]["#text"];
              }
            } else if (element.toString() == "@attributes") {
              key = Object.keys(obj[element]);
              value = obj[element][key].toString();
            } else {
              key = element;
              value = Object.keys(obj[element]).toString();
              if (value == "@attributes") {
                value = obj[element]["@attributes"][Object.keys(obj[element]["@attributes"])];
              } else if (value == "#text") {
                value = obj[element]["#text"];
              } else if (value == "@attributes,#text") {
                value = obj[element]["#text"];
                info[key] = value;
                key = Object.keys(obj[element]["@attributes"]);
                value = obj[element]["@attributes"][Object.keys(obj[element]["@attributes"])];
              } else {
                this.fire('data:error', {error: new Error('this stage can\'t be reach from the simplification of the json \n' + 'maybe the function need a update')});
                return;
              }
            }
            info[key] = value;
          }
          root.data.push(info);
        } catch (e) {
          console.error(e.message);
          this.fire('data:error', {error: new Error('Some error occurred during the simplification of the Json:' + e.message + '1\n')});
          return;
        }
        this._root = root;
      }
    },
    _mergeRdfJson: function(json) {
      try {
        var link = '';
        var mJson = [];
        var xJson;
        for (var i = 0; i < Object.keys(json).length; i++) {
          for (var k = 0; k < Object.keys(this.options.rdfLink).length; k++) {
            if (json[i].hasOwnProperty(this.options.rdfLink[Object.keys(this.options.rdfLink)[k]])) {
              link = json[i][this.options.rdfLink[k]];
              mJson.push(this._searchJsonByKeyAndValue(json, this.options.rdfAboutLink, link));
            }
          }
        }
        for (i = 0; i < Object.keys(json).length; i++) {
          if (mJson[i] != null && json[i] != null) {
            xJson = this._mergeJson(json[i], mJson[i]);
            json.push(xJson);
            delete json[json[i]];
            delete json[mJson[i]];
          }
        }
      } catch (e) {
        this.fire('data:error', {error: new Error('Some error occurred during the simplification of the Json:' + e.message)});
      }
      this._root.data = json;
    },
    _searchJsonByKeyAndValue: function(json, key, value) {
      for (var i = 0; i < json.length; i++) {
        try {
          if (json[i].hasOwnProperty(key)) {
            if (json[i][key] == value) {
              return json[i];
            }
          }
        } catch (e) {
          console.warn(e.message);
        }
      }
    },
    _mergeJson: function(json1, json2) {
      for (var key in json2)
        if (json2.hasOwnProperty(key))
          json1[key] = json2[key];
      return json1;
    },
    _removeNullJson: function(json) {
      var isArray = json instanceof Array;
      for (var k in json) {
        if (json[k] == null || typeof json[k] === 'undefined')
          isArray ? json.splice(k, 1) : delete json[k];
        else if ($traceurRuntime.typeof(json[k]) == "object")
          this._removeNullJson(json[k]);
      }
    },
    _cleanJson: function(json) {
      this._removeNullJson(json);
      var i = json.features.length;
      while (i--) {
        if (typeof json.features[i] === 'undefined' || !json.features[i].geometry.hasOwnProperty("coordinates")) {
          json.features.splice(i, 1);
        }
      }
    },
    _gtfsToGeoJSON: function(content) {
      var shapes = Papa.parse(content, {header: this.options.headers});
      shapes = shapes.data;
      var lookup = {};
      var dintintShape = [];
      for (var item = void 0,
          i = 0; item = shapes[i++]; ) {
        var name = item.shape_id;
        if (!(name in lookup)) {
          lookup[name] = 1;
          if (name.length > 0)
            dintintShape.push(name);
        }
      }
      var json = {};
      for (item, i = 0; item = dintintShape[i++]; ) {
        if (item.length > 0 && item != '') {
          json[item] = [];
          for (var k = 0; k < Object.keys(shapes).length; k++) {
            if (shapes[k].shape_id == item)
              json[item].push(shapes[k]);
          }
        }
      }
      json = {
        type: 'FeatureCollection',
        features: Object.keys(json).map(function(id) {
          return {
            type: 'Feature',
            id: id,
            properties: {shape_id: id},
            geometry: {
              type: "GeometryCollection",
              geometries: [{
                type: "MultiPoint",
                coordinates: (function() {
                  var coords = [];
                  for (var s = 0; s < Object.keys(json[id]).length; s++) {
                    coords.push([parseFloat(json[id][s].shape_pt_lon), parseFloat(json[id][s].shape_pt_lat)]);
                  }
                  return coords;
                })()
              }, {
                type: "LineString",
                coordinates: json[id].sort(function(a, b) {
                  return +a.shape_pt_sequence - b.shape_pt_sequence;
                }).map(function(coord) {
                  return [parseFloat(coord.shape_pt_lon), parseFloat(coord.shape_pt_lat)];
                })
              }]
            }
          };
        })
      };
      return this._loadGeoJSON(json);
    },
    _gtfsZipToGEOJSON: function(file) {
      parseGtfs(file, {'shapes.txt': load_shapes});
    },
    _depth: 0,
    _titles: [],
    _root: {}
  });
  L.Control.FileLayerLoad = L.Control.extend({
    statics: {
      TITLE: 'Load local file (GPX, KML, GeoJSON, CSV, RDF, XML)',
      LABEL: '&#8965;'
    },
    options: {
      position: 'topleft',
      fitBounds: true,
      layerOptions: {},
      addToMap: true,
      fileSizeLimit: 1024
    },
    initialize: function(options) {
      L.Util.setOptions(this, options);
      this.loader = null;
    },
    onAdd: function(map) {
      this.loader = new FileLoader(map, this.options);
      this.loader.on('data:loaded', function(e) {
        if (this.options.fitBounds) {
          window.setTimeout(function() {
            map.fitBounds(e.layer.getBounds());
          }, 500);
        }
      }, this);
      this._initDragAndDrop(map);
      return this._initContainer();
    },
    _initDragAndDrop: function(map) {
      var fileLoader = this.loader,
          dropbox = map._container;
      var callbacks = {
        dragenter: function() {
          map.scrollWheelZoom.disable();
        },
        dragleave: function() {
          map.scrollWheelZoom.enable();
        },
        dragover: function(e) {
          e.stopPropagation();
          e.preventDefault();
        },
        drop: function(e) {
          e.stopPropagation();
          e.preventDefault();
          var files = Array.prototype.slice.apply(e.dataTransfer.files),
              i = files.length;
          setTimeout(function() {
            fileLoader.load(files.shift());
            if (files.length > 0) {
              setTimeout(arguments.callee, 25);
            }
          }, 25);
          map.scrollWheelZoom.enable();
        }
      };
      for (var name in callbacks)
        dropbox.addEventListener(name, callbacks[name], false);
    },
    _initContainer: function() {
      var zoomName = 'leaflet-control-filelayer leaflet-control-zoom',
          barName = 'leaflet-bar',
          partName = barName + '-part',
          container = L.DomUtil.create('div', zoomName + ' ' + barName);
      var link = L.DomUtil.create('a', zoomName + '-in ' + partName, container);
      link.innerHTML = L.Control.FileLayerLoad.LABEL;
      link.href = '#';
      link.title = L.Control.FileLayerLoad.TITLE;
      var fileInput = L.DomUtil.create('input', 'hidden', container);
      fileInput.type = 'file';
      if (!this.options.formats) {
        fileInput.accept = '.gpx,.kml,.json,.geojson,.csv,.rdf,.xml,.input,.zip';
      } else {
        fileInput.accept = this.options.formats.join(',');
      }
      fileInput.style.display = 'none';
      var fileLoader = this.loader;
      fileInput.addEventListener("change", function(e) {
        fileLoader.load(this.files[0]);
        this.value = '';
      }, false);
      L.DomEvent.disableClickPropagation(link);
      L.DomEvent.on(link, 'click', function(e) {
        fileInput.click();
        e.preventDefault();
      });
      return container;
    }
  });
  L.Control.fileLayerLoad = function(options) {
    return new L.Control.FileLayerLoad(options);
  };
  return {};
});
System.get("../../../testWitSources/filelayer/leaflet.filelayer.js" + '');
//# sourceMappingURL=leaflet.filelayer.js.map
