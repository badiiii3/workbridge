package com.example.workbridgeback.controller;

import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.Offer;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.service.OfferService;
import javassist.NotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
public class OfferController {

    @Autowired
    private OfferService offerService;
    @Autowired
    private UserDao userDao;


    @PostMapping(value = {"/addNewOffer/{userId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Offer addNewOffer(@PathVariable("userId") String userId,
                                 @RequestPart("offer") Offer offer,
                                 @RequestPart("imageFile") MultipartFile[] file) {


        try {

            //String currentUser = JwtAuthenticationFilter.CURRENT_USER;
            //User user = userDao.findByEmail( currentUser).get();
            User user = userDao.findUserById(Long.valueOf(userId));

            offer.setUser(user);

            Set<ImageModel> images = uplodImage(file);

            offer.setOfferImages(images);
            return offerService.addNewOffer(offer);
        } catch (Exception e) {

            return offer;
        }


    }
    @PutMapping(value = {"/updateOffer/{offerId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Offer updateOffer(@PathVariable("offerId") Integer offerId,
                                 @RequestPart("offer") Offer updatedOffer,
                                 @RequestPart(value = "imageFile", required = false) MultipartFile[] file) {

        try {
            Offer existingOffer = offerService.getOfferDetailsById(offerId);

            if (existingOffer != null) {

                existingOffer.setOfferTitle(updatedOffer.getOfferTitle());
                existingOffer.setOfferDescription(updatedOffer.getOfferDescription());
                existingOffer.setOfferStatus(updatedOffer.getOfferStatus());
                existingOffer.setOfferSkills(updatedOffer.getOfferSkills());
                existingOffer.setOfferExperience(updatedOffer.getOfferExperience());
                existingOffer.setOfferContractType(updatedOffer.getOfferContractType());
                existingOffer.setOfferSalary(updatedOffer.getOfferSalary());
                existingOffer.setOfferDeadline(updatedOffer.getOfferDeadline());
                existingOffer.setOfferLocation(updatedOffer.getOfferLocation());


                Set<ImageModel> images = uplodImage(file);
                existingOffer.setOfferImages(images);


                Offer savedOffer = offerService.addNewOffer(existingOffer);
                return savedOffer;
            } else {

                throw new NotFoundException("Service not found with ID: " + offerId);
            }
        } catch (Exception e) {

            throw new ServiceException("Error updating service", e);
        }
    }


    public Set<ImageModel> uplodImage(MultipartFile[] multipartFiles) throws IOException{

        Set<ImageModel> imageModels = new HashSet<>();

        for(MultipartFile file: multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes());
            imageModels.add(imageModel);
        }
        return imageModels;
    }



    @GetMapping({"/getOfferByUser"})
    public List<Offer> getOfferByUser() {
        return offerService.getOfferByUser();

    }
    @GetMapping({"/getAllOffersUser/{userId}"})
    public List<Offer> getAllOffersUser(
            @PathVariable("userId") String userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String searchKey) {
        return offerService.getOfferByUserAndSearch(userId,pageNumber, searchKey);
    }

    @GetMapping({"/getAllOffers"})
    public List<Offer> getAllOffers(@RequestParam(defaultValue = "0") int pageNumber
            , @RequestParam(defaultValue = "") String searchKey) {
        return offerService.getAllOffers(pageNumber, searchKey);
    }
    @GetMapping({"/getOfferDetailsById/{offerId}"})
    public Offer getOfferDetailsById(@PathVariable("offerId") Integer offerId) {

        return offerService.getOfferDetailsById(offerId);

    }


    @GetMapping({"/getOfferDetails/{isSingeOfferCheckout}/{offerId}"})
    public List<Offer> getOfferDetails(@PathVariable(name="isSingeOfferCheckout") boolean isSingeOfferCheckout,
                                           @PathVariable(name= "offerId") Integer offerId) {

        return offerService.getOfferDetails(isSingeOfferCheckout, offerId);


    }

    @DeleteMapping({"/deleteOfferDetails/{offerId}"})
    public void deleteOfferDetails(@PathVariable("offerId") Integer offerId) {
        offerService.deleteOfferDetails(offerId);
    }


}

