package com.example.userservice.controller;
import com.example.userservice.entity.Student;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.util.List;

@Stateless
public class studentController {

    @PersistenceContext
    private EntityManager entityManager;

    public void signUp(Student student) {
        entityManager.persist(student);
    }

    public Student signIn(String userEmail, String password) {
        Query query = entityManager.createQuery(
                "SELECT s FROM Student s WHERE s.username = :usernameOrEmail OR s.email = :usernameOrEmail");
        query.setParameter("usernameOrEmail", userEmail);

        try {
            Student student = (Student) query.getSingleResult();
            return student;
        } catch (Exception e) {
            return null; // User not found
        }
    }
    public Student findById(Long id) {
        return entityManager.find(Student.class, id);
    }

    public List<Student> findAll() {
        Query query = entityManager.createQuery("SELECT s FROM Student s");
        return query.getResultList();
    }
}
