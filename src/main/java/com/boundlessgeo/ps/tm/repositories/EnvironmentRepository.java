/**
 *
 */
package com.boundlessgeo.ps.tm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.boundlessgeo.ps.tm.model.Environment;
import com.boundlessgeo.ps.tm.model.EnvironmentWithProfileName;

/**
 * @author ssengupta
 */
@RepositoryRestResource(excerptProjection = EnvironmentWithProfileName.class)
public interface EnvironmentRepository
		extends CrudRepository<Environment, String> {
}
