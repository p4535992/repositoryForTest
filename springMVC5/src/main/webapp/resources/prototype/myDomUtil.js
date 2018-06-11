function getContentInput(idContainer){
    try {
        var elements = document.getElementById(idContainer).getElementsByTagName('input');
        var images = document.getElementById(idContainer).getElementsByTagName('img');
        var cats = [];
        for (var i = 0; i < elements.length; i++) {
            var sCat = {};
            var el = elements[i];
            var cat = {clazz: el.className, value: el.value, name: el.name, img: images[i].src};
            sCat[i] = cat;
            cats.push(sCat);
        }
        var json = {categories:cats};
        console.error(JSON.stringify(json));
    }catch(e){
        console.error(e.message);
    }
}

function parseURL(href){
   /* var a = document.createElement('a');
    a.href = 'http://www.example.com:123/foo/bar.html?fox=trot#foo';*/

    var arr = [];

    ['href','protocol','host','hostname','port','pathname','search','hash'].forEach(function(k) {
        //console.log(k+':', href[k]);
        arr.push(href[k]);
    });

    /*//Output:
     href: http://www.example.com:123/foo/bar.html?fox=trot#foo
     protocol: http:
     host: www.example.com:123
     hostname: www.example.com
     port: 123
     pathname: /foo/bar.html
     search: ?fox=trot
     hash: #foo
     */
}

