package com.example.workbridgeback.controller;

import com.example.workbridgeback.dao.DemandeDao;
import com.example.workbridgeback.dao.ProjectDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.*;
import com.example.workbridgeback.service.DemandeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class DemandeController {
    @Autowired
    private ProjectDao projectDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private DemandeDao demandeDao;
    @Autowired
    private DemandeService demandeService;


    @PostMapping(value = {"/addNewDemande/{userId}/{projectId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Demande addNewDemande(@PathVariable("userId") String userId,
                                 @PathVariable("projectId") String projectId,
                                 @RequestPart("demande") Demande demande,
                                 @RequestPart("imageFile") MultipartFile[] file) {
        try {

            User user = userDao.findUserById(Long.valueOf(userId));
            Project project = projectDao.findByProjectId(Math.toIntExact(Long.valueOf(projectId)));

            System.out.println(user);
            demande.setfreelance(user);
            demande.setproject(project);

            Set<ImageModel> images = uplodImage(file);

            demande.setDemandeImages(images);
            return demandeService.addNewDemande(demande);
        } catch (Exception e) {

            System.out.println("aaaaaaaaaaaaaaaaaaaaaaa"+e.getMessage());
            return demande;
        }


    }
    public Set<ImageModel> uplodImage(MultipartFile[] multipartFiles) throws IOException {

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

    @GetMapping({"/getDemandeByFreelance/{userId}"})
    public List<Demande> getDemandeByFreelance(@PathVariable("userId") String userId) {
        return demandeService.getDemandesByFreelance(userId);
    }

    @GetMapping({"/getDemandeByProject/{projectId}"})
    public List<Demande> getDemandeByProject(@PathVariable("projectId") String projectId) {
        return demandeService.getDemandesByProject(projectId);
    }
    @GetMapping({"/getDemandeDetailsById/{demandeId}"})
    public Demande getDemandeDetailsById(@PathVariable("demandeId") Integer demandeId) {

        return demandeService.getDemandeDetailsById(demandeId);

    }
    @DeleteMapping({"/deleteDemandeDetailes/{demandeId}"})
    public void deleteDemandeDetailes(@PathVariable("demandeId") Integer demandeId) {
        demandeService.deleteDemandeDetails(demandeId);
    }

    @PutMapping("/updateDemandeEtat/{demandeId}")
    public ResponseEntity<Demande> update(@PathVariable  Integer demandeId,
                                              @RequestBody Demande p) {
        Demande demande = demandeDao.findById(demandeId)
                .orElseThrow();

        demande.setEtat(p.getEtat());




        Demande updateProfile = demandeDao.save(demande);
        return ResponseEntity.ok(updateProfile);
    }

    @GetMapping({"/getDemandeDetails/{isSingeDemandeCheckout}/{demandeId}"})
    public List<Demande> getDemandeDetails(@PathVariable(name="isSingeDemandeCheckout") boolean isSingeDemandeCheckout,
                                           @PathVariable(name= "demandeId") Integer demandeId) {

        return demandeService.getDemandeDetails(isSingeDemandeCheckout, demandeId);


    }
}