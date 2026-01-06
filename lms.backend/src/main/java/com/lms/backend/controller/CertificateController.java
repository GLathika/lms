package com.lms.backend.controller;

import com.lms.backend.model.Certificate;
import com.lms.backend.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    // Get student's certificates
    @GetMapping("/student/{studentId}/certificates")
    public List<Certificate> getStudentCertificates(@PathVariable Long studentId) {
        return certificateService.getStudentCertificates(studentId);
    }

    // Generate certificate
    @PostMapping("/student/{studentId}/certificates/generate")
    public ResponseEntity<?> generateCertificate(
            @PathVariable Long studentId,
            @RequestParam Long courseId) {
        try {
            Certificate certificate = certificateService.generateCertificate(studentId, courseId);
            return ResponseEntity.ok(certificate);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
