package com.lms.backend.service;

import com.lms.backend.model.Certificate;

import java.util.List;

public interface CertificateService {
    List<Certificate> getStudentCertificates(Long studentId);

    Certificate generateCertificate(Long studentId, Long courseId);
}
