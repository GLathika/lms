package com.lms.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "certificates")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(unique = true)
    private String certificateCode;

    private LocalDateTime issueDate;

    @PrePersist
    protected void onCreate() {
        issueDate = LocalDateTime.now();
        if (certificateCode == null) {
            certificateCode = "LMS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        }
    }
}
