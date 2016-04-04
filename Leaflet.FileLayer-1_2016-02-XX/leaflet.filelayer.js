/*
 * Load files *locally* (GeoJSON, KML, GPX) into the map
 * using the HTML5 File API.
 *
 * Requires Pavel Shramov's GPX.js
 * https://github.com/shramov/leaflet-plugins/blob/d74d67/layer/vector/GPX.js
 *
 * Requires Pavel mholt papaparse.js
 * https://github.com/mholt/PapaParse/blob/master/papaparse.js
 *
 * Requires gildas-lormeau zip.js and mbostock d3.js only if you want to try to load zip archive of GTFS .
 * https://gildas-lormeau.github.io/zip.js/ , https://github.com/mbostock/d3
 *
 *
 * //TODO try to avoid the use of papaparse in favor of d3
 * //TODO upgrade the gtfs zip draw on the map
 *
 * BETA - JSPM  - 2016-01
 */

var FileLoader = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
        layerOptions: {},
        fileSizeLimit: 1024,
        headers: true,             //if the first line of a csv file has headers (if false launch exception)
        latitudeColumn: null,     //the default field name for the latitude coordinates...
        longitudeColumn: null,    //the default field name for the longitude coordinates...
        titleForSearch: 'title',   //for future integration with other functions...
        titlesToInspect: [],       //if you want get only some specific field from csv files...
                                   //TODO implement for XML files....
        rootTag: {root: "Root", subRoot: "Row"},  //set the Json path to the collection of json object to inspect...
                                                  //you can many subRoot e.g. '...,subRoot2:xxx,subRoot3:yyy'
                                                  //or if you prefer set a Array e.g. ["Root","Row"]

        rdfLink: [],               //if you want merge the json object created from a rdf file you can specify the property of a link...
        rdfAbout: 'rdf:about',     //the value for the property rdf:about of a rdf file...
        rdfAboutLink: 'rdf:about', //the value for the property rdf:about for linking different classes of triple...

        layer: new L.geoJson(),    //make the variable of the layer reachable from external function,
                                   // can be a L.layerGroup or a L.Feautregroup or another L.GeoJson....
        popupTable: false,          //if true all the information of the popup are pushed on a html table for a better view.
                                    //if false is saved on a json object.
        validateGeoJson: false     //if you want to validate the geojson with a ajax call...
    },

    initialize: function (map, options) {
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
            'input': this._gtfsToGeoJSON //TODO to upgrade
        };
    },

    load: function (file /* File */) {

        // Check file size
        var fileSize;
        if (typeof file == 'undefined') fileSize = 1024; //avoid a console error
        else fileSize = (file.size / 1024).toFixed(4);

        if (fileSize > this.options.fileSizeLimit) {
            this.fire('data:error', {
                error: new Error('File size exceeds limit (' + fileSize + ' > ' + this.options.fileSizeLimit + 'kb)')
            });
            return;
        }

        // Check file extension
        if (typeof file === 'undefined') { /*do nothing avoid console error*/
        }
        else {
            var ext = file.name.split('.').pop();
            FileLayerLoad.fileType = ext;
            //Check if file is a document or a archive
            if (ext == "zip") {  //if is a archive
                try {
                    this.fire('data:loading', {filename: file.name, format: ext});
                    this.fire('data:loaded', {filename: file.name, format: ext});
                }
                catch (err) {
                    this.fire('data:error', {error: err});
                    //console.error(err.stack);
                }
                //return this._gtfsZipToGEOJSON
                return this._gtfsZipToGEOJSON1(file);
            } else {
                var parser = this._parsers[ext];
                if (!parser) {  //if is a document
                    //this.fire('data:error', {error: new Error('Unsupported file type ' + file.type + '(' + ext + ')')});
                    console.error('Unsupported file type ' + file.type + '(' + ext + ')');
                    return;
                }
                // Read selected file using HTML5 File API
                var reader = new FileReader();
                reader.onload = L.Util.bind(function (e) {
                    try {
                        this.fire('data:loading', {filename: file.name, format: ext});
                        var layer = parser.call(this, e.target.result, ext);
                        this.fire('data:loaded', {layer: layer, filename: file.name, format: ext});
                    }
                    catch (err) {
                        //this.fire('data:error', {error: err});
                        console.error(err.message);
                    }
                }, this);
                reader.readAsText(file);
                return reader; //return the document
            }
        }
    },

    _loadGeoJSON: function (content) {
        if (typeof content == 'string') {
            content = JSON.parse(content);
        }

        if (this.options.layer.getLayers().length > 0) {
            //there are other information to merge to the result....
            this.options.layer.addLayer(new L.geoJson(content, this.options.layerOptions));

        } else {
            try {
                this.options.layer.addLayer(L.geoJson(content, this.options.layerOptions));
            } catch (e) {
                console.error(e.message);
            }
        }
        if (this.options.layer.getLayers().length === 0) {
            /* this.fire('data:error', {
             error: new Error('GeoJSON has no valid layers.\n' +
             'if you try to load a CSV/RDF/XML file make sure to have setted the corrected name of the columns')
             });*/
            console.error('GeoJSON has no valid layers.\n' +
                'if you try to load a CSV/RDF/XML file make sure to have setted the corrected name of the columns');
        }
        if (this.options.addToMap) {
            this.options.layer.addTo(this._map);
            //map.addLayer(layer);
        }


        FileLayerLoad.layer = this.options.layer;
        console.info('54:' + FileLayerLoad.layer);
        return this.options.layer;
    },

    _convertToGeoJSON: function (content, format) {
        // Format is either 'gpx' or 'kml'
        if (typeof content == 'string') {
            content = ( new window.DOMParser() ).parseFromString(content, "text/xml");
        }
        var geojson = toGeoJSON[format](content);
        return this._loadGeoJSON(geojson);
    },

    _csvToGeoJSON: function (content) {
        try {
            if (!this.options.headers) {
                this.fire('data:error', {error: new Error('The file CSV must have the Headers')});
            }
            var json;
            //Work with Papaparse.js
            json = Papa.parse(content, {header: this.options.headers});
            this._depth = json.data.length - 1;
            if (this.options.titlesToInspect.length == 0)this._titles = json.meta.fields;
            else this._titles = this.options.titlesToInspect;
            delete json.errors;
            delete json.meta;

            json = this._addFeatureToJson(json.data);
            return this._loadGeoJSON(json);
        } catch (e) {
            console.error(e.message);
            this.fire('data:error', {error: e});
        }
    },

    _addFeatureToJson: function (json) {
        //be sure we have a json array of object of objects
        if (json === null || typeof json === 'undefined' || Object.keys(json).length == 0) {
            console.error("Be sure to add the feature geojson to a Array or a Object of objects.");
            return;
        }
        var titles = this._titles;
        //var columnLng = this.options.longitudeColumn;
        //Get field latitude and longitude with regex expression....
        var columnLat = '';
        if(this.options.latitudeColumn){
            columnLat = this.options.latitudeColumn;
        }else {
            for (var i = 0; i < titles.length; i++) {
                if (!!titles[i].match(/(L|l)(at)(itude)?/gi)) {
                    columnLat = titles[i].toString();
                    break;
                }
            }
        }
        var columnLng='';
        if( this.options.longitudeColumn){
            columnLng = this.options.longitudeColumn;
        }else {
            for (var j = 0; j < titles.length; j++) {
                if (!!titles[j].match(/(L|l)(on|ng)(gitude)?/i)) {
                    columnLng = titles[j].toString();
                }
            }
        }

        var popupTable = this.options.popupTable;
        var arrayLatLng = [];
        json = {
            type: "FeatureCollection",
            features: Object.keys(json).map(function (id) {
                //id 0,1,2,3,4,5,.....
                var obj = json[id];
                if (obj === null || typeof obj === 'undefined' || id >= Object.keys(json).length - 1) {
                    console.warn("Ignore line ", id, " invalid data");
                    return null;
                } else {
                    //if you not have setted a specific set of columns just get everything
                    if (!titles.length > 0)titles = Object.keys(obj);

                    return {
                        type: 'Feature',
                        properties: {
                            id: id,
                            //integration for search
                            title: (function () {
                                for (var search, i = 0; search = titles[i++];) {
                                    if (titles[i] == search)  return obj[search];
                                }
                                return id;
                            })(),
                            popupContent: (function () {
                                var content = '';
                                if (popupTable) {
                                    content = '<div class="popup-content">' +
                                        '<table class="table table-striped table-bordered table-condensed">';
                                }
                                for (var title, i = 0; title = titles[i++];) {
                                    try {
                                        if (obj.hasOwnProperty(title)) {
                                            if (popupTable) {
                                                var href = '';
                                                if (obj[title].indexOf('http') === 0) {
                                                    href = '<a target="_blank" href="' + obj[title] + '">' + obj[title] + '</a>';
                                                }
                                                if (href.length > 0)content += '<tr><th>' + title + '</th><td>' + href + '</td></tr>';
                                                else content += '<tr><th>' + title + '</th><td>' + obj[title] + '</td></tr>';
                                            } else {
                                                content[title] = obj[title];
                                            }
                                        }
                                    } catch (e) {
                                        console.warn(
                                            "Undefined field for the json:"
                                            + JSON.stringify(obj) + ",Title:" + title + "->" + e.message);
                                    }
                                }//for
                                if (popupTable)content += "</table></div>";
                                return content;
                            })()
                        },
                        geometry: {
                            type: "Point",
                            coordinates: (function () {
                                //check now only the feature with correct coordinate
                                var lng = obj[columnLng].toString();
                                var lat = obj[columnLat].toString();
                                try {
                                    if (/[a-z]/.test(lng.toLowerCase()) || /[a-z]/.test(lat.toLowerCase()) ||
                                        isNaN(lng) || isNaN(lat) || !isFinite(lng) || !isFinite(lat)) {
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
                                    //try with the string
                                    console.warn("Not valid coordinates avoid this line ->" + "Coords:" + lng + "," + lat + ",id:" + id);
                                    return;
                                }
                                arrayLatLng.push(new L.LatLng(lat, lng));
                                return [lng, lat];
                            })()
                        }
                    };
                }//if obj is not null
            })
        };
        this._cleanJson(json);
        this._bounds(arrayLatLng);
        //Post for validate the geojson....
        if (this.options.validateGeoJson) {
            var xhr ='NULL';
            corslite2('http://geojsonlint.com/validate',function (message) {
                xhr = message;
            },null,'POST',json,false,'json');

            //console.warn('23:'+JSON.stringify(xhr.responseText));

            if (this._processSuccess(xhr))return json;
            else {
                //noinspection JSCheckFunctionSignatures
                console.error("The geo json generated is wrong:" + JSON.stringify(ajax.result.response, undefined, 2));
            }
        } else return json;
    },
    _processSuccess: function(xhr) {
        xhr = JSON.parse(xhr.responseText);
        //var status = xhr.message ;
        if (xhr.status === 'ok') {
            return true;
        } else if (xhr.status === 'error') {
            if (xhr.message == 'Data was not JSON serializeable.') {
                return true;//ignore this error
            } else {
                console.error('There was a problem with your GeoJSON: ' + xhr.message);
                return false;
            }
        }
    },
    _RDFToGeoJSON: function (content) {
        try {
            var xml = this._toXML(content);
            var json = this._XMLToJSON(xml);

            for (var i = 0; i < Object.keys(this.options.rootTag).length; i++) {
                json = json[this.options.rootTag[Object.keys(this.options.rootTag)[i]]];
            }

            this._simplifyJson(json);
            this._mergeRdfJson(this._root.data);
            //Filter result, get all object with at least coordinates...
            for (i = 0; i < this._root.data.length; i++) {
                if (!(this._root.data[i].hasOwnProperty(this.options.latitudeColumn) &&
                    this._root.data[i].hasOwnProperty(this.options.longitudeColumn))
                ) {
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

    _toXML: function (content) {
        var xml;
        try {
            if (window.DOMParser) {
                xml = new DOMParser().parseFromString(content, "text/xml");
            }
            else {
                try {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = false;
                    xml.validateOnParse = false;
                    xml.resolveExternals = false;
                    xml.loadXML(content);
                } catch (e) {
                    try {
                        Document.prototype.loadXML = function (s) {
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

    _XMLToJSON: function (content) {
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
            if (json.hasOwnProperty(key.toString())) {
                if (json.toString.call(json[key]) != '[object Array]') {
                    json[key] = [json[key]];
                }
                json[key].push(this._XMLToJSON(child));
            }
            else {
                json[key] = this._XMLToJSON(child);
            }
        }
        return json;
    },

    _XMLToGeoJSON: function (content) {
        var xml = this._toXML(content);
        var json = this._XMLToJSON(xml);

        for (var i = 0; i < Object.keys(this.options.rootTag).length; i++) {
            json = json[this.options.rootTag[Object.keys(this.options.rootTag)[i]]];
        }

        this._simplifyJson(json);

        //Filter result, get all object with at least coordinates...
        for (i = 0; i < this._root.data.length; i++) {
            if (!(this._root.data[i].hasOwnProperty(this.options.latitudeColumn) &&
                this._root.data[i].hasOwnProperty(this.options.longitudeColumn))
            ) {
                delete this._root.data[i];
            }
        }

        this._depth = this._root.data.length;

        json = this._addFeatureToJson(this._root.data);
        return this._loadGeoJSON(json);
    },

    _simplifyJson: function (json) {
        if (!(Object.prototype.toString.call(json) === '[object Array]')) {
            this.fire('data:error', {
                error: new Error('Try to simplify a not json array, please re-set your root tag path, ' +
                    'e.g. xmlRootTag:["some","pathTo","Array"], we need a json array')
            });
            return;
        }
        var root = {data: []};
        for (var i = 0; i < Object.keys(json).length; i++) {  //406 object
            var obj;
            if (typeof  json[i] === 'undefined')break; //read all
            else  obj = json[i];
            var info = {};
            try {
                var elements;
                if (Object.keys(obj).length > 1) elements = Object.keys(obj).toString().split(",");
                else elements = Object.keys(obj).toString();
                for (var element, k = 0; element = elements[k++];) {
                    //for (var ele in elements) {
                    //var element = elements[ele]; //@attributes
                    var key, value;
                    if (element.toString() == "#text") {
                        if (Object.prototype.toString.call(obj[element]) === '[object Array]') {
                            //key = element;
                            //value = obj[element]["#text"];
                            continue;
                        } else {
                            key = element;
                            value = obj[element]["#text"];
                        }
                    }
                    else if (element.toString() == "@attributes") {
                        key = Object.keys(obj[element]);//rdf:
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
                            //info[key] = value;
                        }
                        else {
                            //never run here.....
                            this.fire('data:error', {
                                error: new Error('this stage can\'t be reach from the simplification of the json \n' +
                                    'maybe the function need a update')
                            });
                            return;
                        }
                    }
                    info[key] = value;
                }
                root.data.push(info);
            } catch (e) {
                console.error(e.message);
                this.fire('data:error', {
                    error: new Error('Some error occurred during the simplification of the Json:' + e.message + '1\n')
                });
                return;
            }
            this._root = root;
        }//for every object on rdf description
    },

    _mergeRdfJson: function (json) {
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
            //clean and merge json object with link relations....
            for (i = 0; i < Object.keys(json).length; i++) {
                if (mJson[i] != null && json[i] != null) {
                    xJson = this._mergeJson(json[i], mJson[i]);
                    json.push(xJson);
                    delete json[json[i]];
                    delete json[mJson[i]];
                }
            }
        } catch (e) {
            this.fire('data:error', {
                error: new Error('Some error occurred during the simplification of the Json:' + e.message)
            });
        }
        this._root.data = json;
    },

    _searchJsonByKeyAndValue: function (json, key, value) {
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

    _mergeJson: function (json1, json2) {
        for (var key in json2)
            if (json2.hasOwnProperty(key))
                json1[key] = json2[key];
        return json1;
    },

    _removeNullJson: function (json) {
        // Compact arrays with null entries; delete keys from objects with null value
        var isArray = json instanceof Array;
        for (var k in json) { //type,properties,..,title,popupContent,features,..
            if ((json[k] == null || typeof json[k] === 'undefined') && json.hasOwnProperty(k)) {
                isArray ? json.splice(k, 1) : delete json[k];
            }
            else if (typeof json[k] == "object" && json.hasOwnProperty(k)) this._removeNullJson(json[k]);
        }
    },

    _cleanJson: function (json) {
        this._removeNullJson(json);
        var i = json.features.length;
        while (i--) {
            if (typeof json.features[i] === 'undefined' || !json.features[i].geometry.hasOwnProperty("coordinates")) {
                json.features.splice(i, 1);
            }
        }
    },

    _gtfsToGeoJSON: function (content) {
        var shapes = Papa.parse(content, {header: this.options.headers});
        shapes = shapes.data;
        var lookup = {};
        var dintintShape = [];
        for (var item, i = 0; item = shapes[i++];) {
            var name = item.shape_id;
            if (!(name in lookup)) {
                lookup[name] = 1;
                if (name.length > 0)dintintShape.push(name);
            }
        }
        var json = {};
        for (item, i = 0; item = dintintShape[i++];) {
            if (item.length > 0 && item != '') { //avoid null object
                json[item] = [];
                for (var k = 0; k < Object.keys(shapes).length; k++) {
                    if (shapes[k].shape_id == item)json[item].push(shapes[k]);
                }
            }
        }
        json = {
            type: 'FeatureCollection',
            features: Object.keys(json).map(function (id) {
                return {
                    type: 'Feature',
                    id: id,
                    properties: {
                        shape_id: id
                    },
                    geometry: {
                        type: "GeometryCollection",
                        geometries: [
                            {
                                type: "MultiPoint",
                                coordinates: (function () {
                                    var coords = [];
                                    for (var s = 0; s < Object.keys(json[id]).length; s++) {
                                        //noinspection JSUnresolvedVariable
                                        coords.push([
                                            parseFloat(json[id][s].shape_pt_lon),
                                            parseFloat(json[id][s].shape_pt_lat)
                                        ]);
                                    }
                                    return coords;
                                })()
                            },
                            {
                                type: "LineString",
                                coordinates: json[id].sort(function (a, b) {
                                    //noinspection JSUnresolvedVariable
                                    return +a.shape_pt_sequence - b.shape_pt_sequence;
                                }).map(function (coord) {
                                    //noinspection JSUnresolvedVariable
                                    return [
                                        parseFloat(coord.shape_pt_lon),
                                        parseFloat(coord.shape_pt_lat)
                                    ];
                                })
                            }
                        ]
                    }
                };
            })
        };
        return this._loadGeoJSON(json);
    },

    /* ************************************
     *  ty to kaezarrex () for the code :)
     ***************************************/
    _gtfsZipToGEOJSON1: function (file) {
        parseGtfs(file, {
            'shapes.txt': load_shapes
            //'stops.txt': load_stops
        });
    },
    _gtfsZipToGEOJSON2: function (file) {

        var requestFileSystem = window.webkitRequestFileSystem || window.mozRequestFileSystem || window.requestFileSystem;
        var unzipProgress = document.createElement("progress");
        //function onerror(message) {console.error(message);}
        function createTempFile(callback) {
            var tmpFilename = "tmp.dat";
            requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function (filesystem) {
                function create() {
                    filesystem.root.getFile(tmpFilename, {
                        create: true
                    }, function (zipFile) {
                        callback(zipFile);
                    });
                }
                filesystem.root.getFile(tmpFilename, null, function (entry) {
                    entry.remove(create, create);
                }, create);
            });
        }
        function download(entry) {
            return getEntryFile(entry, 'RAM', function (blobURL) {
                if (unzipProgress.parentNode)
                    unzipProgress.parentNode.removeChild(unzipProgress);
                unzipProgress.value = 0;
                unzipProgress.max = 0;
            }, function (current, total) {
                unzipProgress.value = current;
                unzipProgress.max = total;
            });
        }
        function getEntryFile(entry, creationMethod, onend, onprogress) {
            var URL = entry.webkitURL || entry.mozURL || entry.URL;
            var writer, zipFileEntry;
            function getData() {
                entry.getData(writer, function (blob) {
                    var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
                    onend(blobURL);
                }, onprogress);
            }
            if (creationMethod == "Blob") {
                writer = new zip.BlobWriter();
                getData();
            } else {
                createTempFile(function (fileEntry) {
                    zipFileEntry = fileEntry;
                    writer = new zip.FileWriter(zipFileEntry);
                    getData();
                });
            }
        }

        var readEntry = function (entry, onend, onprogress) {
            console.log('15:'+JSON.stringify(onend));
            //return download(entry);
            //don't know why this isn't work.
            return entry.getData(new zip.TextWriter(), onend, onprogress);
        };

        var getEntries = function (file, callback) {
            try {
                zip.createReader(new zip.BlobReader(file), function (zipReader) {
                    return zipReader.getEntries(callback);
                }, onerror);
            } catch (e) {
                console.error(e.message);
            }
        };

        var mapEntries = function (entries,callbackMap) {
            var feedFiles = d3.map();
            var cbMap = d3.map(callbackMap);
            //console.warn(JSON.stringify(entries));

            entries.forEach(function (entry) {
                //console.log(JSON.stringify('08:'+entry.filename));
                feedFiles.set(entry.filename, entry);
            });

            var markers  = cbMap;
            cbMap = [];
            cbMap.push(markers);

            cbMap.forEach(function (fileName, callback) {
                //console.log('11:'+JSON.stringify(fileName)+','+JSON.stringify(callback));
                /* if (feedFiles.has(fileName)) {
                 console.log('12:'+JSON.stringify(fileName));
                 readEntry(feedFiles.get(fileName),callback);
                 return callback;
                 }
                 else console.warn(fileName + ' does not exist');*/
                for (var single in fileName) {
                    var keys = Object.keys(feedFiles); //return array....
                    if (fileName.hasOwnProperty(single) && keys.indexOf(single)!= -1) {
                        console.log('14:'+JSON.stringify(feedFiles[single]));
                        var actions = {'shapes.txt':load_shapes};
                        return readEntry(feedFiles[single],actions);
                        //return readtemporaryContentZip(callback,'shapes.txt')
                    }else{
                        console.warn(single + 'does not exist');
                    }
                }
            });

            /*  entries.forEach(function (entry) {
             console.log(JSON.stringify('10:'+entry.filename));
             feedFiles.set(entry.filename, entry);
             });

             for (var fileName in callbackMap) {
             if (callbackMap.hasOwnProperty(fileName) && feedFiles.has(fileName)) {
             console.log('11:'+JSON.stringify(fileName));
             //return readEntry(feedFiles.get(fileName),callbackMap);
             }else{
             console.warn(fileName + ' does not exist');
             }
             }*/



        };
        //NOT WORK
        getEntries(file, function (entries) {
            console.log(JSON.stringify(entries));
            /* mapEntries(entries, {
             'shapes.txt': load_shapes(file)
             //'stops.txt': load_stops
             });*/
            mapEntries(entries, {'shapes.txt': file});
            //console.log(JSON.stringify(csv));
        });

        var feature,stopMarker,shapeHusk,stopHusk,minLat,maxLat,minLng,maxLng;
        var strokeWidth = 3;

        try {
            var svg =
                    d3.select(map.getPanes().overlayPane).append("svg"),
                stopHuskGroup = svg.append("g").attr("class", "stop-husk-group leaflet-zoom-hide"),
                shapeHuskGroup = svg.append("g").attr("class", "shape-husk-group leaflet-zoom-hide"),
                stopGroup = svg.append("g").attr("class", "stop-group leaflet-zoom-hide"),
                shapeGroup = svg.append("g").attr("class", "shape-group leaflet-zoom-hide");
        } catch (e) {
            console.warn(e.message);
        }

        var pointCache = {};
        var projectPoint = function (point) {
            var key = point[0] + ',' + point[1];
            if (pointCache[key] === undefined) {
                pointCache[key] = map.latLngToLayerPoint(new L.LatLng(point[0], point[1]));
            }
            return pointCache[key];
        };

        try {
            var color = d3.scale.category20();
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var line = d3.svg.line()
                .x(function (d) {
                    return projectPoint([d.lat, d.lon]).x;
                })
                .y(function (d) {
                    return projectPoint([d.lat, d.lon]).y;
                });
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var drawShapes = function (shapeRows) {
                pointCache = {};

                var shapes = shapeRows.reduce(combineShapeRows);

                var lats = shapeRows.map(function (shape) {
                    return shape.lat
                });
                var lngs = shapeRows.map(function (shape) {
                    return shape.lon
                });
                minLat = d3.min(lats);
                minLng = d3.min(lngs);
                maxLat = d3.max(lats);
                maxLng = d3.max(lngs);

                var topLeft = projectPoint([maxLat, minLng]);
                var bottomRight = projectPoint([minLat, maxLng]);

                var southWest = L.latLng(minLat, minLng);
                var northEast = L.latLng(maxLat, maxLng);
                var bounds = L.latLngBounds(southWest, northEast);

                topLeft.x = topLeft.x - strokeWidth;
                topLeft.y = topLeft.y - strokeWidth;
                bottomRight.x = bottomRight.x + strokeWidth;
                bottomRight.y = bottomRight.y + strokeWidth;

                svg.attr("width", bottomRight.x - topLeft.x)
                    .attr("height", bottomRight.y - topLeft.y)
                    .style("left", topLeft.x + "px")
                    .style("top", topLeft.y + "px");

                shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
                shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

                shapeHusk = shapeHuskGroup.selectAll('.husk')
                    .data(d3.entries(shapes), function (d) {
                        return d.key;
                    });

                shapeHusk.enter().append('path')
                    .attr('class', 'husk')
                    .attr("d", function (d) {
                        return line(d.value);
                    })
                    .style({
                        fill: 'none',
                        'stroke': '#fff',
                        'stroke-width': strokeWidth * 2,
                        'stroke-opacity': 1
                    });

                shapeHusk.exit().remove();

                feature = shapeGroup.selectAll('.feature')
                    .data(d3.entries(shapes), function (d) {
                        return d.key;
                    });

                feature.enter().append('path')
                    .attr('class', 'feature')
                    .attr('d', function (d) {
                        return line(d.value);
                    })
                    .style('stroke', function (d, i) {
                        return color(i);
                    })
                    .style({
                        fill: 'none',
                        'stroke-width': strokeWidth,
                        'stroke-opacity': 0.5
                    });

                feature.exit().remove();

                map.fitBounds(bounds);
            };
        } catch (e) {
            console.warn(e.message);
        }
        try {
            var resetShapes = function () {
                pointCache = {};

                strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

                var topLeft = projectPoint([maxLat, minLng]);
                var bottomRight = projectPoint([minLat, maxLng]);

                topLeft.x = topLeft.x - strokeWidth;
                topLeft.y = topLeft.y - strokeWidth;
                bottomRight.x = bottomRight.x + strokeWidth;
                bottomRight.y = bottomRight.y + strokeWidth;

                svg.attr("width", bottomRight.x - topLeft.x)
                    .attr("height", bottomRight.y - topLeft.y)
                    .style("left", topLeft.x + "px")
                    .style("top", topLeft.y + "px");

                shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
                shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

                shapeHusk.attr("d", function (d) {
                        return line(d.value);
                    })
                    .style({'stroke-width': strokeWidth * 2});

                feature.attr("d", function (d) {
                        return line(d.value);
                    })
                    .style({'stroke-width': strokeWidth});
            };
        } catch (e) {
            console.warn(e.message);
        }
        try {
            var drawStops = function (data) {
                pointCache = {};

                var lats = data.map(function (stop) {
                    return stop.lat
                });
                var lngs = data.map(function (stop) {
                    return stop.lon
                });

                var topLeft = projectPoint([d3.max(lats), d3.min(lngs)]);
                var bottomRight = projectPoint([d3.min(lats), d3.max(lngs)]);

                topLeft.x = topLeft.x - strokeWidth;
                topLeft.y = topLeft.y - strokeWidth;
                bottomRight.x = bottomRight.x + strokeWidth;
                bottomRight.y = bottomRight.y + strokeWidth;

                stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
                stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

                stopHusk = stopHuskGroup.selectAll('.stop-husk')
                    .data(data, function (d) {
                        return d.id;
                    });

                stopHusk.enter().append('circle')
                    .attr('class', 'stop-husk')
                    .attr('r', strokeWidth * 2)
                    .attr('cx', function (d) {
                        return projectPoint([d.lat, d.lon]).x;
                    })
                    .attr('cy', function (d) {
                        return projectPoint([d.lat, d.lon]).y;
                    })
                    .style('fill', '#fff');

                stopHusk.exit().remove();

                stopMarker = stopGroup.selectAll('.stop')
                    .data(data, function (d) {
                        return d.id;
                    });

                stopMarker.enter().append('circle')
                    .attr('class', 'stop')
                    .attr('r', strokeWidth)
                    .attr('cx', function (d) {
                        return projectPoint([d.lat, d.lon]).x;
                    })
                    .attr('cy', function (d) {
                        return projectPoint([d.lat, d.lon]).y;
                    })
                    .style('fill', '#35A9FC');

                stopMarker.exit().remove();
            };
        } catch (e) {
            console.warn(e.message);
        }
        try {
            var resetStops = function () {
                pointCache = {};

                strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

                var topLeft = projectPoint([maxLat, minLng]);
                var bottomRight = projectPoint([minLat, maxLng]);

                topLeft.x = topLeft.x - strokeWidth;
                topLeft.y = topLeft.y - strokeWidth;
                bottomRight.x = bottomRight.x + strokeWidth;
                bottomRight.y = bottomRight.y + strokeWidth;

                stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
                stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

                stopHusk.attr('r', strokeWidth * 2)
                    .attr('cx', function (d) {
                        return projectPoint([d.lat, d.lon]).x;
                    })
                    .attr('cy', function (d) {
                        return projectPoint([d.lat, d.lon]).y;
                    });

                stopMarker.attr('r', strokeWidth)
                    .attr('cx', function (d) {
                        return projectPoint([d.lat, d.lon]).x;
                    })
                    .attr('cy', function (d) {
                        return projectPoint([d.lat, d.lon]).y;
                    })
            };
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var cleanShapeRow = function (row) {
                return {
                    id: row.shape_id,
                    lat: parseFloat(row.shape_pt_lat),
                    lon: parseFloat(row.shape_pt_lon),
                    sequence: row.shape_pt_sequence
                };
            };
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var cleanStopRow = function (row) {
                return {
                    id: row.stop_id,
                    code: row.stop_code,
                    lat: parseFloat(row.stop_lat),
                    lon: parseFloat(row.stop_lon),
                    name: row.stop_name
                };
            };
        } catch (e) {
            console.warn(e.message);
        }
        try {
            var combineShapeRows = function (previous, current, index) {
                if (index === 1) {
                    var tmp = {};
                    tmp[previous.id] = [previous];
                    previous = tmp;
                }

                if (!previous.hasOwnProperty(current.id)) {
                    previous[current.id] = [];
                }

                previous[current.id].push(current);
                return previous;
            };
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var load_shapes = function (csv) {
                var data = d3.csv.parse(csv, cleanShapeRow);
                drawShapes(data);
            };
        } catch (e) {
            console.warn(e.message);
        }

        try {
            var load_stops = function (csv) {
                console.warn(JSON.stringify(csv));
                var data = d3.csv.parse(csv, cleanStopRow);
                drawStops(data);
            };
        } catch (e) {
            console.warn(e.message);
        }

        /* map.on('viewreset', function () {
         resetShapes();
         //resetStops();
         });*/
    },
    /*feature: {},
     stopMarker:{},
     shapeHusk:{},
     stopHusk:{},
     minLat:{},
     maxLat:{},
     minLng:{},
     maxLng:{},
     strokeWidth:3,
     svg: function () {
     try {
     this.svg = d3.select(map.getPanes().overlayPane).append("svg"),
     this.stopHuskGroup = this.svg.append("g").attr("class", "stop-husk-group leaflet-zoom-hide"),
     this.shapeHuskGroup = this.svg.append("g").attr("class", "shape-husk-group leaflet-zoom-hide"),
     this.stopGroup = this.svg.append("g").attr("class", "stop-group leaflet-zoom-hide"),
     this.shapeGroup = this.svg.append("g").attr("class", "shape-group leaflet-zoom-hide");
     } catch (e) {
     console.warn(e.message);
     }
     },
     stopHuskGroup: {},
     shapeHuskGroup: {},
     stopGroup: {},
     shapeGroup: {},
     pointCache: {},
     projectPoint: function(point) {
     var key = point[0] + ',' + point[1];
     if (this.pointCache[key] === undefined) {
     this.pointCache[key] = map.latLngToLayerPoint(new L.LatLng(point[0], point[1]));
     }
     return this.pointCache[key];
     },
     color: function(){
     return d3.scale.category20()
     },
     line: function() {
     d3.svg.line()
     .x(function (d) {
     return this.projectPoint([d.lat, d.lon]).x;
     })
     .y(function (d) {
     return this.projectPoint([d.lat, d.lon]).y;
     })
     },
     drawShapes: function (shapeRows) {
     this.pointCache = {};

     var shapes = shapeRows.reduce(this.combineShapeRows);

     var lats = shapeRows.map(function (shape) {
     return shape.lat
     });
     var lngs = shapeRows.map(function (shape) {
     return shape.lon
     });
     this.minLat = d3.min(lats);
     this.minLng = d3.min(lngs);
     this.maxLat = d3.max(lats);
     this.maxLng = d3.max(lngs);

     var topLeft = this.projectPoint([maxLat, minLng]);
     var bottomRight = this.projectPoint([minLat, maxLng]);

     var southWest = L.latLng(minLat, minLng);
     var northEast = L.latLng(maxLat, maxLng);
     var bounds = L.latLngBounds(southWest, northEast);

     topLeft.x = topLeft.x - strokeWidth;
     topLeft.y = topLeft.y - strokeWidth;
     bottomRight.x = bottomRight.x + strokeWidth;
     bottomRight.y = bottomRight.y + strokeWidth;

     this.svg.attr("width", bottomRight.x - topLeft.x)
     .attr("height", bottomRight.y - topLeft.y)
     .style("left", topLeft.x + "px")
     .style("top", topLeft.y + "px");

     this.shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
     this.shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

     this.shapeHusk = this.shapeHuskGroup.selectAll('.husk')
     .data(d3.entries(shapes), function (d) {
     return d.key;
     });

     this.shapeHusk.enter().append('path')
     .attr('class', 'husk')
     .attr("d", function (d) {
     return line(d.value);
     })
     .style({
     fill: 'none',
     'stroke': '#fff',
     'stroke-width': this.strokeWidth * 2,
     'stroke-opacity': 1
     });

     this.shapeHusk.exit().remove();

     this.feature = this.shapeGroup.selectAll('.feature')
     .data(d3.entries(shapes), function (d) {
     return d.key;
     });

     this.feature.enter().append('path')
     .attr('class', 'feature')
     .attr('d', function (d) {
     return this.line(d.value);
     })
     .style('stroke', function (d, i) {
     return this.color(i);
     })
     .style({
     fill: 'none',
     'stroke-width': this.strokeWidth,
     'stroke-opacity': 0.5
     });

     this.feature.exit().remove();

     map.fitBounds(bounds);
     },
     resetShapes: function () {
     this.pointCache = {};

     this.strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

     var topLeft = this.projectPoint([this.maxLat, this.minLng]);
     var bottomRight = this.projectPoint([this.minLat, this.maxLng]);

     topLeft.x = topLeft.x - this.strokeWidth;
     topLeft.y = topLeft.y - this.strokeWidth;
     bottomRight.x = bottomRight.x + this.strokeWidth;
     bottomRight.y = bottomRight.y + this.strokeWidth;

     this.svg.attr("width", bottomRight.x - topLeft.x)
     .attr("height", bottomRight.y - topLeft.y)
     .style("left", topLeft.x + "px")
     .style("top", topLeft.y + "px");

     this.shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
     this.shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

     this.shapeHusk.attr("d", function (d) {
     return this.line(d.value);
     })
     .style({'stroke-width': this.strokeWidth * 2});

     this.feature.attr("d", function (d) {
     return this.line(d.value);
     })
     .style({'stroke-width': this.strokeWidth});
     },
     drawStops: function(data) {
     this.pointCache = {};

     var lats = data.map(function(stop) { return stop.lat });
     var lngs = data.map(function(stop) { return stop.lon });

     var topLeft = this.projectPoint([d3.max(lats), d3.min(lngs)]);
     var bottomRight = this.projectPoint([d3.min(lats), d3.max(lngs)]);

     topLeft.x = topLeft.x - this.strokeWidth;
     topLeft.y = topLeft.y - this.strokeWidth;
     bottomRight.x = bottomRight.x + this.strokeWidth;
     bottomRight.y = bottomRight.y + this.strokeWidth;

     this.stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
     this.stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

     this.stopHusk = this.stopHuskGroup.selectAll('.stop-husk')
     .data(data, function(d) { return d.id; });

     this.stopHusk.enter().append('circle')
     .attr('class', 'stop-husk')
     .attr('r', this.strokeWidth * 2)
     .attr('cx', function(d) { return this.projectPoint([d.lat, d.lon]).x; })
     .attr('cy', function(d) { return this.projectPoint([d.lat, d.lon]).y; })
     .style('fill', '#fff');

     this.stopHusk.exit().remove();

     this.stopMarker = this.stopGroup.selectAll('.stop')
     .data(data, function(d) { return d.id; });

     this.stopMarker.enter().append('circle')
     .attr('class', 'stop')
     .attr('r', this.strokeWidth)
     .attr('cx', function(d) { return this.projectPoint([d.lat, d.lon]).x; })
     .attr('cy', function(d) { return this.projectPoint([d.lat, d.lon]).y; })
     .style('fill', '#35A9FC');

     this.stopMarker.exit().remove();
     },
     resetStops: function () {
     this.pointCache = {};

     this.strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

     var topLeft = this.projectPoint([this.maxLat, this.minLng]);
     var bottomRight = this.projectPoint([this.minLat, this.maxLng]);

     topLeft.x = topLeft.x - this.strokeWidth;
     topLeft.y = topLeft.y - this.strokeWidth;
     bottomRight.x = bottomRight.x + this.strokeWidth;
     bottomRight.y = bottomRight.y + this.strokeWidth;

     this.stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
     this.stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

     this.stopHusk.attr('r', this.strokeWidth * 2)
     .attr('cx', function (d) {
     return this.projectPoint([d.lat, d.lon]).x;
     })
     .attr('cy', function (d) {
     return this.projectPoint([d.lat, d.lon]).y;
     });

     this.stopMarker.attr('r', this.strokeWidth)
     .attr('cx', function (d) {
     return this.projectPoint([d.lat, d.lon]).x;
     })
     .attr('cy', function (d) {
     return this.projectPoint([d.lat, d.lon]).y;
     })
     },
     cleanShapeRow: function(row) {
     return {
     id: row.shape_id,
     lat: parseFloat(row.shape_pt_lat),
     lon: parseFloat(row.shape_pt_lon),
     sequence: row.shape_pt_sequence
     };
     },
     cleanStopRow: function(row) {
     return {
     id: row.stop_id,
     code: row.stop_code,
     lat: parseFloat(row.stop_lat),
     lon: parseFloat(row.stop_lon),
     name: row.stop_name
     };
     },
     combineShapeRows: function(previous, current, index) {
     if (index === 1) {
     var tmp = {};
     tmp[previous.id] = [previous];
     previous = tmp;
     }

     if (!previous.hasOwnProperty(current.id)) {
     previous[current.id] = [];
     }

     previous[current.id].push(current);
     return previous;
     },
     load_shapes: function(csv) {
     var data = d3.csv.parse(csv, this.cleanShapeRow);
     this.drawShapes(data);
     },

     load_stops: function(csv) {
     var data = d3.csv.parse(csv, this.cleanStopRow);
     this.drawStops(data);
     },*/
    /*  future integration with ajax call */
    _depth: 0,
    _titles: [],
    _root: {},
    _bounds: function (arrayLatLng) {
        FileLayerLoad.newBounds = new L.LatLngBounds(arrayLatLng)
    }
});


FileLayerLoad = {};
FileLayerLoad.layer = {};
FileLayerLoad.fileType = '';
FileLayerLoad.newBounds = {};

L.Control.FileLayerLoad = L.Control.extend({
    statics: {
        TITLE: 'Load local file (GPX, KML, GeoJSON, CSV, RDF, XML)',
        LABEL: '&#8965;',
    },
    options: {
        position: 'topleft',
        fitBounds: true,
        layerOptions: {},
        addToMap: true,
        fileSizeLimit: 1024
    },

    initialize: function (options) {
        L.Util.setOptions(this, options);
        this.loader = null;
    },

    onAdd: function (map) {
        this.loader = new FileLoader(map, this.options);

        this.loader.on('data:loaded', function (e) {

            if (e.layer == undefined) {
                var layerDefault = L.layerGroup([new L.Marker([0.0])]);
                map.addLayer(layerDefault);
            }
            // Fit bounds after loading
            if (this.options.fitBounds) {
                window.setTimeout(function () {
                    try {
                        map.fitBounds(e.layer.getBounds());
                    } catch (e) {
                        //TODO try to solve this issue 'map.getPanes is not a function'
                        try {
                            //we set the bound manually from the list pof marker we put on the map....
                            map.fitBounds(FileLayerLoad.newBounds);
                        } catch (e) {
                            //we just put some fixed coordinates for make the map still working....
                            console.error(e.message);
                            map.fitBounds(new L.LatLngBounds(L.LatLng([11, 34])));
                        }
                    }
                }, 500);
            }
        }, this);


        // Initialize Drag-and-drop
        this._initDragAndDrop(map);

        // Initialize map control
        return this._initContainer();
    },

    _initDragAndDrop: function (map) {
        var fileLoader = this.loader,
            dropbox = map._container;

        var callbacks = {
            dragenter: function () {
                map.scrollWheelZoom.disable();
            },
            dragleave: function () {
                map.scrollWheelZoom.enable();
            },
            dragover: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            drop: function (e) {
                e.stopPropagation();
                e.preventDefault();

                var files = Array.prototype.slice.apply(e.dataTransfer.files),
                    i = files.length;
                setTimeout(function () {
                    fileLoader.load(files.shift());
                    if (files.length > 0) {
                        setTimeout(arguments.callee, 25);
                    }
                }, 25);
                map.scrollWheelZoom.enable();
            }
        };
        for (var name in callbacks) {
            //noinspection JSUnfilteredForInLoop
            dropbox.addEventListener(name, callbacks[name], false);
        }


    },

    _initContainer: function () {
        // Create a button, and bind click on hidden file input
        var zoomName = 'leaflet-control-filelayer leaflet-control-zoom',
            barName = 'leaflet-bar',
            partName = barName + '-part',
            container = L.DomUtil.create('div', zoomName + ' ' + barName);
        var link = L.DomUtil.create('a', zoomName + '-in ' + partName, container);
        link.innerHTML = L.Control.FileLayerLoad.LABEL;
        link.href = '#';
        link.title = L.Control.FileLayerLoad.TITLE;

        // Create an invisible file input
        var fileInput = L.DomUtil.create('input', 'hidden', container);
        fileInput.type = 'file';
        if (!this.options.formats) {
            fileInput.accept = '.gpx,.kml,.json,.geojson,.csv,.rdf,.xml,.input,.zip';
        } else {
            fileInput.accept = this.options.formats.join(',');
        }
        fileInput.style.display = 'none';
        // Load on file change
        var fileLoader = this.loader;
        fileInput.addEventListener("change", function (e) {
            fileLoader.load(this.files[0]);
            // reset so that the user can upload the same file again if they want to
            this.value = '';
        }, false);

        L.DomEvent.disableClickPropagation(link);
        L.DomEvent.on(link, 'click', function (e) {
            fileInput.click();
            e.preventDefault();
        });
        return container;
    }
});

L.Control.fileLayerLoad = function (options) {
    return new L.Control.FileLayerLoad(options);
};


/*
(function () {

    //zip.workerScriptsPath = './lib/zip';

    var readEntry = function (entry, onend, onprogress) {
        entry.getData(new zip.TextWriter(), onend, onprogress);
    };

    var getEntries = function (file, callback) {
        zip.createReader(new zip.BlobReader(file), function (zipReader) {
            zipReader.getEntries(callback);
        }, onerror);
    };

    var mapEntries = function (entries, callbackMap) {
        var feedFiles = d3.map();
        var cbMap = d3.map(callbackMap);

        entries.forEach(function (entry) {
            feedFiles.set(entry.filename, entry);
        });

        cbMap.forEach(function (filename, callback) {
            if (feedFiles.has(filename)) readEntry(feedFiles.get(filename), callback);
            else console.error(filename + ' does not exist');
        });
    };

    window.parseGtfs = function (file, actions) {
        getEntries(file, function (entries) {
            mapEntries(entries, actions);
        });
    };

})();
*/

/*
var feature;
var stopMarker;
var shapeHusk;
var stopHusk;
var minLat;
var maxLat;
var minLng;
var maxLng;

var strokeWidth = 3;

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    stopHuskGroup = svg.append("g").attr("class", "stop-husk-group leaflet-zoom-hide"),
    shapeHuskGroup = svg.append("g").attr("class", "shape-husk-group leaflet-zoom-hide"),
    stopGroup = svg.append("g").attr("class", "stop-group leaflet-zoom-hide"),
    shapeGroup = svg.append("g").attr("class", "shape-group leaflet-zoom-hide");

var pointCache = {};
var projectPoint = function(point) {
    var key = point[0] + ',' + point[1];
    if (pointCache[key] === undefined) {
        pointCache[key] = map.latLngToLayerPoint(new L.LatLng(point[0], point[1]));
    }
    return pointCache[key];
};

var color = d3.scale.category20();

var line = d3.svg.line()
    .x(function(d) { return projectPoint([d.lat, d.lon]).x; })
    .y(function(d) { return projectPoint([d.lat, d.lon]).y; });

var drawShapes = function(shapeRows) {
    pointCache = {};

    var shapes = shapeRows.reduce(combineShapeRows);

    var lats = shapeRows.map(function(shape) { return shape.lat });
    var lngs = shapeRows.map(function(shape) { return shape.lon });
    minLat = d3.min(lats);
    minLng = d3.min(lngs);
    maxLat = d3.max(lats);
    maxLng = d3.max(lngs);

    var topLeft = projectPoint([maxLat, minLng]);
    var bottomRight = projectPoint([minLat, maxLng]);

    var southWest = L.latLng(minLat, minLng);
    var northEast = L.latLng(maxLat, maxLng);
    var bounds = L.latLngBounds(southWest, northEast);

    topLeft.x = topLeft.x - strokeWidth;
    topLeft.y = topLeft.y - strokeWidth;
    bottomRight.x = bottomRight.x + strokeWidth;
    bottomRight.y = bottomRight.y + strokeWidth;

    svg.attr("width", bottomRight.x - topLeft.x)
        .attr("height", bottomRight.y - topLeft.y)
        .style("left", topLeft.x + "px")
        .style("top", topLeft.y + "px");

    shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
    shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

    shapeHusk = shapeHuskGroup.selectAll('.husk')
        .data(d3.entries(shapes), function(d) { return d.key; });

    shapeHusk.enter().append('path')
        .attr('class', 'husk')
        .attr("d", function(d) { return line(d.value); })
        .style({
            fill: 'none',
            'stroke': '#fff',
            'stroke-width': strokeWidth * 2,
            'stroke-opacity': 1
        });

    shapeHusk.exit().remove();

    feature = shapeGroup.selectAll('.feature')
        .data(d3.entries(shapes), function(d) { return d.key; });

    feature.enter().append('path')
        .attr('class', 'feature')
        .attr('d', function(d) { return line(d.value); })
        .style('stroke', function(d, i) { return color(i); })
        .style({
            fill: 'none',
            'stroke-width': strokeWidth,
            'stroke-opacity': 0.5
        });

    feature.exit().remove();

    map.fitBounds(bounds);
};

var resetShapes = function() {
    pointCache = {};

    strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

    var topLeft = projectPoint([maxLat, minLng]);
    var bottomRight = projectPoint([minLat, maxLng]);

    topLeft.x = topLeft.x - strokeWidth;
    topLeft.y = topLeft.y - strokeWidth;
    bottomRight.x = bottomRight.x + strokeWidth;
    bottomRight.y = bottomRight.y + strokeWidth;

    svg.attr("width", bottomRight.x - topLeft.x)
        .attr("height", bottomRight.y - topLeft.y)
        .style("left", topLeft.x + "px")
        .style("top", topLeft.y + "px");

    shapeHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
    shapeGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

    shapeHusk.attr("d", function(d) { return line(d.value); })
        .style({'stroke-width': strokeWidth * 2});

    feature.attr("d", function(d) { return line(d.value); })
        .style({'stroke-width': strokeWidth});
};

var drawStops = function(data) {
    pointCache = {};

    var lats = data.map(function(stop) { return stop.lat });
    var lngs = data.map(function(stop) { return stop.lon });

    var topLeft = projectPoint([d3.max(lats), d3.min(lngs)]);
    var bottomRight = projectPoint([d3.min(lats), d3.max(lngs)]);

    topLeft.x = topLeft.x - strokeWidth;
    topLeft.y = topLeft.y - strokeWidth;
    bottomRight.x = bottomRight.x + strokeWidth;
    bottomRight.y = bottomRight.y + strokeWidth;

    stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
    stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

    stopHusk = stopHuskGroup.selectAll('.stop-husk')
        .data(data, function(d) { return d.id; });

    stopHusk.enter().append('circle')
        .attr('class', 'stop-husk')
        .attr('r', strokeWidth * 2)
        .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
        .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
        .style('fill', '#fff');

    stopHusk.exit().remove();

    stopMarker = stopGroup.selectAll('.stop')
        .data(data, function(d) { return d.id; });

    stopMarker.enter().append('circle')
        .attr('class', 'stop')
        .attr('r', strokeWidth)
        .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
        .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
        .style('fill', '#35A9FC');

    stopMarker.exit().remove();
};

var resetStops = function() {
    pointCache = {};

    strokeWidth = map.getZoom() < 9 ? 1 : (map.getZoom() - 8);

    var topLeft = projectPoint([maxLat, minLng]);
    var bottomRight = projectPoint([minLat, maxLng]);

    topLeft.x = topLeft.x - strokeWidth;
    topLeft.y = topLeft.y - strokeWidth;
    bottomRight.x = bottomRight.x + strokeWidth;
    bottomRight.y = bottomRight.y + strokeWidth;

    stopHuskGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");
    stopGroup.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

    stopHusk.attr('r', strokeWidth * 2)
        .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
        .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; });

    stopMarker.attr('r', strokeWidth)
        .attr('cx', function(d) { return projectPoint([d.lat, d.lon]).x; })
        .attr('cy', function(d) { return projectPoint([d.lat, d.lon]).y; })
};

var cleanShapeRow = function(row) {
    return {
        id: row.shape_id,
        lat: parseFloat(row.shape_pt_lat),
        lon: parseFloat(row.shape_pt_lon),
        sequence: row.shape_pt_sequence
    };
};

var cleanStopRow = function(row) {
    return {
        id: row.stop_id,
        code: row.stop_code,
        lat: parseFloat(row.stop_lat),
        lon: parseFloat(row.stop_lon),
        name: row.stop_name
    };
};

var combineShapeRows = function(previous, current, index) {
    if (index === 1) {
        var tmp = {};
        tmp[previous.id] = [previous];
        previous = tmp;
    }

    if (!previous.hasOwnProperty(current.id)) {
        previous[current.id] = [];
    }

    previous[current.id].push(current);
    return previous;
};

var load_shapes = function(csv) {
    var data = d3.csv.parse(csv, cleanShapeRow);
    drawShapes(data);
};

var load_stops = function(csv) {
    var data = d3.csv.parse(csv, cleanStopRow);
    drawStops(data);
};

map.on('viewreset', function() {
    resetShapes();
    //resetStops();
});
*/

