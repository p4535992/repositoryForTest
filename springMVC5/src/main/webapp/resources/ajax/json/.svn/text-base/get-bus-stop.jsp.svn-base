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

String nomeFermata = request.getParameter("nomeFermata");


//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
	
 String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
			"PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
			"	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " + 
			"	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
			"	PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " + 
			"	PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " + 
			"	PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 

			"	SELECT distinct ?bs ?nomeFermata ?bslat ?bslong " + 
			"	WHERE { " + 


			"	?bs rdf:type SiiMobility:BusStop . " + 
			"	?bs foaf:name \"" + nomeFermata + "\"^^xsd:string . " + 
			"	?bs geo:lat ?bslat . " + 
			"	 ?bs geo:long ?bslong . " + 
			"	} LIMIT 100";
	
			//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
	TupleQueryResult result = tupleQuery.evaluate();
	
	out.println("{ " + 
		    "\"type\": \"FeatureCollection\", " + 
		    "\"features\": [ ");
			
	try{
		int i = 0;
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 
			 
			 String valueOfBS = bindingSet.getValue("bs").toString();
			 String valueOfBSLat = bindingSet.getValue("bslat").toString();
			 String valueOfBSLong = bindingSet.getValue("bslong").toString();
			 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLat = valueOfBSLat.replace("\"", "");
			 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLong = valueOfBSLong.replace("\"", "");
			 
			 
			 out.println("{ " + 
			           " \"geometry\": {  " + 
			           "     \"type\": \"Point\",  " + 
			            "    \"coordinates\": [  " + 
			             "       " + valueOfBSLong + ",  " + 
			              "      " + valueOfBSLat + "  " + 
			               " ]  " + 
			            "},  " + 
			            "\"type\": \"Feature\",  " + 
			            "\"properties\": {  " + 
			            "    \"popupContent\": \"" + nomeFermata + "\", " +
			           	"    \"nome\": \"" + nomeFermata + "\", " +
			           		 "    \"serviceId\": \"" + valueOfBS + "\", " +
			            "    \"tipo\": \"fermata\" " +
			            "}, " + 
			            "\"id\": " + Integer.toString(i + 1) + " " + 
			        "}");
				 
			  
			 
			i++;
		}
	}
	catch (Exception e){			
		out.println(e.getMessage());
	}
				 

	out.println("] " + 
		  "}");
	
%>


     