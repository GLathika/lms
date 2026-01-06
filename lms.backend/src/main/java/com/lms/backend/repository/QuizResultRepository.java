package com.lms.backend.repository;

import com.lms.backend.model.QuizResult;
import com.lms.backend.model.User;
import com.lms.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
    List<QuizResult> findByStudent(User student);

    Optional<QuizResult> findByStudentAndQuiz(User student, Quiz quiz);
}
