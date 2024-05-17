package com.example.userservice.controller;

import com.example.userservice.entity.UserEntity;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

@Stateless
public class userController {

    @PersistenceContext
    private EntityManager em;

    public void save(UserEntity user) {
        em.persist(user);
    }

    public UserEntity findById(Long id) {
        try {
            return em.find(UserEntity.class, id);
        } catch (NoResultException e) {
            return null;
        }
    }

    public UserEntity findByUsername(String username) {
        try {
            return em.createQuery("SELECT u FROM UserEntity u WHERE u.username = :username", UserEntity.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }
    public UserEntity findByUsernameAndPassword(String username, String password) {
        try {
            return em.createQuery("SELECT u FROM UserEntity u WHERE u.username = :username AND u.password = :password", UserEntity.class)
                    .setParameter("username", username)
                    .setParameter("password", password)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

}
