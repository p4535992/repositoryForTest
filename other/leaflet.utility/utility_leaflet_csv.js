
    //VARAIABILI SUPPORTO CSV
    var fieldSeparatorCSV = "|";
    var lineSeparatorCSV ='\n';
    var titleFieldCSV ='Name';
    var categoriaIcon = "Categoria";
    var typeAheadSource = [];
    var points;
    var dataUrl = 'resources/file/data.csv';
    var popupOpts = {autoPanPadding: new L.Point(5, 50,true),autoPan: true};

    //support for the search...
    var hits = 0;
    var total = 0;
    var filterString;

    function setFieldSeparatorCSV(fieldSeparator){
        alert("SET Field:"+fieldSeparator);
         fieldSeparatorCSV = fieldSeparator;
    }

    function setLineSeparatorCSV(lineSeparator){
        alert("SET Line:"+lineSeparator);
        lineSeparatorCSV = lineSeparator;
    }

    function setNameSeparatorCSV(titleField){
        alert("SET Name:"+titleField);
        titleFieldCSV = titleField;
    }

    function setTitleFieldCSV(titleField){
        alert("SET Title:"+titleField);
        titleFieldCSV = titleField;
    }

    var utility_leaflet_csv = {
        loadCSVFromURL: function(url){
            loadCSVFromURL(url);
        },
        handleFileCSV: handleFilesCSV,
        handleFileSelect: handleFileSelect,
        //addCsvMarkers : addCsvMarkers,
        setLineSeparator: function(lineSeparator){
            setLineSeparatorCSV(lineSeparator);
        },
        setFieldSeparator: function(fieldSeparator){
            setFieldSeparatorCSV(fieldSeparator);
        },
        setTitleFieldCSV: function(titleField){
            setTitleFieldCSV(titleField);
        }
    };



    var dataCsv;
    function handleFilesCSV(evt){
        alert("compile handleFilesCSV...");
        if(map==null) leaflet_buildMap_support.initMap();
        //var nameCSVFile = handleFileSelect(evt);
        var fileName = evt.target.files[0].name;
        var dataUrl = 'resources/file/'+fileName;
        alert("nameCSVFile:"+dataUrl);
        //loadCSVFromURL(dataUrl);
        $.ajax ({
            type:'GET',
            dataType:'text',
            url: dataUrl,
            contentType: "text/csv; charset=utf-8",
            error: function() {
                alert('Error retrieving csv file');
            },
            success: function(csv) {
                dataCsv = csv;
                populateTypeAhead(csv, fieldSeparatorCSV);
                typeAheadSource = ArrayToSet(typeAheadSource);
                $('#filter-string').typeahead({source: typeAheadSource});
                loadCSVFromURL(dataUrl);
                alert("points:"+points);
                addCsvMarkers();
                //map.fitBounds(cluster.getBounds());
            }
        });
        setSourceOfSearch1();
        alert("...compiled handleFilesCSV");
    }

    /** */
    function setSourceOfSearch1(){
        var typeAheadSource2 = ArrayToSet(typeAheadSource);
        $('#filter-string').typeahead({source: typeAheadSource2});//set search of the marker
    }

    function addElementToSourceOfSearch1(newElement,delimiter){
        var items = newElement.split(delimiter);
        for (var j = items.length - 1; j >= 0; j--) {
            var item = items[j].strip();
            item = item.replace(/"/g,'');
            if (item.indexOf("http") !== 0 && isNaN(parseFloat(item))) {
                typeAheadSource.push(item);
                var words = item.split(/\W+/); //split for every non alphanumeric character.
                for (var k = words.length - 1; k >= 0; k--) {
                    typeAheadSource.push(words[k]);
                }
            }
        }
    }



    //------------------------------------------------------
    //LOAD CSV
    //-----------------------------------------------------
    /**
     * function for parse a url given on the HTML code.
     * e.g. <a href="?csv=48.8566;;2.3522;;París, capital de Francia||40.4168;;-3.7038;;</a>
     */
    function getFromURL(urlCSV) {
        //The methods your tried don't take an URL as argument, but parse the current URL parameters
        //var csv = window.location.href.slice(window.location.href.indexOf('?') + 1);
        var csv = urlCSV.slice(urlCSV.indexOf('?') + 1);
        csv = csv.split('csv=');
        if (csv.length != 2) {
            csv = '';
        } else {
            csv = csv[1];
        }
        return decodeURIComponent(csv);
    }

    /**configuración del GeoCSV, cambiamos el separador de líneas y el de campos por otros más apropiados para las URL*/
    function loadCSVFromHTML(){
        points = L.geoCsv (getFromURL(), {
            onEachFeature:function(f,l) {
                var popup = f.properties.popup;
                l.bindPopup(popup);
            },
            lineSeparator: lineSeparatorCSV,
            fieldSeparator: fieldSeparatorCSV
        });
    }

    /** function convert a Array to a set */
    function ArrayToSet(a) {
        var temp = {};
        for (var i = 0; i < a.length; i++)
            temp[a[i]] = true;
        var r = [];
        for (var k in temp)
            r.push(k);
        return r;
    }

    /** function populate a Array with csv data */
    function populateTypeAhead(csv, delimiter) {
        var lines = csv.split("\n");
        for (var i = lines.length - 1; i >= 1; i--) {
            var items = lines[i].split(delimiter);
            for (var j = items.length - 1; j >= 0; j--) {
                var item = items[j].strip();
                item = item.replace(/"/g,'');
                if (item.indexOf("http") !== 0 && isNaN(parseFloat(item))) {
                    typeAheadSource.push(item);
                    var words = item.split(/\W+/); //split for every non alphanumeric character.
                    for (var k = words.length - 1; k >= 0; k--) {
                        typeAheadSource.push(words[k]);
                    }
                }
            }
        }
    }

    if(typeof(String.prototype.strip) === "undefined") {
        String.prototype.strip = function() {
            return String(this).replace(/^\s+|\s+$/g, ''); //trim function
        };
    }

    var titleGlobal ;
    function loadCSVFromURL(urlCSV){
        try {
            //var scripts = document.getElementById('uploader');
            //urlCSV = scripts[scripts.length-1].src;
            alert("compile loadCSVFromURL:"+urlCSV.toString());
            //------------------------------------------------------------------
            //load local file CSV on Leaflet map.
            points = L.geoCsv(null, {
                firstLineTitles: true, fieldSeparator: fieldSeparatorCSV,lineSeparator: lineSeparatorCSV,
                onEachFeature: function (feature, layer) {
                    //alert("onEachFeature 1");
                    var popupContent = '<div class="popup-content"><table class="table table-striped table-bordered table-condensed">';
                    for (var clave in feature.properties) {
                        //layer = new L.marker({draggable:false}, { icon: deathIcon});
                        var title = points.getPropertyTitle(clave).strip();
                        var attr = feature.properties[clave];
                        var popupClick;
                        if (title === titleFieldCSV) {
                            layer.bindLabel(feature.properties[clave], {className: 'map-label',noHide: true});
                            titleGlobal = feature.properties[clave];
                            //layer.setTitle(feature.properties[clave]); //with plugin search
                        }
                       /* if(title === categoriaIcon || attr === categoriaIcon){
                            var codeIcon = leaflet_buildMap_support.chooseIcon(feature.properties[clave]);
                            arrayCodeIcon.push(codeIcon);
                        }*/
                        if (attr.indexOf('http') === 0) {
                            attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
                            popupClick = attr;
                        }
                        if (attr) {
                            popupContent += '<tr><th>'+title+'</th><td>'+ attr +'</td></tr>';
                        }
                    }
                    popupContent += "</table></div>";
                    //if(!$.isEmptyObject(codeIcon)) layer.setIcon(codeIcon);
                    layer.bindPopup(popupContent,popupOpts);
                    //layer.on('mouseover', function (e) {e.target.bindPopup(popupContent).openPopup();});
                    //layer.on('mouseout', function (e) { e.target.closePopup();});
                    layer.on('click', function (e) { e.target.bindPopup(popupContent).openPopup();});
                    //layer.on('dblclick',function (e) { map.removeLayer(e.target)});
                },
                pointToLayer: function (feature, latlng) {
                    return new L.marker(latlng,{
                        icon: L.icon({
                            iconUrl: 'resources/js/leaflet/images/marker-icon.png',
                            //iconUrl: 'http://www.megalithic.co.uk/images/mapic/' + feature.properties.Icon + '.gif',//from a field Icon data.
                            //iconUrl: 'http://www.megalithic.co.uk/images/mapic/' + feature.properties.Icon + '.gif',//from a field Icon data.
                            shadowUrl: 'resources/js/leaflet/images/marker-shadow.png',
                            iconSize: [25, 41],
                            shadowSize: [41, 41],
                            shadowAnchor: [13, 20]
                            })
                        }
                    );
                },
                style: function (feature) {
                    return feature.properties.style;
                },
                filter: function(feature) {
                    //alert("filter");
                    total += 1;
                    if (!filterString) {
                        hits += 1;
                        return true;
                    }
                    var hit = false;
                    var lowerFilterString = filterString.toLowerCase().strip();
                    $.each(feature.properties, function(k, v) {
                        var value = v.toLowerCase();
                        if (value.indexOf(lowerFilterString) !== -1) {
                            hit = true;
                            hits += 1;
                            return false;
                        }
                    });
                    return hit;
                }
            });
            //load csv with AJAX
            /*$.ajax({
             type: 'GET',
             dataType: 'text',
             url: urlCSV,
             error: function () {
             alert('Can\'t GET the data maybe the url:' + urlCSV + ' not exists.');
             },
             success: function (csv) {
             csvUrlFile.addData(csv);
             markerClusters.addLayer(csvUrlFile);
             map.addLayer(markerClusters);
             map.fitBounds(markerClusters.getBounds());
             },
             complete: function () {
             $('#caricamento').delay(500).fadeOut('slow');
             }
             });*/
            //------------------------------------------------------------------
            alert("... compiled loadCSVFromURL")
        }catch(e){alert(e.message());}
    }

    var addCsvMarkers = function() {
        try {
            if ($.isEmptyObject(points)) {
                alert("You can't do a research because there are no markers.");
            }
            alert("compile addCsvMarkers...");
            hits = 0;
            total = 0;
            filterString = document.getElementById('filter-string').value;
            //filterString = document.getElementById('textsearch').value;
            var markerClusters2;
            if (filterString) {
                //try a search....
                alert("fadeIn...");
                $("#clear").fadeIn();
                //map.removeLayer(markerClusters);
                //points.clearLayers();

                markerClusters2 = new L.MarkerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 50});
                points.addData(dataCsv);
                markerClusters2.addLayer(points);
                map.addLayer(markerClusters2);
            } else {
                alert("fadeOut...");
                $("#clear").fadeOut();
            }

            if ($.isEmptyObject(points)) {
                alert("The variable point of the CSV file is empty!");
            } else {
                points.addData(dataCsv);
                markerClusters.addLayer(points);
                map.addLayer(markerClusters);
                try {
                    var bounds;
                    //var bounds = markerClusters2.getBounds();
                    if(!$.isEmptyObject(markerClusters2)) {
                       /* markerClusters2.on('clusterclick', function (a) {
                            a.layer.zoomToBounds();
                        });*/
                        bounds = markerClusters2.getBounds();
                            /*southWest = bounds.getSouthWest(),
                            northEast = bounds.getNorthEast(),
                            lngSpan = northEast.lng - southWest.lng,
                            latSpan = northEast.lat - southWest.lat;*/
                        if (bounds) {
                            //map.fitBounds(bounds);
                            map.getBoundsZoom(bounds);
                            //map.zoomToBounds();
                        }
                    }else{
                        bounds = markerClusters.getBounds();
                          /*  southWest = bounds.getSouthWest(),
                            northEast = bounds.getNorthEast(),
                            lngSpan = northEast.lng - southWest.lng,
                            latSpan = northEast.lat - southWest.lat;*/
                        if (bounds) {
                            map.fitBounds(bounds);
                        }
                    }
                } catch (err) {alert(err.message);}
                if (total > 0) {
                    $('#search-results').html("Showing " + hits + " of " + total);
                }
                addPluginSearch();
                alert("...compiled addCsvMarkers");
                return false;
            }
        }catch(e){alert(e.message);}
    };

    //map.addLayer(markerClusters);

