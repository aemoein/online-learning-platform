package com.example.userservice.resources;

import com.example.userservice.entity.Student;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import com.example.userservice.controller.studentController;

@Path("/students")
public class StudentResource {

    @Inject
    private studentController studentController;

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response signUp(Student student) {
        studentController.signUp(student);
        return Response.ok().build();
    }

    @POST
    @Path("/signin")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response signIn(@FormParam("usernameOrEmail") String usernameOrEmail,
                           @FormParam("password") String password) {
        Student student = studentController.signIn(usernameOrEmail, password);
        if (student != null) {
            return Response.ok().entity(student).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
    }
}

