package com.example.krankenkasse.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Dokument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dateiname;
    private String dateityp;

    @Lob
    private byte[] daten;

    @ManyToOne
    @JoinColumn(name = "versichertennummer", referencedColumnName = "versichertennummer")
    private Patient patient;

    public Dokument() {
    }

    // Neuer Konstruktor
    public Dokument(String dateiname, String dateityp, byte[] daten) {
        this.dateiname = dateiname;
        this.dateityp = dateityp;
        this.daten = daten;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDateiname() {
        return dateiname;
    }

    public void setDateiname(String dateiname) {
        this.dateiname = dateiname;
    }

    public String getDateityp() {
        return dateityp;
    }

    public void setDateityp(String dateityp) {
        this.dateityp = dateityp;
    }

    public byte[] getDaten() {
        return daten;
    }

    public void setDaten(byte[] daten) {
        this.daten = daten;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
}
