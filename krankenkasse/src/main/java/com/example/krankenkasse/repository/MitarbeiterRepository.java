package com.example.krankenkasse.repository;

import com.example.krankenkasse.model.Mitarbeiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MitarbeiterRepository extends JpaRepository<Mitarbeiter, Long> {
    boolean existsByEmailAndPassword(String email, String password);

    Optional<Mitarbeiter> findByEmail(String email);

}
