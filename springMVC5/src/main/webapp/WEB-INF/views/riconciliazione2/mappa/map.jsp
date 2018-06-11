<%--
  Created by IntelliJ IDEA.
  User: 4535992
  Date: 11/06/2015
  Time: 08.15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
  <!--  header HTML -->
  <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
  <title>Mapservice</title>

  <!-- IMPORTAZIONE FOGLI DI STILE -->
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/leaflet-gps.css" type="text/css" />
  <%--<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.css" />--%>
  <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.css" />
  <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" />
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/leaflet.awesome-markers.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" type="text/css" />

  <!-- IMPORTAZIONE SCRIPT E LIBRERIE JAVASCRIPT -->
  <%--<script src="http://cdn.leafletjs.com/leaflet-0.7.2/leaflet.js"></script>--%>
  <script src="http://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.3/leaflet.js"></script>
  <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
  <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
  <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
  <script src="${pageContext.request.contextPath}/resources/leaflet/plugin/awesome-markers/leaflet.awesome-markers.min.js"></script>
  <script src="${pageContext.request.contextPath}/resources/leaflet/plugin/gps/leaflet-gps.js"></script>
</head>
<body>
  <!-- DIV PRINCIPALE CONTENENTE LA MAPPA INTERATTIVA -->
  <div id="map"></div>


  <!-- PULSANTI IN ALTO A SINISTRA (HELP E SELEZIONE PUNTO MAPPA) -->
  <div class="menu" id="help">
    <a href="http://www.disit.org/servicemap" title="Aiuto Service Map" target="_blank"><img src="${pageContext.request.contextPath}/resources/img/help.png" alt="help SiiMobility ServiceMap" width="26" /></a>
  </div>
  <div class="menu" id="info">
    <img src="${pageContext.request.contextPath}/resources/img/info.png" alt="Seleziona un punto della mappa" width="26" />
  </div>


  <!-- DIV CONTENENTE IL MENU IN ALTO A SINISTRA -->
  <div id="menu-alto" class="menu">
    <div class="header"><span>- Nascondi Menu</span>
    </div>
    <div class="content">
      <div id="tabs">
        <ul>
          <!-- ELENCO DELLE DUE TAB JQUERY UI -->
          <li><a href="#tabs-1">Ricerca Web-Geolocalizzazione</a></li>
          <li><a href="#tabs-2">Ricerca Servizi in Toscana</a></li>
        </ul>
        <div id="tabs-1">
          <div class="use-case-1">
            <!-- 					Seleziona una linea: -->
            <!-- 					<br/> -->
            <!-- 					<select id="elencolinee" name="elencolinee" onchange="mostraElencoFermate(this);"> -->
            <!-- 						<option value=""> - Seleziona un protocollo - </option> -->
            <!-- 						<option value="all">TUTTE LE LINEE</option> -->
            <!-- 						 option value="LINE4">Linea 4</option> -->
            <!-- 						<option value="HTTP">HTTP</option>						 -->
            <!-- 						<option value="FTP">FTP</option> -->
            <!-- 						<option value="TELNET">TELNET</option> -->
            <!-- 					</select> -->
            <!-- 					<br /> -->
            Inserisci un URL:
            <br/>
              <%--<input id="searchurl" name="searchurl" onchange="mostraFermate(this);"/>--%>
            <!-- 					<select id="elencofermate" name="elencofermate" onchange="mostraFermate(this);"> -->
            <!-- 						<option value=""> - Seleziona una Fermata - </option> -->

            <!-- 					</select> -->

              <%--<form:form action="result" method="post" modelAttribute="url">
                  <form:label path="searchurl">Address Web:</form:label>
                  <form:input path="searchurl2" />
              </form:form>--%>

           <%-- <form:form action="result" method="post" commandName="siteForm">
                <table border="0">
                    <tr>
                        <td colspan="2" align="center"></td>
                    </tr>
                    <tr>
                    <td>URL</td>
                        <td><form:input path="url" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" align="center"><input type="submit" value="Search" /></td>
                    </tr>
                </table>
            </form:form>--%>
            <c:url var="url" value="/map" />
            <form:form action="${url}" method="post" >
              <p><input type="text" name="urlParam" value="" /><input type="submit" value="urlForm" /></p>
            </form:form>
          </div>
        </div>
        <div id="tabs-2">
          <div class="use-case-2">
            Seleziona una provincia:
            <br/>
            <select id="elencoprovince" name="elencoprovince" onchange="mostraElencoComuni(this);">
              <option value=""> - Seleziona una Provincia - </option>
              <option value="all">TUTTE LE PROVINCE</option>
              <option value="AREZZO">AREZZO</option>
              <option value="FIRENZE">FIRENZE</option>
              <option value="GROSSETO">GROSSETO</option>
              <option value="LIVORNO">LIVORNO</option>
              <option value="LUCCA">LUCCA</option>
              <option value="MASSA-CARRARA">MASSA-CARRARA</option>
              <option value="PISA">PISA</option>
              <option value="PISTOIA">PISTOIA</option>
              <option value="PRATO">PRATO</option>
              <option value="SIENA">SIENA</option>
            </select>
            <br />
            Seleziona un comune:
            <br/>
            <select id="elencocomuni" name="elencocomuni" onchange="mostraComune(this);">
              <option value=""> - Seleziona un Comune - </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- MENU DI RICERCA SERVIZI A DESTRA -->
  <div id="menu-dx" class="menu">
    <div class="header">
      <span>- Nascondi Menu</span>
    </div>
    <div class="content">
      Selezione Attuale:
      <br />
      <span id="selezione">Nessun punto selezionato</span>
      <h3>Cerca Attività</h3>

      Tipo Servizio:
      <br />

      <input type="checkbox" name="macro-select-all" id="macro-select-all" value="Select All" /> <span>De/Seleziona tutto</span>
      <div id="categorie">
      <!-- CODE CONNECTION MYSQL-->
          ${HTML}
      <!-- END OF THE CONNECTION -->
        <br />
     <!-- <input type="checkbox" name="near-bus-stops" value="NearBusStops" class="macrocategory" /> <span class="near-bus-stops macrocategory-label">Fermate Autobus</span> -->
      </div>
      <hr />
      Raggio di Ricerca:
      <br />
      <select id="raggioricerca" name="raggioricerca">
        <option value="100">Entro 100 metri</option>
        <option value="200">Entro 200 metri</option>
        <option value="300">Entro 300 metri</option>
        <option value="500">Entro 500 metri</option>
      </select>
      <br />
      Numero massimo di risultati:
      <br />
      <select id="numerorisultati" name="numerorisultati">
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="500">500</option>
        <option value="0">Nessun Limite</option>
      </select>
      <br />
      <hr />
      <input type="button" value="Cerca!" id="pulsante-ricerca" onclick="ricercaServizi();" />
      <input type="button" value="Pulisci" id="pulsante-reset" onclick="resetTotale();" />
      <br />
    </div>
  </div>


  <!-- DIV DEL MENU CONTESTUALE IN BASSO A SINISTRA -->
  <div id="info-aggiuntive" class="menu">
    <div class="header">
      <span>- Nascondi Menu</span>
    </div>
    <div class="content">
    </div>
  </div>

  <!-- DIV SOVRASTANTE DI CARICAMENTO -->
  <div id="loading">
    <div id="messaggio-loading">
      <img src="${pageContext.request.contextPath}/resources/img/ajax-loader.gif" width="32" />
      <h3>Caricamento in corso</h3>
      Il caricamento può richiedere del tempo
    </div>
  </div>

  <!--  CARICAMENTO DEL FILE utility.js CON FUNZIONI NECESSARIE  -->
  <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js_utility/utility.js"></script>

  <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js_utility/utility_support.js"></script>



</body>
</html>
