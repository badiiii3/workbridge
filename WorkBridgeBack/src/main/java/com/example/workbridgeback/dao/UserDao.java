package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserDao extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

    //Optional<User> findUserById(int id);

    User findUserById(Long id);
}
