package com.example.krankenkasse.repository;

import com.example.krankenkasse.model.PraxisMitarbeiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PraxisMitarbeiterRepository extends JpaRepository<PraxisMitarbeiter, Long> {
    boolean existsByEmailAndPassword(String email, String password);

    Optional<PraxisMitarbeiter> findByEmail(String email);
}
