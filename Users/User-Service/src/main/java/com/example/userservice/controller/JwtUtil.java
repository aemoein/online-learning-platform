package com.example.userservice.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;

public class JwtUtil {

    private static final String SECRET_KEY = "eH6Q2Ji3Vn3bT6Tn4GfDn7Sp2Ue7Nz3Rj8Sd1Ws5Fg9Uk0Li2Ym5Gk3Yb7Ja5S"; // Use the same secret key

    public static DecodedJWT extractToken(String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header.");
        }

        String token = authorizationHeader.substring(7); // Remove "Bearer " prefix

        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            JWTVerifier verifier = JWT.require(algorithm).build();
            return verifier.verify(token);
        } catch (JWTVerificationException e) {
            throw new RuntimeException("Invalid JWT token", e);
        }
    }

    public static Long getUserId(DecodedJWT decodedJWT) {
        return decodedJWT.getClaim("id").asLong();
    }

    public static String getUserRole(DecodedJWT decodedJWT) {
        return decodedJWT.getClaim("role").asString();
    }
}
