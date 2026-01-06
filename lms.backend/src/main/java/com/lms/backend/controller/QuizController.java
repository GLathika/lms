package com.lms.backend.controller;

import com.lms.backend.model.Quiz;
import com.lms.backend.model.QuizResult;
import com.lms.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow frontend access
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Get quizzes available for a student (based on enrolled courses)
    @GetMapping("/student/{studentId}/quizzes")
    public List<Quiz> getStudentQuizzes(@PathVariable Long studentId) {
        return quizService.getQuizzesForStudent(studentId);
    }

    // Get specific quiz details
    @GetMapping("/quizzes/{quizId}")
    public Quiz getQuiz(@PathVariable Long quizId) {
        return quizService.getQuizById(quizId);
    }

    // Submit quiz answers
    @PostMapping("/quizzes/{quizId}/submit")
    public ResponseEntity<QuizResult> submitQuiz(
            @PathVariable Long quizId,
            @RequestParam Long studentId,
            @RequestBody Map<Long, Integer> answers) { // QuestionID -> OptionIndex

        QuizResult result = quizService.submitQuiz(quizId, studentId, answers);
        return ResponseEntity.ok(result);
    }

    // Get student's past results
    @GetMapping("/student/{studentId}/quiz-results")
    public List<QuizResult> getStudentResults(@PathVariable Long studentId) {
        return quizService.getStudentResults(studentId);
    }
}
