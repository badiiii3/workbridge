package com.example.workbridgeback.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;
@Entity
@Data
@Builder
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer offerId;
    private String offerTitle;
    private String offerDescription;
    private String offerStatus;
    private String offerSkills;
    private Integer offerExperience;
    private String offerContractType;
    private Double offerSalary;
    private LocalDate offerDeadline;
    private String offerLocation;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToMany(fetch = FetchType.EAGER, cascade =CascadeType.ALL)
    @JoinTable(name = "offer_images",
            joinColumns = {
                    @JoinColumn(name = "offer_id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "image_id")
            })
    private Set<ImageModel> offerImages;

    public Offer() {
    }

    public Offer(Integer offerId, String offerTitle, String offerDescription, String offerStatus, String offerSkills, Integer offerExperience, String offerContractType, Double offerSalary, LocalDate offerDeadline, String offerLocation, User user, Set<ImageModel> offerImages) {
        this.offerId = offerId;
        this.offerTitle = offerTitle;
        this.offerDescription = offerDescription;
        this.offerStatus = offerStatus;
        this.offerSkills = offerSkills;
        this.offerExperience = offerExperience;
        this.offerContractType = offerContractType;
        this.offerSalary = offerSalary;
        this.offerDeadline = offerDeadline;
        this.offerLocation = offerLocation;
        this.user = user;
        this.offerImages = offerImages;
    }

    public Integer getOfferId() {
        return offerId;
    }

    public void setOfferId(Integer offerId) {
        this.offerId = offerId;
    }

    public String getOfferTitle() {
        return offerTitle;
    }

    public void setOfferTitle(String offerTitle) {
        this.offerTitle = offerTitle;
    }

    public String getOfferDescription() {
        return offerDescription;
    }

    public void setOfferDescription(String offerDescription) {
        this.offerDescription = offerDescription;
    }

    public String getOfferStatus() {
        return offerStatus;
    }

    public void setOfferStatus(String offerStatus) {
        this.offerStatus = offerStatus;
    }

    public String getOfferSkills() {
        return offerSkills;
    }

    public void setOfferSkills(String offerSkills) {
        this.offerSkills = offerSkills;
    }

    public Integer getOfferExperience() {
        return offerExperience;
    }

    public void setOfferExperience(Integer offerExperience) {
        this.offerExperience = offerExperience;
    }

    public String getOfferContractType() {
        return offerContractType;
    }

    public void setOfferContractType(String offerContractType) {
        this.offerContractType = offerContractType;
    }

    public Double getOfferSalary() {
        return offerSalary;
    }

    public void setOfferSalary(Double offerSalary) {
        this.offerSalary = offerSalary;
    }

    public LocalDate getOfferDeadline() {
        return offerDeadline;
    }

    public void setOfferDeadline(LocalDate offerDeadline) {
        this.offerDeadline = offerDeadline;
    }

    public String getOfferLocation() {
        return offerLocation;
    }

    public void setOfferLocation(String offerLocation) {
        this.offerLocation = offerLocation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<ImageModel> getOfferImages() {
        return offerImages;
    }

    public void setOfferImages(Set<ImageModel> offerImages) {
        this.offerImages = offerImages;
    }
}
