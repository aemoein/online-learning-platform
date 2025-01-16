package com.example.userservice.resources;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.userservice.controller.JwtTokenBean;
import com.example.userservice.controller.JwtUtil;
import com.example.userservice.controller.adminController;
import com.example.userservice.controller.userController;
import com.example.userservice.entity.UserEntity;
import jakarta.ejb.EJB;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;


@Path("/users")
public class userService {

    @EJB
    private userController userController;

    @EJB
    private adminController adminController;

    @EJB
    private JwtTokenBean jwtTokenBean;



    @POST
    @Path("/signup")
    @Consumes("application/json")
    @Produces("application/json")
    public Response signUp(UserEntity user) {
        if (userController.findByUsername(user.getName()) != null) {
            return Response.status(Response.Status.CONFLICT).entity("User already exists").build();
        }
        userController.save(user);
        return Response.status(Response.Status.CREATED).entity(user).build();
    }
//This a login function does not use token.
//    @POST
//    @Path("/login")
//    @Consumes("application/json")
//    @Produces("application/json")
//    public Response login(UserEntity user) {
//        UserEntity foundUser = userController.findByUsernameAndPassword(user.getUsername(), user.getPassword());
//        if (foundUser == null) {
//            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid username or password").build();
//        }
//        return Response.ok(foundUser).build();
//    }
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(UserEntity user) {
            UserEntity foundUser = userController.findByUsernameAndPassword(user.getEmail(), user.getPassword());
            if (foundUser == null) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid email or password").build();
            }

            String token = jwtTokenBean.generateToken(foundUser.getId(), foundUser.getRole());

        JsonObject responseJson = Json.createObjectBuilder()
                .add("token",token)
                .add("role", String.valueOf(foundUser.getRole()))
                .build();

        return Response.ok(responseJson)
                .header("Authorization", "Bearer " + token)
                .build();
        }

    @PUT
    @Path("/update")
    @Consumes("application/json")
    @Produces("application/json")
    public Response updateUser(@HeaderParam("name") String username,UserEntity user) {

        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity existingUser = adminController.findById(user.getId());
        if (existingUser == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        if(user.getName() != null && !user.getPassword().isEmpty()) {
            existingUser.setName(user.getName());
        }
        if(user.getEmail() != null && !user.getEmail().isEmpty()) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(user.getPassword());
        }
        if (user.getRole()!= null) {
            existingUser.setRole(user.getRole());
        }
        existingUser.setAffiliation(user.getAffiliation());
        existingUser.setBio(user.getBio());
        existingUser.setYearsOfExperience(user.getYearsOfExperience());

        adminController.update(existingUser);
        return Response.ok(existingUser).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces("application/json")
    public Response deleteUser(@HeaderParam("username") String username, @PathParam("id") Long id) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity userToDelete = adminController.findById(id);
        if (userToDelete == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        adminController.delete(userToDelete);
        return Response.ok().entity("User deleted successfully").build();
    }

    @GET
    @Path("/allUsers")
    @Produces("application/json")
    public Response getAllUsers(@HeaderParam("username") String username) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        List<UserEntity> users = adminController.findAll();
        return Response.ok(users).build();
    }

    @GET
    @Path("/role/{role}")
    @Produces("application/json")
    public Response getUsersByRole(@HeaderParam("username") String username, @PathParam("role") UserEntity.Role role) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        List<UserEntity> users = adminController.findByRole(role);
        return Response.ok(users).build();
    }

    @GET
    @Path("/profile/{id}")
    @Produces("application/json")
    public Response getUserProfile(@PathParam("id") Long id, @HeaderParam("username") String username) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity user = adminController.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        return Response.ok(user).build();
    }

    @GET
    @Path("/student")
    @Produces("application/json")
    public Response getStudent(@HeaderParam("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return Response.status(Response.Status.FORBIDDEN).entity("No token provided").build();
        }

        DecodedJWT decodedJWT;
        try {
            decodedJWT = JwtUtil.extractToken(authorizationHeader);
        } catch (Exception e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid token").build();
        }

        Long userId = JwtUtil.getUserId(decodedJWT);
        UserEntity user = userController.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        return Response.ok(user).build();
    }

    @GET
    @Path("/instructor/{id}")
    @Produces("application/json")
    public Response getInstructor(@PathParam("id") Long id, @HeaderParam("username") String username) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.admin) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity user = adminController.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        if (user.getRole() != UserEntity.Role.instructor) {
            return Response.status(Response.Status.FORBIDDEN).entity("this user is not an instructor").build();
        }

        return Response.ok(user).build();
    }

}

