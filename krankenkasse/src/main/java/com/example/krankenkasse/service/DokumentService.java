package com.example.krankenkasse.service;

import com.example.krankenkasse.model.Dokument;
import com.example.krankenkasse.model.Patient;
import com.example.krankenkasse.repository.DokumentRepository;
import com.example.krankenkasse.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class DokumentService {

    @Autowired
    private DokumentRepository dokumentRepository;

    @Autowired
    private PatientRepository patientRepository;

    public Dokument saveDokument(MultipartFile file, Long patientId) throws IOException {
        Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new RuntimeException("Patient nicht gefunden"));

        Dokument dokument = new Dokument();
        dokument.setDateiname(file.getOriginalFilename());
        dokument.setDateityp(file.getContentType());
        dokument.setDaten(file.getBytes());
        dokument.setPatient(patient);

        return dokumentRepository.save(dokument);
    }

    public Dokument getDokument(Long id) {
        return dokumentRepository.findById(id).orElseThrow(() -> new RuntimeException("Dokument nicht gefunden"));
    }

    public void deleteDokument(Long id) {
        dokumentRepository.deleteById(id);
    }

    public List<Dokument> findAll(){ return dokumentRepository.findAll(); }

    public Optional<Dokument> findById(Long id){ return dokumentRepository.findById(id); }

    @Transactional
    public Dokument save(Dokument dokument){ return dokumentRepository.save(dokument); }

    @Transactional
    public void deleteById(Long id){ dokumentRepository.deleteById(id); }

    public boolean existsById(Long documentId) {
        return dokumentRepository.existsById(documentId);
    }
}
