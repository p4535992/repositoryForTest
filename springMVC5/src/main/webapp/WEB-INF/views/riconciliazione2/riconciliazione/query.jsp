<%@page import="com.github.p4535992.mvc.repository.dao.MapRepository"%>
<%@ page import="com.github.p4535992.mvc.repository.impl.MapRepositoryImpl" %>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css" type="text/css" />
<title>RISULTATI QUERY</title>
</head>
<body>
<div class="wrapper">
<h1>Risultato query</h1>

<div class="well">
	<%
		MapRepository mpr = new MapRepositoryImpl();
		String via = request.getParameter("via");
		String tipo = request.getParameter("tipo");
		String QUERY = mpr.query(via,tipo);
		out.print(QUERY);
	%>

</div>

<a href="main.jsp" title="torna indietro">Torna indietro</a>
</div>
</body>
</html>