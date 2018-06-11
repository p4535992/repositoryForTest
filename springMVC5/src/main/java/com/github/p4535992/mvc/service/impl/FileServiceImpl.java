package com.github.p4535992.mvc.service.impl;

import com.github.p4535992.mvc.object.model.site.Marker;
import com.github.p4535992.mvc.object.model.site.MarkerInfo;
import com.github.p4535992.mvc.service.dao.FileService;
import com.github.p4535992.util.file.csv.opencsv.OpenCsvUtilities;
import com.opencsv.CSVWriter;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Created by 4535992 on 23/01/2016.
 * @author 4535992.
 */
@Service
public class FileServiceImpl implements FileService{

    Pattern patternLng = Pattern.compile("(L|l)(on|ng)(gitude)?",Pattern.CASE_INSENSITIVE);
    Pattern patternLat = Pattern.compile("(L|l)(at)(itude)?",Pattern.CASE_INSENSITIVE);

    @Override
    public List<String[]> toList(File fileTextCommaSeparator) {
        return OpenCsvUtilities.parseCSVFileAsListWithUnivocity(fileTextCommaSeparator,false);
    }

    @Override
    public List<Marker> convertToMarkers(List<String[]> content) {
        String[] headers = content.get(0);
        List<Marker> markers = new ArrayList<>();
        content.remove(0);
        for(String[] row : content){
            markers.add(convertToMarker(row,headers));
        }
        return markers;
    }

    @Override
    public Marker convertToMarker(String[] row, String[] headers) {
        Marker marker = new Marker();
        String valueLat =
                row[getIndexField(headers,
                        OpenCsvUtilities.getFieldLatitude(headers))];
        String valueLng =
                row[getIndexField(headers,
                        OpenCsvUtilities.getFieldLongitude(headers))];

        marker.setLatitude(valueLat);
        marker.setLongitude(valueLng);
        MarkerInfo info = new MarkerInfo();
        for (String value : row) {
            Integer iValue = getIndexField(row,value);
            String header = headers[iValue];
            if (header.toLowerCase().contains("name")) {
                marker.setName(value);
            } else if (header.toLowerCase().contains("id")) {
                marker.setId(value);
            } else if (header.toLowerCase().contains("url")) {
                marker.setUrl(value);
            } else if (header.toLowerCase().contains("address")) {
                info.setAddress(value);
            } else if (header.toLowerCase().contains("phone")) {
                info.setPhone(value);
            } else if (header.toLowerCase().contains("fax")) {
                info.setFax(value);
            } else if (header.toLowerCase().contains("mail")) {
                info.setEmail(value);
            } else if (header.toLowerCase().contains("city")) {
                info.setCity(value);
            }else if (header.toLowerCase().contains("country")||
                    header.toLowerCase().contains("region")) {
                info.setRegion(value);
            }else if(patternLat.matcher(String.valueOf(header)).matches() ||
                    patternLng.matcher(String.valueOf(header)).matches()){

            }else {
                if (info.getDescription() == null)
                    info.setDescription(header+":"+value+";");
                else
                    info.setDescription(
                        info.getDescription() + ";" + header+":"+value+";");
            }
        }//end of row
        marker.setMarkerInfo(info);
        return marker;
    }

    public static <T> Integer getIndexField(T[] array,T field){
        return Arrays.asList(array).indexOf(field);
    }
}
