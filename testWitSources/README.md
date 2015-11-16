Leaflet.FileLayer
=================

Loads local files (GeoJSON, GPX, KML) into the map using the [HTML5 FileReader API](http://caniuse.com/filereader), **without server call** !

* A simple map control
* The user can browse a file locally
* It is read locally (``FileReader``) and converted to GeoJSON
* And loaded as a layer eventually!

Check out the [demo](http://makinacorpus.github.com/Leaflet.FileLayer/) !

For GPX and KML files, it currently depends on [Tom MacWright's togeojson.js](https://github.com/tmcw/togeojson).

[![Build Status](https://travis-ci.org/makinacorpus/Leaflet.FileLayer.png?branch=gh-pages)](https://travis-ci.org/makinacorpus/Leaflet.FileLayer)

Usage
-----

```javascript
    var map = L.map('map').fitWorld();
    ...
    L.Control.fileLayerLoad({
        // See http://leafletjs.com/reference.html#geojson-options
        layerOptions: {style: {color:'red'}},
        // Add to map after loading (default: true) ?
        addToMap: true,
        // File size limit in kb (default: 1024) ?
        fileSizeLimit: 1024,
        // Restrict accepted file formats (default: .geojson, .kml, and .gpx) ?
        formats: [
            '.geojson',
            '.kml'
        ]
    }).addTo(map);
```

Events:

```javascript
    var control = L.Control.fileLayerLoad();
    control.loader.on('data:loaded', function (e) {
        // Add to map layer switcher
        layerswitcher.addOverlay(e.layer, e.filename);
    });
```

* **data:error** (error)

### WORK WITH CSV FILE
For CSV files, it currently depends on [Mholt papaparse.js](https://github.com/mholt), that made us the courtesy to let us use it in this project.
If you really hate to use the parser csv of other people you can convert your CSV file into a file GeoJSON and use the '_loadGeoJSON' method.
```javascript
L.Control.fileLayerLoad({
    latitudeTitle: 'lat', //the field name for the latitude coordinates 
    longitudeTitle: 'lng',//the field name for the longitude coordinates 
    titlesToInspect: ['name','lat','lng'], //if you want get only some specific field from csv
            layerOptions: {
                pointToLayer: function (feature, latlng) {
                    return new L.marker(latlng);
                },
                onEachFeature:function(feature, layer){
                        var popupContent = '';
                        if (feature.properties && feature.properties.popupContent) {
                            popupContent += feature.properties.popupContent;
                        }
                        layer.bindPopup(popupContent);
                }
            },
        }).addTo(map);
```
### WORK WITH RDF/XML FILE 
This is a little function, i don't know if anyone can found useful for something, usually is best use ajax request on the repository of triple, but once the code is written let's share it.
Anyway, You can use a RDF/XML with all the information on some locations, the only thing you need are two fields related to latitude and longitude.
```javascript
L.Control.fileLayerLoad({
    latitudeTitle: 'geo:lat',  //the  field name for the latitude 
    longitudeTitle: 'geo:long',  //the field name for the longitude
            layerOptions: {
                pointToLayer: function (feature, latlng) {
                    return new L.marker(latlng);
                },
                onEachFeature:function(feature, layer){
                    try {
                        var popupContent = '';
                        if (feature.properties && feature.properties.popupContent) {
                            popupContent += feature.properties.popupContent;
                        }
                        layer.bindPopup(popupContent);
                    }catch(e){alert(e.message);}
                }
            },
        }).addTo(map);
```
you can have multiple classes on the rdf that , so you can try to link to each other, for that you can do a merge of the json objects generated , where the specific property link 'rdfLink' and 'rdfAboutLink' are present.
Example:
```javascript
//set options rdfAboutLink = 'rdf:id' and rdfLink:[hasID].
L.Control.fileLayerLoad({
    latitudeTitle: 'geo:lat',    //the  field name for the latitude 
    longitudeTitle: 'geo:long',  //the field name for the longitude
     rdfLink: ['geo:hasID'],     //you can specify the property of a link from you start the search
     rdfAboutLink: 'rdf:id',  //the value for the property 'rdfLink' to search to the values of the 'rdfaboutLink'
            layerOptions: {
                pointToLayer: function (feature, latlng) {
                    return new L.marker(latlng);
                },
                onEachFeature:function(feature, layer){
                    try {
                        var popupContent = '';
                        if (feature.properties && feature.properties.popupContent) {
                            popupContent += feature.properties.popupContent;
                        }
                        layer.bindPopup(popupContent);
                    }catch(e){alert(e.message);}
                }
            },
        }).addTo(map);

//....................................................................
//What happened ?
json1 = {name:New York, population:10000000, isACapital:true,geo:hasID:233}
json2  = {rdf:id:233,info:'Great city'}
//The question is "for each json object with hasPOS property exists a jsonObject with 'rdf:id' with the same value?"
//if true make a merge of the info, because there are all info for the same location. These two json are merged and //the result is:
json3 = {name:New York, population:10000000, isACapital:true,geo:hasID:233,rdf:id:233,info:'Great city'}
```

Here a result image of the popup content of the markers:
![testo alt](https://github.com/p4535992/repositoryForTest/blob/master/testWitSources/fileForTest/Immagine%201.png "Example loading of a rdf")
Changelog
---------

### 0.4.0 ###

* Support whitelist for file formats (thanks CJ Cenizal)

### 0.3.0 ###

* Add `data:error` event (thanks @joeybaker)
* Fix multiple uploads (thanks @joeybaker)
* Add `addToMap` option (thanks @joeybaker)

(* Did not release version 0.2 to prevent conflicts with Joey's fork. *)

### 0.1.0 ###

* Initial working version

Authors
-------

[![Makina Corpus](http://depot.makina-corpus.org/public/logo.gif)](http://makinacorpus.com)

Contributions

* Joey Baker http://byjoeybaker.com
