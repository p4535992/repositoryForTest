/**
 * Created by 4535992 on 21/11/2015.
 */
var osmUtil = {};
osmUtil.mappingLayer ={};
osmUtil.vectorLayer={};
osmUtil.selectMarkerControl={};
osmUtil.selectedFeature={};
osmUtil.lat={};
osmUtil.lon={};

var map;

    /*funzione per la cattura dell'evento click sulle icone nella mappa OpenStreetMap*/
osmUtil.onFeatureSelect = function(feature) {
    var selectedFeature = feature;

    var popup = new OpenLayers.Popup.FramedCloud(
        "tempId",
        feature.geometry.getBounds().getCenterLonLat(),
        null,
        '<div class="markerContent">' + selectedFeature.attributes.salutation
//                               +";Latlon:("+selectedFeature.attributes.Lat+","+ selectedFeature.attributes.Lon
        +'</div>',
        null,
        true,
        null);

    feature.popup = popup;
    map.addPopup(popup);
    map.setCenter(
        new OpenLayers.LonLat(selectedFeature.attributes.Lon,selectedFeature.attributes.Lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject())

        , 18
    );

    instagramUtil.prendiLefotoDellaLocazione(selectedFeature.attributes.salutation,selectedFeature.attributes.Lat,selectedFeature.attributes.Lon);
    foursSquareUtil.getFourSquareInfo(selectedFeature.attributes.salutation,selectedFeature.attributes.Lat,selectedFeature.attributes.Lon);

};

/*funzione per la cattura dell'evento di chiusura dell'icona di popup sulla mappa OpenStreetMap*/
osmUtil.onPopupClose = function(feature) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null
};

/*funzione per la cattura dell'evento di deselezione dell'icone o selezione di un'altra icona
 * sulla mappa OpenStreetMap*/
osmUtil.onFeatureUnselect = function(feature) {
    map.removePopup(feature.popup);
    feature.popup.destroy();
    feature.popup = null;
    osmUtil.cancellaLeFotoDellaLocazione();
};

/*funzione per la inizializzaione dell mappa OpenStreetMap, attraverso uno dei tanti
 * Costruttori possibili abilitati dall'API*/
osmUtil.initMap2 = function () {
    if (navigator.geolocation) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.getCurrentPosition(
            osmUtil.displayPosition,
            osmUtil.displayError,
            { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
        );
    }
    else console.error("Geolocation is not supported by this browser");
};

/*mostra la posizione dell'utente sulla mappa OpenStreetMap*/
osmUtil.displayPosition = function(position){
    console.info("compile displayPosition");
    map = new OpenLayers.Map( 'map');
    osmUtil.mappingLayer = new OpenLayers.Layer.OSM("Simple OSM Map");
    //Add layer
    map.addLayer(osmUtil.mappingLayer);
    osmUtil.vectorLayer = new OpenLayers.Layer.Vector("Vector Layer", {projection: "EPSG:4326"});
    //Add control on the markers
    osmUtil.selectMarkerControl =
        new OpenLayers.Control.SelectFeature(osmUtil.vectorLayer, {
                onSelect: osmUtil.onFeatureSelect,
                onUnselect: osmUtil.onFeatureUnselect});
    map.addControl(osmUtil.selectMarkerControl);
    osmUtil.selectMarkerControl.activate();

    map.addLayer(osmUtil.vectorLayer);

    console.info("Coordinates:[Lng:"+position.coords.latitude+',LAT:'+position.coords.longitude);
    map.setCenter(
        new OpenLayers.LonLat(position.coords.longitude,position.coords.latitude).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject())

        , 18 /*zoom*/
    );
    osmUtil.lat=position.coords.latitude;
    osmUtil.lon=position.coords.longitude;

    var youarehere = "img/me.png";
    osmUtil.placeLocationMarker(osmUtil.lat,osmUtil.lon,"YOU ARE HERE",youarehere,false,false);
    console.info("compiled displayPosition");
    instagramUtil.buildInstagram(osmUtil.lat,osmUtil.lon);
};

/*funzione per il controllo di errore nell'atto della geolocalizzazione dell'utente*/
osmUtil.displayError = function(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
};
i=0;
/*funzione per il piazzamento delle icone/immagini sulla mappa openstreetmap*/
osmUtil.placeLocationMarker = function(lat,lon,string,url,b,menu){
    var randomLat = lat;
    var randomLon = lon;
    var randomLonLat = new OpenLayers.Geometry.Point( randomLon, randomLat);
    randomLonLat.transform("EPSG:4326", map.getProjectionObject());

    var randomFeature;
    if(url==null||menu==true){
        if(string=="YOU ARE HERE"){url= "img/me.png";}
        else{url= "img/cluster.png";}

        loww = 31;
        lowh = 35;
        randomFeature = new OpenLayers.Feature.Vector(
            randomLonLat,
//                    {salutation:string} ,
            {salutation:string,Lon : randomLon, Lat : randomLat} ,
            {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, graphicXOffset: -12, graphicYOffset: -25}
        );
    }else if((b==false && url!=null)){
        loww = 31; //21
        lowh = 35; //25
        randomFeature = new OpenLayers.Feature.Vector(
            randomLonLat,
//                    {salutation:string} ,
            {salutation:string,Lon : randomLon, Lat : randomLat} ,
            {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, graphicXOffset: -12, graphicYOffset: -25}
        );
    }else if(b==true && url!=null){
        loww = 31;
        lowh = 35;
        randomFeature = new OpenLayers.Feature.Vector(
            randomLonLat,
//                    {salutation:string} ,
            {salutation:string,Lon : randomLon, Lat : randomLat} ,
            {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, rotation:i*15}
        );
        i=i+1;
    }

    osmUtil.vectorLayer.addFeatures(randomFeature);
//            selectedFeature = randomFeature;
//            vectorLayer.addFeatures(selectedFeature);
    if((b==false && randomFeature.attributes.salutation=="YOU ARE HERE")||menu==true){
        var popup = new OpenLayers.Popup.FramedCloud(
            "tempId",
            new OpenLayers.LonLat( randomLon, randomLat).transform("EPSG:4326", map.getProjectionObject()),
            null,
//                       randomFeature.attributes.salutation,
//                               + " Lat:" + randomFeature.attributes.Lat + " Lon:" + randomFeature.attributes.Lon,
            '<div class="markerContent">' + randomFeature.attributes.salutation + '</div>',
            null,
            true,
            null);
        randomFeature.popup = popup;
        map.addPopup(popup);
        if(menu != true){foursSquareUtil.startWithFourSquare(randomFeature.attributes.salutation,lat,lon);}
        if(menu == true){foursSquareUtil.getFourSquareInfo(randomFeature.attributes.salutation,lat,lon);}
        instagramUtil.prendiLefotoDellaLocazione(randomFeature.attributes.salutation,lat,lon);
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////77
/*funzione che stampa sulla mappa tutte le locazioni vicine all'utente e ripsettivamente
 * cattura tutte per ogni locazione tutte le immagini a lui vicine */
osmUtil.allLocationCoordinates =function(coord){
    var images =[];
    for (var key in coord) {
        if(key.hasOwnProperty("LAT") && key.hasOwnProperty("LON")) {
            osmUtil.placeLocationMarker(coord[key].LAT, coord[key].LON, coord[key].NAME, null, false, false);
            osmUtil.mediaSearchxxx(coord[key].LAT, coord[key].LON, coord[key].NAME, images);
        }
    }

};
///////////////////////////////////////////////////////////////////////////////////////
/*funzione per il tracciamento delle immagini (inerenti a un luogo) sulla
 * mappa OpenmStreetMap resa inutilizzabile poichè inutile ai fini dell'elaborato*/
osmUtil.displayPosition4 = function(lat,lon,images,name) {
    var i=0;
    for(var key in images){
        if(key.hasOwnProperty("TU")) {
            var id = images[key].ID;
            var url = images[key].TU;
            var ref = images[key].SRU;
///////////////////////////////////////////////////////////////////////////////////////
//Nel caso si volesse inserire le imaagini inerenti si luoghi come icone sulle mappa basta
//abilitare la seguente linea di codice
            osmUtil.placeLocationMarker(lat, lon, name, url, true, false, null);
        }
    }
};

///////////////////////////////////
/*funzione che abilita la ricerca delle immagini a una certa distanza da un luogo di certe coordiante*/
osmUtil.mediaSearchxxx = function(laty,lngy,name,images){
    var INSTAJAM = new Instajam({
        access_token: localStorage.getItem("access_token"), //trucco per tenere nascosto il nostro access_token
        client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
    });
    var optionsx = {"lat":laty,"lng":lngy,"distance":100};
    INSTAJAM.user.feed(function(data) {

        INSTAJAM.media.search(optionsx,function(data){
            if(data.meta.code == 200) {
                var IMAGES = [];
                var k=0;
                var photos = data.data;
                if(photos.length > 0) {
                    for (var key in photos){
                        var photo = photos[key];
                        var imagesObject = {
                            ID: photo.id,
                            LRU: photo.images.low_resolution.url,
                            LRW: photo.images.low_resolution.width,
                            LRH: photo.images.low_resolution.height,
                            TU: photo.images.thumbnail.url,
                            TW: photo.images.thumbnail.width,
                            TH: photo.images.thumbnail.height,
                            SRU: photo.images.standard_resolution.url,
                            SRW: photo.images.standard_resolution.width,
                            SRH: photo.images.standard_resolution.height
                        };

                        IMAGES.push(imagesObject);
                    }
                }else{
                    alert('nessuna foto nelle vicinanze');
                }
            }else{
                alert(data.meta.error_message);
            }
            osmUtil.displayPosition4(laty,lngy,IMAGES,name);
        });
    });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*funziona che richiama tutte le locazioni trovate da Instagram per inserirle nel nostro menu a cascata*/
osmUtil.addLocationToMenu = function(locations){
    for (var key in locations) {
        osmUtil.searchEPopup(locations[key].NAME,locations[key].LAT,locations[key].LON);
    }
};
/*funzione che aggiunge il pulsantre YOU ARE HERE al menù*/
osmUtil.addMeToMenu = function(){
    var name = "YOU ARE HERE";
    osmUtil.searchEPopup(name,osmUtil.lat,osmUtil.lon);
};
/*funzione che abilita all'evento di click sull'elemento della lista delle località
 * lo zoom sulla locazione e la creazione del popup*/
osmUtil.searchEPopup = function(name,lat,lng){
    if(name=="YOU ARE HERE"){
        osmUtil.centraEPopup(name,lat,lng);
    }else{
        var ee =new $('<li><a href='+'javascript:'+nothing+' title="'+name+'">'+name+'</a></li>');
        ee.on('click',function(e) {
            osmUtil.centraEPopup(name,lat,lng);
            event.preventDefault();
        });
        ee.appendTo('.localita');
    }
};
/*funzione che abilita il centramento della mappa alla locazione desiderata*/
osmUtil.entraEPopup = function(name,lat,lng){
    map.setCenter(
        new OpenLayers.LonLat(lng,lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject())
        , 18
    );
    osmUtil.placeLocationMarker(lat,lng,name,null,false,true);
};
/*funzione che non fa nulla è stata messa per evitare il lancio di un'eccezione in fase
 * di chiamata dell'API foursquare*/
osmUtil.nothing = function(){};

