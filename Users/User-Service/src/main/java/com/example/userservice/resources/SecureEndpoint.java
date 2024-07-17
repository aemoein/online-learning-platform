package com.example.userservice.resources;

import jakarta.ejb.EJB;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.userservice.controller.JwtUtil;
import com.example.userservice.controller.JwtTokenBean;

@Path("/secure")
public class SecureEndpoint {

    @EJB
    private JwtTokenBean jwtTokenBean;

    @GET
    @Path("/info")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSecureInfo(@Context HttpHeaders headers) {
        try {
            String authorizationHeader = headers.getHeaderString(HttpHeaders.AUTHORIZATION);
            DecodedJWT decodedJWT = JwtUtil.extractToken(authorizationHeader);
            Long userId = JwtUtil.getUserId(decodedJWT);
            String userRole = JwtUtil.getUserRole(decodedJWT);

            // Create a response with the user information
            return Response.ok(userRole).header("Authorization",  authorizationHeader).build();
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
        }
    }
}

