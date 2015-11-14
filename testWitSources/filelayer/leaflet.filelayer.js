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
        /*fieldSeparator: ';',
        lineSeparator: '\n',
        titles: ['lat', 'lng', 'popup'],*/
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
            'csv': this._convertCsvToGeoJSON
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
        var layer = L.geoJson(content, this.options.layerOptions);

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
             * IF YOU WANT AUTOMATIC CHECK DELIMITER
             * for this function i used the Papap Parser of mholt
             * (https://github.com/mholt/PapaParse)
             */
            geojson = Papa.parse(content,{header: this.options.firstLineTitles}); //convert csv to json.
            geojson = this._addFeatureToJson(geojson);
            /*
             *  IF YOU WANT MANUALLY SET THE DELIMITERS
             *  for this function i used the L.GeoCSv of Joker-X
             *  (https://github.com/joker-x/Leaflet.geoCSV).
             */
            /*
            geoCsv = new L.geoCsv(content, {
            fieldSeparator: this.options.fieldSeparator,
            lineSeparator: this.options.lineSeparator,
            firstLineTitles: this.options.firstLineTitles,

             titles: this.options.titles,
             latitudeTitle: this.options.latitudeTitle,
             longitudeTitle: this.options.longitudeTitle,
             deleteDoubleQuotes: this.options.deleteDoubleQuotes,

             });
            geojson = geoCsv._csv2json(content);
            */
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
                            feature["properties"]["search"]=obj[title[i]];
                            feature["properties"]["title"]=obj[title[i]];
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
                //WORK
                /* for (var i=0; i<title.length; i++) {
                 if (title[i] != this.options.latitudeTitle && title[i] != this.options.longitudeTitle) {
                 feature["properties"][title[i]] = this._deleteDoubleQuotes(obj[title[i]]);
                 }
                 }*/
            }
        }
        alert(papaJson["features"].toSource());
        alert(JSON.stringify(papaJson["features"], undefined, 4));
        return papaJson;
    },

    _deleteDoubleQuotes: function (text) {
        text = text.trim().replace(/^"/,"").replace(/"$/,"");
        return text;
    },

    /*_prettyJson: function(jsonObject){
        var str = JSON.stringify(jsonObject, undefined, 4);
        //this.output(str);
        //return this.output(this.syntaxHighlight(str));
        //str = this.syntaxHighlight(str);
        return str;
    },*/

    /*output: function(inp) {
         document.body.appendChild(document.createElement('pre')).innerHTML = inp;
    },
*/
  /*  syntaxHighlight: function(json){
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    },*/

   /* _getHeaders: function(obj) {
        var cols = [];
        for (var key in obj) {cols.push(key);}
        alert("Headers:"+cols);
        return cols;
    },*/

    /*_buildIndex: function(jsonObject){
        // build the index
        var index = [];
        for (var x in jsonObject) {
            index.push(x);
        }
        return index;
    },*/

    _propertiesNames: []

});


L.Control.FileLayerLoad = L.Control.extend({
    statics: {
        TITLE: 'Load local file (GPX, KML, GeoJSON, CSV)',
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
            fileInput.accept = '.gpx,.kml,.json,,.geojson,.csv';
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
