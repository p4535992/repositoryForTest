package com.github.p4535992.mvc.controller;

import com.github.p4535992.mvc.object.model.site.Site;
import com.github.p4535992.mvc.object.model.site.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by 4535992 on 11/06/2015.
 */
@Controller
@RequestMapping(value = "/show")
public class RegisterController {

    @RequestMapping(value = "/register",method = RequestMethod.GET)
    public String viewRegistration(Map<String, Object> model) {
        User userForm = new User();
        model.put("userForm", userForm);
        Model model2 = (Model) model;
        List<String> professionList = new ArrayList<>();
        professionList.add("Developer");
        professionList.add("Designer");
        professionList.add("IT Manager");
        model.put("professionList", professionList);
        return "form/register";
    }

    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public String processRegistration(@ModelAttribute("userForm") User user,Map<String, Object> model) {

        // implement your own registration logic here...

        // for testing purpose:
        System.out.println("username: " + user.getUsername());
        System.out.println("password: " + user.getPassword());
        return "form/registerSuccess";
    }

    @RequestMapping(value="/test",method= RequestMethod.GET)
    public String loadSite1(Model model){
        Site siteForm = new Site();
        model.addAttribute("siteForm", siteForm);
        return "form/testForm";
    }

    @RequestMapping(value="/test",method = RequestMethod.POST)
    public String result(@ModelAttribute("siteForm")Site site,Model model){
        System.out.println("url: " + site.getUrl());
        return "home";
    }

    @RequestMapping(value="/test2",method= RequestMethod.GET)
    public String loadSite2(Model model){
        Site siteForm = new Site();
        model.addAttribute("siteForm", siteForm);
        return "form/testForm";
    }


    @RequestMapping(value="/test2",method = RequestMethod.POST)
    public String result(@RequestParam(required=false, value="urlParam")String url,Model model){
        System.out.println("url: " + url);
        return "home";
    }
}

