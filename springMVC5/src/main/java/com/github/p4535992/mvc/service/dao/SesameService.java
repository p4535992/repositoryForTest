package com.github.p4535992.mvc.service.dao;

import org.openrdf.repository.RepositoryConnection;

/**
 * Created by 4535992 on 10/06/2015.
 */
public interface SesameService {

    RepositoryConnection getSesameConnection();

    String getReposiotryID();
}
