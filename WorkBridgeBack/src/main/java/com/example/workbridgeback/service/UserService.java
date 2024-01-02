package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtUtils;
import com.example.workbridgeback.dao.ProjectDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.Role;
import com.example.workbridgeback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    public List<User>  getUserDetailsByRole(String role) {

        return userDao.findByRole(Role.valueOf(role));
    }

    public User getUserDetailsById(Long id) {

        return userDao.findById(id);
    }

    /*public Page<User> getAllUsers(int pageNumber, String searchKey) {
        Pageable pageable = PageRequest.of(pageNumber, 8);

        if (searchKey.equals("")) {
            return userDao.findAll(pageable);
        } else {
            return (Page<User>) userDao.findByNomContainingIgnoreCaseOrEmailContainingIgnoreCase(searchKey, searchKey, (java.awt.print.Pageable) pageable);
        }
    }*/
    public void delete(Long id) {userDao.deleteById(Math.toIntExact(id));
    }

    public List<User> getUserDetails(boolean isSingeProjectCheckout, Long id) {

        if (isSingeProjectCheckout && id != 0) {
            List<User> list = new ArrayList<>();
            String currentUser = JwtUtils.CURRENT_USER;
            User user = userDao.findByEmail(currentUser).get();


            return list;
        } else {
            return null;
        }
    }



    public User UserUpdate(User user) {


        return userDao.save(user);
    }


}
