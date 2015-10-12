/**
 *
 */
package com.boundlessgeo.ps.tm.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;

import com.boundlessgeo.ps.tm.TokenGenerator;

/**
 * @author ssengupta
 */
@Entity
public class Token {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	private String tokenValue;

	private long createdDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ENVIRONMENT_ID")
	private Environment environment;

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
	 * @return the environment
	 */
	public Environment getEnvironment() {
		return environment;
	}

	/**
	 * @param environment
	 *            the environment to set
	 */
	public void setEnvironment(Environment environment) {
		this.environment = environment;
	}

	/**
	 * @return the tokenValue
	 */
	public String getTokenValue() {
		return tokenValue;
	}

	/**
	 * @param tokenValue
	 *            the tokenValue to set
	 */
	public void setTokenValue(String token) {
		this.tokenValue = TokenGenerator.generate();
	}

	/**
	 * @return the createdDate
	 */
	public long getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate
	 *            the createdDate to set
	 */
	public void setCreatedDate(long createdDate) {
		this.createdDate = createdDate;
	}

	@PrePersist
	public void prePersist() {
		this.setCreatedDate(new Date().getTime());
	}

	/*
	 * (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (createdDate ^ createdDate >>> 32);
		result = prime * result
				+ (environment == null ? 0 : environment.hashCode());
		result = prime * result + (int) (id ^ id >>> 32);
		result = prime * result + (tokenValue == null ? 0 : tokenValue.hashCode());
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
		if (!(obj instanceof Token)) {
			return false;
		}
		Token other = (Token) obj;
		if (createdDate != other.createdDate) {
			return false;
		}
		if (environment == null) {
			if (other.environment != null) {
				return false;
			}
		} else if (!environment.equals(other.environment)) {
			return false;
		}
		if (id != other.id) {
			return false;
		}
		if (tokenValue == null) {
			if (other.tokenValue != null) {
				return false;
			}
		} else if (!tokenValue.equals(other.tokenValue)) {
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
		StringBuilder builder = new StringBuilder();
		builder.append("Token [id=");
		builder.append(id);
		builder.append(", tokenValue=");
		builder.append(tokenValue);
		builder.append(", createdDate=");
		builder.append(createdDate);
		builder.append(", environment=");
		builder.append(environment);
		builder.append("]");
		return builder.toString();
	}
}
