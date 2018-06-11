package com.github.p4535992.mvc.service.dao;

import com.github.p4535992.mvc.object.model.site.Marker;

import java.io.File;
import java.util.List;

/**
 * Created by tenti on 23/01/2016.
 */
public interface FileService {

    List<String[]> toList(File fileTextCommaSeparator);
    List<Marker> convertToMarkers(List<String[]> content);
    Marker convertToMarker(String[] row, String[] headers);
}
