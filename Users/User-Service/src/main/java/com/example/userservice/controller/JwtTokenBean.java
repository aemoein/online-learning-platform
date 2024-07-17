package com.example.userservice.controller;

import com.example.userservice.entity.UserEntity;
import jakarta.ejb.Stateless;
import java.util.Date;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import javax.management.relation.Role;

@Stateless
public class JwtTokenBean {

    private static final String SECRET_KEY = "eH6Q2Ji3Vn3bT6Tn4GfDn7Sp2Ue7Nz3Rj8Sd1Ws5Fg9Uk0Li2Ym5Gk3Yb7Ja5S"; // Use a secure key
    private static final String ISSUER = "User-Service";

    public String generateToken(Long userId, UserEntity.Role userRole) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            String token = JWT.create()
                    .withIssuer(ISSUER)
                    .withClaim("userId", userId)
                    .withClaim("role", String.valueOf(userRole))
                    .withIssuedAt(new Date())
                    .withExpiresAt(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                    .sign(algorithm);
            return token;
        } catch (Exception e) {
            throw new RuntimeException("Error while creating JWT token", e);
        }
    }
}
