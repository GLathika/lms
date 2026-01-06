package com.lms.backend.service;

import com.lms.backend.model.Quiz;
import com.lms.backend.model.QuizResult;
import com.lms.backend.model.User;

import java.util.List;
import java.util.Map;

public interface QuizService {
    List<Quiz> getQuizzesForStudent(Long studentId);

    Quiz getQuizById(Long quizId);

    QuizResult submitQuiz(Long quizId, Long studentId, Map<Long, Integer> answers);

    List<QuizResult> getStudentResults(Long studentId);
}
