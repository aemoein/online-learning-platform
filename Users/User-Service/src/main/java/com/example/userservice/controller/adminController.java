package com.example.userservice.controller;

import com.example.userservice.entity.UserEntity;
import jakarta.ejb.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;

import javax.management.relation.Role;
import java.util.List;

@Singleton
public class adminController {
    @PersistenceContext
    private EntityManager em;

    public void update(UserEntity user) {
        em.merge(user);
    }
    public void delete(UserEntity user) {
        if (em.contains(user)) {
            em.remove(user);
        } else {
            em.remove(em.merge(user));
        }
    }
    public List<UserEntity> findAll() {
        return em.createQuery("SELECT u FROM UserEntity u", UserEntity.class).getResultList();
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
            return em.createQuery("SELECT u FROM UserEntity u WHERE u.name = :username", UserEntity.class)
                    .setParameter("username", username)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<UserEntity> findByRole(UserEntity.Role role) {
        return em.createQuery("SELECT u FROM UserEntity u WHERE u.role = :role", UserEntity.class)
                .setParameter("role", role)
                .getResultList();
    }
}
