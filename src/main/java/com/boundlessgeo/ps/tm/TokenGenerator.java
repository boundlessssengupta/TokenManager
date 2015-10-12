/**
 *
 */
package com.boundlessgeo.ps.tm;

import com.fasterxml.uuid.Generators;

/**
 * @author ssengupta
 */
public final class TokenGenerator {
	public static final String generate() {
		return Generators.randomBasedGenerator().generate().toString();
	}
}
