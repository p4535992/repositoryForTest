console.log('is this thing on?')
//import L from '../jspm_packages/github/Leaflet/leaflet@0.7.7.js';
//import L from '../jspm_packages/npm/leaflet@0.7.7.js';
//import L from '../jspm_packages/npm/leaflet@0.7.7/src';
//import '../jspm_packages/npm/leaflet@0.7.7/src/Leaflet.js';
//import '../jspm_packages/github/Leaflet/leaflet@0.7.7/src/Leaflet.js'
//L.Icon.Default.imagePath = '../jspm_packages/';
//import '../jspm_packages/github/Leaflet/Leaflet.markercluster@0.4.0.js';
//import '../jspm_packages/npm/leaflet-omnivore@0.3.2.js';

/*http://stackoverflow.com/questions/33795493/load-font-awesome-with-jspm*/
//import '../jspm_packages/npm/font-awesome@4.5.0/css/font-awesome.css!';
//import 'd3';
import L from 'leaflet';
//import './filelayer/leaflet.filelayer';
//import './index';
// let state = 'compiled and loaded';
// console.log(`dynamically ${state}!`);

//export default {L};

console.info('1:'+JSON.stringify(L));
// create map
var map = L.map('map').setView([45.526, -122.667], 15);
console.info('import ALL');
export const L = L;