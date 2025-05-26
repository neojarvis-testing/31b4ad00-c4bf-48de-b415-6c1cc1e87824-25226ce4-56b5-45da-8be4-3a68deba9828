package com.examly.springappuser.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JWTUtil {

    @Value("${jwt.secret.key}")
    private String secretKey;

    public static final long VALIDITY_PERIOD=60*60*1000;

    public String generateToken(String email){
        return Jwts.builder()
                .setExpiration(new Date(System.currentTimeMillis()+ VALIDITY_PERIOD))
                .setIssuedAt(new Date())
                .setSubject(email)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
