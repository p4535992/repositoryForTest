package com.github.p4535992.mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by Marco on 11/06/2015.
 */
@Controller
public class ConverterFormatController {

    public com.hp.hpl.jena.rdf.model.Model model = null; // set externally

    @RequestMapping(value="your/service/location", method= RequestMethod.GET, produces={"application/x-javascript", "application/json", "application/ld+json"})
    public @ResponseBody String getModelAsJson() {
        // Your existing json response
        return "your/service/json";
    }

    @RequestMapping(value="your/service/location", method=RequestMethod.GET, produces={"application/xml", "application/rdf+xml"})
    public @ResponseBody String getModelAsXml() {
        // Note that we added "application/rdf+xml" as one of the supported types
        // for this method. Otherwise, we utilize your existing xml serialization
        return "your/service/xml";
    }

    @RequestMapping(value="your/service/location", method=RequestMethod.GET, produces={"application/n-triples"})
    public @ResponseBody String getModelAsNTriples() throws IOException{
        // New method to serialize to n-triple
        try( final ByteArrayOutputStream os = new ByteArrayOutputStream() ){
            model.write(os, "N-TRIPLE");
            return os.toString();
        }
    }

    @RequestMapping(value="your/service/location", method=RequestMethod.GET, produces={"text/turtle;charset=UTF-8"})
    public @ResponseBody String getModelAsTurtle() throws  IOException{
        // New method to serialize to turtle
        try( final ByteArrayOutputStream os = new ByteArrayOutputStream() ){
            model.write(os, "TURTLE");
            //or
            //RDFDataMgr.write(os, model, RDFFormat.TURTLE_PRETTY);
            return os.toString();
        }
    }

    @RequestMapping(value="your/service/location", method=RequestMethod.GET, produces={"text/n3"})
    public @ResponseBody String getModelAsN3() throws  IOException{
        // New method to serialize to N3
        try( final ByteArrayOutputStream os = new ByteArrayOutputStream() ){
            model.write(os, "N3");
            return os.toString();
        }
    }
}
