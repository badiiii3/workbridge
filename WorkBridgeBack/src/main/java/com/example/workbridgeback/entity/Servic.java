package com.example.workbridgeback.entity;


import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "service")
public class Servic {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer serviceId;


    private String nom;

    private String description;


    private int devis_Hrs;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;



    @ManyToMany(fetch = FetchType.EAGER, cascade =CascadeType.ALL)
    @JoinTable(name = "service_images",
            joinColumns = {
                    @JoinColumn(name = "service_id", nullable =false)
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "image_id", nullable = false)
            })
    private Set<ImageModel> serviceImages;

    public Servic() {
    }


    public Servic(Integer serviceId, String nom, String description, int devis_Hrs, User user, Set<ImageModel> serviceImages) {
        this.serviceId = serviceId;
        this.nom = nom;
        this.description = description;
        this.devis_Hrs = devis_Hrs;
        this.user = user;
        this.serviceImages = serviceImages;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDevis_Hrs(int devis_Hrs) {
        this.devis_Hrs = devis_Hrs;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<ImageModel> getServiceImages() {
        return serviceImages;
    }

    public void setServiceImages(Set<ImageModel> serviceImages) {
        this.serviceImages = serviceImages;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public int getDevis_Hrs() {
        return devis_Hrs;
    }

    public User getUser() {
        return user;
    }
}
