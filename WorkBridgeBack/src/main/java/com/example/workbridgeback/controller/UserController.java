package com.example.workbridgeback.controller;

import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.Role;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.service.AuthenticationService;
import com.example.workbridgeback.service.UserService;
import javassist.NotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
@RestController

public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationService userAuthService;
    @Autowired
    private UserDao userDao;

    private PasswordEncoder passwordEncoder;





    public Set<ImageModel> uploadImage(@RequestParam("imageFiles") MultipartFile[] imageFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : imageFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes());
            imageModels.add(imageModel);
        }

        return imageModels;
    }

    @PutMapping("/updateUser/{id}" )
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestBody User updatedUser,
                                           @RequestParam(value = "imageFiles", required = false) MultipartFile[] imageFiles)
            throws IOException {

        User existingUser = userDao.getById(Math.toIntExact(id));

        if (existingUser == null) {
            return ResponseEntity.notFound().build();
        }

        existingUser.setNom(updatedUser.getNom());
        existingUser.setPrenom(updatedUser.getPrenom());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setTelephone(updatedUser.getTelephone());

        if (imageFiles != null && imageFiles.length > 0) {
            Set<ImageModel> images = uploadImage(imageFiles);
            existingUser.setUserImages(images);
        }

        User updatedProfile = userDao.save(existingUser);
        return ResponseEntity.ok(updatedProfile);
    }





    @GetMapping("/getUserDetailsByRole/{role}")
    public List<User> getUserDetailsByRole(@PathVariable("role") String roleString) {
        try {
            Role role = Role.valueOf(roleString);

            return userService.getUserDetailsByRole(String.valueOf(role));
        } catch (IllegalArgumentException e) {

            e.printStackTrace();
            return null;
        }
    }


    @GetMapping({"/getUserDetailsById/{id}"})
    public  User getUserDetailsById(@PathVariable("id") Long  id) {

        return userService.getUserDetailsById(id);

    }

   /*/ @GetMapping({"/getAllUser"})
    public Page<User> getAllUser(@RequestParam(defaultValue = "0") int pageNumber,
                                 @RequestParam(defaultValue = "") String searchKey) {
        return userService.getAllUsers(pageNumber, searchKey);
    }
*/

    @GetMapping({"/getUserDetails/{isSingeProjectCheckout}/{id}"})
    public List<User> getUserDetails(@PathVariable(name="isSingeProjectCheckout") boolean isSingeProjectCheckout,
                                     @PathVariable(name= "id") Long id) {

        return userService.getUserDetails(isSingeProjectCheckout, id);


    }

    @DeleteMapping({"/delete/{id}"})
    public void delete(@PathVariable("id") Long id) {

        userService.delete(id);
    }


}
