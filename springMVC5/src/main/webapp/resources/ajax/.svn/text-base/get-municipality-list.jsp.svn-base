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

String nomeProvincia = request.getParameter("nomeProvincia");

out.println("<option value=\"\"> - Seleziona un Comune - </option>");

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
 
 String filtroProvince = "";
 if (!nomeProvincia.equals("all")){
	 filtroProvince = "?prov foaf:name \"" + nomeProvincia + "\"^^xsd:string . 	 ";
	 //out.println("<option value=\"all\">TUTTI I COMUNI</option>");
 }

	String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 	
		"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> 	 " + 
			"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> 	 " + 
			"PREFIX foaf:<http://xmlns.com/foaf/0.1/> 	 " + 
			"SELECT distinct ?mun ?nomeComune 	 " + 
			"WHERE { 	 	 " + 
			"?mun rdf:type SiiMobility:Municipality . 	 " + 
			"?mun SiiMobility:isPartOfProvince ?prov . 	 " + 
			filtroProvince +  
			"?mun foaf:name ?nomeComune . 	 " + 
			"}  	 " + 
			"ORDER BY ?nomeComune";
		
							
							//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
	TupleQueryResult result = tupleQuery.evaluate();
	
	 
			
	try{
		int i = 0;
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 
			 String valueOfNomeComune = bindingSet.getValue("nomeComune").toString();
			 
			 valueOfNomeComune = valueOfNomeComune.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNomeComune = valueOfNomeComune.replace("\"", "");
			 
			out.println("<option value=\"" + valueOfNomeComune + "\">" + valueOfNomeComune + "</option>");
			  
			 
			i++;
		}
	}
	catch (Exception e){			
		out.println(e.getMessage());
	}
				 

	
%>


     