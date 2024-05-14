package com.example.userservice.resources;

import com.example.userservice.controller.userController;
import com.example.userservice.entity.UserEntity;
import jakarta.ejb.EJB;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/users")
public class userService {

    @EJB
    private userController userController;

    @POST
    @Path("/signup")
    @Consumes("application/json")
    @Produces("application/json")
    public Response signUp(UserEntity user) {
        if (userController.findByUsername(user.getUsername()) != null) {
            return Response.status(Response.Status.CONFLICT).entity("User already exists").build();
        }
        userController.save(user);
        return Response.status(Response.Status.CREATED).entity(user).build();
    }

    @POST
    @Path("/login")
    @Consumes("application/json")
    @Produces("application/json")
    public Response login(UserEntity user) {
        UserEntity foundUser = userController.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (foundUser == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid username or password").build();
        }
        return Response.ok(foundUser).build();
    }

    @PUT
    @Path("/update")
    @Consumes("application/json")
    @Produces("application/json")
    public Response updateUser(UserEntity user) {
        UserEntity existingUser = userController.findById(user.getId());
        if (existingUser == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        if(user.getUsername() != null && !user.getPassword().isEmpty()) {
            existingUser.setUsername(user.getUsername());
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

        userController.update(existingUser);
        return Response.ok(existingUser).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces("application/json")
    public Response deleteUser(@HeaderParam("username") String username, @PathParam("id") Long id) {
        UserEntity requestingUser = userController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity userToDelete = userController.findById(id);
        if (userToDelete == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        userController.delete(userToDelete);
        return Response.ok().entity("User deleted successfully").build();
    }
}

