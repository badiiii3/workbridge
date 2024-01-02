package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.entity.Demande;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DemandeDao extends CrudRepository<Demande, Integer> {
    List<Demande> findByProject(Project project);
    List<Demande> findByFreelance(User user);

}