import '../jspm_packages/npm/leaflet@0.7.7/dist/leaflet-src';
import 'leaflet'; //undefined map container
//import '../jspm_packages/npm/leaflet@0.7.7/dist/leaflet.css!';
import './filelayer/leaflet.filelayer.js';

console.log('is this thing on?');
//zip.workerScriptsPath ="./zip/";
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; 2013 OpenStreetMap contributors'
});
//var map = L.map('map').fitWorld().addLayer(osm);
var map = new L.Map("map", {center: [35.78, -78.68], zoom: 13});
map.addLayer(osm);

console.log('done all');


