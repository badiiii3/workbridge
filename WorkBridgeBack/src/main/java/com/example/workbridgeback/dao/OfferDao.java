package com.example.workbridgeback.dao;

import com.example.workbridgeback.entity.Offer;
import com.example.workbridgeback.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OfferDao extends CrudRepository<Offer, Integer> {
    List<Offer> findByUser(User user);
    public List<Offer> findAll(Pageable pageable);

    public List<Offer>  findByOfferTitleContainingIgnoreCaseOrOfferDescriptionContainingIgnoreCase(
            String key1, String key2, Pageable pageable);


}


