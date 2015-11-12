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

	private String applicationName;

	private String owner;

	@OneToMany(mappedBy = "profile", cascade = CascadeType.ALL)
	private List<Environment> environments = new ArrayList<Environment>();

	protected Profile() {

	}

	/**
	 * @param applicationName
	 * @param environment
	 */
	public Profile(String appName) {
		super();
		this.applicationName = appName;
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
	 * @return the applicationName
	 */
	public String getApplicationName() {
		return applicationName;
	}

	/**
	 * @param applicationName
	 *            the applicationName to set
	 */
	public void setApplicationName(String appName) {
		this.applicationName = appName;
	}

	/**
	 * @return the owner
	 */
	public String getOwner() {
		return owner;
	}

	/**
	 * @param owner
	 *            the owner to set
	 */
	public void setOwner(String owner) {
		this.owner = owner;
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
		result = prime * result + (applicationName == null ? 0 : applicationName.hashCode());
		result = prime * result
				+ (environments == null ? 0 : environments.hashCode());
		result = prime * result + (int) (id ^ id >>> 32);
		result = prime * result + (owner == null ? 0 : owner.hashCode());
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
		if (applicationName == null) {
			if (other.applicationName != null) {
				return false;
			}
		} else if (!applicationName.equals(other.applicationName)) {
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
		if (owner == null) {
			if (other.owner != null) {
				return false;
			}
		} else if (!owner.equals(other.owner)) {
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
		builder.append(", applicationName=");
		builder.append(applicationName);
		builder.append(", owner=");
		builder.append(owner);
		builder.append(", environments=");
		builder.append(environments != null
				? environments.subList(0, Math.min(environments.size(), maxLen))
				: null);
		builder.append("]");
		return builder.toString();
	}

}
