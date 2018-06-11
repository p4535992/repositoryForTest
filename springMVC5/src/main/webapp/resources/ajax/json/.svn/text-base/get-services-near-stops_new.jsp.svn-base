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
<%@ page import="java.text.Normalizer"%>


<%!

public String creaFiltroQuery(List<String> listaCategorie) throws Exception{
	
	String filtroQuery = "";
	
	Connection conMySQL = null;
	Statement st = null;
	ResultSet rs = null;
	
	String url = "jdbc:mysql://localhost:3306/";
	String db = "siimobility";
	String driver = "com.mysql.jdbc.Driver";
	String user = "siimobility";
	String pass = "siimobility";
	
	
	//Class.forName("com.mysql.jdbc.Driver");
	conMySQL = DriverManager.getConnection(url + db, user, pass);

	String query = "SELECT * FROM tbl_service_subcategory ORDER BY ID ASC";

	// create the java statement
	st = conMySQL.createStatement();

	// execute the query, and get a java resultset
	rs = st.executeQuery(query);
	int categorieInserite = 0;
	// iterate through the java resultset
	while (rs.next())
	{
		String id = rs.getString("ID");
		String nome = rs.getString("NOME");
		//String colore = rs.getString("COLORE");
		//String en_name = rs.getString("EN_NAME");
		//String classe = rs.getString("CLASS");
		
		if(listaCategorie.contains(nome)){
			if (categorieInserite == 0){
				filtroQuery += " {?ser SiiMobility:serviceCategory \"" + nome + "\"^^xsd:string .";
				filtroQuery += " BIND (\"" + nome + "\"^^xsd:string AS ?sType) } ";
			}
			else{
				filtroQuery += " UNION {?ser SiiMobility:serviceCategory \"" + nome + "\"^^xsd:string . ";
				filtroQuery += " BIND (\"" + nome + "\"^^xsd:string AS ?sType) } ";
			}
			
			categorieInserite++;
		}
		
	}
 		
	
	
	st.close();
		conMySQL.close();
	
	return filtroQuery;
	
	
}

%>


<%


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


String nomeLinea = request.getParameter("nomeLinea");
String categorie = request.getParameter("categorie");
if (categorie != ""){


List<String> listaCategorie = new ArrayList<String>();
if (categorie != null){
	 String[] arrayCategorie = categorie.split(";");
	 // GESTIONE CATEGORIE
	listaCategorie = Arrays.asList(arrayCategorie);
	 
}



 RepositoryConnection con = repo.getConnection();
 
 String fc = "";
	try{
		
		fc = creaFiltroQuery(listaCategorie);
	}
	catch(Exception e){
		
	}
	String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
			"PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
	"	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " + 
	"	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
	"	PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " + 
	"	PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " + 
	"   PREFIX dcterms:<http://purl.org/dc/terms/> " + 
	"	PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 
"	SELECT distinct ?ser ?serAddress ?elat ?elong ?sType ?sName ?email ?note " + 
"	WHERE { " + 
	"?tpll rdf:type SiiMobility:TPLLine . " +
	"?tpll dcterms:identifier \"" + nomeLinea + "\"^^xsd:string . " +
	"?avmr SiiMobility:concern ?tpll . " +
	"?avmr SiiMobility:include ?bsf . " +
	"?bs SiiMobility:hasForecast ?bsf . " +
	//"?bs foaf:name ?nomeFermata . " +
	"?bs geo:lat ?bslat .   " + 
	"?bs geo:long ?bslong . " +
	//"?ser SiiMobility:serviceCategory ?sType .  " + 
	"?ser vcard:organization-name ?sName . " + 
	"?ser vcard:street-address ?serAddress .  " + 
	"	 OPTIONAL {?ser vcard:note ?note} . " +
	"	 OPTIONAL {?ser SiiMobility:email ?email }. " +
	"{ " + 
	"?ser SiiMobility:hasAccess ?entry .  " + 
	"?entry geo:lat ?elat .  " + 
	"?entry geo:long ?elong .  " + 
	"?entry omgeo:nearby(?bslat ?bslong \"0.1km\") . " + 
	"} " + 
	"UNION " + 
	"{ " + 
		"?ser geo:lat ?elat .  " + 
		"?ser geo:long ?elong .  " + 
		"?ser omgeo:nearby(?bslat ?bslong \"0.1km\") . " + 
	"} " + 
	fc + 
	"	} LIMIT 100";

		out.println("{ " + 
			    "\"type\": \"FeatureCollection\", " + 
			    "\"features\": [ ");
		
		int i = 0;
	
		TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
		TupleQueryResult result = tupleQuery.evaluate();
		while (result.hasNext()) {
		BindingSet bindingSet2 = result.next();
	 
	 
	
			
		try{
	
			 String valueOfSer = bindingSet2.getValue("ser").toString();
			 String valueOfSName = bindingSet2.getValue("sName").toString();
			 String valueOfSerAddress = bindingSet2.getValue("serAddress").toString();
			 String valueOfSType = bindingSet2.getValue("sType").toString();
			 String valueOfELat = bindingSet2.getValue("elat").toString();
			 String valueOfELong = bindingSet2.getValue("elong").toString();
			 String valueOfNote = "";
			 if (bindingSet2.getValue("note") != null){
			 	valueOfNote = bindingSet2.getValue("note").toString();
			 }
			 
			 String valueOfEmail = "";
			 if (bindingSet2.getValue("email") != null){
				 	valueOfEmail = bindingSet2.getValue("email").toString();
				 }
			 
			 valueOfSer = valueOfSer.replace("<", "");
			 valueOfSer = valueOfSer.replace(">", "");
			 
			 valueOfELat = valueOfELat.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfELat = valueOfELat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfELat = valueOfELat.replace("\"", "");
			 valueOfELong = valueOfELong.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfELong = valueOfELong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfELong = valueOfELong.replace("\"", "");
			 
			 valueOfSName = valueOfSName.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfSName = valueOfSName.replace("\"", "");
			 
			 valueOfSerAddress = valueOfSerAddress.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfSerAddress = valueOfSerAddress.replace("\"", "");
			 
			 valueOfSType = valueOfSType.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfSType = valueOfSType.replace("\"", "");
			 
			 valueOfNote = valueOfNote.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNote = valueOfNote.replace("\"", "");
			 Normalizer
		        .normalize(valueOfNote, Normalizer.Form.NFD)
		        .replaceAll("[^\\p{ASCII}]", "");
			 valueOfNote = valueOfNote.replaceAll("[^A-Za-z0-9 ]+","");
			 
			 valueOfEmail = valueOfEmail.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfEmail = valueOfEmail.replace("\"", "");
			 
				 
				 if (i != 0){
					 out.println(", ");
				 }
		 
		 out.println("{ " + 
	           " \"geometry\": {  " + 
	           "     \"type\": \"Point\",  " + 
	            "    \"coordinates\": [  " + 
	             "       " + valueOfELong + ",  " + 
	              "      " + valueOfELat + "  " + 
	               " ]  " + 
	            "},  " + 
	            "\"type\": \"Feature\",  " + 
	            "\"properties\": {  " + 
	            "    \"popupContent\": \"" + valueOfSName + " - " + valueOfSType + "\", " +
	            "    \"nome\": \"" + valueOfSName + "\", " +
	            "    \"tipo\": \"" + valueOfSType + "\", " +
	            "    \"email\": \"" + valueOfEmail + "\", " +
	 		    "    \"note\": \"" + valueOfNote + "\", " +
	 		    "    \"serviceId\": \"" + valueOfSer + "\", " +
	            "    \"indirizzo\": \"" + valueOfSerAddress + "\" " +
	            "}, " + 
	            "\"id\": " + Integer.toString(i + 1) + " " + 
	        "}");
		 
		 
		i++;
			 
		}
	catch (Exception e){			
		out.println(e.getMessage());
	}
	
		}
	
	out.println("] " + 
		  "}");
	
	
}
	


%>


     