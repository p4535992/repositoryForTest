package com.github.p4535992.mvc.repository.dao;

import com.github.p4535992.mvc.object.model.site.Marker;
import org.openrdf.repository.RepositoryConnection;

import java.sql.Connection;

/**
 * Created by 4535992 on 11/06/2015.
 */
public interface MapRepository {

    Marker createMarkerFromGeoDocument(String url);

//    RepositoryConnection getSesameLocalConnection();
    RepositoryConnection getSesameRemoteConnection();

    String getResponseHTMLString();

    String riconciliazione();

    String homeMain();

    String query(String via, String tipo);

    String riconciliazioneAlternative();

    String riconciliazione_bus();

    String riconciliazione_comuni_sbagliati();

    String riconciliazione_contains();//riconciliazione_contains


    String riconciliazione_geocode();

    String riconciliazione_geocode_strada(); //riconciliazione_geocode_strada


    String riconciliazione_isin();

    String riconciliazione_last_word();

    String riconciliazione_senza_virgola();

    String riconciliazione_strade(); //riconciliazione_strade

    String riconciliazione_trattino();
}
