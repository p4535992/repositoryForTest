/**
 * Usage:
 * corslite('http://b.tiles.mapbox.com/v3/tmcw.dem.json', function(err, resp) {
 *  // resp is the XMLHttpRequest object
 * }, true); // cross origin?
 *
 * false, // `false` makes the request synchronous
 'json'
 */
function corslite(url, callback, cors) {
    return corslite2(url, callback, cors, null, null, null, null);
}

/*
function corslite2(url, callback) {
    return corslite2(url, callback, true, null, null, null, null);
}

function corslite2(url, callback, method, data) {
    return corslite2(url, callback, true, method, data, false /!*`false` makes the request synchronous*!/, null);
}

function corslite2(url, callback, method, data, dataType) {
    return corslite2(url, callback, true, method, data, false /!*`false` makes the request synchronous*!/, dataType);
}
*/

function corslite2(url, callback, cors, method, data, sync, dataType) {
    "use strict";

    var sent = false;

    if (typeof window.XMLHttpRequest === 'undefined') {
        return callback(Error('Browser not supported'));
    }
    //
    if (typeof cors === 'undefined' || cors == null) {
        var m = url.match(/^\s*https?:\/\/[^\/]*/);
        cors = m && (m[0] !== location.protocol + '//' + location.hostname +
            (location.port ? ':' + location.port : ''));
    }

    var x;

    corslite.set = function() {
        var xhr;
        if (typeof window.XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
        else if (window.XMLHttpRequest) xhr =  new window.XMLHttpRequest(); // if some version of Mozilla, Safari etc
        else {
            //For very old browser
            var versions = [
                "MSXML2.XmlHttp.6.0", "MSXML2.XmlHttp.5.0", "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0", "MSXML2.XmlHttp.2.0", "Microsoft.XmlHttp"
            ];
            for (var i = 0; i < versions.length; i++) {
                try {
                    xhr = new ActiveXObject(versions[i]);
                } catch (e) {
                }
            }
            return callback(Error('Browser not supported'));
        }

        if (cors && !('withCredentials' in xhr)) {
            // IE8-9
            try {
                xhr = new window.XDomainRequest();
            }catch(e){
                //if not support the XDomainRequest...
                if(!xhr) xhr = set();
            }

            // Ensure callback is never called synchronously, i.e., before
            // x.send() returns (this has been observed in the wild).
            // See https://github.com/mapbox/mapbox.js/issues/472
            var original = callback;
            callback = function () {
                if (sent) {
                    original.apply(this, arguments);
                } else {
                    var that = this, args = arguments;
                    setTimeout(function () {
                        original.apply(that, args);
                    }, 0);
                }
            }
        }
        return xhr;
    };

    function isSuccessful(status) {
        return status >= 200 && status < 300 || status === 304;
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


    corslite.post = function (url, data, callback, sync, dataType) {
        var query = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) { //avoid warning compiler..
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        corslite.send(url, function (result) {
            //console.info("Response send:"+JSON.stringify(result.responseText));
            callback(result);
        }, 'POST', query.join('&'), sync, dataType)
            .then(function (result) {
                callback(result);// Code depending on result
            }).catch(function (reject) {
            callback(reject);// An error occurred
        });
    };

    corslite.get = function (url, data, callback, sync) {
        var query = [];
        for (var key in data) {
            if (data.hasOwnProperty(key)) { //avoid warning compiler..
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
        }
        corslite.send(url + (query.length ? '?' + query.join('&') : ''),  function (result) {
                //console.info("Response send:"+JSON.stringify(result.responseText));
                callback(result);
            }, 'GET', null, sync)
            .then(function (result) {
                callback(result);// Code depending on result
            }).catch(function (reject) {
            callback(reject);// An error occurred
        });
    };

    corslite.send = function (url, callback, method, data, sync, dataType) {
        return new Promise(function (resolve, reject) {
            x = corslite.set();
            //If you directly use a XMLHTTPRequest object, pass false as third argument to .open.
            x.open(method, url, sync);
            if (method == 'POST') {
                if (dataType.toLowerCase() == 'json') {
                    x.setRequestHeader('Content-type', 'application/json; charset=utf-8;');
                }
            }
            // Both `onreadystatechange` and `onload` can fire. `onreadystatechange`
            // has [been supported for longer](http://stackoverflow.com/a/9181508/229001).
            if ('onload' in x) {
                // x.onload = function loadState() {
                x.onload = function() {
                    if (x.status === undefined || isSuccessful(x.status) || window.location.href.indexOf("http") == -1) {
                        resolve(this.response);
                        //console.log(JSON.stringify(JSON.parse(this.responseText)));
                        //callback.call(this, null, this);
                        callback(this);
                    }
                    else {
                        reject(Error(this.statusText));
                        //console.error(JSON.stringify(JSON.parse(this.responseText)));
                        //callback.call(this, this, null);
                        callback(this);
                    }
                }
            } else {
                //  x.onreadystatechange = function readystate() {
                x.onreadystatechange = function() {
                    //if (x.readyState === 4) loaded();
                    if (x.readyState == XMLHttpRequest.DONE) {
                        // Success! when the request is loaded,Resolve the promise with the response text
                        if (x.status === undefined || isSuccessful(x.status) || window.location.href.indexOf("http") == -1) {
                            resolve(this.response);
                            //console.log(JSON.stringify(JSON.parse(this.responseText)));
                            //callback.call(this, null, this);
                            callback(this);
                        }
                        // Otherwise reject with the status text,which will hopefully be a meaningful error
                        else {
                            reject(Error(this.statusText));
                            //console.error(JSON.stringify(JSON.parse(this.responseText)));
                            //callback.call(this, this, null);
                            callback(this);
                        }
                    }//if done...
                };
            }

            // Handle network errors
            x.onerror = function () {
                //reject(Error("Network Error"));
                callback.call(x, x, null);
            };
            // Send the request. Sending data is not supported.
            //x.send(data)
            x.send(null);
            //x.send();
        }); //end of promise
    };

    // GET is the only supported HTTP Verb by XDomainRequest and is the
    // only one supported here.
    //x.open('GET', url, true);

    // Send the request. Sending data is not supported.
    //x.send(null);

    if(sync == null) sync = false; /*`false` makes the request synchronous*/
    try {
        if (method == null) {
            corslite.get(url, null, function (data) {
                callback(data);
            }, true); //classic old use of corslite...
        } else if (method == 'GET') {
            corslite.get(url, data, function (data) {
                callback(data);
            }, sync);
        } else if (method == 'POST') {
            corslite.post(url, data, function (data) {
                callback(data);
            }, sync, dataType);
        }
    }catch(e){
        console.error(e.message);
    }

    //Finish to check the state

    // Call the callback with the XMLHttpRequest object as an error and prevent
    // it from ever being called again by reassigning it to `noop`
    x.onerror = function error(evt) {
        // XDomainRequest provides no evt parameter
        callback.call(this, evt || true, null);
        callback = function () {
        };
    };

    // IE9 must have onprogress be set to a unique function.
    x.onprogress = function () {
    };

    x.ontimeout = function (evt) {
        callback.call(this, evt, null);
        callback = function () {
        };
    };

    x.onabort = function (evt) {
        callback.call(this, evt, null);
        callback = function () {
        };
    };

    sent = true;
    //return x;

}

if (typeof module !== 'undefined') module.exports = corslite2;
