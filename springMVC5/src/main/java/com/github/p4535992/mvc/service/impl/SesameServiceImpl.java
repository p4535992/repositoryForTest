package com.github.p4535992.mvc.service.impl;

import com.github.p4535992.mvc.repository.dao.SesameRepository;
import com.github.p4535992.mvc.service.dao.SesameService;
import org.openrdf.repository.RepositoryConnection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by 4535992 on 10/06/2015.
 */
@Service
public class SesameServiceImpl implements SesameService{

    @Autowired
    private SesameRepository sesameRepository;

    @Override
    public RepositoryConnection getSesameConnection() {
        return sesameRepository.getSesameConnection();
    }

    @Override
    public String getReposiotryID() {
        return sesameRepository.getRepositoryID();
    }
}
