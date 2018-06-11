<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
  <head>
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>Geocoding service</title>
    
  </head>
  <body>
   
    <input type="button" onclick="iniziaGeocodeOSM();" value="Inizia GEOCODING OSM" />
    
    <input type="button" onclick="iniziaGeocodeGoogle();" value="Inizia GEOCODING Google" />

    <table id="triconc">
    	<tr>
    	<td>COD_SER</td>
    	<td>COMUNE</td>    	    	
    	<td>VIA</td>    	    	
    	<td>NUMERO</td>    	    	
    	<td>LAT</td>    	    	
    	<td>LONG</td>
		<td>LOC_TYPE</td>
		</tr>
		${RICONCILIAZIONE_GEOCODE}
    </table>
     <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
    <script type="text/javascript">
    
    
    function iniziaGeocodeOSM() {
    	var arrayTab = [];
    	   $('#triconc > tbody  > tr').each(function() {
           		arrayTab.push(this); 
           });
    	   
    	   var i = 0;
    	   setInterval(function() {  
    	   
    		   var comune = arrayTab[i].cells[1].innerHTML;
        		var via = arrayTab[i].cells[2].innerHTML;
        		var numero = arrayTab[i].cells[3].innerHTML;
        		var arrayVia = [];
        		arrayVia = via.split(" ");
        		var arrayNumero = [];
        		arrayNumero = numero.split(" ");
        		var arrayComune = [];
        		arrayComune = comune.split(" ");
    		
        		via = arrayVia.join('+');
         		numero = arrayNumero.join('+');
         		comune = arrayComune.join('+');
         		
    		var search = via + "+" + numero + "," + comune;
    		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=1&q=' + search, function( data ) {
    	    	   //var items = [];
    	    	   $.each( data, function( key, val ) {
    	    		   arrayTab[i - 1].cells[4].innerHTML = val.lat;
    	    		   arrayTab[i - 1].cells[5].innerHTML = val.lon;
    	    	   });
    	       });
    		
   
    	   i++;
	}, 1000);
    }
    
    function iniziaGeocodeGoogle() {
        
    	var geocoder = new google.maps.Geocoder();
    	var arrayTab = [];
        $('#triconc > tbody  > tr').each(function() {
        	arrayTab.push(this); 
        });
        
        var i = 0;
        	
        	//var tabella = this;
        	setInterval(function() { 
     	  
     		var comune = arrayTab[i].cells[1].innerHTML;
     		var via = arrayTab[i].cells[2].innerHTML;
     		var numero = arrayTab[i].cells[3].innerHTML;
     		var arrayVia = [];
     		arrayVia = via.split(" ");
     		var arrayNumero = [];
     		arrayNumero = numero.split(" ");
     		var arrayComune = [];
     		arrayComune = comune.split(" ");
     		
     		via = arrayVia.join('+');
     		numero = arrayNumero.join('+');
     		comune = arrayComune.join('+');
     		
     		var search = via + "+" + numero + "," + comune;
     			geocoder.geocode( { 'address': search}, function(results, status) {
     			    if (status == google.maps.GeocoderStatus.OK) {
     			    	if (results[0].geometry.location_type == 'ROOFTOP' || results[0].geometry.location_type == 'RANGE_INTERPOLATED'){
     			     console.log(results[0].geometry.location); 
     			    arrayTab[i - 1].cells[4].innerHTML = results[0].geometry.location.d;
     			   arrayTab[i - 1].cells[5].innerHTML = results[0].geometry.location.e;
     			  arrayTab[i - 1].cells[6].innerHTML = results[0].geometry.location_type;
     			    	}
     			    } else {
     			    	console.log('Geocode was not successful for the following reason: ' + status);
     			    }
     			  });
     			
    			i++;
        	}, 2500);
        
      
     }
 
    </script>
  </body>
</html>