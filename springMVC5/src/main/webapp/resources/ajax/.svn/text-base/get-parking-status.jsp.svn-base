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
String db = "tesi";
String driver = "com.mysql.jdbc.Driver";
String user = "siimobility";
String pass = "siimobility";

String sesameServer = "http://localhost:8080/openrdf-sesame/";
String repositoryID = "siimobilityultimate";

Repository repo = new HTTPRepository(sesameServer, repositoryID);
repo.initialize();

String nomeParcheggio = request.getParameter("nomeParcheggio");

//out.println("<option value=\"\"> - Seleziona un Comune - </option>");

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
 

	String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
			"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> 	 " + 
			"	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +  	
			"	PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> 	 " + 
			"	PREFIX time:<http://www.w3.org/2006/time#> 	 " + 

			"	SELECT distinct  ?situationRecord ?instantDateTime ?occupancy ?free ?occupied ?capacity " + 
			"	WHERE { " + 

			"	?park rdf:type SiiMobility:TransferService . " + 
			"	?park vcard:organization-name \"" + nomeParcheggio + "\" .  " + 
			"	?cps SiiMobility:observe ?park . " + 
			"	?cps SiiMobility:capacity ?capacity . " + 
			"	?situationRecord SiiMobility:relatedTo ?cps . " + 
			"	?situationRecord SiiMobility:observationTime ?time . " + 
			"	?time time:inXSDDateTime ?instantDateTime .  " + 
			"	?situationRecord SiiMobility:parkOccupancy ?occupancy .  " + 
			"	?situationRecord SiiMobility:free ?free . " + 
			"	?situationRecord SiiMobility:occupied ?occupied . " + 

			"	} " + 
			"	ORDER BY DESC (?instantDateTime) " + 
			"	LIMIT 1";
							
							//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
	TupleQueryResult result = tupleQuery.evaluate();
	
	out.println("<div class=\"park\">Dati di occupazione del parcheggio <b>" + nomeParcheggio + "</b>: <br />");
	String valueOfInstantDateTime = "";	
	try{
		int i = 0;
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 
			 valueOfInstantDateTime = bindingSet.getValue("instantDateTime").toString();
			 String valueOfOccupancy = bindingSet.getValue("occupancy").toString();
			 String valueOfFree = bindingSet.getValue("free").toString();
			 String valueOfOccupied = bindingSet.getValue("occupied").toString();
			 String valueOfCapacity = bindingSet.getValue("capacity").toString();
			 
			 
			
			 valueOfOccupancy = valueOfOccupancy.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfOccupancy = valueOfOccupancy.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfOccupancy = valueOfOccupancy.replace("\"", "");
			 
			 valueOfFree = valueOfFree.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfFree = valueOfFree.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfFree = valueOfFree.replace("\"", "");
			 
			 valueOfOccupied = valueOfOccupied.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfOccupied = valueOfOccupied.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfOccupied = valueOfOccupied.replace("\"", "");
			 
			 valueOfCapacity = valueOfCapacity.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfCapacity = valueOfCapacity.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfCapacity = valueOfCapacity.replace("\"", "");
			 
			// valueOfInstantDateTime = valueOfCapacity.replace("^^<http://www.w3.org/2001/XMLSchema#dateTime>", "");
			 
			out.println("<div class=\"dettaglio-parcheggio\">");
			out.println("<span>Capacità Tot.</span>");
			out.println("<br />");
			out.println("<span class=\"descrizione-valore\">" + valueOfCapacity +"</span>");
			out.println("</div>");
			
			out.println("<div class=\"dettaglio-parcheggio\">");
			out.println("<span>Posti Liberi</span>");
			out.println("<br />");
			out.println("<span class=\"descrizione-valore\">" + valueOfFree +"</span>");
			out.println("</div>");
			
			out.println("<div class=\"dettaglio-parcheggio\">");
			out.println("<span>Posti Occupati</span>");
			out.println("<br />");
			out.println("<span class=\"descrizione-valore\">" + valueOfOccupied +"</span>");
			out.println("</div>");
			
			//out.println("<div class=\"dettaglio-parcheggio\">");
			//out.println("<span>% occupazione</span>");
			//out.println("<br />");
			//out.println("<span class=\"descrizione-valore\">" + valueOfOccupancy +"</span>");
			//out.println("</div>");
			
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


     