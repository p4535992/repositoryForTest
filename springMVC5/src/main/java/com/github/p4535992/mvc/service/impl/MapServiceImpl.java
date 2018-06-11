package com.github.p4535992.mvc.service.impl;

import com.github.p4535992.mvc.object.model.site.Marker;
import com.github.p4535992.mvc.repository.dao.MapRepository;
import com.github.p4535992.mvc.service.dao.MapService;
import org.openrdf.repository.RepositoryConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.sql.Connection;

@Service
public class MapServiceImpl implements MapService {

    @Qualifier("mapRepositoryImpl")
    @Autowired
    MapRepository mapRepository;

   /* @Override
    public RepositoryConnection getSesameLocalConnection() {
        return mapRepository.getSesameLocalConnection();
    }*/

    @Override
    public RepositoryConnection getSesameRemoteConnection() {
        return mapRepository.getSesameRemoteConnection();
    }

    @Override
    public String getResponseHTMLString() {
        return mapRepository.getResponseHTMLString();
    }

    @Override
    public String riconciliazione() {
        return mapRepository.riconciliazione();
    }

    @Override
    public String homeMain() {
        return mapRepository.homeMain();
    }

    @Override
    public String query() {
        return null;
    }

    @Override
    public String riconciliazioneAlternative() {
        return mapRepository.riconciliazioneAlternative();
    }

    @Override
    public String riconciliazione_bus() {
        return mapRepository.riconciliazione_bus();
    }

    @Override
    public String riconciliazione_comuni_sbagliati() {
        return mapRepository.riconciliazione_comuni_sbagliati();
    }

    @Override
    public String riconciliazione_contains() {
        return mapRepository.riconciliazione_contains();
    }

    @Override
    public String riconciliazione_geocode() {
        return mapRepository.riconciliazione_geocode();
    }

    @Override
    public String riconciliazione_geocode_strada() {
        return mapRepository.riconciliazione_geocode_strada();
    }

    @Override
    public String riconciliazione_isin() {
        return mapRepository.riconciliazione_isin();
    }

    @Override
    public String riconciliazione_last_word() {
        return mapRepository.riconciliazione_last_word();
    }

    @Override
    public String riconciliazione_senza_virgola() {
        return mapRepository.riconciliazione_senza_virgola();
    }

    @Override
    public String riconciliazione_strade() {
        return mapRepository.riconciliazione_strade();
    }

    @Override
    public String riconciliazione_trattino() {
        return mapRepository.riconciliazione_trattino();
    }

    @Override
    public Marker createMarkerFromGeoDocument(String url){
        return mapRepository.createMarkerFromGeoDocument(url);
    }


}
