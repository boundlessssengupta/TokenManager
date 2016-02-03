/**
 *
 */
package com.boundlessgeo.ps.tm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.boundlessgeo.ps.tm.model.Workspace;

/**
 * @author ssengupta
 */
@RepositoryRestResource
public interface WorkspaceRepository extends CrudRepository<Workspace, Long> {

}
