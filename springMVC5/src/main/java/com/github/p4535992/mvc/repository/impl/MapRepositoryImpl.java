package com.github.p4535992.mvc.repository.impl;

import com.github.p4535992.extractor.estrattori.ExtractInfoWeb;
import com.github.p4535992.extractor.object.model.GeoDocument;
import com.github.p4535992.mvc.object.model.site.Marker;

import com.github.p4535992.util.database.sql.SQLUtilities;

import com.github.p4535992.mvc.object.model.site.MarkerInfo;
import com.github.p4535992.mvc.repository.dao.MapRepository;
import com.github.p4535992.util.repositoryRDF.sesame.Sesame2Utilities;
import edu.stanford.nlp.io.EncodingPrintWriter;
import org.openrdf.OpenRDFException;
import org.openrdf.query.*;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.sql.*;
import java.util.Arrays;
import java.util.Objects;

/**
 * Created by 4535992 on 11/06/2015.
 * @author 4535992.
 * @version 2015-07-02.
 */
@SuppressWarnings("unused")
@Repository
@Scope("singleton")
public class MapRepositoryImpl implements MapRepository {

    //private static SystemLog log = new SystemLog();


    private static String repositoryID;
    private static String dataDir;
    private org.openrdf.repository.RepositoryConnection repositoryConnection;
    private org.openrdf.repository.Repository repository;
    private static String sesameServer;


    //public MapRepositoryImpl(){}

    @Autowired
    public MapRepositoryImpl(
            @Value("${sesameRepositoryID}") String repositoryID,
            @Value("${sesameDataDir}") String dataDir,
            @Value("${sesameServer}") String sesameServer){
        MapRepositoryImpl.repositoryID = repositoryID;
        MapRepositoryImpl.dataDir = dataDir;
        MapRepositoryImpl.sesameServer = sesameServer;
    }


    @Value("${db}")
    private String db;
    @Value("${url}")
    private String url;
    @Value("${user}")
    private String user;
    @Value("${pass}")
    private String pass;

    @Value("${dbServiceMap}")
    private String dbServiceMap;
    @Value("${urlServiceMap}")
    private String urlServiceMap;
    @Value("${userServiceMap}")
    private String userServiceMap;
    @Value("${passServiceMap}")
    private String passServiceMap;

    @Override
    public Marker createMarkerFromGeoDocument(String url){
        ExtractInfoWeb web = ExtractInfoWeb.getInstance(
                "com.mysql.jdbc.Driver","jdbc:mysql","localhost","3306","siimobility","siimobility","geodb");
        web.setGateWithSpring("spring/gate/gate-beans.xml","documentProcessor",this.getClass());
        //web.setConnectionToADatabase(false);
        GeoDocument geoDoc = web.ExtractGeoDocumentFromString(url,"geodocument_2015_09_18","geodocument_2015_09_18",false,false);
        Marker marker = new Marker();
        if(geoDoc.getLat()!=null)marker.setLatitude(geoDoc.getLat().toString().trim());
        if(geoDoc.getLng()!=null)marker.setLongitude(geoDoc.getLng().toString().trim());
        if(geoDoc.getUrl()!=null)marker.setUrl(geoDoc.getUrl().toString().trim());
        if(geoDoc.getEdificio()!=null)marker.setName(geoDoc.getEdificio().trim());

        MarkerInfo info = new MarkerInfo();
        if(geoDoc.getIndirizzo()!=null) info.setAddress(geoDoc.getIndirizzo().trim());
        if(geoDoc.getCity()!=null)info.setCity(geoDoc.getCity().trim());
        if(geoDoc.getProvincia()!=null)info.setProvince(geoDoc.getProvincia());
        if(geoDoc.getRegione()!=null)info.setRegion(geoDoc.getRegione().trim());
        if(geoDoc.getEmail()!=null)info.setEmail(geoDoc.getEmail().trim());
        if(geoDoc.getFax()!=null)info.setFax(geoDoc.getFax().trim());
        if(geoDoc.getTelefono()!=null)info.setPhone(geoDoc.getTelefono().trim());
        if(geoDoc.getIva()!=null)info.setIva(geoDoc.getIva().trim());
        if(geoDoc.getDescription()!=null)info.setDescription(geoDoc.getDescription().trim());

        marker.setMarkerInfo(info);
        marker.setPopupContentMarker(info);
        return marker;

    }

   /* @Override
    public RepositoryConnection getSesameLocalConnection() {
        *//*try {
            File dataDir2 = new File(dataDir + File.separator + repositoryID + File.separator);
            repository = new SailRepository( new MemoryStore(dataDir2) );
            repository.initialize();
            repositoryConnection = repository.getConnection();

        } catch (RepositoryException e) {
            e.printStackTrace();
        }*//*
        Sesame28Kit sesame = Sesame28Kit.getInstance();
        sesame.connectToMemoryRepository(dataDir,repositoryID);
        return sesame.getRepositoryConnection();
    }*/

    @Override
    public RepositoryConnection getSesameRemoteConnection() {
        Sesame2Utilities sesame = Sesame2Utilities.getInstance();
        sesame.connectToHTTPRepository(sesameServer, repositoryID);
        return sesame.getRepositoryConnection();
    }

    @Override
    public String getResponseHTMLString() {
        StringBuilder builder = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        Connection conMySQL2; Statement st2;ResultSet rs2;
        String testCategoryHTML;
        try{
            conMySQL  = SQLUtilities.getMySqlConnection(urlServiceMap,dbServiceMap,userServiceMap,passServiceMap);
            String query = "SELECT ID,NOME,COLORE,EN_NAME,CLASS FROM siimobility.tbl_service_category ORDER BY ID ASC";
            // create the java statement
            st = conMySQL.createStatement();
            // execute the query, and get a java resultset
            rs = st.executeQuery(query);

            // iterate through the java resultset
            while (rs.next()) {
                String id = rs.getString("ID");
                String nome = rs.getString("NOME");
                String colore = rs.getString("COLORE");
                String en_name = rs.getString("EN_NAME");
                String classe = rs.getString("CLASS");
                builder.append("<input type='checkbox' name='").append(en_name).append("' value='")
                        .append(en_name).append("' class='macrocategory' /> <span class='")
                        .append(classe).append(" macrocategory-label'>").append(nome)
                        .append("</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>\n");
                builder.append("<div class='subcategory-content'>\n");

                conMySQL2 = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
                String query2 = "SELECT * FROM siimobility.tbl_service_subcategory WHERE IDCATEGORY = " + id +
                        " ORDER BY ID ASC";
                // create the java statement
                st2 = conMySQL2.createStatement();
                // execute the query, and get a java resultset
                rs2 = st2.executeQuery(query2);

                // iterate through the java resultset
                while (rs2.next()) {
                    String sub_nome = rs2.getString("NOME");
                    String sub_en_name = rs2.getString("EN_NAME");
                    String sub_numero = rs2.getString("NUMERO");

                    builder.append("<input type='checkbox' name='")
                            .append(sub_nome).append("' value='")
                            .append(sub_nome).append("' class='sub_")
                            .append(classe).append(" subcategory' />\n");
                    builder.append("<span class='")
                            .append(classe).append(" subcategory-label'>")
                            .append(sub_numero).append("- ")
                            .append(sub_nome).append("</span>\n");
                    builder.append("<br />\n");
                }
                builder.append("</div>\n");
                builder.append("<br />\n");

                st2.close();
                conMySQL2.close();
            }
            st.close();
            conMySQL.close();
        } catch (SQLException e) {
           System.err.println("Some problem to connect to the database:"+e.getMessage());
        } finally{
            testCategoryHTML = builder.toString();
        }
        return testCategoryHTML;
    }

    @Override
    public String riconciliazione(){
        StringBuilder RICONCILIAZIONE = new StringBuilder();
        Connection conMySQL ;Statement st;ResultSet rs = null;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";

        RepositoryConnection con = null;
        int offset;
        for (int numeroRipetizioni = 0; numeroRipetizioni < 220; numeroRipetizioni++){
            offset = 150 * numeroRipetizioni;
            try {
                int i = 0;
                con = getSesameRemoteConnection();
                try {
                    String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                            "SELECT distinct  ?ser ?loc ?serviceAddr ?via ?numero {  " +
                            "?ser rdf:type SiiMobility:Service . " +
                            "?ser vcard:locality ?loc . " +
                            //"?ser vcard:locality \"FIRENZE\"^^xsd:string . " +
                            "?ser vcard:street-address ?serviceAddr . " +
                            "bind( IF(strbefore( ?serviceAddr, \",\" ) = \"\", ?serviceAddr, strbefore( ?serviceAddr, \",\" )) as ?via ) . " +
                            "bind( strafter( ?serviceAddr, \", \" ) as ?numero ) . " +
                            "FILTER NOT EXISTS {?ser SiiMobility:hasAccess ?inRoad .} " +
                            "} " +
                            "ORDER BY ?loc ?via ?numero " +
                            "LIMIT 150 OFFSET " + Integer.toString(offset);
                    TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                    TupleQueryResult result = tupleQuery.evaluate();
                    String queryString2 = "";
                    int numeroServizi = 0;
                    try {
                        while (result.hasNext()) {
                            BindingSet bindingSet = result.next();
                            String valueOfSer = bindingSet.getValue("ser").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            String valueOfLoc= bindingSet.getValue("loc").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            //String valueOfLoc = "\"FIRENZE\"^^xsd:string";
                            String valueOfVia= bindingSet.getValue("via").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            String valueOfNumero = bindingSet.getValue("numero").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            valueOfLoc = valueOfLoc.toUpperCase();
                            valueOfVia = valueOfVia.toUpperCase();
                            valueOfNumero = valueOfNumero.toUpperCase();
                            valueOfVia = valueOfVia.replace("^^XSD:STRING", "^^xsd:string");
                            valueOfLoc = valueOfLoc.replace("^^XSD:STRING", "^^xsd:string");
                            valueOfNumero = valueOfNumero.replace("^^XSD:STRING", "^^xsd:string");
                            if (!valueOfNumero.contains("xsd:string")){
                                valueOfNumero = valueOfNumero + "xsd:string";
                            }
                            //valueOfVia = valueOfVia.replace("^^xsd:string", "");
                            //valueOfVia = valueOfVia.replace("\"", "");
                            String[] arrayVia = valueOfVia.split(" ");
                            String nuovoValueOfVia = Arrays.toString(arrayVia).replace(", ", ":").replaceAll("[\\[\\]]", "");
                            //valueOfLoc = valueOfLoc.replace("^^xsd:string", "");
                            //valueOfLoc = valueOfLoc.replace("\"", "");
                            String[] arrayLoc = valueOfLoc.split(" ");
                            String nuovoValueOfLoc = Arrays.toString(arrayLoc).replace(", ", ":").replaceAll("[\\[\\]]", "");
                            // RIMUOVO EVENTUALI PARENTESI ()
                            if (valueOfNumero.contains(" (")){
                                int inizio = valueOfNumero.indexOf(" (");
                                int fine = valueOfNumero.indexOf(")");
                                if (fine != -1){
                                    valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine + 1), "");
                                }
                            }
                            //valueOfNumero = valueOfNumero.replaceAll("\\ (.*)","");
                            // RIMUOVO OCCORRENZE DI -
                            if (valueOfNumero.contains(" - ")){
                                int inizio = valueOfNumero.indexOf(" - ");
                                int fine = valueOfNumero.indexOf("\"^^");
                                valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine), "");
                            }
                            // RIMUOVO OCCORRENZE DI -
                            if (valueOfNumero.contains(" -")){
                                int inizio = valueOfNumero.indexOf(" -");
                                int fine = valueOfNumero.indexOf("\"^^");
                                valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine), "");
                            }
                            // FACCIO COMUNQUE UN TRIM
                            //valueOfNumero = valueOfNumero.trim();
                            String filtroColore ;
                            String numeroRosso;
                            if (valueOfNumero.contains("R") || valueOfNumero.contains("/R")) {
                                numeroRosso = valueOfNumero;
                                filtroColore = "?nc SiiMobility:classCode \"Rosso\"^^xsd:string .  ";
                                valueOfNumero = valueOfNumero.replace("/R", "");
                                valueOfNumero = valueOfNumero.replace("R", "");
                            } else{
                                numeroRosso = valueOfNumero;
                                filtroColore = "{?nc SiiMobility:classCode \"Nero\"^^xsd:string . } " +
                                        "UNION {?nc SiiMobility:classCode \"Privo colore\"^^xsd:string . } ";
                            }
                            // NUOVA QUERY
                            try {
                                queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                        "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                                        "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                        "SELECT distinct ?nc ?entry WHERE { " +
                                        "{ " +
                                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                                        "	?comune foaf:name " + valueOfLoc + " .  " +
                                        "	?strada SiiMobility:extendName ?nomeVia .  " +
                                        "	FILTER (ucase(?nomeVia) = " + valueOfVia + ") . " +
                                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                                        "	?nc SiiMobility:extendNumber " + valueOfNumero + " .  " +
                                        filtroColore +
                                        "} " +
                                        "UNION " +
                                        "{ " +
                                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                                        "	?comune foaf:name " + valueOfLoc + " .  " +
                                        "	?strada dcterms:alternative ?nomeAlternativo .  " +
                                        "	FILTER (ucase(?nomeAlternativo) = " + valueOfVia + ") .  " +
                                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                                        "	?nc SiiMobility:extendNumber " + valueOfNumero + " .  " +
                                        filtroColore +
                                        "} " +
                                        "}";
                                //"?strada SiiMobility:inMunicipalityOf ?comune . " +
                                //"?comune foaf:name " + valueOfLoc + " . " +
                                //"?strada SiiMobility:extendName ?nomeVia . " +
                                //"?strada SiiMobility:hasStreetNumber ?nc . " +
                                //"?nc SiiMobility:hasExternalAccess ?entry . " +
                                //"?nc SiiMobility:extendNumber " + valueOfNumero + " . " +
                                //filtroColore +
                                //"<" + nuovoValueOfVia + ":> fts:matchIgnoreCase ?nomeVia. " +
                                //"<" + nuovoValueOfLoc + ":> fts:matchIgnoreCase ?nomeComune. " +
                                //"FILTER (lcase(?nomeComune) = " + valueOfLoc.toString() + ") . " +
                                //"FILTER (ucase(?nomeVia) = " + valueOfVia.toString() + ") . " +
                                //"FILTER (lcase(?numeroCivico) = " + valueOfNumero.toString() + ") . " +
                                //"OPTIONAL { " +
                                //	"?strada dcterms:alternative ?nomeAlternativo . " +
                                //	"FILTER (ucase(?nomeAlternativo) = " + valueOfVia.toString() + ") . " +
                                //"} " +
                                //"}";
                                //out.println(queryString2 + "\n\n\n");
                                TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                                TupleQueryResult result2 = tupleQuery2.evaluate();
                                if (result2.hasNext()){
                                    while (result2.hasNext()) {
                                        BindingSet bindingSet2 = result2.next();
                                        org.openrdf.model.Value valueOfNC = bindingSet2.getValue("nc");
                                        org.openrdf.model.Value valueOfEntry = bindingSet2.getValue("entry");
                                        String numeroCivico = valueOfNumero.replace("^^xsd:string", "");
                                        numeroCivico = numeroCivico.replace("\"", "");
                                        numeroCivico = numeroCivico.replaceAll("'","''");
                                        String via = valueOfVia.replace("^^xsd:string", "");
                                        via = via.replace("\"", "");
                                        via = via.replaceAll("'","''");
                                        String comune = valueOfLoc.replace("^^xsd:string", "");
                                        comune = comune.replace("\"", "");
                                        comune = comune.replaceAll("'","''");
                                        i++;
                                        try {
                                            conMySQL = DriverManager.getConnection(url + db, user, pass);
                                            //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                            st = conMySQL.createStatement();
                                            String sqlInsert = "INSERT INTO riconciliazione_test (COD_SER, COMUNE, VIA, NUMERO, COD_CIV, COD_ACC) VALUES " +
                                                    "('<" + valueOfSer + ">','" + comune + "', '" + via + "', '" + numeroCivico + "', '<" + valueOfNC.toString() + ">', '<" + valueOfEntry.toString() + ">')" +
                                                    " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_CIV=VALUES(COD_CIV), COD_ACC=VALUES(COD_ACC);";
                                            st.addBatch(sqlInsert);
                                            st.executeBatch();
                                            st.close();
                                            conMySQL.close();

                                        }
                                        catch (Exception e) {
                                            RICONCILIAZIONE.append(e.getMessage());
                                        }
                                    }
                                }
                                else{
                                    // SE NON TROVO IL CIVICO ALMENO CERCO LA STRADA
                                    String queryString3 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                                            "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                            "SELECT distinct ?strada WHERE { " +
                                            "{ " +
                                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                                            "?comune foaf:name " + valueOfLoc + " . " +
                                            "?strada SiiMobility:extendName ?nomeVia . " +
                                            "FILTER (ucase(?nomeVia) = " + valueOfVia + ") . " +
                                            "} UNION { " +
                                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                                            "?comune foaf:name " + valueOfLoc + " . " +
                                            "?strada dcterms:alternative ?nomeAlternativo . " +
                                            "FILTER (ucase(?nomeAlternativo) = " + valueOfVia + ") . " +
                                            "}" +
                                            "}";
                                    TupleQuery tupleQuery3 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString3);
                                    TupleQueryResult result3 = tupleQuery3.evaluate();
                                    String valueOfStrada = "";
                                    if (result3.hasNext()){
                                        while (result3.hasNext()) {
                                            BindingSet bindingSet3 = result3.next();
                                            valueOfStrada = bindingSet3.getValue("strada").toString();
                                        }
                                    }
                                    String numeroCivico = numeroRosso.replace("^^xsd:string", "");
                                    numeroCivico = numeroCivico.replace("\"", "");
                                    numeroCivico = numeroCivico.replaceAll("'","''");
                                    String via = valueOfVia.replace("^^xsd:string", "");
                                    via = via.replace("\"", "");
                                    via = via.replaceAll("'","''");
                                    String comune = valueOfLoc.replace("^^xsd:string", "");
                                    comune = comune.replace("\"", "");
                                    comune = comune.replaceAll("'","''");
                                    try {
                                        conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
                                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                        st = conMySQL.createStatement();
                                        String sqlInsert = "INSERT INTO riconciliazione_servizi_non_trovati (COD_SER, COMUNE, VIA, NUMERO, COD_TOP) VALUES " +
                                                "('<" + valueOfSer + ">','" + comune + "', '" + via + "', '" + numeroCivico + "', '" + valueOfStrada + "')" +
                                                " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_TOP=VALUES(COD_TOP);";
                                        st.addBatch(sqlInsert);
                                        st.executeBatch();
                                        st.close();
                                        conMySQL.close();
                                    }
                                    catch (Exception e) {
                                        RICONCILIAZIONE.append(e.getMessage());
                                    }
                                }
                            }
                            catch (OpenRDFException e) {
                                // handle exception
                                RICONCILIAZIONE.append(e.getMessage());
                                RICONCILIAZIONE.append(queryString2);
                                RICONCILIAZIONE.append("Numero Servizi: ").append(numeroServizi);
                            }

                            numeroServizi++;
                        } // fine while
                        RICONCILIAZIONE.append("Numero Servizi: ").append(numeroServizi);
                    }
                    catch (OpenRDFException e) {
                        // handle exception
                        RICONCILIAZIONE.append(e.getMessage());
                        RICONCILIAZIONE.append("<pre><code>").append(queryString2).append("<code></pre>");
                        RICONCILIAZIONE.append("Numero Servizi: ").append(numeroServizi);
                    }

                    finally {
                        result.close();
                    }
                }
                finally {
                    con.close();
                }
                RICONCILIAZIONE.append("Servizi recuperati: ").append(Integer.toString(i));
            }
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAZIONE.append(e.getMessage());
            }
            finally{
                try {
                    con.close();
                } catch (RepositoryException e) {
                    RICONCILIAZIONE.append(e.getMessage());
                }
            }
        }
        return RICONCILIAZIONE.toString();
    }//riconciliazione

    @Override
    public String homeMain(){
        StringBuilder MAIN = new StringBuilder();
        MAIN.append("Hello, world2!<br />");
        sesameServer = "http://localhost:8080/openrdf-sesame/";
        repositoryID = "owlim";
        try {
            RepositoryConnection con = getSesameRemoteConnection();
            try {
                String queryString =
                        "PREFIX km4c:<http://www.disit.org/km4city/schema#> " +
                                "PREFIX km4cr:<http://www.disit.org/km4city/resource#> " +
                                "SELECT ?serviceCategory WHERE { " +
                                "?serviceCategory rdfs:subClassOf <http://www.disit.org/km4city/schema#Service>. } " +
                                "ORDER BY ?serviceCategory ";
                //  out.println(queryString);
                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                TupleQueryResult result = tupleQuery.evaluate();
                try {
                    while (result.hasNext()) {
                        BindingSet bindingSet = result.next();
                        org.openrdf.model.Value valueOfServiceCategory = bindingSet.getValue("serviceCategory");
                        MAIN.append("<option value='")
                                .append(valueOfServiceCategory.toString()
                                        .replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string"))
                                .append("'>").append(valueOfServiceCategory.toString()).append("</option>");
                    }
                }
                finally {
                    result.close();
                }
            }
            finally {
                con.close();
            }
        } catch (OpenRDFException e) {
            // handle exception
            MAIN.append(e.getMessage()).append("\n");
        }
        return MAIN.toString();
    }

    @Override
    public String query(String via, String tipo){
        StringBuilder QUERY = new StringBuilder();
        sesameServer = "http://localhost:8080/openrdf-sesame/";
        repositoryID = "owlim";
        try {
            //String via = request.getParameter("via");
            //String tipo = request.getParameter("tipo");
            if (Objects.equals(tipo, "")) tipo = "?serviceCategory";
            RepositoryConnection con = getSesameRemoteConnection();
            try {
                String queryString = "PREFIX :<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        " PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        " PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> ";
                if (Objects.equals(tipo, "?serviceCategory")){
                    queryString = queryString + " SELECT DISTINCT ?orgName ?streetAddress ?serviceCategory WHERE { " +
                            " ?road :extendName '" + via.toUpperCase() + "'^^xsd:string . " +
                            " 	?service :isIn ?road . " +
                            " 	?road rdf:type :Road . " +
                            "  ?service vcard:organization-name ?orgName . " +
                            "  ?service vcard:street-address ?streetAddress . " +
                            "  ?service :serviceCategory " + tipo + " . " +
                            " } ";
                }
                else{
                    queryString = queryString + " SELECT DISTINCT ?orgName ?streetAddress WHERE { " +
                            " ?road :extendName '" + via.toUpperCase() + "'^^xsd:string . " +
                            " 	?service :isIn ?road . " +
                            " 	?road rdf:type :Road . " +
                            "  ?service vcard:organization-name ?orgName . " +
                            "  ?service vcard:street-address ?streetAddress . " +
                            "  ?service :serviceCategory " + tipo + " . " +
                            " } ";
                }
                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                TupleQueryResult result = tupleQuery.evaluate();
                try {
                    QUERY.append("<table>\n");
                    QUERY.append("<tr>\n");
                    QUERY.append("<td>Nome Servizio</td>\n");
                    QUERY.append("<td>Indirizzo</td>\n");
                    QUERY.append("<td>Tipo Servizio</td>\n");
                    QUERY.append("</tr>\n");
                    while (result.hasNext()) {
                        QUERY.append("<tr>\n");
                        BindingSet bindingSet = result.next();
                        org.openrdf.model.Value valueOfOrgName = bindingSet.getValue("orgName");
                        org.openrdf.model.Value valueOfStreetAddress = bindingSet.getValue("streetAddress");
                        org.openrdf.model.Value valueOfServiceCategory = null;
                        if (Objects.equals(tipo, "?serviceCategory")){
                            valueOfServiceCategory = bindingSet.getValue("serviceCategory");
                        }
                        QUERY.append("<td>").append(valueOfOrgName.toString()).append("</td>\n");
                        QUERY.append("<td>").append(valueOfStreetAddress.toString()).append("</td>\n");
                        if (Objects.equals(tipo, "?serviceCategory")){
                            if (valueOfServiceCategory != null) {
                                QUERY.append("<td>").append(valueOfServiceCategory.toString()).append("</td>\n");
                            }else{
                                QUERY.append("<td>").append("</td>\n");
                            }
                        }
                        else{
                            QUERY.append("<td>").append(tipo).append("</td>\n");
                        }
                        QUERY.append("</tr>\n");
                    }
                    QUERY.append("</table>\n");
                }
                finally {
                    result.close();
                }
            }
            finally {
                con.close();
            }
        }
        catch (OpenRDFException e) {
            // handle exception
           QUERY.append(e.getMessage());
        }
        return QUERY.toString();
    }

    @Override
    public String riconciliazioneAlternative(){
        StringBuilder RICONCILIAZIONE_ALTERNATIVE = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        Connection conMySQL2;Statement st2 ;ResultSet rs2 = null;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        int sumcount = 0;
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
            String query = "select * from riconciliazione_strade";
            st = conMySQL.createStatement();
            rs = st.executeQuery(query);
            while (rs.next()) {
                for (int i = 2; i <= 7; i++){
                    if (!(rs.getString(i).equals("") || rs.getString(i).equals("A") || rs.getString(i).equals("E") || rs.getString(i).equals("I") ||
                            rs.getString(i).equals("O") || rs.getString(i).equals("U") || rs.getString(i).equals("V") || rs.getString(i).equals("S") ||
                            rs.getString(i).equals(" "))){
                        String daSostituire = rs.getString(i);
                        for (int j = 2; j <= 7; j++){
                            if (!(j == i)){
                                if (!(rs.getString(j).equals(""))){
                                    String sostituisciCon = rs.getString(j);
                                    RepositoryConnection con = getSesameRemoteConnection();
                                    String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " +
                                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                            "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                            "SELECT DISTINCT ?roadURI ?nomeAlternative " +
                                            "WHERE { " +
                                            "?roadURI rdf:type SiiMobility:Road . " +
                                            //"?roadURI SiiMobility:extendName ?nomeStrada .  " +
                                            "?roadURI dcterms:alternative ?nomeAlternative .  " +
                                            //"FILTER " + rs.getString(8) + "(ucase(?nomeStrada), \"" + daSostituire + "\"^^xsd:string ) . " +
                                            "FILTER " + rs.getString(8) + "(ucase(?nomeAlternative), \"" + daSostituire + "\"^^xsd:string ) . " +
                                            //"UNION {FILTER " + rs.getString(8) + "(ucase(?nomeAlternativo), \"" + daSostituire + "\"^^xsd:string ) . }" +
                                            "}";
                                    TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                                    TupleQueryResult result = tupleQuery.evaluate();
                                    try{
                                        while (result.hasNext()) {
                                            try{
                                                BindingSet bindingSet = result.next();
                                                String valueOfRoadUri = bindingSet.getValue("roadURI").toString();
                                                String valueOfNomeAlternative = bindingSet.getValue("nomeAlternative").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                                                String nuovoNomeStrada = valueOfNomeAlternative.replace(daSostituire, sostituisciCon);
                                                // PRIMA CERCO NEL REPO -> SE LA TRIPLA C'E' GIA' NON LA RIGENERO
                                                String queryStringFind = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " +
                                                        " PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                                        "ASK  {  " +
                                                        " <" + valueOfRoadUri + "> rdf:type SiiMobility:Road .  " +
                                                        // "{  " +
                                                        //" <" + valueOfRoadUri + "> SiiMobility:extendName " + nuovoNomeStrada + " . " +
                                                        //" } " +
                                                        // "UNION " +
                                                        //" { " +
                                                        " <" + valueOfRoadUri + "> dcterms:alternative " + nuovoNomeStrada + " . " +
                                                        //" } " +
                                                        " }";
                                                BooleanQuery booleanQuery = con.prepareBooleanQuery(QueryLanguage.SPARQL, queryStringFind);
                                                boolean truth = booleanQuery.evaluate();
                                                if (!truth){
                                                    nuovoNomeStrada = nuovoNomeStrada.replaceAll("'","''");
                                                    valueOfNomeAlternative = valueOfNomeAlternative.replaceAll("'","''");
                                                    try {
                                                        conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                                        st2 = conMySQL2.createStatement();
                                                        String sqlInsert = "INSERT INTO riconciliazione_strade_nuovetriple (Soggetto, Oggetto, NOME_ORIGINALE) VALUES " +
                                                                "('<" + valueOfRoadUri + ">','" + nuovoNomeStrada + "', '" + valueOfNomeAlternative + "') " +
                                                                "ON DUPLICATE KEY UPDATE Soggetto=VALUES(Soggetto), Oggetto=VALUES(Oggetto), NOME_ORIGINALE=VALUES(NOME_ORIGINALE);";
                                                        st2.addBatch(sqlInsert);
                                                        st2.executeBatch();
                                                        st2.close();
                                                        conMySQL2.close();
                                                    }
                                                    catch (Exception e) {
                                                        RICONCILIAZIONE_ALTERNATIVE.append(e.getMessage()).append("\n");
                                                    }
                                                }
                                            } // end try dentro ???
                                            catch (OpenRDFException e) {
                                                // handle exception
                                                RICONCILIAZIONE_ALTERNATIVE.append(e.getMessage()).append("\n");
                                            }
                                        } // end while ??
                                    }
                                    catch (OpenRDFException e) {
                                        // handle exception
                                        RICONCILIAZIONE_ALTERNATIVE.append(result.getBindingNames()).append("\n");
                                        RICONCILIAZIONE_ALTERNATIVE.append(e.getMessage()).append("\n");
                                    }
                                }//if
                            }//if
                        }//for
                    }//if
                }//for
            }//while
        } catch ( SQLException | MalformedQueryException | QueryEvaluationException
                | RepositoryException e) {
            RICONCILIAZIONE_ALTERNATIVE.append(e.getMessage()).append("\n");
        }
        return RICONCILIAZIONE_ALTERNATIVE.toString();
    }

    @Override
    public String riconciliazione_bus(){
        StringBuilder RICONCILIAZIONE_BUS = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        Connection conMySQL2;Statement st2;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        RepositoryConnection con = getSesameRemoteConnection();
        try {
            int i = 0;
            try {
                String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
                        "SELECT distinct  ?bs ?bslat ?bslong {  " +
                        "?bs rdf:type SiiMobility:BusStop . " +
                        "?bs geo:lat ?bslat . " +
                        "?bs geo:long ?bslong . " +
                        "} ";
                //out.println(queryString);
                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                TupleQueryResult result = tupleQuery.evaluate();
                int numeroServizi = 0;
                try {
                    while (result.hasNext()) {
                        BindingSet bindingSet = result.next();
                        String valueOfBS = bindingSet.getValue("bs").toString();
                        String valueOfBSLat = bindingSet.getValue("bslat").toString();
                        String valueOfBSLong = bindingSet.getValue("bslong").toString();

                        valueOfBSLat = valueOfBSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
                        valueOfBSLat = valueOfBSLat.replace("\"", "");

                        valueOfBSLong = valueOfBSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
                        valueOfBSLong = valueOfBSLong.replace("\"", "");

                        conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap,dbServiceMap, userServiceMap, passServiceMap);
                        String query = "SELECT URI_ACC FROM `riconciliazione_bus` WHERE `URI_BUS` = '" + valueOfBS + "'";
                        // create the java statement
                        st = conMySQL.createStatement();
                        // execute the query, and get a java resultset
                        rs = st.executeQuery(query);
                        // iterate through the java resultset
                        if (rs.next()) {
                            String URI_ACC =  rs.getString("URI_ACC");
                            st.close();
                            conMySQL.close();
                            if (URI_ACC.equals("")){
                                try {
                                    String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                            "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
                                            "	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                            "	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                            "	PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " +
                                            "	SELECT distinct ?entry ?nc ?road ?com " +
                                            "	WHERE { " +
                                            "	?entry rdf:type SiiMobility:Entry . " +
                                            "	?nc SiiMobility:hasExternalAccess ?entry . " +
                                            "	?nc SiiMobility:belongTo ?road . " +
                                            "	?entry geo:lat ?elat . " +
                                            "	 ?entry geo:long ?elong . " +
                                            "	?road SiiMobility:inMunicipalityOf ?com . " +
                                            "	?entry omgeo:nearby(" + valueOfBSLat + " " + valueOfBSLong + "  \"0.6km\") . " +
                                            " BIND( omgeo:distance(?elat, ?elong, " + valueOfBSLat + ", " + valueOfBSLong + ") AS ?distanza)	" +
                                            "	} " +
                                            "ORDER BY ?distanza " +
                                            "LIMIT 1";
                                    TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                                    TupleQueryResult result2 = tupleQuery2.evaluate();
                                    if (result2.hasNext()){
                                        BindingSet bindingSet2 = result2.next();
                                        String valueOfNC = bindingSet2.getValue("nc").toString();
                                        String valueOfEntry = bindingSet2.getValue("entry").toString();
                                        String valueOfRoad = bindingSet2.getValue("road").toString();
                                        String valueOfCom = bindingSet2.getValue("com").toString();
                                        i++;
                                        try {
                                            conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                            //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                            st2 = conMySQL2.createStatement();
                                            String sqlInsert2 = "INSERT INTO riconciliazione_bus (URI_BUS, URI_ACC, URI_CIV, URI_ROAD, URI_COM) VALUES " +
                                                    "('" + valueOfBS + "','" + valueOfEntry + "', '" + valueOfNC + "', '" + valueOfRoad + "', '" + valueOfCom + "')" +
                                                    " ON DUPLICATE KEY UPDATE URI_ACC=VALUES(URI_ACC), URI_CIV=VALUES(URI_CIV), URI_ROAD=VALUES(URI_ROAD), URI_COM=VALUES(URI_COM);";
                                            st2.addBatch(sqlInsert2);
                                            st2.executeBatch();
                                            st2.close();
                                            conMySQL2.close();
                                        }
                                        catch (Exception e) {
                                            RICONCILIAZIONE_BUS.append(e.getMessage()).append("\n");;
                                        }
                                    }
                                    else{
                                    /* conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                    //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                    st2 = conMySQL2.createStatement();
                                    String sqlInsert2 = "INSERT INTO riconciliazione_bus (URI_BUS, URI_ACC) VALUES " +
                                          "('" + valueOfBS + "', '')" +
                                          " ON DUPLICATE KEY UPDATE URI_ACC=VALUES(URI_ACC);";
                                    st2.addBatch(sqlInsert2);
                                    st2.executeBatch();
                                    st2.close();
                                    conMySQL2.close(); */
                                    }
                                } catch (OpenRDFException e) {
                                    // handle exception
                                    RICONCILIAZIONE_BUS.append(e.getMessage()).append("\n");
                                    //out.println(queryString2);
                                    RICONCILIAZIONE_BUS.append("Numero Servizi: ").append(numeroServizi).append("\n");
                                }
                            }

                        }
                        else{
                            st.close();
                            conMySQL.close();
                        }
                        numeroServizi++;
                    } // fine while
                    RICONCILIAZIONE_BUS.append("Numero Servizi: ").append(numeroServizi).append("\n");
                }
                catch (OpenRDFException e) {
                    // handle exception
                    RICONCILIAZIONE_BUS.append(e.getMessage()).append("\n");
                    //out.println("<pre><code>" + queryString2 + "<code></pre>");
                    RICONCILIAZIONE_BUS.append("Numero Servizi: ").append(numeroServizi).append("\n");
                } catch (SQLException  e) {
                    RICONCILIAZIONE_BUS.append(e.getMessage()).append("\n");
                } finally {result.close();}
            }
            finally {con.close();}
            RICONCILIAZIONE_BUS.append("Servizi recuperati: ").append(Integer.toString(i)).append("\n");;
        }
        catch (OpenRDFException e) {
            // handle exception
            RICONCILIAZIONE_BUS.append(e.getMessage()).append("\n");;
        }
        return RICONCILIAZIONE_BUS.toString();
    }//riconciliaizone_bus

    @Override
    public String riconciliazione_comuni_sbagliati(){
        StringBuilder RICONCILIAZIONE_COMUNI_SBAGLIATI = new StringBuilder();
        Connection conMySQL;Statement st ;ResultSet rs;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        RepositoryConnection con = getSesameRemoteConnection();
        try {
        conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);

        String query = "SELECT DISTINCT t1.COMUNE AS LOCALITA, t2.COMUNE AS COMUNE FROM `riconciliazione_servizi_non_trovati` t1 join localita_comuni t2 on t2.LOCALITA = t1.COMUNE " +
                "WHERE t1.COMUNE NOT IN " +
                "(SELECT DISTINCT DEN_UFF from tbl_elenco_comuni)";
        // create the java statement
        st = conMySQL.createStatement();
        // execute the query, and get a java resultset
        rs = st.executeQuery(query);
        // iterate through the java resultset
        while (rs.next())
        {
            String localita = rs.getString("LOCALITA");
            String nuovo_comune = rs.getString("COMUNE");
            try {
                int i = 0;
                try {
                    String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                            "SELECT distinct  ?ser ?loc ?serviceAddr ?via ?numero {  " +
                            "?ser rdf:type SiiMobility:Service . " +
                            "?ser vcard:locality ?comune . " +
                            "?ser vcard:street-address ?serviceAddr . " +
                            "bind( IF(strbefore( ?serviceAddr, \",\" ) = \"\", ?serviceAddr, strbefore( ?serviceAddr, \",\" )) as ?via ) . " +
                            "bind( strafter( ?serviceAddr, \", \" ) as ?numero ) . " +
                            "FILTER NOT EXISTS {?ser SiiMobility:hasAccess ?inRoad .} " +
                            "FILTER (ucase(?comune) = \"" + localita + "\"^^xsd:string) . " +
                            "} " +
                            "ORDER BY ?loc ?via ?numero";
                    //"LIMIT 150 OFFSET " + Integer.toString(offset);

                    //out.println(queryString);
                    TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                    TupleQueryResult result = tupleQuery.evaluate();
                    String queryString2 = "";
                    int numeroServizi = 0;
                    try {
                        while (result.hasNext()) {
                            BindingSet bindingSet = result.next();

                            String valueOfSer = bindingSet.getValue("ser").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            //String valueOfLoc= bindingSet.getValue("loc").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            String valueOfLoc = "\"" + localita + "\"^^xsd:string";
                            String valueOfVia= bindingSet.getValue("via").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                            String valueOfNumero = bindingSet.getValue("numero").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");

                            valueOfLoc = valueOfLoc.toUpperCase();
                            valueOfVia = valueOfVia.toUpperCase();
                            valueOfNumero = valueOfNumero.toUpperCase();

                            valueOfLoc = valueOfLoc.replace(localita, nuovo_comune);

                            valueOfVia = valueOfVia.replace("^^XSD:STRING", "^^xsd:string");
                            valueOfLoc = valueOfLoc.replace("^^XSD:STRING", "^^xsd:string");
                            valueOfNumero = valueOfNumero.replace("^^XSD:STRING", "^^xsd:string");

                            if (!valueOfNumero.contains("xsd:string")){
                                valueOfNumero = valueOfNumero + "xsd:string";
                            }

                            //valueOfVia = valueOfVia.replace("^^xsd:string", "");
                            //valueOfVia = valueOfVia.replace("\"", "");
                            //String[] arrayVia = valueOfVia.split(" ");
                            //String nuovoValueOfVia = Arrays.toString(arrayVia).replace(", ", ":").replaceAll("[\\[\\]]", "");

                            //valueOfLoc = valueOfLoc.replace("^^xsd:string", "");
                            //valueOfLoc = valueOfLoc.replace("\"", "");
                            //String[] arrayLoc = valueOfLoc.split(" ");
                            //String nuovoValueOfLoc = Arrays.toString(arrayLoc).replace(", ", ":").replaceAll("[\\[\\]]", "");

                            // RIMUOVO EVENTUALI PARENTESI ()
                            if (valueOfNumero.contains(" (")){
                                int inizio = valueOfNumero.indexOf(" (");
                                int fine = valueOfNumero.indexOf(")");
                                if (fine != -1){
                                    valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine + 1), "");
                                }

                            }
                            //valueOfNumero = valueOfNumero.replaceAll("\\ (.*)","");
                            // RIMUOVO OCCORRENZE DI -
                            if (valueOfNumero.contains(" - ")){
                                int inizio = valueOfNumero.indexOf(" - ");
                                int fine = valueOfNumero.indexOf("\"^^");
                                valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine), "");
                            }

                            // RIMUOVO OCCORRENZE DI -
                            if (valueOfNumero.contains(" -")){
                                int inizio = valueOfNumero.indexOf(" -");
                                int fine = valueOfNumero.indexOf("\"^^");
                                valueOfNumero = valueOfNumero.replace(valueOfNumero.substring(inizio, fine), "");
                            }

                            String filtroColore = "";
                            if (valueOfNumero.contains("R") || valueOfNumero.contains("/R"))
                            {
                                filtroColore = "?nc SiiMobility:classCode \"Rosso\"^^xsd:string .  ";
                                //filtroNumero = "{?nc SiiMobility:extendNumber " + valueOfNumero + " . } " +
                                //		"UNION {?nc SiiMobility:extendNumber " + valueOfNumero + " . } ";
                                valueOfNumero = valueOfNumero.replace("/R", "");
                                valueOfNumero = valueOfNumero.replace("R", "");

                            }
                            else{
                                filtroColore = "{?nc SiiMobility:classCode \"Nero\"^^xsd:string . } " +
                                        "UNION {?nc SiiMobility:classCode \"Privo colore\"^^xsd:string . } ";
                            }
                            // NUOVA QUERY
                            try {
                                queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                        "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                                        "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                        "SELECT distinct ?nc ?entry WHERE { " +

                                        "{ " +
                                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                                        "	?comune foaf:name " + valueOfLoc + " .  " +
                                        "	?strada SiiMobility:extendName ?nomeVia .  " +
                                        "	FILTER (ucase(?nomeVia) = " + valueOfVia + ") . " +
                                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                                        "	?nc SiiMobility:extendNumber " + valueOfNumero + " .  " +
                                        filtroColore +
                                        "} " +
                                        "UNION " +
                                        "{ " +
                                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                                        "	?comune foaf:name " + valueOfLoc + " .  " +
                                        "	?strada dcterms:alternative ?nomeAlternativo .  " +
                                        "	FILTER (ucase(?nomeAlternativo) = " + valueOfVia + ") .  " +
                                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                                        "	?nc SiiMobility:extendNumber " + valueOfNumero + " .  " +
                                        filtroColore +
                                        "} " +
                                        "}";
                                TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                                TupleQueryResult result2 = tupleQuery2.evaluate();
                                if (result2.hasNext()){
                                    while (result2.hasNext()) {
                                        BindingSet bindingSet2 = result2.next();
                                        org.openrdf.model.Value valueOfNC = bindingSet2.getValue("nc");
                                        org.openrdf.model.Value valueOfEntry = bindingSet2.getValue("entry");
                                        String numeroCivico = valueOfNumero.replace("^^xsd:string", "");
                                        numeroCivico = numeroCivico.replace("\"", "");
                                        numeroCivico = numeroCivico.replaceAll("'","''");
                                        String via = valueOfVia.replace("^^xsd:string", "");
                                        via = via.replace("\"", "");
                                        via = via.replaceAll("'","''");
                                        String comune = valueOfLoc.replace("^^xsd:string", "");
                                        comune = comune.replace("\"", "");
                                        comune = comune.replaceAll("'","''");
                                        i++;
                                        try {
                                            conMySQL = DriverManager.getConnection(url + db, user, pass);
                                            //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                            st = conMySQL.createStatement();
                                            String sqlInsert = "INSERT INTO riconciliazione_test (COD_SER, COMUNE, VIA, NUMERO, COD_CIV, COD_ACC) VALUES " +
                                                    "('<" + valueOfSer + ">','" + comune + "', '" + via + "', '" + numeroCivico + "', '<" + valueOfNC.toString() + ">', '<" + valueOfEntry.toString() + ">')" +
                                                    " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_CIV=VALUES(COD_CIV), COD_ACC=VALUES(COD_ACC);";
                                            st.addBatch(sqlInsert);
                                            st.executeBatch();
                                            st.close();
                                            conMySQL.close();

                                        }
                                        catch (Exception e) {
                                            RICONCILIAZIONE_COMUNI_SBAGLIATI.append(e.getMessage()).append("\n");
                                        }
                                    }
                                }
                                else{

                                    // SE NON TROVO IL CIVICO ALMENO CERCO LA STRADA

                                    String queryString3 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                                            "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                            "SELECT distinct ?strada WHERE { " +
                                            "{ " +

                                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                                            "?comune foaf:name " + valueOfLoc + " . " +
                                            "?strada SiiMobility:extendName ?nomeVia . " +
                                            "FILTER (ucase(?nomeVia) = " + valueOfVia + ") . " +

                                            "} UNION { " +

                                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                                            "?comune foaf:name " + valueOfLoc + " . " +
                                            "?strada dcterms:alternative ?nomeAlternativo . " +
                                            "FILTER (ucase(?nomeAlternativo) = " + valueOfVia + ") . " +
                                            "}" +
                                            "}";

                                    TupleQuery tupleQuery3 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString3);
                                    TupleQueryResult result3 = tupleQuery3.evaluate();
                                    String valueOfStrada = "";
                                    if (result3.hasNext()){
                                        while (result3.hasNext()) {
                                            BindingSet bindingSet3 = result3.next();
                                            valueOfStrada = bindingSet3.getValue("strada").toString();
                                        }
                                    }

                                    String numeroCivico = valueOfNumero.replace("^^xsd:string", "");
                                    numeroCivico = numeroCivico.replace("\"", "");
                                    numeroCivico = numeroCivico.replaceAll("'","''");
                                    String via = valueOfVia.replace("^^xsd:string", "");
                                    via = via.replace("\"", "");
                                    via = via.replaceAll("'","''");
                                   /* String comune = valueOfLoc.replace("^^xsd:string", "");
                                    comune = comune.replace("\"", "");
                                    comune = comune.replaceAll("'","''");*/
                                    try {
                                        conMySQL = DriverManager.getConnection(url + db, user, pass);
                                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                        st = conMySQL.createStatement();
                                        nuovo_comune = nuovo_comune.replace("'", "''");
                                        String sqlInsert = "INSERT INTO riconciliazione_servizi_non_trovati (COD_SER, COMUNE, VIA, NUMERO, COD_TOP) VALUES " +
                                                "('<" + valueOfSer + ">','" + nuovo_comune + "', '" + via + "', '" + numeroCivico + "', '" + valueOfStrada + "')" +
                                                " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_TOP=VALUES(COD_TOP);";
                                        st.addBatch(sqlInsert);
                                        st.executeBatch();
                                        st.close();
                                        conMySQL.close();
                                    }
                                    catch (Exception e) {
                                        RICONCILIAZIONE_COMUNI_SBAGLIATI.append(e.getMessage()).append("\n");
                                    }
                                }
                            }
                            catch (OpenRDFException e) {
                                // handle exception
                                RICONCILIAZIONE_COMUNI_SBAGLIATI.append(e.getMessage()).append("\n");
                                RICONCILIAZIONE_COMUNI_SBAGLIATI.append(queryString2).append("\n");
                                RICONCILIAZIONE_COMUNI_SBAGLIATI.append("Numero Servizi: ").append(numeroServizi).append("\n");
                            }

                            numeroServizi++;
                        } // fine while
                        RICONCILIAZIONE_COMUNI_SBAGLIATI.append("Numero Servizi: ").append(numeroServizi).append("\n");
                    }
                    catch (OpenRDFException e) {
                        // handle exception
                        RICONCILIAZIONE_COMUNI_SBAGLIATI.append(e.getMessage()).append("\n");
                        RICONCILIAZIONE_COMUNI_SBAGLIATI.append("<pre><code>").append(queryString2).append("<code></pre>").append("\n");
                        RICONCILIAZIONE_COMUNI_SBAGLIATI.append("Numero Servizi: ").append(numeroServizi).append("\n");
                    }
                    finally {result.close();}
                }
                finally {con.close();}
                RICONCILIAZIONE_COMUNI_SBAGLIATI.append("Servizi recuperati: ").append(Integer.toString(i)).append("\n");
            }
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAZIONE_COMUNI_SBAGLIATI.append(e.getMessage()).append("\n");
            }
            finally{ con.close();}
        }
        } catch ( SQLException | RepositoryException e) {
            e.printStackTrace();
        }
        return RICONCILIAZIONE_COMUNI_SBAGLIATI.toString();
    }//riconciliazione_comuni_sbagliati

    @Override
    public String riconciliazione_contains(){
        StringBuilder RICONCILIAZIONE_CONTAINS = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";

        RepositoryConnection con = getSesameRemoteConnection();
        try {
        conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
        String query = "SELECT * FROM riconciliazione_ultima_parola_ok WHERE NUMERO <> '' AND NUMERO <> '0' AND NUMERO NOT LIKE '%sn%'";
        // create the java statement
        st = conMySQL.createStatement();
        // execute the query, and get a java resultset
        rs = st.executeQuery(query);
        // iterate through the java resultset
        while (rs.next()) {
            String id =  rs.getString("ID");
            String comune = rs.getString("COMUNE");
            String via = rs.getString("VIA");
            String numero = rs.getString("NUMERO");
            String servizio = rs.getString("COD_SER");
            String COD_TOP = "<" + rs.getString("COD_TOP") + ">";
            String[] arrayNumeri = numero.split("-");
            try {
                int i = 0;
                // NUOVA QUERY
                String filtroNumeri = "";
                if (arrayNumeri.length > 0){
                    for (int j = 0; j < arrayNumeri.length; j++){
                        if (j == 0){
                            filtroNumeri = filtroNumeri + "{ ?nc SiiMobility:extendNumber \"" + arrayNumeri[j] + "\"^^xsd:string . }";
                        }
                        else{
                            filtroNumeri = filtroNumeri + " UNION { ?nc SiiMobility:extendNumber \"" + arrayNumeri[j] + "\"^^xsd:string . }";
                        }
                    }
                }
                else{
                    filtroNumeri = filtroNumeri + "{ ?nc SiiMobility:extendNumber \"" + numero + "\"^^xsd:string . }";
                }
                String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                        "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                        "SELECT distinct ?nc ?entry WHERE { " +
                        "	" + COD_TOP + " SiiMobility:hasStreetNumber ?nc .  " +
                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                        filtroNumeri +
                        "}";
                TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                TupleQueryResult result2 = tupleQuery2.evaluate();
                if (result2.hasNext()){
                    //while (result2.hasNext()) {
                    BindingSet bindingSet2 = result2.next();
                    org.openrdf.model.Value valueOfNC = bindingSet2.getValue("nc");
                    org.openrdf.model.Value valueOfEntry = bindingSet2.getValue("entry");
                    via = via.replaceAll("'","''");
                    comune = comune.replaceAll("'","''");
                    i++;
                    try {
                        conMySQL = DriverManager.getConnection(url + db, user, pass);
                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                        st = conMySQL.createStatement();
                        String sqlInsert = "INSERT INTO riconciliazione_test (COD_SER, COMUNE, VIA, NUMERO, COD_CIV, COD_ACC) VALUES " +
                                "('" + servizio + "','" + comune + "', '" + via + "', '" + numero + "', '<" + valueOfNC.toString() + ">', '<" + valueOfEntry.toString() + ">')" +
                                " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_CIV=VALUES(COD_CIV), COD_ACC=VALUES(COD_ACC);";
                        //String sqlInsert2 = "DELETE FROM riconciliazione_servizi_non_trovati WHERE ID = " + id + ";";

                        st.addBatch(sqlInsert);
                        //st.addBatch(sqlInsert2);
                        st.executeBatch();
                        st.close();
                        conMySQL.close();
                    }
                    catch (Exception e) {
                        RICONCILIAZIONE_CONTAINS.append(e.getMessage());
                    }
                }
                else{
                    // ALTRIMENTI SALVO IL COD_TOP IN TABELLA SERVIZI NON TROVATI
                    try {
                        conMySQL = DriverManager.getConnection(url + db, user, pass);
                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                        st = conMySQL.createStatement();
                        String sqlInsert = "UPDATE riconciliazione_servizi_non_trovati SET COD_TOP = '" + COD_TOP + "' WHERE COD_SER = '" + servizio + "'";
                        st.addBatch(sqlInsert);
                        st.executeBatch();
                        st.close();
                        conMySQL.close();
                    }
                    catch (Exception e) {
                        RICONCILIAZIONE_CONTAINS.append(e.getMessage());
                    }
                }
                //	numeroServizi++;
                // out.println("Numero Servizi: " + numeroServizi);
            }//try
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAZIONE_CONTAINS.append(e.getMessage());
                //out.println("<pre><code>" + queryString2 + "<code></pre>");
                //out.println("Numero Servizi: " + numeroServizi);
            }
        }//while
        } catch (SQLException e) {
            RICONCILIAZIONE_CONTAINS.append(e.getMessage());
        }
        return RICONCILIAZIONE_CONTAINS.toString();
    }//riconciliazione_contains

    @Override
    public String riconciliazione_geocode(){
        StringBuilder RICONCILIAZIONE_GEOCODE = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
            String query = "SELECT * FROM `riconciliazione_servizi_non_trovati` WHERE NUMERO <> '0' AND NUMERO <> '' " +
                    "AND NUMERO NOT LIKE '%sn%' AND COD_TOP = '' AND COMUNE IN (SELECT DISTINCT DEN_UFF FROM tbl_elenco_comuni) " +
                    "AND VIA NOT LIKE '%-%' AND COD_SER NOT IN (SELECT DISTINCT COD_SER FROM  `riconciliazione_servizi_ultima_parola` ) " +
                    "AND COD_SER NOT IN (SELECT DISTINCT COD_SER FROM  `riconciliazione_coordinate` ) ORDER BY ID ASC";
            // create the java statement
            st = conMySQL.createStatement();
            // execute the query, and get a java resultset
            rs = st.executeQuery(query);
            // iterate through the java resultset
            while (rs.next()) {
                String comune = rs.getString("COMUNE");
                String via = rs.getString("VIA");
                String numero = rs.getString("NUMERO");
                String COD_SER = rs.getString("COD_SER");

                RICONCILIAZIONE_GEOCODE.append("<tr>\n");
                RICONCILIAZIONE_GEOCODE.append("<td>").append(COD_SER.replace("<", "").replace(">", "")).append("</td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td>").append(comune).append("</td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td>").append(via).append("</td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td>").append(numero).append("</td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td></td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td></td>\n");
                RICONCILIAZIONE_GEOCODE.append("<td></td>\n");
                RICONCILIAZIONE_GEOCODE.append("</tr>\n");
            }
        }catch ( SQLException  e) {
            RICONCILIAZIONE_GEOCODE.append(e.getMessage());
        }
        return RICONCILIAZIONE_GEOCODE.toString();
    } //riconciliazione_geocode

    @Override
    public String riconciliazione_geocode_strada(){
        StringBuilder RICONCILIAZIONE_GEODOCE_STARADA = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        Connection conMySQL2;Statement st2;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        RepositoryConnection con = getSesameRemoteConnection();
        try {
            int i = 0;
            try {
                String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
                        "SELECT distinct  ?ser ?slat ?slong {  " +
                        "?ser rdf:type SiiMobility:Service . " +
                        "?ser geo:lat ?slat . " +
                        "?ser geo:long ?slong . " +
                        "FILTER NOT EXISTS {?ser SiiMobility:isIn ?inRoad} " +
                        "} ";
                //out.println(queryString);
                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                TupleQueryResult result = tupleQuery.evaluate();
                int numeroServizi = 0;
                try {
                    while (result.hasNext()) {
                        BindingSet bindingSet = result.next();

                        String valueOfSer = bindingSet.getValue("ser").toString();
                        String valueOfSLat = bindingSet.getValue("slat").toString();
                        String valueOfSLong = bindingSet.getValue("slong").toString();

                        valueOfSLat = valueOfSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
                        valueOfSLat = valueOfSLat.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
                        valueOfSLat = valueOfSLat.replace("\"", "");

                        valueOfSLong = valueOfSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#float>", "");
                        valueOfSLong = valueOfSLong.replace("\"^^<http://www.w3.org/2001/XMLSchema#decimal>", "");
                        valueOfSLong = valueOfSLong.replace("\"", "");

                        conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
                        String query = "SELECT URI_ACC FROM `riconciliazione_geocode` WHERE `URI_SER` = '" + valueOfSer + "'";
                        // create the java statement
                        st = conMySQL.createStatement();
                        // execute the query, and get a java resultset
                        rs = st.executeQuery(query);
                        // iterate through the java resultset
                        if (rs.next())
                        {
                            String URI_ACC =  rs.getString("URI_ACC");
                            st.close();
                            conMySQL.close();
                        }
                        else{
                            String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                    "PREFIX geo:<http://www.w3.org/2003/01/geo/wgs84_pos#> " +
                                    "	PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                                    "	PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                    "	PREFIX omgeo:<http://www.ontotext.com/owlim/geo#> " +
                                    "	SELECT distinct ?entry ?nc ?road ?com " +
                                    "	WHERE { " +
                                    "	?entry rdf:type SiiMobility:Entry . " +
                                    "	?nc SiiMobility:hasExternalAccess ?entry . " +
                                    "	?nc SiiMobility:belongTo ?road . " +
                                    "	?entry geo:lat ?elat . " +
                                    "	 ?entry geo:long ?elong . " +
                                    "	?road SiiMobility:inMunicipalityOf ?com . " +
                                    "	?entry omgeo:nearby(" + valueOfSLat + " " + valueOfSLong + "  \"0.2km\") . " +
                                    " BIND( omgeo:distance(?elat, ?elong, " + valueOfSLat + ", " + valueOfSLong + ") AS ?distanza)	" +
                                    "	} " +
                                    "ORDER BY ?distanza " +
                                    "LIMIT 1";


                            TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                            TupleQueryResult result2 = tupleQuery2.evaluate();

                            if (result2.hasNext()){
                                BindingSet bindingSet2 = result2.next();
                                String valueOfNC = bindingSet2.getValue("nc").toString();
                                String valueOfEntry = bindingSet2.getValue("entry").toString();
                                String valueOfRoad = bindingSet2.getValue("road").toString();
                                String valueOfCom = bindingSet2.getValue("com").toString();

                                i++;
                                try {
                                    conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                    //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                    st2 = conMySQL2.createStatement();
                                    String sqlInsert2 = "INSERT INTO riconciliazione_geocode (URI_SER, URI_ACC, URI_CIV, URI_ROAD, URI_COM) VALUES " +
                                            "('" + valueOfSer + "','" + valueOfEntry + "', '" + valueOfNC + "', '" + valueOfRoad + "', '" + valueOfCom + "')" +
                                            " ON DUPLICATE KEY UPDATE URI_ACC=VALUES(URI_ACC), URI_CIV=VALUES(URI_CIV), URI_ROAD=VALUES(URI_ROAD), URI_COM=VALUES(URI_COM);";
                                    st2.addBatch(sqlInsert2);
                                    st2.executeBatch();
                                    st2.close();
                                    conMySQL2.close();

                                }
                                catch (Exception e) {
                                    RICONCILIAZIONE_GEODOCE_STARADA.append(e.getMessage()).append("\n");
                                }

                            }
                            else{
                                conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                st2 = conMySQL2.createStatement();
                                String sqlInsert2 = "INSERT INTO riconciliazione_geocode (URI_SER, URI_ACC) VALUES " +
                                        "('" + valueOfSer + "', '')" +
                                        " ON DUPLICATE KEY UPDATE URI_ACC=VALUES(URI_ACC);";
                                st2.addBatch(sqlInsert2);
                                st2.executeBatch();
                                st2.close();
                                conMySQL2.close();
                            }
                            st.close();
                            conMySQL.close();
                        }
                        numeroServizi++;
                    } // fine while
                    RICONCILIAZIONE_GEODOCE_STARADA.append("Numero Servizi: ").append(numeroServizi).append("\n");
                }
                catch (OpenRDFException e) {
                    // handle exception
                    RICONCILIAZIONE_GEODOCE_STARADA.append(e.getMessage()).append("\n");
                    //out.println("<pre><code>" + queryString2 + "<code></pre>");
                    RICONCILIAZIONE_GEODOCE_STARADA.append("Numero Servizi: ").append(numeroServizi).append("\n");
                } catch ( SQLException e) {
                    RICONCILIAZIONE_GEODOCE_STARADA.append(e.getMessage()).append("\n");
                } finally {
                    result.close();
                }
            }
            finally {
                con.close();
            }
            RICONCILIAZIONE_GEODOCE_STARADA.append("Servizi recuperati: ").append(Integer.toString(i)).append("\n");
        }
        catch (OpenRDFException e) {
            // handle exception
            RICONCILIAZIONE_GEODOCE_STARADA.append(e.getMessage()).append("\n");;
        }
        return RICONCILIAZIONE_GEODOCE_STARADA.toString();
    } //riconciliazione_geocode_strada

    @Override
    public String riconciliazione_isin(){
        StringBuilder RICONCILIAZIONE_ISIN = new StringBuilder();
        Connection conMySQL = null;Statement st = null;ResultSet rs = null;
        Connection conMySQL2 = null;Statement st2 = null;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        RepositoryConnection con = getSesameRemoteConnection();
        try {
            int i = 0;
            try {
                String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "SELECT DISTINCT ?ser ?road {" +
                        "?ser rdf:type SiiMobility:Service . " +
                        "?ser SiiMobility:hasAccess ?entry . " +
                        "?nc SiiMobility:hasExternalAccess ?entry . " +
                        "?nc SiiMobility:belongTo ?road . " +
                        "} ";
                //out.println(queryString);
                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                TupleQueryResult result = tupleQuery.evaluate();
                BufferedWriter file = new BufferedWriter(new FileWriter("../resources/grafo/riconciliazione-isin2.n3"));
                try {
                    while (result.hasNext()) {
                        BindingSet bindingSet = result.next();
                        String valueOfSer = bindingSet.getValue("ser").toString();
                        String valueOfRoad = bindingSet.getValue("road").toString();
                        file.write("<" + valueOfSer + "> SiiMobility:isIn <" + valueOfRoad + "> . \n");
                        //file.newLine();
                    } // fine while
                    file.close();
                }
                catch (OpenRDFException e) {
                    // handle exception
                    RICONCILIAZIONE_ISIN.append(e.getMessage()).append("\n");
                    //out.println("<pre><code>" + queryString2 + "<code></pre>");

                }
                finally {
                    result.close();
                }
            } catch (IOException e) {
                RICONCILIAZIONE_ISIN.append(e.getMessage()).append("\n");
            } finally {
                con.close();
            }
            RICONCILIAZIONE_ISIN.append("Servizi recuperati: ").append(Integer.toString(i)).append("\n");
        }
        catch (OpenRDFException e) {
            // handle exception
            RICONCILIAZIONE_ISIN.append(e.getMessage()).append("\n");
        }
        return RICONCILIAZIONE_ISIN.toString();
    } //riconciliazione_isin

    @Override
    public String riconciliazione_last_word(){
        StringBuilder RICONCILIAZIONE_LAST_WORD = new StringBuilder();
        Connection conMySQL = null;Statement st = null;ResultSet rs = null;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";

        RepositoryConnection con = getSesameRemoteConnection();
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
        String query = "SELECT * from riconciliazione_servizi_non_trovati WHERE COD_TOP = '' ORDER BY COMUNE, VIA, NUMERO";
        // create the java statement
        st = conMySQL.createStatement();
        // execute the query, and get a java resultset
        rs = st.executeQuery(query);
        // iterate through the java resultset
        while (rs.next()) {
            String via = rs.getString("VIA");
            String numero = rs.getString("NUMERO");
            String comune = rs.getString("COMUNE");
            String servizio = rs.getString("COD_SER");
            try {
                int i = 0;
                // NUOVA QUERY
                String ultimaParola = via.substring(via.lastIndexOf(" ")+1);
                if (ultimaParola.length() >= 2){
                    // se l'ultima parola pi corta di due lettere
                    String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                            "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                            "SELECT distinct ?strada ?nomeVia WHERE { " +

                            "{ " +
                            "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                            "	?comune foaf:name \"" + comune + "\"^^xsd:string .  " +
                            "	?strada SiiMobility:extendName ?nomeVia .  " +
                            "	FILTER contains(ucase(?nomeVia), \"" + ultimaParola + "\"^^xsd:string) . " +
                            //FILTER contains(lcase(?serviceAddr), lcase(?addr))
                            "} " +
                            "UNION " +
                            "{ " +
                            "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                            "	?comune foaf:name \"" + comune + "\"^^xsd:string .  " +
                            "	?strada dcterms:alternative ?nomeVia .  " +
                            "	FILTER contains(ucase(?nomeVia), \"" + ultimaParola + "\"^^xsd:string) .  " +
                            "} " +
                            "}";
                    TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                    TupleQueryResult result2 = tupleQuery2.evaluate();
                    via = via.replaceAll("'","''");
                    numero = numero.replaceAll("'","''");
                    comune = comune.replaceAll("'","''");
                    if (result2.hasNext()){
                        while (result2.hasNext()) {
                            BindingSet bindingSet2 = result2.next();
                            org.openrdf.model.Value valueOfStrada = bindingSet2.getValue("strada");
                            org.openrdf.model.Value valueOfNomeVia = bindingSet2.getValue("nomeVia");

                            String COD_TOP = valueOfStrada.toString();
                            String NOME_STRADA = valueOfNomeVia.toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");;

                            NOME_STRADA = NOME_STRADA.replaceAll("'","''");
                            NOME_STRADA = NOME_STRADA.toUpperCase();
                            NOME_STRADA = NOME_STRADA.replace("^^XSD:STRING", "");
                            NOME_STRADA = NOME_STRADA.replace("\"", "");
                            try (Connection conMySQL2 = DriverManager.getConnection(url + db, user, pass)) {
                                //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                Statement st2 = conMySQL2.createStatement();
                                String sqlInsert = "INSERT INTO riconciliazione_servizi_ultima_parola (COD_SER, COMUNE, VIA, NUMERO, COD_TOP, NOME_STRADA) VALUES " +
                                        "('" + servizio + "','" + comune + "', '" + via + "', '" + numero + "', '" + COD_TOP + "', '" + NOME_STRADA + "')" +
                                        " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), NOME_STRADA=VALUES(NOME_STRADA);";
                                st2.addBatch(sqlInsert);
                                st2.executeBatch();
                                st2.close();
                                conMySQL2.close();

                            } catch (Exception e) {
                                RICONCILIAZIONE_LAST_WORD.append(e.getMessage()).append("\n");
                            }
                        }
                    }
                }
                //	numeroServizi++;
                // out.println("Numero Servizi: " + numeroServizi);
            }
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAZIONE_LAST_WORD.append(e.getMessage()).append("\n");
                //out.println("<pre><code>" + queryString2 + "<code></pre>");
                //out.println("Numero Servizi: " + numeroServizi);
            }
        }
        } catch (SQLException  e) {
            RICONCILIAZIONE_LAST_WORD.append(e.getMessage()).append("\n");
        }
        return RICONCILIAZIONE_LAST_WORD.toString();
    } //riconciliazione_last_word

    @Override
    public String riconciliazione_senza_virgola(){
        StringBuilder RICONCILIAIZONE_SENZA_VIRGOLA = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;

        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        RepositoryConnection con = getSesameRemoteConnection();
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap,dbServiceMap, userServiceMap, passServiceMap);
        String query = "SELECT * from backupriconciliazione_servizi_non_trovati WHERE SUBSTRING_INDEX(`VIA`,' ',-1) REGEXP '[0-9]+' AND NUMERO = ''";
        // create the java statement
        st = conMySQL.createStatement();
        // execute the query, and get a java resultset
        rs = st.executeQuery(query);
        // iterate through the java resultset
        while (rs.next()) {
            String indirizzo = rs.getString("VIA");
            String comune = rs.getString("COMUNE");
            String servizio = rs.getString("COD_SER");
            String numero = indirizzo.substring(indirizzo.lastIndexOf(" ")+1);
            String via = indirizzo.replace(" " + numero, "");
            try {
                int i = 0;
                // NUOVA QUERY
                String filtroColore = "{?nc SiiMobility:classCode \"Nero\"^^xsd:string . } " +
                        "UNION {?nc SiiMobility:classCode \"Privo colore\"^^xsd:string . } ";

                String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                        "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                        "SELECT distinct ?nc ?entry WHERE { " +

                        "{ " +
                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                        "	?comune foaf:name \"" + comune + "\"^^xsd:string .  " +
                        "	?strada SiiMobility:extendName ?nomeVia .  " +
                        "	FILTER (ucase(?nomeVia) = \"" + via + "\"^^xsd:string) . " +
                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                        "	?nc SiiMobility:extendNumber \"" + numero + "\"^^xsd:string .  " +
                        filtroColore +
                        "} " +
                        "UNION " +
                        "{ " +
                        "	?strada SiiMobility:inMunicipalityOf ?comune .  " +
                        "	?comune foaf:name \"" + comune + "\"^^xsd:string .  " +
                        "	?strada dcterms:alternative ?nomeAlternativo .  " +
                        "	FILTER (ucase(?nomeAlternativo) = \"" + via + "\"^^xsd:string) .  " +
                        "	?strada SiiMobility:hasStreetNumber ?nc .  " +
                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                        "	?nc SiiMobility:extendNumber \"" + numero + "\"^^xsd:string .  " +
                        filtroColore +
                        "} " +
                        "}";

                TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                TupleQueryResult result2 = tupleQuery2.evaluate();

                if (result2.hasNext()){
                    while (result2.hasNext()) {
                        BindingSet bindingSet2 = result2.next();
                        org.openrdf.model.Value valueOfNC = bindingSet2.getValue("nc");
                        org.openrdf.model.Value valueOfEntry = bindingSet2.getValue("entry");
                        String numeroCivico = numero;
                        numeroCivico = numeroCivico.replace("\"", "");
                        numeroCivico = numeroCivico.replaceAll("'","''");
                        via = via.replaceAll("'","''");
                        comune = comune.replaceAll("'","''");
                        i++;
                        try {
                            conMySQL = DriverManager.getConnection(url + db, user, pass);
                            //conMySQL.setAutoCommit(false);// Disables auto-commit.
                            st = conMySQL.createStatement();
                            String sqlInsert = "INSERT INTO riconciliazione_test (COD_SER, COMUNE, VIA, NUMERO, COD_CIV, COD_ACC) VALUES " +
                                    "('<" + servizio + ">','" + comune + "', '" + via + "', '" + numeroCivico + "', '<" + valueOfNC.toString() + ">', '<" + valueOfEntry.toString() + ">')" +
                                    " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_CIV=VALUES(COD_CIV), COD_ACC=VALUES(COD_ACC);";
                            st.addBatch(sqlInsert);
                            st.executeBatch();
                            st.close();
                            conMySQL.close();

                        }
                        catch (Exception e) {
                            RICONCILIAIZONE_SENZA_VIRGOLA.append(e.getMessage()).append("\n");
                        }
                    }
                }
                else{

                    // SE NON TROVO IL CIVICO ALMENO CERCO LA STRADA

                    String queryString3 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                            "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                            "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                            "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                            "SELECT distinct ?strada WHERE { " +
                            "{ " +

                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                            "?comune foaf:name \"" + comune + "\"^^xsd:string . " +
                            "?strada SiiMobility:extendName ?nomeVia . " +
                            "FILTER (ucase(?nomeVia) = \"" + via + "\"^^xsd:string) . " +

                            "} UNION { " +

                            "?strada SiiMobility:inMunicipalityOf ?comune . " +
                            "?comune foaf:name \"" + comune + "\"^^xsd:string . " +
                            "?strada dcterms:alternative ?nomeAlternativo . " +
                            "FILTER (ucase(?nomeAlternativo) = \"" + via + "\"^^xsd:string) . " +
                            "}" +
                            "}";

                    TupleQuery tupleQuery3 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString3);
                    TupleQueryResult result3 = tupleQuery3.evaluate();
                    String valueOfStrada = "";
                    if (result3.hasNext()){
                        while (result3.hasNext()) {
                            BindingSet bindingSet3 = result3.next();
                            valueOfStrada = bindingSet3.getValue("strada").toString();
                        }
                    }

                    String numeroCivico = numero;
                    numeroCivico = numeroCivico.replace("\"", "");
                    numeroCivico = numeroCivico.replaceAll("'","''");
                    via = via.replaceAll("'","''");
                    comune = comune.replaceAll("'","''");

                    try {
                        conMySQL = DriverManager.getConnection(url + db, user, pass);
                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                        st = conMySQL.createStatement();
                        String sqlInsert = "INSERT INTO riconciliazione_servizi_non_trovati (COD_SER, COMUNE, VIA, NUMERO, COD_TOP) VALUES " +
                                "('<" + servizio + ">','" + comune + "', '" + via + "', '" + numeroCivico + "', '" + valueOfStrada + "')" +
                                " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_TOP=VALUES(COD_TOP);";
                        st.addBatch(sqlInsert);
                        st.executeBatch();
                        st.close();
                        conMySQL.close();
                    }
                    catch (Exception e) {
                        RICONCILIAIZONE_SENZA_VIRGOLA.append(e.getMessage()).append("\n");
                    }
                }
                //	numeroServizi++;
                // out.println("Numero Servizi: " + numeroServizi);
            }
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAIZONE_SENZA_VIRGOLA.append(e.getMessage()).append("\n");
                //out.println("<pre><code>" + queryString2 + "<code></pre>");
                //out.println("Numero Servizi: " + numeroServizi);
            }
        }
        } catch (SQLException  e) {
            RICONCILIAIZONE_SENZA_VIRGOLA.append(e.getMessage()).append("\n");;
        }
        return RICONCILIAIZONE_SENZA_VIRGOLA.toString();
    } //riconciliazione_senza_virgola

    @Override
    public String riconciliazione_strade(){
        StringBuilder RICONCILIAZIONE_STRADE = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;
        Connection conMySQL2 ;Statement st2;ResultSet rs2 = null;
        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";
        int sumcount = 0;
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);
        String query = "select * from riconciliazione_strade";
        st = conMySQL.createStatement();
        rs = st.executeQuery(query);
        while (rs.next()) {
            for (int i = 2; i <= 7; i++){
                if (!(rs.getString(i).equals("") || rs.getString(i).equals("A") || rs.getString(i).equals("E") || rs.getString(i).equals("I") ||
                        rs.getString(i).equals("O") || rs.getString(i).equals("U") || rs.getString(i).equals("V") || rs.getString(i).equals("S") ||
                        rs.getString(i).equals(" "))){
                    String daSostituire = rs.getString(i);
                    for (int j = 2; j <= 7; j++){
                        if (!(j == i)){
                            if (!(rs.getString(j).equals(""))){
                                String sostituisciCon = rs.getString(j);
                                RepositoryConnection con = getSesameRemoteConnection();
                                String queryString = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " +
                                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                        "SELECT DISTINCT ?roadURI ?nomeStrada " +
                                        "WHERE { " +
                                        "?roadURI rdf:type SiiMobility:Road . " +
                                        "?roadURI SiiMobility:extendName ?nomeStrada .  " +
                                        //"?roadURI dcterms:alternative ?nomeAlternative .  " +
                                        "FILTER " + rs.getString(8) + "(ucase(?nomeStrada), \"" + daSostituire + "\"^^xsd:string ) . " +
                                        //"UNION {FILTER " + rs.getString(8) + "(ucase(?nomeAlternativo), \"" + daSostituire + "\"^^xsd:string ) . }" +
                                        "}";
                                TupleQuery tupleQuery = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString);
                                TupleQueryResult result = tupleQuery.evaluate();
                                try{
                                    while (result.hasNext()) {
                                        try{
                                            BindingSet bindingSet = result.next();
                                            String valueOfRoadUri = bindingSet.getValue("roadURI").toString();
                                            String valueOfNomeStrada = bindingSet.getValue("nomeStrada").toString().replace("<http://www.w3.org/2001/XMLSchema#string>", "xsd:string");
                                            String nuovoNomeStrada = valueOfNomeStrada.replace(daSostituire, sostituisciCon);
                                            // PRIMA CERCO NEL REPO -> SE LA TRIPLA C'E' GIA' NON LA RIGENERO
                                            String queryStringFind = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                                                    "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>  " +
                                                    " PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                                                    "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                                                    "ASK  {  " +
                                                    " <" + valueOfRoadUri + "> rdf:type SiiMobility:Road .  " +
                                                    "{  " +
                                                    " <" + valueOfRoadUri + "> SiiMobility:extendName " + nuovoNomeStrada + " . " +
                                                    " } " +
                                                    "UNION " +
                                                    " { " +
                                                    " <" + valueOfRoadUri + "> dcterms:alternative " + nuovoNomeStrada + " . " +
                                                    " } " +
                                                    " }";
                                            BooleanQuery booleanQuery = con.prepareBooleanQuery(QueryLanguage.SPARQL, queryStringFind);
                                            boolean truth = booleanQuery.evaluate();
                                            if (!truth){
                                                nuovoNomeStrada = nuovoNomeStrada.replaceAll("'","''");
                                                valueOfNomeStrada = valueOfNomeStrada.replaceAll("'","''");
                                                try {
                                                    conMySQL2 = DriverManager.getConnection(url + db, user, pass);
                                                    //conMySQL.setAutoCommit(false);// Disables auto-commit.
                                                    st2 = conMySQL2.createStatement();
                                                    String sqlInsert = "INSERT INTO riconciliazione_strade_nuovetriple (Soggetto, Oggetto, NOME_ORIGINALE) VALUES " +
                                                            "('<" + valueOfRoadUri + ">','" + nuovoNomeStrada + "', '" + valueOfNomeStrada + "') " +
                                                            "ON DUPLICATE KEY UPDATE Soggetto=VALUES(Soggetto), Oggetto=VALUES(Oggetto), NOME_ORIGINALE=VALUES(NOME_ORIGINALE);";
                                                    st2.addBatch(sqlInsert);
                                                    st2.executeBatch();
                                                    st2.close();
                                                    conMySQL2.close();
                                                }
                                                catch (Exception e) {
                                                    RICONCILIAZIONE_STRADE.append(e.getMessage()).append("\n");
                                                }
                                            }
                                        } // end try dentro ???
                                        catch (OpenRDFException e) {
                                            // handle exception
                                            RICONCILIAZIONE_STRADE.append(e.getMessage()).append("\n");
                                        }
                                    } // end while ??
                                }
                                catch (OpenRDFException e) {
                                    // handle exception
                                    RICONCILIAZIONE_STRADE.append(result.getBindingNames()).append("\n");
                                    RICONCILIAZIONE_STRADE.append(e.getMessage()).append("\n");
                                }
                            }
                        }
                    }
                }
            }
        }
        } catch (SQLException | RepositoryException | MalformedQueryException | QueryEvaluationException e) {
            RICONCILIAZIONE_STRADE.append(e.getMessage()).append("\n");
        }
        return RICONCILIAZIONE_STRADE.toString();
    } //riconciliazione_strade

    @Override
    public String riconciliazione_trattino(){
        StringBuilder RICONCILIAZIONE_TRATTINO = new StringBuilder();
        Connection conMySQL;Statement st;ResultSet rs;

        sesameServer = "http://192.168.0.205:8080/openrdf-sesame/";
        repositoryID = "siimobilityultimate";

        RepositoryConnection con = null;
        try {
            conMySQL = SQLUtilities.getMySqlConnection(urlServiceMap, dbServiceMap, userServiceMap, passServiceMap);

        String query = "SELECT * FROM `riconciliazione_servizi_non_trovati` WHERE `NUMERO` LIKE '%-%' AND COD_TOP <> '' ORDER BY COMUNE, VIA, NUMERO";
        // create the java statement
        st = conMySQL.createStatement();
        // execute the query, and get a java resultset
        rs = st.executeQuery(query);
        // iterate through the java resultset
        while (rs.next())
        {
            String id =  rs.getString("ID");
            String comune = rs.getString("COMUNE");
            String via = rs.getString("VIA");
            String numero = rs.getString("NUMERO");
            String servizio = rs.getString("COD_SER");
            String COD_TOP = "<" + rs.getString("COD_TOP") + ">";
            String[] arrayNumeri = numero.split("-");
            try {
                int i = 0;
                con = getSesameRemoteConnection();
                // NUOVA QUERY
                String filtroNumeri = "";
                for (int j = 0; j < arrayNumeri.length; j++){
                    if (j == 0){
                        filtroNumeri = filtroNumeri + "{ ?nc SiiMobility:extendNumber \"" + arrayNumeri[j] + "\"^^xsd:string . }";
                    }
                    else{
                        filtroNumeri = filtroNumeri + " UNION { ?nc SiiMobility:extendNumber \"" + arrayNumeri[j] + "\"^^xsd:string . }";
                    }
                }
                String queryString2 = "PREFIX SiiMobility:<http://www.disit.dinfo.unifi.it/SiiMobility#> " +
                        "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#> " +
                        "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                        "PREFIX vcard:<http://www.w3.org/2006/vcard/ns#> " +
                        "PREFIX foaf:<http://xmlns.com/foaf/0.1/> " +
                        "PREFIX dcterms:<http://purl.org/dc/terms/> " +
                        "SELECT distinct ?nc ?entry WHERE { " +
                        "	" + COD_TOP + " SiiMobility:hasStreetNumber ?nc .  " +
                        "	?nc SiiMobility:hasExternalAccess ?entry .  " +
                        filtroNumeri +
                        "}";
                TupleQuery tupleQuery2 = con.prepareTupleQuery(QueryLanguage.SPARQL, queryString2);
                TupleQueryResult result2 = tupleQuery2.evaluate();
                if (result2.hasNext()){
                    //while (result2.hasNext()) {
                    BindingSet bindingSet2 = result2.next();
                    org.openrdf.model.Value valueOfNC = bindingSet2.getValue("nc");
                    org.openrdf.model.Value valueOfEntry = bindingSet2.getValue("entry");
                    via = via.replaceAll("'","''");
                    comune = comune.replaceAll("'","''");
                    try {
                        conMySQL = DriverManager.getConnection(url + db, user, pass);
                        //conMySQL.setAutoCommit(false);// Disables auto-commit.
                        st = conMySQL.createStatement();
                        String sqlInsert = "INSERT INTO riconciliazione_test (COD_SER, COMUNE, VIA, NUMERO, COD_CIV, COD_ACC) VALUES " +
                                "('" + servizio + "','" + comune + "', '" + via + "', '" + numero + "', '<" + valueOfNC.toString() + ">', '<" + valueOfEntry.toString() + ">')" +
                                " ON DUPLICATE KEY UPDATE COMUNE=VALUES(COMUNE), VIA=VALUES(VIA), NUMERO=VALUES(NUMERO), COD_CIV=VALUES(COD_CIV), COD_ACC=VALUES(COD_ACC);";
                        String sqlInsert2 = "DELETE FROM riconciliazione_servizi_non_trovati WHERE ID = " + id + ";";

                        st.addBatch(sqlInsert);
                        st.addBatch(sqlInsert2);
                        st.executeBatch();
                        st.close();
                        conMySQL.close();

                    }
                    catch (Exception e) {
                        RICONCILIAZIONE_TRATTINO.append(e.getMessage()).append("\n");
                    }
                }
                //	numeroServizi++;
                // out.println("Numero Servizi: " + numeroServizi);
            }
            catch (OpenRDFException e) {
                // handle exception
                RICONCILIAZIONE_TRATTINO.append(e.getMessage()).append("\n");
                //out.println("<pre><code>" + queryString2 + "<code></pre>");
                //out.println("Numero Servizi: " + numeroServizi);
            }
        }
        } catch ( SQLException  e) {
            RICONCILIAZIONE_TRATTINO.append(e.getMessage()).append("\n");
        }
        return RICONCILIAZIONE_TRATTINO.toString();
    }
}
