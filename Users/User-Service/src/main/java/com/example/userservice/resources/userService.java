package com.example.userservice.resources;

import com.example.userservice.controller.JwtTokenBean;
import com.example.userservice.controller.adminController;
import com.example.userservice.controller.userController;
import com.example.userservice.entity.UserEntity;
import jakarta.ejb.EJB;
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
        if (userController.findByUsername(user.getUsername()) != null) {
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
            UserEntity foundUser = userController.findByUsernameAndPassword(user.getUsername(), user.getPassword());
            if (foundUser == null) {
                return Response.status(Response.Status.UNAUTHORIZED).entity("Invalid username or password").build();
            }

            // Generate JWT token
            String token = jwtTokenBean.generateToken(foundUser.getId(), foundUser.getRole());

            // Create a response entity to include the token
            return Response.ok().header("Authorization", "Bearer " + token).build();
        }

    @PUT
    @Path("/update")
    @Consumes("application/json")
    @Produces("application/json")
    public Response updateUser(@HeaderParam("username") String username,UserEntity user) {

        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity existingUser = adminController.findById(user.getId());
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
        existingUser.setYearsOfExperience(user.getYearsOfExperience());

        adminController.update(existingUser);
        return Response.ok(existingUser).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces("application/json")
    public Response deleteUser(@HeaderParam("username") String username, @PathParam("id") Long id) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
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
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
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
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
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
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity user = adminController.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }

        return Response.ok(user).build();
    }

    @GET
    @Path("/student/{id}")
    @Produces("application/json")
    public Response getStudent(@PathParam("id") Long id, @HeaderParam("username") String username) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity user = adminController.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        if (user.getRole() != UserEntity.Role.STUDENT) {
            return Response.status(Response.Status.FORBIDDEN).entity("this user is not a student").build();
        }

        return Response.ok(user).build();
    }

    @GET
    @Path("/instructor/{id}")
    @Produces("application/json")
    public Response getInstructor(@PathParam("id") Long id, @HeaderParam("username") String username) {
        UserEntity requestingUser = adminController.findByUsername(username);
        if (requestingUser == null || requestingUser.getRole() != UserEntity.Role.ADMIN) {
            return Response.status(Response.Status.FORBIDDEN).entity("You are not authorized to perform this action").build();
        }

        UserEntity user = adminController.findById(id);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("User not found").build();
        }
        if (user.getRole() != UserEntity.Role.INSTRUCTOR) {
            return Response.status(Response.Status.FORBIDDEN).entity("this user is not an instructor").build();
        }

        return Response.ok(user).build();
    }
}

