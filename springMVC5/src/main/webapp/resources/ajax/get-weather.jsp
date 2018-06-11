<%@page import="java.io.IOException"%>
<%@page import="org.openrdf.model.Value"%>
<%@ page import="java.util.*"%>
<%@ page import="org.openrdf.repository.Repository"%>
<%@ page import="org.openrdf.repository.http.HTTPRepository"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.List"%>
<%@ page import="org.openrdf.query.BooleanQuery"%>
<%@ page import="org.openrdf.OpenRDFException"%>
<%@ page import="org.openrdf.repository.RepositoryConnection"%>
<%@ page import="org.openrdf.query.TupleQuery"%>

<%@ page import="org.openrdf.query.TupleQueryResult"%>
<%@ page import="org.openrdf.query.BindingSet"%>
<%@ page import="org.openrdf.query.QueryLanguage"%>
<%@ page import="java.io.File"%>
<%@ page import="java.net.URL"%>
<%@ page import="org.openrdf.rio.RDFFormat"%>

<%

//TUTTI I FILE JSP ALL'INTERNO DELLA CARTELLA 'ajax' e 'ajax'/'json' 
//HANNO ALL'INCIRCA LA STESSA STRUTTURA:
//- SI ESTRAGGONO I PARAMETRI PASSATI ALLA RICHIESTA
//- SI CREA LA QUERY (O LE QUERY) SPARQL CORRISPONDENTE
//- IN BASE AI RISULTATI VENGONO MANDATI IN OUTPUT (tramite out.println();) I DATI RICHIESTI
//QUESTI DATI SONO RECUPERATI ALL'INTERNO DELLA FUNZIONE JAVASCRIPT
//NELLA VARIABILE msg
//AD ESEMPIO:
	//	success : function(msg) {
	//		if (msg.features.length > 0){
	//			servicesLayer = L.geoJson(msg).addTo(map);
	//		}
	//	}
//ALL'INTERNO DELLA CARTELLA 'ajax' SONO PRESENTI TUTTI QUEI FILE CHE RESTITUISCONO DATI IN FORMATO HTML
//NELLA CARTELLA 'ajax'/'json' INVECE CI SONO LE FUNZIONALITA' CHE PREVEDONO COME RISPOSTA DATI IN FORMATO JSON
//LEAFLET RICHIEDE DATI GeoJSON PER LA POPOLAZIONE DEI LAYER 
//MAGGIORI INFORMAZIONI AL LINK: http://leafletjs.com/examples/geojson.html


Connection conMySQL = null;
Statement st = null;
ResultSet rs = null;

Connection conMySQL2 = null;
Statement st2 = null;
ResultSet rs2 = null;


String url = "jdbc:mysql://localhost:3306/";
String db = "siimobility";
String driver = "com.mysql.jdbc.Driver";
String user = "siimobility";
String pass = "siimobility";

String sesameServer = "http://localhost:8080/openrdf-sesame/";
String repositoryID = "siimobilityultimate";

Repository repo = new HTTPRepository(sesameServer, repositoryID);
repo.initialize();

String nomeComune = request.getParameter("nomeComune");

//out.println("<option value=\"\"> - Seleziona un Comune - </option>");

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
 
 String queryString1 = "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
		 "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 
			"PREFIX dcterms:<http://purl.org/dc/terms/> " + 
			"PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
			"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " + 
			"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
			"PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " + 
			"PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " + 
			"PREFIX time:<http://www.w3.org/2006/time#> " +
			"SELECT distinct ?wRep ?instantDateTime " + 
			"WHERE{ " + 
			"?comune rdf:type SiiMobility:Municipality . " + 
			"?comune foaf:name \"" + nomeComune + "\"^^xsd:string . " + 
			"?comune SiiMobility:has ?wRep . " + 
			"?wRep SiiMobility:updateTime ?instant . " + 
			"?instant time:inXSDDateTime ?instantDateTime . " + 

			"} " + 
			"ORDER BY DESC (?instantDateTime) " + 
			"LIMIT 1 ";
			TupleQuery tupleQuery1 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString1);
			TupleQueryResult result1 = tupleQuery1.evaluate(); 
			BindingSet bindingSet1 = result1.next();
			String valueOfInstantDateTime = bindingSet1.getValue("instantDateTime").toString();
			String valueOfWRep = bindingSet1.getValue("wRep").toString();
			
			
			
	String queryString = "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
				"PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 
				"PREFIX dcterms:<http://purl.org/dc/terms/> " + 
				"PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
				"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " + 
				"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
				"PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " + 
				"PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " + 
				"PREFIX time:<http://www.w3.org/2006/time#> " + 

				"SELECT distinct ?giorno ?descrizione ?minTemp ?maxTemp ?instantDateTime " + 
				"WHERE{ " + 
				" <" + valueOfWRep + "> SiiMobility:isComposedOf ?wPred . " + 
				"?wPred dcterms:description ?descrizione . " + 
				"?wPred SiiMobility:day  ?giorno. " + 
				"?wPred SiiMobility:hour \"giorno\"^^xsd:string . " + 
				"OPTIONAL { ?wPred SiiMobility:minTemp ?minTemp . } " + 
				"OPTIONAL { ?wPred SiiMobility:maxTemp ?maxTemp . } " + 
	

				"}";
		
							
							//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
	TupleQueryResult result = tupleQuery.evaluate();
	
	out.println("<div class=\"meteo\">Previsioni Meteo per il comune di <b>" + nomeComune + "</b>: <br />");
	
	try{
		int i = 0;
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 
			 String valueOfGiorno = bindingSet.getValue("giorno").toString();
			 String valueOfDescrizione = bindingSet.getValue("descrizione").toString();
			 
			 String valueOfMinTemp = "";
			 if (bindingSet.getValue("minTemp") != null){
				 valueOfMinTemp = bindingSet.getValue("minTemp").toString();
				 }
			 
			 String valueOfMaxTemp = "";
			 if (bindingSet.getValue("maxTemp") != null){
				 valueOfMaxTemp = bindingSet.getValue("maxTemp").toString();
				 }
			 
			
			 valueOfGiorno = valueOfGiorno.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfGiorno = valueOfGiorno.replace("\"", "");
			 
			 valueOfDescrizione = valueOfDescrizione.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfDescrizione = valueOfDescrizione.replace("\"", "");
			 
			 valueOfMinTemp = valueOfMinTemp.replace("\"^^<http://www.w3.org/2001/XMLSchema#integer>", "");
			 valueOfMinTemp = valueOfMinTemp.replace("\"", "");
			 
			 valueOfMaxTemp = valueOfMaxTemp.replace("\"^^<http://www.w3.org/2001/XMLSchema#integer>", "");
			 valueOfMaxTemp = valueOfMaxTemp.replace("\"", "");
			 
			//out.println("<option value=\"" + valueOfNomeComune + "\">" + valueOfNomeComune + "</option>");
			  
			out.println("<div class=\"previsione-giorno\">");
			out.println("<span class=\"giorno\">" + valueOfGiorno + "</span>");
			out.println("<br />");
			
			String nomeImmagine = "";
			if (valueOfDescrizione.equals("sereno")){
				nomeImmagine = "sereno.png";
			}
			if (valueOfDescrizione.equals("poco nuvoloso")){
				nomeImmagine = "poco-nuvoloso.png";
			}
			if (valueOfDescrizione.equals("velato")){
				nomeImmagine = "poco-nuvoloso.png";
			}
			if (valueOfDescrizione.equals("pioggia debole e schiarite")){
				nomeImmagine = "pioggia-sole.png";
			}
			if (valueOfDescrizione.equals("nuvoloso")){
				nomeImmagine = "nuvoloso.png";
			}
			if (valueOfDescrizione.equals("pioggia debole")){
				nomeImmagine = "pioggia.png";
			}
			if (valueOfDescrizione.equals("coperto")){
				nomeImmagine = "coperto.png";
			}
			if (valueOfDescrizione.equals("pioggia e schiarite")){
				nomeImmagine = "pioggia-sole.png";
			}
			if (valueOfDescrizione.equals("pioggia moderata-forte")){
				nomeImmagine = "temporale.png";
			}
			if (valueOfDescrizione.equals("foschia")){
				nomeImmagine = "foschia.png";
			}
			if (valueOfDescrizione.equals("temporale")){
				nomeImmagine = "temporale.png";
			}
			if (valueOfDescrizione.equals("neve debole e schiarite")){
				nomeImmagine = "neve-sole.png";
			}
			
			if (valueOfDescrizione.equals("temporale e schiarite")){
				nomeImmagine = "temporale-schiarite.png";
			}
			
			if (valueOfDescrizione.equals("neve moderata-forte")){
				nomeImmagine = "neve.png";
			}
			if (valueOfDescrizione.equals("neve e schiarite")){
				nomeImmagine = "neve-sole.png";
			}
			if (valueOfDescrizione.equals("neve debole")){
				nomeImmagine = "pioggia-neve.png";
			}
			if (valueOfDescrizione.equals("pioggia neve")){
				nomeImmagine = "pioggia-neve.png";
			}

			
			
			out.println("<img class=\"immagine-meteo\" src=\"/WebAppGrafo/img/" + nomeImmagine + "\" width=\"48\" />");
			out.println("<br />");
			out.println("<span class=\"descrizione-meteo\">" + valueOfDescrizione +"</span>");
			out.println("<br />");
			out.println("<span class=\"temperature\"><span class=\"min\">" + valueOfMinTemp + "</span> - <span class=\"max\">" + valueOfMaxTemp + "</span></span>");
			out.println("</div>");
			 
			i++;
		}
		
		out.println("<div class=\"clearer\"></div>");
		out.println("<div class=\"aggiornamento\">Ultimo Aggiornamento: " + valueOfInstantDateTime + "</div>");
		out.println("</div>");
		
	}
	catch (Exception e){			
		out.println(e.getMessage());
	}
				 

	
%>


     