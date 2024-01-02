package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.entity.Rate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RateDao extends CrudRepository<Rate, Integer> {
    List<Rate> findByFreelance(User freelance);
    List<Rate> findByClient(User client);
}

