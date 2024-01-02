package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectDao extends CrudRepository<Project, Integer> {
    List<Project> findByUser(User  user);

    List<Project> findByUserAndProjectNameContainingIgnoreCaseOrUserAndProjectDescriptionContainingIgnoreCase(
            User user, String key1, User user2, String key2, Pageable pageable);

    List<Project> findAll(Pageable pageable);

    List<Project> findByProjectNameContainingIgnoreCaseOrProjectDescriptionContainingIgnoreCase(
            String key1, String key2, Pageable pageable);

    Project findByProjectId(Integer projectId);

}