/**
 *
 */
package com.boundlessgeo.ps.tm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.boundlessgeo.ps.tm.model.Environment;

/**
 * @author ssengupta
 */
@RestResource
public interface EnvironmentRepository
		extends CrudRepository<Environment, String> {
}
