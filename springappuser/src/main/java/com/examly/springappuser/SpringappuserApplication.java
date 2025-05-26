package com.examly.springappuser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true)
public class SpringappuserApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringappuserApplication.class, args);
	}

}
