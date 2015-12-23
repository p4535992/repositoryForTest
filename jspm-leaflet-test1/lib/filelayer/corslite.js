/**
 * Usage:
 * corslite('http://b.tiles.mapbox.com/v3/tmcw.dem.json', function(err, resp) {
 *  // resp is the XMLHttpRequest object
 * }, true); // cross origin?
 */
function corslite2(url, callback,cors){
    return corslite2(url, callback, cors, null, null, null);
}

function corslite2(url, callback, cors, method, data, sync, dataType) {
    "use strict"

    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }

    if (typeof cors === 'undefined') {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.hostname +
                (location.port ? ':' + location.port : ''));
    }

    //var x = new window.XMLHttpRequest();
    var x  = function() {
        if (typeof window.XMLHttpRequest !== 'undefined') return new XMLHttpRequest();
        else if(window.XMLHttpRequest) return new XMLHttpRequest(); // if some version of Mozilla, Safari etc
        else{
            //For very old browser
            var versions = [
                "MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"
            ];
            var xhr;
            for(var i = 0; i < versions.length; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                    return xhr;
                } catch (e) {}
            }
            return callback(Error('Browser not supported'));
        }

    };

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    if (cors && !('withCredentials' in x)) {
        // IE8-9
        x = new window.XDomainRequest();

        // Ensure callback is never called synchronously, i.e., before
        // x.send() returns (this has been observed in the wild).
        // See https://github.com/mapbox/mapbox.js/issues/472
        var original = callback;
        callback = function() {
            if (sent) {
                original.apply(this, arguments);
            } else {
                var that = this, args = arguments;
                setTimeout(function() {
                    original.apply(that, args);
                }, 0);
            }
        }
    }

    /*function loaded() {
        //XDomainRequest  + Modern Browser
        if ( x.status === undefined || isSuccessful(x.status) || window.location.href.indexOf("http") == -1) {
            callback.call(x, null, x);
        }
        else{
            callback.call(x, x, null);
        }
    }*/


    x.post = function(url, data, callback, sync,dataType) {
        var query = [];
        for (var key in data) {
            if(data.hasOwnProperty(key)) { //avoid warning compiler..
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        send(url, function (result) {callback(result);}, 'POST', query.join('&'), sync, dataType)
            .then(function (result) {
                callback(result);// Code depending on result
            }).catch(function (reject) {
                callback(reject);// An error occurred
            });
    };

    x.get = function(url, data, callback, sync) {
        var query = [];
        for (var key in data) {
            if(data.hasOwnProperty(key)) { //avoid warning compiler..
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, sync)
            .then(function (result) {
                callback(result);// Code depending on result
            }).catch(function (reject) {
                callback(reject);// An error occurred
            });
    };

    x.send = function(url, callback, method, data, sync,dataType) {
        return new Promise(function(resolve, reject) {
            //If you directly use a XMLHTTPRequest object, pass false as third argument to .open.
            x.open(method, url, sync);
            if (method == 'POST') {
                if (dataType.toLowerCase() == 'json'){
                    x.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
                }
            }

            // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
            // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
            if ('onload' in x) {
                //x.onload = loaded;
                x.onload = function loadState(){
                    if ( x.status === undefined || isSuccessful(x.status) || window.location.href.indexOf("http") == -1) {
                        resolve(x.response);
                        callback.call(x, null, x);
                    }
                    else{
                        reject(Error(x.statusText));
                        callback.call(x, x, null);
                    }
                }
            } else {
                x.onreadystatechange = function readystate() {
                    //if (x.readyState === 4) loaded();
                    if (x.readyState == XMLHttpRequest.DONE) {
                        if ( x.status === undefined || isSuccessful(x.status) || window.location.href.indexOf("http") == -1) {
                            // Success! when the request is loaded,Resolve the promise with the response text
                            resolve(x.response);
                            callback.call(x, null, x);
                        }
                        else{
                            // Otherwise reject with the status text,which will hopefully be a meaningful error
                            reject(Error(x.statusText));
                            callback.call(x, x, null);
                        }
                    }//if done...
                };
            }

            // Handle network errors
            x.onerror = function() {
                reject(Error("Network Error"));
                callback.call(x, x, null);
            };
            // Send the request. Sending data is not supported.
            //x.send(data)
            x.send(null);
        });
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    //x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    //x.send(null);

    if(method ==null) {
        x.get(url, null, callback, true); //classic old use of corslite...
    }else if(method == 'GET'){
        x.get(url, data, callback, sync);
    }else if(method == 'POST'){
        x.post(url, data, callback, sync, dataType);
    }

    //Finish to check the state

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function() { };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function() { };

    x.ontimeout = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    x.onabort = function(evt) {
        callback.call(this, evt, null);
        callback = function() { };
    };

    sent = true;
    return x;
}

if (typeof module !== 'undefined') module.exports = corslite2;
