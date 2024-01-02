package com.example.workbridgeback.controller;


import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.*;

import com.example.workbridgeback.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class RateController {

    @Autowired
    private UserDao userDao;
    @Autowired
    private RateService rateService;


    @PostMapping(value = {"/addrate/{userId}/{userid}"})
    public Rate addNewRate(@PathVariable("userId") String userId,
                              @PathVariable("userid") String userId2,
                              @RequestPart("demande") Rate demande
    ) {
        try {

            User user = userDao.findUserById(Long.valueOf(userId));

            User user2 = userDao.findUserById(Long.valueOf(userId2));

            System.out.println(user);
            demande.setFreelance(user);
            demande.setClient(user2);


            return rateService.addNewRate(demande);
        } catch (Exception e) {

            System.out.println("aaaaaaaaaaaaaaaaaaaaaaa"+e.getMessage());
            return demande;
        }


    }


    @GetMapping({"/getRateByClient/{userId}"})
    public List<Rate> getDemandeByClient(@PathVariable("userId") Long userId) {
        return rateService.getRateByClient(userId);
    }

    @GetMapping({"/getRateByFreelance/{id}"})
    public List<Rate> getDemandeByProject(@PathVariable("id") Long projectId) {
        return rateService.getRateByFreelance(projectId);
    }

    @GetMapping({"/getRateDetailsById/{id}"})
    public Rate getRateDetailsById(@PathVariable("id") Integer demandeId) {

        return rateService.getRateById(demandeId);

    }

    @GetMapping({"/getRateDetails/{isSingeRateCheckout}/{demandeId}"})
    public List<Rate> getDemandeDetails(@PathVariable(name="isSingeDemandeCheckout") boolean isSingeDemandeCheckout,
                                        @PathVariable(name= "demandeId") Integer demandeId) {

        return rateService.getRateDetails(isSingeDemandeCheckout, demandeId);


    }
}