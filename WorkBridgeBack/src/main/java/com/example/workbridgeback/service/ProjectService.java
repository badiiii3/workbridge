package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtUtils;
import com.example.workbridgeback.dao.ProjectDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProjectService {
    @Autowired
    private ProjectDao projectDao;
    @Autowired
    private UserDao userDao;

    public Project addNewProject(Project project) {


        return projectDao.save(project);
    }

    public Project updateProject(Project updatedProject)  {
        // Check if the project with the given ID exists
        if (projectDao.existsById(updatedProject.getProjectId())) {
            // Retrieve the existing project from the database
            Project existingProject = projectDao.findById(updatedProject.getProjectId()).orElse(null);

            // Update the fields of the existing project with the new values
            existingProject.setProjectName(updatedProject.getProjectName());
            existingProject.setProjectDescription(updatedProject.getProjectDescription());
            existingProject.setProjectCreated(updatedProject.getProjectCreated());
            existingProject.setProjectDuration(updatedProject.getProjectDuration());
            existingProject.setProjectDomain(updatedProject.getProjectDomain());
            existingProject.setProjectState(updatedProject.getProjectState());
            existingProject.setProjectTechnology(updatedProject.getProjectTechnology());

            // Update project images

            existingProject.setProjectImages(updatedProject.getProjectImages());

            // Save the updated project
            Project savedProject = projectDao.save(existingProject);
            return savedProject;
        } else {
            // Handle the case where the project with the given ID does not exist
            return null;
        }
    }

    public void deleteProjectDetails(Integer id) {projectDao.deleteById(id);
    }





    public Project getProjectDetailsById(Integer id) {

        return projectDao.findById(id).get();
    }
    public List<Project> getProjectByUser() {
       String currentUser = JwtUtils.CURRENT_USER;
        User user = userDao.findByEmail( currentUser).get();

        return projectDao.findByUser(user);
    }
    public List<Project> getAllProjects(int pageNumber, String searchKey){
        Pageable pageable = PageRequest.of(pageNumber, 8);

        if(searchKey.equals("")) {
            return (List<Project>) projectDao.findAll(pageable);
        }else {
            return (List<Project>)projectDao.findByProjectNameContainingIgnoreCaseOrProjectDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
        }

    }
    public List<Project> getProjectByUserAndSearch(int pageNumber, String searchKey) {
        //String currentUser = JwtAuthenticationFilter.CURRENT_USER;
        //User user = userDao.findByEmail(currentUser).orElse(null);

            User user = null;
            Pageable pageable = PageRequest.of(pageNumber, 8);

            if (searchKey.equals("")) {
                return (List<Project>)projectDao.findByUser(user);
            } else {
                return (List<Project>) projectDao.findByUserAndProjectNameContainingIgnoreCaseOrUserAndProjectDescriptionContainingIgnoreCase(
                        user, searchKey, user, searchKey, pageable);
            }


    }

    public List<Project> getProjectDetails(boolean isSingeProjectCheckout, Integer projectId) {

        if (isSingeProjectCheckout && projectId != 0) {
            List<Project> list = new ArrayList<>();
            String currentUser = JwtUtils.CURRENT_USER;
            User user = userDao.findByEmail( currentUser).get();

            list =  projectDao.findByUser(user);

            return list;
        }else {return null;}
    }


}

