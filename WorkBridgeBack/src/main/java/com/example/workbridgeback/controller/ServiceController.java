package com.example.workbridgeback.controller;

import com.example.workbridgeback.configuration.JwtAuthenticationFilter;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.Servic;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.service.ServiceService;
import javassist.NotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class ServiceController {

    @Autowired
    private ServiceService serviceService;
    @Autowired
    private UserDao userDao;


    //@PreAuthorize("hasRole('FREELANCER')")*/

    @Transactional
    @PostMapping(value = {"/addNewService"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Servic addNewService(@RequestPart("service") Servic servic,
                                @RequestPart("imageFile") MultipartFile[] file) {
         String currentUser = JwtAuthenticationFilter.CURRENT_USER;
        // User user = userDao.findByEmail(currentUser).get();
         // System.out.println("affiche user " + user);
        try {
            System.out.println("*****************");

              //servic.setUser(user);
            //  System.out.println("*****************" + user);
            Set<ImageModel> images = uplodImage(file);
            System.out.println("*****************" + images);
            servic.setServiceImages(images);
            return serviceService.addNewService(servic);
        } catch (Exception e) {

            System.out.println(e.getMessage());
            return servic;
        }

    }


    public Set<ImageModel> uplodImage(MultipartFile[] multipartFiles) throws IOException {

        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file : multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes());
            imageModels.add(imageModel);
        }
        return imageModels;
    }


    //@PreAuthorize("hasRole('User')")
    @GetMapping({"/getServiceByUser"})
    public List<Servic> getServiceByUser() {
        return serviceService.getServiceByUser();
    }

    //@PreAuthorize("hasRole('User')")
    @GetMapping({"/getAllService"})
    public List<Servic> getAllService(@RequestParam(defaultValue = "0") int pageNumber
            , @RequestParam(defaultValue = "") String searchKey) {
        return serviceService.getAllService(pageNumber, searchKey);
    }

   // @PreAuthorize("hasRole('User')")
    @GetMapping({"/getServiceDetailsById/{serviceId}"})
    public Servic getServiceDetailsById(@PathVariable("serviceId") Integer serviceId) {

        return serviceService.getServiceDetailsById(serviceId);

    }


    //@PreAuthorize("hasRole('User')")


    @DeleteMapping({"/deleteServiceDetailes/{serviceId}"})
    public void deleteServiceDetailes(@PathVariable("serviceId") Integer serviceId) {
        serviceService.deleteServiceDetails(serviceId);
    }


    @GetMapping({"/getDetails/{isSingeCheckout}/{serviceId}"})
    public List<Servic> getServiceDetails(@PathVariable(name = "isSingeServiceCheckout") boolean isSingeServiceCheckout,
                                          @PathVariable(name = "blogId") Integer blogId) {

        return serviceService.getProductDetails(isSingeServiceCheckout, blogId);

    }

    //@PreAuthorize("hasRole('User')")


  /*  @PutMapping(value = "/updateService/{serviceId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Servic updateService(
            @PathVariable("serviceId") Integer serviceId,
            @RequestPart("service") Servic updatedService,
            @RequestPart("imageFile") MultipartFile[] file
    ){
        String currentUser = JwtAuthenticationFilter.CURRENT_USER;
        User user = userDao.findByEmail(currentUser).orElse(null);

        try {
            if (user != null) {
                Servic existingService = serviceService.getServiceDetailsById(serviceId);

                if (existingService != null && existingService.getUser().getId().equals(user.getId())) {
                    existingService.setNom(updatedService.getNom());
                    existingService.setDescription(updatedService.getDescription());

                    Set<ImageModel> images = uplodImage(file);
                    existingService.setServiceImages(images);

                    return serviceService.addNewService(existingService);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return updatedService;

    } */

    @PutMapping(value = "/updateService/{serviceId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Servic updateService(
            @PathVariable("serviceId") Integer serviceId,
            @RequestPart("service") Servic updatedService,
            @RequestPart(value = "imageFile", required = false) MultipartFile[] file
    ){
        try {
            Servic existingService = serviceService.getServiceDetailsById(serviceId);

            if (existingService != null) {
                existingService.setNom(updatedService.getNom());
                existingService.setDescription(updatedService.getDescription());


                if (file != null && file.length > 0) {
                    Set<ImageModel> images = uplodImage(file);
                    existingService.setServiceImages(images);
                }
                Servic savedService = serviceService.addNewService(existingService);
                return savedService;
            } else {
                throw new NotFoundException("Service not found with ID: " + serviceId);
            }
        } catch (Exception e) {
            throw new ServiceException("Error updating service", e);
        }
    }


}