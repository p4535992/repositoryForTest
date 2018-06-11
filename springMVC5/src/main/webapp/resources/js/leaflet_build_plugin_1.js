/*** Set the src of the javascript file*/
var mySRC = jQuery('script[src$="resources/js/leaflet_build_plugin_1.js"]').attr('src').replace('js/leaflet_build_plugin_1.js', '');

var leaflet_build_plugin_1 = {
    addPluginCoordinatesControl:addPluginCoordinatesControl,
    addPluginGPSControl:addPluginGPSControl,
    addPluginLocateControl:addPluginLocateControl,
    addPluginLayersStamenBaseMaps:addPluginLayersStamenBaseMaps,
    addPluginGeoSearch: function(address){addPluginGeoSearch(address);},
    openURL:function(url){openURL(url)},
    addPluginOpenCageSearch: addPluginOpenCageSearch
};

    /** function to open a URL with javascript without jquery. */
    function openURL(url){
        // similar behavior as an HTTP redirect
        window.location.replace(url);
        // similar behavior as clicking on a link
        window.location.href = url;
    }

    /***
     * Set plugin for gps on the leaflet
     * https://github.com/stefanocudini/leaflet-gps
     */
    function addPluginGPSControl() {
        //Simple point
        //map.addControl( new L.Control.Gps({autoActive:true}) );//inizialize control
        //Custom marker
        //map.addControl( new L.Control.Gps({marker: new L.Marker([0,0])}) );//inizialize control
        //Custom a style (circle,ecc.)
        //var newStyle = {radius: 25, weight:4, color: '#f0c', fill: true, opacity:0.8};
        //map.addControl( new L.Control.Gps({style: newStyle }) );//inizialize control
        if($.isEmptyObject(GPSControl)){
            GPSControl = new L.Control.Gps({maxZoom: 16,style: null});
        }
        map.addControl(GPSControl);
    }

    /***
     * Set the coordinates plugin on leaflet, add a window with the value of coordinates
     * https://github.com/MrMufflon/Leaflet.Coordinates
     */
    function addPluginCoordinatesControl() {
        //add standard controls
        L.control.coordinates({
            position:"bottomleft", //optional default "bootomright"
            decimals:2, //optional default 4
            decimalSeperator:".", //optional default "."
            labelTemplateLat:"Latitude: {y}", //optional default "Lat: {y}"
            labelTemplateLng:"Longitude: {x}", //optional default "Lng: {x}"
            enableUserInput:true, //optional default true
            useDMS:false, //optional default false
            useLatLngOrder: true, //ordering of labels, default false-> lng-lat
            markerType: L.marker, //optional default L.marker
            markerProps: {} //optional default {}
        }).addTo(map);

        L.control.coordinates({
            useDMS: true,
            labelTemplateLat: "N {y}",
            labelTemplateLng: "E {x}",
            useLatLngOrder: true
        }).addTo(map);

    }

    /**
     *  Add the Leaflet plugin  locateControl.
     *  https://github.com/domoritz/leaflet-locatecontrol.
     */
    function addPluginLocateControl() {
        if (map != null) {
            /*L.Control.MyLocate = L.Control.Locate.extend({
             drawMarker: function () {
             // override to customize the marker
             }
             });*/
            // add location control to global name space for testing only
            // on a production site, omit the "lc = "!
            //var lc = new L.Control.MyLocate();
            // create control and add to map
            var lc = new L.control.locate({
                position: 'topleft',  // set the location of the control
                layer: new L.LayerGroup(),  // use your own layer for the location marker
                //layer: markerClusters,  // use your own layer for the location marker
                drawCircle: true,  // controls whether a circle is drawn that shows the uncertainty about the location
                follow: false,  // follow the user's location
                setView: true, // automatically sets the map view to the user's location, enabled if `follow` is true
                keepCurrentZoomLevel: false, // keep the current map zoom level when displaying the user's location. (if `false`, use maxZoom)
                stopFollowingOnDrag: false, // stop following when the map is dragged if `follow` is true (deprecated, see below)
                remainActive: false, // if true locate control remains active on click even if the user's location is in view.
                markerClass: L.circleMarker, // L.circleMarker or L.marker
                circleStyle: {},  // change the style of the circle around the user's location
                markerStyle: {},
                followCircleStyle: {},  // set difference for the style of the circle around the user's location while following
                followMarkerStyle: {},
                icon: 'fa fa-map-marker',  // class for icon, fa-location-arrow or fa-map-marker
                iconLoading: 'fa fa-spinner fa-spin',  // class for loading icon
                circlePadding: [0, 0], // padding around accuracy circle, value is passed to setBounds
                metric: true,  // use metric or imperial units
                onLocationError: function (err) {
                    alert(err.message)
                },  // define an error callback function
                onLocationOutsideMapBounds: function (context) { // called when outside map boundaries
                    alert(context.options.strings.outsideMapBoundsMsg);
                },
                showPopup: true, // display a popup when the user click on the inner marker
                strings: {
                    title: "Show me where I am",  // title of the locate control
                    metersUnit: "meters", // string for metric units
                    feetUnit: "feet", // string for imperial units
                    popup: "You are within {distance} {unit} from this point",  // text to appear if user clicks on circle
                    outsideMapBoundsMsg: "You seem located outside the boundaries of the map" // default message for onLocationOutsideMapBounds
                },
                locateOptions: {}  // define location options e.g enableHighAccuracy: true or maxZoom: 10
            });
            //var lc = L.control.locate({follow: true,strings: {title: "Show me where I am"}});
            lc.addTo(map);
            // request location update and set location (e.g. onLoad page)
            //lc.start();
            map.on('startfollowing', function() {
                map.on('dragstart', lc._stopFollowing, lc);
            }).on('stopfollowing', function() {
                map.off('dragstart', lc._stopFollowing, lc);
            });
        }
    }

    /**
     * Add the leaflet plugin Stamen Layer.
     * https://github.com/stamen/maps.stamen.com.
     */
    function addPluginLayersStamenBaseMaps() {
        if (map != null) {
            //var layers = ["terrain", "watercolor","toner"];
            //http://c.tiles.mapbox.com/v3/examples.map-szwdot65/{z}/{x}/{y}.png
            var bases = {
                "Watercolor": new L.StamenTileLayer("watercolor"),
                "Terrain": new L.StamenTileLayer("terrain"),
                "Toner": new L.StamenTileLayer("toner"),
                "Disit": new L.StamenTileLayer("disit"),
                "Disit2": new L.stamenTileLayer("disit2")
            };
            L.control.layers(bases).addTo(map);
        }
    }

    /**
     * Add the Leaflet Plugin GeoSearch.
     * https://github.com/chriswhong/L.GeoSearch.
     * https://github.com/smeijer/L.GeoSearch.
     */
    function addPluginGeoSearch(address){
        alert("compile addPluginGeoSearch with Address...");
        var googleGeocodeProvider = new L.GeoSearch.Provider.Google();
        if(!jQuery.isEmptyObject(address)) {
            var addressText = address;
            alert("you using a address String form.." + addressText);
            googleGeocodeProvider.GetLocations(addressText, function (data) {
                // in data are your results with x, y, label and bounds (currently availabel for google maps provider only)
                for (var i = 0; i < data.length; i++) {
                    alert('details address: Label ' + i + '=' + data[i].Label + ',Y=' + data[i].Y + ',X=' + data[i].X + ',bound=' + data[i].bounds);
                    addSingleMarker(data[i].Label, null, data[i].Y, data[i].X, data[i].bounds);
                }
            });
        }
        //addSingleMarker(data.Label, null, data.Y, data.X, data.bounds)
        var googleprovider = new L.Control.GeoSearch({
            provider: googleGeocodeProvider,
            position: 'bottomright',
            showMarker: true
            //retainZoomLevel: false,
        });
        map.addControl( googleprovider );
        /*map.on('geosearch_showlocation', function (result) {
         L.marker([result.x, result.y]).addTo(map)
         });*/
        alert("...compiled addPluginGeoSearch with Address");
    }

    /**
     * http://geocoder.opencagedata.com/code.html#code-leaflet
     */
    function addPluginOpenCageSearch(){
        var options = {
            key: 'your-api-key-here',
            limit: 10
        };
        var control = L.Control.openCageSearch(options).addTo(map);
    }

    /**
     * Support for the leaflet Geocoder Plugin.,
     */
    function select(geocoder, el) {
        try {
            if (leafletUtil.geoCoderControl.selection) L.DomUtil.removeClass(leafletUtil.geoCoderControl.selection, 'selected');
            leafletUtil.geoCoderControl.geoCoderControl.options.geocoder = geocoder;
            L.DomUtil.addClass(el, 'selected');
            leafletUtil.geoCoderControl.selection = el;
        }catch(e){
            console.error("Exception::select() -> "+e.message);
        }
    }

function googleGeocoding(text, callResponse){
    geocoderSearchGoogle.geocode({address: text}, callResponse);
}

function formatJSON(rawjson) {
    var json = {}, key, loc, disp = [];
    for(var i in rawjson){
        key = rawjson[i].formatted_address;
        loc = L.latLng( rawjson[i].geometry.location.lat(), rawjson[i].geometry.location.lng() );
        json[ key ]= loc;	//key,value format
    }
    return json;
}

/*** function for remove all cluster when the map is move */
 function onMapMove() {
     //Se muovi la mappa rimuove tutti i marker funziona!!.
     removeClusterMarker();
 }

/*** function Set a popup when you click on the map*/
function onMapClick(e) {
    var popupGlobal = L.popup();
    popupGlobal.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
}

/** Move marker to confirm that label moves when marker moves (first click)
 * Remove marker on click so we can check that the label is also removed (second click)
 */
/* function onMarkerClick() {
 var clicks = 0;
 clicks++;
 if (clicks === 1) {
 marker.setLatLng(map.getCenter());
 } else {
 marker.off('click', onMarkerClick);
 map.removeLayer(m);
 if(clicks > 1) clicks = 0;
 }
 }*/

/** http://www.javascript-coder.com/javascript-form/javascript-form-value.phtml */
function loadArrayOnInput1(idForm,nameElementOrIndex){
    //var oFormObject = document.forms[idForm];
    //var oformElement = oFormObject.elements[nameElementOrIndex];
    console.info(67);
    var arrayOfMarker = [];
    for(var j = 0; j < leafletUtil.arrayGeoDocuments.length; j++){
        var marker = {
            name:leafletUtil.arrayGeoDocuments.length[j].name,
            url: leafletUtil.geoDocument.url ,
            latitude: leafletUtil.geoDocument.lat,
            longitude: leafletUtil.geoDocument.lng ,
            popupContent: leafletUtil.geoDocument.popupContent
        };
        arrayOfMarker.push(marker);
    }
    console.info(68);
    console.info("LOAD JSON:"+JSON.parse(JSON.stringify(arrayOfMarker)));
    /*
     When sending a single object (not list) that Spring controller will accept as a Java object,
     the JSON format has to be only pair of curly braces with properties inside , avoid using JSON.stringify()
     which actually adds one more property with object name and Jackson can't match. Following is the Javascript
     code snippet to pass an object from Javascript to Spring controller:
     */
    document.forms[idForm].elements[nameElementOrIndex].value = JSON.stringify(arrayOfMarker);
    jQuery.ajax({
        type: "POST",
        url: "markers",
        data: arrayOfMarker,
        dataType: "html",
        contentType: "application/json",
        mimeType: "application/json",
        success: function(response){
            console.info("SUCCESS: " + response);
        },
        error: function (e) {
            console.info("Error " + e.message);
        }
    });
}


/*preparePopupColumn = function(json,popupContent,nameKey){
    for(var key in json){
        console.warn("Key:"+key+","+json[key]); //bbbox [object]
        try {
            if(json[key] !== null){
                //if a json array of  ajson object of objects.....
                if(json[key] instanceof Array){
                    for(var item,i =0; item = json[key][i++];){
                        if(typeof item != 'object') {
                            if(typeof json[key][item] == 'undefined'){
                                console.info("Item 7:" + json[key] + "," + item);//street_number
                                nameKey = key;
                                popupContent += leafletUtil.preparePopupRow(json[key],item);
                            }else{
                                console.info("Item 1:" + item + "," + json[key][item]);//street_number
                                nameKey =key;
                                popupContent = leafletUtil.preparePopupColumn(json[key][item], popupContent, nameKey);
                            }

                        }else{
                            for(var k =0; k < Object.keys(json[key][item]).length; k++){
                                console.info("Item 6:" + Object.keys(json[key][item])[k] + "," + json[key][item][k]);
                                nameKey = Object.keys(json[key][item])[k] + key;
                                popupContent = leafletUtil.preparePopupColumn(json[key][item][k], popupContent, nameKey);
                            }
                        }
                    }
                }else{
                    if(typeof json[key] === 'String'){
                        console.info("Item 4:" + key + "," + json[key]);
                        nameKey = key;
                        popupContent += leafletUtil.preparePopupRow(nameKey, json[key]);
                    }else if(typeof json[key] === 'object' && Object.keys(json[key]).length > 1){
                        var fields =  Object.keys(json[key]).toString().split(",");
                        //console.info("Fields:"+fields);
                        for(var field,i =0; field = fields[i++];){
                            //console.info("Field:"+field+","+JSON.stringify(json[key],undefined,2));
                            if(typeof json[key][field] != 'object'
                                && typeof json[key][field] != 'undefined'
                                && typeof json[key][field] != 'function' ){
                                console.info("Item 2:" + key + "," + json[key][field].toString());
                                nameKey = key;
                                popupContent += leafletUtil.preparePopupRow(nameKey, json[key][field]);
                            }else {
                                console.info("Item 5:" + key + "," + json[key][field].toString());
                                nameKey = key;
                                popupContent = leafletUtil.preparePopupColumn(json[key][field], popupContent, nameKey);
                            }
                        }
                    }else {
                        if(json[key].length > 1) {
                            console.info("Item 0:" + key + "," + json[key]);
                            nameKey = key;
                            popupContent += leafletUtil.preparePopupRow(nameKey, json[key]);
                        }
                    }
                }
            }
        } catch (e) {
            console.warn("Exception::preparePopupColumn() ->"+e.message);
        }
    }//for
    return popupContent;
};*/

/*

leafletUtil.IsEmpty = function(object){ leafletUtil.Is(object,'empty');};
leafletUtil.IsJson = function(object){leafletUtil.Is(object,'json');};
leafletUtil.IsNull = function(object){leafletUtil.Is(object,'null');};
leafletUtil.IsUndefined =  function(object){leafletUtil.Is(object,'undefined');};
leafletUtil.IsString =  function(object){leafletUtil.Is(object,'string');};
leafletUtil.IsArray =  function(object){leafletUtil.Is(object,'array');};
leafletUtil.IsEmpty =  function(object){leafletUtil.Is(object,'empty');};
leafletUtil.IsObject =  function(object){leafletUtil.Is(object,'object');};
leafletUtil.Is = function(object,stringValue){
    try {
        if (stringValue)stringValue = stringValue.toString().toLowerCase();
        switch(stringValue){
            case 'json':{
                try { return !!JSON.parse(JSON.stringify(object));
                } catch (e) { return false;}
            }
            case 'null':return (object === null || object == null);
            case 'undefined': return (object === undefined);
            case 'string': return object.constructor === "test".constructor;
            case 'array': return (Array.isArray(object) || object.constructor === [].constructor);
            case 'empty': return (Object.keys(object).length == 0 || object == '' || JSON.stringify(object)=='{}');
            case 'object': return (object.constructor === {}.constructor || typeof object === 'object');
            default: return false;
        }
    }catch(e){
        console.error('Is -> '+e.message);
    }
};*/

/*
leafletUtil.Is = function(object,stringValue){
    try {
        if (stringValue)stringValue = stringValue.toString().toLowerCase();
        switch(stringValue){
            case 'json':{
                try {
                    return !!JSON.parse(JSON.stringify(object));
                } catch (e) { return false;}
            }
            case 'null':return (object === null || object == null);
            case 'undefined':

        }
    else if (object === undefined) {
            if (stringValue)return stringValue == 'undefined';
            else return 'undefined';
        }
        else if (object.constructor === "test".constructor) {
            if (stringValue)return stringValue == 'string';
            else return 'string';
        }
        else if (Array.isArray(object) || object.constructor === [].constructor) {
            if (stringValue)return stringValue == 'array';
            else return 'array';
        }
        //is string or json,object empty
        else if (Object.keys(object).length == 0 || object == '' || JSON.stringify(object)=='{}') {
            if (stringValue)return stringValue == 'empty';
            else return 'empty';
        }
        else if (object.constructor === {}.constructor || typeof object === 'object') {
            if (stringValue)return stringValue == 'object';
            else return 'object';
        }
        else {
            if (stringValue)return false;
            else return '?';
        }
    }catch(e){
        console.error('Is -> '+e.message);
    }
};*/
