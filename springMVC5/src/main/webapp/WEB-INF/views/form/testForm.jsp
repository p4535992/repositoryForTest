<%--
  Created by IntelliJ IDEA.
  User: Marco
  Date: 11/06/2015
  Time: 17.29
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Registration</title>
</head>
<body>
<div align="center">
  <c:url var="url" value="/map/test" />
  <form:form action="${url}" method="post" commandName="siteForm" >
    <table border="0">
      <tr>
        <td colspan="2" align="center"><h2>Spring MVC Form Demo - Registration</h2></td>
      </tr>
      <tr>
        <td>URL:</td>
        <td><form:input path="url" /></td>
      </tr>
      <tr>
        <td colspan="2" align="center"><input type="submit" value="TestForm" /></td>
      </tr>
    </table>
  </form:form>
</div>
<div align="center">
<c:url var="url2" value="/map/test2" />
<form:form action="${url2}" method="post" >
    <table border="0">
        <tr>
            <td colspan="2" align="center"><h2>Spring MVC Form Demo 2 - Registration</h2></td>
        </tr>
        <tr>
            <td>URL:</td>
            <td><input type="text" name="urlParam" value="" /></td>
        </tr>
        <tr>
            <td colspan="2" align="center"><input type="submit" value="urlForm" /></td>
        </tr>
    </table>
</form:form>
</div>
</body>
</html>