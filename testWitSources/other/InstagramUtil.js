/**
 * Created by 4535992 on 21/11/2015.
 */

//Andiamo a utilizzare l'API Instagram per tracciare tutte le località vicino alla mia posizione
var instagramUtil = {};
instagramUtil.images = [];
instagramUtil.coordinates = [];
instagramUtil.buildInstagram = function(lat,lng){
    console.log("Start buildInstagram");
    var INSTAJAM = new Instajam({
        access_token: '553232369.d342186.dd6fb4d88d964ca8a7777ff1b660c13a',
        //access_token: localStorage.getItem("access_token"), //trucco per tenere nascosot il nostro access_token
        client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
    });
    //la distanza può essere variata molto facilemente ma l'API Instagram
    //a seconda della quantità di foto che traccia nell'arco della distanza potrebbe
    //lanciare o meno l'errore di codice 500 che sta per un errore di timeout della risposta
    //cioè ci sono cosi tante foto nel raggio della distanza da richiedere troppo tempo
    //100-800 sono distanze sicure
    var options = {"lat":lat,"lng":lng,"distance":300};
    INSTAJAM.user.feed(function(data) {
        instagramUtil.locationSearch(data,options);
        }
    );
};

//Prima chiamata all'API Instagram prendiamo lat e lng di tutte le foto vicine a noi
//purtroppo non abbiamo il collegamnto alla sorgente della nostra immagine.
//NOTA: Il nostro ID qui  è il Location ID.
instagramUtil.locationSearch = function(data,options){
    INSTAJAM.location.search(options,function(data){
        if(data.meta.code == 200) {
            var LOCATION = [];
            var photos = data.data;
            if(photos.length > 0) {
                for (var key in photos){
                    if(key.hasOwnProperty("id")) {
                        //var photo = photos[key];
                        var locationObject = {
                            ID: photos[key].id,
                            LAT: photos[key].latitude,
                            LON: photos[key].longitude,
                            NAME: photos[key].name
                        };
                        LOCATION.push(locationObject);
                    }
                }
                osmUtil.allLocationCoordinates(LOCATION);
                osmUtil.addLocationToMenu(LOCATION);
            }else{
                console.error('nessuna foto nelle vicinanze');
            }
        }else{
            console.error(data.meta.error_message);
        }
    });
};

instagramUtil.prendiLefotoDellaLocazione = function(idLocation,lat,lng){
    if(instagramUtil.images.length>0 || $("#photo").has("div")){cancellaLeFotoDellaLocazione();}
    var INSTAJAM = new Instajam({
        access_token: '553232369.d342186.dd6fb4d88d964ca8a7777ff1b660c13a',
        //access_token: localStorage.getItem("access_token"), //trucco per tenere nascosot il nostro access_token
        client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
    });
    console.info("Option: idLocation="+idLocation+", LAT="+lat+",LON="+lng);
    var options = {"lat":lat,"lng":lng,"distance":100};

    INSTAJAM.user.feed(function(data) {
        instagramUtil.mediaSearch8(data,options);
        //Secondo metodo prendiamo tutte le immagini vicine a una certa locazione,
        //stavolta abbiamo un sacco di dati in più ma non le coordinate geografiche lat e lng
//                  alert("mediasearhc8");
        if(instagramUtil.images.length>0) {
            instagramUtil.cancellaLeFotoDellaLocazione();
        }
        instagramUtil.mediaSearch8(data,options);
    });

};

instagramUtil.visualizzaFoto = function(visualImages){
    for(var key in visualImages){
        var id=visualImages[key].ID;
        var url = visualImages[key].TU;
        var ref = visualImages[key].SRU;

        $('<div id"' + id + '"><a href="'+ref+'" data-lightbox="roadtrip">\n\
            <img id="' + id + '" class="expando" src="'+ url +'" width="'+
            screen.width+'" height="'+screen.width/2+'"></a></div>').appendTo('.photo');
    }
//                        getFourSquareInfo(idLocation,lat,lng);
};

instagramUtil.mediaSearch8 = function(data,options){
    INSTAJAM.media.search(options,function(data){
        if(data.meta.code == 200) {
            var IMAGES = [];
            var photos = data.data;
            if(photos.length > 0) {
                for (var key in photos){
                    var photo = photos[key];
                    var imagesObject = {
                        ID: photo.id,
                        LRU: photo.images.low_resolution.url,
                        LRW: photo.images.low_resolution.width,
                        LRH: photo.images.low_resolution.height,
                        TU: photo.images.thumbnail.url,
                        TW: photo.images.thumbnail.width,
                        TH: photo.images.thumbnail.height,
                        SRU: photo.images.standard_resolution.url,
                        SRW: photo.images.standard_resolution.width,
                        SRH: photo.images.standard_resolution.height
                    };
                    IMAGES.push(imagesObject);
                }
                /*alert("VISUALIZZA FOTO");
                visualizzaFoto(images);
                for (var key in IMAGES){
                alert("ATTENZIONE"+key+":"+IMAGES[key].ID);
                }*/
                instagramUtil.visualizzaFoto(IMAGES);
            }else{
                console.error('nessuna foto nelle vicinanze');
            }
        }else{
            console.error(data.meta.error_message);

        }
    });
    return images;
};

instagramUtil.cancellaLeFotoDellaLocazione = function(){
//    alert("cancellaLeFotoDellaLocazione");
//     $("#photo").css( "display", "none" );
    jQuery('#photo').find('div').html('');
//    console.log("Prima:"+images);
//    alert("Array prima dello svuotamento:"+images);
    instagramUtil.images.splice(0, instagramUtil.images.length);   //svuotiamo l'array
//    alert("Array dopo che è stato svuotato:"+images);
//    console.log("Dopo:"+images);
};