package com.lms.backend.service.impl;

import com.lms.backend.model.*;
import com.lms.backend.repository.*;
import com.lms.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Override
    public List<Quiz> getQuizzesForStudent(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Get enrolled courses
        List<Enrollment> enrollments = enrollmentRepository.findByStudent(student);
        List<Course> courses = enrollments.stream().map(Enrollment::getCourse).collect(Collectors.toList());

        // Get quizzes for these courses
        List<Quiz> quizzes = new ArrayList<>();
        for (Course course : courses) {
            quizzes.addAll(quizRepository.findByCourse(course));
        }

        return quizzes;
    }

    @Override
    public Quiz getQuizById(Long quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    @Override
    public QuizResult submitQuiz(Long quizId, Long studentId, Map<Long, Integer> answers) {
        Quiz quiz = getQuizById(quizId);
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        int correctCount = 0;
        for (Question question : quiz.getQuestions()) {
            Integer submittedAnswer = answers.get(question.getId());
            if (submittedAnswer != null && submittedAnswer.equals(question.getCorrectOptionIndex())) {
                correctCount++;
            }
        }

        int totalQuestions = quiz.getQuestions().size();
        int score = (totalQuestions > 0) ? (correctCount * 100) / totalQuestions : 0;
        boolean passed = score >= 60; // Pass mark 60%

        QuizResult result = QuizResult.builder()
                .student(student)
                .quiz(quiz)
                .score(score)
                .totalQuestions(totalQuestions)
                .correctAnswers(correctCount)
                .passed(passed)
                .build();

        return quizResultRepository.save(result);
    }

    @Override
    public List<QuizResult> getStudentResults(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return quizResultRepository.findByStudent(student);
    }
}
