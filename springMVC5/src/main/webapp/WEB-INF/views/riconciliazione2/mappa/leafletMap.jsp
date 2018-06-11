
<%--
  Created by IntelliJ IDEA.
  User: Marco
  Date: 15/06/2015
  Time: 14.11
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>

    <!-- PLUGIN LEAFLET CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/awesome-markers/leaflet.awesome-markers.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/coordinates/Leaflet.Coordinates-0.1.4.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/gps/leaflet-gps.css"/>
    <%--<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.css" />--%>
    <%--<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/0.4.0/MarkerCluster.Default.css" />--%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/MarkerCluster.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/MarkerCluster.Default.css" />

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/label/leaflet.label.css"/>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.css"/>

    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/leaflet-0.7.3.css" />
    <!--[if lte IE 8]><link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.ie.css" /><![endif]-->

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.css"/>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/Control.Geocoder.css"/>

    <!-- Leaflet JS -->
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/leaflet-0.7.3.js"></script>
    <!--[if lte IE 8]><link rel="stylesheet" href="http://leaflet.cloudmade.com/dist/leaflet.ie.css" /><![endif]-->

    <!-- SUPPPORT CSS LIBRARY -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/jquery/jquery-ui1.10.04.css" />
    <%--<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">--%>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/bootstrap/css/bootstrap.css"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">


    <!-- OTHER CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css"/>

    <!-- SUPPORT JQUERY,Boostrap LIBRARY -->
    <%--
    <script href='http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'></script>
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery.csv-0.71.js"></script>
    <script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min.js"></script>
    --%>

    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery2.1.4.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery-1.10.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery-migrate-1.2.1.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery-ui1.10.4.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/jquery.csv-0.71.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/jquery/bootstrap2.3.2.min.js"></script>

    <%-- Script Javascript leaflet plugin --%>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/awesome-markers/leaflet.awesome-markers.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/gps/leaflet-gps.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/coordinates/Leaflet.Coordinates-0.1.4.min.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/leaflet.markercluster.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/leaflet.filelayer.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/papaparse.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/togeojson.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/GPX.js"></script>
    <%-- OPTIONAL --%>
    <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/stamen-base-maps/tile.stamenv1.3.0.js"></script>--%>
    <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/leaflet-locatecontrol-gh-pages/L.Control.Locate.js"></script>--%>
    <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/geoSearch/js/l.control.geosearch.js"></script>--%>
    <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/geoSearch/js/l.geosearch.provider.google.js"></script>--%>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/label/leaflet.label-src.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/geocsv/leaflet.geocsv-src.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/Control.Geocoder.js"></script>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/control.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/index.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/util.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/bing.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/google.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/mapbox.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/mapquest.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/mapzen.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/nominatim.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/photon.js"></script>--%>
   <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/src/geocoders/what3words.js"></script>--%>

    <!-- GTFS SUPPORT-->
    <%--<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/d3.v3.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/gtfsParser.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/inflate.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/main.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/tile.stamen.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/gtfsViewer/zip.js"></script>--%>

    <!-- JAVASCRIPT WORK WITH FORM -->
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/leaflet_buildMap_support.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/file/utility_file.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/utility_leaflet_csv.js"></script>

  <title></title>
</head>
<body>
    <div id="searchMarkerWithJavascript" ></div>
    <div id="map" class="leaflet-container leaflet-fade-anim" tabindex="0"></div>
    <script>
        leaflet_buildMap_support.initMap();
    </script>
    <%--<div id="caricamento">Caricamento...</div>--%>

    <div id="geocode-selector"></div>


<!-- PULSANTI IN ALTO A SINISTRA (HELP E SELEZIONE PUNTO MAPPA) -->
<%--<div class="menu" id="help">
    <a href="http://www.disit.org/servicemap" title="Aiuto Service Map" target="_blank"><img src="${pageContext.request.contextPath}/resources/img/help.png" alt="help SiiMobility ServiceMap" width="26" /></a>
</div>--%>
<div class="menu" id="info">
    <img src="${pageContext.request.contextPath}/resources/img/info.png" alt="Seleziona un punto della mappa" width="32" />
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
                <li><a href="#tabs-3">Ricerca Web-GeoLocalizzazione 2</a></li>
                <li><a href="#tabs-4">Ricerca Markers</a></li>
                <li><a href="#tabs-5">Load File</a></li>
            </ul>
            <div id="tabs-1">
                <div class="use-case-1">
                    Seleziona una linea:
                    <br/>
                    <select id="elencolinee" name="elencolinee" onchange="mostraElencoFermate(this);" title="elencolinee">
                        <option value=""> - Seleziona una Linea - </option>
                        <option value="all">TUTTE LE LINEE</option>
                        <option value="LINE4">Linea 4</option>
                        <option value="LINE6">Linea 6</option>
                        <option value="LINE17">Linea 17</option>
                        <option value="LINE23">Linea 23</option>
                        <option value="LINE23">Linea 31</option>
                    </select>
                    <br />
                    Seleziona una fermata:
                    <br/>
                    <select id="elencofermate" name="elencofermate" onchange="mostraFermate(this);" title="elencofermate">
                        <option value=""> - Seleziona una Fermata - </option>
                    </select>
                </div>
            </div>
            <div id="tabs-2">
                <div class="use-case-2">
                    Seleziona una provincia:
                    <br/>
                    <select id="elencoprovince" name="elencoprovince" onchange="mostraElencoComuni(this);" title="elencoprovince">
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
                    <br />Seleziona un comune:<br/>
                    <select id="elencocomuni" name="elencocomuni" onchange="mostraComune(this);" title="elencocomuni">
                        <option value=""> - Seleziona un Comune - </option>
                    </select>
                    <br />
                </div>
            </div>
            <div id="tabs-3">
                <div class="use-case-3">
                    <c:if test="${(not empty arrayMarker)}" >
                        <input id="arrayMarkerForm" name="arrayMarkerParam" type="hidden" value="<c:out value="${arrayMarker}" />"/>
                        <p>LENGTH OF MARKERS: ${arrayMarker.size()}</p>
                        <c:forEach items="${arrayMarker}" var="idMarker">
                            <p id="marker">
                                <input id="nameForm" name="nameParam" type="hidden" value="<c:out value="${idMarker.name}" />"/>
                                <input id="urlForm" name="urlParam" type="hidden" value="<c:out  value="${idMarker.url}" />"/>
                                <input id="latForm" name="latParam" type="hidden" value="<c:out  value="${idMarker.latitude}" />"/>
                                <input id="lngForm" name="lngParam" type="hidden" value="<c:out  value="${idMarker.longitude}" />"/>
                                <input id="regionForm" name="regionParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.region}" />"/>
                                <input id="provinceForm" name="provinceParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.province}" />"/>
                                <input id="cityForm" name="cityParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.city}" />"/>
                                <input id="addressForm" name="addressParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.address}" />"/>
                                <input id="phoneForm" name="phoneParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.phone}" />"/>
                                <input id="emailForm" name="emailParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.email}" />"/>
                                <input id="faxForm" name="faxParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.fax}" />"/>
                                <input id="ivaForm" name="ivaParam" type="hidden" value="<c:out  value="${idMarker.markerInfo.iva}" />"/>
                            </p>
                            <script>
                                //leaflet_buildMap_support.initMap();
                                //alert("try to push a marker");
                                leaflet_buildMap_support.pushMarkerToArrayMarker(
                                        "${idMarker.name}","${idMarker.url}","${idMarker.latitude}","${idMarker.longitude}",
                                        "${idMarker.markerInfo.region}","${idMarker.markerInfo.province}","${idMarker.markerInfo.city}",
                                        "${idMarker.markerInfo.address}","${idMarker.markerInfo.phone}","${idMarker.markerInfo.email}",
                                        "${idMarker.markerInfo.fax}","${idMarker.markerInfo.iva}");
                            </script>
                        </c:forEach>
                    </c:if>
                    TrackMyURL:
                    <c:url var="url" value="/map3" />
                    <form:form action="${url}" method="post" >
                        <input type="text" name="urlParam" value=""  title="urlParam"/>
                        <input type="submit" name="urlFormParam" value="urlForm" />
                    </form:form>
                    <c:if test="${(not empty marker)}" >
                        <ul>
                            <li>Name:<c:out value="${marker.name}"/></li>
                            <li>URL:<c:out value="${marker.url}"/></li>
                            <li>LAT:<c:out value="${marker.latitude}"/></li>
                            <li>LNG:<c:out value="${marker.longitude}"/></li>
                        </ul>
                    </c:if>

                    <c:url var="url2" value="/map4" />
                    <form:form action="${url2}" method="post" onSubmit="getMarkers();">
                        <div id="loadMarker">
                                <%--<input type="button" value="Get Markers" id="getMarkers"  />--%>
                            <input type="submit" name="GetMarkersParam" value="getMarkers" />
                        </div>
                    </form:form>
                </div>
            </div>
            <div id="tabs-4">
                <div class="use-case-4">
                    <table class="w3-table-all" style="width:100%">
                        <tbody>
                        <tr>
                            <td>
                                <label>Search Marker:</label>
                                <form class="form-search" onSubmit="addCsvMarkers(); return false;">
                                    <input type="text" id="filter-string" class="input-medium search-query search-box" autocomplete="off" title="filter-string">
                                    <button type="submit" class="btn search-box"></button>
                                </form>
                            </td>
                        </tr>
                        <%--<div id="filter-container">
                            <form class="form-search" class="noSelect" onSubmit="addCsvMarkers(); return false;">
                                <a href="#" id="clear" class="leaflet-popup-close-button">&#215;</a>
                                <div class="input-append">
                                    <input type="text" id="filter-string" class="input-medium search-query search-box" autocomplete="off">
                                    <button type="submit" class="btn search-box"><i class="icon-search"></i></button>
                                    <!-- <span class="add-on">
                                    </span> -->
                                </div>
                            </form>
                        </div>--%>
                        <%--<tr>
                            <td>
                                <label>Search Address wit Leaflet GeoSearch:</label>
                                <div id="search-address-with-google"></div>
                            </td>
                        </tr>--%>
                        <tr>
                            <td>
                                <label>Search Marker 2 with Leaflet Search plugin + container:</label>
                                <div id="searchMarkerWithJavascript2" ></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Search Marker 3 with Leaflet GeoCoder plugin + container:</label>
                                <div id="searchMarkerWithJavascript3" ></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Search Marker 4 with Leaflet Search plugin + method:</label>
                                <div id="formsearch">
                                    <label for="textsearch"></label><input id="textsearch" type="text" value="">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Search Marker 5 with Leaflet geoCoder Plugin Nominatin:</label>
                                <div id="search">
                                    <label for="addr"></label><input type="text" name="addr" value="" id="addr" size="10" />
                                    <button type="button" onclick="addr_search_nominatin();">Search</button>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="tabs-5">
               <div class="use-case-5">
                   <%--UPLOAD a CSV File.
                    <br />Set Field Separator CSV file (default "|"):<input id="fieldSeparator" type="text" name="fieldSeparatorCSVParam" value="" maxlength="1" size="1"/>
                    <br />Set Line Separator CSV file (default "\n"):<input id="lineSeparator" type="text" name="lineSeparatorCSVParam" value="" maxlength="1" size="1"/>
                    <br />Choose CSV file:<input type="file" id="uploader" name="files[]" multiple accept="text/csv">--%>
                   <%--<div id="buttonLocalize2">
                       <button id="localizeName2" class="buttonLocalizeName2">Cercando Località</button><br />
                   </div>--%>
                    <label>UPLOAD a File.</label>
                    <label for="fieldSeparator">Set Field Separator file (default "|"):</label><input id="fieldSeparator" type="text" name="fieldSeparatorCSVParam" value="" maxlength="1" size="1"/><br />
                    <label for="lineSeparator">Set Line Separator file (default "\n"):</label><input id="lineSeparator" type="text" name="lineSeparatorCSVParam" value="" maxlength="1" size="1"/><br />
                    <label for="nameSeparator">Set Name ID Separator file (default "name"):</label><input id="nameSeparator" type="text" name="nameSeparatorCSVParam" value="" maxlength="1" size="1"/><br />
                    <label for="uploader">Choose CSV file:</label><input type="file" id="uploader" name="files[]" multiple accept="text/csv">
                   <c:url var="url2" value="/map4" />
                   <form:form action="${url2}" method="post" onSubmit="getMarkers();">
                       <div id="loadMarker">
                           <input type="submit" name="GetMarkersParam" value="getMarkers" />
                       </div>
                   </form:form>
                   <%-- Uploading File With Ajax: Not Work --%>
                   <%--
                   <form id="uploadForm" action="/fileupload?${_csrf.parameterName}=${_csrf.token}" method="post" enctype="multipart/form-data" name="fileinfo">
                       Choose file:<input type="file" id="uploader" name="uploader"  >
                       <input type="submit" value="Upload"> Press here to upload the file!
                   </form>
                   --%>

                   <%-- Uploading File Without Ajax: WORK --%>
                   <label>UPLOAD a File 2.</label>
                   <c:url var="url3" value="/uploadFile" />
                   <%--<jsp:useBean id="_csrf" scope="request" type="org.springframework.security.web.csrf.CsrfAuthenticationStrategy.SaveOnAccessCsrfToken"/>--%>
                   <form:form method="post" action="${url3}?${_csrf.parameterName}=${_csrf.token}" enctype="multipart/form-data">
                       File to upload:<input type="file" name="file" title="x"><br />
                       Name:<input type="text" name="name" title="x"><br />
                       <input type="submit" value="Upload"> Press here to upload the file!
                      <%-- <input type="hidden"  name="${_csrf.parameterName}"   value="${_csrf.token}"/>--%>
                   </form:form>
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
<input type="checkbox" name="macro-select-all" id="macro-select-all" value="Select All"  title="macro-select-all"/> <span>De/Seleziona tutto</span>
<div id="categorie">
<!-- CODE CONNECTION MYSQL-->
${HTML}
<!-- END OF THE CONNECTION -->
<br />
<input type="checkbox" name="near-bus-stops" value="NearBusStops" class="macrocategory"  title="near-bus-stops"/>
<span class="near-bus-stops macrocategory-label">Fermate Autobus</span>
</div>
<hr />
Raggio di Ricerca:
<br />
<select id="raggioricerca" name="raggioricerca" title="raggioricerca">
<option value="100">Entro 100 metri</option>
<option value="200">Entro 200 metri</option>
<option value="300">Entro 300 metri</option>
<option value="500">Entro 500 metri</option>
</select>
<br />
Numero massimo di risultati:
<br />
<select id="numerorisultati" name="numerorisultati" title="numerorisultati">
<option value="100">100</option>
<option value="200">200</option>
<option value="500">500</option>
<option value="0">Nessun Limite</option>
</select>
<br />
<hr />
<input type="button" value="Cerca!" id="pulsante-ricerca" onclick="ricercaServizi();" />
<input type="button" value="Clean Map" id="pulsante-reset"  />
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
<img src="${pageContext.request.contextPath}/resources/img/ajax-loader.gif" width="54" />
<h3>Caricamento in corso</h3>
Il caricamento può richiedere del tempo
</div>
</div>



</body>
</html>

