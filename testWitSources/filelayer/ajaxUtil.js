/* example usage
 ajax.get('/test.php', {foo: 'bar'}, function() {});

    $.ajax({
        url: 'http://geojsonlint.com/validate',
        type: 'POST',
        data: good_geojson,
        dataType: 'json',
        success: processSuccess,
        error: processError
    });


*/
var ajax = {};

ajax.x = function() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for(var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function(url, callback, method, data, sync,contentType) {
    var x = ajax.x();
    x.open(method, url, sync);
    x.onreadystatechange = function() {
        if (x.readyState == XMLHttpRequest.DONE ) {
            if(x.status == 200 || window.location.href.indexOf("http") == -1){
                callback(x.responseText)
                var jsondata = eval("(" + x.responseText + ")"); //retrieve result as an JavaScript object
                if (jsondata.meta.code == 200) {
                    var info = jsondata.response.groups[0];
                    //..check if exists a correct json reaponse
                    if (typeof info != 'undefined') {
                        alert("info:" + info);
                    } else {
                        alert("Error on the content of the json response of the server");
                    }
                } else {
                    alert("Error on the response from the server");
                }//...if meta code request 200
               if(JSON.stringify(x.responseText,undefined,2)!= 'undefined' &&
                    JSON.stringify(x.responseText,undefined,2)!= '{}') {
                    //alert("xxxxxx" + JSON.stringify(x.responseText, undefined, 2));
                    ajax.result = x.responseText;
                }
                //ajax.result = x.responseText;
                //document.getElementById("myDiv").innerHTML = x.responseText;
            }
            else if(x.status == 400) {
                console.error('There was an error 400')
            }
            else {
                console.error('something else other than 200 was returned')
            }
        }
    };
    if (method == 'POST') {
        if(contentType.toLowerCase()=='json')x.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
    }
    x.send(data)
};

ajax.get = function(url, data, callback, sync) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, sync)
};

ajax.post = function(url, data, callback, sync,dataType) {
    if(ajax.flag==false) {
        ajax.flag =true;
        if (ajax.checkJQuery()) {
            $.ajax({
                url: url,
                type: 'POST',
                data: data,
                dataType: dataType.toLowerCase(),
                success: ajax.processSuccess,
                error: ajax.processError
            });
        } else {
            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            ajax.send(url, callback, 'POST', query.join('&'), sync, dataType)
        }
    }

};

ajax.processSuccess = function(data) {
    window.setTimeout(function () {
        if (JSON.stringify(ajax.result,undefined,2) == '{}' || typeof ajax.result === 'undefined') {
            if (data.status === 'ok') {
                alert('You just posted some valid GeoJSON!');
                ajax.result = true;
            } else if (data.status === 'error') {
                if (data.message == 'Data was not JSON serializeable.') {
                    //ignore this error
                    ajax.result = true;
                } else {
                    alert('There was a problem with your GeoJSON: ' + data.message);
                    ajax.result = false;
                }
            }
        }
    },500)


};

ajax.processError = function(){
    alert('There was a problem with your ajax.');
    ajax.result = false;
};

ajax.checkJQuery = function() {
    return (window.jQuery || typeof jQuery != 'undefined'); // jQuery is not loaded

};

ajax.result = {};
ajax.flag = false;

ajax.wait = function(result){
    if(result === 'undefined') {
        window.setTimeout(ajax.wait, 500); //check every 0.5 sec if the callback has done
    }else{
        return result;
    }
};

ajax._validateGeoJson = function(json){
    if (typeof json == 'string') {
        json = JSON.stringify(json, undefined, 2);
        json = JSON.parse(json);
    }
    ajax.post('http://geojsonlint.com/validate', json, function () {
        ajax.processSuccess(data);
    }, true, 'json');
    return ajax.result;
};

/**..if you use jquery*/
function GETWithJQuery(URL){
    var javaMarker;
    if(arrayMarkerVar.length >0 ) {
        //alert("exists a marker on the array!!")
        removeClusterMarker();
    }
    $.getJSON(URL, function(jsonData) {
        //alert( "Data Loaded from url:"+ URL + " = "+ data );
        alert( "Data Loaded 2: " + jsonData);
        /*
         var sayingsList = [];
         $.each(data, function(key, val) {
         sayingsList.push('<li>' + val + '</li>');
         });
         $('<ul/>', {
         html: sayingsList.join('')
         }).appendTo('#div4');*/
    }).done(function(data) {
        //$('#div4').append('getJSON request succeeded! </li>');
        try {
            //...test with response from google api
            var jsonString = JSON.stringify(data);
            alert( "JSON STRING: " + jsonString );
            if ($.isEmptyObject(data.results))
            {
                alert("Json array is empty: " + data.results[0]);
            }
            //http://stackoverflow.com/questions/13382364/jquery-and-json-array-how-to-check-if-array-is-empty-or-undefined
            else if (data.results == undefined || data.results == null || data.results.length == 0
                || (data.results.length == 1 && data.results[0] == "")){
                alert("Json array is empty 2: " + data.results[0]);
            }
            else {
                //alert("Data Loaded: " + data.results[0]);
            }
            var name = data.results[0].address_components[0].long_name;
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            //alert("NAME:"+ name +",COORDINATES:["+ lat +","+ lng +"]");
            javaMarker = addSingleMarker(name,URL,lat,lng);
            alert("getJSON request succeeded!");
            return javaMarker;
        }catch(e){
            alert(e.message );
            alert( "getJSON request failed!");
            //jsonData = $.parseJSON(data);
        }
        return javaMarker = {name:null, url:null, latitudine:null,longitudine:null};
    })
        .fail(function() {
            //$('#div4').append('getJSON request failed! </li>');
            alert( "getJSON request failed!");
            return javaMarker = {name:null, url:null, latitudine:null,longitudine:null};
        })
        .always(function() {
            //$('#div4').append('getJSON request ended! </li></li>');
            alert( "getJSON request ended!" );
        });

}//...askForPlotsWith JQUERY 2
