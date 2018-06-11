package com.github.p4535992.mvc.object.model.site;

import java.io.Serializable;

/**
 * Created by 4535992 on 18/06/2015.
 * @author 4535992.
 * @version 2015-07-02.
 */
public class MarkerInfo  implements Serializable {

    private String city;
    private String province;
    private String region;
    private String phone;
    private String fax;
    private String address;
    private String iva;
    private String email;
    private String description;

    public MarkerInfo(){}

    public MarkerInfo(String city,String province,String region,String phone,String fax,
                      String address,String iva,String email,String description){
        this.city= city;
        this.province = province;
        this.region = region;
        this.phone = phone;
        this.fax = fax;
        this.address = address;
        this.iva = iva;
        this.email = email;
        this.description = description;
    }


    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIva() {
        return iva;
    }

    public void setIva(String iva) {
        this.iva = iva;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
