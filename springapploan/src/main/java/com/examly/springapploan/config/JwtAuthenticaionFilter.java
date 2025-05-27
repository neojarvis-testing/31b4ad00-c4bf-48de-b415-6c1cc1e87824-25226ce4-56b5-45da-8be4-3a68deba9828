package com.examly.springapploan.config;

import java.io.IOException;
import java.util.List;

import io.jsonwebtoken.*;
import jakarta.servlet.*;
import org.springframework.http.HttpStatus;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


@Component
public class JwtAuthenticaionFilter extends OncePerRequestFilter {

    private final String secretToken ="secretKey";

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain) throws ServletException, IOException{
        String authHeader = req.getHeader("Authorization");

        if(authHeader != null || !authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                Claims claims = extractClaims(token);
                String role = claims.get("role", String.class);
                Long userId = claims.get("userId", Long.class);

                System.out.println(claims);
                List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userId, null, authorities
                );

                authToken.setDetails(claims);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
            catch(Exception e) {
                res.setStatus(HttpStatus.UNAUTHORIZED.value());
                res.getWriter().write("Invalid JWT Token");
                return;
            }
            chain.doFilter(req, res);
        }
    }
    

    public Claims extractClaims(String token) {
        return Jwts.parser()
        .setSigningKey(secretToken)
        .parseClaimsJws(token)
        .getBody();
    }
}
