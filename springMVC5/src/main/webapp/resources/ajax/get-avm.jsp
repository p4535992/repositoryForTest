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

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
	
	String filtroSecondaQuery = "";
 String nomeFermata = request.getParameter("nomeFermata");
			 

			String queryStringAVM = "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 
				"PREFIX dcterms:<http://purl.org/dc/terms/>  " + 
					"PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +  
					"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " + 
					"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +  
					"PREFIX time:<http://www.w3.org/2006/time#>  " + 
					"SELECT distinct ?avmr ?tpll ?ride " + 
					"WHERE{  " + 
					"?bs rdf:type SiiMobility:BusStop .  " + 
					"?bs foaf:name \"" + nomeFermata + "\"^^xsd:string .  " + 
					"?bs SiiMobility:hasForecast ?bsf .  " + 
					"?avmr SiiMobility:include ?bsf .  " + 
					"?avmr SiiMobility:concern ?tpll .  " + 
					"?ride SiiMobility:hasSurvey ?avmr . " + 
					"?avmr SiiMobility:hasLastStopTime ?time . " + 
					"?time time:inXSDDateTime ?timeInstant . " + 
					"}  " + 
					"ORDER BY DESC (?timeInstant) " + 
					"LIMIT 10";

			TupleQuery tupleQueryAVM = con.prepareTupleQuery(QueryLanguage.SPARQL, queryStringAVM);
			TupleQueryResult resultAVM = tupleQueryAVM.evaluate();
			 
			//while (resultAVM.hasNext()) {
				//"    \"avm\": [ " +
				//"    ]" + valueOfNomeFermata + "\", " +
			//}
			
			out.println("<div class=\"avm\">Prossimi transiti di autobus dalla fermata <b>" + nomeFermata + "</b>: <br />");
			 out.println("<table>");
			 
			 out.println("<tr>");
				out.println("<td><b>Orario</b></td>");
			 	
			 out.println("<td><b>Linea</b></td>");
			 out.println("<td><b>Stato</b></td>");
			 out.println("</tr>");
			try{
		
				int i = 0;
		while (resultAVM.hasNext()) {
			BindingSet bindingSet = resultAVM.next();
			
			 String valueOfAVMR = bindingSet.getValue("avmr").toString();
			 String valueOfTPLL = bindingSet.getValue("tpll").toString();
			 String valueOfRide = bindingSet.getValue("ride").toString();
			
			 if (i == 0){
				 filtroSecondaQuery += " { <" + valueOfAVMR + "> SiiMobility:include ?previsione . ";
				 filtroSecondaQuery += " <" + valueOfAVMR + "> SiiMobility:concern ?linea . ";
				 filtroSecondaQuery += " <" + valueOfAVMR + "> SiiMobility:rideState ?stato . } ";
			 }
			 else{
				 filtroSecondaQuery += " UNION { <" + valueOfAVMR + "> SiiMobility:include ?previsione . ";
				 filtroSecondaQuery += " <" + valueOfAVMR + "> SiiMobility:concern ?linea . ";
				 filtroSecondaQuery += " <" + valueOfAVMR + "> SiiMobility:rideState ?stato . } ";
			 }
			 
			 i++;
			 
		}
			}
			catch (Exception e){			
				out.println(e.getMessage());
			}
						 
			
			String queryStringAVM2 = "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 
					"PREFIX dcterms:<http://purl.org/dc/terms/>  " + 
					"	PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#>  " + 
					"	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " + 
					"	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>  " + 
					"	PREFIX time:<http://www.w3.org/2006/time#>  " + 
					"	SELECT DISTINCT ?arrivoPrevistoIstante ?linea ?stato " + 
					"	WHERE { " + 
					"	?fermata rdf:type SiiMobility:BusStop .  " + 
					"	?fermata foaf:name \"" + nomeFermata + "\"^^xsd:string . " + 
					"	?fermata SiiMobility:hasForecast ?previsione .  " + 
					filtroSecondaQuery + 
					"	?previsione SiiMobility:hasExpectedTime ?arrivoPrevisto . " + 
					"	?arrivoPrevisto time:inXSDDateTime ?arrivoPrevistoIstante . " + 
					"	FILTER (xsd:dateTime(?arrivoPrevistoIstante) >= now()) .  " + 
					"	} " + 
					"	ORDER BY ASC (?arrivoPrevistoIstante) " + 
					"	LIMIT 6";

				TupleQuery tupleQueryAVM2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryStringAVM2);
				TupleQueryResult resultAVM2 = tupleQueryAVM2.evaluate();
				while (resultAVM2.hasNext()) {
					BindingSet bindingSet2 = resultAVM2.next();
				String valueOfArrivoPrevistoIstante = bindingSet2.getValue("arrivoPrevistoIstante").toString();
				 String valueOfLinea = bindingSet2.getValue("linea").toString();
				 String valueOfStato = bindingSet2.getValue("stato").toString();
			valueOfArrivoPrevistoIstante = valueOfArrivoPrevistoIstante.replace("\"^^<http://www.w3.org/2001/XMLSchema#dateTime>", "");
			 valueOfArrivoPrevistoIstante = valueOfArrivoPrevistoIstante.replace("\"", "");
			 
			 valueOfLinea = valueOfLinea.replace("http://www.disit.dinfo.unifi.it/SiiMobility/", "");
			 valueOfLinea = valueOfLinea.replace("\"", "");
			 
			 valueOfStato = valueOfStato.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfStato = valueOfStato.replace("\"", "");
			 
			 valueOfArrivoPrevistoIstante = valueOfArrivoPrevistoIstante.substring(11, 19);
			 
			 out.println("<tr>");
			 out.println("<td>" + valueOfArrivoPrevistoIstante + "</td>");
			 out.println("<td>" + valueOfLinea + "</td>");
			 if (valueOfStato.equals("Ritardo")){
				 out.println("<td style=\"color:red;\">" + valueOfStato + "</td>");
			 }
			 else{
				 if (valueOfStato.equals("Anticipo")){
					 out.println("<td style=\"color:green;\">" + valueOfStato + "</td>");
				 }
				 else{
				 	out.println("<td>" + valueOfStato + "</td>");
				 }
			 }
			 
			 out.println("</tr>");
			
				}
			 
			 out.println("</table>");
			
%>


     