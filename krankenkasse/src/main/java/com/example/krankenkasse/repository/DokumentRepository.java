package com.example.krankenkasse.repository;

import com.example.krankenkasse.model.Dokument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DokumentRepository extends JpaRepository<Dokument, Long> {
    List<Dokument> findByPatient_Versichertennummer(Long versichertennummer);
}
