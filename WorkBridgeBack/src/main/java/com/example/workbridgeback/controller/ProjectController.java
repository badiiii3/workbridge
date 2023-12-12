package com.example.workbridgeback.controller;

import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.ImageModel;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.User;
import com.example.workbridgeback.service.ProjectService;
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
public class ProjectController {

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserDao userDao;


    @PostMapping(value = {"/addNewProject"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Project addNewProject(@RequestPart("project") Project project,
                                 @RequestPart("imageFile") MultipartFile[] file) {


        try {

            //String currentUser = JwtAuthenticationFilter.CURRENT_USER;
            //User user = userDao.findByEmail( currentUser).get();
            User user = null;

            project.setUser(user);

            Set<ImageModel> images = uplodImage(file);

            project.setProjectImages(images);
            return projectService.addNewProject(project);
        } catch (Exception e) {

            System.out.println("aaaaaaaaaaaaaaaaaaaaaaa"+e.getMessage());
            return project;
        }


    }
    @PutMapping(value = {"/updateProject/{projectId}"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Project updateProject(@PathVariable("projectId") Integer projectId,
                                 @RequestPart("project") Project updatedProject,
                                 @RequestPart(value = "imageFile", required = false) MultipartFile[] file) {

        try {
            Project existingProject = projectService.getProjectDetailsById(projectId);

            if (existingProject != null) {
                // Mettez à jour les propriétés du service
                existingProject.setProjectName(updatedProject.getProjectName());
                existingProject.setProjectDescription(updatedProject.getProjectDescription());
                existingProject.setProjectCreated(updatedProject.getProjectCreated());
                existingProject.setProjectDuration(updatedProject.getProjectDuration());
                existingProject.setProjectDomain(updatedProject.getProjectDomain());
                existingProject.setProjectState(updatedProject.getProjectState());
                existingProject.setProjectTechnology(updatedProject.getProjectTechnology());
                // Mettez à jour d'autres propriétés au besoin

                // Mettez à jour les images (en supposant que Servic a un ensemble d'images)
                Set<ImageModel> images = uplodImage(file);
                existingProject.setProjectImages(images);

                // Enregistrez le service mis à jour
                Project savedProject = projectService.addNewProject(existingProject);
                return savedProject;
            } else {
                // Service non trouvé, gestion en conséquence
                throw new NotFoundException("Service not found with ID: " + projectId);
            }
        } catch (Exception e) {
            // Gérez les exceptions
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



    @GetMapping({"/getProjectByUser"})
    public List<Project> getProjectByUser() {
        System.out.println("ekhem user ");
        return projectService.getProjectByUser();

    }
    @GetMapping({"/getAllProjectsUser"})
    public List<Project> getAllProjectsUser(@RequestParam(defaultValue = "0") int pageNumber,
                                        @RequestParam(defaultValue = "") String searchKey) {
        return projectService.getProjectByUserAndSearch(pageNumber, searchKey);
    }

    @GetMapping({"/getAllProjects"})
    public List<Project> getAllProjects(@RequestParam(defaultValue = "0") int pageNumber
            , @RequestParam(defaultValue = "") String searchKey) {
        return projectService.getAllProjects(pageNumber, searchKey);
    }
    @GetMapping({"/getProjectDetailsById/{projectId}"})
    public Project getProjectDetailsById(@PathVariable("projectId") Integer projectId) {

        return projectService.getProjectDetailsById(projectId);

    }


    @GetMapping({"/getProjectDetails/{isSingeProjectCheckout}/{projectId}"})
    public List<Project> getProjectDetails(@PathVariable(name="isSingeProjectCheckout") boolean isSingeProjectCheckout,
                                           @PathVariable(name= "projectId") Integer projectId) {

        return projectService.getProjectDetails(isSingeProjectCheckout, projectId);


    }

    @DeleteMapping({"/deleteProjectDetails/{projectId}"})
    public void deleteProjectDetailes(@PathVariable("projectId") Integer projectId) {
        projectService.deleteProjectDetails(projectId);
    }


}