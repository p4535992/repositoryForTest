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

String numeroRoute = request.getParameter("numeroRoute");

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
	
 String queryStringPrimeDueFermate = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 	
		 "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> 	 " + 
			 "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
			 "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> 	 " + 
			 "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> 	 " + 
			 "PREFIX foaf:<http://xmlns.com/foaf/0.1/> 	 " + 
			 "PREFIX dcterms:<http://purl.org/dc/terms/>  " + 
			 "SELECT distinct ?bs1 ?bs2	?nomeFermata1 ?nomeFermata2 ?bslat1 ?bslong1 ?bslat2 ?bslong2 " + 
			 "WHERE { 	 " + 
			 "?tplr rdf:type SiiMobility:Route . " + 
			 "?tplr dcterms:identifier \"" + numeroRoute + "\"^^xsd:string . " + 
			 "?tplr SiiMobility:hasFirstSection ?rs . " + 
			 "?rs SiiMobility:startsAt ?bs1 . " + 
			 "?rs SiiMobility:endsAt ?bs2 . " + 
			 "?bs1 foaf:name ?nomeFermata1 . " +
			 "?bs2 foaf:name ?nomeFermata2 . " +
			 "?bs1 geo:lat ?bslat1 . " +
			 "?bs1 geo:long ?bslong1 . " +
			 "?bs2 geo:lat ?bslat2 . " +
			 "?bs2 geo:long ?bslong2 . " +
			 "}  " + 
			 "LIMIT 100";
	
			//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryStringPrimeDueFermate);
	TupleQueryResult result = tupleQuery.evaluate();
	
	out.println("{ " + 
		    "\"type\": \"FeatureCollection\", " + 
		    "\"features\": [ ");
			
	try{
		
		if (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 
			 
			 String valueOfBS1 = bindingSet.getValue("bs1").toString();
			 String valueOfBS2 = bindingSet.getValue("bs2").toString();

			 String valueOfNomeFermata1 = bindingSet.getValue("nomeFermata1").toString();
			 String valueOfBSLat1 = bindingSet.getValue("bslat1").toString();
			 String valueOfBSLong1 = bindingSet.getValue("bslong1").toString();
			 valueOfBSLat1 = valueOfBSLat1.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLat1 = valueOfBSLat1.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLat1 = valueOfBSLat1.replace("\"", "");
			 valueOfBSLong1 = valueOfBSLong1.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLong1 = valueOfBSLong1.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLong1 = valueOfBSLong1.replace("\"", "");
			 
			 valueOfNomeFermata1 = valueOfNomeFermata1.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNomeFermata1 = valueOfNomeFermata1.replace("\"", "");
			 
			 String valueOfNomeFermata2 = bindingSet.getValue("nomeFermata2").toString();
			 String valueOfBSLat2 = bindingSet.getValue("bslat2").toString();
			 String valueOfBSLong2 = bindingSet.getValue("bslong2").toString();
			 valueOfBSLat2 = valueOfBSLat2.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLat2 = valueOfBSLat2.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLat2 = valueOfBSLat2.replace("\"", "");
			 valueOfBSLong2 = valueOfBSLong2.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLong2 = valueOfBSLong2.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLong2 = valueOfBSLong2.replace("\"", "");
			 
			 valueOfNomeFermata2 = valueOfNomeFermata2.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNomeFermata2 = valueOfNomeFermata2.replace("\"", "");
			 
			 
			 
			 
			
			 out.println("{ " + 
			           " \"geometry\": {  " + 
			           "     \"type\": \"LineString\",  " + 
			            "    \"coordinates\": [  " + 
			             "      [ " + valueOfBSLong1 + ",  " + 
			              "      " + valueOfBSLat1 + "],  " +
			             "      [ " + valueOfBSLong2+ ",  " + 
					    "      " + valueOfBSLat2 + "],  ");
			            
			            
			            // SECONDA PARTE
			            
			            String fermataDiPartenza = valueOfBS2;
			            
			            int i = 0;
			            
			            while(fermataDiPartenza != null){
			            String querySecondaParte = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
						"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> 	 " + 
						"PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
						"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> 	 " + 
						"PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> 	 " + 
						"PREFIX foaf:<http://xmlns.com/foaf/0.1/> 	 " + 
						"PREFIX dcterms:<http://purl.org/dc/terms/>  " + 
						"SELECT distinct ?bs2  ?nomeFermata2 ?bslat2 ?bslong2 " + 
						"WHERE { 	 " + 
						
						"?tplr rdf:type SiiMobility:Route . " + 
						"?tplr dcterms:identifier \"" + numeroRoute + "\"^^xsd:string . " + 
						"?tplr SiiMobility:hasSection ?rs . " + 
						"?rs SiiMobility:startsAt <" + fermataDiPartenza + "> . " + 
						"?rs SiiMobility:endsAt ?bs2 . " + 
						"?bs2 foaf:name ?nomeFermata2 . " +
						 "?bs2 geo:lat ?bslat2 . " +
						 "?bs2 geo:long ?bslong2 . " +
						"}  " + 
						"LIMIT 100 ";
						
			            
			    		
			        	TupleQuery tupleQuerySecondaParte = con.prepareTupleQuery(QueryLanguage.SPARQL, querySecondaParte);
			        	TupleQueryResult resultSecondaParte = tupleQuerySecondaParte.evaluate();
			        	
			        	if (resultSecondaParte.hasNext()) {
			        		
			        		
			    			BindingSet bindingSetSecondaParte = resultSecondaParte.next();
			    			
			    				valueOfBS2 = bindingSetSecondaParte.getValue("bs2").toString();
			    			 valueOfNomeFermata2 = bindingSetSecondaParte.getValue("nomeFermata2").toString();
			    			 valueOfBSLat2 = bindingSetSecondaParte.getValue("bslat2").toString();
			    			 valueOfBSLong2 = bindingSetSecondaParte.getValue("bslong2").toString();
			    			 valueOfBSLat2 = valueOfBSLat2.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			    			 valueOfBSLat2 = valueOfBSLat2.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			    			 valueOfBSLat2 = valueOfBSLat2.replace("\"", "");
			    			 valueOfBSLong2 = valueOfBSLong2.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			    			 valueOfBSLong2 = valueOfBSLong2.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			    			 valueOfBSLong2 = valueOfBSLong2.replace("\"", "");
			    			 
			    			 valueOfNomeFermata2 = valueOfNomeFermata2.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			    			 valueOfNomeFermata2 = valueOfNomeFermata2.replace("\"", "");
			    			 
			    			 if (i == 0){
			    				 out.println("      [ " + valueOfBSLong2+ ",  " + 
					 					    "      " + valueOfBSLat2 + "]  ");
				        		}
				        		else{
				        			out.println("   ,   [ " + valueOfBSLong2+ ",  " + 
					 					    "      " + valueOfBSLat2 + "]  ");	
				        		}
			    			
			    			 
			    			 
			    			 fermataDiPartenza = valueOfBS2;
			    					 i++;
			        	}
			        	else{
			        		fermataDiPartenza = null;
			        	}
			            
			            }
				
			            out.println(" ]  " + 
			            "},  " + 
			            "\"type\": \"Feature\",  " + 
			            "\"properties\": {  " + 
			            "    \"popupContent\": \"" + valueOfNomeFermata1 + "\" " +
			            "}, " + 
			            "\"id\": " + Integer.toString(i + 1) + " " + 
			        "}");
				 
			  
			 
		
		}
	}
	catch (Exception e){			
		out.println(e.getMessage());
	}
				 

	out.println("] " + 
		  "}");
	
%>


     