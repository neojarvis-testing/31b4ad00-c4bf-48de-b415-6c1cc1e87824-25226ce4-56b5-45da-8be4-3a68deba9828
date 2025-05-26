package com.examly.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfiguration {
    

    // Routing Configuration
    @Bean
    public RouteLocator customRouting(RouteLocatorBuilder builder) {
        return builder.routes()

            .route("springappuser", r->r.path("/api/loans/**", "/api/loanapplications/**", "/api/loandisbursements/**", "/api/notification"))
            .uri("lb://springappuser")

            
            .route("springapploan", r->r.path("/api/loans/**", "/api/loanapplications/**", "/api/loandisbursements/**", "/api/notification"))
            .filters(f -> f.filter(new JwtAuthFilter())) //Filter for secured
            .uri("lb://springapploan")
        .build();
    }

}
