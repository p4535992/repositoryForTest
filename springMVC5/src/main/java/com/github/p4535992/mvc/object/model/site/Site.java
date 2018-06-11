package com.github.p4535992.mvc.object.model.site;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by 4535992 on 11/06/2015.
 */
@XmlRootElement
public class Site {

    private String url;

    public String getUrl() {
        return url;
    }

    @XmlElement
    public void setUrl(String url) {
        this.url = url;
    }
}
