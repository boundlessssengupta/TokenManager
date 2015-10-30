/**
 *
 */
package com.boundlessgeo.ps.tm.model;

import java.util.List;

import org.springframework.data.rest.core.config.Projection;

/**
 * @author ssengupta
 */
@Projection(name = "environmentWithProfileName", types = { Environment.class })
public interface EnvironmentWithProfileName {
	String getName();

	String getAppToken();

	String getGeoserverUrl();

	List<Token> getTokens();

	List<Workspace> getWorkspaces();

	Profile getProfile();
}
