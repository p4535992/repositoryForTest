/*
 var baseLayers = {
 "OpenStreetMap" : osmLayer,
 };
 var overlays = {
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/hotel.png' style='width:20px; height:20px;' /> Hotels": layerHotel,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/apple.png' style='width:20px; height:20px;' /> Orchards" : layerOrchard,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/church.png' style='width:20px; height:20px;' /> Places of Worship" : layerChurch,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/restaurant.png' style='width:20px; height:20px;' /> Restaurants" : layerRestaurant,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/sight.png' style='width:20px; height:20px;' /> Sightseeing" : layerSight,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/vineyard.png' style='width:20px; height:20px;' /> Vineyards" : layerVineyard,
 "<img src='http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/winebar.png' style='width:20px; height:20px;' /> Winebar" : layerWinebar
 };
 L.control.layers(baseLayers,overlays).addTo(map);
*/

var Accommodation = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Apartmaji Svetinje",
                "popupContent": '<p text-align="center";><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje8.jpg"><img class="alignnone popmap wp-image-5381" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje8.jpg" alt="Svetinje" width="100" height="80" data-id="5381" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp3.jpg"><img class="alignnone popmap wp-image-5386" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp3.jpg" alt="Svetinje" width="100" height="80" data-id="5386" /></a><br /><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp4.jpg"><img class="alignnone popmap wp-image-5387" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp4.jpg" alt="Svetinje" width="100" height="80" data-id="5387" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp1.jpg"><img class="alignnone popmap wp-image-5384" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinjeAp1.jpg" alt="Svetinje" width="100" height="80" data-id="5384" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.17088794708252,
                    46.46325565699105
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800080",
                "marker-size": "medium",
                "marker-symbol": "restaurant",
                "name": "Hotel Ormo&zcaron;",
                "tourism": "hotel",
                "popupContent": '<p text-align="center";> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown6.jpg"><img class="alignnone popmap wp-image-5273" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown6.jpg" alt="Hotel Ormoz" width="100" height="80" data-id="5273" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/HtlOrmozc.jpg"><img class="alignnone popmap wp-image-5274" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/HtlOrmozc.jpg" alt="Hotel Ormoz" width="100" height="80" data-id="5274" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.149977,
                    46.408803
                ]
            }
        }
    ]};

var Attraction = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#80ff00",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Loncarstvo Miran Trkulja - Veli&ccaron;ane",
                "craft": "pottery",
                "popupContent": '<p text-align="center";> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velicane3.jpg"><img class="alignnone popmap wp-image-5391" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velicane3.jpg" alt="Veli&ccaron;ane" width="100" height="80" data-id="5391" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velicane5.jpg"><img class="alignnone popmap wp-image-5393" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velicane5.jpg" alt="Veli&ccaron;ane" width="100" height="80" data-id="5393" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.165522,
                    46.47215
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ffff00",
                "marker-size": "medium",
                "marker-symbol": "camera",
                "name": "Ormo&zcaron; - Sightseeing",
                "tourism": "attraction",
                "popupContent": '<p text-align="center";> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Ormoz0.jpg"><img class="alignnone popmap wp-image-5276" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Ormoz0.jpg" alt="Ormo&zcaron; Coat of Arms" width="100" height="80" data-id="5276" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown0.jpg"><img class="alignnone popmap wp-image-5277" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown0.jpg" alt="Stork Nest" width="100" height="80" data-id="5277" /></a><br /><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown2.jpg"><img class="alignnone popmap wp-image-5275" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown2.jpg" alt="Downtown" width="100" height="80" data-id="5275" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown1.jpg"><img class="alignnone popmap wp-image-5278" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown1.jpg" alt="St.James Church" width="100" height="80" data-id="5278" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.147223,
                    46.407578
                ]
            }
        }
    ]};
var Castle = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "town-hall",
                "name": "Castle of Teutonic Kinghts' Order - Velika Nedelja",
                "castle_type": "defensive",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaFacciataCastello.jpg"><img data-id="5280"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaFacciataCastello.jpg" alt="Ivanicovcic" width="200" height="140" class="alignnone size-medium wp-image-5280" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.11121416091919,
                    46.41895537206559
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "ORMO&Zcaron; - The Castle",
                "castle_type": "defensive",
                "popupContent": '<iframe src="http://www.wocmultimedia.biz/wp-content/upflip/ORMOZ-Wineroute/Ormoz/Ormoz.html" width="320" height="220" frameborder="0" scrolling="no" allowfullscreen="false"></iframe><br /><br /><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.150803565979004,
                    46.40648387837534
                ]
            }
        }
    ]};

var Church = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#004080",
                "marker-size": "medium",
                "marker-symbol": "religious-christian",
                "name": "&Zcaron;upnijska cerkev sv. Jakoba",
                "amenity": "place_of_worship",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown1.jpg"><img data-id="5278"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown1.jpg" alt="Ormo&zcaron;" width="150" height="150" class="alignnone size-thumbnail wp-image-5278" /></a>  </p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.149014,
                    46.408274
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#004080",
                "marker-size": "medium",
                "marker-symbol": "religious-christian",
                "name": "Church of Holy Trinity - Velika Nedelja",
                "amenity": "place_of_worship",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika7.jpg"><img data-id="5282"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika7.jpg" alt="Velika Nedelja" width="100" height="80" class="alignnone  popmap size-thumbnail wp-image-5282" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika6.jpg"><img data-id="5281"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika6.jpg" alt="Velika Nedelja" width="100" height="80" class="alignnone popmap size-thumbnail wp-image-5281" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.110763549804688,
                    46.41963582228653
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#004080",
                "marker-size": "medium",
                "marker-symbol": "religious-christian",
                "name": "Church - Svetinje",
                "amenity": "place_of_worship",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje5.jpg"><img data-id="5378"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje5.jpg" alt="Svetinje" width="100" height="80" class="alignnone popmap  size-thumbnail wp-image-5378" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje1.jpg"><img data-id="5374"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje1.jpg" alt="Svetinje" width="100" height="80" class="alignnone popmap size-thumbnail wp-image-5374" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.170172,
                    46.462955
                ]
            }
        }
    ]};
var Museum = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800000",
                "marker-size": "medium",
                "marker-symbol": "museum",
                "name": "Ethnographic Museum - Velika Nedelja",
                "tourism": "museum",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika2.jpg"><img data-id="5283"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika2.jpg" alt="Velika Nedelja" width="100" height="80" class="alignnone  popmap size-thumbnail wp-image-5283" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika3.jpg"><img data-id="5284"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Velika3.jpg" alt="Velika Nedelja" width="100" height="80" class="alignnone popmap size-thumbnail wp-image-5284" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.111857891082764,
                    46.41889620207987
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800000",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Museum of The Castle - Ormo&zcaron; ",
                "tourism": "museum",
                "popupContent": '<iframe src="http://www.wocmultimedia.biz/wp-content/upflip/ORMOZ-Wineroute/Ormoz/Ormoz.html" width="320" height="220" frameborder="0" scrolling="no" allowfullscreen="false"></iframe><br /><br /><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.151243448257446,
                    46.406335919459835
                ]
            }
        }
    ]};



var Orchard = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Litmerk",
                "landuse": "orchard",
                "popupContent": '<iframe src="http://www.wocmultimedia.biz/wp-content/upflip/ORMOZ-Wineroute/Litmerk/Litmerk.html" width="320" height="220" frameborder="0" scrolling="no" allowfullscreen="false"></iframe><br /><br /><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.154698,
                    46.437867
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "2259 Runec, Slovenia",
                "landuse": "orchard",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/prugna.jpg"><img data-id="5265"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/prugna-150x150.jpg" alt="prugna" width="100" height="80" class="alignnone popmap size-thumbnail wp-image-5265" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/mele.jpg"><img data-id="5264"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/mele-150x150.jpg" alt="mele" width="100" height="80" class="alignnone  popmap size-thumbnail wp-image-5264" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.127069,
                    46.46032
                ]
            }
        }
    ]};

var Restaurant = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800080",
                "marker-size": "medium",
                "marker-symbol": "restaurant",
                "name": "Sonja Ozmec - Farm holiday - Velika Nedelja",
                "amenity": "restaurant",
                "popupContent": '<p text-align="center";><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet2.jpg"><img class="alignnone popmap wp-image-5268" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet2.jpg" alt="VelikaKlet2" width="100" height="80" data-id="5268" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet3.jpg"><img class="alignnone popmap wp-image-5269" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet3.jpg" alt="VelikaKlet3" width="100" height="80" data-id="5269" /></a><br /><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet1.jpg"><img class="alignnone popmap wp-image-5267" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VelikaKlet1.jpg" alt="VelikaKlet1" width="100" height="80" data-id="5267" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VinoSonja1r.jpg"><img class="alignnone popmap wp-image-5266" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/VinoSonja1r.jpg" alt="VinoSonja1r" width="100" height="80" data-id="5266" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.09394073486328,
                    46.43454442576161
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff0000",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Restaurant - Hotel Ormo&zcaron;",
                "amenity": "restaurant",
                "popupContent": '<p text-align="center";> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown3.jpg"><img class="alignnone popmap wp-image-5271" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown3.jpg" alt="Hotel Ormoz" width="100" height="80" data-id="5271" /></a>  <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown5.jpg"><img class="alignnone popmap wp-image-5272" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/OrmozTown5.jpg" alt="Hotel Ormoz" width="100" height="80" data-id="5272" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.150728464126587,
                    46.40879568430599
                ]
            }
        }
    ]};




var Video = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ffff00",
                "marker-size": "medium",
                "marker-symbol": "cinema",
                "name" : "ORMO&Zcaron; - Demo video",
                "popupContent": '<iframe src="https://www.youtube.com/embed/xLDoOXUY1RI" width="320" height="220" frameborder="0" scrolling="no" webkitallowfullscreen mozallowfullscreen allowfullscreen="true"></iframe><br /><br /><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Info & Video</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.147223,
                    46.407278
                ]
            }
        }
    ]
};

var Vineyard = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff0000",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Zidanica Malek",
                "landuse": "vineyard",
                "amenity": "wine_bar",
                "popupContent": '<p text-align="center";><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek2.jpg"><img class="alignnone popmap wp-image-5396" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek2.jpg" alt="Zidanica Malek" width="100" height="80" data-id="5396" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek3.jpg"><img class="alignnone popmap wp-image-5397" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek3.jpg" alt="Zidanica Malek" width="100" height="80" data-id="5397" /></a><br /><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek4.jpg"><img class="alignnone popmap wp-image-5398" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek4.jpg" alt="Zidanica Malek" width="100" height="80" data-id="5398" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek5.jpg"><img class="alignnone popmap wp-image-5399" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Malek5.jpg" alt="Zidanica Malek" width="100" height="80" data-id="5399" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.174798,
                    46.470182
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#ff8040",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Stanov&scaron;cak - Ivanjkovcic",
                "amenity": "vineyard",
                "popupContent": '<p><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Ivanicovcic.jpg"><img data-id="5263"  src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Ivanicovcic-300x240.jpg" alt="Ivanicovcic" width="200" height="140" class="alignnone size-medium wp-image-5263" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.138736,
                    46.463319
                ]
            }
        }
    ]};
var Winebar = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800080",
                "marker-size": "medium",
                "marker-symbol": "bar",
                "name": "Svetinjska klet - Svetinje",
                "amenity": "winebar",
                "popupContent": '<p text-align="center";><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje9.jpg"><img class="alignnone popmap wp-image-5382" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje9.jpg" alt="Svetinje" width="100" height="80" data-id="5382" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje10.jpg"><img class="alignnone popmap wp-image-5383" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/Svetinje10.jpg" alt="Svetinje" width="100" height="80" data-id="5383" /></a><br /><a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje3.jpg"><img class="alignnone popmap wp-image-5376" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje3.jpg" alt="Svetinje" width="100" height="80" data-id="5376" /></a> <a href="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje4.jpg"><img class="alignnone popmap wp-image-5377" src="http://www.wocmultimedia.biz/wp-content/uploads/2015/08/svetinje4.jpg" alt="Svetinje" width="100" height="80" data-id="5377" /></a></p><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.17015838623047,
                    46.46361038701064
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "marker-color": "#800080",
                "marker-size": "medium",
                "marker-symbol": "star",
                "name": "Jeruzalem Wine Cellar & Wine Bar - Ormo&zcaron;",
                "amenity": "wine_bar",
                "popupContent": '<iframe src="http://www.wocmultimedia.biz/wp-content/upflip/ORMOZ-Wineroute/Jeruzalem/jeruzalem.html#p=1" width="320" height="220" frameborder="0" scrolling="no" allowfullscreen="true"></iframe><br /><br /><p><a href="http://www.wocmultimedia.biz/en/category/slovenia-blog/ormoz-blog/"><strong>Read more</strong></a></p>'
            },
            "geometry": {
                "type": "Point",
                "coordinates": [
                    16.155223846435547,
                    46.4042200630657
                ]
            }
        }
    ]};

var CustIcon = L.Icon.extend({
    options: {
        shadowUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/shadow.png',
        iconSize:     [32, 37],
        shadowSize:   [50, 64],
        iconAnchor:   [16, 37],
        shadowAnchor: [14, 62],
        popupAnchor:  [0, -28]
    }
});

var accommodationIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/hotel.png'}),
    attractionIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/sight.png'}),
    castleIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/castle.png'}),
    churchIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/church.png'}),
    museumIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/historical_museum.png'}),
    orchardIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/apple.png'}),
    restaurantIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/restaurant.png'}),
    videoIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/video.png'}),
    vineyardIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/vineyard.png'}),
    winebarIcon = new CustIcon({iconUrl: 'http://www.wocmultimedia.biz/wp-content/uploads/mapdata/images/winebar.png'});

function interaction(feature, layer){
    layer.on({
        mouseover: function over(e) {
            layer.bindPopup(L.popup().setContent('<strong>Ormo&zcaron; and the wineroutes</strong><br />' +feature.properties.name+'<br />'+feature.geometry.coordinates))
            layer.openPopup()
        },
        mouseout: function out(e) {
            layer.unbindPopup()
        },
        click: function click (e){var popupContent = "<strong>Ormo&zcaron; and the wineroutes</strong><br />" +
            feature.properties.name + "<br />";
            if (feature.properties.popupContent) {
                popupContent += feature.properties.popupContent;
            }
            layer.bindPopup(popupContent,{maxWidth: 320});
        }
    })
}

//riprende vecchio codice
var layerHotel = new L.LayerGroup();
var Accommodation = L.geoJson(Accommodation, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: accommodationIcon});
    },
    onEachFeature: interaction
}).addTo(layerHotel).addTo(map);
//map.addLayer(layerHotel);

var layerSight = new L.LayerGroup();
var Attraction = L.geoJson(Attraction, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: attractionIcon});
    },
    onEachFeature: interaction
}).addTo(layerSight);
map.addLayer(layerSight);
var Castle = L.geoJson(Castle, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: castleIcon});
    },
    onEachFeature: interaction
}).addTo(layerSight);
map.addLayer(layerSight);
var Museum = L.geoJson(Museum, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: museumIcon});
    },
    onEachFeature: interaction
}).addTo(layerSight);
map.addLayer(layerSight);
var Video = L.geoJson(Video, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: videoIcon});
    },
    onEachFeature: interaction
}).addTo(layerSight);
map.addLayer(layerSight);
var layerChurch = new L.LayerGroup();
var Church = L.geoJson(Church, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: churchIcon});
    },
    onEachFeature: interaction
}).addTo(layerChurch);
map.addLayer(layerChurch);
var layerOrchard = new L.LayerGroup();
var Orchard = L.geoJson(Orchard, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: orchardIcon});
    },
    onEachFeature: interaction
}).addTo(layerOrchard);
map.addLayer(layerOrchard);
var layerRestaurant = new L.LayerGroup();
var Restaurant = L.geoJson(Restaurant, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: restaurantIcon});
    },
    onEachFeature: interaction
}).addTo(layerRestaurant);
map.addLayer(layerRestaurant);
var layerVineyard = new L.LayerGroup();
var Vineyard = L.geoJson(Vineyard, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: vineyardIcon});
    },
    onEachFeature: interaction
}).addTo(layerVineyard);
map.addLayer(layerVineyard);
var layerWinebar = new L.LayerGroup();
var Winebar = L.geoJson(Winebar, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {icon: winebarIcon});
    },
    onEachFeature: interaction
}).addTo(layerWinebar);
map.addLayer(layerWinebar);
var baseLayers = {
    "OpenStreetMap" : osmLayer,
};
var overlays = {
    "Hotels": layerHotel,
    "Orchards" : layerOrchard,
    "Places of Worship" : layerChurch,
    "Restaurants" : layerRestaurant,
    "Sightseeing" : layerSight,
    "Vineyards" : layerVineyard,
    "Winebar" : layerWinebar
};

L.control.layers(baseLayers,overlays).addTo(map);
