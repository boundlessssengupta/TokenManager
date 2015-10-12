/**
 *
 */
package com.boundlessgeo.ps.tm.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;

import com.boundlessgeo.ps.tm.model.Token;

/**
 * @author ssengupta
 */
@RestResource
public interface TokenRepository extends CrudRepository<Token, Long> {

	List<Token> findByTokenValue(@Param("tokenValue") String tokenValue);

}
