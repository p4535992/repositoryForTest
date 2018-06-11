/**
 * Created by 4535992 on 25/11/2015.
 */

/**
 * JavaScript format string functio
 */
String.prototype.format = function(){
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number){
        return typeof args[number] != 'undefined' ? args[number] :
        '{' + number + '}';
    });
};

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
};

String.prototype.endsWith = function(suffix) {
    return this.match(suffix+"$") == suffix;
};

String.prototype.replaceAll = function(find,replace){
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }
    //if the string is short is more convenient use the split-join method.
    if(this.length <= 1000){
        return this.split(find).join(replace);
    }else{
        return this.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
        // return this.replace(new RegExp('[' + find + ']', 'g'), replace);
    }
};

// left trim
String.prototype.ltrim = function () {
    return this.replace(/^\s+/, '');
};

// right trim
String.prototype.rtrim = function () {
    return this.replace(/\s+$/, '');
};

// left and right trim
String.prototype.trim = function () {
    return this.ltrim().rtrim();
};

String.prototype.contains = function(it,indexStart) {
    //before ecmescript 6
    if(isES6Supported()){
        //after ecmascript 6
        if(indexStart == null || typeof indexStart == 'undefined'){
            return this.includes(it);
        }else{
            return this.includes(it,indexStart);
        }
    }else{
        if (!String.prototype.contains) {
            String.prototype.contains = function(s, i) {
                return this.indexOf(s, i) != -1;
            }
        }
    }

};

//-------------------------------------------------------------------------------------------
// ARRAY
//-------------------------------------------------------------------------------------------

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;
    for (var i = 0, l = this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

/**
 * var l = ["hello" , "world"];
 * l.foldl(function(i, acc) { return acc+" "+i; }, "") // => returns "hello world"
 * @param fnc
 * @param start
 * @returns {*}
 */
Array.prototype.foldl = function(fnc,start) {
    var a = start;
    for (var i = 0; i < this.length; i++) {
        a = fnc(this[i],a);
    }
    return a;
};

Array.prototype.containsAndReturnIndex = function(obj) {
    for (var i=0; i < this.length; i++) {
        if(this[i] === obj) return i;
    }
    return -1;
};

Array.prototype.containsx = function(obj) {
    for (var i=0; i < this.length; i++) {
        if(this[i] === obj) return true;
    }
    return false;
};

Array.prototype.clean = function(){
   this.length = 0; //...reset array
};

// insert element at index
Array.prototype.insertAt = function(element, index) {
    this.splice(index, 0, element);
};

// delete element from index
Array.prototype.removeAt = function(index) {
    this.splice(index, 1);
};

Array.prototype.first = function() {
    return this[0] || undefined;
};

Array.prototype.last = function() {
    if(this.length > 0) {
        return this[this.length - 1];
    }
    return undefined;
};

Array.prototype.max = function(array){
    return Math.max.apply(Math, array);
};

Array.prototype.min = function(array){
    return Math.min.apply(Math, array);
};

Array.prototype.isEmpty = function(){
    return !(typeof this != "undefined" && this != null && this.length > 0);
};


//ECMA SCRIPT %,6 Supported alternative methods
/**
 * http://www.2ality.com/2014/12/one-javascript.html
 */
function isES6Supported() {
    try {
        eval("for (var e of ['a']) {}");
        return true;
    } catch (e) {
        // Possibly: check if e instanceof SyntaxError
    }
    return false;
}

function ObjectKeys(){
    if(!Object.keys) { //ecmascript 5 not supported
        Object.keys = function (o) {
            if (o !== Object(o)) throw new TypeError('Object.keys called on non-object');
            var ret = [];
            for (var p in o){
                if (Object.prototype.hasOwnProperty.call(o, p)){
                    ret.push(p);
                }
            }
            return ret;
        }
    }
}