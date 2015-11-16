/*
 * Load files *locally* (GeoJSON, KML, GPX) into the map
 * using the HTML5 File API.
 *
 * Requires Pavel Shramov's GPX.js
 * https://github.com/shramov/leaflet-plugins/blob/d74d67/layer/vector/GPX.js
 */
var FileLoader = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
        layerOptions: {},
        fileSizeLimit: 1024,
        /*Added from 4535992 */
        firstLineTitles: true,
		latitudeTitle: 'lat',
		longitudeTitle: 'lng',
        titleForSearch: 'title',
	    deleteDoubleQuotes: true

    },

    initialize: function (map, options) {
        this._map = map;
        L.Util.setOptions(this, options);

        this._parsers = {
            'json': this._loadGeoJSON,
            'geojson': this._loadGeoJSON,
            'gpx': this._convertToGeoJSON,
            'kml': this._convertToGeoJSON,
            'csv': this._convertCsvToGeoJSON,
            'rdf': this._convertRDFToJson
        };
    },

    load: function (file /* File */) {
        // Check file size
        var fileSize = (file.size / 1024).toFixed(4);
        if (fileSize > this.options.fileSizeLimit) {
            this.fire('data:error', {
                error: new Error('File size exceeds limit (' + fileSize + ' > ' + this.options.fileSizeLimit + 'kb)')
            });
            return;
        }

        // Check file extension
        var ext = file.name.split('.').pop(),
            parser = this._parsers[ext];
        if (!parser) {
            this.fire('data:error', {
                error: new Error('Unsupported file type ' + file.type + '(' + ext + ')')
            });
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
                this.fire('data:error', {error: err});
            }

        }, this);
        reader.readAsText(file);
        return reader;
    },

    _loadGeoJSON: function (content) {
        if (typeof content == 'string') {
            content = JSON.parse(content);
        }
        var layer = L.parserCsv(content, this.options.layerOptions);

        if (layer.getLayers().length === 0) {
            throw new Error('GeoJSON has no valid layers.');
        }

        if (this.options.addToMap) {
            layer.addTo(this._map);
        }
        return layer;
    },

    _convertToGeoJSON: function (content, format) {
        // Format is either 'gpx' or 'kml'
        if (typeof content == 'string') {
            content = ( new window.DOMParser() ).parseFromString(content, "text/xml");
        }
        var geojson = toGeoJSON[format](content);
        return this._loadGeoJSON(geojson);
    },

    /*
     *  Added from 4535992.
     */
    _convertCsvToGeoJSON: function(content){
        try {
            if(!this.options.firstLineTitles){
                throw new Error('The file CSV must have the Headers');
            }
            var geojson;
            /*
             * for this function i used the Papa Parser of mholt
             * (https://github.com/mholt/PapaParse)
             */
            geojson = Papa.parse(content,{header: this.options.firstLineTitles}); //convert csv to json.
            geojson = this._addFeatureToJson(geojson);
            return this._loadGeoJSON(geojson);
        }catch(e){alert(e.message);}
    },

    _addFeatureToJson: function(papaJson){
        papaJson["type"]="FeatureCollection";
        papaJson["features"]=[];
        var title = papaJson.meta.fields;
        for (var num_linea = 0; num_linea < papaJson.data.length - 1; num_linea++) { //  var depth = papaJson.data.length - 1;
            var obj = papaJson.data[num_linea]; //single element of papa parse json object
            var fields = title.toString().trim().split(",");
            var lng = parseFloat(obj[this.options.longitudeTitle]);
            var lat = parseFloat(obj[this.options.latitudeTitle]);
            if (fields.length+"=="+title.length && lng<180 && lng>-180 && lat<90 && lat>-90) {
                var feature = {};
                feature["type"]="Feature";
                feature["geometry"]={};
                feature["properties"]={};
                feature["geometry"]["type"]="Point";
                feature["geometry"]["coordinates"]=[lng,lat];
                var content ='<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
                for (var i=0; i< title.length; i++) {
                    if (title[i] != this.options.latitudeTitle && title[i] != this.options.longitudeTitle) {
                        if(title[i]==this.options.titleForSearch){
                            feature["properties"]["search"]=this._deleteDoubleQuotes(obj[title[i]]);
                            feature["properties"]["title"]=this._deleteDoubleQuotes(obj[title[i]]);
                        }else{
                            feature["properties"][title[i]] = this._deleteDoubleQuotes(obj[title[i]]);
                            var href='';
                            if (obj[title[i]].indexOf('http') === 0) {
                                href = '<a target="_blank" href="' + obj[title[i]] + '">'+ obj[title[i]] + '</a>';
                            }
                            if(href.length > 0)content += '<tr><th>'+title[i]+'</th><td>'+ href +'</td></tr>';
                            else content += '<tr><th>'+title[i]+'</th><td>'+ obj[title[i]] +'</td></tr>';
                        }
                    }//end of if
                }//end of for
                content += "</table></div>";
                feature["properties"]["popupContent"]=content;
                papaJson["features"].push(feature);
            }
        }
        return papaJson;
    },

    _deleteDoubleQuotes: function (text) {
        text = text.trim().replace(/^"/,"").replace(/"$/,"");
        return text;
    },

    /* work in progress */
    _convertTurtleToJson: function(content){

    },

    _convertRDFToJson: function(contentRdf) {
        try {
            var xml = this._convertRDFToXML(contentRdf);
            //alert("TO XML:" + new XMLSerializer().serializeToString(xml));
            var json = this._convertXMLToJson(xml);
            delete json["rdf:RDF"]["#text"];
            delete json["rdf:RDF"]["rdf:Description"]["#text"];
            json["root"]=[];
            json["root"].push(this._simplifyJson(json["rdf:RDF"]["rdf:Description"]),null);
            alert("TO JSON5:" + JSON.stringify(json, undefined, 2));
        }catch(e){alert(e.message);}
    },

    _convertRDFToXML:function(contentRdf){
        var xml;
        try {
            if (typeof parseXML == 'undefined') {
                try {
                    xml = new ActiveXObject("Microsoft.XMLDOM");
                    xml.async = false;
                    xml.validateOnParse = false;
                    xml.resolveExternals = false;
                    xml.loadXML(contentRdf);
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
                        xml.loadXML(contentRdf);
                    } catch (e) {
                        throw new Error(e.message);
                    }
                }
            } else {
                xml = parseXML(contentRdf, null);
            }
        }catch(e) {
            throw new Error(e.message);
        }
        return xml;
    },

    _convertXMLToJson:function (contentXml) {
        var attr,
            child,
            attrs = contentXml.attributes,
            children = contentXml.childNodes,
            key = contentXml.nodeType,
            json = {},
            i = -1;
        if (key == 1 && attrs.length) {
            json[key = '@attributes'] = {};
            while (attr = attrs.item(++i)) {
                json[key][attr.nodeName] = attr.nodeValue;
            }
            i = -1;
        } else if (key == 3) {
            json = contentXml.nodeValue;
        }
        while (child = children.item(++i)) {
            key = child.nodeName;
            if (json.hasOwnProperty(key)) {
                if (json.toString.call(json[key]) != '[object Array]') {
                    json[key] = [json[key]];
                }
                json[key].push(this._convertXMLToJson(child));
            }
            else {
                json[key] = this._convertXMLToJson(child);
            }
        }
        return json;
    },

    _simplifyJson: function(json,value){
       /* if(value==null) {
            json["data"] = [];
        }*/
        //alert("TO JSON3:" + JSON.stringify(json, undefined, 2));
        var root = Object.keys(json);
        //alert("404: "+root.length)
        for(var i = 0; root.length; i++){  //406 object
            var info ={};
            //alert("Actual Key:"+root[i]);
            var keys;
            if(typeof json[i] === "undefined"){
                keys = Object.keys(json[i]);
                alert("TO JSON4"+JSON.stringify(json[i],undefined,2));
            }
            else {
                keys =  Object.keys(json[root[i]]);
                alert("TO JSON4"+JSON.stringify(json[root[i]],undefined,2));
            }

            alert("KEYS:"+ keys.toSource());//KEYS:["@attributes", "#text", "geo:long", "rdf:type", "geo:lat"]
            for(var j=0; j < keys.length; j++){ //
                alert("Keys 1:"+ keys[j]);//rdf:about , @attributes,
                var value;
                if(typeof json[i] === "undefined") value = json[root[i]][keys[j]];
                else value = json[i][keys[j]];

                var keyRoot;
                if(Object.keys(value).length > 1)keyRoot = Object.keys(value).toString().split(",");
                else keyRoot = Object.keys(value);

                //alert("Keyroor: "+keyRoot.toString());
                for(var k= 0; k < keyRoot.length; k++) {
                    var key = keyRoot[k];
                    alert("Keys 1:"+ key);//rdf:about , @attributes,
                    //alert("Keys 1:" + key + ",value:" + JSON.stringify(value, undefined, 2));
                    if (Object.prototype.toString.call(value) === '[object Array]') {
                        //TODO (OPTIONAL) REMOVE ALL EMPTY VALUE ON THE ARRAY
                       /* key = "#array";
                         value = value["#text"];
                         alert("Element 2(" + i + ")(" + j + "):" + key + "->" + value);
                         info[key] = value;*/
                        break;
                    }
                    else if (key.toString() == "@attributes") {
                        if (Object.keys(value).toString() == "@attributes") {
                            key = Object.keys(value["@attributes"]);
                            value = value["@attributes"][key];
                        }
                        else {
                            //TODO (OPTIONAL) if there are other child of the json
                            alert("if there are ohter child of the json");
                            //json = this._simplifyJson(json,value);

                        }
                    } else if (key.toString() == "#text") {
                        key = keys[j];
                        value = value["#text"];
                    }else if (key.toString() == "data") {
                        /*do nothing*/
                        continue;
                    }else if(key.toString() == "rdf:type"){
                        alert("888");
                        key = "rdf:type";
                        value = value["@attributes"]["rdf:resource"];
                    } else {
                        key = Object.keys(value);
                        value = value[key];
                    }
                    alert("Element 2(" + i + ")(" + j + "):" + key + "->" + value);
                    info[key] = value;
                }//FOR EACH KEY IN KEYROOT
            }
            this._data.push(info);
            alert("SPECIAL\n:"+JSON.stringify(this._data,undefined,2));
        }//for every object on rdf description
        return json;
    },

    /*_convertCSVToRDF:function(contentcsv){
        var line;
        var lines = [];
        for(var i = 0; i < contentcsv.length; i++){
            line = "@prefix : <http://rdfdata.org/csv#> . :csvList :item" + contentcsv[i];
            lines.push(line);
        }
        return lines;
    }*/

    _cleanArray: function(array){
        var err = ["","\n","\n ","\"\n \"","\"\n\"","\"\""]
        for(var deleteValue in err) {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === deleteValue) {
                    array.splice(i, 1);
                }
            }
        }
        return array;
    },

    _propertiesNames: [],
    _data:[],


});


L.Control.FileLayerLoad = L.Control.extend({
    statics: {
        TITLE: 'Load local file (GPX, KML, GeoJSON, CSV, RDF)',
        LABEL: '&#8965;'
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
            // Fit bounds after loading
            if (this.options.fitBounds) {
                window.setTimeout(function () {
                    map.fitBounds(e.layer.getBounds());
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
                setTimeout(function(){
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
            fileInput.accept = '.gpx,.kml,.json,,.geojson,.csv,.rdf';
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

function getHeaders(object) {
    var cols = [];
    for (var key in object) {cols.push(key);}
    return cols;
}
