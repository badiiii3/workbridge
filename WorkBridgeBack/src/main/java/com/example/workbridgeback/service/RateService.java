package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtUtils;

import com.example.workbridgeback.dao.RateDao;
import com.example.workbridgeback.dao.UserDao;

import com.example.workbridgeback.entity.Rate;
import com.example.workbridgeback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class RateService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private RateDao rateDao;


    public Rate addNewRate(Rate demande) {

        return rateDao.save(demande);
    }





    public List<Rate> getRateByClient(Long userId) {

        User user = userDao.findUserById(Long.valueOf(userId));
        return (List<Rate>) rateDao.findByClient(user);
    }

    public List<Rate> getRateByFreelance(Long id) {

        User freelance = userDao.findById(id);
        if (freelance != null) {
            return (List<Rate>) rateDao.findByFreelance(freelance);
        } else {
            return Collections.emptyList(); // or throw an exception, or handle accordingly
        }

    }
    public Rate getRateById(Integer id) {

        return rateDao.findById(id).get();
    }
    public List<Rate> getRateDetails(boolean isSingeDemandeCheckout, Integer demandeId) {

        if (isSingeDemandeCheckout && demandeId != 0) {
            List<Rate> list = new ArrayList<>();
            String currentUser = JwtUtils.CURRENT_USER;
            User user = userDao.findByEmail( currentUser).get();

            list =  rateDao.findByFreelance(user);

            return list;
        }else {return null;}
    }



}