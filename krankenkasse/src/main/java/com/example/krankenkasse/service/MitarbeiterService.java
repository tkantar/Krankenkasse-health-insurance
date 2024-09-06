package com.example.krankenkasse.service;

import com.example.krankenkasse.model.Mitarbeiter;
import com.example.krankenkasse.repository.MitarbeiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class MitarbeiterService {

    @Autowired
    private MitarbeiterRepository mitarbeiterRepository;

    public List<Mitarbeiter> findAll(){ return mitarbeiterRepository.findAll(); }

    public Optional<Mitarbeiter> findById(Long id){ return mitarbeiterRepository.findById(id); }

    public Optional<Mitarbeiter> findByEmail(String email) { return mitarbeiterRepository.findByEmail(email); }

    @Transactional
    public Mitarbeiter save(Mitarbeiter mitarbeiter){ return mitarbeiterRepository.save(mitarbeiter); }

    @Transactional
    public void deleteById(Long id){ mitarbeiterRepository.deleteById(id); }
}
