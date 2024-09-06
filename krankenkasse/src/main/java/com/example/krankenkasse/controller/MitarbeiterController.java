package com.example.krankenkasse.controller;

import com.example.krankenkasse.model.Mitarbeiter;
import com.example.krankenkasse.service.MitarbeiterService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/mitarbeiter")
public class MitarbeiterController {

    @Autowired
    private MitarbeiterService mitarbeiterService;

    // Get current Mitarbeiter by email (example of Read operation)
    @GetMapping("/me")
    public ResponseEntity<Mitarbeiter> getCurrentMitarbeiter(@RequestParam String email) {
        Optional<Mitarbeiter> mitarbeiter = mitarbeiterService.findByEmail(email);
        return mitarbeiter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get all Mitarbeiter
    @GetMapping
    public List<Mitarbeiter> getAllMitarbeiter() {
        return mitarbeiterService.findAll();
    }

    // Get Mitarbeiter by ID
    @GetMapping("/{id}")
    public ResponseEntity<Mitarbeiter> getMitarbeiterById(@PathVariable Long id) {
        Optional<Mitarbeiter> mitarbeiter = mitarbeiterService.findById(id);
        return mitarbeiter.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create a new Mitarbeiter
    @PostMapping
    public ResponseEntity<Mitarbeiter> createMitarbeiter(@RequestBody Mitarbeiter mitarbeiter) {
        Mitarbeiter newMitarbeiter = mitarbeiterService.save(mitarbeiter);
        return ResponseEntity.status(201).body(newMitarbeiter);
    }

    // Update an existing Mitarbeiter
    @PutMapping("/{id}")
    public ResponseEntity<Mitarbeiter> updateMitarbeiter(@PathVariable Long id, @RequestBody Mitarbeiter mitarbeiterDetails) {
        return mitarbeiterService.findById(id).map(existingMitarbeiter -> {
            BeanUtils.copyProperties(mitarbeiterDetails, existingMitarbeiter, "mitarbeiternummer");
            Mitarbeiter updatedMitarbeiter = mitarbeiterService.save(existingMitarbeiter);
            return ResponseEntity.ok(updatedMitarbeiter);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an Mitarbeiter
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMitarbeiter(@PathVariable Long id) {
        mitarbeiterService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
