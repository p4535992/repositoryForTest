zip.workerScriptsPath ="./zip/";
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
});
var map = L.map('map').fitWorld().addLayer(osm);
/* var map = new L.Map("map", {center: [35.78, -78.68], zoom: 13});
 map.addLayer(osm);*/
L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
L.Control.fileLayerLoad({
    fileSizeLimit: 6144,
    //TRY OUT CSV //test file: http://adf.ly/1RnWZd
    latitudeColumn: 'lat',
    longitudeColumn: 'lng',

    //TRY OUT XML   //test file: http://adf.ly/1Rqxub
    /* latitudeColumn: 'Latitude',
     longitudeColumn: 'Longitude',
     rootTag: ["Root","Row"],*/

    //TRY OUT RDF/XML  //test file: http://adf.ly/1RnWFd
    /*latitudeColumn: 'geo:lat',
     longitudeColumn: 'geo:long',
     rdfLink: ['gr:hasPOS'],
     rdfAboutLink: 'rdf:about',
     rootTag: {root:"rdf:RDF",subRoot:"rdf:Description"},
     */
    validateGeoJson: true,
    popupTable:true,
    layerOptions: {
        pointToLayer: function (feature, latlng) {
            return new L.marker(latlng);
        },
        onEachFeature:function(feature, layer){
            try {
                var popupContent = '';
                if (feature.properties && feature.properties.popupContent) {
                    popupContent = feature.properties.popupContent;
                }
                layer.bindPopup(popupContent);
            }catch(e){
                alert(e.message);
            }
        }
    }
}).addTo(map);
