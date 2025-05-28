package com.examly.springappuser.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.examly.springappuser.model.User;

import java.util.Date;
import java.util.Map;

@Service
public class JWTUtil {

    @Value("${jwt.secret.key}")
    private String secretKey;

    public static final long VALIDITY_PERIOD=60*60*1000;

    public String generateToken(User user){
        return Jwts.builder()
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis()+ VALIDITY_PERIOD))
                .setSubject(user.getEmailId())
                .setClaims(
                    Map.of(
                        "email", user.getEmailId(),
                        "role", user.getUserRole(),
                        "userId", user.getUserId(),
                        "userName",user.getUserName()
                    )
                )
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }
}
