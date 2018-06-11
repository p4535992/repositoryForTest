<%@page import="java.io.IOException"%>
<%@page import="org.openrdf.model.Value"%>
<%@ page import="java.util.*" %>
<%@ page import="org.openrdf.repository.Repository" %>
<%@ page import="org.openrdf.repository.http.HTTPRepository" %>

<%@ page import="java.util.List" %>
<%@ page import="org.openrdf.OpenRDFException" %>
<%@ page import="org.openrdf.repository.RepositoryConnection" %>
<%@ page import="org.openrdf.query.TupleQuery" %>
<%@ page import="org.openrdf.query.TupleQueryResult" %>
<%@ page import="org.openrdf.query.BindingSet" %>
<%@ page import="org.openrdf.query.QueryLanguage" %>
<%@ page import="java.io.File" %>
<%@ page import="java.net.URL" %>
<%@ page import="org.openrdf.rio.RDFFormat" %>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" type="text/css" />
<title>RISULTATI QUERY</title>
</head>
<body>
<div class="wrapper">
<h1>Risultato query</h1>

<div class="well">
		<%-- INSERT CODE run query --%>

        <%-- END OF THE CODE--%>
</div>

<a href="main.jsp" title="torna indietro">Torna indietro</a>
</div>
</body>
</html>