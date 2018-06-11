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

Connection conMySQL = null;
Statement st = null;
ResultSet rs = null;

Connection conMySQL2 = null;
Statement st2 = null;
ResultSet rs2 = null;


String url = "jdbc:mysql://localhost:3306/";
String db = "tesi";
String driver = "com.mysql.jdbc.Driver";
String user = "ubuntu";
String pass = "ubuntu";

String sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
String repositoryID = "siimobilityultimate";

Repository repo = new HTTPRepository(sesameServer, repositoryID);
repo.initialize();

String lat1 = request.getParameter("lat1");
String long1 = request.getParameter("long1");

String lat2 = request.getParameter("lat2");
String long2 = request.getParameter("long2");

String filtroBounds = "";
if (lat1 != "" && lat1 != null){
	
	filtroBounds = "?bs omgeo:within(" + lat1 + " " + long1 + " " + lat2 + " " + long2 + ") . ";
}

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
			"	?bs foaf:name ?nomeFermata . " + 
			"	?bs geo:lat ?bslat . " + 
			"	 ?bs geo:long ?bslong . " + 
			//"	?bs omgeo:nearby(\"43.7710843\" \"11.2565648\" \"0.3km\") . " + 
			filtroBounds +	 		
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
			 String valueOfNomeFermata = bindingSet.getValue("nomeFermata").toString();
			 String valueOfBSLat = bindingSet.getValue("bslat").toString();
			 String valueOfBSLong = bindingSet.getValue("bslong").toString();
			 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLat = valueOfBSLat.replace("\"", "");
			 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLong = valueOfBSLong.replace("\"", "");
			 
			 valueOfNomeFermata = valueOfNomeFermata.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNomeFermata = valueOfNomeFermata.replace("\"", "");
			 
		
			 if (i != 0){
				 out.println(", ");
			 }
			 
			 
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
		            "    \"popupContent\": \"" + valueOfNomeFermata + "\" " +
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


     