package com.github.p4535992.mvc.controller;

import com.github.p4535992.mvc.object.model.site.Marker;
import com.github.p4535992.mvc.object.model.site.MarkerInfo;
import com.github.p4535992.mvc.object.model.site.MarkerList;
import com.github.p4535992.mvc.service.dao.FileService;
import com.github.p4535992.mvc.service.dao.MapService;
import com.github.p4535992.mvc.view.JsonUtilities;

import com.github.p4535992.util.html.JSoupUtilities;
import com.github.p4535992.util.string.StringUtilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 4535992 on 11/06/2015.
 * @author 4535992.
 * @version 2015-07-02.
 * href: https://gerrydevstory.com/2013/08/14/posting-json-to-spring-mvc-controller/
 */
@Controller
@PreAuthorize("hasRole('ROLE_USER')")
public class MapController {

    private static final org.slf4j.Logger logger =
            org.slf4j.LoggerFactory.getLogger(MapController.class);

    @Autowired
    MapService mapService;

    @Autowired
    FileService fileService;

    Marker marker;
    List<Marker> arrayMarker = new ArrayList<>();
    //List<Marker> supportArray = new ArrayList<>();
    Integer indiceMarker = 0;

    /*@RequestMapping(value="/map",method= RequestMethod.GET)
    public String loadMap1(Model model){
        String html = mapService.getResponseHTMLString();
        return "riconciliazione2/mappa/map";
    }
    @RequestMapping(value="/map",method = RequestMethod.POST)
    public String result(@RequestParam(required=false, value="urlParam")String url,Model model){
        System.out.println("url: " + url);
        return "home";
    }*/


    @RequestMapping(value="/map",method= RequestMethod.GET)
    public String loadMap2(Model model){
        //String html = mapService.getResponseHTMLString();
        //Site siteForm = new Site();
        //model.addAttribute("siteForm",siteForm);
        if(!arrayMarker.isEmpty()) model.addAttribute("arrayMarker",arrayMarker);
        else model.addAttribute("arrayMarker",null);

        if(marker!=null)model.addAttribute("marker",marker);
        else model.addAttribute("marker",null);

        model.addAttribute("indiceMarker",indiceMarker);
        model.addAttribute("urlParam",null);

        String html = mapService.getResponseHTMLString();
        model.addAttribute("HTML",html);

        return "riconciliazione2/mappa/leafletMap";
    }


    /*@RequestMapping("*")
    public String hello(HttpServletRequest request,Model model) {
        System.out.println(request.getServletPath());
        String MAIN = mapService.homeMain();
        model.addAttribute("MAIN",MAIN);
        return "main";
    }*/

    @RequestMapping(value="/",method= RequestMethod.GET)
    public String homeMain(Model model){
        //String MAIN = mapService.homeMain();
        //model.addAttribute("MAIN",MAIN);
        return "main";
    }

    @RequestMapping(value="/main",method= RequestMethod.GET)
    public String homeMain2(Model model){
        //String MAIN = mapService.homeMain();
        //model.addAttribute("MAIN",MAIN);
        return "main";
    }


    //---------------------------------------------------------
    // NEW GET METHOD
    //---------------------------------------------------------
    @RequestMapping(value="/map13",method= RequestMethod.GET)
    public String loadMap13(){
        Model model = new ExtendedModelMap();
        //String html = mapService.getResponseHTMLString();
        //Site siteForm = new Site();
        //model.addAttribute("siteForm",siteForm);
        if(!arrayMarker.isEmpty()) model.addAttribute("arrayMarker",arrayMarker);
        else model.addAttribute("arrayMarker",null);

        if(marker!=null)model.addAttribute("marker",marker);
        else model.addAttribute("marker",null);

        model.addAttribute("indiceMarker",indiceMarker);
        model.addAttribute("urlParam",null);

        //String html = mapService.getResponseHTMLString();
        //model.addAttribute("HTML",html);
        //model.addAttribute("supportArray",supportArray);
        return "riconciliazione2/mappa/leafletMap3";
    }

    //---------------------------------------------------------
    // NEW POST METHOD
    //---------------------------------------------------------


    @RequestMapping(value="/map3",method = RequestMethod.POST)
    public String result4(@RequestParam(required=false, value="urlParam")String url,
                          @RequestParam(required=false,value="arrayParam")List<String> arrayParam
                          //@ModelAttribute(value="arrayParam") MarkerList arrayParam
                          //@ModelAttribute(value="markerParam")Marker markerFromJS
    ){

        if(arrayParam!= null && !arrayParam.isEmpty()){
            for(String smarker : arrayParam){
                if(StringUtilities.isNullOrEmpty(smarker))continue;
                marker = new Marker();
                try {
                   marker = JsonUtilities.fromJson(smarker,Marker.class);
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
                arrayMarker.add(marker);
                indiceMarker++;
            }
        }

        if(!StringUtilities.isNullOrEmpty(url)) {
            String[] splitter;
            if (url.contains(",")) {
                splitter = url.split(",");
                url = splitter[0];
            }

            System.out.println("url: " + url);
            marker = new Marker();
            marker = mapService.createMarkerFromGeoDocument(url);
            // = new Marker("City",url,"43.3555664", "11.0290384");
            //model.addAttribute("marker",marker); //no need is get from the HTTTP GET COMMAND
            arrayMarker.add(marker);
            indiceMarker++;
        }
        return "redirect:/map13";
    }

    @RequestMapping(value = "/markers", method = RequestMethod.POST)
    public @ResponseBody String myTestMethod(@RequestBody MarkerList markers, HttpServletRequest request, HttpServletResponse response)
            throws Exception{
            // my code
        for(Marker marker : markers.getMarkers()){
            System.out.println(marker.toString());
        }
        return "";
    }

    @RequestMapping(value="/map42",method = RequestMethod.POST)
    public String result42(@RequestParam(required=false,value="arrayParam")List<String> arrayParam,
                         @RequestParam(required=false, value="supportUploaderParam") String fileUrl,
                         Model model) throws Exception {

        if(!arrayParam.isEmpty()){
            for(String smarker : arrayParam){
                marker = new Marker();
                try {
                    marker = JsonUtilities.fromJson(smarker,Marker.class);
                } catch (IOException ioe) {
                    ioe.printStackTrace();
                }
                arrayMarker.add(marker);
            }
        }
        for(Marker marker : arrayMarker){
            Marker mk;
            MarkerInfo mki =new MarkerInfo();

            List<List<List<String>>> info = JSoupUtilities.TablesExtractor(marker.getPopupContent(),false);
            for(List<List<String>> listOfList : info ){
                for(List<String> list : listOfList){
                    if(list.get(0).toLowerCase().contains("country")){ mki.setRegion(list.get(1).replaceAll("\"","")); continue;}
                    if(list.get(0).toLowerCase().contains("name")){ mki.setCity(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("city")){ mki.setCity(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("email")){ mki.setEmail(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("phone")){ mki.setPhone(list.get(1).replaceAll("\"", ""));continue;}
                    if(list.get(0).toLowerCase().contains("fax")){ mki.setFax(list.get(1).replaceAll("\"", ""));continue;}
                    mki.setDescription(list.get(0).replaceAll("\"", "")+"="+list.get(1).replaceAll("\"","")+";");
                }
            }
            mk = new Marker(marker.getName(),marker.getUrl(),marker.getLatitude(),marker.getLongitude(),mki);
            arrayMarker.remove(marker);
            arrayMarker.add(mk);
        }
        return "redirect:/map13";
    }

    @RequestMapping(value="/map4",method = RequestMethod.POST)
    public String result(@RequestParam(required=false, value="nameParam1")List<String> name,
                         @RequestParam(required=false, value="latParam1")List<String> lat,
                         @RequestParam(required=false, value="lngParam1")List<String> lng,
                         @RequestParam(required=false, value="descriptionParam1")List<String> description,
                         @RequestParam(required=false, value="supportUploaderParam") String fileUrl,
                         Model model) throws Exception {
        Marker mk;
        MarkerInfo mki =new MarkerInfo();
        for(int i = 0; i < name.size(); i++){

            List<List<List<String>>> info = JSoupUtilities.TablesExtractor(description.get(i),false);
            for(List<List<String>> listOfList : info ){
                for(List<String> list : listOfList){
                    if(list.get(0).toLowerCase().contains("country")){ mki.setRegion(list.get(1).replaceAll("\"","")); continue;}
                    if(list.get(0).toLowerCase().contains("name")){ mki.setCity(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("city")){ mki.setCity(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("email")){ mki.setEmail(list.get(1).replaceAll("\"", "")); continue;}
                    if(list.get(0).toLowerCase().contains("phone")){ mki.setPhone(list.get(1).replaceAll("\"", ""));continue;}
                    if(list.get(0).toLowerCase().contains("fax")){ mki.setFax(list.get(1).replaceAll("\"", ""));continue;}
                    mki.setDescription(list.get(0).replaceAll("\"", "")+"="+list.get(1).replaceAll("\"","")+";");
                }
            }
            mk = new Marker(name.get(i),fileUrl,lat.get(i),lng.get(i),mki);
            arrayMarker.add(mk);
        }
        return "redirect:/map13";
    }


    //----------------------------------------------
    //NEW METHOD FOR UPLOAD FILE
    //----------------------------------------------

    List<File> listFiles = new ArrayList<>();

    @RequestMapping(value="/fileupload",method=RequestMethod.POST )
    public @ResponseBody String uploadFile(@RequestParam("uploader") MultipartFile file){
        try{
            logger.info("file is " + file.toString());
        }catch(Exception e){
            return "error occured "+e.getMessage();
        }
        return "redirect:/map13";
    }

    /**
     * Upload single file using Spring Controller
     * e.g. usage:
      <c:url var="url3" value="/uploadFile" />
     <%--<jsp:useBean id="_csrf" scope="request" type="org.springframework.security.web.csrf.CsrfAuthenticationStrategy.SaveOnAccessCsrfToken"/>--%>
     <form:form method="post" action="${url3}?${_csrf.parameterName}=${_csrf.token}" enctype="multipart/form-data">
         File to upload:<input type="file" name="file" title="x"><br />
         Name:<input type="text" name="name" title="x"><br />
         <input type="submit" value="Upload"> Press here to upload the file!
         <%-- <input type="hidden"  name="${_csrf.parameterName}"   value="${_csrf.token}"/>--%>
     </form:form>

     Usage with Name:
     public @ResponseBody String uploadFileHandler(@RequestParam("name") String name,@RequestParam("file") MultipartFile file) {
     */
    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    public @ResponseBody String uploadFileHandler(@RequestParam("file") MultipartFile file) {
        String name = file.getOriginalFilename();
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists()) dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath() + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream( new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                logger.info("You successfully uploaded file=" + name);
                listFiles.add(convertMultiPartFileToFile(file));
                for(File file2: listFiles){
                    arrayMarker.addAll(fileService.convertToMarkers(fileService.toList(file2)));
                }

                //return "redirect:/map13";
                return loadMap13();
            } catch (Exception e) {
                logger.error("You failed to upload " + name + " => " + e.getMessage());
                return "redirect:/map13";
            }
        } else {
            logger.info("You failed to upload " + name + " because the file was empty.");
            return "redirect:/map13";
        }
    }

    /**
     * Upload multiple file using Spring Controller
     */
    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody String uploadMultipleFileHandler(@RequestParam("name") String[] names,
                                     @RequestParam("file") MultipartFile[] files) throws IOException {
        if (files.length != names.length){
            logger.warn("Mandatory information missing");
           return null;
        }
        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            listFiles.add(convertMultiPartFileToFile(file));
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                logger.info("Server File Location=" + serverFile.getAbsolutePath());
                message = message + "You successfully uploaded file=" + name
                        + "<br />";
            } catch (Exception e) {
                logger.error("You failed to upload " + name + " => " + e.getMessage());
                return "redirect:/map13";
            }
        }
        logger.info(message);
        return "redirect:/map13";
    }


    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }






}
