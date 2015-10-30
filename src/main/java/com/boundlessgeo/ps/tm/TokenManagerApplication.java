package com.boundlessgeo.ps.tm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {
		org.springframework.boot.autoconfigure.security.SecurityAutoConfiguration.class,
		org.springframework.boot.actuate.autoconfigure.ManagementSecurityAutoConfiguration.class })
public class TokenManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(TokenManagerApplication.class, args);
	}
}
