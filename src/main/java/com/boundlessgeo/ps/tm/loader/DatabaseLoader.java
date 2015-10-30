/**
 *
 */
package com.boundlessgeo.ps.tm.loader;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import com.boundlessgeo.ps.tm.model.Environment;
import com.boundlessgeo.ps.tm.model.Token;
import com.boundlessgeo.ps.tm.model.Workspace;
import com.boundlessgeo.ps.tm.repositories.EnvironmentRepository;
import com.boundlessgeo.ps.tm.repositories.ProfileRepository;
import com.boundlessgeo.ps.tm.repositories.TokenRepository;
import com.boundlessgeo.ps.tm.repositories.WorkspaceRepository;

/**
 * @author ssengupta
 */
@Service
@Profile("default")
public class DatabaseLoader {
	@Autowired
	private ProfileRepository profileRepository;

	@Autowired
	private EnvironmentRepository environmentRepository;

	@Autowired
	private TokenRepository tokenRepository;

	@Autowired
	private WorkspaceRepository workspaceRepository;

	@PostConstruct
	private void initialize() {
		com.boundlessgeo.ps.tm.model.Profile profile = new com.boundlessgeo.ps.tm.model.Profile(
				"usgs");
		profileRepository.save(profile);

		Environment environment = new Environment();
		environment.setId("usgs-dev");
		environment.setName("dev");
		environment.setProfile(profile);
		environment.setAppToken("dummy");
		environment = environmentRepository.save(environment);

		Token token = new Token();
		token.setTokenValue("dummy");
		token.setEnvironment(environment);
		tokenRepository.save(token);

		Workspace workspace = new Workspace();
		workspace.setName("usgs-dev-wc");
		workspace.setEnvironment(environment);
		workspaceRepository.save(workspace);

		environment.getTokens().add(token);
		environment.getWorkspaces().add(workspace);
		profile.getEnvironments().add(environment);
		environmentRepository.save(environment);
	}
}
