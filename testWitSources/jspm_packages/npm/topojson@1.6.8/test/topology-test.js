/* */ 
var vows = require('vows'),
    assert = require('./assert'),
    topojson = require('../index');
var suite = vows.describe("topojson.topology");
suite.addBatch({"topology": {
    "input objects are mapped to topology.objects": function() {
      var topology = topojson.topology({
        foo: {
          type: "LineString",
          coordinates: [[.1, .2], [.3, .4]]
        },
        bar: {
          type: "Polygon",
          coordinates: [[[.5, .6], [.7, .8]]]
        }
      });
      assert.equal(topology.objects.foo.type, "LineString");
      assert.equal(topology.objects.bar.type, "Polygon");
    },
    "features are mapped to geometries": function() {
      var topology = topojson.topology({
        foo: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        },
        bar: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [[[.5, .6], [.7, .8]]]
          }
        }
      });
      assert.equal(topology.objects.foo.type, "LineString");
      assert.equal(topology.objects.bar.type, "Polygon");
    },
    "feature collections are mapped to geometry collections": function() {
      var topology = topojson.topology({collection: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [[.1, .2], [.3, .4]]
            }
          }, {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[[.5, .6], [.7, .8]]]
            }
          }]
        }});
      assert.equal(topology.objects.collection.type, "GeometryCollection");
      assert.equal(topology.objects.collection.geometries.length, 2);
      assert.equal(topology.objects.collection.geometries[0].type, "LineString");
      assert.equal(topology.objects.collection.geometries[1].type, "Polygon");
    },
    "nested geometry collections": function() {
      var topology = topojson.topology({collection: {
          type: "GeometryCollection",
          geometries: [{
            type: "GeometryCollection",
            geometries: [{
              type: "LineString",
              coordinates: [[.1, .2], [.3, .4]]
            }]
          }, {
            type: "Polygon",
            coordinates: [[[.5, .6], [.7, .8]]]
          }]
        }});
      assert.equal(topology.objects.collection.geometries[0].geometries[0].arcs.length, 1);
    },
    "null geometry objects are preserved in geometry collections": function() {
      var topology = topojson.topology({collection: {
          type: "GeometryCollection",
          geometries: [null, {
            type: "Polygon",
            coordinates: [[[.5, .6], [.7, .8]]]
          }]
        }});
      assert.equal(topology.objects.collection.type, "GeometryCollection");
      assert.equal(topology.objects.collection.geometries.length, 2);
      assert.isNull(topology.objects.collection.geometries[0].type);
      assert.equal(topology.objects.collection.geometries[1].type, "Polygon");
    },
    "features with null geometry objects are preserved in feature collections": function() {
      var topology = topojson.topology({collection: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: null
          }, {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [[[.5, .6], [.7, .8]]]
            }
          }]
        }});
      assert.equal(topology.objects.collection.type, "GeometryCollection");
      assert.equal(topology.objects.collection.geometries.length, 2);
      assert.isNull(topology.objects.collection.geometries[0].type);
      assert.equal(topology.objects.collection.geometries[1].type, "Polygon");
    },
    "top-level features with null geometry objects are preserved": function() {
      var topology = topojson.topology({feature: {
          type: "Feature",
          geometry: null
        }});
      assert.deepEqual(topology.objects, {feature: {type: null}});
    },
    "converting a feature to a geometry preserves its id": function() {
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: 42,
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }});
      assert.equal(topology.objects.foo.type, "LineString");
      assert.equal(topology.objects.foo.id, 42);
    },
    "converting a feature to a geometry does not preserve its properties by default": function() {
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {name: "George"},
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }});
      assert.isUndefined(topology.objects.foo.properties);
    },
    "a properties transform may be specified to preserve and rename properties": function() {
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {UNREASONABLY_LONG_NAME: "George"},
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }}, {"property-transform": function(o, k, v) {
          return (o[k] = v) != null;
        }});
      assert.deepEqual(topology.objects.foo.properties, {UNREASONABLY_LONG_NAME: "George"});
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {UNREASONABLY_LONG_NAME: "George"},
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }}, {"property-transform": function(o, k, v) {
          return o[k.replace(/^UNREASONABLY_LONG_/, "").toLowerCase()] = v;
        }});
      assert.deepEqual(topology.objects.foo.properties, {name: "George"});
    },
    "a properties transform can apply to geometry collections": function() {
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {UNREASONABLY_LONG_NAME: "George"},
          geometry: {
            type: "GeometryCollection",
            geometries: [{
              type: "LineString",
              coordinates: [[.1, .2], [.3, .4]]
            }]
          }
        }}, {"property-transform": function(o, k, v) {
          return o[k.replace(/^UNREASONABLY_LONG_/, "").toLowerCase()] = v;
        }});
      assert.deepEqual(topology.objects.foo.properties, {name: "George"});
    },
    "if no properties are specified, no properties are emitted": function() {
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {
            name: "George",
            demeanor: "curious"
          },
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }}, {"property-transform": function(o, k, v) {
          return k === "name" && (o[k] = v, true);
        }});
      assert.deepEqual(topology.objects.foo.properties, {name: "George"});
      var topology = topojson.topology({foo: {
          type: "Feature",
          id: "Foo",
          properties: {demeanor: "curious"},
          geometry: {
            type: "LineString",
            coordinates: [[.1, .2], [.3, .4]]
          }
        }}, {"property-transform": function(o, k, v) {
          return k === "name" && (o[k] = v, true);
        }});
      assert.deepEqual(topology.objects.foo.properties);
    },
    "the returned transform exactly encompasses the input geometry": function() {
      var topology = topojson.topology({foo: {
          type: "LineString",
          coordinates: [[1 / 8, 1 / 16], [1 / 2, 1 / 4]]
        }}, {quantization: 2});
      assert.deepEqual(topology.transform, {
        scale: [3 / 8, 3 / 16],
        translate: [1 / 8, 1 / 16]
      });
      var topology = topojson.topology({foo: {
          type: "Polygon",
          coordinates: [[[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 16]]]
        }}, {quantization: 2});
      assert.deepEqual(topology.transform, {
        scale: [3 / 8, 3 / 16],
        translate: [1 / 8, 1 / 16]
      });
    },
    "arc coordinates are integers with delta encoding": function() {
      var topology = topojson.topology({foo: {
          type: "Polygon",
          coordinates: [[[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 16]]]
        }}, {quantization: 2});
      assert.deepEqual(topology.arcs[0], [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]);
    },
    "points coordinates are integers with delta encoding": function() {
      var topology = topojson.topology({
        foo: {
          type: "Point",
          coordinates: [1 / 8, 1 / 16]
        },
        bar: {
          type: "Point",
          coordinates: [1 / 2, 1 / 4]
        }
      }, {quantization: 2});
      assert.deepEqual(topology.arcs, []);
      assert.deepEqual(topology.objects.foo, {
        type: "Point",
        coordinates: [0, 0]
      });
      assert.deepEqual(topology.objects.bar, {
        type: "Point",
        coordinates: [1, 1]
      });
      var topology = topojson.topology({foo: {
          type: "MultiPoint",
          coordinates: [[1 / 8, 1 / 16], [1 / 2, 1 / 4]]
        }}, {quantization: 2});
      assert.deepEqual(topology.arcs, []);
      assert.deepEqual(topology.objects.foo, {
        type: "MultiPoint",
        coordinates: [[0, 0], [1, 1]]
      });
    },
    "quantization rounds to the closest integer coordinate to minimize error": function() {
      var topology = topojson.topology({foo: {
          type: "LineString",
          coordinates: [[0.0, 0.0], [0.5, 0.5], [1.6, 1.6], [3.0, 3.0], [4.1, 4.1], [4.9, 4.9], [5.9, 5.9], [6.5, 6.5], [7.0, 7.0], [8.4, 8.4], [8.5, 8.5], [10, 10]]
        }}, {quantization: 11});
      assert.deepEqual(topojson.feature(topology, topology.objects.foo).geometry.coordinates, [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10]]);
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]]]);
      assert.deepEqual(topology.transform, {
        scale: [1, 1],
        translate: [0, 0]
      });
    },
    "quantization precisely preserves minimum and maximum values": function() {
      var topology = topojson.topology({foo: {
          type: "LineString",
          coordinates: [[-180, -90], [0, 0], [180, 90]]
        }}, {quantization: 3});
      assert.deepEqual(topojson.feature(topology, topology.objects.foo).geometry.coordinates, [[-180, -90], [0, 0], [180, 90]]);
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 1], [1, 1]]]);
      assert.deepEqual(topology.transform, {
        scale: [180, 90],
        translate: [-180, -90]
      });
    },
    "precision of quantization is configurable": function() {
      var topology = topojson.topology({foo: {
          type: "LineString",
          coordinates: [[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 8, 1 / 4], [1 / 2, 1 / 4]]
        }}, {quantization: 3});
      assert.deepEqual(topology.arcs[0], [[0, 0], [2, 0], [-2, 2], [2, 0]]);
      var topology = topojson.topology({foo: {
          type: "Polygon",
          coordinates: [[[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 16]]]
        }}, {quantization: 5});
      assert.deepEqual(topology.arcs[0], [[0, 0], [4, 0], [0, 4], [-4, 0], [0, -4]]);
    },
    "coincident points are removed": function() {
      var topology = topojson.topology({foo: {
          type: "LineString",
          coordinates: [[1 / 8, 1 / 16], [1 / 8, 1 / 16], [1 / 2, 1 / 4], [1 / 2, 1 / 4]]
        }}, {quantization: 2});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 1]]]);
      var topology = topojson.topology({foo: {
          type: "Polygon",
          coordinates: [[[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 16]]]
        }}, {quantization: 2});
      assert.deepEqual(topology.arcs[0], [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]);
    },
    "collapsed lines are preserved": function() {
      var topology = topojson.topology({
        foo: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 2]]
        },
        bar: {
          type: "LineString",
          coordinates: [[-80, -80], [0, 0], [80, 80]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.objects.foo, {
        type: "LineString",
        arcs: [0]
      });
      assert.deepEqual(topology.arcs[0], [[1, 1], [0, 0]]);
    },
    "collapsed lines in a MultiLineString are preserved": function() {
      var topology = topojson.topology({foo: {
          type: "MultiLineString",
          coordinates: [[[1 / 8, 1 / 16], [1 / 2, 1 / 4]], [[1 / 8, 1 / 16], [1 / 8, 1 / 16]], [[1 / 2, 1 / 4], [1 / 8, 1 / 16]]]
        }}, {quantization: 2});
      assert.equal(topology.arcs.length, 2);
      assert.deepEqual(topology.arcs[1], [[0, 0], [0, 0]]);
      assert.deepEqual(topology.arcs[0], [[0, 0], [1, 1]]);
      assert.deepEqual(topology.objects.foo.arcs, [[0], [1], [~0]]);
    },
    "collapsed polygons are preserved": function() {
      var topology = topojson.topology({
        foo: {
          type: "Polygon",
          coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
        },
        bar: {
          type: "Polygon",
          coordinates: [[[0, 0], [0, 1], [1, 1], [0, 0]]]
        },
        baz: {
          type: "MultiPoint",
          coordinates: [[-80, -80], [0, 0], [80, 80]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.objects.foo, {
        type: "Polygon",
        arcs: [[0]]
      });
      assert.deepEqual(topology.objects.bar, {
        type: "Polygon",
        arcs: [[0]]
      });
      assert.deepEqual(topology.arcs[0], [[1, 1], [0, 0], [0, 0], [0, 0]]);
    },
    "collapsed polygons in a MultiPolygon are preserved": function() {
      var topology = topojson.topology({foo: {
          type: "MultiPolygon",
          coordinates: [[[[1 / 8, 1 / 16], [1 / 2, 1 / 16], [1 / 2, 1 / 4], [1 / 8, 1 / 4], [1 / 8, 1 / 16]]], [[[1 / 8, 1 / 16], [1 / 8, 1 / 16], [1 / 8, 1 / 16], [1 / 8, 1 / 16]]], [[[1 / 8, 1 / 16], [1 / 8, 1 / 4], [1 / 2, 1 / 4], [1 / 2, 1 / 16], [1 / 8, 1 / 16]]]]
        }}, {quantization: 2});
      assert.isTrue(topology.arcs.length > 0);
      assert.isTrue(topology.arcs[0].length >= 2);
      assert.isTrue(topology.objects.foo.arcs.length === 3);
    },
    "collapsed geometries in a GeometryCollection are preserved": function() {
      var topology = topojson.topology({collection: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: []
            }
          }]
        }}, {quantization: 2});
      assert.equal(topology.arcs.length, 0);
      assert.deepEqual(topology.objects.collection, {
        type: "GeometryCollection",
        geometries: [{type: null}]
      });
    },
    "empty geometries are not removed": function() {
      var topology = topojson.topology({foo: {
          type: "MultiPolygon",
          coordinates: []
        }}, {quantization: 2});
      assert.equal(topology.arcs.length, 0);
      assert.deepEqual(topology.objects.foo, {type: null});
    },
    "empty polygons are not removed": function() {
      var topology = topojson.topology({
        foo: {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            geometry: {
              type: "MultiPolygon",
              coordinates: [[]]
            }
          }]
        },
        bar: {
          type: "Polygon",
          coordinates: []
        }
      });
      assert.equal(topology.arcs.length, 0);
      assert.deepEqual(topology.objects.foo, {
        type: "GeometryCollection",
        geometries: [{type: null}]
      });
      assert.deepEqual(topology.objects.bar, {type: null});
    },
    "the lines AB and AB share the same arc": function() {
      var topology = topojson.topology({
        ab: {
          type: "LineString",
          coordinates: [[0, 0], [0, 1]]
        },
        ba: {
          type: "LineString",
          coordinates: [[0, 0], [0, 1]]
        }
      });
      assert.deepEqual(topology.objects.ab, {
        type: "LineString",
        arcs: [0]
      });
      assert.deepEqual(topology.objects.ba, {
        type: "LineString",
        arcs: [0]
      });
    },
    "the lines AB and BA share the same arc": function() {
      var topology = topojson.topology({
        ab: {
          type: "LineString",
          coordinates: [[0, 0], [0, 1]]
        },
        ba: {
          type: "LineString",
          coordinates: [[0, 1], [0, 0]]
        }
      });
      assert.deepEqual(topology.objects.ab, {
        type: "LineString",
        arcs: [0]
      });
      assert.deepEqual(topology.objects.ba, {
        type: "LineString",
        arcs: [~0]
      });
    },
    "the lines ACD and BCD share three arcs": function() {
      var topology = topojson.topology({
        acd: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1]]
        },
        bcd: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1]]
        }
      });
      assert.deepEqual(topology.objects.acd, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.bcd, {
        type: "LineString",
        arcs: [2, 1]
      });
    },
    "the lines ACD and DCB share three arcs": function() {
      var topology = topojson.topology({
        acd: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1]]
        },
        dcb: {
          type: "LineString",
          coordinates: [[2, 1], [1, 1], [0, 1]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 2]], [[1, 2], [1, 0]], [[1, 2], [-1, 0]]]);
      assert.deepEqual(topology.objects.acd, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.dcb, {
        type: "LineString",
        arcs: [~1, 2]
      });
    },
    "the lines ACDF and BCDF share three arcs": function() {
      var topology = topojson.topology({
        acdf: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 1]]
        },
        bcdf: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0], [1, 0]], [[0, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acdf, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.bcdf, {
        type: "LineString",
        arcs: [2, 1]
      });
    },
    "the lines BCDE and BCDF share three arcs": function() {
      var topology = topojson.topology({
        bcde: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 0]]
        },
        bcdf: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 3], [1, 0], [1, 0]], [[2, 3], [1, -3]], [[2, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.bcde, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.bcdf, {
        type: "LineString",
        arcs: [0, 2]
      });
    },
    "the lines ACDE and CD share three arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        cd: {
          type: "LineString",
          coordinates: [[1, 1], [2, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0]], [[2, 3], [1, -3]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.cd, {
        type: "LineString",
        arcs: [1]
      });
    },
    "the lines ACDE and BCD share four arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        bcd: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0]], [[2, 3], [1, -3]], [[0, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.bcd, {
        type: "LineString",
        arcs: [3, 1]
      });
    },
    "the lines ACDE and CDF share four arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        cdf: {
          type: "LineString",
          coordinates: [[1, 1], [2, 1], [3, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0]], [[2, 3], [1, -3]], [[2, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.cdf, {
        type: "LineString",
        arcs: [1, 3]
      });
    },
    "the lines ACDE and BCDF share five arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        bcdf: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0]], [[2, 3], [1, -3]], [[0, 3], [1, 0]], [[2, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.bcdf, {
        type: "LineString",
        arcs: [3, 1, 4]
      });
    },
    "the lines ACDE, EDCA and ACDF share three arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        edca: {
          type: "LineString",
          coordinates: [[3, 0], [2, 1], [1, 1], [0, 0]]
        },
        acdf: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3], [1, 0]], [[2, 3], [1, -3]], [[2, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.acdf, {
        type: "LineString",
        arcs: [0, 2]
      });
      assert.deepEqual(topology.objects.edca, {
        type: "LineString",
        arcs: [~1, ~0]
      });
    },
    "the lines ACDE, ACDF and EDCA share three arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        acdf: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 1]]
        },
        edca: {
          type: "LineString",
          coordinates: [[3, 0], [2, 1], [1, 1], [0, 0]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3], [1, 0]], [[2, 3], [1, -3]], [[2, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.acdf, {
        type: "LineString",
        arcs: [0, 2]
      });
      assert.deepEqual(topology.objects.edca, {
        type: "LineString",
        arcs: [~1, ~0]
      });
    },
    "the lines ACDE, ACDF, BCDE and BCDF and their reversals share five arcs": function() {
      var topology = topojson.topology({
        acde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 0]]
        },
        acdf: {
          type: "LineString",
          coordinates: [[0, 0], [1, 1], [2, 1], [3, 1]]
        },
        bcde: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 0]]
        },
        bcdf: {
          type: "LineString",
          coordinates: [[0, 1], [1, 1], [2, 1], [3, 1]]
        },
        edca: {
          type: "LineString",
          coordinates: [[3, 0], [2, 1], [1, 1], [0, 0]]
        },
        fdca: {
          type: "LineString",
          coordinates: [[3, 1], [2, 1], [1, 1], [0, 0]]
        },
        edcb: {
          type: "LineString",
          coordinates: [[3, 0], [2, 1], [1, 1], [0, 1]]
        },
        fdcb: {
          type: "LineString",
          coordinates: [[3, 1], [2, 1], [1, 1], [0, 1]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 3]], [[1, 3], [1, 0]], [[2, 3], [1, -3]], [[2, 3], [1, 0]], [[0, 3], [1, 0]]]);
      assert.deepEqual(topology.objects.acde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.acdf, {
        type: "LineString",
        arcs: [0, 1, 3]
      });
      assert.deepEqual(topology.objects.bcde, {
        type: "LineString",
        arcs: [4, 1, 2]
      });
      assert.deepEqual(topology.objects.bcdf, {
        type: "LineString",
        arcs: [4, 1, 3]
      });
      assert.deepEqual(topology.objects.edca, {
        type: "LineString",
        arcs: [~2, ~1, ~0]
      });
      assert.deepEqual(topology.objects.fdca, {
        type: "LineString",
        arcs: [~3, ~1, ~0]
      });
      assert.deepEqual(topology.objects.edcb, {
        type: "LineString",
        arcs: [~2, ~1, ~4]
      });
      assert.deepEqual(topology.objects.fdcb, {
        type: "LineString",
        arcs: [~3, ~1, ~4]
      });
    },
    "the polygons ABCDA and BEFCB share three arcs": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
        },
        befcb: {
          type: "Polygon",
          coordinates: [[[1, 0], [2, 0], [2, 1], [1, 1], [1, 0]]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.arcs, [[[1, 0], [0, 2]], [[1, 2], [-1, 0], [0, -2], [1, 0]], [[1, 0], [1, 0], [0, 2], [-1, 0]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0, 1]]
      });
      assert.deepEqual(topology.objects.befcb, {
        type: "Polygon",
        arcs: [[2, ~0]]
      });
    },
    "the polygons ABCDA and ABCA share three arcs": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
        },
        abca: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]]
        }
      }, {quantization: 2});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 0], [0, 1]], [[1, 1], [-1, 0], [0, -1]], [[1, 1], [-1, -1]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0, 1]]
      });
      assert.deepEqual(topology.objects.abca, {
        type: "Polygon",
        arcs: [[0, 2]]
      });
    },
    "the lines ABCDE and ABDE share two arcs": function() {
      var topology = topojson.topology({
        abcde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]
        },
        abde: {
          type: "LineString",
          coordinates: [[0, 0], [1, 0], [3, 0], [4, 0]]
        }
      }, {quantization: 5});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 0]], [[1, 0], [1, 0], [1, 0]], [[3, 0], [1, 0]], [[1, 0], [2, 0]]]);
      assert.deepEqual(topology.objects.abcde, {
        type: "LineString",
        arcs: [0, 1, 2]
      });
      assert.deepEqual(topology.objects.abde, {
        type: "LineString",
        arcs: [0, 3, 2]
      });
    },
    "the polygons ABCA, ACDA and BFCB share five arcs": function() {
      var topology = topojson.topology({
        abca: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]]
        },
        acda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 1], [0, 1], [0, 0]]]
        },
        bfcb: {
          type: "Polygon",
          coordinates: [[[1, 0], [2, 1], [1, 1], [1, 0]]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 0]], [[1, 0], [0, 2]], [[1, 2], [-1, -2]], [[1, 2], [-1, 0], [0, -2]], [[1, 0], [1, 2], [-1, 0]]]);
      assert.deepEqual(topology.objects.abca, {
        type: "Polygon",
        arcs: [[0, 1, 2]]
      });
      assert.deepEqual(topology.objects.acda, {
        type: "Polygon",
        arcs: [[~2, 3]]
      });
      assert.deepEqual(topology.objects.bfcb, {
        type: "Polygon",
        arcs: [[4, ~1]]
      });
    },
    "the polygons ABCA, BEFCB and EGFE share six arcs": function() {
      var topology = topojson.topology({
        abca: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 0]]]
        },
        befcb: {
          type: "Polygon",
          coordinates: [[[1, 0], [2, 0], [2, 1], [1, 1], [1, 0]]]
        },
        egfe: {
          type: "Polygon",
          coordinates: [[[2, 0], [3, 1], [2, 1], [2, 0]]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[1, 0], [0, 3]], [[1, 3], [-1, -3], [1, 0]], [[1, 0], [1, 0]], [[2, 0], [0, 3]], [[2, 3], [-1, 0]], [[2, 0], [1, 3], [-1, 0]]]);
      assert.deepEqual(topology.objects.abca, {
        type: "Polygon",
        arcs: [[0, 1]]
      });
      assert.deepEqual(topology.objects.befcb, {
        type: "Polygon",
        arcs: [[2, 3, 4, ~0]]
      });
      assert.deepEqual(topology.objects.egfe, {
        type: "Polygon",
        arcs: [[5, ~3]]
      });
    },
    "the polygons ABCDA, ABEFGDA and BEFGDCB share three arcs": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
        },
        abefgda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [2, 0], [2, 2], [0, 2], [0, 1], [0, 0]]]
        },
        befgdcb: {
          type: "Polygon",
          coordinates: [[[1, 0], [2, 0], [2, 2], [0, 2], [0, 1], [1, 1], [1, 0]]]
        }
      }, {quantization: 3});
      assert.deepEqual(topology.arcs, [[[1, 0], [0, 1], [-1, 0]], [[0, 1], [0, -1], [1, 0]], [[1, 0], [1, 0], [0, 2], [-2, 0], [0, -1]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0, 1]]
      });
      assert.deepEqual(topology.objects.abefgda, {
        type: "Polygon",
        arcs: [[2, 1]]
      });
      assert.deepEqual(topology.objects.befgdcb, {
        type: "Polygon",
        arcs: [[2, ~0]]
      });
    },
    "the polygons ABCDA and BCDAB share one arc": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
        },
        bcdab: {
          type: "Polygon",
          coordinates: [[[1, 0], [1, 1], [0, 1], [0, 0], [1, 0]]]
        }
      }, {quantization: 2});
      assert.deepEqual(topology.arcs, [[[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0]]
      });
      assert.deepEqual(topology.objects.bcdab, {
        type: "Polygon",
        arcs: [[0]]
      });
    },
    "the polygons ABCDA-EHGFE and EFGHE share two arcs": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]], [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]
        },
        efghe: {
          type: "Polygon",
          coordinates: [[[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [3, 0], [0, 3], [-3, 0], [0, -3]], [[1, 1], [0, 1], [1, 0], [0, -1], [-1, 0]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0], [1]]
      });
      assert.deepEqual(topology.objects.efghe, {
        type: "Polygon",
        arcs: [[~1]]
      });
    },
    "the polygons ABCDA-EHGFE and FGHEF share two arcs": function() {
      var topology = topojson.topology({
        abcda: {
          type: "Polygon",
          coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]], [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]]]
        },
        fghef: {
          type: "Polygon",
          coordinates: [[[2, 1], [2, 2], [1, 2], [1, 1], [2, 1]]]
        }
      }, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 0], [3, 0], [0, 3], [-3, 0], [0, -3]], [[1, 1], [0, 1], [1, 0], [0, -1], [-1, 0]]]);
      assert.deepEqual(topology.objects.abcda, {
        type: "Polygon",
        arcs: [[0], [1]]
      });
      assert.deepEqual(topology.objects.fghef, {
        type: "Polygon",
        arcs: [[~1]]
      });
    },
    "the polygon BCDB and the line string ABE share three arcs": function() {
      var topology = topojson.topology({
        abe: {
          type: "LineString",
          coordinates: [[0, 1], [2, 1], [4, 1]]
        },
        bcdb: {
          type: "Polygon",
          coordinates: [[[2, 1], [1, 0], [3, 0], [2, 1]]]
        }
      }, {quantization: 5});
      assert.deepEqual(topology.arcs, [[[0, 4], [2, 0]], [[2, 4], [2, 0]], [[2, 4], [-1, -4], [2, 0], [-1, 4]]]);
      assert.deepEqual(topology.objects.abe, {
        type: "LineString",
        arcs: [0, 1]
      });
      assert.deepEqual(topology.objects.bcdb, {
        type: "Polygon",
        arcs: [[2]]
      });
    },
    "a polygon surrounding the South pole with a cut along the antimeridian": function() {
      var topology = topojson.topology({polygon: {
          type: "Polygon",
          coordinates: [[[-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -80]]]
        }}, {quantization: 4});
      assert.deepEqual(topology.arcs, [[[0, 3], [1, 0], [1, 0], [-2, 0]]]);
      assert.deepEqual(topology.objects.polygon, {
        type: "Polygon",
        arcs: [[0]]
      });
    },
    "a large polygon surrounding the South pole with a cut along the antimeridian": function() {
      var topology = topojson.topology({polygon: {
          type: "Polygon",
          coordinates: [[[-180, -85], [-180, -80], [-90, -80], [0, -80], [90, -80], [180, -80], [180, -85], [180, -90], [90, -90], [0, -90], [-90, -90], [-180, -90], [-180, -85]]]
        }}, {quantization: 5});
      assert.deepEqual(topology.arcs, [[[0, 4], [1, 0], [1, 0], [1, 0], [-3, 0]]]);
      assert.deepEqual(topology.objects.polygon, {
        type: "Polygon",
        arcs: [[0]]
      });
    },
    "a large polygon with a hole across the antimeridian and cut along the antimeridian": function() {
      var topology = topojson.topology({polygon: {
          type: "Polygon",
          coordinates: [[[-180, -60], [-180, -30], [-150, 0], [-180, 30], [-180, 60], [-60, 60], [60, 60], [180, 60], [180, 30], [150, 0], [180, -30], [180, -60], [60, -60], [-60, -60], [-180, -60]]]
        }}, {quantization: 8});
      assert.deepEqual(topology.arcs, [[[0, 7], [2, 0], [3, 0], [-5, 0]], [[0, 0], [5, 0], [-3, 0], [-2, 0]], [[0, 5], [6, -1], [-6, -2], [1, 2], [-1, 1]]]);
      assert.deepEqual(topology.objects.polygon, {
        type: "Polygon",
        arcs: [[0], [1], [2]]
      });
    }
  }});
suite.export(module);
