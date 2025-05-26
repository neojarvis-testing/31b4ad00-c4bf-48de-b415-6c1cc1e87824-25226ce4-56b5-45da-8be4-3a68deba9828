package com.examly.springappuser.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;


@Configuration
public class CorsConfig {

        @Bean
        public CorsWebFilter corsWebFilter(){
            CorsConfiguration corsConfig=new CorsConfiguration();
            corsConfig.setAllowedOrigins(List.of("https://8081-efdaebceabafefbdaecfbbcebdabeadeba.project.examly.io/"));
            corsConfig.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
            corsConfig.setAllowedHeaders(List.of("Authorization","Content-type"));
            corsConfig.setAllowCredentials(true);

            UrlBasedCorsConfigurationSource source=new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**",corsConfig);

            return new CorsWebFilter(source);
        }
}
