package com.lms.backend.repository;

import com.lms.backend.model.Course;
import com.lms.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCourse(Course course);

    Optional<Quiz> findByCourseId(Long courseId);
}
