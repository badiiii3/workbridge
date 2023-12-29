package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtUtils;
import com.example.workbridgeback.dao.OfferDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Offer;
import com.example.workbridgeback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class OfferService {
    @Autowired
    private OfferDao offerDao;
    @Autowired
    private UserDao userDao;

    public Offer addNewOffer(Offer offer) {
        return offerDao.save(offer);
    }



    public void deleteOfferDetails(Integer id) {
        offerDao.deleteById(id);
    }



    public Offer getOfferDetailsById(Integer id) {

        return offerDao.findById(id).get();
    }
    public List<Offer> getOfferByUser() {
        String currentUser = JwtUtils.CURRENT_USER;
        User user = userDao.findByEmail( currentUser).get();

        return offerDao.findByUser(user);
    }
    public List<Offer> getAllOffers(int pageNumber, String searchKey){
        Pageable pageable = PageRequest.of(pageNumber, 8);

        if(searchKey.equals("")) {
            return (List<Offer>) offerDao.findAll(pageable);
        }else {
            return (List<Offer>)offerDao.findByOfferTitleContainingIgnoreCaseOrOfferDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
        }

    }
    public List<Offer> getOfferByUserAndSearch(String userId, int pageNumber, String searchKey) {
        //String currentUser = JwtAuthenticationFilter.CURRENT_USER;
        //User user = userDao.findByEmail(currentUser).orElse(null);
        User user = userDao.findUserById(Long.valueOf(userId));

        Pageable pageable = PageRequest.of(pageNumber, 8);

        if (searchKey.equals("")) {
            return (List<Offer>)offerDao.findByUser(user);
        } else {
            return (List<Offer>) offerDao.findByOfferTitleContainingIgnoreCaseOrOfferDescriptionContainingIgnoreCase(
                    user, searchKey, user, searchKey, pageable);
        }


    }

    public List<Offer> getOfferDetails(boolean isSingeOfferCheckout, Integer offerId) {

        if (isSingeOfferCheckout && offerId != 0) {
            List<Offer> list = new ArrayList<>();
            String currentUser = JwtUtils.CURRENT_USER;
            User user = userDao.findByEmail( currentUser).get();

            list =  offerDao.findByUser(user);

            return list;
        }else {
            return null;
        }
    }
    public Offer updateOffer(Offer updatedOffer) {
        try {
            // Check if the service already exists in the database
            Offer existingOffer = offerDao.findById(updatedOffer.getOfferId()).orElse(null);

            // Service not found, handle accordingly
            if (existingOffer != null) {
                // Update offer properties
                existingOffer.setOfferTitle(updatedOffer.getOfferTitle());
                existingOffer.setOfferDescription(updatedOffer.getOfferDescription());
                existingOffer.setOfferStatus(updatedOffer.getOfferStatus());
                existingOffer.setOfferSkills(updatedOffer.getOfferSkills());
                existingOffer.setOfferExperience(updatedOffer.getOfferExperience());
                existingOffer.setOfferContractType(updatedOffer.getOfferContractType());
                existingOffer.setOfferSalary(updatedOffer.getOfferSalary());
                existingOffer.setOfferDeadline(updatedOffer.getOfferDeadline());
                existingOffer.setOfferLocation(updatedOffer.getOfferLocation());

                // Update images (assuming Offer has a set of images)
                existingOffer.setOfferImages(updatedOffer.getOfferImages());

                // Save the updated project
                Offer savedOffer = offerDao.save(existingOffer);
                return savedOffer;
            } else {
                // Handle the case where the project with the given ID does not exist
                return null;
            }


        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}

