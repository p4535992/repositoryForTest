package com.github.p4535992.mvc.object.model.site;

import com.github.p4535992.util.string.StringUtilities;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by 4535992 on 18/06/2015.
 */
public class Marker  implements Serializable {

    private String id;
    private String name;
    private String url;
    private String latitude;
    private String longitude;
    private String popupContent;
    private String category;

    private MarkerInfo markerInfo;

    public Marker(){
        this.setId(null);
    }

    public Marker(String name,String url,String latitude,String longitude,String popupContent){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.popupContent = popupContent;
        this.setId(name);
    }

    public Marker(String name,String url,String latitude,String longitude){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.setId(name);

    }

    public Marker(String name,String url,String latitude,String longitude,String popupContent,String category,String id){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.popupContent = popupContent;
        this.category = category;
        this.id = id;
    }

    public Marker(String name,String latitude,String longitude,String popupContent,String category,String id){
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.popupContent = popupContent;
        this.category = category;
        this.id = id;
    }

    public Marker(String name,String url,String latitude,String longitude,MarkerInfo markerInfo){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.markerInfo = markerInfo;
        this.setId(name);
    }

    public Marker(String name,String url,String latitude,String longitude,MarkerInfo markerInfo,String popupContent){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.markerInfo = markerInfo;
        this.popupContent = popupContent;
        this.setId(name);
    }

    public Marker(String id,String name,String url,String latitude,String longitude,MarkerInfo markerInfo,String popupContent){
        this.name = name;
        this.url = url;
        this.latitude = latitude;
        this.longitude = longitude;
        this.markerInfo = markerInfo;
        this.popupContent = popupContent;
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if(StringUtilities.isNullOrEmpty(id)){
            this.id = generateToken();
        }
        else this.id = StringUtilities.toMD5(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public MarkerInfo getMarkerInfo() {
        return markerInfo;
    }

    public void setMarkerInfo(MarkerInfo markerInfo) {
        this.markerInfo = markerInfo;
    }

    public String getPopupContent() {
        return popupContent;
    }

    public void setPopupContent(String popupContent) {
        this.popupContent = popupContent;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setPopupContentMarker(MarkerInfo mki) {
        String content = "<div class=\"popup-content\"><table class=\"table table-striped table-bordered table-condensed\">";
        content += "<tr><th>City</th><td>" +  ((mki.getCity() == null) ? "" : mki.getCity()) + "</td></tr>";
        content += "<tr><th>Province</th><td>" + ((mki.getProvince() == null) ? "" : mki.getProvince()) + "</td></tr>";
        content += "<tr><th>Region</th><td>" + ((mki.getRegion() == null) ? "" :mki.getRegion()) + "</td></tr>";
        content += "<tr><th>Phone</th><td>" + ((mki.getPhone() == null) ? "" : mki.getPhone()) + "</td></tr>";
        content += "<tr><th>Fax</th><td>" + ((mki.getFax() == null) ? "" : mki.getFax()) + "</td></tr>";
        content += "<tr><th>Address</th><td>" + ((mki.getAddress() == null) ? "" : mki.getAddress()) + "</td></tr>";
        content += "<tr><th>IVA</th><td>" + ((mki.getIva() == null) ? "" : mki.getIva()) + "</td></tr>";
        content += "<tr><th>Email</th><td>" + ((mki.getEmail() == null) ? "" : mki.getEmail()) + "</td></tr>";
        content += "<tr><th>Description</th><td>" + ((mki.getDescription() == null) ? "" :mki.getDescription()) + "</td></tr>";
        content += "</table></div>";

       /* Object o = mki;
        for (Field field : o.getClass().getDeclaredFields()) {
            Class t = field.getType();
            Object v = field.get(o);
            if (boolean.class.equals(t) && Boolean.FALSE.equals(v)){}
            // found default value
            else if (char.class.equals(t) && ((Character) v) != Character.MIN_VALUE){}
            // found default value
            else if (t.isPrimitive() && ((Number) v).doubleValue() == 0){}
            // found default value
            else if(!t.isPrimitive() && v == null){}
            // found default value
        }*/
        this.popupContent = content;
    }

    @Override
    public String toString() {
        return "Marker{" +
                "name='" + name + '\'' +
                ", url='" + url + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", markerInfo=" + markerInfo +
                '}';
    }

    private String generateToken(){
        MessageDigest md;
        try {
            md = MessageDigest.getInstance("MD5");
        } catch (NoSuchAlgorithmException e) {
            // coding error.
            //LOGGER.error("codeing error. ", e);
            throw new RuntimeException(e);
        }
        StringBuilder hexString = new StringBuilder();
        byte[] data = md.digest(RandomStringUtils.randomAlphabetic(10).getBytes());
        for (byte aData : data) {
            hexString.append(Integer.toHexString((aData >> 4) & 0x0F));
            hexString.append(Integer.toHexString(aData & 0x0F));
        }
        return hexString.toString();
    }
}
