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

//out.println(filtroBounds);
 RepositoryConnection con = repo.getConnection();
	
	
 String nomeFermata = request.getParameter("nomeFermata");
			 

			String queryStringAVM = "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> "  + 
			"PREFIX foaf:<http://xmlns.com/foaf/0.1/> "  + 
			"PREFIX dcterms:<http://purl.org/dc/terms/> "  + 
			"PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> "  + 
			"PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> "  + 
			"PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> "  + 
			"PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> "  + 
			"PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> "  + 
			"PREFIX time:<http://www.w3.org/2006/time#> "  + 
			"SELECT distinct ?instantDateTime ?tpllid ?rs "  + 
			"WHERE{ "  + 
			"?bs rdf:type SiiMobility:BusStop . "  + 
			"?bs foaf:name \"" + nomeFermata + "\"^^xsd:string . "  + 
			"?bs SiiMobility:hasForecast ?bsf . "  + 
			"?bsf SiiMobility:hasExpectedTime ?instant . "  + 
			"?instant time:inXSDDateTime ?instantDateTime . "  + 
			"?avmr SiiMobility:include ?bsf . "  + 
			"?avmr SiiMobility:concern ?tpll . "  + 
			"?avmr SiiMobility:rideState ?rs . "  + 
			"?tpll dcterms:identifier ?tpllid . "  + 
			"FILTER (xsd:dateTime(?instantDateTime) >= now()) . "  + 
			"} "  + 
			"ORDER BY ASC (?instantDateTime) "  + 
			"LIMIT 50";

			TupleQuery tupleQueryAVM = con.prepareTupleQuery(QueryLanguage.SPARQL, queryStringAVM);
			TupleQueryResult resultAVM = tupleQueryAVM.evaluate();
			 
			//while (resultAVM.hasNext()) {
				//"    \"avm\": [ " +
				//"    ]" + valueOfNomeFermata + "\", " +
			//}
			
			 out.println("<table>");
			 
			 out.println("<tr>");
				out.println("<td>Orario</td>");
			 	
			 out.println("<td>Linea</td>");
			 out.println("<td>Stato</td>");
			 out.println("</tr>");
			try{
		while (resultAVM.hasNext()) {
			BindingSet bindingSet = resultAVM.next();
			 String valueOfInstantDateTime = bindingSet.getValue("instantDateTime").toString();
			 String valueOfTPLLID = bindingSet.getValue("tpllid").toString();
			 String valueOfRS = bindingSet.getValue("rs").toString();
			 
			 //valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 //valueOfBSLat = valueOfBSLat.replace("\"", "");
			 //valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 //valueOfBSLong = valueOfBSLong.replace("\"", "");
			 
			 //valueOfNomeFermata = valueOfNomeFermata.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 //valueOfNomeFermata = valueOfNomeFermata.replace("\"", "");
			 
			 out.println("<tr>");
			 out.println("<td>" + valueOfInstantDateTime + "</td>");
			 out.println("<td>" + valueOfTPLLID + "</td>");
			 out.println("<td>" + valueOfRS + "</td>");
			 out.println("</tr>");
		}
			}
			catch (Exception e){			
				out.println(e.getMessage());
			}
						 
			
			 out.println("</table>");
			
%>


     