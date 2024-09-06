package com.example.krankenkasse.controller;

import com.example.krankenkasse.model.PraxisMitarbeiter;
import com.example.krankenkasse.service.PraxisMitarbeiterService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/praxisMitarbeiter")
public class PraxisMitarbeiterController {

    @Autowired
    private PraxisMitarbeiterService praxisMitarbeiterService;

    @GetMapping
    public List<PraxisMitarbeiter> getAllPraxisMitarbeiter(){ return praxisMitarbeiterService.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<PraxisMitarbeiter> getPraxisMitarbeiterById(@PathVariable Long id){
        Optional<PraxisMitarbeiter> praxisMitarbeiter = praxisMitarbeiterService.findById(id);
        return praxisMitarbeiter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<PraxisMitarbeiter> getCurrentPraxisMitarbeiter(@RequestParam String email) {
        Optional<PraxisMitarbeiter> praxisMitarbeiter = praxisMitarbeiterService.findByEmail(email);
        return praxisMitarbeiter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<PraxisMitarbeiter> createPraxisMitarbeiter(@RequestBody PraxisMitarbeiter praxisMitarbeiter){
        PraxisMitarbeiter newPraxisMitarbeiter = praxisMitarbeiterService.save(praxisMitarbeiter);
        return ResponseEntity.status(201).body(newPraxisMitarbeiter);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePraxisMitarbeiter(@PathVariable Long id){
        praxisMitarbeiterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PraxisMitarbeiter> updatePraxisMitarbeiter(@PathVariable Long id, @RequestBody PraxisMitarbeiter praxisMitarbeiterDetails){
        return praxisMitarbeiterService.findById(id).map(praxisMitarbeiter -> {
            BeanUtils.copyProperties(praxisMitarbeiterDetails, praxisMitarbeiter, "versichertennummer");
            PraxisMitarbeiter updatedPraxisMitarbeiter = praxisMitarbeiterService.save(praxisMitarbeiter);
            return ResponseEntity.ok(updatedPraxisMitarbeiter);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
