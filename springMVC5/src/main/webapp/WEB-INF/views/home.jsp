<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page session="false" %>
<html>
<head>
	<script src="${pageContext.request.contextPath}/resources/js/jquery/jquery2.1.4.min.js"></script>
	<title>Home</title>
</head>
<body>
<h1>
	Hello world!  
</h1>

<P>  The time on the server is ${serverTime}. </P>
<p> Go to the ServiceMap:   <input type="button" value="goMap" id="goMap"  />
</p>
<br/>
<P> Go to Logback Logging details page:  <input type="button" value="gologBack" id="gologBack"  /></P>
<script>
	$( document ).ready(function() {
		$('#goMap').click(function () {
			//alert(location); //http://localhost:8080/
			//var map = location.toString().split("/");
			//alert(map[2]);
			window.location.replace('http://localhost:8080/map');
		});

		$('#gologBack').click(function () {
			//alert(location); //http://localhost:8080/
			//var map = location.toString().split("/");
			//alert(map[2]);
			window.location.replace('http://localhost:8080/lbClassicStatus');
		});


	});
</script>
</body>
</html>
