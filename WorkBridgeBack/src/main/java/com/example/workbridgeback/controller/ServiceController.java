package com.example.workbridgeback.controller;


import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.Servic;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.service.ServiceService;
import javassist.NotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
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
    @PostMapping(value = {"/addNewService/{userId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Servic addNewService(@PathVariable("userId") String userId,
                                @RequestPart("service") Servic servic,
                                @RequestPart("imageFile") MultipartFile[] file) {

        try {
        User user = userDao.findUserById(Long.valueOf(userId));

        System.out.println("*****************");

            servic.setUser(user);
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
    @GetMapping({"/getServiceByUser/{userId}"})
    public List<Servic> getServiceByUser( @PathVariable("userId") String userId) {
        return serviceService.getServiceByUser(userId);
    }

    //@PreAuthorize("hasRole('User')")
    @GetMapping({"/getAllServicesUser/{userId}"})
    public List<Servic> getAllServicesUser(
            @PathVariable("userId") String userId,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "") String searchKey) {
        return serviceService.getServiceByUserAndSearch(userId,pageNumber, searchKey);
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



    @PutMapping(value = "/updateService/{serviceId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Servic updateService(
            @PathVariable("serviceId") Integer serviceId,
            @RequestPart("service") Servic updatedService,
            @RequestPart("imageFile") MultipartFile[] file
    ){
        try {
            Servic existingService = serviceService.getServiceDetailsById(serviceId);

            if (existingService != null) {
                // Mettez à jour les propriétés du service
                existingService.setNom(updatedService.getNom());
                existingService.setDescription(updatedService.getDescription());
                // Mettez à jour d'autres propriétés au besoin

                // Mettez à jour les images (en supposant que Servic a un ensemble d'images)
                Set<ImageModel> images = uplodImage(file);
                existingService.setServiceImages(images);

                // Enregistrez le service mis à jour
                Servic savedService = serviceService.addNewService(existingService);
                return savedService;
            } else {
                // Service non trouvé, gestion en conséquence
                throw new NotFoundException("Service not found with ID: " + serviceId);
            }
        } catch (Exception e) {
            // Gérez les exceptions
            throw new ServiceException("Error updating service", e);
        }
    }


}