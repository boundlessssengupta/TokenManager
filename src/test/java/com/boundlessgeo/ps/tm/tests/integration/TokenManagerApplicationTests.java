package com.boundlessgeo.ps.tm.tests.integration;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import com.boundlessgeo.ps.tm.TokenManagerApplication;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = TokenManagerApplication.class)
@WebAppConfiguration
public class TokenManagerApplicationTests {

	@Test
	public void contextLoads() {
	}

}
