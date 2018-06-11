/**
 * Created by tenti on 11/12/2015.
 */

//System.import(ctx+'/jspm_packages/github/Leaflet/Leaflet@0.7.7.js');
//System.import(ctx+'/jspm_packages/npm/leaflet@0.7.7/src/Leaflet.js');
//System.import(ctx+'/jspm_packages/npm/leaflet@0.7.7.js');
//System.import(ctx+'/jspm_packages/github/krisk/Fuse@1.3.1.js');
//System.import(ctx+'/jspm_packages/github/naomap/leaflet-fusesearch@master/src/leaflet.fusesearch.js');
import L from '../../../jspm_packages/github/Leaflet/Leaflet@0.7.7/dist/leaflet-src.js';
console.info('TEST 1 : is this thing on?');
var fuseSearchCtrl = {};
try {
    // Add fuse search control
    var options = {
        position: 'topright',
        title: 'Chercher',
        placeholder: 'ex: rezé, cinéma, biblio',
        maxResultLength: 15,
        threshold: 0.5,
        showInvisibleFeatures: true,
        showResultFct: function (feature, container) {
            var props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.innerHTML = props[stringNameToSearch];

            container.appendChild(L.DomUtil.create('br', null, container));

            var cat = props['name'] ? props['type'] : props['category'];
            var info = '' + cat + ', ' + props['name'];
            container.appendChild(document.createTextNode(info));
        }
    };
    fuseSearchCtrl = L.control.fuseSearch(options);
    //map.addControl(leafletUtil.fuseSearchCtrl);
    //layerCtrl.addTo(map);
}catch(e){
    console.error('addPluginFuseSearch ->'+e.message);
}
console.info('TEST 2');
