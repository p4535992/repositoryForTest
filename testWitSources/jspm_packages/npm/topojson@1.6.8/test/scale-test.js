/* */ 
var vows = require('vows'),
    assert = require('./assert'),
    scale = require('../lib/topojson/scale');
var suite = vows.describe("scale");
suite.addBatch({"scale": {
    "with a quantized topology": {
      "scales to fit the width of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          transform: {
            scale: [1, 2],
            translate: [11, 13]
          }
        }, {
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 200, 266.666667],
          transform: {
            scale: [33.333333, 66.666667],
            translate: [0, 0]
          }
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          transform: {
            scale: [1, 2],
            translate: [11, 13]
          }
        }, {
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 200, 66.666667],
          transform: {
            scale: [33.3333333, 66.6666667],
            translate: [0, -133.333333]
          }
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          transform: {
            scale: [1, 2],
            translate: [11, 13]
          }
        }, {
          width: 200,
          margin: 20,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 20, 180, 73.3333333],
          transform: {
            scale: [26.666667, 53.333333],
            translate: [20, -86.6666667]
          }
        });
      },
      "scales to fit the height of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [13, 11, 21, 17],
          transform: {
            scale: [2, 1],
            translate: [13, 11]
          }
        }, {
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 266.666667, 200],
          transform: {
            scale: [66.666667, 33.333333],
            translate: [0, 0]
          }
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [17, 11, 19, 17],
          transform: {
            scale: [2, 1],
            translate: [13, 11]
          }
        }, {
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 66.666667, 200],
          transform: {
            scale: [66.6666667, 33.3333333],
            translate: [-133.333333, 0]
          }
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [17, 11, 19, 17],
          transform: {
            scale: [2, 1],
            translate: [13, 11]
          }
        }, {
          height: 200,
          margin: 20,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 20, 73.3333333, 180],
          transform: {
            scale: [53.333333, 26.666667],
            translate: [-86.6666667, 20]
          }
        });
      },
      "scales to fit the smaller side of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          transform: {
            scale: [1, 2],
            translate: [11, 13]
          }
        }, {
          width: 190,
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 0, 170, 200],
          transform: {
            scale: [25, 50],
            translate: [20, 0]
          }
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [13, 11, 21, 17],
          transform: {
            scale: [2, 1],
            translate: [13, 11]
          }
        }, {
          height: 190,
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 20, 200, 170],
          transform: {
            scale: [50, 25],
            translate: [0, 20]
          }
        });
      },
      "returns the expected result when the original transform origin is not [xmin,ymin]": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          transform: {
            scale: [1, 2],
            translate: [10, 11]
          }
        }, {
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 200, 266.666667],
          transform: {
            scale: [33.333333, 66.666667],
            translate: [-33.333333, -66.666667]
          }
        });
      }
    },
    "with a non-quantized topology": {
      "scales to fit the width of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          arcs: [[[11, 13], [17, 21]]]
        }, {
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 200, 266.666667],
          arcs: [[[0, 0], [200, 266.666667]]]
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          arcs: [[[11, 17], [17, 19]]]
        }, {
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 200, 66.666667],
          arcs: [[[0, 0], [200, 66.666667]]]
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          arcs: [[[11, 17], [17, 19]]]
        }, {
          width: 160,
          margin: 20,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 20, 140, 60],
          arcs: [[[20, 20], [140, 60]]]
        });
      },
      "scales to fit the height of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          arcs: [[[11, 13], [17, 21]]]
        }, {
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 150, 200],
          arcs: [[[0, 0], [150, 200]]]
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          arcs: [[[11, 17], [17, 19]]]
        }, {
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 0, 600, 200],
          arcs: [[[0, 0], [600, 200]]]
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 17, 17, 19],
          arcs: [[[11, 17], [17, 19]]]
        }, {
          height: 160,
          margin: 20,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 20, 380, 140],
          arcs: [[[20, 20], [380, 140]]]
        });
      },
      "scales to fit the smaller side of the viewport": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          arcs: [[[11, 13], [17, 21]]]
        }, {
          width: 190,
          height: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [20, 0, 170, 200],
          arcs: [[[20, 0], [170, 200]]]
        });
        assert.inDelta(scale({
          type: "Topology",
          bbox: [13, 11, 21, 17],
          arcs: [[[13, 11], [21, 17]]]
        }, {
          height: 190,
          width: 200,
          invert: false
        }), {
          type: "Topology",
          bbox: [0, 20, 200, 170],
          arcs: [[[0, 20], [200, 170]]]
        });
      },
      "inverts by default": function() {
        assert.inDelta(scale({
          type: "Topology",
          bbox: [11, 13, 17, 21],
          arcs: [[[11, 13], [17, 21]]]
        }, {width: 200}), {
          type: "Topology",
          bbox: [0, 0, 200, 266.666667],
          arcs: [[[0, 266.666667], [200, 0]]]
        });
      }
    }
  }});
suite.export(module);
