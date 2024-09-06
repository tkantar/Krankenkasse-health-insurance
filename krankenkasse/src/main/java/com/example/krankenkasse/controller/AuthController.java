package com.example.krankenkasse.controller;

import com.example.krankenkasse.config.JwtTokenProvider;
import com.example.krankenkasse.dto.LoginRequest;
import com.example.krankenkasse.dto.LoginResponse;
import com.example.krankenkasse.repository.MitarbeiterRepository;
import com.example.krankenkasse.repository.PatientRepository;
import com.example.krankenkasse.repository.PraxisMitarbeiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private MitarbeiterRepository mitarbeiterRepository;

    @Autowired
    private PraxisMitarbeiterRepository praxisMitarbeiterRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        String role = null;

        if (mitarbeiterRepository.existsByEmailAndPassword(email, password)) {
            System.out.println("Mitarbeiter gefunden");
            role = "Mitarbeiter";
        } else if (praxisMitarbeiterRepository.existsByEmailAndPassword(email, password)) {
            System.out.println("PraxisMitarbeiter gefunden");
            role = "PraxisMitarbeiter";
        } else if (patientRepository.existsByEmailAndPassword(email, password)) {
            System.out.println("Patient gefunden");
            role = "Patient";
        } else {
            System.out.println("Login fehlgeschlagen");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // JWT-Token generieren
        String token = jwtTokenProvider.generateToken(email, role);

        // Antwort mit Token, Rolle und E-Mail zurückgeben
        return ResponseEntity.ok(new LoginResponse(email, token, role));
    }
}
