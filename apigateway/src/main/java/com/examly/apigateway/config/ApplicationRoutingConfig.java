package com.examly.apigateway.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.cors.reactive.CorsConfigurationSource;

@Configuration
public class ApplicationRoutingConfig {
        @Bean
        public RouteLocator routes(RouteLocatorBuilder builder) {
                return builder
                                .routes()
                                .route("user-service",
                                                r -> r.path("/api/user/**", "/api/users/**").uri("lb://USER-SERVICE"))
                                .route("loan-service",
                                                r -> r.path("/api/loans/**", "/api/loanapplications/**",
                                                                "/api/loandisbursements/**", "/api/notification/**")
                                                                .uri("lb://LOAN-SERVICE"))
                                .route("feedback-service", r -> r.path("/api/feedback/**", "/api/feedbacks/**")
                                                .uri("lb://FEEDBACK-SERVICE"))
                                .build();
        }

        @Bean
        public CorsWebFilter corsFilter() {
                System.out.println("in cors filter received");
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowCredentials(true);
                config.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "DELETE",
                                "OPTIONS"));
                config.setAllowedOrigins(List.of(
                                "https://8081-bdcaafcceecabdaecfbbcebdabeadeba.project.examly.io",
                                "http://localhost:8081",
                                "https://ide-bdcaafcceecabdaecfbbcebdabeadeba.project.examly.io/proxy/8081",
                                "https://*.project.examly.io"
                ));

                config.setAllowedHeaders(List.of("*"));
                config.setAllowedOriginPatterns(List.of("*"));
                config.setExposedHeaders(Arrays.asList("Authorizaztion",
                                "Content-Disposition"));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);
                return new CorsWebFilter(source);
        }
}
