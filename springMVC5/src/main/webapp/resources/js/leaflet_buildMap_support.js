    /***  Set constructor variable for leaflet_buildMap_support */
    var leaflet_buildMap_support = {
        // Get a list of marker with coordinates and a url href and put the marker on the map
        initMap: function () { if(map==null){ initMap(); } },
        addSingleMarker: function (name, url, lat, lng) {addSingleMarker(name,url,lat,lng);},
        pushMarkerToArrayMarker: function(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar,phoneVar,emailVar,faxVar,ivaVar){
            pushMarkerToArrayMarker(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar,phoneVar,emailVar,faxVar,ivaVar);
        },
        loadCSVFromURL: function(url){utility_leaflet_csv.loadCSVFromURL(url);},
        chooseIcon: function(code){ chooseIcon(code);},
        removeClusterMarker:function(){removeClusterMarker();}
    };

    var map;
    var isGTFS;
    var bingAPIKey =
        'OOGpZK9MOAwIPsVuVTlE~D7N3xRehqhr3XJxlK8eMMg~Au-bt_oExU--ISxBKFtEXgSX-_AN6VMZSpM6rfKGY4xtAho6O67ueo2iN23gfbi0';
    var googleAPIKey =
        'AIzaSyDlmsdr-wCDaHNbaBM6N9JljQLIjRllCl8';
    var mapBoxAPIKey =
        'pk.eyJ1IjoiNDUzNTk5MiIsImEiOiJjaWdocXltNmMwc3Zud2JrbjdycWVrZG8zIn0.22EO_bIUp_3XUpt5dYjTRg';

    //DEFINE DIFFERNET MARKER WITH DIFFERNET COLOR
    var markerAccommodation = L.AwesomeMarkers.icon({markerColor: 'red'});
    var markerCulturalActivity = L.AwesomeMarkers.icon({markerColor: 'orange'});
    var markerEducation = L.AwesomeMarkers.icon({markerColor: 'green'});
    var markerEmergency = L.AwesomeMarkers.icon({markerColor: 'blue'});
    var markerEntertainment = L.AwesomeMarkers.icon({markerColor: 'purple'});
    var markerFinancialService = L.AwesomeMarkers.icon({markerColor: 'darkred'});
    var markerGovernmentOffice = L.AwesomeMarkers.icon({markerColor: 'darkblue'});
    var markerHealthCare = L.AwesomeMarkers.icon({markerColor: 'darkgreen'});
    var markerShopping = L.AwesomeMarkers.icon({markerColor: 'darkpurple'});
    var markerTourismService = L.AwesomeMarkers.icon({markerColor: 'cadetblue'});
    var markerTransferService = L.AwesomeMarkers.icon({markerColor: 'yellow'});
    var markerWineAndFood = L.AwesomeMarkers.icon({markerColor: 'black'});
    var markerBusStops = L.AwesomeMarkers.icon({markerColor: 'pink'});

    // DIFFERENTI LAYERS PER LE DIFFERENTI CATEGORIE
    var layerAccommodation = L.layerGroup();
    var layerCulturalActivity = L.layerGroup();
    var layerEducation = L.layerGroup();
    var layerEmergency = L.layerGroup();
    var layerEntertainment = L.layerGroup();
    var layerFinancialService = L.layerGroup();
    var layerGovernmentOffice = L.layerGroup();
    var layerHealthCare = L.layerGroup();
    var layerShopping = L.layerGroup();
    var layerTourismService = L.layerGroup();
    var layerTransferService = L.layerGroup();
    var layerWineAndFood = L.layerGroup();

    //Service Map
    // GENERAZIONE DEI LAYER PRINCIPALI
    var busStopsLayer = new L.LayerGroup();
    var servicesLayer = new L.LayerGroup();
    var clickLayer = new L.LayerGroup();
    var GPSLayer = new L.LayerGroup();
    var layerMarker = new L.FeatureGroup();

    // VARIABILI PER LA FUNZIONALITA' DI RICERCA INDIRIZZO APPROSSIMATIVO
    var selezioneAttiva = false;
    var ricercaInCorso = false;

    // VARIABILI PER LA FUNZIONALITA' DI RICERCA SERVIZI
    var selezione;
    var coordinateSelezione;
    var numeroRisultati;

    /** Set the Leaflet.markercluster for Leaflet. https://github.com/Leaflet/Leaflet.markercluster */
    var markerClusters = new L.MarkerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 50});
    /** Set the Leaflet Plugin Search. https://github.com/p4535992/leaflet-search.*/
    var controlSearch = new L.Control.Search({layer: markerClusters, initial: false, position:'topright'});

    // VARIABILI PER LA FUNZIONALITA' DI RICERCA SERVIZI
    var GPSControl = new L.Control.Gps({maxZoom: 16,style: null}); // AGGIUNTA DEL PLUGIN PER LA GEOLOCALIZZAZIONE
  /*  var geoCoderGoogle = L.Control.Geocoder.Google();
    var geoCoderControl = L.Control.geocoder({geocoder: geoCoderGoogle});*/
    var geoCoderGoogle,geoCoderControl,geocoderSearchGoogle;
    var btn,selection,marker;
    var selector = 'geocode-selector';
    var geocoders = {
        'Nominatim': L.Control.Geocoder.nominatim(),
        'Bing': L.Control.Geocoder.bing(bingAPIKey),
        'Mapbox': L.Control.Geocoder.mapbox(mapBoxAPIKey),
        'Google': L.Control.Geocoder.google(googleAPIKey),
        'Photon': L.Control.Geocoder.photon()
    };

    //Variabili suppport java SPRING
    var markerVar,nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar
        ,phoneVar,emailVar,faxVar,ivaVar,otherVar;
    var arrayMarkerVar =[]; // array support of makers

    /*** Set the src of the javascript file*/
    //var mySRC = jQuery('script[src$="resources/js_utility/leaflet_buildMap_support.js"]').attr('src').replace('js_utility/leaflet_buildMap_support.js', '');

    /*** On ready document  */
    jQuery( document ).ready(function() {
        try {
            initMap();
            // remove all cluster marker with a click on the reset button */
            jQuery('#pulsante-reset').click(function () {
                removeClusterMarker();
            });

           /* jQuery("#fieldSeparator").on("keyup", function () {
                setFieldSeparatorCSV($(this).val());
            });
            jQuery("#lineSeparator").on("keyup", function () {
                setLineSeparatorCSV($(this).val());
            });
            jQuery("#nameSeparator").on("keyup", function () {
                setTitleFieldCSV($(this).val());
            });*/

            //oppure $( window ).load(function(){
            //loading map...
            //$('#caricamento').delay(500).fadeOut('slow');
            /**all'apertura della pagina CREO LE TABS JQUERY UI NEL MENU IN ALTO */
            jQuery("#tabs").tabs();

            /** if you have add a new marker from spring put in the map. */
            if ((!jQuery.isEmptyObject(arrayMarkerVar)) && arrayMarkerVar.length > 0) {
                addMultipleMarker(arrayMarkerVar);
            }

            //ABILITA LA RICRECA NEI MARKER CON IL PLUGIN LEAFLET-SEARCH
            jQuery('#textsearch').on('keyup', function (e) {
                controlSearch.searchText(e.target.value);
            });

            //set a listener on the uploader button
            jQuery("#uploader").on('change', function (e) {
                try {
                    handleFiles2(e);
                } catch (e) {
                    alert(e.message);
                }
            });

            //var uploader = document.getElementById("#uploader");
            //uploader.addEventListener("change", handleFilesCSV, false);

            //Localize all Location near you
            $('#localizeName2').click(function () {
                map.locate();
                $('#localizeName2').text('Localization...');
                map.on('locationfound', function (e) {
                    map.setView(e.latlng, 15);
                    $('#localizeName2').text('Finding...');
                });
            });

            $("#clear").click(function (evt) {
                evt.preventDefault();
                $("#filter-string").val("").focus();
                addCsvMarkers();
            });

            $("#getMarkers").click(function () {
                getMarkers();
            });

            $('#filter-string').typeahead({source: typeAheadSource});

            /*** CLICCANDO SUL PULSANTE GPS VENGONO SALVATE LE COORDINATE ATTUALI PER LA RICERCA DI SERVIZI */
            $('.gps-button').click(function () {
                if (GPSControl._isActive == true) {
                    selezione = 'Posizione Attuale';
                    $('#selezione').html(selezione);
                    coordinateSelezione = "Posizione Attuale";
                    $('#raggioricerca').prop('disabled', false);
                    $('#numerorisultati').prop('disabled', false);
                }
            });

            /*** AL CLICK SUL PULSANTE DI SELEZIONE PUNTO SU MAPPA IN ALTO
             * A SX ATTIVO O DISATTIVO LA FUNZIONALITA' DI RICERCA */
            $('#info').find('img').click(function () {
                if ($(this).hasClass("active") == false) {
                    $(this).addClass("active");
                    selezioneAttiva = true;
                }
                else {
                    $(this).removeClass("active");
                    selezioneAttiva = false;
                }
            });

            //FUNZIONE PER MOSTRARE/NASCONDERE LE SUB CATEGORY
            $(".toggle-subcategory").click(function () {
                var $tsc = $(this);
                //getting the next element
                var $content = $tsc.next();
                if (!$content.is(":visible")) {
                    $('.subcategory-content').hide();
                    $('.toggle-subcategory').html('+');
                }
                //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
                $content.slideToggle(200, function () {
                    //execute this after slideToggle is done
                    //change text of header based on visibility of content div
                    $tsc.text(function () {
                        //change text based on condition
                        return $content.is(":visible") ? "-" : "+";
                    });
                });
            });

            //CHECKBOX SELECT/DESELECT ALL
            $('#macro-select-all').change(function () {
                if ($('#macro-select-all').prop('checked')) {
                    $('.macrocategory').prop('checked', 'checked');
                    $('.macrocategory').trigger("change");
                }
                else {
                    $('.macrocategory').prop('checked', false);
                    $('.macrocategory').trigger("change");
                }

            });

            //FUNZIONE PER MOSTRARE/NASCONDERE I MENU
            $(".header").click(function () {
                $header = $(this);
                //getting the next element
                $content = $header.next();
                //open up the content needed - toggle the slide- if visible, slide up, if not slidedown.
                $content.slideToggle(200, function () {
                    //execute this after slideToggle is done
                    //change text of header based on visibility of content div
                    $header.text(function () {
                        //change text based on condition
                        return $content.is(":visible") ? "- Nascondi Menu" : "+ Mostra Menu";
                    });
                });
            });

            // SELEZIONA/DESELEZIONA TUTTE LE CATEGORIE - SOTTOCATEGORIE
            $('.macrocategory').change(function () {
                $cat = $(this).next().attr('class');
                $cat = $cat.replace(" macrocategory-label", "");
                //console.log($cat);
                if ($(this).prop('checked')) {
                    $('.sub_' + $cat).prop('checked', 'checked');
                }
                else {
                    $('.sub_' + $cat).prop('checked', false);
                }
            });

            // AL CLICK SUL PULSANTE DI SELEZIONE PUNTO SU MAPPA IN ALTO A SX ATTIVO O DISATTIVO LA FUNZIONALITA' DI RICERCA
            $('#info').find('img').click(function () {
                if (!$('#info').hasClass("active")) {
                    $('#info').addClass("active");
                    selezioneAttiva = true;
                }
                else {
                    $('#info').removeClass("active");
                    selezioneAttiva = false;
                }
            });
            alert("Loaded all JQUERY variable");

            //Search address with google...
            //jQuery("div.leaflet-control-geosearch").appendTo(jQuery("#search-address-with-google"));
            //<div class="leaflet-control-search leaflet-control search-exp">
            jQuery("#searchMarkerWithJavascript").appendTo(jQuery("#searchMarkerWithJavascript2"));

            //Help css for PluginLeafletGeocoder
            //<a class="leaflet-control-geocoder-icon" href="javascript:void(0);">&nbsp;</a>
            jQuery("a").remove(jQuery(".leaflet-control-geocoder-icon"));
            //<div class="leaflet-control-geocoder leaflet-bar leaflet-control leaflet-control-geocoder-expanded">
            jQuery(".leaflet-control-geocoder").appendTo(jQuery("#searchMarkerWithJavascript3"));



            alert("Loaded all JQUERY variable");
            //implement select of the geocoder.
            for (var name in geocoders) {
                btn = L.DomUtil.create('button', 'leaflet-bar', selector);
                btn.innerHTML = name;
                (function (n) {
                    L.DomEvent.addListener(btn, 'click', function () {
                        select(geocoders[n], this);
                    }, btn);
                })(name);
                if (!selection) select(geocoders[name], btn);
                $('#geocode-selector').append(btn);
            }// end of the for...
        }catch(e){alert(e.message);}


    });

    /**
     * function to get the information on the marker ont he Layer to a Array to pass
     * by create a list of input to pass to a specific form.
     * */
    function getMarkers(){
        var array = [];
        //alert("compile getMarkers");
        try{
            if(!$.isEmptyObject(markerClusters)) {
                alert("Marker cluster is not empty go to check the Marker.");
                markerClusters.eachLayer(function (layer) {
                    try {
                        var lat = layer.getLatLng().lat;
                        var lng = layer.getLatLng().lng;
                        var label;
                        //label = layer.getLabel()._content;
                        if(lat!=0 && lng !=0) {
                            label = layer.label._content;
                            /*var location = layer.getLocation();*/
                            var popupContent = layer.getPopup().getContent();
                            //alert("marker number():" + lat + "," + lng + "," + label + "," + popupContent);
                            array.push({name: label, lat: lat, lng: lng, description: popupContent});
                        }
                        //i++;
                    }catch(e){
                        alert("Exception:getMarkers -> "+e.message);
                    }
                });
            }
        }catch(e){alert(e.message);}
        alert("...compiled getMarkers");
        //var array = getMarkers();
        for (var i = 0; i < array.length; i++) {
            try {
                addInput('nameForm' + i, array[i].name, i);
                addInput('latForm' + i, array[i].lat, i);
                addInput('lngForm' + i, array[i].lng, i);
                addInput('descriptionForm' + i, array[i].description, i);
            }catch(e){alert(e.message);}
        }
        //alert(document.getElementById('uploader').value);
        //<input type="submit" name="GetMarkersParam" value="getMarkers" />
        var input = document.createElement('input');
        input.setAttribute('id', 'supportUploaderForm');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', document.getElementById('uploader').value);
        input.setAttribute('name',"supportUploaderParam");
        document.getElementById('loadMarker').appendChild(input);
        //alert("...compiled 2 getMarkers");
    }

    function addInput(input_id,val,index) {
        var input = document.createElement('input');
        input.setAttribute('id', input_id);
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', val);
        input.setAttribute('name', input_id.replace(index,'').replace('Form','Param1'));
        //document.body.appendChild(input);
        document.getElementById('loadMarker').appendChild(input);
        //setInputValue(input_id,val);
    }

    /***
     *  Set the map and zoom on the specific location
     */
    function initMap() {
        if(jQuery.isEmptyObject(map)) {
            alert("Init Map...");
            //valori fissi per il settaggio iniziale della mappa....
            // CREAZIONE MAPPA CENTRATA NEL PUNTO
            try {
                if (jQuery.isEmptyObject(markerClusters)) {
                    markerClusters = new L.MarkerClusterGroup();
                }
                //Make all popup remain open.
                L.Map = L.Map.extend({
                    openPopup: function(popup) {
                        //this.closePopup();  // just comment this
                        this._popup = popup;
                        return this.addLayer(popup).fire('popupopen', {
                            popup: this._popup
                        });
                    }
                });
                //Set map with leave all popup open...
                var latitude = 43.3555664; //43.3555664 40.46
                var longitude = 11.0290384; //11.0290384  -3.75
                //map = new L.map('map', {attributionControl:false}).setView([latitude, longitude], 5);
                map = new L.map('map').setView([latitude, longitude], 5);
                //map = new L.map('map', {center: center, zoom: 2, maxZoom: 9, layers: [basemap],attributionControl:false})
                // .setView([latitude, longitude], 5);
                //var map = L.map('map').setView([43.3555664, 11.0290384], 8);

                //Build your map
                L.tileLayer('http://c.tiles.mapbox.com/v3/examples.map-szwdot65/{z}/{x}/{y}.png', { // NON MALE
                    attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
                    key: 'BC9A493B41014CAABB98F0471D759707',
                    subdomains: ['otile1', 'otile2', 'otile3', 'otile4'],
                    //minZoom: 8,
                    maxZoom: 18
                }).addTo(map);
                //Set a bound window for the leaflet map for Toscany region
                //var bounds = new L.LatLngBounds(new L.LatLng(setBounds[0],setBounds[1]), new L.LatLng(setBounds[2], setBounds[3]));
                /*map.setMaxBounds(new L.LatLngBounds(new L.LatLng(41.7, 8.4), new L.LatLng(44.930222, 13.4)));*/
                //map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.
                //..add many functionality
                //addPluginGPSControl();
                //addPluginCoordinatesControl();
                //addPluginLayersStamenBaseMaps();
                //addPluginLocateControl();
                addPluginSearch(); //not necessary
                //addPluginGeoSearch();
                addPluginGeoCoder();
                addPluginFileLayer();

                //..add other functionality
                //map.on('click', onMapClick);
                //Fired when the view of the map stops changing
                map.on('moveend', onMapMove);
                /*map.on('viewreset', function() { resetShapes(); //resetStops();});*/
                //other function form Service Map
                // ASSOCIA FUNZIONI AGGIUNTIVE ALL'APERTURA DI UN POPUP SU PARTICOLARI TIPI DI DATI
                map.on('popupopen', function(e) {
                    $('#raggioricerca').prop('disabled', false);
                    $('#numerorisultati').prop('disabled', false);
                    var markerPopup = e.popup._source;
                    var tipoServizio = markerPopup.feature.properties.tipo;
                    var nome = markerPopup.feature.properties.nome;
                    selezione = 'Servizio: ' + markerPopup.feature.properties.nome;
                    coordinateSelezione = markerPopup.feature.geometry.coordinates[1] + ";" + markerPopup.feature.geometry.coordinates[0];
                    $('#selezione').html(selezione);
                    if (tipoServizio == 'fermata'){
                        // SE IL SERVIZIO E' UNA FERMATA MOSTRA GLI AVM NEL MENU CONTESTUALE
                        selezione = 'Fermata Bus: ' + markerPopup.feature.properties.nome;
                        coordinateSelezione = markerPopup.feature.geometry.coordinates[1] + ";" + markerPopup.feature.geometry.coordinates[0];
                        $('#selezione').html(selezione);
                        mostraAVMAJAX(nome);
                    }
                    if (tipoServizio == 'parcheggio_auto'){
                        // SE IL SERVIZIO E' UN PARCHEGGIO MOSTRA LO STATO DI OCCUPAZIONE NEL MENU CONTESTUALE
                        mostraParcheggioAJAX(nome);
                    }


                });
                alert("MAP IS SETTED");
                //$('#caricamento').delay(500).fadeOut('slow');
            } catch (e) {
                alert('Exception initMap():' + e.message);
            }
        }
    }



    /*** function for remove all cluster when the map is move */
    function onMapMove() {
        //Se muovi la mappa rimuove tutti i marker funziona!!.
        //removeClusterMarker();
    }

    /*** function Set a popup when you click on the map*/
    //var popupGlobal = L.popup();
    function onMapClick(e) {
        //popupGlobal.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
        // AL CLICK CERCO L'INDIRIZZO APPROSSIMATIVO
        if (selezioneAttiva == true){

            if (ricercaInCorso == false){
                $('#raggioricerca').prop('disabled', false);
                $('#numerorisultati').prop('disabled', false);

                ricercaInCorso = true;
                $('#info-aggiuntive').find('.content').html("Indirizzo Approssimativo: <img src=\"resources/img/ajax-loader.gif\" width=\"16\" />");
                clickLayer.clearLayers();
                //clickLayer = new L.LatLng(e.latlng);
                clickLayer = L.layerGroup([new L.marker(e.latlng)]).addTo(map);
                var latLngPunto = e.latlng;
                coordinateSelezione = latLngPunto.lat + ";" + latLngPunto.lng;
                var latPunto = String(latLngPunto.lat);
                var lngPunto = String(latLngPunto.lng);

                selezione = 'Coord: ' + latPunto.substring(0,7) + "," + lngPunto.substring(0,7);
                $('#selezione').html(selezione);
                $.ajax({
                    url : "${pageContext.request.contextPath}/resources/ajax/get-address.jsp",
                    type : "GET",
                    async: true,
                    //dataType: 'json',
                    data : {
                        lat: latPunto,
                        lng: lngPunto
                    },
                    success : function(msg) {
                        $('#info-aggiuntive').find('.content').html(msg);
                        ricercaInCorso = false;
                    }
                });
            }
        }
    }

    /*** function for add a marker to the leaflet map */
    function addSingleMarker(name, url, lat, lng,bounds) {
        //alert("... add single marker:" + name + ',' + url + ',' + lat + ',' + lng);
        try {
            if (jQuery.isEmptyObject(markerClusters)) {
                markerClusters = new L.MarkerClusterGroup();
            }
            if(!jQuery.isEmptyObject(bounds)){
                map.setBounds(bounds);
            }
            //var marker = L.marker([lat, lng]).bindPopup(popupClick).addTo(map);
            //var cc = L.latLng(43.7778535, 11.2593572);
            var text;
            if(!$.isEmptyObject(url)) text = '<a class="linkToMarkerInfo" href="' + url + '" target="_blank">' + name + '</a>';
            else  text = ''+name + '';

            var title,loc;
            try {
                /*marker = new L.marker([parseFloat(lat), parseFloat(lng)], {draggable:false}, { icon: deathIcon},{title: name} )
                    .bindLabel(text, { noHide: true }).addTo(map);
                */
                title = name;	//value searched
                loc = [parseFloat(lat), parseFloat(lng)];		//position found
                markerVar = new L.Marker(new L.latLng(loc), {title: title} ).bindLabel(name, { noHide: true });//se property searched
                //marker.bindPopup('title: '+ title );
            }catch(e){
                try{
                    /*marker = new L.marker([lat, lng], {draggable:false}, { icon: deathIcon},{title: name})
                        .bindLabel(text, { noHide: true }).addTo(map);*/
                    title = name;	//value searched
                    loc = [lat,lng];	//position found
                    markerVar = new L.Marker(new L.latLng(loc), {title: title} ).bindLabel(name, { noHide: true });//se property searched
                }catch(e){
                    alert(e.message);
                    alert("Sorry the program can't find Geographical coordinates for this Web address,check if the Web address is valid");
                }
            }
            //...set the popup on mouse over
            //var latlngOver = L.latLng(latVar, lngVar);
            //...set the popup on mouse click

            //var popupClick = new L.popup().setContent(text);
            var popupContent = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
            var  attr = '<a target="_blank" href="' + url + '">'+ name + '</a>';
            popupContent += '<tr><th>title</th><td>'+ title +'</td></tr>'+
                            '<tr><th>Site</th><td>'+ attr +'</td></tr>'+
                            '<tr><th>Regione:</th><td>'+regionVar+'</td></tr>'+
                            '<tr><th>Provincia:</th><td>'+provinceVar+'</td></tr>'+
                            '<tr><th>Città:</th><td>'+cityVar+'</td></tr>'+
                            '<tr><th>Indirizzo:</th><td>'+addressVar+'</td></tr>'+
                            '<tr><th>Telefono/Cellulare:</th><td>'+phoneVar+'</td></tr>'+
                            '<tr><th>Fax:</th><td>'+faxVar+'</td></tr>'+
                            '<tr><th>Email:</th><td>'+emailVar +'</td></tr>'+
                            '<tr><th>IVA:</th><td>'+ivaVar+'</td></tr>';
                            '<tr><th>Other:</th><td>'+otherVar+'</td></tr>';
            popupContent += '</table></div>';
            var popupOver = new L.popup().setContent(popupContent);
            //marker.bindPopup(popupClick);
            markerVar.bindPopup(popupOver);
            //..set some action for the marker
            //evt.target is the marker where set the action
            //marker.on('mouseover', function (e) {e.target.bindPopup(popupOver).openPopup();});
            //marker.on('mouseout', function (e) { e.target.closePopup();});
            markerVar.on('click', function (e) { e.target.bindPopup(popupOver).openPopup();});
           //marker.on('dblclick',function (e) { map.removeLayer(e.target)});
            /*marker.on('click', onMarkerClick(), this);*/
            //..add marker to the array of cluster marker
            markerClusters.addLayer(markerVar);
            //...set to a Global variable for use with different javascript function
            //map.addLayer(markerClusters);
            markerClusters.addTo(map);
            map.setView([lat, lng], 8);
            //return {name: name, url: url, latitudine: lat, longitudine: lng};
        }catch(e) {
            alert(e.message);
            alert("Sorry the program can't create the Marker");
        }
    }

    /*** function for remove all cluster marker on the leaflet map */
    function removeClusterMarker(){
        alert("compile removeClusterMarker...");
        if(arrayMarkerVar.length > 0) {
            for (var i = 0; i < arrayMarkerVar.length; i++) {

                map.removeLayer(arrayMarkerVar[i]);//...remove every single marker
            }
            arrayMarkerVar.length = 0; //...reset array
        }
        markerClusters.eachLayer(function (layer) {
            layer.closePopup();
            map.removeLayer(layer);
        });
        map.closePopup();
        map.removeLayer(markerClusters);//....remove layer
        points.clearLayers();
        alert("...compiled removeClusterMarker");
    }

    function chooseIcon(category){
        alert("chooseIcon");
        var url;
        if(category == "") {url = 'resources/js/leaflet/images/marker-icon.png';}
        else if(category == "Bank") {url = "resources/js/leaflet/images/marcador-bankia.png";}
        else{ url = 'resources/js/leaflet/images/marker-icon.png';}

        return L.icon({
            iconUrl: url,
            //iconUrl: 'http://www.megalithic.co.uk/images/mapic/' + feature.properties.Icon + '.gif',//from a field Icon data.
            shadowUrl: 'resources/js/leaflet/images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            shadowAnchor: [13, 20]
        })
    }

    /**
     * function to add for every single object marker a Leaflet Marker on the Leaflet Map.
     */
    function addMultipleMarker(markers){
        alert("add multiple marker "+markers.length+"...");
        try {
            for (var i = 0; i < markers.length; i++) {
                alert("... add single marker (" + i + "):"
                    + markers[i].name + ',' + markers[i].url + ',' + markers[i].lat + ',' + markers[i].lng);
                regionVar = markers[i].region;
                provinceVar = markers[i].province;
                cityVar =  markers[i].city;
                addressVar =  markers[i].address;
                phoneVar =  markers[i].phone;
                emailVar =  markers[i].email;
                faxVar =  markers[i].fax;
                ivaVar =  markers[i].iva;
                addSingleMarker(markers[i].name, markers[i].url, markers[i].lat, markers[i].lng)
            }
            alert("... addeed multiple marker");
        }catch(e){
            alert(e.message);
        }
    }

    /**
     * function to add every single company from java object in JSP page to a javascript array
     */
    function pushMarkerToArrayMarker(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar,phoneVar,emailVar,faxVar,ivaVar){
        /*nameVar = document.getElementById('nameForm').value;*/
        alert("pushing the element =>Name:" + nameVar + ',URL:' + urlVar + ',LAT:' + latVar + ',LNG:' + lngVar+"...");
        var markerVar = { name:nameVar,url:urlVar,lat:latVar,lng:lngVar,
            region:regionVar,province:provinceVar,city:cityVar,address:addressVar,phone:phoneVar,email:emailVar,
            fax:faxVar, iva:ivaVar};
        arrayMarkerVar.push(markerVar);
        alert("....pushed a marker tot he array on javascript side:"+ markerVar.toString());
    }

    /**
     * Add the Leaflet Plugin Search.
     * https://github.com/p4535992/leaflet-search.
     */
    function addPluginSearch(){
        try{
            geocoderSearchGoogle = new google.maps.Geocoder();
        }catch(e){
            alert("Warning:addPluginSearch->"+e.message)
            geocoderSearchGoogle = null;
        }
        alert("compile addPluginSearch...");
        try {
            if (!jQuery.isEmptyObject(markerClusters)) {
                /* controlSearch = new L.Control.Search({layer: markerClusters, initial: false,collapsed: false});*/
                if (jQuery.isEmptyObject(geocoderSearchGoogle)) {
                    alert("21");
                    controlSearch = new L.Control.Search({
                        container: "searchMarkerWithJavascript", layer: markerClusters, initial: false, collapsed: false
                    });
                } else {
                    controlSearch = new L.Control.Search({
                        container: "searchMarkerWithJavascript",
                        layer: markerClusters,initial: false,collapsed: false,
                        sourceData: googleGeocoding,formatData: formatJSON,
                        markerLocation: true,autoType: false,autoCollapse: true, minLength: 2,zoom: 10
                    });
                }
                map.addControl(controlSearch);
            }
            alert("...compiled addPluginSearch");
        }catch(e){
            alert("Exception:addPluginSearch->"+e.message);
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

    /**
     * Add the Leaflet leaflet-control-geocoder.
     * https://github.com/perliedman/leaflet-control-geocoder
     * https://github.com/patrickarlt/leaflet-control-geocoder
     */
    function addPluginGeoCoder() {
        alert("Compile addPluginGeoCoder...");
        try {
            if (jQuery.isEmptyObject(geoCoderControl)) {
                selector = L.DomUtil.get('geocode-selector');
                geoCoderControl = new L.Control.Geocoder({ geocoder: null },{collapsed: false});
                geoCoderControl.addTo(map);
            } else {
                map.addControl(geoCoderControl);
            }
            alert("...compiled addPluginGeoCoder");
        }catch(e){
            alert("Exception:addPluginGeoCoder->"+e.message);
        }
    }

    /**
     * Add the Leaflet leaflet-filelayer.
     * https://github.com/makinacorpus/Leaflet.FileLayer
     */
    function addPluginFileLayer(){
        L.Control.FileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
        L.Control.fileLayerLoad({
            //TRY OUT CSV
            latitudeColumn: 'lat',
            longitudeColumn: 'lng',
            //TRY OUT RDF/XML
            /*latitudeColumn: 'geo:lat',
            longitudeColumn: 'geo:long',
            rdfLink: ['gr:hasPOS'],
            rdfAboutLink: 'rdf:about',    */
            popupTable:true,
            geojsonLayer :markerClusters,
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
    }

    function select(geocoder, el) {
        if (selection) L.DomUtil.removeClass(selection, 'selected');
        geoCoderControl.options.geocoder = geocoder;
        L.DomUtil.addClass(el, 'selected');
        selection = el;
    }

    function invokePluginGeoCoderGoogle(geoCoderControl){
        //convert latlng to Address
        //geocodergoogle.reverse(e.latlng, map.options.crs.scale(map.getZoom()), function(results) {});
        try {
           geoCoderControl.options.geocoder.markGeocode = function (result) {
                alert("88:" + result.toSource());
                //var marker = new L.Marker(result.center).bindPopup(result.html || result.name);
                addressVar = jQuery("#").val();
                otherVar = result.html;
                alert("add marker:" + result.name + "," + result.center.lat + "," + result.center.lng + "," + otherVar);
                pushMarkerToArrayMarker(result.name, null, result.center.lat, result.center.lng,
                    null,null,null,addressVar,null,null,null,null);
                /*var bbox = result.bbox;
                 L.polygon([
                 bbox.getSouthEast(),
                 bbox.getNorthEast(),
                 bbox.getNorthWest(),
                 bbox.getSouthWest()
                 ]).addTo(map);*/
             /* geoCoderControl.options.geocoder.geocode(address, function(results) {
                    var latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
                    marker = new L.Marker (latLng);
                    map.addlayer(marker);
                    addressVar = address;
                    otherVar = result.html;
                    alert("add marker:" + result.name + "," + result.center.lat + "," + result.center.lng + "," + otherVar);
                    pushMarkerToArrayMarker(result.name, null, result.center.lat, result.center.lng,
                        null,null,null,addressVar,null,null,null,null);
                    });*/
               /* geoCoderControl.options.geocoder.geocode(address, function(results) {
                    var latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
                    marker = new L.Marker (latLng);
                    map.addlayer(marker);
                });*/
            };

           /* Then you can use the following code to 'geocode' your address into latitude / longitude. This function will
            return the latitude / longitude of the address. You can save the latitude / longitude in an variable so you
            can use it later for your marker. Then you only have to add the marker to the map.*/
           /*
            var yourQuery = '(Addres of person)';
            geocoder.geocode(yourQuery, function(results) {
                //latLng= new L.LatLng(results[0].center.lat, results[0].center.lng);
                //marker = new L.Marker (latLng);
                //map.addlayer(marker);
                pushMarkerToArrayMarker(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar,phoneVar,emailVar,faxVar,ivaVar)
             });
            */
            alert("g marker:" + g.name + "," + g.center.lat + "," + g.center.lng + "," + otherVar);
        }catch(e){alert("Exception:invokePluginGeoCoder->"+ e.message)}

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



    //-------------------------------------------------
    //OLD METHODS Service-Map
    //-------------------------------------------------
    // RESET DI TUTTI I LAYERS SULLA MAPPA
    function svuotaLayers(){
        //clickLayer.clearLayers();
        busStopsLayer.clearLayers();
        servicesLayer.clearLayers();
        GPSLayer.clearLayers();
    }

    // CANCELLAZIONE DEL CONTENUTO DEL BOX INFO AGGIUNTIVE
    function svuotaInfoAggiuntive(){
        $('#info-aggiuntive').find('.content').html('');
    }

    function cancellaSelezione(){
        $('#selezione').html('Nessun punto selezionato');
        selezione = null;
        coordinateSelezione = null;
    }


    // FUNZIONE DI RESET GENERALE
    function resetTotale(){
        clickLayer.clearLayers();
        svuotaInfoAggiuntive();
        svuotaLayers();
        cancellaSelezione();
        $('#macro-select-all').prop('checked', false);
        $('.macrocategory').prop('checked', false);
        $('.macrocategory').trigger( "change" );
        $('#raggioricerca')[0].options.selectedIndex = 0;
        $('#raggioricerca').prop('disabled', false);
        $('#numerorisultati')[0].options.selectedIndex = 0;
        $('#numerorisultati').prop('disabled', false);
        $('#elencolinee')[0].options.selectedIndex = 0;
        $('#elencoprovince')[0].options.selectedIndex = 0;
        $('#elencofermate').html('<option value=""> - Seleziona una Fermata - </option>');
        $('#elencocomuni').html('<option value=""> - Seleziona un Comune - </option>');
        $('#info').removeClass("active");
        selezioneAttiva = false;
    }


    // MOSTRA ELENCO FERMATE DI UNA LINEA
    function mostraElencoFermate(selectOption) {
        if (selectOption.options.selectedIndex != 0){
            $('#elencoprovince')[0].options.selectedIndex = 0;
            $('#elencocomuni').html('<option value=""> - Seleziona un Comune - </option>');
            $('#loading').show();
            $.ajax({
                url : "${pageContext.request.contextPath}/ajax/bus-stops-list.jsp",
                type : "GET",
                async: true,
                //dataType: 'json',
                data : {
                    nomeLinea: selectOption.options[selectOption.options.selectedIndex].value
                },
                success : function(msg) {
                    $('#elencofermate').html(msg);
                    $('#loading').hide();
                }
            });
        }
    }












