package com.example.krankenkasse.service;

import com.example.krankenkasse.model.PraxisMitarbeiter;
import com.example.krankenkasse.repository.PraxisMitarbeiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.*;

@Service
public class PraxisMitarbeiterService {
    @Autowired
    private PraxisMitarbeiterRepository praxisMitarbeiterRepository;

    public List<PraxisMitarbeiter> findAll(){ return praxisMitarbeiterRepository.findAll(); }

    public Optional<PraxisMitarbeiter> findById(Long id){ return praxisMitarbeiterRepository.findById(id); }

    public Optional<PraxisMitarbeiter> findByEmail(String email) {return praxisMitarbeiterRepository.findByEmail(email);}

    @Transactional
    public PraxisMitarbeiter save(PraxisMitarbeiter praxisMitarbeiter){ return praxisMitarbeiterRepository.save(praxisMitarbeiter); }

    @Transactional
    public void deleteById(Long id){ praxisMitarbeiterRepository.deleteById(id); }


}
