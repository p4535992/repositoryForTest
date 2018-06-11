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


// FUNZIONE DI GENERAZIONE DELLA STRINGA DI FILTRAGGIO IN BASE ALLA CATEGORIA
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



Connection conMySQL2 = null;
Statement st2 = null;
ResultSet rs2 = null;




String sesameServer = "http://localhost:8080/openrdf-sesame/";
String repositoryID = "siimobilityultimate";

Repository repo = new HTTPRepository(sesameServer, repositoryID);
repo.initialize();


String nomeProvincia = request.getParameter("nomeProvincia");
String nomeComune = request.getParameter("nomeComune");
String raggio = request.getParameter("raggio");
String numerorisultati = request.getParameter("numerorisultati");
String categorie = request.getParameter("categorie");
if (categorie != ""){
List<String> listaCategorie = new ArrayList<String>();
if (categorie != null){
	 String[] arrayCategorie = categorie.split(";");
	 // GESTIONE CATEGORIE
	listaCategorie = Arrays.asList(arrayCategorie);
	 
}


String filtroLocalita = "";

if (nomeComune.equals("all")){
	filtroLocalita += "?prov foaf:name \"" + nomeProvincia + "\"^^xsd:string .";
	filtroLocalita += "?mun SiiMobility:isPartOfProvince ?prov . ";
}
else{
	
	filtroLocalita += "{ ?ser SiiMobility:hasAccess ?entry . ";
	filtroLocalita += "	?entry geo:lat ?elat . ";
	filtroLocalita += "	 ?entry geo:long ?elong . ";
	filtroLocalita += "   ?nc SiiMobility:hasExternalAccess ?entry . ";
	filtroLocalita += "  ?nc SiiMobility:belongTo ?road . ";
	filtroLocalita += "  ?road SiiMobility:inMunicipalityOf ?mun . ";
	filtroLocalita += "?mun foaf:name \"" + nomeComune + "\"^^xsd:string . }";
	
	filtroLocalita += "UNION";
	filtroLocalita += "{";
	filtroLocalita += "?ser SiiMobility:isIn ?road . ";
	filtroLocalita += "	?ser geo:lat ?elat . ";
	filtroLocalita += "	 ?ser geo:long ?elong . ";
	filtroLocalita += "?road SiiMobility:inMunicipalityOf ?mun . ";
	filtroLocalita += "?mun foaf:name \"" + nomeComune + "\"^^xsd:string . ";
	//filtroLocalita += "FILTER NOT EXISTS {?ser SiiMobility:hasAccess ?entry .} ";
	filtroLocalita += "}";
}

 RepositoryConnection con = repo.getConnection();
 String fc = "";
 	try{
 		
 		fc = creaFiltroQuery(listaCategorie);
 	}
 	catch(Exception e){
 		
 	}

 	// SUDDIVISIONE RISULTATI
 	
 	String filtroNumeroRisultatiServizi = "0";
 	String filtroNumeroRisultatiBus = "0";
 	if (!numerorisultati.equals("0")){
 		if (categorie.equals("NearBusStops")){
 			// CASO SOLO AUTOBUS
 			filtroNumeroRisultatiBus = numerorisultati;
 		}
 		else{
 			if (!listaCategorie.contains("NearBusStops")){
 				// CASO SOLO SERVIZI
 				filtroNumeroRisultatiServizi = numerorisultati;
 			}
 			else{
 				// CASO MISTO
 				filtroNumeroRisultatiBus = Integer.toString(((Integer.parseInt(numerorisultati) / 100) * 30));
 				filtroNumeroRisultatiServizi = Integer.toString(((Integer.parseInt(numerorisultati) / 100) * 70));
 			}
 		}
 		
 	}
 	
 	
	out.println("{ " + 
		    "\"type\": \"FeatureCollection\", " + 
		    "\"features\": [ ");
		

	int i = 0;
 	int numeroBus = 0;
	if (listaCategorie.contains("NearBusStops")){
		// INSERISCI ANCHE BUS STOP
		
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
				"   ?bs SiiMobility:isIn ?road . " + 
				"   ?road SiiMobility:inMunicipalityOf ?com . " +
				"   ?com foaf:name \"" + nomeComune + "\"^^xsd:string . } ";
		if (!filtroNumeroRisultatiBus.equals("0")){
			queryString += " LIMIT " + filtroNumeroRisultatiBus; 
		}
		
		
				//out.println(queryString);
				
		TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
		TupleQueryResult result = tupleQuery.evaluate();
		
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 String valueOfBS = bindingSet.getValue("bs").toString();
			 String valueOfNomeFermata = bindingSet.getValue("nomeFermata").toString();
			 String valueOfBSLat = bindingSet.getValue("bslat").toString();
			 String valueOfBSLong = bindingSet.getValue("bslong").toString();
			 
			 valueOfBS = valueOfBS.replace("<", "");
			 valueOfBS = valueOfBS.replace(">", "");
			 
			 valueOfNomeFermata = valueOfNomeFermata.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
			 valueOfNomeFermata = valueOfNomeFermata.replace("\"", "");
			 
			 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLat = valueOfBSLat.replace("\"", "");
			 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
			 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
			 valueOfBSLong = valueOfBSLong.replace("\"", "");
			 
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
            "    \"popupContent\": \"" + valueOfNomeFermata + " - fermata autobus\", " +
            "    \"nome\": \"" + valueOfNomeFermata + "\", " +
            "    \"tipo\": \"fermata\", " +
            "    \"email\": \"\", " +
 		    "    \"note\": \"\", " +
 		    "    \"serviceId\": \"" + valueOfBS + "\", " +
            "    \"indirizzo\": \"\" " +
            "}, " + 
            "\"id\": " + Integer.toString(i + 1) + " " + 
        "}");
		i++;
		numeroBus++;
		}
		
	}
	int numeroServizi = 0;
 	if (!categorie.equals("NearBusStops")){
 		
 		if (numeroBus > 0 && numeroBus < Integer.parseInt(filtroNumeroRisultatiBus)){
 			filtroNumeroRisultatiServizi = Integer.toString(Integer.parseInt(numerorisultati) - numeroBus);
 		}
	String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " + 
			"PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " + 
			"	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " + 
			"	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
			"	PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " + 
			"	PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " + 
			"	PREFIX foaf:<http://xmlns.com/foaf/0.1/> " + 

			"	SELECT distinct ?ser ?serAddress ?elat ?elong ?sName ?sType ?email ?note " + 
			"	WHERE { " + 
			"	?ser rdf:type SiiMobility:Service . " + 
			//"	?ser SiiMobility:serviceCategory ?sType . " + 
			"	 ?ser vcard:organization-name ?sName . " + 
			"	 ?ser vcard:street-address ?serAddress . " + 
			"	 OPTIONAL {?ser vcard:note ?note} . " +
			"	 OPTIONAL {?ser SiiMobility:email ?email }. " +
			
				filtroLocalita + 
				fc + 
			"	} ";
			if (!filtroNumeroRisultatiServizi.equals("0")){
				queryString += " LIMIT " + filtroNumeroRisultatiServizi; 
			}
			
			//out.println(queryString);
			
	TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
	TupleQueryResult result = tupleQuery.evaluate();
	
	
	 
		while (result.hasNext()) {
			BindingSet bindingSet = result.next();
			 String valueOfSer = bindingSet.getValue("ser").toString();
			 String valueOfSName = bindingSet.getValue("sName").toString();
			 String valueOfSerAddress = bindingSet.getValue("serAddress").toString();
			 String valueOfSType = bindingSet.getValue("sType").toString();
			 String valueOfELat = bindingSet.getValue("elat").toString();
			 String valueOfELong = bindingSet.getValue("elong").toString();
			 String valueOfNote = "";
			 if (bindingSet.getValue("note") != null){
			 	valueOfNote = bindingSet.getValue("note").toString();
			 }
			 
			 String valueOfEmail = "";
			 if (bindingSet.getValue("email") != null){
				 	valueOfEmail = bindingSet.getValue("email").toString();
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

			numeroServizi++;

		}
		
		}
		
		
		if ((numeroServizi + numeroBus) < Integer.parseInt(numerorisultati) && listaCategorie.contains("NearBusStops")){
			// SE CI SONO PIU' FERMATE BUS CHE SERVIZI COMPENSO
			String offset = " OFFSET " + Integer.toString(numeroBus);
			String limit = " LIMIT " + Integer.toString(Integer.parseInt(numerorisultati) - (numeroServizi + numeroBus));
		
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
					"   ?bs SiiMobility:isIn ?road . " + 
					"   ?road SiiMobility:inMunicipalityOf ?com . " +
					"   ?com foaf:name \"" + nomeComune + "\"^^xsd:string . } " + 
					limit + 
					offset;
					
			
			
					//out.println(queryString);
					
			TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
			TupleQueryResult result = tupleQuery.evaluate();
			
			while (result.hasNext()) {
				BindingSet bindingSet = result.next();
				 String valueOfBS = bindingSet.getValue("bs").toString();
				 String valueOfNomeFermata = bindingSet.getValue("nomeFermata").toString();
				 String valueOfBSLat = bindingSet.getValue("bslat").toString();
				 String valueOfBSLong = bindingSet.getValue("bslong").toString();
				 
				 valueOfBS = valueOfBS.replace("<", "");
				 valueOfBS = valueOfBS.replace(">", "");
				 
				 valueOfNomeFermata = valueOfNomeFermata.replace("\"^^<http://www.w3.org/2001/XMLSchema#string>", "");
				 valueOfNomeFermata = valueOfNomeFermata.replace("\"", "");
				 
				 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
				 valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
				 valueOfBSLat = valueOfBSLat.replace("\"", "");
				 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
				 valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
				 valueOfBSLong = valueOfBSLong.replace("\"", "");
				 
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
	            "    \"popupContent\": \"" + valueOfNomeFermata + " - fermata autobus\", " +
	            "    \"nome\": \"" + valueOfNomeFermata + "\", " +
	            "    \"tipo\": \"fermata\", " +
	            "    \"email\": \"\", " +
	 		    "    \"note\": \"\", " +
	 		    "    \"serviceId\": \"" + valueOfBS + "\", " +
	            "    \"indirizzo\": \"\" " +
	            "}, " + 
	            "\"id\": " + Integer.toString(i + 1) + " " + 
	        "}");
			i++;
			numeroBus++;
			}
		
		}
		

		
	out.println("] " + 
		  "}");

	
}
	
%>

     