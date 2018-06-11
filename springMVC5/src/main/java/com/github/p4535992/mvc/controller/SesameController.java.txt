package com.github.p4535992.mvc.controller;

import com.github.p4535992.mvc.service.dao.SesameService;
import org.openrdf.repository.Repository;
import org.openrdf.repository.RepositoryConnection;
import org.openrdf.repository.RepositoryResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by 4535992 on 10/06/2015.
 */
@Controller
@PreAuthorize("hasRole('ROLE_USER')")
@RequestMapping("/sesame")
public class SesameController {

//    @Autowired
//    public MapController(@Value("${sesame.repository.id}")String repositoryID){
//        MapController.repositoryID = repositoryID;
//    }

//   @Autowired
//    MapService mapService;

    // Retrieve the connection factory to access the repository
   /* @Autowired
    protected SesameConnectionFactory repositoryConnectionFactory;
    @Autowired
    protected SesameConnectionFactory repositoryManagerConnectionFactory;

    private static String repositoryID;

    @Autowired
    public SesameController(@Value("${repositoryID}") String repositoryID){
        SesameController.repositoryID = repositoryID;
    }
*/
    private RepositoryConnection conn;

    @Autowired
    protected SesameService sesameService;

    @RequestMapping
    public String showConnection(Model model) {
        try {
            model.addAttribute("REPOID", sesameService.getReposiotryID());
            conn = sesameService.getSesameConnection();
            model.addAttribute("CONN", conn);
            Repository repository2 = conn.getRepository();
            RepositoryResult<org.openrdf.model.Statement> result2 = conn.getStatements(null, null, null, false);
            System.out.println("RESULT"+result2.toString());
            for (int i = 0; i < 25 && result2.hasNext(); i++) {
                org.openrdf.model.Statement stmt = result2.next();
                System.out.println(stmt.toString());
            }
            model.addAttribute("STATEMENTS", result2);
        }catch(java.lang.NullPointerException e){
            System.err.println("No connection on the sesame server");
        } catch (Exception e) {
            if(e.getMessage().contains("No transaction active")){
                System.err.println("No connection on the sesame server");
            }else{
                e.printStackTrace();
            }
        }
        return "riconciliazione2/show/ShowConnection"; //path to jsp file
    }


   /* @SuppressWarnings({ "resource", "unused" })
    public static void main(String[] args) {
        try {
            ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext(new String[] { "spring/loadProperties-context.xml" });
        } catch (Throwable e) {
            System.out.println(e);
        }

        System.out.println("\nLoading Properties from Config File during application startup");
        System.out.println("repositoryID: " + sesameService.getRepositoryID());
    }*/
}
