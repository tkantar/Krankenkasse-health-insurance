package com.example.krankenkasse.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Patient extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long versichertennummer;
    private LocalDate versichertSeit;
    private String versicherungsArt;
    @OneToMany
    private List<Dokument> dokumente;

    public Patient() {
    }

    public Patient(String password, String geschlecht, String vorname, String nachname, LocalDate geburtsdatum, String geburtsort, String email, String telefonnummer, String straße, String plz, String ort, String nationalität, String iban, LocalDate versichertSeit, String versicherungsArt, List<Dokument> dokumente) {
        super(password, geschlecht, vorname, nachname, geburtsdatum, geburtsort, email, telefonnummer, straße, plz, ort, nationalität, iban);
        this.versichertSeit = versichertSeit;
        this.versicherungsArt = versicherungsArt;
        this.dokumente = dokumente;
    }

    public Long getVersichertennummer() {
        return versichertennummer;
    }

    public void setVersichertennummer(Long versichertennummer) {
        this.versichertennummer = versichertennummer;
    }

    public LocalDate getVersichertSeit() {
        return versichertSeit;
    }

    public void setVersichertSeit(LocalDate versichertSeit) {
        this.versichertSeit = versichertSeit;
    }

    public String getVersicherungsArt() {
        return versicherungsArt;
    }

    public void setVersicherungsArt(String versicherungsArt) {
        this.versicherungsArt = versicherungsArt;
    }

    public List<Dokument> getDokumente() {
        return dokumente;
    }

    public void setDokumente(List<Dokument> dokumente) {
        this.dokumente = dokumente;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "versichertennummer='" + versichertennummer + '\'' +
                ", versichertSeit=" + versichertSeit +
                ", versicherungsArt='" + versicherungsArt + '\'' +
                ", dokumente=" + dokumente +
                '}';
    }
}
