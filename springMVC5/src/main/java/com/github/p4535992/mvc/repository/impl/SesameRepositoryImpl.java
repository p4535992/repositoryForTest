package com.github.p4535992.mvc.repository.impl;

import com.github.p4535992.mvc.repository.dao.SesameRepository;
import com.github.p4535992.util.repositoryRDF.sesame.Sesame2Utilities;
import org.openrdf.query.*;
import org.openrdf.repository.RepositoryConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.SQLException;

/**
 * Created by 4535992 on 10/06/2015.
 */
@Repository
public class SesameRepositoryImpl implements SesameRepository{

//    @Autowired
//    protected SesameConnectionFactory repositoryConnectionFactory;
//    @Autowired
//    protected SesameConnectionFactory repositoryManagerConnectionFactory;

    private static String repositoryID;
    private static String dataDir;
    private RepositoryConnection conn;

    @Autowired
    public SesameRepositoryImpl(@Value("${sesameRepositoryID}") String repositoryID,@Value("${sesameDataDir}")String dataDir){
        SesameRepositoryImpl.repositoryID = repositoryID;
        SesameRepositoryImpl.dataDir = dataDir;
    }

    @Override
    public RepositoryConnection getSesameConnection() {
        // Create a tuple query
        TupleQuery tupleQuery = null;
        try {
            Sesame2Utilities sesame = Sesame2Utilities.getInstance();
            sesame.connectToMemoryRepository(dataDir,repositoryID);
            return sesame.getRepositoryConnection();
        }catch(java.lang.NullPointerException e){
            System.err.println("No connection on the sesame server");
        } catch (Exception e) {
            if(e.getMessage().contains("No transaction active")){
                System.err.println("No connection on the sesame server");
                e.printStackTrace();
            }else{
                e.printStackTrace();
            }
        }
        return conn;
    }


    @Override
    public String getRepositoryID() {
        return repositoryID;
    }

    @Override
    public String riconciliazione() {
        return null;
    }


    //APPUNTI JAVASCRIPT
    /*
    //JavaScript Code:
    var deleteWidgetId = new Array();
    //array created
    deleteWidgetId[0] = "a";
    //adding values
    deleteWidgetId[0] = "b";
    //action trigged
    $("#saveLayout").load("layout/saveLayout.action", { deleteWidgetId : deleteWidgetId }, function(response, status, xhr) { });

    //Java Code:(In controller class):
    @RequestMapping(value = "/saveLayout") public ModelAndView saveLayout(@RequestParam String[] deleteWidgetId) throws Exception {
     //here that if i try to use the deleteWidgetId it is giving null pointer exception
     }
    */
}
