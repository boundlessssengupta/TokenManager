package com.boundlessgeo.ps.tm.feign.model;

import java.util.List;

public class GeoServerWorkspaceExtraLevel {

	List<GeoServerWorkspace> workspace;

	/**
	 * @return the workspace
	 */
	public List<GeoServerWorkspace> getWorkspace() {
		return workspace;
	}

	/**
	 * @param workspace the workspace to set
	 */
	public void setWorkspace(List<GeoServerWorkspace> workspace) {
		this.workspace = workspace;
	}
}
