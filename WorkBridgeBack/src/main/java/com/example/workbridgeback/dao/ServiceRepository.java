package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.Servic;
import com.example.workbridgeback.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends CrudRepository<Servic, Integer> {

    List<Servic> findByUser(User user);

    List<Servic> findAll(Pageable pageable);

    List<Servic> findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String key1, String key2, Pageable pageable);


}

