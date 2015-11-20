
    var utility_leaflet_nominatim = {
        chooseAddress: function(lat1, lng1, lat2, lng2, osm_type){
            chooseAddress(lat1, lng1, lat2, lng2, osm_type);
        },
        searchAddressNominatin:searchAddressNominatin
    };

    /**
     * http://derickrethans.nl/leaflet-and-nominatim.html.
     */
    function chooseAddress(lat1, lng1, lat2, lng2, osm_type) {
        var loc1 = new L.LatLng(lat1, lng1);
        var loc2 = new L.LatLng(lat2, lng2);
        var bounds = new L.LatLngBounds(loc1, loc2);

        if (feature) {
            map.removeLayer(feature);
        }
        if (osm_type == "node") {
            feature = L.circle( loc1, 25, {color: 'green', fill: false}).addTo(map);
            map.fitBounds(bounds);
            map.setZoom(18);
        } else {
            var loc3 = new L.LatLng(lat1, lng2);
            var loc4 = new L.LatLng(lat2, lng1);

            feature = L.polyline( [loc1, loc4, loc2, loc3, loc1], {color: 'red'}).addTo(map);
            map.fitBounds(bounds);
        }
    }

    /**
     * http://derickrethans.nl/leaflet-and-nominatim.html
     */
    function searchAddressNominatin(address) {
        //var inp = document.getElementById("addr").value;
        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + address, function(data) {
            var items = [];
            $.each(data, function(key, val) {
                bb = val.boundingbox;
                items.push("<li><a href='#' onclick='chooseAddr(" + bb[0] + ", " + bb[2] + ", " + bb[1] + ", " + bb[3]  +
                    ", \"" + val.osm_type + "\");return false;'>" + val.display_name + '</a></li>');
            });

            $('#results').empty();
            if (items.length != 0) {
                $('<p>', { html: "Search results:" }).appendTo('#results');
                $('<ul/>', {
                    'class': 'my-new-list',
                    html: items.join('')
                }).appendTo('#results');
            } else {
                $('<p>', { html: "No results found" }).appendTo('#results');
            }
        });
    }
