package com.lms.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private User student;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Integer score; // Percentage or absolute? Let's say Percentage 0-100
    private Integer totalQuestions;
    private Integer correctAnswers;

    private boolean passed;
    private LocalDateTime attemptDate;

    @PrePersist
    protected void onCreate() {
        attemptDate = LocalDateTime.now();
    }
}
