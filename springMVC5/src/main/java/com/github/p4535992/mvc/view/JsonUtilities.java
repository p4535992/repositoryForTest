package com.github.p4535992.mvc.view;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;

import java.io.IOException;

/**
 * Created by 4535992 on 10/12/2015.
 */
public class JsonUtilities {


    /**
     * Java program to convert JSON String into Java object using Jackson library.
     * Jackson is very easy to use and require just two lines of code to create a Java object
     * from JSON String format.
     *   @author http://javarevisited.blogspot.com
         Read more:
         http://javarevisited.blogspot.com/2013/
         02/how-to-convert-json-string-to-java-object-jackson-example-tutorial.html#ixzz3tvraaTP7

     maven: dependency: org.codehaus.jackson.jackson-xc, org.codehaus.jackson.jackson-mapper-asl,
                        org.codehaus.jackson.jackson-core-asl
     */
    public static  <T> T fromJson(String json,Class<T> classToMap) throws IOException{
        return new ObjectMapper().readValue(json, classToMap);
    }





}
