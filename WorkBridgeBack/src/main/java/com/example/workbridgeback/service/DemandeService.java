package com.example.workbridgeback.service;

import com.example.workbridgeback.configuration.JwtUtils;
import com.example.workbridgeback.dao.DemandeDao;
import com.example.workbridgeback.dao.ProjectDao;
import com.example.workbridgeback.dao.UserDao;
import com.example.workbridgeback.entity.Demande;
import com.example.workbridgeback.entity.Project;
import com.example.workbridgeback.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DemandeService {
    @Autowired
    private ProjectDao projectDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private DemandeDao demandeDao;


    public Demande addNewDemande(Demande demande) {

        return demandeDao.save(demande);
    }

    public void deleteDemandeDetails(Integer demande_id) {
        demandeDao.deleteById(demande_id);
    }

    public Demande updateDemandeEtat(Demande demande) {
        if (demandeDao.existsById(demande.getDemandeId())) {
            Demande existingDemande = demandeDao.findById(demande.getDemandeId()).orElse(null);

            existingDemande.setEtat(demande.getEtat());

            return demandeDao.save(existingDemande);
        }

        return demande;
    }

    public List<Demande> getDemandesByFreelance(String userId) {

        User user = userDao.findUserById(Long.valueOf(userId));
        return (List<Demande>) demandeDao.findByFreelance(user);
    }

    public List<Demande> getDemandesByProject(String project_id) {

        Project project = projectDao.findByProjectId(Math.toIntExact(Long.valueOf(project_id)));
        if (project != null) {
            return (List<Demande>) demandeDao.findByProject(project);
        } else {
            return Collections.emptyList(); // or throw an exception, or handle accordingly
        }

    }
    public Demande getDemandeDetailsById(Integer id) {

        return demandeDao.findById(id).get();
    }
    public List<Demande> getDemandeDetails(boolean isSingeDemandeCheckout, Integer demandeId) {

        if (isSingeDemandeCheckout && demandeId != 0) {
            List<Demande> list = new ArrayList<>();
            String currentUser = JwtUtils.CURRENT_USER;
            User user = userDao.findByEmail( currentUser).get();

            list =  demandeDao.findByFreelance(user);

            return list;
        }else {return null;}
    }



}