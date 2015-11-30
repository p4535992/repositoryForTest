System.registerModule("../config.js", [], function() {
  "use strict";
  var __moduleName = "../config.js";
  System.config({"paths": {
      "*": "*.js",
      "app/*": "lib/*.js",
      "github:*": "jspm_packages/github/*.js",
      "npm:*": "jspm_packages/npm/*.js"
    }});
  System.config({"map": {"csv2geojson": "github:mapbox/csv2geojson@v4.0.0"}});
  return {};
});
System.get("../config.js" + '');
//# sourceMappingURL=config.js.map
