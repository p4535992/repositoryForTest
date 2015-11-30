

var jsonUtil = {}


jsonUtil.getRemoteJson = function(url) {
        var json;
        jQuery.ajax({
            'async': false,
            'global': false,
            'url': url, //"/data/test_random.json"
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
};


jsonUtil.prettyJson = function(json){
    var str = JSON.stringify(json, undefined, 4);
    //this.output(str);
    document.body.appendChild(document.createElement('pre')).innerHTML = str;
    //str = this.syntaxHighlight(str);
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    str = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    return str;
};

jsonUtil.buildIndex = function (jsonObject){
     // build the index
     var index = [];
     for (var x in jsonObject) {
        index.push(x);
     }
     return index;
};

jsonUtil.getHeaders = function(json){
     var cols = [];
     for (var key in json) {cols.push(key);}
     return cols;
};



