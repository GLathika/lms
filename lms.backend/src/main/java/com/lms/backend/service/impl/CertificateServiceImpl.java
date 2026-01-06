package com.lms.backend.service.impl;

import com.lms.backend.model.*;
import com.lms.backend.repository.*;
import com.lms.backend.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificateServiceImpl implements CertificateService {

    @Autowired
    private CertificateRepository certificateRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Certificate> getStudentCertificates(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return certificateRepository.findByStudent(student);
    }

    @Override
    public Certificate generateCertificate(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Check if certificate already exists
        if (certificateRepository.findByStudentAndCourse(student, course).isPresent()) {
            return certificateRepository.findByStudentAndCourse(student, course).get();
        }

        // Check eligibility (Progress 100%)
        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new RuntimeException("Not enrolled in this course"));

        if (enrollment.getProgress() < 100.0) {
            throw new RuntimeException("Course not completed yet. Progress: " + enrollment.getProgress() + "%");
        }

        Certificate certificate = Certificate.builder()
                .student(student)
                .course(course)
                .build();

        return certificateRepository.save(certificate);
    }
}
