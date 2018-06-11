<%--
  Created by IntelliJ IDEA.
  User: 4535992
  Date: 08/06/2015
  Time: 12.29
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" session="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
  <title>Show Connection</title>
</head>
<body>
    <h1>
      Show porperties of the connection to the sesame repository
    </h1>
    <p> The connection is : ${CONN}</p>
        <section class="container">
        <div class="row">
            <c:forEach items="${STATEMENTS}" var="statement">
                <div class="col-sm-6 col-md-3" style="padding-bottom: 15px">
                    <div class="thumbnail">
                        <div class="caption">
                            <p>${statement.getSubject()}<p>
                            <p>${statement.getPredicate()}</p>
                            <p>${statement.getObject()}</p>
                        </div>
                    </div>
                </div>
            </c:forEach>
        </div>
        </section>
    <P> The id of the repository is:<strong>${REPO_ID}</strong>  </P>
</body>
</html>