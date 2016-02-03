package com.boundlessgeo.ps.tm.feign.client;

import com.boundlessgeo.ps.tm.feign.model.GeoServerWorkspaces;
import feign.RequestLine;

public interface GeoServerClient {

	@RequestLine("GET /rest/workspaces.json")
	GeoServerWorkspaces workspaces();
}
