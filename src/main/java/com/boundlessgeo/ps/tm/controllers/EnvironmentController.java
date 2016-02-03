package com.boundlessgeo.ps.tm.controllers;

import java.util.List;
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

import com.boundlessgeo.ps.tm.model.Environment;
import com.boundlessgeo.ps.tm.model.Workspace;
import com.boundlessgeo.ps.tm.repositories.EnvironmentRepository;
import com.boundlessgeo.ps.tm.repositories.WorkspaceRepository;

@RepositoryRestController
public class EnvironmentController {

	private final RepositoryEntityLinks entityLinks;
	private final EnvironmentRepository repository;

	@Autowired
	public EnvironmentController(RepositoryEntityLinks links, EnvironmentRepository repo) {
		this.entityLinks = links;
		this.repository = repo;
	}

    @RequestMapping(method = RequestMethod.GET, value = "/environments/{environmentId}/workspaces")
    public @ResponseBody ResponseEntity<?> getWorkspaces(@PathVariable Long environmentId) {
        Environment environment = repository.findOne(environmentId);

        if (null == environment) {
        	return ResponseEntity.notFound().build();
        }

        // TODO: Connecting to GeoServer goes here.

        List<Resource<Workspace>> resourceList = environment.getWorkspaces().stream().map(workspace -> {
        	Resource<Workspace> resource = new Resource<>(workspace);
        	resource.add(entityLinks.linkToSingleResource(WorkspaceRepository.class, workspace.getId()).withSelfRel());
        	resource.add(entityLinks.linkForSingleResource(WorkspaceRepository.class, workspace.getId()).slash("environment").withRel("environment"));
        	return resource;
        }).collect(Collectors.toList());

        Resources<Resource<Workspace>> resources = new Resources<>(resourceList);

        return ResponseEntity.ok(resources);
    }
}
