/**
 *
 */
package com.boundlessgeo.ps.tm.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import com.boundlessgeo.ps.tm.model.Profile;

/**
 * @author ssengupta
 */
@RestResource
public interface ProfileRepository extends CrudRepository<Profile, Long> {
}
