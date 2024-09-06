package com.example.krankenkasse.service;

import com.example.krankenkasse.model.Patient;
import com.example.krankenkasse.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> findAll() {
        return patientRepository.findAll();
    }

    public Optional<Patient> findById(Long id) {
        return patientRepository.findById(id);
    }

    public Optional<Patient> findByEmail(String email) {
        return patientRepository.findByEmail(email);
    }

    @Transactional
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    @Transactional
    public void deleteById(Long id) {
        // Vor dem Löschen des Patienten sollten wir sicherstellen, dass alle verknüpften Dokumente gelöscht werden
        patientRepository.findById(id).ifPresent(patient -> {
            patient.getDokumente().clear();
            patientRepository.delete(patient);
        });
    }

    public boolean existsById(Long id) {
        return patientRepository.existsById(id);
    }
}
