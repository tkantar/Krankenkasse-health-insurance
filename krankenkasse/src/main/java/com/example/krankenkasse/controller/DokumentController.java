package com.example.krankenkasse.controller;

import com.example.krankenkasse.model.Dokument;
import com.example.krankenkasse.service.DokumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dokument")
public class DokumentController {

    @Autowired
    private DokumentService dokumentService;

    @PostMapping("/upload")
    public ResponseEntity<Dokument> uploadDokument(@RequestParam("datei") MultipartFile file, @RequestParam("patientId") Long patientId) throws IOException, IOException {
        Dokument dokument = dokumentService.saveDokument(file, patientId);
        return ResponseEntity.status(HttpStatus.CREATED).body(dokument);
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getDokument(@PathVariable Long id) {
        Dokument dokument = dokumentService.getDokument(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dokument.getDateiname() + "\"")
                .body(dokument.getDaten());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDokument(@PathVariable Long id) {
        dokumentService.deleteDokument(id);
        return ResponseEntity.noContent().build();
    }
}
