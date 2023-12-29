package com.example.workbridgeback.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "demande")

public class Demande {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer demandeId;

    private int montant;

    private Integer Duree_propose;


    private String description; //pour les remarques

    private String etat; //pour etat valide ou non


    @ManyToOne
    @JoinColumn(name = "id_freelance")
    private User freelance;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;



    @ManyToMany(fetch = FetchType.EAGER, cascade =CascadeType.ALL)
    @JoinTable(name = "demande_images",
            joinColumns = {
                    @JoinColumn(name = "demande_id", nullable =false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "image_id", nullable = false)
            })
    private Set<ImageModel> demandeImages;

    public Demande() {
    }

    public Demande(Integer demandeId, int montant, Integer duree_propose, String description, String etat, User freelance, Project project, Set<ImageModel> demandeImages) {
        this.demandeId = demandeId;
        this.montant = montant;
        Duree_propose = duree_propose;
        this.description = description;
        this.etat = etat;
        this.freelance = freelance;
        this.project = project;
        this.demandeImages = demandeImages;
    }

    public Integer getDemandeId() {
        return demandeId;
    }

    public void setDemandeId(Integer demandeId) {
        this.demandeId = demandeId;
    }

    public int getMontant() {
        return montant;
    }

    public void setMontant(int montant) {
        this.montant = montant;
    }

    public Integer getDuree_propose() {
        return Duree_propose;
    }

    public void setDuree_propose(Integer duree_propose) {
        Duree_propose = duree_propose;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public User getfreelance() {
        return freelance;
    }

    public void setfreelance(User freelance) {
        this.freelance = freelance;
    }

    public Project getproject() {
        return project;
    }

    public void setproject(Project project) {
        this.project = project;
    }

    public Set<ImageModel> getDemandeImages() {
        return demandeImages;
    }

    public void setDemandeImages(Set<ImageModel> demandeImages) {
        this.demandeImages = demandeImages;
    }


}

