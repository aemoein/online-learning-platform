package com.example.userservice.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Students")
public class Student implements Users {
    @Column(name= "Username")
    private String username;

    @Column(name= "Email" , nullable = false, unique = true)
    private String email;

    @Column(name= "Password")
    private String password;

    @Column(name= "Affiliation")
    private String affiliation;

    @Column(name= "Bio")
    private String bio;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAffiliation() {
        return affiliation;
    }

    public void setAffiliation(String affiliation) {
        this.affiliation = affiliation;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public Long getId() {
        return id;
    }

}
