package com.example.krankenkasse.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@MappedSuperclass
public abstract class Person {

    @Column(nullable = false)
    @Size(min = 8, message = "Das Passwort muss mindestens 8 Zeichen lang sein.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$",
            message = "Das Passwort muss mindestens eine Ziffer, einen Großbuchstaben, einen Kleinbuchstaben und ein Sonderzeichen enthalten.")
    private String password;
    @Column(nullable = false)
    @Pattern(regexp = "^[mMwWdD]$", message = "Ungültiges Geschlecht. Nur 'm', 'w' oder 'd' sind erlaubt.")
    private String geschlecht;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String vorname;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String nachname;
    @Column(nullable = false)
    @Past
    private LocalDate geburtsdatum;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String geburtsort;
    @Column(nullable = false, unique = true)
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 25)
    private String telefonnummer;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String straße;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 10)
    private String plz;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String ort;
    @Column(nullable = false)
    @NotBlank
    @Size(max = 50)
    private String nationalität;
    @Column(length = 22, nullable = false)
    @Size(min =22, max = 22)
    @Pattern(regexp = "^[A-Z]{2}\\d{20}$")
    private String iban;

    public Person(){}

    public Person(String password, String geschlecht, String vorname, String nachname, LocalDate geburtsdatum, String geburtsort, String email, String telefonnummer, String straße, String plz, String ort, String nationalität, String iban) {
        this.password = password;
        this.geschlecht = geschlecht;
        this.vorname = vorname;
        this.nachname = nachname;
        this.geburtsdatum = geburtsdatum;
        this.geburtsort = geburtsort;
        this.email = email;
        this.telefonnummer = telefonnummer;
        this.straße = straße;
        this.plz = plz;
        this.ort = ort;
        this.nationalität = nationalität;
        this.iban = iban;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGeschlecht() {
        return geschlecht;
    }

    public void setGeschlecht(String geschlecht) {
        this.geschlecht = geschlecht;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

    public String getNachname() {
        return nachname;
    }

    public void setNachname(String nachname) {
        this.nachname = nachname;
    }

    public LocalDate getGeburtsdatum() {
        return geburtsdatum;
    }

    public void setGeburtsdatum(LocalDate geburtsdatum) {
        this.geburtsdatum = geburtsdatum;
    }

    public String getGeburtsort() {
        return geburtsort;
    }

    public void setGeburtsort(String geburtsort) {
        this.geburtsort = geburtsort;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefonnummer() {
        return telefonnummer;
    }

    public void setTelefonnummer(String telefonnummer) {
        this.telefonnummer = telefonnummer;
    }

    public String getStraße() {
        return straße;
    }

    public void setStraße(String straße) {
        this.straße = straße;
    }

    public String getPlz() {
        return plz;
    }

    public void setPlz(String plz) {
        this.plz = plz;
    }

    public String getOrt() {
        return ort;
    }

    public void setOrt(String ort) {
        this.ort = ort;
    }

    public String getNationalität() {
        return nationalität;
    }

    public void setNationalität(String nationalität) {
        this.nationalität = nationalität;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    @Override
    public String toString() {
        return "Person{" +
                "passwort='" + password + '\'' +
                ", geschlecht=" + geschlecht +
                ", vorname='" + vorname + '\'' +
                ", nachname='" + nachname + '\'' +
                ", geburtsdatum=" + geburtsdatum +
                ", geburtsort='" + geburtsort + '\'' +
                ", email='" + email + '\'' +
                ", telefonnummer='" + telefonnummer + '\'' +
                ", straße='" + straße + '\'' +
                ", plz='" + plz + '\'' +
                ", ort='" + ort + '\'' +
                ", nationalität='" + nationalität + '\'' +
                ", iban='" + iban + '\'' +
                '}';
    }
}
