package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtAuthenticationFilter;
import com.example.workbridgeback.dao.OfferDao;
import com.example.workbridgeback.dao.OfferDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Offer;
import com.example.workbridgeback.entity.User;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OfferService {
    @Autowired
    private OfferDao offerDao;
    @Autowired
    private UserDao userDao;

    public Offer addNewOffer(Offer offer) {


        return offerDao.save(offer);
    }
    public void deleteOfferDetails(Integer offerId) {
        offerDao.deleteById(offerId);
    }

    public Offer getOfferDetailsById(Integer offerId) {

        return offerDao.findById(offerId).get();
    }
    public List<Offer> getOfferByUser() {
        String currentUser = JwtAuthenticationFilter.CURRENT_USER;
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

    public List<Offer> getOfferDetails(boolean isSingeOfferCheckout, Integer blogId) {

        if(isSingeOfferCheckout && blogId != 0) {
            List<Offer> list= new ArrayList<>();
            Offer offer = offerDao.findById(blogId).get();
            list.add(offer);
            return list;
        }else {
            return  null ;

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

