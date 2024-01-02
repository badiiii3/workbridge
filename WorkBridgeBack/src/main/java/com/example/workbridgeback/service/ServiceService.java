package com.example.workbridgeback.service;

import com.example.workbridgeback.dao.ServiceRepository;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.Servic;
import com.example.workbridgeback.entity.User;
import javassist.NotFoundException;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;
    @Autowired
    private UserDao userDao;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    public Servic addNewService(Servic servic) {


        return serviceRepository.save(servic);
    }

    public void deleteServiceDetails(Integer serviceid)
    {
        serviceRepository.deleteById(serviceid);
    }

    public Servic getServiceDetailsById(Integer serviceid) {

        return serviceRepository.findById(serviceid).get();
    }
    public List<Servic> getServiceByUser(String userId) {

        User user = userDao.findUserById(Long.valueOf(userId));
        return serviceRepository.findByUser(user);
    }

    public List<Servic> getServiceByUserAndSearch(String userId, int pageNumber, String searchKey) {
        User user = userDao.findUserById(Long.valueOf(userId));

        Pageable pageable = PageRequest.of(pageNumber, 8);

        if (searchKey.equals("")) {
            return (List<Servic>)serviceRepository.findByUser(user);
        } else {
            return (List<Servic>) serviceRepository.findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                    user, searchKey, user, searchKey, pageable);
        }
    }

    public List<Servic> getProductDetails(boolean isSingeServiceCheckout, Integer blogId) {

        if(isSingeServiceCheckout && blogId != 0) {
            List<Servic> list= new ArrayList<>();
            Servic servic = serviceRepository.findById(blogId).get();
            list.add(servic);
            return list;
        }else {
            return  null ;

        }


    }

    public Servic updateService(Servic updatedService) {
        try {
            // Check if the service already exists in the database
            Servic existingService = serviceRepository.findById(updatedService.getServiceId()).orElse(null);

            if (existingService != null) {
                // Update service properties
                existingService.setNom(updatedService.getNom());
                existingService.setDescription(updatedService.getDescription());
                // Update other properties as needed

                // Update images (assuming Servic has a set of images)
                existingService.setServiceImages(updatedService.getServiceImages());

                // Save the updated service
                Servic savedService = serviceRepository.save(existingService);
                return savedService;
            } else {
                // Service not found, handle accordingly
                throw new NotFoundException("Service not found with ID: " + updatedService.getServiceId());
            }
        } catch (Exception e) {
            // Handle exceptions
            throw new ServiceException("Error updating service", e);
        }
    }



}