package com.example.krankenkasse.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
public class Mitarbeiter extends Person {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mitarbeiternummer;
    private LocalDate angestelltSeit;
    private String steueridentifikationsnummer;
    private int steuerklasse;
    private double gehalt;

    @OneToMany
    private List<Dokument> dokumente;

    public Mitarbeiter() {
        super();
    }

    public Mitarbeiter(LocalDate angestelltSeit, String steueridentifikationsnummer, int steuerklasse, double gehalt, List<Dokument> dokumente, String password, String geschlecht, String vorname, String nachname, LocalDate geburtsdatum, String geburtsort, String email, String telefonnummer, String straße, String plz, String ort, String nationalität, String iban) {
        super(password, geschlecht, vorname, nachname, geburtsdatum, geburtsort, email, telefonnummer, straße, plz, ort, nationalität, iban);
        this.angestelltSeit = angestelltSeit;
        this.steueridentifikationsnummer = steueridentifikationsnummer;
        this.steuerklasse = steuerklasse;
        this.gehalt = gehalt;
        this.dokumente = dokumente;
    }

    public Long getMitarbeiternummer() {
        return mitarbeiternummer;
    }

    public void setMitarbeiternummer(Long mitarbeiternummer) {
        this.mitarbeiternummer = mitarbeiternummer;
    }

    public LocalDate getAngestelltSeit() {
        return angestelltSeit;
    }

    public void setAngestelltSeit(LocalDate angestelltSeit) {
        this.angestelltSeit = angestelltSeit;
    }

    public String getSteueridentifikationsnummer() {
        return steueridentifikationsnummer;
    }

    public void setSteueridentifikationsnummer(String steueridentifikationsnummer) {
        this.steueridentifikationsnummer = steueridentifikationsnummer;
    }

    public int getSteuerklasse() {
        return steuerklasse;
    }

    public void setSteuerklasse(int steuerklasse) {
        this.steuerklasse = steuerklasse;
    }

    public double getGehalt() {
        return gehalt;
    }

    public void setGehalt(double gehalt) {
        this.gehalt = gehalt;
    }

    public List<Dokument> getDokumente() {
        return dokumente;
    }

    public void setDokumente(List<Dokument> dokumente) {
        this.dokumente = dokumente;
    }

    @Override
    public String toString() {
        return "Mitarbeiter{" +
                "mitarbeiternummer='" + mitarbeiternummer + '\'' +
                ", angestelltSeit=" + angestelltSeit +
                ", steueridentifikationsnummer='" + steueridentifikationsnummer + '\'' +
                ", steuerklasse=" + steuerklasse +
                ", gehalt=" + gehalt +
                ", dokumente=" + dokumente +
                '}';
    }
}
