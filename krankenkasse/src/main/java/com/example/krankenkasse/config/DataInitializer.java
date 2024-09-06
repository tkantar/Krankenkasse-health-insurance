package com.example.krankenkasse.config;

import com.example.krankenkasse.model.Dokument;
import com.example.krankenkasse.model.Mitarbeiter;
import com.example.krankenkasse.repository.MitarbeiterRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initMitarbeiter(MitarbeiterRepository mitarbeiterRepository) {
        List<Dokument> dokumente = null;
        return args -> {
            if (mitarbeiterRepository.count() == 0) {
                mitarbeiterRepository.save(new Mitarbeiter(LocalDate.of(2005, 8, 23), "2019384", 3, 4444.00, null, "Passw0rd#_", "m", "Boss", "Mustermann", LocalDate.of(1999, 5, 23), "Duisburg", "boss@gmail.com", "016672849", "Musterstrasse 45", "41343", "Berlin", "Deutsch", "DE89370400440532013000"));
                mitarbeiterRepository.save(new Mitarbeiter(LocalDate.of(2005, 8, 23), "2019384", 3, 4444.00, null, "Passw0rd#_", "m", "Boss", "Mustermann", LocalDate.of(1989, 8, 07), "Bochum", "boss2@gmail.com", "016672849", "Bossstrasse 77", "423344", "Münster", "Deutsch", "DE89370400440532013000"));
                mitarbeiterRepository.save(new Mitarbeiter(LocalDate.of(2005, 8, 23), "2019384", 3, 4444.00, null, "Passw0rd@_", "m", "Boss", "Mustermann", LocalDate.of(2002, 12, 02), "Hamburg", "boss3@gmail.com", "016672849", "Frankstrasse 90", "48345", "Frankfurt", "Deutsch", "DE89370400440532013000"));
            }
        };
    }
}