/**
 *
 */
package com.boundlessgeo.ps.tm.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.boundlessgeo.ps.tm.TokenGenerator;

/**
 * @author ssengupta
 */
@Entity
public class Environment {

	@Id
	private String id;

	private String name;

	private String appToken;

	private String geoserverUrl;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PROFILE_ID")
	private Profile profile;

	@OneToMany(mappedBy = "environment", cascade = CascadeType.ALL)
	private List<Token> tokens = new ArrayList<Token>();

	@OneToMany(mappedBy = "environment", cascade = CascadeType.ALL)
	private List<Workspace> workspaces = new ArrayList<Workspace>();

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the appToken
	 */
	public String getAppToken() {
		return appToken;
	}

	/**
	 * @param appToken
	 *            the appToken to set
	 */
	public void setAppToken(String appToken) {
		this.appToken = TokenGenerator.generate();
	}

	/**
	 * @return the profile
	 */
	public Profile getProfile() {
		return profile;
	}

	/**
	 * @param profile
	 *            the profile to set
	 */
	public void setProfile(Profile profile) {
		this.profile = profile;
	}

	/**
	 * @return the geoserverUrl
	 */
	public String getGeoserverUrl() {
		return geoserverUrl;
	}

	/**
	 * @param geoserverUrl
	 *            the geoserverUrl to set
	 */
	public void setGeoserverUrl(String geoserverUrl) {
		this.geoserverUrl = geoserverUrl;
	}

	/**
	 * @return the tokens
	 */
	public List<Token> getTokens() {
		return tokens;
	}

	/**
	 * @param tokens
	 *            the tokens to set
	 */
	public void setTokens(List<Token> userTokens) {
		this.tokens = userTokens;
	}

	/**
	 * @return the workspaces
	 */
	public List<Workspace> getWorkspaces() {
		return workspaces;
	}

	/**
	 * @param workspaces
	 *            the workspaces to set
	 */
	public void setWorkspaces(List<Workspace> workspaces) {
		this.workspaces = workspaces;
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (appToken == null ? 0 : appToken.hashCode());
		result = prime * result
				+ (geoserverUrl == null ? 0 : geoserverUrl.hashCode());
		result = prime * result + (id == null ? 0 : id.hashCode());
		result = prime * result + (name == null ? 0 : name.hashCode());
		result = prime * result + (profile == null ? 0 : profile.hashCode());
		result = prime * result + (tokens == null ? 0 : tokens.hashCode());
		result = prime * result
				+ (workspaces == null ? 0 : workspaces.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		if (!(obj instanceof Environment)) {
			return false;
		}
		Environment other = (Environment) obj;
		if (appToken == null) {
			if (other.appToken != null) {
				return false;
			}
		} else if (!appToken.equals(other.appToken)) {
			return false;
		}
		if (geoserverUrl == null) {
			if (other.geoserverUrl != null) {
				return false;
			}
		} else if (!geoserverUrl.equals(other.geoserverUrl)) {
			return false;
		}
		if (id == null) {
			if (other.id != null) {
				return false;
			}
		} else if (!id.equals(other.id)) {
			return false;
		}
		if (name == null) {
			if (other.name != null) {
				return false;
			}
		} else if (!name.equals(other.name)) {
			return false;
		}
		if (profile == null) {
			if (other.profile != null) {
				return false;
			}
		} else if (!profile.equals(other.profile)) {
			return false;
		}
		if (tokens == null) {
			if (other.tokens != null) {
				return false;
			}
		} else if (!tokens.equals(other.tokens)) {
			return false;
		}
		if (workspaces == null) {
			if (other.workspaces != null) {
				return false;
			}
		} else if (!workspaces.equals(other.workspaces)) {
			return false;
		}
		return true;
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		final int maxLen = 2;
		StringBuilder builder = new StringBuilder();
		builder.append("Environment [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", appToken=");
		builder.append(appToken);
		builder.append(", geoserverUrl=");
		builder.append(geoserverUrl);
		builder.append(", profile=");
		builder.append(profile);
		builder.append(", tokens=");
		builder.append(tokens != null
				? tokens.subList(0, Math.min(tokens.size(), maxLen)) : null);
		builder.append(", workspaces=");
		builder.append(workspaces != null
				? workspaces.subList(0, Math.min(workspaces.size(), maxLen))
				: null);
		builder.append("]");
		return builder.toString();
	}

}
