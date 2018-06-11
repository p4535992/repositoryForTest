<%--
  Created by IntelliJ IDEA.
  User: Marco
  Date: 11/06/2015
  Time: 17.29
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Registration</title>
</head>
<body>
<div align="center">
  <form:form action="register" method="post" commandName="userForm">
    <table border="0">
      <tr>
        <td colspan="2" align="center"><h2>Spring MVC Form Demo - Registration</h2></td>
      </tr>
      <tr>
        <td>User Name:</td>
        <td><form:input path="username" /></td>
      </tr>
      <tr>
        <td>Password:</td>
        <td><form:password path="password" /></td>
      </tr>
      <tr>
        <td>id:</td>
        <td><form:input path="id" /></td>
      </tr>
      <tr>
        <td>role</td>
        <td><form:input path="role" /></td>
      </tr>
      <tr>
        <td>name</td>
        <td><form:input path="name" /></td>
      </tr>
      <%--<tr>
        <td>Profession:</td>
        <td><form:select path="profession" items="${professionList}" /></td>
      </tr>--%>
      <tr>
        <td colspan="2" align="center"><input type="submit" value="Register" /></td>
      </tr>
    </table>
  </form:form>
</div>
</body>
</html>