<%--<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
  <title>ServiceMap</title>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

    <!-- PLUGIN LEAFLET CSS -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/awesome-markers/leaflet.awesome-markers.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/gps/leaflet-gps.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/MarkerCluster.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/MarkerCluster.Default.css" />

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/jquery/jquery-ui1.10.04.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/bootstrap/css/bootstrap.css"/>


    <!-- OTHER -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/Control.Geocoder.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/label/leaflet.label.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.css"/>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/plugin/fuseSearch/src/leaflet.fusesearch.css"/>

    <!-- CSS Servicemap -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css"/>
    <script src="${pageContext.request.contextPath}/resources/js/ServiceMap/utility.js" type="text/javascript"></script>

    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/syle_support_leaflet.css"/>

    <!-- MAPBOX -->
    <script src='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.js' type="text/javascript"></script>
    <link href='https://api.tiles.mapbox.com/mapbox.js/v2.1.4/mapbox.css' rel='stylesheet' />

    <!-- Leaflet -->
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/leaflet-src.js" type="text/javascript"></script>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/js/leaflet/leaflet.css"/>

    <%--<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
    <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>--%>

    <!-- JS -->
    <script src="${pageContext.request.contextPath}/resources/js/mustache/mustache.js" type="text/javascript"></script>

    <!-- JS Leaflet Plugin -->
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/awesome-markers/leaflet.awesome-markers.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/gps/leaflet-gps.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/markercluster/leaflet.markercluster.js"></script>

    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/label/leaflet.label-src.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/search/leaflet-search.js"></script>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/control-geocoder/Control.Geocoder.js"></script>
    <script src="${pageContext.request.contextPath}/jspm_packages/github/krisk/Fuse@1.3.1/src/fuse.js"></script>
    <script src="${pageContext.request.contextPath}/jspm_packages/github/naomap/leaflet-fusesearch@master/src/leaflet.fusesearch.js"></script>

    <!-- JS - leafletmap support -->
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/corslite2.js"></script>
    <!-- to the footer -->
    <%--<script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/gtfsExtractor.js"></script>--%>
    <script src="${pageContext.request.contextPath}/resources/js/leaflet/plugin/filelayer/leaflet.filelayer.js"></script>
    <!-- New Leaflet Plugin -->
  <%--  <script src="${pageContext.request.contextPath}/jspm_packages/github/ismyrnow/Leaflet.groupedlayercontrol@0.4.0/src/leaflet.groupedlayercontrol.js">
    </script>
    <link href="${pageContext.request.contextPath}/jspm_packages/github/ismyrnow/Leaflet.groupedlayercontrol@0.4.0/src/leaflet.groupedlayercontrol.css" rel='stylesheet' />--%>

    <!-- JS JQUERY SUPPORT -->
    <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="http://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
    <script src="https://cdn.rawgit.com/mholt/PapaParse/master/papaparse.js"></script>
    <script src="https://cdn.rawgit.com/mbostock/d3/master/d3.js"></script>
    <script src="https://cdn.rawgit.com/mapbox/togeojson/master/togeojson.js"></script>
    <script src="https://cdn.rawgit.com/shramov/leaflet-plugins/d74d67/layer/vector/GPX.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" >
   <script src="${pageContext.request.contextPath}/resources/js/ServiceMap/leaflet_buildMap_support_2.js" type="text/javascript"></script>
   <!-- Modified from 4535992 -->
   <%-- <script> var ctx = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));</script>--%>
</head>
<body class="Chrome"
     <%-- onload="getBusLines();--%> <!-- Modified from 4535992 -->
            changeLanguage('ENG')">
<!-- Work for the futture we can upgrade all the code to the jspm package manager -->
<%--<script src="${pageContext.request.contextPath}/jspm_packages/system.js"></script>
<script src="${pageContext.request.contextPath}/config.js"></script>--%>
<%--<script>
    System.import("${pageContext.request.contextPath}/resources/js/ServiceMap/leaflet_buildMap_support_2.js");
</script>--%>
<script>

  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
              (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
    a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-64916363-1', 'auto');
  ga('send', 'pageview');
  /*$(document).ready(function () {
   $("input[name='radio-language']").click(function () {
   changeLanguage($(this).val());
   });
   });*/

</script>
<script>
  var mode = "";</script>

<div id="dialog"></div>
<!-- <div id="QueryConfirmSave" title="'Save Query"> <p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0; display: none;"></span>Do you want to save this query?</p> </div> !-->
<div id="map">
  <div class="menu" id="help">
    <a href="http://www.disit.org/servicemap" title="Aiuto Service Map" target="_blank"><img src="${pageContext.request.contextPath}/resources/img/help.png" alt="help SiiMobility ServiceMap" width="28" /></a>
  </div>
</div>

<div class="menu" id="save">
  <img src="${pageContext.request.contextPath}/resources/img/save.png" alt="Salva la configurazione" width="28" onclick="save_handler(null, null, null, true);" />
</div>
<div class="menu" id="embed">
  <img src="${pageContext.request.contextPath}/resources/img/embed_icon.png" alt="Embed Servie Map" width="28" onclick="embedConfiguration();" />
</div>
<div id="menu-alto" class="menu">
  <div id="lang" value="ENG"><img id="icon_lang"  src="${pageContext.request.contextPath}/resources/img/icon_ITA.png" onclick="changeLanguage('ITA')"></img></div>
  <div class="header">
    <span name="lbl" caption="Hide_Menu_sx"> - Hide Menu</span>
  </div>
  <div class="content">
    <div id="tabs">
      <ul>
        <li><a href="#tabs-1"><span name="lbl" caption="Bus_Search">Florence Bus</span></a></li>
        <li><a href="#tabs-2"><span name="lbl" caption="Municipality_Search">Tuscan Municipalities</span></a></li>
        <li><a href="#tabs-search"><span name="lbl" caption="Text_Search">Text Search</span></a></li>
        <li><a href="#tabs-Event"><span name="lbl" caption="Event_Search">Events</span></a></li>
        <%--Added from 4535992--%>
        <li><a href="#tabs-101"><span name="lbl" caption="Utility">Utility</span></a></li>
      </ul>
      <div id="tabs-1">
        <div class="use-case-1">
          <span name="lbl" caption="Select_Line">Select a line</span>:
          <br/>
          <!--<select id="elencolinee" name="elencolinee" onchange="mostraElencoFermate(this);"> </select>-->
          <select id="elencolinee" name="elencolinee" onchange="mostraElencoPercorsi(this);"></select>
          <br/>
          <span name="lbl" caption="Select_Route">Select a route</span>:
          <br/>
          <!--<select id="elencopercorsi" name="elencopercorsi" onchange="mostraElencoPercorsi(this);"></select>-->
          <select id="elencopercorsi" name="elencopercorsi" onchange="mostraElencoFermate(this);">
            <option value=""> - Select a Bus Route -</option>
          </select>
          <br/>
          <span name="lbl" caption="Select_BusStop">Select a bus stop</span>:
          <br/>
          <select id="elencofermate" name="elencofermate" onchange="mostraFermate(this);">
            <option value=""> - Select a Bus Stop - </option>
          </select>
          <div id="pulsanteRT" name="autobusRealTime" onclick="mostraAutobusRT(true);"><span name="lbl" caption="Position_Bus">Position of selected Busses</span></div>
        </div>
      </div>
      <div id="tabs-2">
        <div class="use-case-2">
          <span name="lbl" caption="Select_Province">Select a province</span>:
          <br/>
          <select id="elencoprovince" name="elencoprovince" onchange="mostraElencoComuni(this);">
            <option value=""> - Select a Province - </option>
            <option value="all">ALL THE PROVINCES</option>
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
          <span name="lbl" caption="Select_Municipality">Select a municipality</span>:
          <br/>
          <select id="elencocomuni" name="elencocomuni" onchange="updateSelection();
                                    ">
            <option value=""> - Select a Municipality - </option>
          </select>
        </div>
      </div>
      <div id="tabs-search">
        <div class="use-case-search"><span name="lbl" caption="Select_Text_sx">Search by Text</span>:
          <input type="text" name="search" id="freeSearch" onkeypress="event.keyCode == 13 ? searchText() : false">
          <br><br><span name="lbl" caption="Num_Results_sx">Max number of results</span>:
          <select id="numberResults" name="numberResults">
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="0">No limit</option>
          </select>
          <div class="menu" id="serviceTextSearch">
            <img src="${pageContext.request.contextPath}/resources/img/search_icon.png" alt="Search Services" width="28" onclick="searchText()" />
          </div>
          <div class="menu" id="saveQuerySearch">
            <img src="${pageContext.request.contextPath}/resources/img/save.png" alt="Salva la query" width="28" onclick="save_handler(null, null, null, false, 'freeText');" />
          </div>
        </div>
      </div>
      <%--Added from 4535992--%>
      <div div id="tabs-101" aria-labelledby="ui-id-101" class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel" style="display: none;" aria-expanded="false" aria-hidden="true">
        <div class="use-case-101">
          <ul>
            <%--TRACK MY URL--%>
            <li>
              <c:if test="${(not empty arrayMarker)}" >
                <input id="arrayMarkerForm" name="arrayMarkerParam" type="hidden" value="<c:out value="${arrayMarker}" />"/>
                <p>LENGTH OF MARKERS: ${arrayMarker.size()}</p>
                <c:forEach items="${arrayMarker}" var="idMarker">
                  <p id="marker">
                    <input id="idForm" name="idParam" type="hidden" value="<c:out value="${idMarker.id}" />"/>
                    <input id="nameForm" name="nameParam" type="hidden" value="<c:out value="${idMarker.name}" />"/>
                    <input id="urlForm" name="urlParam" type="hidden" value="<c:out  value="${idMarker.url}" />"/>
                    <input id="latForm" name="latParam" type="hidden" value="<c:out  value="${idMarker.latitude}" />"/>
                    <input id="lngForm" name="lngParam" type="hidden" value="<c:out  value="${idMarker.longitude}" />"/>
                    <input id="<c:out value="${idMarker.id}" />" name="popupContentParam" type="hidden" value="<c:out  value="${idMarker.popupContent}" />"/>
                  </p>
                  <script type="text/javascript">
                    //leaflet_buildMap_support.initMap();
                    try{
                        var content = document.getElementById("<c:out value="${idMarker.id}"/>").value; //need for automatic parse from Spring
                        /*var content = '<c:out  value="${idMarker.popupContent}" escapeXml="false"/>';*/
                        alert("Content:" + content);
                        leaflet_buildMap_support_2.pushMarkerToArrayMarker(
                                "${idMarker.name}","${idMarker.url}","${idMarker.latitude}","${idMarker.longitude}",
                                "${idMarker.markerInfo.region}","${idMarker.markerInfo.province}","${idMarker.markerInfo.city}",
                                "${idMarker.markerInfo.address}","${idMarker.markerInfo.phone}","${idMarker.markerInfo.email}",
                                "${idMarker.markerInfo.fax}","${idMarker.markerInfo.iva}",content);
                    }catch(e){
                      alert("Error n° 2:"+ e.message);
                    }
                  </script>
                </c:forEach>
              </c:if>
              TrackMyURL:
              <c:url var="url" value="/map3" />
              <form:form action="${url}" method="post" id="IDTrackMyURL" modelAttribute="arrayParam"
                         onsubmit="leafletUtil.loadArrayOnInput2('IDTrackMyURL','arrayParam')">
                <%--<form:input type="hidden" path="${arrayMarker}"/>--%>
               <%-- <input id="specialArray" type="hidden" name="arrayParam" value="" title="arrayParam"/>--%>
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

            </li>
            <%--GET MARKERS--%>
            <li>
              <c:url var="url2" value="/map3" />
              <%--not work with namespace--%>
              <%--<form:form action="${url2}" method="post" onSubmit="getMarkers('loadMarker');">--%>
              <form:form action="${url2}" method="post" id="IDGetMarkers"
                         onsubmit="leafletUtil.loadAllLayerOnTheMapAndConvertToMarker('IDGetMarkers','arrayParam')">
                  <input type="hidden" name="arrayParam" value="" title="arrayParam"/>
               <%-- <div id="loadMarker">
                    &lt;%&ndash;<input type="button" value="Get Markers" id="getMarkers"  />&ndash;%&gt;
                  <input type="submit" name="GetMarkersParam" value="getMarkers" />
                </div>--%>
                  <input type="submit" name="GetMarkersParam" value="getMarkers" />
              </form:form>
            </li>
            <li>
              <label>Search Marker 2 with Leaflet Search plugin + container:</label>
              <div id="searchMarkerWithJavascript2" ></div>
            </li>
            <li>
              <label>Search Marker 3 with Leaflet GeoCoder plugin + container:</label>
              <div id="searchMarkerWithJavascript3" ></div>
              <!-- Added from 4535992-->
              <div id="geocode-selector"></div>
            </li>
              <!-- Add Json Uploader -->
            <li>
              <c:url var="url00" value="/markers" />
              <form:form action="${url00}" method="post" id="/markers"
                         onsubmit="leafletUtil.loadArrayOnInput2('/markers','arrayParam')">
                <input type="hidden" name="arrayParam" value="" title="arrayParam"/>
               <%-- <input type="text" name="urlParam" value=""  title="urlParam"/>--%>
                <input type="submit" name="loadJsonFormParam" value="loadJsonForm" />
              </form:form>
            </li>
            <li>
              <c:url var="url3" value="/uploadFile" />
              <%--<jsp:useBean id="_csrf" scope="request" type="org.springframework.security.web.csrf.CsrfAuthenticationStrategy.SaveOnAccessCsrfToken"/>--%>
              <form:form method="post" action="${url3}?${_csrf.parameterName}=${_csrf.token}" enctype="multipart/form-data">
                File to upload:<input id="myFile" type="file" name="file" title="x"><br />
                <%--Name:<input id="myFileName" type="text" name="name" title="test1"><br />--%>
                <input type="submit" value="Upload"> Press here to upload the file!
                <%-- <input type="hidden"  name="${_csrf.parameterName}"   value="${_csrf.token}"/>--%>
              </form:form>
            </li>
          </ul>
        </div>
      </div>
      <%-- END ADDED FROM 4535992--%>
      <div id="tabs-Event" style="padding-top:10px;">
        <span name="lbl" caption="Select_Time">Select a time interval: </span>
        <input type="radio" name="event_choice" value="day" onchange="searchEvent(this.value, null, null)"><span name="lbl" caption="Day">Day</span></input>
        <input type="radio" name="event_choice" value="week" onchange="searchEvent(this.value, null, null)"><span name="lbl" caption="Week">Week</span></input>
        <input type="radio" name="event_choice" value="month" onchange="searchEvent(this.value, null, null)"><span name="lbl" caption="Month">Month</span></input>
        <fieldset id="event">
          <legend><span name="lbl" caption="Event_Florence">Events in Florence</span></legend>
          <div id="eventNum" style="display:none;"></div>
          <div id="eventList"></div>
        </fieldset>
      </div>
      <fieldset id="selection">
        <legend><span name="lbl" caption="Actual_Selection">Actual Selection</span></legend>
        <span id="selezione" >No selection</span> <br>
        <div id="approximativeAddress"></div>

      </fieldset>
      <div id="queryBox"></div>
    </div>
  </div>
</div>
<div id="loading">
  <div id="messaggio-loading">
    <img src="${pageContext.request.contextPath}/resources/img/ajax-loader.gif" width="32" />
    <h3>Loading...</h3>
    <span name=lbl" caption="Loading_Message">Loading may take time</span>
  </div>
</div>
<div id="serviceMap_query_toggle"></div>
<div id="menu-dx" class="menu">
  <div class="header">
    <span name="lbl" caption="Hide_Menu_dx"> - Hide Menu</span>
  </div>
  <div class="content">
    <div id="tabs-servizi">
      <ul>
        <li><a href="#tabs-4"><span name="lbl" caption="Search_Regular_Services">Regular Services</span></a></li>
        <li><a href="#tabs-5"><span name="lbl" caption="Search_Transversal_Services">Transversal Services</span></a></li>
      </ul>
      <div id="tabs-4">
        <div class="use-case-4">
          <input type="text" name="serviceTextFilter" id="serviceTextFilter" placeholder="search text into service" onkeypress="event.keyCode == 13 ? ricercaServizi('categorie') : false"/><br />
          <span name="lbl" caption="Services_Categories_R">Services Categories</span>
          <br />
          <input type="checkbox" name="macro-select-all" id="macro-select-all" value="Select All" /> <span name="lbl" caption="Select_All_R">De/Select All</span>
          <div id="categorie">
            <input type='checkbox' name='Accommodation' value='Accommodation' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation.png' height='23' width='20' align='top'> <span class='Accommodation macrocategory-label'>Accommodation</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Agritourism' value='Agritourism' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Agritourism.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Agritourism</span>
              <br />
              <input type='checkbox' name='Beach_resort' value='Beach_resort' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Beach_resort.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Beach_resort</span>
              <br />
              <input type='checkbox' name='Bed_and_breakfast' value='Bed_and_breakfast' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Bed_and_breakfast.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Bed_and_breakfast</span>
              <br />
              <input type='checkbox' name='Boarding_house' value='Boarding_house' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Boarding_house.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Boarding_house</span>
              <br />
              <input type='checkbox' name='Camping' value='Camping' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Camping.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Camping</span>
              <br />
              <input type='checkbox' name='Day_care_centre' value='Day_care_centre' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Day_care_centre.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Day_care_centre</span>
              <br />
              <input type='checkbox' name='Farm_house' value='Farm_house' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Farm_house.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Farm_house</span>
              <br />
              <input type='checkbox' name='Historic_residence' value='Historic_residence' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Historic_residence.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Historic_residence</span>
              <br />
              <input type='checkbox' name='Holiday_village' value='Holiday_village' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Holiday_village.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Holiday_village</span>
              <br />
              <input type='checkbox' name='Hostel' value='Hostel' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Hostel.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Hostel</span>
              <br />
              <input type='checkbox' name='Hotel' value='Hotel' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Hotel.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Hotel</span>
              <br />
              <input type='checkbox' name='Mountain_shelter' value='Mountain_shelter' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Mountain_shelter.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Mountain_shelter</span>
              <br />
              <input type='checkbox' name='Other_accommodation' value='Other_accommodation' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Other_accommodation.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Other_accommodation</span>
              <br />
              <input type='checkbox' name='Religiuos_guest_house' value='Religiuos_guest_house' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Religiuos_guest_house.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Religiuos_guest_house</span>
              <br />
              <input type='checkbox' name='Rest_home' value='Rest_home' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Rest_home.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Rest_home</span>
              <br />
              <input type='checkbox' name='Summer_camp' value='Summer_camp' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Summer_camp.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Summer_camp</span>
              <br />
              <input type='checkbox' name='Summer_residence' value='Summer_residence' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Summer_residence.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Summer_residence</span>
              <br />
              <input type='checkbox' name='Vacation_resort' value='Vacation_resort' class='sub_Accommodation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Accommodation_Vacation_resort.png' height='19' width='16' align='top'>
              <span class='Accommodation subcategory-label'>Vacation_resort</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Advertising' value='Advertising' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Advertising.png' height='23' width='20' align='top'> <span class='Advertising macrocategory-label'>Advertising</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Advertising_and_promotion' value='Advertising_and_promotion' class='sub_Advertising subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Advertising_Advertising_and_promotion.png' height='19' width='16' align='top'>
              <span class='Advertising subcategory-label'>Advertising_and_promotion</span>
              <br />
              <input type='checkbox' name='Market_polling' value='Market_polling' class='sub_Advertising subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Advertising_Market_polling.png' height='19' width='16' align='top'>
              <span class='Advertising subcategory-label'>Market_polling</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='AgricultureAndLivestock' value='AgricultureAndLivestock' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock.png' height='23' width='20' align='top'> <span class='AgricultureAndLivestock macrocategory-label'>AgricultureAndLivestock</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Animal_production' value='Animal_production' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Animal_production.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Animal_production</span>
              <br />
              <input type='checkbox' name='Crop_animal_production_hunting' value='Crop_animal_production_hunting' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Crop_animal_production_hunting.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Crop_animal_production_hunting</span>
              <br />
              <input type='checkbox' name='Crop_production' value='Crop_production' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Crop_production.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Crop_production</span>
              <br />
              <input type='checkbox' name='Fishing_and_aquaculture' value='Fishing_and_aquaculture' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Fishing_and_aquaculture.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Fishing_and_aquaculture</span>
              <br />
              <input type='checkbox' name='Hunting_trapping_and_services' value='Hunting_trapping_and_services' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Hunting_trapping_and_services.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Hunting_trapping_and_services</span>
              <br />
              <input type='checkbox' name='Support_animal_production' value='Support_animal_production' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Support_animal_production.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Support_animal_production</span>
              <br />
              <input type='checkbox' name='Veterinary' value='Veterinary' class='sub_AgricultureAndLivestock subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/AgricultureAndLivestock_Veterinary.png' height='19' width='16' align='top'>
              <span class='AgricultureAndLivestock subcategory-label'>Veterinary</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='CivilAndEdilEngineering' value='CivilAndEdilEngineering' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering.png' height='23' width='20' align='top'> <span class='CivilAndEdilEngineering macrocategory-label'>CivilAndEdilEngineering</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Architectural_consulting' value='Architectural_consulting' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Architectural_consulting.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Architectural_consulting</span>
              <br />
              <input type='checkbox' name='Building_construction' value='Building_construction' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Building_construction.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Building_construction</span>
              <br />
              <input type='checkbox' name='Cartographers' value='Cartographers' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Cartographers.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Cartographers</span>
              <br />
              <input type='checkbox' name='Civil_engineering' value='Civil_engineering' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Civil_engineering.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Civil_engineering</span>
              <br />
              <input type='checkbox' name='Engineering_consulting' value='Engineering_consulting' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Engineering_consulting.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Engineering_consulting</span>
              <br />
              <input type='checkbox' name='Other_specialized_construction' value='Other_specialized_construction' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Other_specialized_construction.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Other_specialized_construction</span>
              <br />
              <input type='checkbox' name='Specialized_construction' value='Specialized_construction' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Specialized_construction.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Specialized_construction</span>
              <br />
              <input type='checkbox' name='Surveyor' value='Surveyor' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Surveyor.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Surveyor</span>
              <br />
              <input type='checkbox' name='Technical_consultants' value='Technical_consultants' class='sub_CivilAndEdilEngineering subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CivilAndEdilEngineering_Technical_consultants.png' height='19' width='16' align='top'>
              <span class='CivilAndEdilEngineering subcategory-label'>Technical_consultants</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='CulturalActivity' value='CulturalActivity' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity.png' height='23' width='20' align='top'> <span class='CulturalActivity macrocategory-label'>CulturalActivity</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Archaeological_site' value='Archaeological_site' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Archaeological_site.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Archaeological_site</span>
              <br />
              <input type='checkbox' name='Auditorium' value='Auditorium' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Auditorium.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Auditorium</span>
              <br />
              <input type='checkbox' name='Botanical_and_zoological_gardens' value='Botanical_and_zoological_gardens' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Botanical_and_zoological_gardens.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Botanical_and_zoological_gardens</span>
              <br />
              <input type='checkbox' name='Churches' value='Churches' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Churches.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Churches</span>
              <br />
              <input type='checkbox' name='Cultural_centre' value='Cultural_centre' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Cultural_centre.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Cultural_centre</span>
              <br />
              <input type='checkbox' name='Cultural_sites' value='Cultural_sites' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Cultural_sites.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Cultural_sites</span>
              <br />
              <input type='checkbox' name='Historical_buildings' value='Historical_buildings' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Historical_buildings.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Historical_buildings</span>
              <br />
              <input type='checkbox' name='Journalist' value='Journalist' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Journalist.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Journalist</span>
              <br />
              <input type='checkbox' name='Leasing_of_intellectual_property' value='Leasing_of_intellectual_property' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Leasing_of_intellectual_property.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Leasing_of_intellectual_property</span>
              <br />
              <input type='checkbox' name='Library' value='Library' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Library.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Library</span>
              <br />
              <input type='checkbox' name='Monument_location' value='Monument_location' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Monument_location.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Monument_location</span>
              <br />
              <input type='checkbox' name='Motion_picture_and_television_programme_activities' value='Motion_picture_and_television_programme_activities' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Motion_picture_and_television_programme_activities.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Motion_picture_and_television_programme_activities</span>
              <br />
              <input type='checkbox' name='Museum' value='Museum' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Museum.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Museum</span>
              <br />
              <input type='checkbox' name='News_agency' value='News_agency' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_News_agency.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>News_agency</span>
              <br />
              <input type='checkbox' name='Other_broadcasting' value='Other_broadcasting' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Other_broadcasting.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Other_broadcasting</span>
              <br />
              <input type='checkbox' name='Photographic_activities' value='Photographic_activities' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Photographic_activities.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Photographic_activities</span>
              <br />
              <input type='checkbox' name='Printing_and_recorded_media' value='Printing_and_recorded_media' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Printing_and_recorded_media.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Printing_and_recorded_media</span>
              <br />
              <input type='checkbox' name='Printing_and_services' value='Printing_and_services' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Printing_and_services.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Printing_and_services</span>
              <br />
              <input type='checkbox' name='Publishing_activities' value='Publishing_activities' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Publishing_activities.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Publishing_activities</span>
              <br />
              <input type='checkbox' name='Radio_broadcasting' value='Radio_broadcasting' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Radio_broadcasting.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Radio_broadcasting</span>
              <br />
              <input type='checkbox' name='Reproduction_recorded_media' value='Reproduction_recorded_media' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Reproduction_recorded_media.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Reproduction_recorded_media</span>
              <br />
              <input type='checkbox' name='Sound_recording_and_music_publishing' value='Sound_recording_and_music_publishing' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Sound_recording_and_music_publishing.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Sound_recording_and_music_publishing</span>
              <br />
              <input type='checkbox' name='Squares' value='Squares' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Squares.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Squares</span>
              <br />
              <input type='checkbox' name='Television_broadcasting' value='Television_broadcasting' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Television_broadcasting.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Television_broadcasting</span>
              <br />
              <input type='checkbox' name='Theatre' value='Theatre' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Theatre.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Theatre</span>
              <br />
              <input type='checkbox' name='Translation_and_interpreting' value='Translation_and_interpreting' class='sub_CulturalActivity subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Translation_and_interpreting.png' height='19' width='16' align='top'>
              <span class='CulturalActivity subcategory-label'>Translation_and_interpreting</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='EducationAndResearch' value='EducationAndResearch' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch.png' height='23' width='20' align='top'> <span class='EducationAndResearch macrocategory-label'>EducationAndResearch</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Automobile_driving_and_flying_schools' value='Automobile_driving_and_flying_schools' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Automobile_driving_and_flying_schools.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Automobile_driving_and_flying_schools</span>
              <br />
              <input type='checkbox' name='Conservatory' value='Conservatory' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Conservatory.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Conservatory</span>
              <br />
              <input type='checkbox' name='Cultural_education' value='Cultural_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Cultural_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Cultural_education</span>
              <br />
              <input type='checkbox' name='Dance_schools' value='Dance_schools' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Dance_schools.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Dance_schools</span>
              <br />
              <input type='checkbox' name='Diving_school' value='Diving_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Diving_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Diving_school</span>
              <br />
              <input type='checkbox' name='Educational_support_activities' value='Educational_support_activities' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Educational_support_activities.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Educational_support_activities</span>
              <br />
              <input type='checkbox' name='Higher_education' value='Higher_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Higher_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Higher_education</span>
              <br />
              <input type='checkbox' name='Language_courses' value='Language_courses' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Language_courses.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Language_courses</span>
              <br />
              <input type='checkbox' name='Performing_arts_schools' value='Performing_arts_schools' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Performing_arts_schools.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Performing_arts_schools</span>
              <br />
              <input type='checkbox' name='Post_secondary_education' value='Post_secondary_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Post_secondary_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Post_secondary_education</span>
              <br />
              <input type='checkbox' name='Pre_primary_education' value='Pre_primary_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Pre_primary_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Pre_primary_education</span>
              <br />
              <input type='checkbox' name='Primary_education' value='Primary_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Primary_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Primary_education</span>
              <br />
              <input type='checkbox' name='Private_high_school' value='Private_high_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_high_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_high_school</span>
              <br />
              <input type='checkbox' name='Private_infant_school' value='Private_infant_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_infant_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_infant_school</span>
              <br />
              <input type='checkbox' name='Private_junior_high_school' value='Private_junior_high_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_junior_high_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_junior_high_school</span>
              <br />
              <input type='checkbox' name='Private_junior_school' value='Private_junior_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_junior_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_junior_school</span>
              <br />
              <input type='checkbox' name='Private_polytechnic_school' value='Private_polytechnic_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_polytechnic_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_polytechnic_school</span>
              <br />
              <input type='checkbox' name='Private_preschool' value='Private_preschool' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_preschool.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_preschool</span>
              <br />
              <input type='checkbox' name='Private_professional_institute' value='Private_professional_institute' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Private_professional_institute.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Private_professional_institute</span>
              <br />
              <input type='checkbox' name='Public_high_school' value='Public_high_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_high_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_high_school</span>
              <br />
              <input type='checkbox' name='Public_infant_school' value='Public_infant_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_infant_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_infant_school</span>
              <br />
              <input type='checkbox' name='Public_junior_high_school' value='Public_junior_high_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_junior_high_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_junior_high_school</span>
              <br />
              <input type='checkbox' name='Public_junior_school' value='Public_junior_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_junior_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_junior_school</span>
              <br />
              <input type='checkbox' name='Public_polytechnic_school' value='Public_polytechnic_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_polytechnic_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_polytechnic_school</span>
              <br />
              <input type='checkbox' name='Public_professional_institute' value='Public_professional_institute' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_professional_institute.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_professional_institute</span>
              <br />
              <input type='checkbox' name='Public_university' value='Public_university' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_university.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Public_university</span>
              <br />
              <input type='checkbox' name='Research_and_development' value='Research_and_development' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Research_and_development.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Research_and_development</span>
              <br />
              <input type='checkbox' name='Sailing_school' value='Sailing_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Sailing_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Sailing_school</span>
              <br />
              <input type='checkbox' name='Secondary_education' value='Secondary_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Secondary_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Secondary_education</span>
              <br />
              <input type='checkbox' name='Ski_school' value='Ski_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Ski_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Ski_school</span>
              <br />
              <input type='checkbox' name='Sports_and_recreation_education' value='Sports_and_recreation_education' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Sports_and_recreation_education.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Sports_and_recreation_education</span>
              <br />
              <input type='checkbox' name='Training_school' value='Training_school' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Training_school.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Training_school</span>
              <br />
              <input type='checkbox' name='Training_school_for_teachers' value='Training_school_for_teachers' class='sub_EducationAndResearch subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Training_school_for_teachers.png' height='19' width='16' align='top'>
              <span class='EducationAndResearch subcategory-label'>Training_school_for_teachers</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Emergency' value='Emergency' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency.png' height='23' width='20' align='top'> <span class='Emergency macrocategory-label'>Emergency</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Carabinieri' value='Carabinieri' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Carabinieri.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Carabinieri</span>
              <br />
              <input type='checkbox' name='Civil_protection' value='Civil_protection' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Civil_protection.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Civil_protection</span>
              <br />
              <input type='checkbox' name='Coast_guard_harbormaster' value='Coast_guard_harbormaster' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Coast_guard_harbormaster.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Coast_guard_harbormaster</span>
              <br />
              <input type='checkbox' name='Commissariat_of_public_safety' value='Commissariat_of_public_safety' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Commissariat_of_public_safety.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Commissariat_of_public_safety</span>
              <br />
              <input type='checkbox' name='Corps_of_forest_rangers' value='Corps_of_forest_rangers' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Corps_of_forest_rangers.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Corps_of_forest_rangers</span>
              <br />
              <input type='checkbox' name='Emergency_medical_care' value='Emergency_medical_care' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Emergency_medical_care.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Emergency_medical_care</span>
              <br />
              <input type='checkbox' name='Emergency_services' value='Emergency_services' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Emergency_services.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Emergency_services</span>
              <br />
              <input type='checkbox' name='Fire_brigade' value='Fire_brigade' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Fire_brigade.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Fire_brigade</span>
              <br />
              <input type='checkbox' name='First_aid' value='First_aid' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_First_aid.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>First_aid</span>
              <br />
              <input type='checkbox' name='Italian_finance_police' value='Italian_finance_police' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Italian_finance_police.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Italian_finance_police</span>
              <br />
              <input type='checkbox' name='Local_police' value='Local_police' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Local_police.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Local_police</span>
              <br />
              <input type='checkbox' name='Towing_and_roadside_assistance' value='Towing_and_roadside_assistance' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Towing_and_roadside_assistance.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Towing_and_roadside_assistance</span>
              <br />
              <input type='checkbox' name='Traffic_corps' value='Traffic_corps' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Traffic_corps.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Traffic_corps</span>
              <br />
              <input type='checkbox' name='Useful_numbers' value='Useful_numbers' class='sub_Emergency subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Emergency_Useful_numbers.png' height='19' width='16' align='top'>
              <span class='Emergency subcategory-label'>Useful_numbers</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Entertainment' value='Entertainment' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment.png' height='23' width='20' align='top'> <span class='Entertainment macrocategory-label'>Entertainment</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Amusement_activities' value='Amusement_activities' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Amusement_activities.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Amusement_activities</span>
              <br />
              <input type='checkbox' name='Amusement_and_theme_parks' value='Amusement_and_theme_parks' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Amusement_and_theme_parks.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Amusement_and_theme_parks</span>
              <br />
              <input type='checkbox' name='Aquarium' value='Aquarium' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Aquarium.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Aquarium</span>
              <br />
              <input type='checkbox' name='Betting_shops' value='Betting_shops' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Betting_shops.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Betting_shops</span>
              <br />
              <input type='checkbox' name='Boxoffice' value='Boxoffice' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Boxoffice.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Boxoffice</span>
              <br />
              <input type='checkbox' name='Cinema' value='Cinema' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Cinema.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Cinema</span>
              <br />
              <input type='checkbox' name='Climbing' value='Climbing' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Climbing.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Climbing</span>
              <br />
              <input type='checkbox' name='Discotheque' value='Discotheque' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Discotheque.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Discotheque</span>
              <br />
              <input type='checkbox' name='Fishing_reserve' value='Fishing_reserve' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Fishing_reserve.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Fishing_reserve</span>
              <br />
              <input type='checkbox' name='Gambling_and_betting' value='Gambling_and_betting' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gambling_and_betting.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Gambling_and_betting</span>
              <br />
              <input type='checkbox' name='Game_reserve' value='Game_reserve' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Game_reserve.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Game_reserve</span>
              <br />
              <input type='checkbox' name='Game_room' value='Game_room' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Game_room.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Game_room</span>
              <br />
              <input type='checkbox' name='Gardens' value='Gardens' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gardens.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Gardens</span>
              <br />
              <input type='checkbox' name='Golf' value='Golf' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Golf.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Golf</span>
              <br />
              <input type='checkbox' name='Green_areas' value='Green_areas' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Green_areas.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Green_areas</span>
              <br />
              <input type='checkbox' name='Gym_fitness' value='Gym_fitness' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gym_fitness.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Gym_fitness</span>
              <br />
              <input type='checkbox' name='Hippodrome' value='Hippodrome' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Hippodrome.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Hippodrome</span>
              <br />
              <input type='checkbox' name='Operation_of_casinos' value='Operation_of_casinos' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Operation_of_casinos.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Operation_of_casinos</span>
              <br />
              <input type='checkbox' name='Pool' value='Pool' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Pool.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Pool</span>
              <br />
              <input type='checkbox' name='Rafting_kayak' value='Rafting_kayak' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Rafting_kayak.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Rafting_kayak</span>
              <br />
              <input type='checkbox' name='Recreation_room' value='Recreation_room' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Recreation_room.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Recreation_room</span>
              <br />
              <input type='checkbox' name='Riding_stables' value='Riding_stables' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Riding_stables.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Riding_stables</span>
              <br />
              <input type='checkbox' name='Skiing_facility' value='Skiing_facility' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Skiing_facility.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Skiing_facility</span>
              <br />
              <input type='checkbox' name='Social_centre' value='Social_centre' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Social_centre.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Social_centre</span>
              <br />
              <input type='checkbox' name='Sports_clubs' value='Sports_clubs' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Sports_clubs.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Sports_clubs</span>
              <br />
              <input type='checkbox' name='Sports_facility' value='Sports_facility' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Sports_facility.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Sports_facility</span>
              <br />
              <input type='checkbox' name='Sport_event_promoters' value='Sport_event_promoters' class='sub_Entertainment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Sport_event_promoters.png' height='19' width='16' align='top'>
              <span class='Entertainment subcategory-label'>Sport_event_promoters</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Environment' value='Environment' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment.png' height='23' width='20' align='top'> <span class='Environment macrocategory-label'>Environment</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Building_and_industrial_cleaning_activities' value='Building_and_industrial_cleaning_activities' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Building_and_industrial_cleaning_activities.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Building_and_industrial_cleaning_activities</span>
              <br />
              <input type='checkbox' name='Cleaning_activities' value='Cleaning_activities' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Cleaning_activities.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Cleaning_activities</span>
              <br />
              <input type='checkbox' name='Disinfecting_and_exterminating_activities' value='Disinfecting_and_exterminating_activities' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Disinfecting_and_exterminating_activities.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Disinfecting_and_exterminating_activities</span>
              <br />
              <input type='checkbox' name='Forestry' value='Forestry' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Forestry.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Forestry</span>
              <br />
              <input type='checkbox' name='Geologists' value='Geologists' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Geologists.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Geologists</span>
              <br />
              <input type='checkbox' name='Landscape_care' value='Landscape_care' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Landscape_care.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Landscape_care</span>
              <br />
              <input type='checkbox' name='Materials_recovery' value='Materials_recovery' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Materials_recovery.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Materials_recovery</span>
              <br />
              <input type='checkbox' name='Photovoltaic_system' value='Photovoltaic_system' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Photovoltaic_system.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Photovoltaic_system</span>
              <br />
              <input type='checkbox' name='Sewerage' value='Sewerage' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Sewerage.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Sewerage</span>
              <br />
              <input type='checkbox' name='Street_sweeping' value='Street_sweeping' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Street_sweeping.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Street_sweeping</span>
              <br />
              <input type='checkbox' name='Waste_collection_and_treatment' value='Waste_collection_and_treatment' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Waste_collection_and_treatment.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Waste_collection_and_treatment</span>
              <br />
              <input type='checkbox' name='Weather_sensor' value='Weather_sensor' class='sub_Environment subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Environment_Weather_sensor.png' height='19' width='16' align='top'>
              <span class='Environment subcategory-label'>Weather_sensor</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='FinancialService' value='FinancialService' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService.png' height='23' width='20' align='top'> <span class='FinancialService macrocategory-label'>FinancialService</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Accountants' value='Accountants' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Accountants.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Accountants</span>
              <br />
              <input type='checkbox' name='Auditing_activities' value='Auditing_activities' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Auditing_activities.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Auditing_activities</span>
              <br />
              <input type='checkbox' name='Bank' value='Bank' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Bank.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Bank</span>
              <br />
              <input type='checkbox' name='Financial_institute' value='Financial_institute' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Financial_institute.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Financial_institute</span>
              <br />
              <input type='checkbox' name='Insurance' value='Insurance' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Insurance.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Insurance</span>
              <br />
              <input type='checkbox' name='Insurance_and_financial' value='Insurance_and_financial' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Insurance_and_financial.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Insurance_and_financial</span>
              <br />
              <input type='checkbox' name='Labour_consultant' value='Labour_consultant' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Labour_consultant.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Labour_consultant</span>
              <br />
              <input type='checkbox' name='Legal_office' value='Legal_office' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Legal_office.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Legal_office</span>
              <br />
              <input type='checkbox' name='Tax_advice' value='Tax_advice' class='sub_FinancialService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Tax_advice.png' height='19' width='16' align='top'>
              <span class='FinancialService subcategory-label'>Tax_advice</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='GovernmentOffice' value='GovernmentOffice' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice.png' height='23' width='20' align='top'> <span class='GovernmentOffice macrocategory-label'>GovernmentOffice</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Airport_lost_property_office' value='Airport_lost_property_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Airport_lost_property_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Airport_lost_property_office</span>
              <br />
              <input type='checkbox' name='Civil_registry' value='Civil_registry' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Civil_registry.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Civil_registry</span>
              <br />
              <input type='checkbox' name='Consulate' value='Consulate' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Consulate.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Consulate</span>
              <br />
              <input type='checkbox' name='Department_of_motor_vehicles' value='Department_of_motor_vehicles' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Department_of_motor_vehicles.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Department_of_motor_vehicles</span>
              <br />
              <input type='checkbox' name='District' value='District' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_District.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>District</span>
              <br />
              <input type='checkbox' name='Employment_exchange' value='Employment_exchange' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Employment_exchange.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Employment_exchange</span>
              <br />
              <input type='checkbox' name='Income_revenue_authority' value='Income_revenue_authority' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Income_revenue_authority.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Income_revenue_authority</span>
              <br />
              <input type='checkbox' name='Other_office' value='Other_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Other_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Other_office</span>
              <br />
              <input type='checkbox' name='Police_headquarters' value='Police_headquarters' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Police_headquarters.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Police_headquarters</span>
              <br />
              <input type='checkbox' name='Postal_office' value='Postal_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Postal_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Postal_office</span>
              <br />
              <input type='checkbox' name='Prefecture' value='Prefecture' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Prefecture.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Prefecture</span>
              <br />
              <input type='checkbox' name='Social_security_service_office' value='Social_security_service_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Social_security_service_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Social_security_service_office</span>
              <br />
              <input type='checkbox' name='Train_lost_property_office' value='Train_lost_property_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Train_lost_property_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Train_lost_property_office</span>
              <br />
              <input type='checkbox' name='Welfare_worker_office' value='Welfare_worker_office' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Welfare_worker_office.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Welfare_worker_office</span>
              <br />
              <input type='checkbox' name='Youth_information_centre' value='Youth_information_centre' class='sub_GovernmentOffice subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Youth_information_centre.png' height='19' width='16' align='top'>
              <span class='GovernmentOffice subcategory-label'>Youth_information_centre</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='HealthCare' value='HealthCare' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare.png' height='23' width='20' align='top'> <span class='HealthCare macrocategory-label'>HealthCare</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Addiction_recovery_centre' value='Addiction_recovery_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Addiction_recovery_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Addiction_recovery_centre</span>
              <br />
              <input type='checkbox' name='Community_centre' value='Community_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Community_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Community_centre</span>
              <br />
              <input type='checkbox' name='Dentist' value='Dentist' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Dentist.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Dentist</span>
              <br />
              <input type='checkbox' name='Doctor_office' value='Doctor_office' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Doctor_office.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Doctor_office</span>
              <br />
              <input type='checkbox' name='Family_counselling' value='Family_counselling' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Family_counselling.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Family_counselling</span>
              <br />
              <input type='checkbox' name='Group_practice' value='Group_practice' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Group_practice.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Group_practice</span>
              <br />
              <input type='checkbox' name='Haircare_centres' value='Haircare_centres' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Haircare_centres.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Haircare_centres</span>
              <br />
              <input type='checkbox' name='Healthcare_centre' value='Healthcare_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Healthcare_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Healthcare_centre</span>
              <br />
              <input type='checkbox' name='Health_district' value='Health_district' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Health_district.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Health_district</span>
              <br />
              <input type='checkbox' name='Health_reservations_centre' value='Health_reservations_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Health_reservations_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Health_reservations_centre</span>
              <br />
              <input type='checkbox' name='Human_health_activities' value='Human_health_activities' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Human_health_activities.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Human_health_activities</span>
              <br />
              <input type='checkbox' name='Local_health_authority' value='Local_health_authority' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Local_health_authority.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Local_health_authority</span>
              <br />
              <input type='checkbox' name='Medical_analysis_laboratories' value='Medical_analysis_laboratories' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Medical_analysis_laboratories.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Medical_analysis_laboratories</span>
              <br />
              <input type='checkbox' name='Mental_health_centre' value='Mental_health_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Mental_health_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Mental_health_centre</span>
              <br />
              <input type='checkbox' name='Paramedical_activities' value='Paramedical_activities' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Paramedical_activities.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Paramedical_activities</span>
              <br />
              <input type='checkbox' name='Physical_therapy_centre' value='Physical_therapy_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Physical_therapy_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Physical_therapy_centre</span>
              <br />
              <input type='checkbox' name='Poison_control_centre' value='Poison_control_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Poison_control_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Poison_control_centre</span>
              <br />
              <input type='checkbox' name='Private_clinic' value='Private_clinic' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Private_clinic.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Private_clinic</span>
              <br />
              <input type='checkbox' name='Psychologists' value='Psychologists' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Psychologists.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Psychologists</span>
              <br />
              <input type='checkbox' name='Public_hospital' value='Public_hospital' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Public_hospital.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Public_hospital</span>
              <br />
              <input type='checkbox' name='Red_cross' value='Red_cross' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Red_cross.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Red_cross</span>
              <br />
              <input type='checkbox' name='Residential_care_activities' value='Residential_care_activities' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Residential_care_activities.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Residential_care_activities</span>
              <br />
              <input type='checkbox' name='Senior_centre' value='Senior_centre' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Senior_centre.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Senior_centre</span>
              <br />
              <input type='checkbox' name='Social_work' value='Social_work' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Social_work.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Social_work</span>
              <br />
              <input type='checkbox' name='Youth_assistance' value='Youth_assistance' class='sub_HealthCare subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Youth_assistance.png' height='19' width='16' align='top'>
              <span class='HealthCare subcategory-label'>Youth_assistance</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='IndustryAndManufacturing' value='IndustryAndManufacturing' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing.png' height='23' width='20' align='top'> <span class='IndustryAndManufacturing macrocategory-label'>IndustryAndManufacturing</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Animal_feeds_manufacture' value='Animal_feeds_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Animal_feeds_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Animal_feeds_manufacture</span>
              <br />
              <input type='checkbox' name='Beverage_manufacture' value='Beverage_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Beverage_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Beverage_manufacture</span>
              <br />
              <input type='checkbox' name='Building_materials_manufacture' value='Building_materials_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Building_materials_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Building_materials_manufacture</span>
              <br />
              <input type='checkbox' name='Coke_and_petroleum_derivatives' value='Coke_and_petroleum_derivatives' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Coke_and_petroleum_derivatives.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Coke_and_petroleum_derivatives</span>
              <br />
              <input type='checkbox' name='Computer_data_processing' value='Computer_data_processing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Computer_data_processing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Computer_data_processing</span>
              <br />
              <input type='checkbox' name='Computer_programming_and_consultancy' value='Computer_programming_and_consultancy' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Computer_programming_and_consultancy.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Computer_programming_and_consultancy</span>
              <br />
              <input type='checkbox' name='Food_manufacture' value='Food_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Food_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Food_manufacture</span>
              <br />
              <input type='checkbox' name='Footwear_manufacture' value='Footwear_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Footwear_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Footwear_manufacture</span>
              <br />
              <input type='checkbox' name='Ict_service' value='Ict_service' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Ict_service.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Ict_service</span>
              <br />
              <input type='checkbox' name='Installation_of_industrial_machinery' value='Installation_of_industrial_machinery' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Installation_of_industrial_machinery.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Installation_of_industrial_machinery</span>
              <br />
              <input type='checkbox' name='Knitted_manufacture' value='Knitted_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Knitted_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Knitted_manufacture</span>
              <br />
              <input type='checkbox' name='Leather_manufacture' value='Leather_manufacture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Leather_manufacture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Leather_manufacture</span>
              <br />
              <input type='checkbox' name='Machinery_repair_and_installation' value='Machinery_repair_and_installation' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Machinery_repair_and_installation.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Machinery_repair_and_installation</span>
              <br />
              <input type='checkbox' name='Manufacture_of_basic_metals' value='Manufacture_of_basic_metals' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_basic_metals.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_basic_metals</span>
              <br />
              <input type='checkbox' name='Manufacture_of_chemicals_products' value='Manufacture_of_chemicals_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_chemicals_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_chemicals_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_clay_and_ceramic' value='Manufacture_of_clay_and_ceramic' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_clay_and_ceramic.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_clay_and_ceramic</span>
              <br />
              <input type='checkbox' name='Manufacture_of_electrical_equipment' value='Manufacture_of_electrical_equipment' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_electrical_equipment.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_electrical_equipment</span>
              <br />
              <input type='checkbox' name='Manufacture_of_electronic_products' value='Manufacture_of_electronic_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_electronic_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_electronic_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_furniture' value='Manufacture_of_furniture' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_furniture.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_furniture</span>
              <br />
              <input type='checkbox' name='Manufacture_of_glass' value='Manufacture_of_glass' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_glass.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_glass</span>
              <br />
              <input type='checkbox' name='Manufacture_of_jewellery_bijouterie' value='Manufacture_of_jewellery_bijouterie' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_jewellery_bijouterie.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_jewellery_bijouterie</span>
              <br />
              <input type='checkbox' name='Manufacture_of_machinery_and_equipment' value='Manufacture_of_machinery_and_equipment' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_machinery_and_equipment.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_machinery_and_equipment</span>
              <br />
              <input type='checkbox' name='Manufacture_of_motor_vehicles' value='Manufacture_of_motor_vehicles' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_motor_vehicles.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_motor_vehicles</span>
              <br />
              <input type='checkbox' name='Manufacture_of_musical_instruments' value='Manufacture_of_musical_instruments' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_musical_instruments.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_musical_instruments</span>
              <br />
              <input type='checkbox' name='Manufacture_of_non_metallic_mineral_products' value='Manufacture_of_non_metallic_mineral_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_non_metallic_mineral_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_non_metallic_mineral_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_paper' value='Manufacture_of_paper' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_paper.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_paper</span>
              <br />
              <input type='checkbox' name='Manufacture_of_paper_products' value='Manufacture_of_paper_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_paper_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_paper_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_pharmaceutical_products' value='Manufacture_of_pharmaceutical_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_pharmaceutical_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_pharmaceutical_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_plastics_products' value='Manufacture_of_plastics_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_plastics_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_plastics_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_refined_petroleum_products' value='Manufacture_of_refined_petroleum_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_refined_petroleum_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_refined_petroleum_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_refractory_products' value='Manufacture_of_refractory_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_refractory_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_refractory_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_rubber_and_plastics_products' value='Manufacture_of_rubber_and_plastics_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_rubber_and_plastics_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_rubber_and_plastics_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_rubber_products' value='Manufacture_of_rubber_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_rubber_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_rubber_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_sports_goods' value='Manufacture_of_sports_goods' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_sports_goods.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_sports_goods</span>
              <br />
              <input type='checkbox' name='Manufacture_of_structural_metal_products' value='Manufacture_of_structural_metal_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_structural_metal_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_structural_metal_products</span>
              <br />
              <input type='checkbox' name='Manufacture_of_textiles' value='Manufacture_of_textiles' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_textiles.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_textiles</span>
              <br />
              <input type='checkbox' name='Manufacture_of_toys_and_game' value='Manufacture_of_toys_and_game' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_toys_and_game.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_toys_and_game</span>
              <br />
              <input type='checkbox' name='Manufacture_of_transport_equipment' value='Manufacture_of_transport_equipment' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_transport_equipment.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_transport_equipment</span>
              <br />
              <input type='checkbox' name='Manufacture_of_travel_articles' value='Manufacture_of_travel_articles' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_travel_articles.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_travel_articles</span>
              <br />
              <input type='checkbox' name='Manufacture_of_wearing_apparel' value='Manufacture_of_wearing_apparel' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_wearing_apparel.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_wearing_apparel</span>
              <br />
              <input type='checkbox' name='Manufacture_of_wood' value='Manufacture_of_wood' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_wood.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_wood</span>
              <br />
              <input type='checkbox' name='Manufacture_of_wood_products' value='Manufacture_of_wood_products' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Manufacture_of_wood_products.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Manufacture_of_wood_products</span>
              <br />
              <input type='checkbox' name='Mining_support_services' value='Mining_support_services' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Mining_support_services.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Mining_support_services</span>
              <br />
              <input type='checkbox' name='Other_manufacturing' value='Other_manufacturing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Other_manufacturing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Other_manufacturing</span>
              <br />
              <input type='checkbox' name='Quality_control_and_certification' value='Quality_control_and_certification' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Quality_control_and_certification.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Quality_control_and_certification</span>
              <br />
              <input type='checkbox' name='Sawmilling' value='Sawmilling' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Sawmilling.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Sawmilling</span>
              <br />
              <input type='checkbox' name='Software_publishing' value='Software_publishing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Software_publishing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Software_publishing</span>
              <br />
              <input type='checkbox' name='Specialized_design' value='Specialized_design' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Specialized_design.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Specialized_design</span>
              <br />
              <input type='checkbox' name='Stone_processing' value='Stone_processing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Stone_processing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Stone_processing</span>
              <br />
              <input type='checkbox' name='Tannery' value='Tannery' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Tannery.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Tannery</span>
              <br />
              <input type='checkbox' name='Technical_testing' value='Technical_testing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Technical_testing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Technical_testing</span>
              <br />
              <input type='checkbox' name='Textile_manufacturing' value='Textile_manufacturing' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Textile_manufacturing.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Textile_manufacturing</span>
              <br />
              <input type='checkbox' name='Tobacco_industry' value='Tobacco_industry' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Tobacco_industry.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Tobacco_industry</span>
              <br />
              <input type='checkbox' name='Web_and_internet_provider' value='Web_and_internet_provider' class='sub_IndustryAndManufacturing subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/IndustryAndManufacturing_Web_and_internet_provider.png' height='19' width='16' align='top'>
              <span class='IndustryAndManufacturing subcategory-label'>Web_and_internet_provider</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='MiningAndQuarrying' value='MiningAndQuarrying' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying.png' height='23' width='20' align='top'> <span class='MiningAndQuarrying macrocategory-label'>MiningAndQuarrying</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Extraction_of_salt' value='Extraction_of_salt' class='sub_MiningAndQuarrying subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying_Extraction_of_salt.png' height='19' width='16' align='top'>
              <span class='MiningAndQuarrying subcategory-label'>Extraction_of_salt</span>
              <br />
              <input type='checkbox' name='Mining_of_metal_ores' value='Mining_of_metal_ores' class='sub_MiningAndQuarrying subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying_Mining_of_metal_ores.png' height='19' width='16' align='top'>
              <span class='MiningAndQuarrying subcategory-label'>Mining_of_metal_ores</span>
              <br />
              <input type='checkbox' name='Other_mining_and_quarrying' value='Other_mining_and_quarrying' class='sub_MiningAndQuarrying subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying_Other_mining_and_quarrying.png' height='19' width='16' align='top'>
              <span class='MiningAndQuarrying subcategory-label'>Other_mining_and_quarrying</span>
              <br />
              <input type='checkbox' name='Petroleum_and_natural_gas_extraction' value='Petroleum_and_natural_gas_extraction' class='sub_MiningAndQuarrying subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying_Petroleum_and_natural_gas_extraction.png' height='19' width='16' align='top'>
              <span class='MiningAndQuarrying subcategory-label'>Petroleum_and_natural_gas_extraction</span>
              <br />
              <input type='checkbox' name='Quarrying_of_stone_sand_and_clay' value='Quarrying_of_stone_sand_and_clay' class='sub_MiningAndQuarrying subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/MiningAndQuarrying_Quarrying_of_stone_sand_and_clay.png' height='19' width='16' align='top'>
              <span class='MiningAndQuarrying subcategory-label'>Quarrying_of_stone_sand_and_clay</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='ShoppingAndService' value='ShoppingAndService' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService.png' height='23' width='20' align='top'> <span class='ShoppingAndService macrocategory-label'>ShoppingAndService</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Adult_clothing' value='Adult_clothing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Adult_clothing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Adult_clothing</span>
              <br />
              <input type='checkbox' name='Antiques' value='Antiques' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Antiques.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Antiques</span>
              <br />
              <input type='checkbox' name='Artisan_shop' value='Artisan_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Artisan_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Artisan_shop</span>
              <br />
              <input type='checkbox' name='Art_galleries' value='Art_galleries' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Art_galleries.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Art_galleries</span>
              <br />
              <input type='checkbox' name='Auctioning_houses' value='Auctioning_houses' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Auctioning_houses.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Auctioning_houses</span>
              <br />
              <input type='checkbox' name='Audio_and_video' value='Audio_and_video' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Audio_and_video.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Audio_and_video</span>
              <br />
              <input type='checkbox' name='Beauty_centre' value='Beauty_centre' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Beauty_centre.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Beauty_centre</span>
              <br />
              <input type='checkbox' name='Boat_equipment' value='Boat_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Boat_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Boat_equipment</span>
              <br />
              <input type='checkbox' name='Bookshop' value='Bookshop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Bookshop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Bookshop</span>
              <br />
              <input type='checkbox' name='Building_material' value='Building_material' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Building_material.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Building_material</span>
              <br />
              <input type='checkbox' name='Carpentry' value='Carpentry' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Carpentry.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Carpentry</span>
              <br />
              <input type='checkbox' name='Carpets' value='Carpets' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Carpets.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Carpets</span>
              <br />
              <input type='checkbox' name='Carpets_and_curtains' value='Carpets_and_curtains' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Carpets_and_curtains.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Carpets_and_curtains</span>
              <br />
              <input type='checkbox' name='Car_washing' value='Car_washing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Car_washing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Car_washing</span>
              <br />
              <input type='checkbox' name='Cleaning_materials' value='Cleaning_materials' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Cleaning_materials.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Cleaning_materials</span>
              <br />
              <input type='checkbox' name='Clothing' value='Clothing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Clothing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Clothing</span>
              <br />
              <input type='checkbox' name='Clothing_accessories' value='Clothing_accessories' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Clothing_accessories.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Clothing_accessories</span>
              <br />
              <input type='checkbox' name='Clothing_and_linen' value='Clothing_and_linen' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Clothing_and_linen.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Clothing_and_linen</span>
              <br />
              <input type='checkbox' name='Clothing_children_and_infants' value='Clothing_children_and_infants' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Clothing_children_and_infants.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Clothing_children_and_infants</span>
              <br />
              <input type='checkbox' name='Clothing_factory_outlet' value='Clothing_factory_outlet' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Clothing_factory_outlet.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Clothing_factory_outlet</span>
              <br />
              <input type='checkbox' name='Coffee_rosters' value='Coffee_rosters' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Coffee_rosters.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Coffee_rosters</span>
              <br />
              <input type='checkbox' name='Computer_systems' value='Computer_systems' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Computer_systems.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Computer_systems</span>
              <br />
              <input type='checkbox' name='Computer_technician' value='Computer_technician' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Computer_technician.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Computer_technician</span>
              <br />
              <input type='checkbox' name='Cultural_and_recreation_goods' value='Cultural_and_recreation_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Cultural_and_recreation_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Cultural_and_recreation_goods</span>
              <br />
              <input type='checkbox' name='Curtains_and_net_curtains' value='Curtains_and_net_curtains' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Curtains_and_net_curtains.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Curtains_and_net_curtains</span>
              <br />
              <input type='checkbox' name='Dairy_products' value='Dairy_products' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Dairy_products.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Dairy_products</span>
              <br />
              <input type='checkbox' name='Dating_service' value='Dating_service' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Dating_service.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Dating_service</span>
              <br />
              <input type='checkbox' name='Diet_products' value='Diet_products' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Diet_products.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Diet_products</span>
              <br />
              <input type='checkbox' name='Discount' value='Discount' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Discount.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Discount</span>
              <br />
              <input type='checkbox' name='Door_to_door' value='Door_to_door' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Door_to_door.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Door_to_door</span>
              <br />
              <input type='checkbox' name='Estate_activities' value='Estate_activities' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Estate_activities.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Estate_activities</span>
              <br />
              <input type='checkbox' name='Fine_arts_articles' value='Fine_arts_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Fine_arts_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Fine_arts_articles</span>
              <br />
              <input type='checkbox' name='Fish_and_seafood' value='Fish_and_seafood' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Fish_and_seafood.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Fish_and_seafood</span>
              <br />
              <input type='checkbox' name='Flower_shop' value='Flower_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Flower_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Flower_shop</span>
              <br />
              <input type='checkbox' name='Food_and_tobacconist' value='Food_and_tobacconist' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Food_and_tobacconist.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Food_and_tobacconist</span>
              <br />
              <input type='checkbox' name='Footwear_and_accessories' value='Footwear_and_accessories' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Footwear_and_accessories.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Footwear_and_accessories</span>
              <br />
              <input type='checkbox' name='Footwear_and_leather_goods' value='Footwear_and_leather_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Footwear_and_leather_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Footwear_and_leather_goods</span>
              <br />
              <input type='checkbox' name='Footwear_factory_outlet' value='Footwear_factory_outlet' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Footwear_factory_outlet.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Footwear_factory_outlet</span>
              <br />
              <input type='checkbox' name='Frozen_food' value='Frozen_food' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Frozen_food.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Frozen_food</span>
              <br />
              <input type='checkbox' name='Fruit_and_vegetables' value='Fruit_and_vegetables' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Fruit_and_vegetables.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Fruit_and_vegetables</span>
              <br />
              <input type='checkbox' name='Funeral' value='Funeral' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Funeral.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Funeral</span>
              <br />
              <input type='checkbox' name='Funeral_and_cemetery_articles' value='Funeral_and_cemetery_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Funeral_and_cemetery_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Funeral_and_cemetery_articles</span>
              <br />
              <input type='checkbox' name='Fur_and_leather_clothing' value='Fur_and_leather_clothing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Fur_and_leather_clothing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Fur_and_leather_clothing</span>
              <br />
              <input type='checkbox' name='Games_and_toys' value='Games_and_toys' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Games_and_toys.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Games_and_toys</span>
              <br />
              <input type='checkbox' name='Garden_and_agriculture' value='Garden_and_agriculture' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Garden_and_agriculture.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Garden_and_agriculture</span>
              <br />
              <input type='checkbox' name='Gifts_and_smoking_articles' value='Gifts_and_smoking_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Gifts_and_smoking_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Gifts_and_smoking_articles</span>
              <br />
              <input type='checkbox' name='Haberdashery' value='Haberdashery' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Haberdashery.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Haberdashery</span>
              <br />
              <input type='checkbox' name='Hairdressing' value='Hairdressing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Hairdressing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Hairdressing</span>
              <br />
              <input type='checkbox' name='Hairdressing_and_beauty_treatment' value='Hairdressing_and_beauty_treatment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Hairdressing_and_beauty_treatment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Hairdressing_and_beauty_treatment</span>
              <br />
              <input type='checkbox' name='Hardware_electrical_plumbing_and_heating' value='Hardware_electrical_plumbing_and_heating' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Hardware_electrical_plumbing_and_heating.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Hardware_electrical_plumbing_and_heating</span>
              <br />
              <input type='checkbox' name='Hardware_paints_and_glass' value='Hardware_paints_and_glass' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Hardware_paints_and_glass.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Hardware_paints_and_glass</span>
              <br />
              <input type='checkbox' name='Herbalists_shop' value='Herbalists_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Herbalists_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Herbalists_shop</span>
              <br />
              <input type='checkbox' name='Household_appliances_shop' value='Household_appliances_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_appliances_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_appliances_shop</span>
              <br />
              <input type='checkbox' name='Household_articles' value='Household_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_articles</span>
              <br />
              <input type='checkbox' name='Household_fuel' value='Household_fuel' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_fuel.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_fuel</span>
              <br />
              <input type='checkbox' name='Household_furniture' value='Household_furniture' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_furniture.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_furniture</span>
              <br />
              <input type='checkbox' name='Household_products' value='Household_products' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_products.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_products</span>
              <br />
              <input type='checkbox' name='Household_utensils' value='Household_utensils' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Household_utensils.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Household_utensils</span>
              <br />
              <input type='checkbox' name='Hypermarket' value='Hypermarket' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Hypermarket.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Hypermarket</span>
              <br />
              <input type='checkbox' name='Industrial_laundries' value='Industrial_laundries' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Industrial_laundries.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Industrial_laundries</span>
              <br />
              <input type='checkbox' name='Jeweller' value='Jeweller' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Jeweller.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Jeweller</span>
              <br />
              <input type='checkbox' name='Jewellery' value='Jewellery' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Jewellery.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Jewellery</span>
              <br />
              <input type='checkbox' name='Laundries_and_dry_cleaners' value='Laundries_and_dry_cleaners' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Laundries_and_dry_cleaners.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Laundries_and_dry_cleaners</span>
              <br />
              <input type='checkbox' name='Lighting' value='Lighting' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Lighting.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Lighting</span>
              <br />
              <input type='checkbox' name='Maintenance_repair_of_motorcycles' value='Maintenance_repair_of_motorcycles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Maintenance_repair_of_motorcycles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Maintenance_repair_of_motorcycles</span>
              <br />
              <input type='checkbox' name='Maintenance_repair_of_motor_vehicles' value='Maintenance_repair_of_motor_vehicles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Maintenance_repair_of_motor_vehicles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Maintenance_repair_of_motor_vehicles</span>
              <br />
              <input type='checkbox' name='Manicure_and_pedicure' value='Manicure_and_pedicure' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Manicure_and_pedicure.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Manicure_and_pedicure</span>
              <br />
              <input type='checkbox' name='Meat_and_poultry' value='Meat_and_poultry' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Meat_and_poultry.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Meat_and_poultry</span>
              <br />
              <input type='checkbox' name='Mechanic_workshop' value='Mechanic_workshop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Mechanic_workshop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Mechanic_workshop</span>
              <br />
              <input type='checkbox' name='Medical_and_orthopaedic_goods' value='Medical_and_orthopaedic_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Medical_and_orthopaedic_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Medical_and_orthopaedic_goods</span>
              <br />
              <input type='checkbox' name='Minimarket' value='Minimarket' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Minimarket.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Minimarket</span>
              <br />
              <input type='checkbox' name='Motorcycles_parts_wholesale_and_retail' value='Motorcycles_parts_wholesale_and_retail' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Motorcycles_parts_wholesale_and_retail.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Motorcycles_parts_wholesale_and_retail</span>
              <br />
              <input type='checkbox' name='Motorcycles_wholesale_and_retail' value='Motorcycles_wholesale_and_retail' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Motorcycles_wholesale_and_retail.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Motorcycles_wholesale_and_retail</span>
              <br />
              <input type='checkbox' name='Motor_vehicles_wholesale_and_retail' value='Motor_vehicles_wholesale_and_retail' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Motor_vehicles_wholesale_and_retail.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Motor_vehicles_wholesale_and_retail</span>
              <br />
              <input type='checkbox' name='Musical_instruments_and_scores' value='Musical_instruments_and_scores' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Musical_instruments_and_scores.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Musical_instruments_and_scores</span>
              <br />
              <input type='checkbox' name='Music_and_video_recordings' value='Music_and_video_recordings' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Music_and_video_recordings.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Music_and_video_recordings</span>
              <br />
              <input type='checkbox' name='Newspapers_and_stationery' value='Newspapers_and_stationery' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Newspapers_and_stationery.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Newspapers_and_stationery</span>
              <br />
              <input type='checkbox' name='Non_food_large_retailers' value='Non_food_large_retailers' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Non_food_large_retailers.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Non_food_large_retailers</span>
              <br />
              <input type='checkbox' name='Non_food_products' value='Non_food_products' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Non_food_products.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Non_food_products</span>
              <br />
              <input type='checkbox' name='Office_furniture' value='Office_furniture' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Office_furniture.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Office_furniture</span>
              <br />
              <input type='checkbox' name='Optics_and_photography' value='Optics_and_photography' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Optics_and_photography.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Optics_and_photography</span>
              <br />
              <input type='checkbox' name='Other_goods' value='Other_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Other_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Other_goods</span>
              <br />
              <input type='checkbox' name='Other_retail_sale' value='Other_retail_sale' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Other_retail_sale.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Other_retail_sale</span>
              <br />
              <input type='checkbox' name='Parties_and_ceremonies' value='Parties_and_ceremonies' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Parties_and_ceremonies.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Parties_and_ceremonies</span>
              <br />
              <input type='checkbox' name='Perfumery_and_cosmetic_articles' value='Perfumery_and_cosmetic_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Perfumery_and_cosmetic_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Perfumery_and_cosmetic_articles</span>
              <br />
              <input type='checkbox' name='Personal_service_activities' value='Personal_service_activities' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Personal_service_activities.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Personal_service_activities</span>
              <br />
              <input type='checkbox' name='Pet_care_services' value='Pet_care_services' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Pet_care_services.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Pet_care_services</span>
              <br />
              <input type='checkbox' name='Pet_shop' value='Pet_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Pet_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Pet_shop</span>
              <br />
              <input type='checkbox' name='Pharmaceuticals' value='Pharmaceuticals' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Pharmaceuticals.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Pharmaceuticals</span>
              <br />
              <input type='checkbox' name='Pharmacy' value='Pharmacy' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Pharmacy.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Pharmacy</span>
              <br />
              <input type='checkbox' name='Repair' value='Repair' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair</span>
              <br />
              <input type='checkbox' name='Repair_musical_instruments' value='Repair_musical_instruments' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_musical_instruments.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_musical_instruments</span>
              <br />
              <input type='checkbox' name='Repair_of_communication_equipment' value='Repair_of_communication_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_communication_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_communication_equipment</span>
              <br />
              <input type='checkbox' name='Repair_of_consumer_electronics' value='Repair_of_consumer_electronics' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_consumer_electronics.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_consumer_electronics</span>
              <br />
              <input type='checkbox' name='Repair_of_footwear_and_leather_goods' value='Repair_of_footwear_and_leather_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_footwear_and_leather_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_footwear_and_leather_goods</span>
              <br />
              <input type='checkbox' name='Repair_of_garden_equipment' value='Repair_of_garden_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_garden_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_garden_equipment</span>
              <br />
              <input type='checkbox' name='Repair_of_home_equipment' value='Repair_of_home_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_home_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_home_equipment</span>
              <br />
              <input type='checkbox' name='Repair_of_household_appliances' value='Repair_of_household_appliances' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_household_appliances.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_household_appliances</span>
              <br />
              <input type='checkbox' name='Repair_of_sporting_goods' value='Repair_of_sporting_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Repair_of_sporting_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Repair_of_sporting_goods</span>
              <br />
              <input type='checkbox' name='Restorers' value='Restorers' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Restorers.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Restorers</span>
              <br />
              <input type='checkbox' name='Retail_motor_vehicles_parts' value='Retail_motor_vehicles_parts' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Retail_motor_vehicles_parts.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Retail_motor_vehicles_parts</span>
              <br />
              <input type='checkbox' name='Retail_sale_non_specialized_stores' value='Retail_sale_non_specialized_stores' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Retail_sale_non_specialized_stores.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Retail_sale_non_specialized_stores</span>
              <br />
              <input type='checkbox' name='Retail_trade' value='Retail_trade' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Retail_trade.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Retail_trade</span>
              <br />
              <input type='checkbox' name='Rope_cord_and_twine' value='Rope_cord_and_twine' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Rope_cord_and_twine.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Rope_cord_and_twine</span>
              <br />
              <input type='checkbox' name='Sale_motor_vehicles_parts' value='Sale_motor_vehicles_parts' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sale_motor_vehicles_parts.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sale_motor_vehicles_parts</span>
              <br />
              <input type='checkbox' name='Sale_of_motorcycles' value='Sale_of_motorcycles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sale_of_motorcycles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sale_of_motorcycles</span>
              <br />
              <input type='checkbox' name='Sale_of_motor_vehicles' value='Sale_of_motor_vehicles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sale_of_motor_vehicles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sale_of_motor_vehicles</span>
              <br />
              <input type='checkbox' name='Sale_of_motor_vehicles_and_motorcycles' value='Sale_of_motor_vehicles_and_motorcycles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sale_of_motor_vehicles_and_motorcycles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sale_of_motor_vehicles_and_motorcycles</span>
              <br />
              <input type='checkbox' name='Sale_via_mail_order_houses_or_via_internet' value='Sale_via_mail_order_houses_or_via_internet' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sale_via_mail_order_houses_or_via_internet.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sale_via_mail_order_houses_or_via_internet</span>
              <br />
              <input type='checkbox' name='Sanitary_equipment' value='Sanitary_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sanitary_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sanitary_equipment</span>
              <br />
              <input type='checkbox' name='Second_hand_books' value='Second_hand_books' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Second_hand_books.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Second_hand_books</span>
              <br />
              <input type='checkbox' name='Second_hand_goods' value='Second_hand_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Second_hand_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Second_hand_goods</span>
              <br />
              <input type='checkbox' name='Security_systems' value='Security_systems' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Security_systems.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Security_systems</span>
              <br />
              <input type='checkbox' name='Sexy_shop' value='Sexy_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sexy_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sexy_shop</span>
              <br />
              <input type='checkbox' name='Shopping_centre' value='Shopping_centre' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Shopping_centre.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Shopping_centre</span>
              <br />
              <input type='checkbox' name='Single_brand_store' value='Single_brand_store' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Single_brand_store.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Single_brand_store</span>
              <br />
              <input type='checkbox' name='Small_household_appliances' value='Small_household_appliances' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Small_household_appliances.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Small_household_appliances</span>
              <br />
              <input type='checkbox' name='Souvenirs_craftwork_and_religious_articles' value='Souvenirs_craftwork_and_religious_articles' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Souvenirs_craftwork_and_religious_articles.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Souvenirs_craftwork_and_religious_articles</span>
              <br />
              <input type='checkbox' name='Sporting_equipment' value='Sporting_equipment' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Sporting_equipment.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Sporting_equipment</span>
              <br />
              <input type='checkbox' name='Stalls_and_markets' value='Stalls_and_markets' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Stalls_and_markets.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Stalls_and_markets</span>
              <br />
              <input type='checkbox' name='Stalls_and_markets_of_clothing_and_footwear' value='Stalls_and_markets_of_clothing_and_footwear' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Stalls_and_markets_of_clothing_and_footwear.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Stalls_and_markets_of_clothing_and_footwear</span>
              <br />
              <input type='checkbox' name='Stalls_and_markets_of_food' value='Stalls_and_markets_of_food' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Stalls_and_markets_of_food.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Stalls_and_markets_of_food</span>
              <br />
              <input type='checkbox' name='Stalls_and_markets_other_goods' value='Stalls_and_markets_other_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Stalls_and_markets_other_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Stalls_and_markets_other_goods</span>
              <br />
              <input type='checkbox' name='Stamps_and_coins' value='Stamps_and_coins' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Stamps_and_coins.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Stamps_and_coins</span>
              <br />
              <input type='checkbox' name='Supermarket' value='Supermarket' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Supermarket.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Supermarket</span>
              <br />
              <input type='checkbox' name='Tattoo_and_piercing' value='Tattoo_and_piercing' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Tattoo_and_piercing.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Tattoo_and_piercing</span>
              <br />
              <input type='checkbox' name='Telecommunications' value='Telecommunications' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Telecommunications.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Telecommunications</span>
              <br />
              <input type='checkbox' name='Textiles_products' value='Textiles_products' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Textiles_products.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Textiles_products</span>
              <br />
              <input type='checkbox' name='Tobacco_shop' value='Tobacco_shop' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Tobacco_shop.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Tobacco_shop</span>
              <br />
              <input type='checkbox' name='Travel_goods' value='Travel_goods' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Travel_goods.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Travel_goods</span>
              <br />
              <input type='checkbox' name='Trinkets' value='Trinkets' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Trinkets.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Trinkets</span>
              <br />
              <input type='checkbox' name='Underwear_knitwear_and_shirts' value='Underwear_knitwear_and_shirts' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Underwear_knitwear_and_shirts.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Underwear_knitwear_and_shirts</span>
              <br />
              <input type='checkbox' name='Upholsterer' value='Upholsterer' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Upholsterer.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Upholsterer</span>
              <br />
              <input type='checkbox' name='Vacating_service' value='Vacating_service' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Vacating_service.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Vacating_service</span>
              <br />
              <input type='checkbox' name='Vehicle_trade' value='Vehicle_trade' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Vehicle_trade.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Vehicle_trade</span>
              <br />
              <input type='checkbox' name='Vending_machines' value='Vending_machines' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Vending_machines.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Vending_machines</span>
              <br />
              <input type='checkbox' name='Wallpaper_and_floor_coverings' value='Wallpaper_and_floor_coverings' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Wallpaper_and_floor_coverings.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Wallpaper_and_floor_coverings</span>
              <br />
              <input type='checkbox' name='Weapons_and_ammunition' value='Weapons_and_ammunition' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Weapons_and_ammunition.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Weapons_and_ammunition</span>
              <br />
              <input type='checkbox' name='Wedding_favors' value='Wedding_favors' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Wedding_favors.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Wedding_favors</span>
              <br />
              <input type='checkbox' name='Wellness_centre' value='Wellness_centre' class='sub_ShoppingAndService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Wellness_centre.png' height='19' width='16' align='top'>
              <span class='ShoppingAndService subcategory-label'>Wellness_centre</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='TourismService' value='TourismService' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService.png' height='23' width='20' align='top'> <span class='TourismService macrocategory-label'>TourismService</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Beacon' value='Beacon' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Beacon.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Beacon</span>
              <br />
              <input type='checkbox' name='Camper_service' value='Camper_service' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Camper_service.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Camper_service</span>
              <br />
              <input type='checkbox' name='Fresh_place' value='Fresh_place' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Fresh_place.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Fresh_place</span>
              <br />
              <input type='checkbox' name='Pedestrian_zone' value='Pedestrian_zone' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Pedestrian_zone.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Pedestrian_zone</span>
              <br />
              <input type='checkbox' name='Ticket_sale' value='Ticket_sale' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Ticket_sale.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Ticket_sale</span>
              <br />
              <input type='checkbox' name='Toilet' value='Toilet' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Toilet.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Toilet</span>
              <br />
              <input type='checkbox' name='Tourist_complaints_office' value='Tourist_complaints_office' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_complaints_office.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Tourist_complaints_office</span>
              <br />
              <input type='checkbox' name='Tourist_guides' value='Tourist_guides' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_guides.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Tourist_guides</span>
              <br />
              <input type='checkbox' name='Tourist_information_office' value='Tourist_information_office' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_information_office.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Tourist_information_office</span>
              <br />
              <input type='checkbox' name='Tourist_trail' value='Tourist_trail' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_trail.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Tourist_trail</span>
              <br />
              <input type='checkbox' name='Tour_operator' value='Tour_operator' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tour_operator.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Tour_operator</span>
              <br />
              <input type='checkbox' name='Travel_agency' value='Travel_agency' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Travel_agency.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Travel_agency</span>
              <br />
              <input type='checkbox' name='Travel_bureau' value='Travel_bureau' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Travel_bureau.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Travel_bureau</span>
              <br />
              <input type='checkbox' name='Travel_information' value='Travel_information' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Travel_information.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Travel_information</span>
              <br />
              <input type='checkbox' name='Wifi' value='Wifi' class='sub_TourismService subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Wifi.png' height='19' width='16' align='top'>
              <span class='TourismService subcategory-label'>Wifi</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='TransferServiceAndRenting' value='TransferServiceAndRenting' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting.png' height='23' width='20' align='top'> <span class='TransferServiceAndRenting macrocategory-label'>TransferServiceAndRenting</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Airfields' value='Airfields' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Airfields.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Airfields</span>
              <br />
              <input type='checkbox' name='Airplanes_rental' value='Airplanes_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Airplanes_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Airplanes_rental</span>
              <br />
              <input type='checkbox' name='Bike_rack' value='Bike_rack' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Bike_rack.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Bike_rack</span>
              <br />
              <input type='checkbox' name='Bike_rental' value='Bike_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Bike_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Bike_rental</span>
              <br />
              <input type='checkbox' name='Boats_and_ships_rental' value='Boats_and_ships_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Boats_and_ships_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Boats_and_ships_rental</span>
              <br />
              <input type='checkbox' name='BusStop' value='BusStop' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_BusStop.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>BusStop</span>
              <br />
              <input type='checkbox' name='Bus_tickets_retail' value='Bus_tickets_retail' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Bus_tickets_retail.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Bus_tickets_retail</span>
              <br />
              <input type='checkbox' name='Cargo_handling' value='Cargo_handling' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Cargo_handling.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Cargo_handling</span>
              <br />
              <input type='checkbox' name='Car_park' value='Car_park' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Car_park.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Car_park</span>
              <br />
              <input type='checkbox' name='Car_rental_with_driver' value='Car_rental_with_driver' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Car_rental_with_driver.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Car_rental_with_driver</span>
              <br />
              <input type='checkbox' name='Charging_stations' value='Charging_stations' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Charging_stations.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Charging_stations</span>
              <br />
              <input type='checkbox' name='Charter_airlines' value='Charter_airlines' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Charter_airlines.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Charter_airlines</span>
              <br />
              <input type='checkbox' name='Civil_airport' value='Civil_airport' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Civil_airport.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Civil_airport</span>
              <br />
              <input type='checkbox' name='Controlled_parking_zone' value='Controlled_parking_zone' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Controlled_parking_zone.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Controlled_parking_zone</span>
              <br />
              <input type='checkbox' name='Courier' value='Courier' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Courier.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Courier</span>
              <br />
              <input type='checkbox' name='Cycle_paths' value='Cycle_paths' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Cycle_paths.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Cycle_paths</span>
              <br />
              <input type='checkbox' name='Flight_companies' value='Flight_companies' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Flight_companies.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Flight_companies</span>
              <br />
              <input type='checkbox' name='Freight_transport_and_furniture_removal' value='Freight_transport_and_furniture_removal' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Freight_transport_and_furniture_removal.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Freight_transport_and_furniture_removal</span>
              <br />
              <input type='checkbox' name='Fuel_station' value='Fuel_station' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Fuel_station.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Fuel_station</span>
              <br />
              <input type='checkbox' name='Helipads' value='Helipads' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Helipads.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Helipads</span>
              <br />
              <input type='checkbox' name='Land_transport' value='Land_transport' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Land_transport.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Land_transport</span>
              <br />
              <input type='checkbox' name='Land_transport_rental' value='Land_transport_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Land_transport_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Land_transport_rental</span>
              <br />
              <input type='checkbox' name='Lifting_and_handling_equipment_rental' value='Lifting_and_handling_equipment_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Lifting_and_handling_equipment_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Lifting_and_handling_equipment_rental</span>
              <br />
              <input type='checkbox' name='Logistics_activities' value='Logistics_activities' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Logistics_activities.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Logistics_activities</span>
              <br />
              <input type='checkbox' name='Passenger_air_transport' value='Passenger_air_transport' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Passenger_air_transport.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Passenger_air_transport</span>
              <br />
              <input type='checkbox' name='Postal_and_courier_activities' value='Postal_and_courier_activities' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Postal_and_courier_activities.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Postal_and_courier_activities</span>
              <br />
              <input type='checkbox' name='RTZgate' value='RTZgate' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_RTZgate.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>RTZgate</span>
              <br />
              <input type='checkbox' name='SensorSite' value='SensorSite' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_SensorSite.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>SensorSite</span>
              <br />
              <input type='checkbox' name='Support_activities_for_transportation' value='Support_activities_for_transportation' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Support_activities_for_transportation.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Support_activities_for_transportation</span>
              <br />
              <input type='checkbox' name='Taxi_company' value='Taxi_company' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Taxi_company.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Taxi_company</span>
              <br />
              <input type='checkbox' name='Taxi_park' value='Taxi_park' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Taxi_park.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Taxi_park</span>
              <br />
              <input type='checkbox' name='Train_station' value='Train_station' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Train_station.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Train_station</span>
              <br />
              <input type='checkbox' name='Tramline' value='Tramline' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Tramline.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Tramline</span>
              <br />
              <input type='checkbox' name='Tram_stops' value='Tram_stops' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Tram_stops.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Tram_stops</span>
              <br />
              <input type='checkbox' name='Urban_bus' value='Urban_bus' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Urban_bus.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Urban_bus</span>
              <br />
              <input type='checkbox' name='Vehicle_rental' value='Vehicle_rental' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Vehicle_rental.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Vehicle_rental</span>
              <br />
              <input type='checkbox' name='Warehousing_and_storage' value='Warehousing_and_storage' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Warehousing_and_storage.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Warehousing_and_storage</span>
              <br />
              <input type='checkbox' name='Water_transport' value='Water_transport' class='sub_TransferServiceAndRenting subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Water_transport.png' height='19' width='16' align='top'>
              <span class='TransferServiceAndRenting subcategory-label'>Water_transport</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='UtilitiesAndSupply' value='UtilitiesAndSupply' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply.png' height='23' width='20' align='top'> <span class='UtilitiesAndSupply macrocategory-label'>UtilitiesAndSupply</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Accommodation_or_office_containers_rental' value='Accommodation_or_office_containers_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Accommodation_or_office_containers_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Accommodation_or_office_containers_rental</span>
              <br />
              <input type='checkbox' name='Agents' value='Agents' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Agents.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Agents</span>
              <br />
              <input type='checkbox' name='Associations' value='Associations' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Associations.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Associations</span>
              <br />
              <input type='checkbox' name='Business_support' value='Business_support' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Business_support.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Business_support</span>
              <br />
              <input type='checkbox' name='Call_center' value='Call_center' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Call_center.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Call_center</span>
              <br />
              <input type='checkbox' name='Combined_facilities_support_activities' value='Combined_facilities_support_activities' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Combined_facilities_support_activities.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Combined_facilities_support_activities</span>
              <br />
              <input type='checkbox' name='Consulting_services' value='Consulting_services' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Consulting_services.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Consulting_services</span>
              <br />
              <input type='checkbox' name='Credit_collection_agencies' value='Credit_collection_agencies' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Credit_collection_agencies.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Credit_collection_agencies</span>
              <br />
              <input type='checkbox' name='Energy_supply' value='Energy_supply' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Energy_supply.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Energy_supply</span>
              <br />
              <input type='checkbox' name='Equipment_for_events_and_shows_rental' value='Equipment_for_events_and_shows_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Equipment_for_events_and_shows_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Equipment_for_events_and_shows_rental</span>
              <br />
              <input type='checkbox' name='Extraction_of_natural_gas' value='Extraction_of_natural_gas' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Extraction_of_natural_gas.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Extraction_of_natural_gas</span>
              <br />
              <input type='checkbox' name='Internet_point_and_public_telephone' value='Internet_point_and_public_telephone' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Internet_point_and_public_telephone.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Internet_point_and_public_telephone</span>
              <br />
              <input type='checkbox' name='Internet_service_provider' value='Internet_service_provider' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Internet_service_provider.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Internet_service_provider</span>
              <br />
              <input type='checkbox' name='Investigation_activities' value='Investigation_activities' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Investigation_activities.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Investigation_activities</span>
              <br />
              <input type='checkbox' name='Machinery_and_equipment_rental' value='Machinery_and_equipment_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Machinery_and_equipment_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Machinery_and_equipment_rental</span>
              <br />
              <input type='checkbox' name='Management_consultancy' value='Management_consultancy' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Management_consultancy.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Management_consultancy</span>
              <br />
              <input type='checkbox' name='Office_administrative_and_support_activities' value='Office_administrative_and_support_activities' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Office_administrative_and_support_activities.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Office_administrative_and_support_activities</span>
              <br />
              <input type='checkbox' name='Organization_of_conventions_and_trade_shows' value='Organization_of_conventions_and_trade_shows' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Organization_of_conventions_and_trade_shows.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Organization_of_conventions_and_trade_shows</span>
              <br />
              <input type='checkbox' name='Other_telecommunications_activities' value='Other_telecommunications_activities' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Other_telecommunications_activities.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Other_telecommunications_activities</span>
              <br />
              <input type='checkbox' name='Packaging_activities' value='Packaging_activities' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Packaging_activities.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Packaging_activities</span>
              <br />
              <input type='checkbox' name='Personal_and_household_goods_rental' value='Personal_and_household_goods_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Personal_and_household_goods_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Personal_and_household_goods_rental</span>
              <br />
              <input type='checkbox' name='Private_security' value='Private_security' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Private_security.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Private_security</span>
              <br />
              <input type='checkbox' name='Recreational_and_sports_goods_rental' value='Recreational_and_sports_goods_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Recreational_and_sports_goods_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Recreational_and_sports_goods_rental</span>
              <br />
              <input type='checkbox' name='Recruitment' value='Recruitment' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Recruitment.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Recruitment</span>
              <br />
              <input type='checkbox' name='Reporting_agencies' value='Reporting_agencies' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Reporting_agencies.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Reporting_agencies</span>
              <br />
              <input type='checkbox' name='Secretarial_support_services' value='Secretarial_support_services' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Secretarial_support_services.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Secretarial_support_services</span>
              <br />
              <input type='checkbox' name='Security_systems_service' value='Security_systems_service' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Security_systems_service.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Security_systems_service</span>
              <br />
              <input type='checkbox' name='Temp_agency' value='Temp_agency' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Temp_agency.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Temp_agency</span>
              <br />
              <input type='checkbox' name='Video_tapes_disks_rental' value='Video_tapes_disks_rental' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Video_tapes_disks_rental.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Video_tapes_disks_rental</span>
              <br />
              <input type='checkbox' name='Water_collection_treatment_and_supply' value='Water_collection_treatment_and_supply' class='sub_UtilitiesAndSupply subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/UtilitiesAndSupply_Water_collection_treatment_and_supply.png' height='19' width='16' align='top'>
              <span class='UtilitiesAndSupply subcategory-label'>Water_collection_treatment_and_supply</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Wholesale' value='Wholesale' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale.png' height='23' width='20' align='top'> <span class='Wholesale macrocategory-label'>Wholesale</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Non_specialized_wholesale_trade' value='Non_specialized_wholesale_trade' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Non_specialized_wholesale_trade.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Non_specialized_wholesale_trade</span>
              <br />
              <input type='checkbox' name='Other_specialized_wholesale' value='Other_specialized_wholesale' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Other_specialized_wholesale.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Other_specialized_wholesale</span>
              <br />
              <input type='checkbox' name='Wholesale_agricultural_raw_materials_live_animals' value='Wholesale_agricultural_raw_materials_live_animals' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_agricultural_raw_materials_live_animals.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_agricultural_raw_materials_live_animals</span>
              <br />
              <input type='checkbox' name='Wholesale_commission_trade' value='Wholesale_commission_trade' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_commission_trade.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_commission_trade</span>
              <br />
              <input type='checkbox' name='Wholesale_food_beverages_tobacco' value='Wholesale_food_beverages_tobacco' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_food_beverages_tobacco.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_food_beverages_tobacco</span>
              <br />
              <input type='checkbox' name='Wholesale_household_goods' value='Wholesale_household_goods' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_household_goods.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_household_goods</span>
              <br />
              <input type='checkbox' name='Wholesale_ict_equipment' value='Wholesale_ict_equipment' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_ict_equipment.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_ict_equipment</span>
              <br />
              <input type='checkbox' name='Wholesale_machinery_equipmentent_supplies' value='Wholesale_machinery_equipmentent_supplies' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_machinery_equipmentent_supplies.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_machinery_equipmentent_supplies</span>
              <br />
              <input type='checkbox' name='Wholesale_motor_vehicles_parts' value='Wholesale_motor_vehicles_parts' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_motor_vehicles_parts.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_motor_vehicles_parts</span>
              <br />
              <input type='checkbox' name='Wholesale_trade' value='Wholesale_trade' class='sub_Wholesale subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Wholesale_Wholesale_trade.png' height='19' width='16' align='top'>
              <span class='Wholesale subcategory-label'>Wholesale_trade</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='WineAndFood' value='WineAndFood' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood.png' height='23' width='20' align='top'> <span class='WineAndFood macrocategory-label'>WineAndFood</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Bakery' value='Bakery' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Bakery.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Bakery</span>
              <br />
              <input type='checkbox' name='Bar' value='Bar' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Bar.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Bar</span>
              <br />
              <input type='checkbox' name='Canteens_and_food_service' value='Canteens_and_food_service' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Canteens_and_food_service.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Canteens_and_food_service</span>
              <br />
              <input type='checkbox' name='Catering' value='Catering' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Catering.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Catering</span>
              <br />
              <input type='checkbox' name='Dining_hall' value='Dining_hall' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Dining_hall.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Dining_hall</span>
              <br />
              <input type='checkbox' name='Drinking_fountain' value='Drinking_fountain' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Drinking_fountain.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Drinking_fountain</span>
              <br />
              <input type='checkbox' name='Food_and_ice_cream_truck' value='Food_and_ice_cream_truck' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Food_and_ice_cream_truck.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Food_and_ice_cream_truck</span>
              <br />
              <input type='checkbox' name='Food_trade' value='Food_trade' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Food_trade.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Food_trade</span>
              <br />
              <input type='checkbox' name='Grill' value='Grill' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Grill.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Grill</span>
              <br />
              <input type='checkbox' name='Highway_stop' value='Highway_stop' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Highway_stop.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Highway_stop</span>
              <br />
              <input type='checkbox' name='Ice_cream_parlour' value='Ice_cream_parlour' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Ice_cream_parlour.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Ice_cream_parlour</span>
              <br />
              <input type='checkbox' name='Literary_cafe' value='Literary_cafe' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Literary_cafe.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Literary_cafe</span>
              <br />
              <input type='checkbox' name='Pastry_shop' value='Pastry_shop' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Pastry_shop.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Pastry_shop</span>
              <br />
              <input type='checkbox' name='Pizzeria' value='Pizzeria' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Pizzeria.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Pizzeria</span>
              <br />
              <input type='checkbox' name='Restaurant' value='Restaurant' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Restaurant.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Restaurant</span>
              <br />
              <input type='checkbox' name='Sandwich_shop_pub' value='Sandwich_shop_pub' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Sandwich_shop_pub.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Sandwich_shop_pub</span>
              <br />
              <input type='checkbox' name='Small_shop' value='Small_shop' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Small_shop.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Small_shop</span>
              <br />
              <input type='checkbox' name='Sushi_bar' value='Sushi_bar' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Sushi_bar.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Sushi_bar</span>
              <br />
              <input type='checkbox' name='Take_away' value='Take_away' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Take_away.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Take_away</span>
              <br />
              <input type='checkbox' name='Trattoria' value='Trattoria' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Trattoria.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Trattoria</span>
              <br />
              <input type='checkbox' name='Wine_shop_and_wine_bar' value='Wine_shop_and_wine_bar' class='sub_WineAndFood subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Wine_shop_and_wine_bar.png' height='19' width='16' align='top'>
              <span class='WineAndFood subcategory-label'>Wine_shop_and_wine_bar</span>
              <br />
            </div>
            <br />
            <br />

          </div>
          <span name="lbl" caption="Num_Results_dx_R">N. results</span>:
          <select id="nResultsServizi" name="nResultsServizi">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100" selected="selected">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="0">No Limit</option>
          </select>
          <br />
          <hr />

          <!-- <input type="checkbox" name="road-sensor" value="RoadSensor" id="Sensor" class="macrocategory" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/RoadSensor.png' height='19' width='16' align='top'/> <span class="road-sensor macrocategory-label">Road Sensors</span> 
<br />
<br />
N. risultati:
<select id="nResultsSensor" name="nResultsSensor">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100" selected="selected">100</option>
    <option value="200">200</option>
    <option value="500">500</option>
    <option value="0">Nessun Limite</option>
</select>
<hr />
<input type="checkbox" name="near-bus-stops" value="NearBusStops" class="macrocategory" id="Bus" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/NearBusStop.png' height='19' width='16' align='top'/> <span class="near-bus-stops macrocategory-label">Bus Stops</span>
<br />
<br />
N. risultati:
<select id="nResultsBus" name="nResultsBus">
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100" selected="selected">100</option>
    <option value="200">200</option>
    <option value="500">500</option>
    <option value="0">Nessun Limite</option>
</select>
<hr />-->
          <span name="lbl" caption="Search_Range_R">Search range</span>
          <select id="raggioricerca" name="raggioricerca">
            <option value="0.1">100 mt</option>
            <option value="0.2">200 mt</option>
            <option value="0.3">300 mt</option>
            <option value="0.5">500 mt</option>
            <option value="1">1 km</option>
            <option value="2">2 km</option>
            <option value="5">5 km</option>
            <option value="area">visible areas</option>
          </select>
          <hr />
          <!--<input type="button" value="Cerca!" id="pulsante-ricerca" onclick="ricercaServizi();" />
                             <input type="button" value="Pulisci" id="pulsante-reset" onclick="resetTotale();" /> !-->
          <div class="menu" id="serviceSearch">
            <img src="${pageContext.request.contextPath}/resources/img/search_icon.png" alt="Search Services" width="28" onclick="ricercaServizi('categorie');" />
          </div>
          <div class="menu" id="clearAll">
            <img src="${pageContext.request.contextPath}/resources/img/clear_icon.png" alt="Clear all" width="28" onclick="resetTotale();" />
          </div>
          <div class="menu" id="saveQuery">
            <img src="${pageContext.request.contextPath}/resources/img/save.png" alt="Salva la query" width="28" onclick="save_handler();" />
          </div>
          <br />

        </div>
      </div>
      <div id="tabs-5">
        <div class="use-case-5">
          <!--<h3>Coming soon...</h3>-->
          <!-- AGGIUNTA TRANSVERSAL SERVICES -->
          <input type="text" name="serviceTextFilter_t" id="serviceTextFilter_t" placeholder="search text into service" onkeypress="event.keyCode == 13 ? ricercaServizi('categorie_t') : false"/><br />
          <span name="lbl" caption="Services_Categories_T">Services Categories</span>
          <br />
          <input type="checkbox" name="macro-select-all_t" id="macro-select-all_t" value="Select All" /> <span name="lbl" caption="Select_All_T">De/Select All</span>
          <div id="categorie_t">
            <br />
            <input type='checkbox' name='Area' value='Area' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Area.png' height='23' width='20' align='top'> <span class='Area macrocategory-label'>Area</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Controlled_parking_zone' value='Controlled_parking_zone' class='sub_Area subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Controlled_parking_zone.png' height='19' width='16' align='top'>
              <span class='Area subcategory-label'>Controlled_parking_zone</span>
              <br />
              <input type='checkbox' name='Gardens' value='Gardens' class='sub_Area subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gardens.png' height='19' width='16' align='top'>
              <span class='Area subcategory-label'>Gardens</span>
              <br />
              <input type='checkbox' name='Green_areas' value='Green_areas' class='sub_Area subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Green_areas.png' height='19' width='16' align='top'>
              <span class='Area subcategory-label'>Green_areas</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='DigitalLocation' value='DigitalLocation' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/DigitalLocation.png' height='23' width='20' align='top'> <span class='DigitalLocation macrocategory-label'>DigitalLocation</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Artisan_shop' value='Artisan_shop' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Artisan_shop.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Artisan_shop</span>
              <br />
              <input type='checkbox' name='Bank' value='Bank' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/FinancialService_Bank.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Bank</span>
              <br />
              <input type='checkbox' name='Bookshop' value='Bookshop' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Bookshop.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Bookshop</span>
              <br />
              <input type='checkbox' name='Boxoffice' value='Boxoffice' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Boxoffice.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Boxoffice</span>
              <br />
              <input type='checkbox' name='Churches' value='Churches' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Churches.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Churches</span>
              <br />
              <input type='checkbox' name='Cinema' value='Cinema' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Cinema.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Cinema</span>
              <br />
              <input type='checkbox' name='Consulate' value='Consulate' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/GovernmentOffice_Consulate.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Consulate</span>
              <br />
              <input type='checkbox' name='Controlled_parking_zone' value='Controlled_parking_zone' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Controlled_parking_zone.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Controlled_parking_zone</span>
              <br />
              <input type='checkbox' name='Cycle_paths' value='Cycle_paths' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Cycle_paths.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Cycle_paths</span>
              <br />
              <input type='checkbox' name='Gardens' value='Gardens' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gardens.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Gardens</span>
              <br />
              <input type='checkbox' name='Green_areas' value='Green_areas' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Green_areas.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Green_areas</span>
              <br />
              <input type='checkbox' name='Gym_fitness' value='Gym_fitness' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Gym_fitness.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Gym_fitness</span>
              <br />
              <input type='checkbox' name='Healthcare_centre' value='Healthcare_centre' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Healthcare_centre.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Healthcare_centre</span>
              <br />
              <input type='checkbox' name='Historical_buildings' value='Historical_buildings' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Historical_buildings.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Historical_buildings</span>
              <br />
              <input type='checkbox' name='Library' value='Library' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Library.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Library</span>
              <br />
              <input type='checkbox' name='Literary_cafe' value='Literary_cafe' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Literary_cafe.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Literary_cafe</span>
              <br />
              <input type='checkbox' name='Local_health_authority' value='Local_health_authority' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Local_health_authority.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Local_health_authority</span>
              <br />
              <input type='checkbox' name='Monument_location' value='Monument_location' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Monument_location.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Monument_location</span>
              <br />
              <input type='checkbox' name='Museum' value='Museum' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Museum.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Museum</span>
              <br />
              <input type='checkbox' name='Pastry_shop' value='Pastry_shop' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Pastry_shop.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Pastry_shop</span>
              <br />
              <input type='checkbox' name='Pharmacy' value='Pharmacy' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/ShoppingAndService_Pharmacy.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Pharmacy</span>
              <br />
              <input type='checkbox' name='Public_hospital' value='Public_hospital' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HealthCare_Public_hospital.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Public_hospital</span>
              <br />
              <input type='checkbox' name='Public_infant_school' value='Public_infant_school' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Public_infant_school.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Public_infant_school</span>
              <br />
              <input type='checkbox' name='Restaurant' value='Restaurant' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Restaurant.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Restaurant</span>
              <br />
              <input type='checkbox' name='RTZgate' value='RTZgate' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_RTZgate.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>RTZgate</span>
              <br />
              <input type='checkbox' name='Small_shop' value='Small_shop' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Small_shop.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Small_shop</span>
              <br />
              <input type='checkbox' name='Sports_facility' value='Sports_facility' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Entertainment_Sports_facility.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Sports_facility</span>
              <br />
              <input type='checkbox' name='Squares' value='Squares' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Squares.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Squares</span>
              <br />
              <input type='checkbox' name='Theatre' value='Theatre' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/CulturalActivity_Theatre.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Theatre</span>
              <br />
              <input type='checkbox' name='Toilet' value='Toilet' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Toilet.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Toilet</span>
              <br />
              <input type='checkbox' name='Tourist_complaints_office' value='Tourist_complaints_office' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_complaints_office.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Tourist_complaints_office</span>
              <br />
              <input type='checkbox' name='Tourist_information_office' value='Tourist_information_office' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_information_office.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Tourist_information_office</span>
              <br />
              <input type='checkbox' name='Tourist_trail' value='Tourist_trail' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_trail.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Tourist_trail</span>
              <br />
              <input type='checkbox' name='Training_school' value='Training_school' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/EducationAndResearch_Training_school.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Training_school</span>
              <br />
              <input type='checkbox' name='Train_station' value='Train_station' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Train_station.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Train_station</span>
              <br />
              <input type='checkbox' name='Tramline' value='Tramline' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Tramline.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Tramline</span>
              <br />
              <input type='checkbox' name='Tram_stops' value='Tram_stops' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Tram_stops.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Tram_stops</span>
              <br />
              <input type='checkbox' name='Trattoria' value='Trattoria' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/WineAndFood_Trattoria.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Trattoria</span>
              <br />
              <input type='checkbox' name='Wifi' value='Wifi' class='sub_DigitalLocation subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Wifi.png' height='19' width='16' align='top'>
              <span class='DigitalLocation subcategory-label'>Wifi</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='HappeningNow' value='HappeningNow' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HappeningNow.png' height='23' width='20' align='top'> <span class='HappeningNow macrocategory-label'>HappeningNow</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Event' value='Event' class='sub_HappeningNow subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/HappeningNow_Event.png' height='19' width='16' align='top'>
              <span class='HappeningNow subcategory-label'>Event</span>
              <br />
            </div>
            <br />
            <input type='checkbox' name='Path' value='Path' class='macrocategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/Path.png' height='23' width='20' align='top'> <span class='Path macrocategory-label'>Path</span> <span class='toggle-subcategory' title='Mostra sottocategorie'>+</span>
            <div class='subcategory-content'>
              <input type='checkbox' name='Cycle_paths' value='Cycle_paths' class='sub_Path subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Cycle_paths.png' height='19' width='16' align='top'>
              <span class='Path subcategory-label'>Cycle_paths</span>
              <br />
              <input type='checkbox' name='Tourist_trail' value='Tourist_trail' class='sub_Path subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Tourist_trail.png' height='19' width='16' align='top'>
              <span class='Path subcategory-label'>Tourist_trail</span>
              <br />
              <input type='checkbox' name='Tramline' value='Tramline' class='sub_Path subcategory' /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Tramline.png' height='19' width='16' align='top'>
              <span class='Path subcategory-label'>Tramline</span>
              <br />
            </div>
            <br />
            <input type="checkbox" name="fresh-place" value="Fresh_place" id="FreshPlace" class="macrocategory" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService_Fresh_place.png' height='23' width='20' align='top''/> <span class="fresh-place macrocategory-label">Fresh Place</span>
            <br/>
            <input type="checkbox" name="public-transport-line" value="PublicTransportLine" id="PublicTransportLine" class="macrocategory" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_Urban_bus.png' height='23' width='20' align='top''/> <span class="public-transport-line macrocategory-label">Public Transport Line</span>
            <br />
            <input type="checkbox" name="road-sensor" value="SensorSite" id="Sensor" class="macrocategory" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_SensorSite.png' height='23' width='20' align='top''/> <span class="road-sensor macrocategory-label">Road Sensors</span>
            <br />
            <input type="checkbox" name="near-bus-stops" value="BusStop" class="macrocategory" id="Bus" /> <img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_BusStop.png' height='23' width='20' align='top'/> <span class="near-bus-stops macrocategory-label">Bus Stops</span>

          </div>
          <br />
          <span name="lbl" caption="Num_Results_dx_T">N. results for each</span>:
          <select id="nResultsServizi_t" name="nResultsServizi">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100" selected="selected">100</option>
            <option value="200">200</option>
            <option value="500">500</option>
            <option value="0">No Limit</option>
          </select>
          <br />
          <!--
                                                    Raggio di Ricerca: 
                                                    <br />
                                                    <select id="raggioricerca" name="raggioricerca">
                                                        <option value="0.1">100 metri</option>
                                                        <option value="0.2">200 metri</option>
                                                        <option value="0.3">300 metri</option>
                                                        <option value="0.5">500 metri</option>
                                                        <option value="1">1 km</option>
                                                        <option value="2">2 km</option>
                                                        <option value="5">5 km</option>
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
                            !-->
          <!-- da decommentare -->
          <hr />
          <span name="lbl" caption="Search_Range_T">Search Range</span>
          <select id="raggioricerca_t" name="raggioricerca">
            <option value="0.1">100 mt</option>
            <option value="0.2">200 mt</option>
            <option value="0.3">300 mt</option>
            <option value="0.5">500 mt</option>
            <option value="1">1 km</option>
            <option value="2">2 km</option>
            <option value="5">5 km</option>
            <option value="area">visible areas</option>
          </select>
          <hr />
          <div class="menu" id="serviceSearch">
            <img src="${pageContext.request.contextPath}/resources/img/search_icon.png" alt="Search Services" width="28" onclick="ricercaServizi('categorie_t');" />
          </div>
          <!--<div class="menu" id="textSearch">
                                <img src="${pageContext.request.contextPath}/resources/img/text_search.jpg" alt="Text Search" width="28" onclick="showTextSearchDialog();" />
                            </div>-->
          <div class="menu" id="clearAll">
            <img src="${pageContext.request.contextPath}/resources/img/clear_icon.png" alt="Clear all" width="28" onclick="resetTotale();" />
          </div>
          <!--<input type="checkbox" name="open_path" value="open_path" id="apri_path" />  <span>Open Path/Area</span>-->
          <!-- DA DECOMMENTARE QUANDO SARA' FATTO IL SALVATAGGIO DEI SERVIZI TRASVERSALI -->
          <!-- <div class="menu" id="saveQuery">
                              <img src="${pageContext.request.contextPath}/resources/img/save.png" alt="Salva la query" width="28" onclick="save_handler();" />
                            </div> -->
          <br />

        </div>
      </div>
    </div>
    <fieldset id="searchOutput">
      <legend><span name="lbl" caption="Search_Results">Search Results</span></legend>
      <div class="result" id="cluster-msg"></div>
      <div class="result" id="msg"></div>
      <div class="result" id="serviceRes"><img src='${pageContext.request.contextPath}/resources/img/mapicons/TourismService.png' height='21' width='18' align='top'/><span class="label">Services:</span><div class="value"></div></div>
      <div class="result" id="busstopRes"><img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_BusStop.png' height='21' width='18' align='top'/><span class="label">Bus Stops:</span><div class="value"></div></div>
      <div class="result" id="busDirection"><span class="label">Direction:</span><div class="value"></div></div>
      <div class="result" id="sensorRes"><img src='${pageContext.request.contextPath}/resources/img/mapicons/TransferServiceAndRenting_SensorSite.png' height='21' width='18' align='top'/><span class="label">Road Sensors:</span><div class="value"></div></div>
    </fieldset>
    <fieldset id="resultTPL">
      <legend><span name="lbl" caption="Results_BusLines">Bus Lines</span></legend>
      <div id="numTPL" style="display:none;"></div>
      <div id="listTPL"></div>
    </fieldset>

  </div>
</div>
<div id="info-aggiuntive" class="menu">
  <div class="header"><span name="lbl" caption="Hide_Menu_meteo"> - Hide Menu</span>
  </div>
  <div class="content"></div>
</div>
<!--  CARICAMENTO DEL FILE utility.js CON FUNZIONI NECESSARIE  -->
<!--  CARICAMENTO DEL FILE utility.js CON FUNZIONI NECESSARIE  -->
<script src="${pageContext.request.contextPath}/resources/js/ServiceMap/utility.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/ServiceMap/@server1.conn0.source628.js" type="text/javascript"></script>
<script src="${pageContext.request.contextPath}/resources/js/ServiceMap/save_embed.js" type="text/javascript"></script>
<%--<script src="${pageContext.request.contextPath}/resources/js/ServiceMap/support.js" type="text/javascript"></script>--%>
<script>
//jQuery( document ).ready(function() {
  // $("#embed").hide();
  var ctx = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
  //var ctx = "http://localhost:8181/SpringMVC5";
  //var ctx = "http://servicemap.disit.org/WebAppGrafo";
  var query = new Object();
  var parentQuery = "";
  var listOfPopUpOpen = [];
  var pins = "";
  var save_operation = "";
  var user_mail = "";
  var queryTitle = "";
  var description = "";
  var currentServiceUri = ""
  var currentIdConf = null;
  var lastEmail = "";
  Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
      return false;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
      return false;
    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i]))
          return false;
      }
      else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  }
  function parseUrlQuery(queryString) {
    var params = {}, queries, temp, i, l;
    // Split into key/value pairs
    queries = queryString.split("&");
    // Convert the array of strings into an object
    for (i = 0, l = queries.length; i < l; i++) {
      temp = queries[i].split('=');
      params[temp[0]] = temp[1];
    }
    return params;
  }
  function include(arr, obj) {
    return (arr.indexOf(obj) != -1);
  }
  function saveQueryFreeText(text, limit) {
    var lastQuery = new Object();
    lastQuery["text"] = text;
    lastQuery["limit"] = limit;
    lastQuery["type"] = "freeText";
    return lastQuery;
  }
  function searchText() {
    nascondiRisultati();
    var numeroEventi = 0;
    var text = $("#freeSearch").val();
    var textEv = $("#freeSearch").val();
    var limit = $("#numberResults").val();
    var numService = 0;
    var numBusstop = 0;
    var numSensor = 0;
    text = escape(text);
    $('#loading').show();
    svuotaLayers();
    query = saveQueryFreeText(text, limit);
    numeroEventi = searchEvent("free_text", null, null, limit, textEv);
    if (numeroEventi != 0) {
      //risultatiRicerca((numService+numeroEventi), 0, 0, 1);
      if(limit!=0)
        limit = (limit - numeroEventi);
      $("input[name=event_choice][value=day]").attr('checked', 'checked');
    }
    $.ajax({
      data: {
        search: text,
        limit: limit
      },
      url: ctx + "/ajax/json/free-text-search.jsp",
      type: "GET",
      dataType: 'json',
      async: true,
      success: function (data) {
        /*numeroEventi = searchEvent("free_text", null, null, limit, textEv);
         if(numeroEventi != 0){
         risultatiRicerca((numService+numeroEventi), 0, 0, 1);
         limit = (limit - numeroEventi);
         $("input[name=event_choice][value=day]").attr('checked', 'checked');
         }*/
        var array = new Array();
        var delta = new Array();
        var sin = new Array();
        var cos = new Array();
        var sx = new Array();
        var dx = new Array();
        var fract = 0.523599;
        var dist = 1.2;
        var passo = 0.00007;

        for (var r = 0; r < data.features.length; r++) {
          array[r] = new Array();
          for (var c = 0; c < 2; c++) {
            array[r][c] = 0;
          }
          delta[r] = 0;
          sin[r] = 0;
          cos[r] = 0;
          sx[r] = 0;
          dx[r] = 0;
        }
        var i = 0;
        if (data.features.length > 0) {
          var count = 0;
          for (i = 0; i < data.features.length; i++) {
            if (data.features[i].properties.serviceType == 'TourismService_Tourist_trail') {
              if (count == 0) {
                array[0][0] = data.features[i].geometry.coordinates[0];
                array[0][1] = data.features[i].geometry.coordinates[1];
              } else {
                for (var k = 0; k < count; k++) {
                  if ((data.features[i].geometry.coordinates[0] == array[k][0]) && (data.features[i].geometry.coordinates[1] == array[k][1])) {
                    //array[count][0] = data.features[i].geometry.coordinates[0] + (Math.random() - .4) / 1500;
                    //array[count][1] = data.features[i].geometry.coordinates[1] + (Math.random() - .4) / 1500;
                    //data.features[i].geometry.coordinates[0] = array[count][0];
                    //data.features[i].geometry.coordinates[1] = array[count][1];
                    delta[count] = (fract*count);
                    sin[count] = Math.sin(delta[count]);
                    cos[count] = Math.cos(delta[count]);
                    sx[count] = (sin[count]*passo*dist*count);
                    dx[count] = (cos[count]*passo*dist*count);

                    array[count][0] = (array[0][0])+sx[count];
                    array[count][1] = (array[0][1])+dx[count];
                    data.features[i].geometry.coordinates[0] = array[count][0];
                    data.features[i].geometry.coordinates[1] = array[count][1];
                  } else {
                    array[count][0] = data.features[i].geometry.coordinates[0];
                    array[count][1] = data.features[i].geometry.coordinates[1];
                  }

                }

              }
              count++;
            }

          }
          servicesLayer = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
              marker = showmarker(feature, latlng);
              return marker;
            },
            onEachFeature: function (feature, layer) {
              popupContent = "";
              var divId = feature.id + "-" + feature.properties.tipo;
              if (feature.properties.type == "Strada") {
                popupContent = popupContent + "<h3>" + feature.properties.nome + " n. " + feature.properties.number + "</h3>";
              }
              popupContent = popupContent + "<div id=\"" + divId + "\" ></div>";
              layer.bindPopup(popupContent);
              numService++;
              /*if (feature.properties.serviceType == "NearBusStop") {
               numBusstop++;
               }
               else {
               if (feature.properties.serviceType == "RoadSensor")
               numSensor++;
               else
               numService++;
               }*/

            }
          });

          if (data.features.length >=4000) {
            markers = new L.MarkerClusterGroup({maxClusterRadius: 40, disableClusteringAtZoom: 17});
            servicesLayer = markers.addLayer(servicesLayer);
            //$("#cluster-msg").text("più di 4000 risultati, attivato clustering");
            $("#cluster-msg").text("more than 4000 results, clustering enable");
            $("#cluster-msg").show();
          }
          else
            $("#cluster-msg").hide();

          servicesLayer.addTo(map);
          var confiniMappa = servicesLayer.getBounds();
          map.fitBounds(confiniMappa, {padding: [50, 50]});
          $('#loading').hide();
          risultatiRicerca(numService + numeroEventi, 0, 0, 1);
        }
        else {
          $('#loading').hide();
          //risultatiRicerca(numService, numBusstop, numSensor, 1);
          if (numeroEventi == 0) {
            risultatiRicerca(0, 0, 0, 0);
          } else {
            risultatiRicerca(numeroEventi, 0, 0, 1);
          }
        }
        /*numeroEventi = searchEvent("free_text", null, null, limit, textEv);
         if(numeroEventi != 0){
         risultatiRicerca((numService+numeroEventi), 0, 0, 1);
         $("input[name=event_choice][value=day]").attr('checked', 'checked');
         }*/
      },
      error: function (request, status, error) {
        $('#loading').hide();
        console.log(error);
        alert('Error in searching ' + decodeURIComponent(text) + "\n The error is " + error + " " + status);
      }
    });
  }

  function showResults(parameters) {
    if (mode != "embed") {
      var queryId = parameters["queryId"];
      if (queryId != null) {
        $.ajax({
          data: {
            queryId: queryId
          },
          url: ctx + "/api/query.jsp",
          type: "GET",
          async: true,
          dataType: 'json',
          success: function (msg) {
            /*     if(msg.idService != "null" && msg.idService != ""){
             showService(msg.idService,msg.typeService);
             }*/
            queryTitle = msg.title;
            description = msg.description;
            user_mail = msg.email;
            var htmlQueryBox = "<hr><h2>" + queryTitle + "</h2><p>" + description + "</p>";
            $("#queryBox").append(htmlQueryBox);
            if (!msg.isReadOnly)
              save_operation = "write";
            var typeSaving = msg.typeSaving;
            if (typeSaving == "service") {
              showService(unescape(msg.idService));
            } else if (typeSaving == "freeText") {
              $("#freeSearch").val(msg.text);
              $("#numberResults").val(msg.numeroRisultatiServizi);
              showResultsFreeSearch(msg.text, msg.numeroRisultatiServizi);
            } else {
              parentQuery = msg.parentQuery;
              if (msg.nomeProvincia != "") {
                $("#elencoprovince").val(msg.nomeProvincia);
                mostraElencoComuni(msg.nomeProvincia, msg.nomeComune);
              }
              if (msg.line != "" && msg.line != null && msg.line != "null") {
                getBusLines("query");
                $("#elencolinee").val(msg.line);
                mostraElencoFermate(msg.line, msg.stop);
              }
              var categorie = msg.categorie;
              $("#categorie :not(:checked)").each(function () {
                var category = $(this).val();
                if (categorie.indexOf(category) > -1)
                  $(this).attr("checked", true);
              });
              if (categorie.indexOf("NearBusStops") > -1)
                $("#Bus").attr("checked", true);
              if (categorie.indexOf("RoadSensor") > -1)
                $("#Sensor").attr("checked", true);
              var categorieArray = categorie.split(",");
              var stringaCategorie = categorieArray.join(";");
              stringaCategorie = stringaCategorie.replace("[", "");
              stringaCategorie = stringaCategorie.replace("]", "");
              stringaCategorie = stringaCategorie.replace(/\s+/g, '');
              $("#raggioricerca").val(msg.raggioServizi);
              $("#nResultsServizi").val(msg.numeroRisultatiServizi);
              $("#nResultsSensori").val(msg.numeroRisultatiSensori);
              $("#nResultsBus").val(msg.numeroRisultatiBus);
              var text = msg.text;
              $("#serviceTextFilter").val(text);
              $('#selezione').html(msg.actualSelection);
              selezione = unescape(msg.actualSelection);
              if (typeSaving == "embed" && selezione.indexOf("COMUNE di") != -1)
                coordinateSelezione = null;
              else
                coordinateSelezione = unescape(msg.coordinateSelezione);
              //  if(msg.idService == "null" || msg.idService == "" || msg.idService== null)
              if (stringaCategorie != "null")
                mostraServiziAJAX_new(stringaCategorie, msg.actualSelection, coordinateSelezione, msg.nomeComune, msg.numeroRisultatiServizi, msg.numeroRisultatiSensori, msg.numeroRisultatiBus, msg.raggioServizi, msg.raggioSensori, msg.raggioBus, null, text, "categorie");
            }
          }
        });
      } else if (parameters["selection"] != null) {
        var selection = unescape(parameters["selection"]);
        if (selection == "undefined")
          selection = "";
        var categorie = unescape(parameters["categories"]);
        if (categorie == "undefined")
          categorie = "Service;RoadSensor;NearBusStops";
        var text = unescape(parameters["text"]);
        if (text == "undefined")
          text = "";
        var risultati = unescape(parameters["maxResults"]);
        if (risultati == "undefined" || risultati == "")
          risultati = "100";
        var arrayRisultati = risultati.split(";");
        var risultatiServizi = arrayRisultati[0];
        var risultatiSensori = (arrayRisultati.length >= 2 ? arrayRisultati[1] : risultatiServizi);
        var risultatiBus = (arrayRisultati.length >= 3 ? arrayRisultati[2] : risultatiSensori);
        var raggi = unescape(parameters["maxDists"]);
        if (raggi == "undefined" || raggi == "")
          raggi = "0.1";
        var arrayRaggi = raggi.split(";");
        var raggioServizi = arrayRaggi[0];
        var raggioSensori = (arrayRaggi.length >= 2 ? arrayRaggi[1] : raggioServizi);
        var raggioBus = (arrayRaggi.length >= 3 ? arrayRaggi[2] : raggioSensori);
        if (selection.toLowerCase().indexOf("comune di") != -1 || selection == "") {
          var nomeComune = selection.substring(selection.indexOf("COMUNE di") + 10);
          mostraServiziAJAX_new(categorie, selection, coordSel, nomeComune, risultatiServizi, risultatiSensori, risultatiBus, raggioServizi, raggioSensori, raggioBus, null, text, "categorie");
        } else {
          if (selection.indexOf("http://") != -1) {
            var coordSel = "";
            $.ajax({
              data: {
                serviceUri: selection
              },
              url: ctx + "/ajax/getCoordinates.jsp",
              type: "GET",
              dataType: 'json',
              async: true,
              success: function (msg) {
                coordSel = msg.latitudine + ";" + msg.longitudine;
                selection = "point";
                mostraServiziAJAX_new(categorie, selection, coordSel, nomeComune, risultatiServizi, risultatiSensori, risultatiBus, raggioServizi, raggioSensori, raggioBus, null, text, "categorie");
              }
            });
          }
          else {
            var coordSel = selection;
            selection = "point";
            mostraServiziAJAX_new(categorie, selection, coordSel, nomeComune, risultatiServizi, risultatiSensori, risultatiBus, raggioServizi, raggioSensori, raggioBus, null, text, "categorie");
          }
        }
      } else if (parameters["search"] != null) {
        var textToSearch = unescape(parameters["search"]);
        var limit = parameters["maxResults"];
        if (limit == undefined)
          limit = parameters["limit"];
        if (limit == undefined)
          limit = "100";
        showResultsFreeSearch(textToSearch, limit);
      } else if (parameters["serviceUri"] != null) {
        var idServices = parameters["serviceUri"].split(";");
        //loadServiceInfo(idService)
        for (var i = 0; i < idServices.length; i++)
          showService(idServices[i]);
      }
      else {
        alert("invalid API call");
      }
    } else { //mode=="embed"
      var idConf = parameters["idConf"];
      if (idConf != null) {
        $.ajax({
          data: {
            idConf: idConf
          },
          url: ctx + "/api/embed/configuration.jsp",
          type: "GET",
          async: true,
          dataType: 'json',
          success: function (msg) {
            if (msg.weatherCity != "null" && msg.weatherCity != "") {
              $.ajax({
                url: "/WebAppGrafo/ajax/get-weather.jsp",
                type: "GET",
                async: true,
                data: {
                  nomeComune: msg.weatherCity
                },
                success: function (msg) {
                  $('#info-aggiuntive .content').html(msg);
                }
              });
            }
            queryTitle = msg.title;
            description = msg.description;
            user_mail = msg.email;
            var textToSearch = msg.text;
            var c = unescape(msg.center);
            var center = JSON.parse(c);
            map.setView(new L.LatLng(center.lat, center.lng), msg.zoom);
            var htmlQueryBox = "<hr><h2>" + queryTitle + "</h2><p>" + description + "</p>";
            $("#queryBox").append(htmlQueryBox);
            if (msg.nomeProvincia != "" && msg.nomeProvincia != "null") {
              $("#elencoprovince").val(msg.nomeProvincia);
              mostraElencoComuni(msg.nomeProvincia, msg.nomeComune);
              $("#tabs").tabs("option", "active", 1);
            }
            if (msg.line != null && msg.line != "" && msg.line != "null") {
              getBusLines("query");
              $("#tabs").tabs("option", "active", 0);
              $("#elencolinee").val(msg.line);
              mostraElencoFermate(msg.line, msg.stop);
            }
            var categorie = msg.categorie;
            $("#categorie :not(:checked)").each(function () {
              var category = $(this).val();
              if (categorie.indexOf(category) > -1)
                $(this).attr("checked", true);
            });
            if (categorie.indexOf("NearBusStops") > -1)
              $("#Bus").attr("checked", true);
            if (categorie.indexOf("RoadSensor") > -1)
              $("#Sensor").attr("checked", true);
            $("#raggioricerca").val(msg.raggioServizi);
            $("#nResultsServizi").val(msg.numeroRisultatiServizi);
            $("#nResultsSensori").val(msg.numeroRisultatiSensori);
            $("#nResultsBus").val(msg.numeroRisultatiBus);
            $('#selezione').html(msg.actualSelection);
            selezione = unescape(msg.actualSelection);
            var openPins = msg.popupOpen;
            if (textToSearch != "" && textToSearch != null) {
              var nRes = msg.numeroRisultatiServizi;
              if ((msg.actualSelection == "null" || msg.actualSelection == "") && (msg.categorie == "null" || msg.categorie == "") && (msg.coordinateSelezione == "null" || msg.coordinateSelezione == "")) {
                showResultsFreeSearch(textToSearch, nRes);
              }
              else {
                var range = msg.raggioServizi;
                stringaCategorie = msg.categorie;
                stringaCategorie = unescape(stringaCategorie);
                if (msg.actualSelection.indexOf("COMUNE di") != -1) {
                  var selection = msg.nomeComune;
                  var startingPoint = "municipality";
                }
                else {
                  var selection = msg.coordinateSelezione;
                  var startingPoint = "point";
                }
                $("#loading").show();
                svuotaLayers();
                $.ajax({
                  data: {
                    search: textToSearch,
                    results: nRes,
                    range: range,
                    selection: selection,
                    startingPoint: startingPoint,
                    categorie: stringaCategorie
                  },
                  url: ctx + "/ajax/json/get-services-by-text.jsp",
                  type: "GET",
                  dataType: 'json',
                  async: true,
                  success: function (data) {
                    if (data.features.length > 0) {
                      servicesLayer = L.geoJson(data, {
                        pointToLayer: function (feature, latlng) {
                          marker = showmarker(feature, latlng);
                          return marker;
                        },
                        onEachFeature: function (feature, layer) {
                          popupContent = "";
                          var divId = feature.id + "-" + feature.properties.tipo;
                          popupContent = popupContent + "<div id=\"" + divId + "\" ></div>";
                          layer.bindPopup(popupContent);
                        }
                      }).addTo(map);
                      if (mode == "embed") {
                        for (i in servicesLayer._layers) {
                          var uri = servicesLayer._layers[i].feature.properties.serviceUri;
                          if (include(openPins, uri))
                            servicesLayer._layers[i].openPopup();
                        }
                      }
                      var confiniMappa = servicesLayer.getBounds();
                      map.fitBounds(confiniMappa, {padding: [50, 50]});
                      $('#loading').hide();
                    }
                    else {
                      $('#loading').hide();
                      risultatiRicerca(0, 0, 0, 1);
                    }
                  },
                  error: function (request, status, error) {
                    $('#loading').hide();
                    console.log(error);
                    alert('Error in searching ' + text + "\n The error is " + error);
                  }
                });
              }
            }
            else if (categorie != "null") { //no text search
              var categorieArray = categorie.split(",");
              var stringaCategorie = categorieArray.join(";");
              stringaCategorie = stringaCategorie.replace("[", "");
              stringaCategorie = stringaCategorie.replace("]", "");
              stringaCategorie = stringaCategorie.replace(/\s+/g, '');
              coordinateSelezione = unescape(msg.coordinateSelezione);
              //$("#embed").show();
              mostraServiziAJAX_new(stringaCategorie, msg.actualSelection, coordinateSelezione, msg.nomeComune, msg.numeroRisultatiServizi, msg.numeroRisultatiSensori, msg.numeroRisultatiBus, msg.raggioServizi, msg.raggioSensori, msg.raggioBus, openPins, null, "categorie");
            }
            else {
            }
          }
        });
      }
    }
  }
  function showResultsFreeSearch(textToSearch, limit) {
    textToSearch = escape(textToSearch);
    $('#loading').show();
    $.ajax({
      data: {
        search: textToSearch,
        limit: limit
      },
      url: ctx + "/ajax/json/free-text-search.jsp",
      type: "GET",
      dataType: 'json',
      async: true,
      success: function (data) {
        if (data.features.length > 0) {
          servicesLayer = L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
              marker = showmarker(feature, latlng);
              return marker;
            },
            onEachFeature: function (feature, layer) {
              popupContent = "";
              var divId = feature.id + "-" + feature.properties.tipo;
              popupContent = popupContent + "<div id=\"" + divId + "\" ></div>";
              layer.bindPopup(popupContent);
            }
          }).addTo(map);
          if (mode == "embed") {
            for (i in servicesLayer._layers) {
              var uri = servicesLayer._layers[i].feature.properties.serviceUri;
              if (include(openPins, uri))
                servicesLayer._layers[i].openPopup();
            }
          }
          var confiniMappa = servicesLayer.getBounds();
          map.fitBounds(confiniMappa, {padding: [50, 50]});
          $('#loading').hide();
        }
        else {
          $('#loading').hide();
          risultatiRicerca(0, 0, 0, 1);
        }
      },
      error: function (request, status, error) {
        $('#loading').hide();
        console.log(error);
        alert('Error in searching ' + text + "\n The error is " + error);
      }
    });
  }

  function showService(serviceUri) {
    $('#loading').show();
    $.ajax({
      data: {
        serviceUri: serviceUri
      },
      url: ctx + "/api/service.jsp",
      type: "GET",
      async: true,
      dataType: 'json',
      success: function (msg) {
        if (msg != null && msg.meteo != null) {
          $.ajax({
            url: "/WebAppGrafo/ajax/get-weather.jsp",
            type: "GET",
            async: true,
            data: {
              nomeComune: msg.meteo.location
            },
            success: function (msgMeteo) {
              $('#info-aggiuntive .content').html(msgMeteo);
              $('#loading').hide();
            }
          });
        } else if (msg != null && msg.features.length > 0 && msg.features[0].geometry.coordinates != undefined) {
          var longService = msg.features[0].geometry.coordinates[0];
          var latService = msg.features[0].geometry.coordinates[1];
          servicesLayer = L.geoJson(msg, {
            pointToLayer: function (feature, latlng) {
              marker = showmarker(feature, latlng);
              return marker;
            },
            onEachFeature: function (feature, layer) {
              var tipo = feature.properties.tipo;
              var divMM = feature.id + "-multimedia";
              var multimediaResource = feature.properties.multimedia;
              var htmlDiv;
              if (multimediaResource != null)
              {
                var format = multimediaResource.substring(multimediaResource.length - 4);
                if (format == ".mp3") {
                  htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><audio controls class=\"audio-controls\"><source src=\"" + multimediaResource + "\" type=\"audio/mpeg\"></audio></div>";
                } else {
                  if ((format == ".wav") || (format == ".ogg")) {
                    htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><audio controls class=\"audio-controls\"><source src=\"" + multimediaResource + "\" type=\"audio/" + format + "\"></audio></div>";
                  } else {
                    htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><img src=\"" + multimediaResource + "\" width=\"80\" height=\"80\"></div>";
                  }
                }
              }
              if (include(tipo, "@en"))
                tipo = tipo.replace("@en", "");
              else
                tipo = tipo.replace("@it", "");
              var divId = feature.id + "-" + tipo;
              if (feature.properties.tipo != "fermata") {
                contenutoPopup = createContenutoPopup(feature, divId, feature.id);
                layer.addTo(map).bindPopup(contenutoPopup).openPopup();
                if (feature.multimedia != null) {
                  //$(".leaflet-popup-content-wrapper").css("width", "300px"); 
                  $('#' + divId).closest('div.leaflet-popup-content-wrapper').css("width", "300px");
                }
                popup_fixpos(divId);
              }
              else {
                var contenutoPopup = createContenutoPopup(feature, divId, feature.id);
                layer.addTo(map).bindPopup(contenutoPopup).openPopup();
              }
            }
          });
          map.setView(new L.LatLng(latService, longService), 16);
        }
        else {
          alert("no info found for service " + serviceUri);
        }
        $('#loading').hide();
      }
    });
  }

  function showEmbedConfiguration(parameters) {
    var idConfiguration = parameters['idConf'];
    //var scale=parameters['scale'];
    //var translate=parameters['translate'];
    $.ajax({
      data: {
        idConfiguration: idConfiguration,
        scale: scale,
        translate: translate
      },
      url: "api/embed/configuration.jsp",
      type: "GET",
      async: true,
      dataType: 'json',
      success: function (msg) {
        if (msg.nomeProvincia != null) {
          $("#elencoprovince").val(msg.nomeProvincia);
          mostraElencoComuni(msg.nomeProvincia, msg.nomeComune);
          $("#ui-id-2").click();
        }
        if (msg.line != null) {
          getBusLines("embed");
          $("#elencolinee").val(msg.line);
          mostraElencoFermate(msg.line, msg.stop);
          $("#ui-id-1").click();
        }
        if (msg.pins)
          var pins = JSON.parse(msg.pins);
        if (msg.popupOpen)
          var openPopup = JSON.parse(msg.popupOpen);
        $("#raggioricerca").val(msg.radius);
        $("#numerorisultati").val(msg.numeroRisultati);
        $('#selezione').html(msg.actualSelection);
        var center = JSON.parse(msg.center);
        map.setView(new L.LatLng(center.lat, center.lng), msg.zoom);
        var openPins = [];
        for (var i = 0; i < openPopup.length; i++) {
          openPins.push(openPopup[i].id);
        }
        var weatherCity = msg.weatherCity;
        if (weatherCity) {
          $.ajax({
            url: "/WebAppGrafo/ajax/get-weather.jsp",
            type: "GET",
            async: true,
            data: {
              nomeComune: weatherCity
            },
            success: function (msg) {
              $('#info-aggiuntive .content').html(msg);
            }
          });
        }
        var categorie = msg.categorie;
        //categorie=categorie.substr(1,categorie.length-1);
        $("#categorie :not(:checked)").each(function () {
          var category = $(this).val();
          if (categorie.indexOf(category) > -1)
            $(this).attr("checked", true);
        });
        servicesLayer = L.geoJson(pins, {
          pointToLayer: function (feature, latlng) {
            marker = showmarker(feature, latlng);
            return marker;
          },
          onEachFeature: function (feature, layer) {

            var divId = feature.id + "-" + feature.properties.tipo;
            if (feature.properties.tipo != "fermata") {
              contenutoPopup = "<h3>" + feature.properties.nome + "</h3>";
              contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + feature.properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
              contenutoPopup = contenutoPopup + "Tipologia: " + feature.properties.tipo + "<br />";
              if (feature.properties.email != "" && feature.properties.email)
                contenutoPopup = contenutoPopup + "Email: " + feature.properties.email + "<br />";
              if (feature.properties.indirizzo != "")
                contenutoPopup = contenutoPopup + "Indirizzo: " + feature.properties.indirizzo;
              if (feature.properties.numero != "" && feature.properties.numero)
                contenutoPopup = contenutoPopup + ", " + feature.properties.numero + "<br />";
              else
                contenutoPopup = contenutoPopup + "<br />";
              if (feature.properties.note != "" && feature.properties.note)
                contenutoPopup = contenutoPopup + "Note: " + feature.properties.note + "<br />";
              contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
              if (include(openPins, feature.id))
                layer.addTo(map).bindPopup(contenutoPopup).openPopup();
              else
                layer.addTo(map).bindPopup(contenutoPopup);
            }
            else {
              var divLinee = divId + "-linee";
              var contenutoPopup = "<h3>FERMATA : " + feature.properties.popupContent + "</h3>";
              contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + feature.properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
              contenutoPopup += "<div id=\"" + divLinee + "\" ></div>";
              contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
              if (include(openPins, feature.id))
                layer.addTo(map).bindPopup(contenutoPopup).openPopup();
              else
                layer.addTo(map).bindPopup(contenutoPopup);
            }
          }
        });
        $("#loading").hide();
      }
    });
  }

  /***  codice per mantenere aperto più di un popup per volta ***/
  L.Map = L.Map.extend({
    openPopup: function (popup) {
      //        this.closePopup();  // just comment this
      this._popup = popup;
      return this.addLayer(popup);
    }

  });
  // CREAZIONE MAPPA CENTRATA NEL PUNTO
  //commentato marco
  //var map = L.map('map').setView([43.3555664, 11.0290384], 8);

  // SCELTA DEL TILE LAYER ED IMPOSTAZIONE DEI PARAMETRI DI DEFAULT
  /*commentato marco
   L.tileLayer('http://c.tiles.mapbox.com/v3/examples.map-szwdot65/{z}/{x}/{y}.png', { // NON MALE
   //L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
   //L.tileLayer('http://a.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png', {
   //L.tileLayer('http://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   //L.tileLayer('http://tilesworld1.waze.com/tiles/{z}/{x}/{y}.png', {
   //		L.tileLayer('http://maps.yimg.com/hx/tl?v=4.4&x={x}&y={y}&z={z}', {
   //L.tileLayer('http://a.tiles.mapbox.com/v3/examples.map-bestlap85.h67h4hc2/{z}/{x}/{y}.png', { MAPBOX MA NON FUNZIA
   //L.tileLayer('http://{s}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{z}/{x}/{y}.png', { 
   //	L.tileLayer('http://{s}.tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/121900/256/{z}/{x}/{y}.png', { 
   attribution: 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
   key: 'BC9A493B41014CAABB98F0471D759707',
   minZoom: 8
   }).addTo(map);

   *fine commento marco
   */

  //codice per gestione layers
  //var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});
  //http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg
  //http://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png
  //http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
  //http://a.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png
  //http://a.tile.stamen.com/toner/{z}/{x}/{y}.png
  //http://a.tile.thunderforest.com/landscape/{z}/{x}/{y}.png
  //var osm = L.tileLayer('http://a.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'});

  <!-- Modified from 4535992 -->
  var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                  '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                  'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          mbUrl = 'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGJlbGxpbmkiLCJhIjoiNTQxZDNmNDY0NGZjYTk3YjlkNTAzNWQwNzc0NzQwYTcifQ.CNfaDbrJLPq14I30N1EqHg';
  var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}),
          satellite = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr}),
          grayscale = L.tileLayer(mbUrl, {id: 'pbellini.f33fdbb7', attribution: mbAttr});
  //var map = L.map('map', { center: [43.3555664, 11.0290384],zoom: 8,layers: [satellite]});

  var map = L.map('map').fitWorld().addLayer(satellite);
  var baseMaps = {
    "Streets": streets,
    "Satellite": satellite,
    "Grayscale": grayscale
  };
  /*var toggleMap = L.control.layers(baseMaps, null, {position: 'bottomright', width: '50px', height: '50px'});
  toggleMap.addTo(map);*/
  if (getUrlParameter("map") == "streets") {
    map.removeLayer(satellite);
    map.addLayer(streets);
  }
  else if (getUrlParameter("map") == "grayscale") {
    map.removeLayer(satellite);
    map.addLayer(grayscale);
  }


  // DEFINIZIONE DEI CONFINI MASSIMI DELLA MAPPA
/*  var bounds = new L.LatLngBounds(new L.LatLng(41.7, 8.4), new L.LatLng(44.930222, 13.4));
  map.setMaxBounds(bounds);*/
   <!-- end of modification 4535992 -->
  // GENERAZIONE DEI LAYER PRINCIPALI
  var busStopsLayer = new L.LayerGroup();
  var servicesLayer = new L.LayerGroup();
  var eventLayer = new L.LayerGroup();
  var clickLayer = new L.LayerGroup();
  var GPSLayer = new L.LayerGroup();
  // AGGIUNTA DEL PLUGIN PER LA GEOLOCALIZZAZIONE
  var GPSControl = new L.Control.Gps({
    maxZoom: 16,
    style: null
  });
  map.addControl(GPSControl);
  //$("#currentPosition").add(GPSControl);+

  // ASSOCIA FUNZIONI AGGIUNTIVE ALL'APERTURA DI UN POPUP SU PARTICOLARI TIPI DI DATI
  var last_marker = null;
<!-- Modified from 4535992 -->
  /*map.on('popupopen', function (e) {


    $('#raggioricerca').prop('disabled', false);
    $('#raggioricerca_t').prop('disabled', false);
    $('#PublicTransportLine').prop('disabled', false);
    $('#nResultsServizi').prop('disabled', false);
    $('#nResultsSensori').prop('disabled', false);
    $('#nResultsBus').prop('disabled', false);
    $('#approximativeAddress').html('');
    var markerPopup = e.popup._source;
    //aggiunto
    var idServizio = markerPopup.feature.id;
    currentServiceUri = markerPopup.feature.properties.serviceUri;
    var tipoServizio = markerPopup.feature.properties.tipo;
    var serviceType = markerPopup.feature.properties.serviceType;
    var nome = markerPopup.feature.properties.nome;
    var divId = idServizio + "-" + markerPopup.feature.properties.tipo;
    var coordinates = markerPopup.feature.geometry.coordinates;
    if (markerPopup.feature.properties.multimedia != "" && markerPopup.feature.properties.multimedia != null) {
      $('#' + divId).closest('div.leaflet-popup-content-wrapper').css("width", "300px");
    }
    popup_fixpos(divId);
    if (mode != "embed") {
      //selezione = 'Servizio: ' + markerPopup.feature.properties.nome;
      if (tipoServizio == 'fermata'){
        selezione = 'Bus Stop: ' + markerPopup.feature.properties.nome;
      }else{
        selezione = 'Service: ' + markerPopup.feature.properties.nome;
      }
      $('#selezione').html(selezione);
      clickLayer.clearLayers();
      // CLICK SUL MARKER - Viene evidenziato il SELECTED marker, e settata l'icona di default al precedente selezionato.                                
      $(markerPopup._icon).siblings().removeClass('selected');
      if (last_marker != null && last_marker.getLatLng() != markerPopup.getLatLng()) {
        if (last_marker.feature.properties.serviceType == "") {
          var serviceIcon = "generic";
        } else {
          var serviceIcon = last_marker.feature.properties.serviceType;
        }
        if (last_marker.feature.properties.serviceType != "bus_real_time") {
          var def_icon = L.icon({
            //iconUrl: ctx + '/img/mapicons/' + last_marker.feature.properties.serviceType + '.png',
            //iconRetinaUrl: ctx + '/img/mapicons/' + last_marker.feature.properties.serviceType + '.png',
            iconUrl: ctx + '/img/mapicons/' + serviceIcon + '.png',
            iconRetinaUrl: ctx + '/img/mapicons/' + serviceIcon + '.png',
            iconSize: [26, 29],
            iconAnchor: [13, 29], });
          //popupAnchor: [0, -27],});
          last_marker.setIcon(def_icon);
        }
        else {
          var def_icon = L.icon({
            iconUrl: ctx + '/img/mapicons/' + serviceIcon + '.gif',
            iconRetinaUrl: ctx + '/img/mapicons/' + serviceIcon + '.gif',
            iconSize: [15, 15],
            iconAnchor: [7, 15],
            popupAnchor: [0, -7], });
          last_marker.setIcon(def_icon);
        }
      }
      $(markerPopup._icon).addClass('selected');
      last_marker = markerPopup;
    }
    /!*if ((tipoServizio != 'fermata')||(tipoServizio != 'parcheggio_auto')||(tipoServizio != 'parcheggio_Coperto')||(tipoServizio != "parcheggio_all'aperto")||(tipoServizio != 'car_park@en')||(tipoServizio != 'sensore')) {
     //showService(currentServiceUri);
     loadServiceInfo(currentServiceUri, divId);

     }*!/

    //if ((mode != "query") && (mode != "embed")) {
    loadServiceInfo(currentServiceUri, divId, idServizio, coordinates);
    //}
    coordinateSelezione = markerPopup.feature.geometry.coordinates[1] + ";" + markerPopup.feature.geometry.coordinates[0];
    /!*if (tipoServizio == 'fermata') {
     selezione = 'Fermata Bus: ' + markerPopup.feature.properties.nome;
     coordinateSelezione = markerPopup.feature.geometry.coordinates[1] + ";" + markerPopup.feature.geometry.coordinates[0];
     $('#selezione').html(selezione);
     var divLinee = divId + "-linee";
     mostraAVMAJAX(nome, divId);
     mostraLineeBusAJAX(nome, divLinee);
     }
     if (tipoServizio == 'parcheggio_auto' || tipoServizio == "parcheggio_Coperto" || tipoServizio == "parcheggi_all'aperto" || tipoServizio == "car_park@en") {
     mostraParcheggioAJAX(nome, divId);
     }

     if (tipoServizio == 'sensore') {
     mostraSensoreAJAX(nome, divId);
     }
     // var stringJsonPopUp=JSON.stringify(markerPopup);*!/
    listOfPopUpOpen.push(currentServiceUri);
  });*/
<!-- Modified from 4535992 -->
  /*map.on('popupclose', function (e) {
    var popupToRemove = e.popup._source;
    for (var i = listOfPopUpOpen.length - 1; i >= 0; i--) {
      if (listOfPopUpOpen[i] === popupToRemove.feature.properties.serviceUri) {
        listOfPopUpOpen.splice(i, 1);
      }
    }
  });*/
  // AL CLICK CERCO L'INDIRIZZO APPROSSIMATIVO
<!-- Modified from 4535992 -->
  /*map.on('click', function (e) {
    listOfPopUpOpen = [];
    if (/!*selezioneAttiva == *!/true) {
      if (ricercaInCorso == false) {
        $('#raggioricerca').prop('disabled', false);
        $('#raggioricerca_t').prop('disabled', false);
        $('#PublicTransportLine').prop('disabled', false);
        $('#nResultsServizi').prop('disabled', false);
        $('#nResultsSensori').prop('disabled', false);
        $('#nResultsBus').prop('disabled', false);
        ricercaInCorso = true;
        $('#approximativeAddress').html("Address: <img src=\"img/ajax-loader.gif\" width=\"16\" />");
        clickLayer.clearLayers();
        //clickLayer = new L.LatLng(e.latlng);
        clickLayer = L.layerGroup([new L.marker(e.latlng)]).addTo(map);
        var latLngPunto = e.latlng;
        coordinateSelezione = latLngPunto.lat + ";" + latLngPunto.lng;
        var latPunto = new String(latLngPunto.lat);
        var lngPunto = new String(latLngPunto.lng);
        selezione = 'Coord: ' + latPunto.substring(0, 7) + "," + lngPunto.substring(0, 7);
        $('#selezione').html(selezione);
        $.ajax({
          url: "/WebAppGrafo/ajax/get-address.jsp",
          type: "GET",
          async: true,
          //dataType: 'json',
          data: {
            lat: latPunto,
            lng: lngPunto
          },
          success: function (msg) {
            $('#approximativeAddress').html(msg);
            ricercaInCorso = false;
          }
        });
      }
    }
  });*/
  var selezioneAttiva = false;
  var ricercaInCorso = false;
  var logEndPoint = "http://log.disit.org/service/?sparql=http://servicemap.disit.org/WebAppGrafo/sparql&uri=";

  $(document).ready(function () {
    // funzione di inizializzazione all'avvio della mappa
    init();
      <!-- Added from 4535992 -->
      //leaflet_buildMap_support_2.initLeaflet;

      //var ctxbase =  window.location.toString();
      //var ctx0 = window.location.pathname; ///mpa13
      //var ctx1 = window.location.pathname.indexOf("/",2); //-1
      //ctx = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
      //console.info('ctxBase:'+ctxbase+',ctx0:'+ctx0+',ctx1:'+ctx1+',ctx:'+ctx);

      //WORK
      //ctx = leafletUtil.prepareCTX();
      //leafletUtil.setCtx(ctx);
  });



  function init() {
    // CREO LE TABS JQUERY UI NEL MENU IN ALTO
    $("#tabs").tabs();
    $("#tabs-servizi").tabs();
    if (mode == "query" || mode == "embed") {
      var url = document.URL;
      var queryString = url.substring(url.indexOf('?') + 1);
      var parameters = parseUrlQuery(queryString);
      $("#embed.menu").hide();
      $("#save").hide();
      $("#saveQuery").hide();
      $("#saveQuerySearch").hide();
      var controls = parameters["controls"];
      if (mode == "query" && controls == undefined)
        controls = "collapsed";
      if (controls == "false" || controls == "hidden" || controls == undefined) {
        $("#menu-dx").hide();
        $("#menu-alto").hide();
        $("#embed.menu").hide();
      }
      else if (controls == "collapsed") {
        $("#menu-dx .header").click();
        $("#menu-alto .header").click();
      }
      var info = parameters["info"];
      if (info == "false" || info == "hidden") {
        $("#info-aggiuntive").hide();
      }
      else if (info == "collapsed") {
        $("#info-aggiuntive .header").click();
      }
      if (parameters["description"] == "false") {
        $("#queryBox").hide();
      }
      if (parameters["showBusPosition"] == "true") {
        mostraAutobusRT(true);
      }
      else
        showResults(parameters);
    }
  }

  var comuneChoice;
  var selezione;
  var coordinateSelezione;
  var numeroRisultati;
  // MOSTRA ELENCO COMUNI DI UNA PROVINCIA
  function mostraElencoComuni(selectOption, nomeComune) {
    if ($("#elencoprovince").val() != null) {
      //	if (selectOption.options.selectedIndex != 0){	
      $('#elencolinee')[0].options.selectedIndex = 0;
      $('#elencofermate').html('<option value=""> - Select a Bus Stop - </option>');
      //$('#loading').show();
      $.ajax({
        url: "/WebAppGrafo/ajax/get-municipality-list.jsp",
        type: "GET",
        async: true,
        //dataType: 'json',
        data: {
          nomeProvincia: $("#elencoprovince").val()
          // nomeProvincia: selectOption.options[selectOption.options.selectedIndex].value
        },
        success: function (msg) {
          $('#elencocomuni').html(msg);
          if (mode == "embed" || mode == "query") {
            $('#elencocomuni').val(nomeComune);
            //$('#loading').hide();
          }
          else
            $('#loading').hide();
        }
      });
    }
  }

  /*function loadServiceInfo(uri, div) {
   $.ajax({
   data: {
   serviceUri: uri
   },
   url: "/WebAppGrafo/api/service.jsp",
   type: "GET",
   async: true,
   dataType: 'json',
   success: function (data) {
   if (data.features.length > 0) {
   var tipo = data.features[0].properties.tipo;
   selezione = 'Servizio: ' + data.features[0].properties.nome;
   $('#selezione').html(selezione);
   var divMM = data.features[0].id + "-multimedia";
   var multimediaResource = data.features[0].properties.multimedia;
   var htmlDiv;
   if (multimediaResource != null)
   {
   var format = multimediaResource.substring(multimediaResource.length -4);
   if (format == ".mp3"){
   htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><audio controls class=\"audio-controls\"><source src=\""+ multimediaResource +"\" type=\"audio/mpeg\"></audio></div>";
   }else{
   if ((format == ".wav") || (format == ".ogg")){
   htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><audio controls class=\"audio-controls\"><source src=\""+ multimediaResource +"\" type=\"audio/"+ format+"\"></audio></div>";  
   }else{
   htmlDiv = "<div id=\"" + divMM + "\"class=\"multimedia\"><img src=\"" + multimediaResource + "\" width=\"80\" height=\"80\"></div>";   
   }
   }
   }
   if (include(tipo, "@en"))
   tipo = tipo.replace("@en", "");
   else
   tipo = tipo.replace("@it", "");
   var divId = data.features[0].id + "-" + tipo;
   if (data.features[0].properties.tipo != "fermata") {
   contenutoPopup = "<h3>" + data.features[0].properties.nome + "</h3>";
   contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + data.features[0].properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
   contenutoPopup = contenutoPopup + "<b>Tipologia:</b> " + tipo + "<br />";
   var feature = data.features[0];
   if (data.features[0].properties.email != "" && data.features[0].properties.email)
   contenutoPopup = contenutoPopup + "<b>Email:</b><a href=\"mailto:"+feature.properties.email+"?Subject=information request\" target=\"_top\"> " + feature.properties.email + "</a><br />";

   if (feature.properties.website != "" && feature.properties.website)
   contenutoPopup = contenutoPopup + "<b>Website:</b><a href=\"http\://"+ feature.properties.website + "\" target=\"_blank\" title=\""+feature.properties.nome+" - website\"> " + feature.properties.website + "</a><br />";
   if (feature.properties.phone != "" && feature.properties.phone)
   contenutoPopup = contenutoPopup + "<b>Phone:</b> " + feature.properties.phone + "<br />";
   if (feature.properties.fax != "" && feature.properties.fax)
   contenutoPopup = contenutoPopup + "<b>Fax:</b> " + feature.properties.fax + "<br />";
   if (data.features[0].properties.indirizzo != "")
   contenutoPopup = contenutoPopup + "<b>Indirizzo:</b> " + data.features[0].properties.indirizzo;
   if (data.features[0].properties.numero != "" && data.features[0].properties.numero)
   contenutoPopup = contenutoPopup + ", " + data.features[0].properties.numero + "<br />";
   else
   contenutoPopup = contenutoPopup + "<br />";
   if (feature.properties.cap != "" && feature.properties.cap)
   contenutoPopup = contenutoPopup + "<b>Cap:</b> " + feature.properties.cap + "<br />";
   if (feature.properties.city != "" && feature.properties.city)
   contenutoPopup = contenutoPopup + "<b>City:</b> " + feature.properties.city + "<br />";
   if (feature.properties.province != "" && feature.properties.province)
   contenutoPopup = contenutoPopup + "<b>Prov.:</b> " + feature.properties.province + "<br />";
   if (data.features[0].properties.multimedia != "" && data.features[0].properties.multimedia) {
   contenutoPopup = contenutoPopup + "<b>Multimedia Content:</b></br>" +htmlDiv;
   }
   if (data.features[0].properties.description != "" && data.features[0].properties.description) {
   if (include(data.features[0].properties.description, "@it"))
   data.features[0].properties.description = data.features[0].properties.description.replace("@it", "");
   contenutoPopup = contenutoPopup + "Description: " + data.features[0].properties.description + "<br />";
   }
   if (data.features[0].properties.note != "" && data.features[0].properties.note)
   contenutoPopup = contenutoPopup + "<b>Note:</b> " + data.features[0].properties.note + "<br />";

   contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
   var name = data.features[0].properties.nome;
   nameEscaped = escape(name);
   var divSavePin = "savePin-" + data.features[0].id;
   contenutoPopup = contenutoPopup + "<div id=\"" + divSavePin + "\" class=\"savePin\" onclick=save_handler('" + data.features[0].properties.tipo + "','" + data.features[0].properties.serviceUri + "','" + nameEscaped + "')></div>";
   //layer.addTo(map).bindPopup(contenutoPopup).openPopup();
   if (tipo == 'parcheggio_auto' || tipo == "parcheggio_Coperto" || tipo == "parcheggi_all'aperto" || tipo == "car_park@en") {
   mostraParcheggioAJAX(name, divId);
   }
   if (tipo == 'sensore') {
   mostraSensoreAJAX(name, divId);
   }
   $("#" + div).html(contenutoPopup);
   if (multimediaResource != "" && multimediaResource != null)
   $(".leaflet-popup-content-wrapper").css("width", "300px");
   popup_fixpos(div);
   } else {
   var divLinee = divId + "-linee";
   var contenutoPopup = "<h3>FERMATA : " + data.features[0].properties.nome + "</h3>";
   contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + data.features[0].properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
   contenutoPopup = contenutoPopup + "<div id=\"" + divLinee + "\" ></div>";
   contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
   var divSavePin = "savePin-" + data.features[0].id;
   var name = data.features[0].properties.nome;
   nameEscaped = escape(name);
   contenutoPopup = contenutoPopup + "<div id=\"" + divSavePin + "\" class=\"savePin\" onclick=save_handler('" + data.features[0].properties.tipo + "','" + data.features[0].properties.serviceUri + "','" + nameEscaped + "')></div>";
   $("#" + div).html(contenutoPopup);
   popup_fixpos(div);
   mostraAVMAJAX(name, divId);
   mostraLineeBusAJAX(name, divLinee);
   }
   } else {
   contenutoPopup = "No info sul servizio " + uri;
   $("#" + div).html(contenutoPopup);
   popup_fixpos(div);
   }
   }
   });
   }*/
  // FUNZIONI DI RICERCA PRINCIPALI
  function mostraLineeBusAJAX(nomeFermata, divLinee, divRoute) {
    $.ajax({
      url: "/WebAppGrafo/ajax/get-lines-of-stop.jsp",
      type: "GET",
      async: true,
      //dataType: 'json',
      data: {
        nomeFermata: nomeFermata,
        divRoute: divRoute,
      },
      success: function (msg) {
        $("#" + divLinee).html(msg);
        popup_fixpos(divLinee);
        //$('#info-aggiuntive .content').html(msg);
      }
    });
  }
  function mostraAVMAJAX(nomeFermata, divId) {
    $('#loading').show();
    $.ajax({
      url: "/WebAppGrafo/ajax/get-avm.jsp",
      type: "GET",
      async: true,
      //dataType: 'json',
      data: {
        nomeFermata: nomeFermata
      },
      success: function (msg) {
        $("#" + divId).html(msg);
        //$('#info-aggiuntive .content').html(msg);
        popup_fixpos(divId);
        $('#loading').hide();
      }
    });
  }
  function mostraParcheggioAJAX(nomeParcheggio, divId) {
    $.ajax({
      url: "/WebAppGrafo/ajax/get-parking-status.jsp",
      type: "GET",
      async: true,
      //dataType: 'json',
      data: {
        nomeParcheggio: nomeParcheggio
      },
      success: function (msg) {
        $("#" + divId).html(msg);
        //$('#info-aggiuntive .content').html(msg);
        popup_fixpos(divId);
      }
    });
  }
  function mostraSensoreAJAX(nomeSensore, divId) {
    $.ajax({
      url: "/WebAppGrafo/ajax/get-sensor-data.jsp",
      type: "GET",
      async: true,
      //dataType: 'json',
      data: {
        nomeSensore: nomeSensore
      },
      success: function (msg) {
        $("#" + divId).html(msg);
        popup_fixpos(divId);
        //$('#info-aggiuntive .content').html(msg);

      }
      // timeout:10000
    });
  }

  function updateSelection() {
    comuneChoice = $('#elencocomuni').val();
    selezione = "COMUNE di " + comuneChoice;
    $('#nResultsServizi').prop('disabled', false);
    $('#nResultsSensori').prop('disabled', false);
    $('#nResultsBus').prop('disabled', false);
    $('#selezione').html(selezione);
    coordinateSelezione = "";
    $('#raggioricerca')[0].options.selectedIndex = 0;
    $('#raggioricerca').prop('disabled', 'disabled');
    $('#raggioricerca_t')[0].options.selectedIndex = 0;
    $('#raggioricerca_t').prop('disabled', 'disabled');
    $('#approximativeAddress').html('');
    if ($('#PublicTransportLine').prop('checked')) {
      if ($('#PublicTransportLine').prop('checked', false))
        ;
    }
    $('#PublicTransportLine').prop('disabled', 'disabled');
    $.ajax({
      url: "/WebAppGrafo/ajax/get-weather.jsp",
      type: "GET",
      async: true,
      //dataType: 'json',
      data: {
        nomeComune: comuneChoice
      },
      success: function (msg) {
        $('#info-aggiuntive .content').html(msg);
      }
    });
  }

  function getCategorie(tipo_cat) {
    // ESTRAGGO LE CATEGORIE SELEZIONATE
    var categorie = [];

    var nCatAll = 0;
    $('#' + tipo_cat + ' .macrocategory:checked').each(function () {
      if ($('#' + tipo_cat + ' .sub_' + $(this).val() + ":not(:checked)").length == 0) {
        categorie.push($(this).val());
        if ($(this).val() == "TransferServiceAndRenting") {
          categorie.push("BusStop");
          categorie.push("SensorSite");
        }
        if ($(this).val() == "Path") {
          categorie.pop("Path");
          categorie.push("Cycle_paths");
          categorie.push("Tourist_trail");
          categorie.push("Tramline");
        }
        if ($(this).val() == "Area") {
          categorie.pop("Area");
          categorie.push("Gardens");
          categorie.push("Green_areas");
          categorie.push("Controlled_parking_zone");
        }
        // CODICE PER EVENTI NEI TRASVERSALI
        if ($(this).val() == "HappeningNow") {
          categorie.pop("HappeningNow");
          categorie.push("Event");
        }
        nCatAll++;
      }
      else
        $('#' + tipo_cat + ' .sub_' + $(this).val() + ":checked").each(function () {
          categorie.push($(this).val());
        });
    });
    if (nCatAll == $('#' + tipo_cat + ' .macrocategory').length) {
      categorie = ["Service"];
      /*if (tipo_cat == "categorie") {
       categorie.push("BusStop");
       categorie.push("SensorSite");
       }else{

       if ($('#Bus').is(':checked'))
       categorie.push($("#Bus").val());
       if ($('#Sensor').is(':checked'))
       categorie.push($("#Sensor").val());
       }*/
      categorie.push("BusStop");
      categorie.push("SensorSite");
      if (tipo_cat == 'categorie_t') {
        categorie.push("Event");
        categorie.push("PublicTransportLine");
      }

    }



    return categorie;
  }
  function ricercaServizi(tipo_categorie) {
    mode = "normal";
    var tipo_cat = tipo_categorie;
    var stringaCategorie = getCategorie(tipo_cat).join(";");
    if (selezione == undefined)
      selezione = "";
    if (tipo_categorie == "categorie")
      var raggioRicerca = $("#raggioricerca").val();
    else
      var raggioRicerca = $("#raggioricerca_t").val();
    if (((selezione != '') && (selezione.indexOf('Bus Line') == -1)) || raggioRicerca == "area") {
      if (stringaCategorie == "") {
        alert("Selezionate almeno una categoria nel menu di destra");
      }
      else {
        $('#loading').show();
        // SVUOTO LA MAPPA DAI PUNTI PRECEDENTEMENTE DISEGNATI
        if ((selezione.indexOf("Linea Bus:") == -1) || (selezione.indexOf("Bus Line:") == -1)) {
          svuotaLayers();
        }
        mostraServiziAJAX_new(stringaCategorie, selezione, coordinateSelezione, comuneChoice, null, null, null, null, null, null, null, null, tipo_cat);
      }
    }
    else {
      //alert("Attenzione, non è stata selezionata alcuna risorsa di partenza per la ricerca");
      alert("Attention, you did not select any resources base for research");
    }
  }

  function mostraServiziAJAX_new(categorie, selezione, coordinateSelezione, nomeComune, risultatiServizi, risultatiSensori, risultatiBus, raggioServizi, raggioSensori, raggioBus, openPins, textFilter, tipo_categoria) {
    //$('#info-aggiuntive .content').html('');
    if (tipo_categoria == undefined)
      tipo_categoria = "categorie";
    if (mode != "query" && mode != "embed") {
      if (tipo_categoria == "categorie") {
        var numeroRisultatiServizi = $('#nResultsServizi').val();
        var numeroRisultatiSensori = $('#nResultsSensor').val();
        var numeroRisultatiBus = $('#nResultsBus').val();
        var raggioServizi = $("#raggioricerca").val();
        var raggioSensori = $("#raggioricerca").val();
        var raggioBus = $("#raggioricerca").val();
        var textFilter = $("#serviceTextFilter").val();
      }
      else {
        var numeroRisultatiServizi = $('#nResultsServizi_t').val();
        var raggioServizi = $("#raggioricerca_t").val();
        var textFilter = $("#serviceTextFilter_t").val();
      }

      //per salvataggio query
      var raggi = [];
      raggi.push(raggioServizi, raggioSensori, raggioBus);
      var numRis = [];
      numRis.push(numeroRisultatiServizi, numeroRisultatiSensori, numeroRisultatiBus);
    }
    else {
      //modificare per riprendere tutti i valori del numero risultati (servizi, sensori e bus)
      numeroRisultatiServizi = risultatiServizi;
      numeroRisultatiSensori = risultatiSensori;
      numeroRisultatiBus = risultatiBus;
      //modificare per riprendere tutti i valori dei raggi (servizi, sensori e bus)
      var raggioServizi = raggioServizi;
      var raggioSensori = raggioSensori;
      var raggioBus = raggioBus;
      $('#loading').show();
    }
    var centroRicerca;
    if (pins.length > 0)
      pins = "";
    if (((selezione != null && selezione.indexOf("COMUNE di") == -1) && raggioServizi == "area") || (coordinateSelezione != "" && undefined != coordinateSelezione && coordinateSelezione != "null" && coordinateSelezione != null)) {
      if (raggioServizi == "area") {
        var bnds = map.getBounds()
        centroRicerca = bnds.getSouth() + ";" + bnds.getWest() + ";" + bnds.getNorth() + ";" + bnds.getEast();
      }
      else if (coordinateSelezione == "Posizione Attuale") {
        // SE HO RICHIESTO LA POSIZIONE ATTUALE ESTRAGGO LE COORDINATE
        centroRicerca = GPSControl._currentLocation.lat + ";" + GPSControl._currentLocation.lng;
      }
      else if ((selezione.indexOf("Fermata Bus:") != -1) || (selezione.indexOf("Bus Stop:") != -1)) {
        centroRicerca = coordinateSelezione;
      }
      else if (selezione.indexOf("Coord:") != -1 || selezione.indexOf("Numero Bus:") != -1) {
        centroRicerca = coordinateSelezione;
      }
      else if ((selezione.indexOf("Servizio:") != -1) || (selezione.indexOf("Service:") != -1)) {
        centroRicerca = coordinateSelezione;
      }
      else if (selezione.indexOf("point") != -1) {
        centroRicerca = coordinateSelezione;
      }
      query = saveQueryServices(centroRicerca, raggi, categorie, numRis, selezione);
      var coord = centroRicerca.split(";");
      clickLayer.clearLayers();
      if (raggioServizi != "area") {
        clickLayer.addLayer(L.marker([coord[0], coord[1]]));
        /*clickLayer.addLayer(L.circle([coord[0], coord[1]], raggioServizi * 1000, {id: 'circle'})).addTo(map);*/
        clickLayer.addLayer(L.circle([coord[0], coord[1]], raggioServizi * 1000, {className: 'circle'})).addTo(map);
      }
      var numeroServizi = 0;
      var numeroBus = 0;
      var numeroSensori = 0;
      var numEventi = 0;
      var numLineeBus = 0;
      $.ajax({
        url: "/WebAppGrafo/ajax/json/get-services.jsp",
        type: "GET",
        async: true,
        dataType: 'json',
        data: {
          centroRicerca: centroRicerca,
          raggioServizi: raggioServizi,
          raggioSensori: raggioSensori,
          raggioBus: raggioBus,
          categorie: categorie,
          textFilter: textFilter,
          numeroRisultatiServizi: numeroRisultatiServizi,
          numeroRisultatiSensori: numeroRisultatiSensori,
          cat_servizi: tipo_categoria,
          numeroRisultatiBus: numeroRisultatiBus
        },
        success: function (msg) {
          if (mode == "JSON") {
            $("#body").html(JSON.stringify(msg));
          }
          else {
            var array = new Array();
            var delta = new Array();
            var sin = new Array();
            var cos = new Array();
            var sx = new Array();
            var dx = new Array();
            var fract = 0.523599;
            var dist = 1.2;
            var passo = 0.00007;

            for (var r = 0; r < 10; r++) {
              array[r] = new Array();
              for (var c = 0; c < 2; c++) {
                array[r][c] = 0;
              }
              delta[r] = 0;
              sin[r] = 0;
              cos[r] = 0;
              sx[r] = 0;
              dx[r] = 0;
            }
            var i = 0;
            //	console.log(msg);
            $('#loading').hide();
            if (msg != null && msg.features.length > 0) {
              var count = 0;
              for (i = 0; i < msg.features.length; i++) {
                if (msg.features[i].properties.serviceType == 'TourismService_Tourist_trail') {
                  if (count == 0) {
                    array[0][0] = msg.features[i].geometry.coordinates[0];
                    array[0][1] = msg.features[i].geometry.coordinates[1];
                  } else {
                    for (var k = 0; k < count; k++) {
                      if ((msg.features[i].geometry.coordinates[0] == array[k][0]) && (msg.features[i].geometry.coordinates[1] == array[k][1])) {

                        delta[count] = (fract*count);
                        sin[count] = Math.sin(delta[count]);
                        cos[count] = Math.cos(delta[count]);
                        sx[count] = (sin[count]*passo*dist*count);
                        dx[count] = (cos[count]*passo*dist*count);;

                        //array[count][0] = msg.features[i].geometry.coordinates[0] + (Math.random() - .4) / 1500;
                        //array[count][1] = msg.features[i].geometry.coordinates[1] + (Math.random() - .4) / 1500;
                        //msg.features[i].geometry.coordinates[0] = array[count][0];
                        //msg.features[i].geometry.coordinates[1] = array[count][1];

                        array[count][0] = (array[0][0])+sx[count];
                        array[count][1] = (array[0][1])+dx[count];
                        msg.features[i].geometry.coordinates[0] = array[count][0];
                        msg.features[i].geometry.coordinates[1] = array[count][1];
                      } else {
                        array[count][0] = msg.features[i].geometry.coordinates[0];
                        array[count][1] = msg.features[i].geometry.coordinates[1];
                      }

                    }

                  }
                  count++;
                }

              }

              servicesLayer = L.geoJson(msg, {
                pointToLayer: function (feature, latlng) {
                  marker = showmarker(feature, latlng);
                  return marker;
                },
                onEachFeature: function (feature, layer) {
                  // codice per apertura all'avvio di percorsi e aree.
                  /*if((feature.properties.cordList != "") && ($('#apri_path').attr('checked')) && (feature.properties.serviceType.indexOf('Tourist_trail') == -1)){
                   Estract_features(feature.properties.cordList, null ,feature.properties.serviceType);
                   }*/
                  var contenutoPopup = "";
                  var divId = feature.id + "-" + feature.properties.tipo;
                  // X TEMPI DI CARICAMENTO INFO SCHEDA ALL'APERTURA DEL POPUP LUNGHI, VISUALIZZARE NOME, LOD E TIPOLOGIA DI SERVIZIO
                  /*if (feature.properties.nome != null && feature.properties.nome != "")
                   contenutoPopup = "<h3>" + feature.properties.nome + "</h3>";
                   else {
                   if (feature.properties.identifier != null && feature.properties.identifier != "")
                   contenutoPopup = "<h3>" + feature.properties.identifier + "</h3>";
                   }
                   contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + feature.properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
                   contenutoPopup = contenutoPopup + "<b>Tipologia: </b>" + feature.properties.category +" - "+ feature.properties.subCategory + "<br />";*/

                  contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
                  layer.bindPopup(contenutoPopup);
                  if (feature.properties.serviceType == "TransferServiceAndRenting_BusStop") {
                    numeroBus++;
                  }
                  else {
                    if (feature.properties.serviceType == "TransferServiceAndRenting_SensorSite") {
                      numeroSensori++;
                    }
                    else {
                      numeroServizi++;
                    }
                  }
                }
              })

              if (msg.features.length >=4000) {
                markers = new L.MarkerClusterGroup({maxClusterRadius: 40, disableClusteringAtZoom: 17});
                servicesLayer = markers.addLayer(servicesLayer);
                //$("#cluster-msg").text("più di 4000 risultati, attivato clustering");
                $("#cluster-msg").text("more than 4000 results, clustering enabled");
                $("#cluster-msg").show();
              }
              else
                $("#cluster-msg").hide();

              servicesLayer.addTo(map);
              if (mode == "embed") {
                for (i in servicesLayer._layers) {
                  var uri = servicesLayer._layers[i].feature.properties.serviceUri;
                  if (include(openPins, uri))
                    servicesLayer._layers[i].openPopup();
                }
              }
              var markerJson = JSON.stringify(msg.features);
              pins = markerJson;
              //numeroServizi = numeroServizi;
              //numeroBus = numeroBus;

              if (raggioServizi != "area") {
                var confiniMappa = servicesLayer.getBounds();
                map.fitBounds(confiniMappa, {padding: [50, 50]});
              }
              //var nResults = numeroRisultatiServizi + numeroRisultatiSensori + numeroRisultatiBus;
              /*if (msg.features.length < nResults || nResults == 0) {
               risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 0);
               }
               else {
               risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 0);
               }*/
              if (tipo_categoria == "categorie") {
                risultatiRicerca((numeroServizi + numeroBus + numeroSensori), 0, 0, 1);
              } else {
                //risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 2); //DA DECOMMENTARE QUANDO SISTEMATI TRANSVERSE SERVICE
                risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 1);
              }
            }
            else {
              if (categorie.indexOf("PublicTransportLine") == -1) {
                risultatiRicerca(0, 0, 0, 0);
              }
              if (raggioServizi != "area") {
                map.fitBounds(clickLayer.getLayers()[1].getBounds());
              }
            }
          }
          if (categorie.indexOf("Event") != -1) {
            numEventi = searchEvent("transverse", raggioServizi, centroRicerca, numeroRisultatiServizi, textFilter);
            if (numEventi != 0) {
              risultatiRicerca((numeroServizi + numEventi), numeroBus, numeroSensori, 1);
              $("input[name=event_choice][value=day]").attr('checked', 'checked');
            }
          }

        },
        error: function (request, status, error) {
          $('#loading').hide();
          console.log(error);
          risultatiRicerca(0, 0, 0, 1);
        }
      });
      if (categorie.indexOf("PublicTransportLine") != -1) {
        var i = 0;
        $.ajax({
          url: "/WebAppGrafo/ajax/json/get-nearTPL.jsp",
          type: "GET",
          async: true,
          dataType: 'json',
          data: {
            centro: centroRicerca,
            raggio: raggioServizi,
            numLinee: numeroRisultatiServizi
          },
          success: function (msg) {
            if (mode == "JSON") {
              $("#body").html(JSON.stringify(msg));
            }
            else {
              $('#loading').hide();
              if (msg != null && msg.PublicTransportLine.features.length > 0) {
                numLineeBus = msg.PublicTransportLine.features.length;
                for (i = 0; i < msg.PublicTransportLine.features.length; i++) {
                  showLinea(msg.PublicTransportLine.features[i].properties.lineNumber, msg.PublicTransportLine.features[i].properties.route, msg.PublicTransportLine.features[i].properties.direction, msg.PublicTransportLine.features[i].properties.lineName, "transverse");
                }

                //risultatiRicerca(msg.PublicTransportLine.features.length+numeroServizi, numeroBus, numeroSensori, 1);
                $('#resultTPL').show();
                var template = "{{#features}}" +
                        "<div class=\"tplItem\" id=\"route_ATAF_{{properties.route}}\" style=\"margin-top:5px; border:1px solid #000; padding:6px; overflow:auto;\" onmouseover=\"selectRoute({{properties.route}})\" onmouseout=\"deselectRoute({{properties.route}})\">\n\
                                                         <div class=\"tplName\"><b style=\"color:#B500B5;\"><b>Bus Line:</b> {{properties.lineName}}</b></div>" +
                        "<div class=\"tplDirection\" style=\"float:left; margin-top:7px; display:block; width:85%;\"><b>Direction:</b> {{properties.direction}}<br></div></div>" +
                        "{{/features}}";
                var output = Mustache.render(template, msg.PublicTransportLine);
                document.getElementById('listTPL').innerHTML = output;
                $(".circle.leaflet-clickable").css({stroke: "#0c0", fill: "#0c0"});
                $('#numTPL').html(numLineeBus + " Bus Lines Found.");
                $('#numTPL').show();
                if (($('#msg').text().indexOf('any results') != -1) || ($('#msg').text().indexOf('alcun risultato') != -1)) {
                  $('#msg').html('');
                  $('#searchOutput').hide();
                }
                if(numeroServizi == 0){
                  risultatiRicerca(0, 0, 0, 0);
                  $(".circle.leaflet-clickable").css({stroke: "#0c0", fill: "#0c0"});
                }
              } else {
                alert(numeroServizi);
                if (categorie == "PublicTransportLine" || (numeroServizi == 0)) {
                  risultatiRicerca(0, 0, 0, 0);
                }
              }
            }
          }
        });
      }

    }
    else {
      // caso tutte le fermate oppure ricerca per comune
      if (pins.lenght > 0)
        pins = "";
      if (mode == "query" || mode == "embed") {
        var nomeComune = nomeComune;
        $('#loading').show();
      }
      else
        var nomeComune = $("#elencocomuni").val();
      if (selezione == "" || (selezione != null && selezione.indexOf("COMUNE di") != -1)) {
        var provincia = $("#elencoprovince").val();
        var comune = $("#elencocomuni").val();
        query = saveQueryMunicipality(provincia, comune, categorie, numRis, selezione);
        var numeroServizi = 0;
        var numeroBus = 0;
        var numeroSensori = 0;
        var numEventi = 0;
        $.ajax({
          url: ctx + "/ajax/json/get-services-in-municipality.jsp",
          type: "GET",
          async: true,
          dataType: 'json',
          data: {
            nomeProvincia: provincia,
            nomeComune: nomeComune,
            categorie: categorie,
            textFilter: textFilter,
            numeroRisultatiServizi: numeroRisultatiServizi,
            numeroRisultatiSensori: numeroRisultatiSensori,
            numeroRisultatiBus: numeroRisultatiBus,
            cat_servizi: tipo_categoria
          },
          success: function (msg) {
            //console.log(msg);
            if (mode == "JSON") {
              $("#body").replaceWith(JSON.stringify(msg));
            }
            else {
              if ($("#elencocomuni").val() != 'all') {
                //if (selectOption.options[selectOption.options.selectedIndex].value != 'all'){
                /*
                 $.ajax({
                 url : "/WebAppGrafo/ajax/get-weather.jsp",
                 type : "GET",
                 async: true,
                 //dataType: 'json',
                 data : {
                 nomeComune: $("#elencocomuni").val()
                 },
                 success : function(msg) {
                 $('#info-aggiuntive .content').html(msg);
                 }
                 });
                 */
              }
              var array = new Array();
              var delta = new Array();
              var sin = new Array();
              var cos = new Array();
              var sx = new Array();
              var dx = new Array();
              var fract = 0.523599;
              var dist = 1.2;
              var passo = 0.00007;

              for (var r = 0; r < 10; r++) {
                array[r] = new Array();
                for (var c = 0; c < 2; c++) {
                  array[r][c] = 0;
                }
                delta[r] = 0;
                sin[r] = 0;
                cos[r] = 0;
                sx[r] = 0;
                dx[r] = 0;
              }

              $('#loading').hide();
              if (msg.features.length > 0) {
                var i = 0;
                var count = 0;
                for (i = 0; i < msg.features.length; i++) {
                  if (msg.features[i].properties.serviceType == 'TourismService_Tourist_trail') {
                    if (count == 0) {
                      array[0][0] = msg.features[i].geometry.coordinates[0];
                      array[0][1] = msg.features[i].geometry.coordinates[1];
                    } else {
                      for (var k = 0; k < count; k++) {
                        if ((msg.features[i].geometry.coordinates[0] == array[k][0]) && (msg.features[i].geometry.coordinates[1] == array[k][1])) {
                          delta[count] = (fract*count);
                          sin[count] = Math.sin(delta[count]);
                          cos[count] = Math.cos(delta[count]);
                          sx[count] = (sin[count]*passo*dist*count);
                          dx[count] = (cos[count]*passo*dist*count);;

                          //array[count][0] = msg.features[i].geometry.coordinates[0] + (Math.random() - .4) / 1500;
                          //array[count][1] = msg.features[i].geometry.coordinates[1] + (Math.random() - .4) / 1500;
                          //msg.features[i].geometry.coordinates[0] = array[count][0];
                          //msg.features[i].geometry.coordinates[1] = array[count][1];

                          array[count][0] = (array[0][0])+sx[count];
                          array[count][1] = (array[0][1])+dx[count];
                          msg.features[i].geometry.coordinates[0] = array[count][0];
                          msg.features[i].geometry.coordinates[1] = array[count][1];
                        } else {
                          array[count][0] = msg.features[i].geometry.coordinates[0];
                          array[count][1] = msg.features[i].geometry.coordinates[1];
                        }

                      }

                    }
                    count++;
                  }

                }


                servicesLayer = L.geoJson(msg, {
                  pointToLayer: function (feature, latlng) {
                    marker = showmarker(feature, latlng);
                    return marker;
                  },
                  onEachFeature: function (feature, layer) {
                    var contenutoPopup = "";
                    var divId = feature.id + "-" + feature.properties.tipo;
                    // X TEMPI DI CARICAMENTO INFO SCHEDA ALL'APERTURA DEL POPUP LUNGHI, VISUALIZZARE NOME, LOD E TIPOLOGIA DI SERVIZIO
                    /*if (feature.properties.nome != null && feature.properties.nome != "")
                     contenutoPopup = "<h3>" + feature.properties.nome + "</h3>";
                     else {
                     if (feature.properties.identifier != null && feature.properties.identifier != "")
                     contenutoPopup = "<h3>" + feature.properties.identifier + "</h3>";
                     }
                     contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + feature.properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
                     contenutoPopup = contenutoPopup + "<b>Tipologia: </b>" + feature.properties.category +" - "+ feature.properties.subCategory + "<br />";*/
                    contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
                    layer.bindPopup(contenutoPopup);
                    if (feature.properties.serviceType == "TransferServiceAndRenting_BusStop") {
                      numeroBus++;
                    }
                    else {
                      if (feature.properties.serviceType == "TransferServiceAndRenting_SensorSite") {
                        numeroSensori++;
                      }
                      else {
                        numeroServizi++;
                      }
                    }

                  }
                });

                if (msg.features.length >=4000) {
                  markers = new L.MarkerClusterGroup({maxClusterRadius: 40, disableClusteringAtZoom: 17});
                  servicesLayer = markers.addLayer(servicesLayer);
                  //$("#cluster-msg").text("più di 4000 risultati, attivato clustering");
                  $("#cluster-msg").text("more than 4000 results, clustering enabled");
                  $("#cluster-msg").show();
                }
                else
                  $("#cluster-msg").hide();

                servicesLayer.addTo(map);
                if (mode == "embed") {
                  for (i in servicesLayer._layers) {
                    var uri = servicesLayer._layers[i].feature.properties.serviceUri;
                    if (include(openPins, uri))
                      servicesLayer._layers[i].openPopup();
                  }
                }
                var markerJson = JSON.stringify(msg.features);
                pins = markerJson;
                //if (mode != "embed") {
                var confiniMappa = servicesLayer.getBounds();
                map.fitBounds(confiniMappa, {padding: [50, 50]});
                //}
                //numeroServizi = numeroServizi;
                //numeroBus = numeroBus;
                //numeroSensori = numeroSensori;
                /*if (msg.features.length < numeroRisultati || numeroRisultati == 0) {
                 risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 0);
                 }
                 else {
                 risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 0);
                 }*/
                if (tipo_categoria == "categorie") {
                  risultatiRicerca((numeroServizi + numeroBus + numeroSensori), 0, 0, 1);
                } else {
                  //risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 2); //DA DECOMMENTARE QUANDO SISTEMATI TRANSVERSE SERVICE
                  risultatiRicerca(numeroServizi, numeroBus, numeroSensori, 1);
                }
              }
              else {
                risultatiRicerca(0, 0, 0, 0);
              }
            }
            if (categorie.indexOf("Event") != -1) {
              numEventi = searchEvent("transverse", null, null, numeroRisultatiServizi, textFilter);
              if (numEventi != 0) {
                risultatiRicerca((numeroServizi + numEventi), numeroBus, numeroSensori, 1);
                $("input[name=event_choice][value=day]").attr('checked', 'checked');
              }
            }
          },
          error: function (request, status, error) {

            //console.log(error);
            if ($("#elencocomuni").val() != 'all') {
              $.ajax({
                url: "/WebAppGrafo/ajax/get-weather.jsp",
                type: "GET",
                async: true,
                //dataType: 'json',
                data: {
                  nomeComune: $("#elencocomuni").val()
                },
                success: function (msg) {
                  $('#info-aggiuntive .content').html(msg);
                }
              });
            }
            $('#loading').hide();
            console.log(error);
            alert('Si è verificato un errore');
          }
        });
      }
      if (selezione != null && (selezione.indexOf("Linea Bus:") != -1) || (selezione.indexOf("Bus Line:") != -1)) {
        $.ajax({
          url: "/WebAppGrafo/ajax/json/get-services-near-stops.jsp",
          type: "GET",
          async: true,
          dataType: 'json',
          data: {
            nomeLinea: $('#elencolinee')[0].options[$('#elencolinee')[0].options.selectedIndex].value,
            raggio: 100,
            categorie: categorie,
            numerorisultati: 100
          },
          success: function (msg) {
            $('#loading').hide();
            var i = 0;
            if (msg.features.length > 0) {
              servicesLayer = L.geoJson(msg, {
                pointToLayer: function (feature, latlng) {
                  marker = showmarker(feature, latlng);
                  return marker;
                },
                onEachFeature: function (feature, layer) {
                  var divId = feature.id + "-" + feature.properties.tipo;
                  var divLinee = divId + "-linee";
                  // contenutoPopup="<div id=\""+divId+"\" >";
                  if (feature.properties.tipo == "fermata")
                    contenutoPopup = "<h3> BUS STOP: " + feature.properties.nome + "</h3>";
                  else
                    contenutoPopup = "<h3>" + feature.properties.nome + "</h3>";
                  contenutoPopup = contenutoPopup + "<a href='" + logEndPoint + feature.properties.serviceUri + "' title='Linked Open Graph' target='_blank'>LINKED OPEN GRAPH</a><br />";
                  contenutoPopup = contenutoPopup + "Tipology: " + feature.properties.tipo + "<br />";
                  if (feature.properties.email != "")
                    contenutoPopup = contenutoPopup + "Email: " + feature.properties.email + "<br />";
                  if (feature.properties.indirizzo != "")
                    contenutoPopup = contenutoPopup + "Address: " + feature.properties.indirizzo + "<br />";
                  if (feature.properties.note != "")
                    contenutoPopup = contenutoPopup + "Note: " + feature.properties.note + "<br />";
                  contenutoPopup += "<div id=\"" + divLinee + "\" ></div>";
                  contenutoPopup = contenutoPopup + "<div id=\"" + divId + "\" ></div>";
                  layer.bindPopup(contenutoPopup);
                }
              }).addTo(map);
              var markerJson = JSON.stringify(msg.features);
              pins = markerJson;
              var confiniMappa = servicesLayer.getBounds();
              map.fitBounds(confiniMappa, {padding: [50, 50]});
              var nSer = (msg.features.length);
              risultatiRicerca(msg.features.length, 0, 0, 1);
            }
            else {
              risultatiRicerca(0, 0, 0, 0);
            }
          },
          error: function (request, status, error) {
            $('#loading').hide();
            console.log(error);
            alert('Si è verificato un errore');
          }
        });
      }
    }
  }
  $('.gps-button').click(function () {
    if (GPSControl._isActive == true) {
      selezione = 'Posizione Attuale';
      $('#selezione').html(selezione);
      coordinateSelezione = "Posizione Attuale";
      $('#raggioricerca').prop('disabled', false);
      $('#raggioricerca_t').prop('disabled', false);
      $('#numerorisultati').prop('disabled', false);
      $('#PublicTransportLine').prop('disabled', false);
    }
  });
  $('#info img').click(function () {
    if ($("#info").hasClass("active") == false) {
      $('#info').addClass("active");
      selezioneAttiva = true;
    }
    else {
      $('#info').removeClass("active");
      selezioneAttiva = false;
    }
  });
  $('#choosePosition').click(function () {
    if ($("#choosePosition").hasClass("active") == false) {
      $('#choosePosition').addClass("active");
      selezioneAttiva = true;
    }
    else {
      $('#choosePosition').removeClass("active");
      selezioneAttiva = false;
      clickLayer.clearLayers();
    }
  });
//});
</script>

</body><div id="overMap"></div>
</html>