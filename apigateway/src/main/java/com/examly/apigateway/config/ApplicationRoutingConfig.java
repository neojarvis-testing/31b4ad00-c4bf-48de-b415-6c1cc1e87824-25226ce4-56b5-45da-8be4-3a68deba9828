package com.examly.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationRoutingConfig {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder
                .routes()
                .route("user-service", r -> r.path("/api/user/**", "/api/users/**").uri("lb://USER-SERVICE"))
                .route("loan-service",
                        r -> r.path("/api/loans/**", "/api/loanapplications/**", "/api/loandisbursements")
                                .uri("lb://LOAN-SERVICE"))
                .route("feedback-service", r -> r.path("/api/feedback/**", "/api/feedbacks/**")
                        .uri("lb://FEEDBACK-SERVICE"))
                .build();
    }
}
