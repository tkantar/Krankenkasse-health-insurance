package com.example.krankenkasse.repository;

import com.example.krankenkasse.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByEmailAndPassword(String email, String password);

    Optional<Patient> findByEmail(String email);
}
