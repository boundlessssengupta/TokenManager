/**
 *
 */
package com.boundlessgeo.ps.tm.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * @author ssengupta
 */
@Entity
public class Profile {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String appUsername;

	@OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
	private List<Environment> environments = new ArrayList<Environment>();

	protected Profile() {

	}

	/**
	 * @param appUsername
	 * @param environment
	 */
	public Profile(String appUsername) {
		super();
		this.appUsername = appUsername;
	}

	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}

	/**
	 * @return the appUsername
	 */
	public String getAppUsername() {
		return appUsername;
	}

	/**
	 * @param appUsername
	 *            the appUsername to set
	 */
	public void setAppUsername(String appUsername) {
		this.appUsername = appUsername;
	}

	/**
	 * @return the environments
	 */
	public List<Environment> getEnvironments() {
		return environments;
	}

	/**
	 * @param environments
	 *            the environments to set
	 */
	public void setEnvironments(List<Environment> environments) {
		this.environments = environments;
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ (appUsername == null ? 0 : appUsername.hashCode());
		result = prime * result
				+ (environments == null ? 0 : environments.hashCode());
		result = prime * result + (int) (id ^ id >>> 32);
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
		if (!(obj instanceof Profile)) {
			return false;
		}
		Profile other = (Profile) obj;
		if (appUsername == null) {
			if (other.appUsername != null) {
				return false;
			}
		} else if (!appUsername.equals(other.appUsername)) {
			return false;
		}
		if (environments == null) {
			if (other.environments != null) {
				return false;
			}
		} else if (!environments.equals(other.environments)) {
			return false;
		}
		if (id != other.id) {
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
		builder.append("Profile [id=");
		builder.append(id);
		builder.append(", appUsername=");
		builder.append(appUsername);
		builder.append(", environments=");
		builder.append(environments != null
				? environments.subList(0, Math.min(environments.size(), maxLen))
				: null);
		builder.append(", userTokens=");
		builder.append("]");
		return builder.toString();
	}

}
