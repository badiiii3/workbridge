package com.example.workbridgeback.entity;


import javax.persistence.*;

@Entity
@Table(name = "rate")

public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer rateid;

    private int etoile;



    private String date;

    private String commentaire; //commentaire


    @ManyToOne
    @JoinColumn(name = "id_freelance")
    private User freelance;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private User client;





    public Rate() {
    }

    public Rate(Integer rateid, int etoile, String date, String commentaire, User freelance, User client) {
        this.rateid = rateid;
        this.etoile = etoile;
        this.date = date;
        this.commentaire = commentaire;
        this.freelance = freelance;
        this.client = client;
    }

    public Integer getRateid() {
        return rateid;
    }

    public void setRateid(Integer rateid) {
        this.rateid = rateid;
    }

    public int getEtoile() {
        return etoile;
    }

    public void setEtoile(int etoile) {
        this.etoile = etoile;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public User getFreelance() {
        return freelance;
    }

    public void setFreelance(User freelance) {
        this.freelance = freelance;
    }

    public User getClient() {
        return client;
    }

    public void setClient(User client) {
        this.client = client;
    }
}

