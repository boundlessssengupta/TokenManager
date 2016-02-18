package com.boundlessgeo.ps.tm.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.boundlessgeo.ps.tm.feign.client.GeoServerClient;
import com.boundlessgeo.ps.tm.feign.model.GeoServerWorkspace;
import com.boundlessgeo.ps.tm.model.Environment;
import com.boundlessgeo.ps.tm.model.Workspace;
import com.boundlessgeo.ps.tm.repositories.EnvironmentRepository;
import com.boundlessgeo.ps.tm.repositories.WorkspaceRepository;

import feign.Feign;
import feign.auth.BasicAuthRequestInterceptor;
import feign.gson.GsonDecoder;

@RepositoryRestController
public class EnvironmentController {

	private final RepositoryEntityLinks entityLinks;
	private final EnvironmentRepository repository;

	@Autowired
	public EnvironmentController(RepositoryEntityLinks links,
			EnvironmentRepository repo) {
		this.entityLinks = links;
		this.repository = repo;
	}

	@RequestMapping(method = RequestMethod.GET,
			value = "/environments/{environmentId}/workspaces")
	public @ResponseBody ResponseEntity<?> getWorkspaces(
			@PathVariable Long environmentId) {
		Environment environment = repository.findOne(environmentId);

		if (null == environment) {
			return ResponseEntity.notFound().build();
		}

		GeoServerClient client = Feign.builder().decoder(new GsonDecoder())
				.requestInterceptor(new BasicAuthRequestInterceptor(
						environment.getGeoserverUser(),
						environment.getGeoserverPassword()))
				.target(GeoServerClient.class, environment.getGeoserverUrl());

		List<GeoServerWorkspace> gsWorkspaces = client.workspaces()
				.getWorkspaces().getWorkspace();
		// Go through each GeoServer workspace and check if it is in the
		// environment's list.
		List<Resource<Workspace>> resourceList = gsWorkspaces.stream()
				.map(gsWorkspace -> {
					Workspace workspace;
					// Find out if this particular GeoServer work space is in
					// the environment's list.
					Optional<Workspace> optionalWorkspace = environment
							.getWorkspaces().stream().filter(ws -> {
						return gsWorkspace.getName().equals(ws.getName());
					}).findFirst();
					if (optionalWorkspace.isPresent()) {
						// If it is in the list, set the transient registered
						// flag to true.
						workspace = optionalWorkspace.get();
						workspace.setRegistered(true);
					} else {
						// If it is not in the list, create a new Workspace
						// object with the name from GeoServer,
						// and set the transient registered flag to false.
						workspace = new Workspace();
						workspace.setName(gsWorkspace.getName());
						workspace.setRegistered(false);
					}
					return workspace;
				}).map(workspace -> {
					// Create a Resource for each Workspace and set the
					// appropriate links.
					// (Not sure if this is really necessary.)
					Resource<Workspace> resource = new Resource<>(workspace);
					if (workspace.getId() > 0) {
						resource.add(entityLinks
								.linkToSingleResource(WorkspaceRepository.class,
										workspace.getId())
								.withSelfRel());
						resource.add(entityLinks
								.linkForSingleResource(
										WorkspaceRepository.class,
										workspace.getId())
								.slash("environment").withRel("environment"));
					}
					return resource;
				}).collect(Collectors.toList());

		Resources<Resource<Workspace>> resources = new Resources<>(
				resourceList);

		return ResponseEntity.ok(resources);
	}
}
