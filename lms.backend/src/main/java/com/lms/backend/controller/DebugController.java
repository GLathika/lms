package com.lms.backend.controller;

import com.lms.backend.repository.CategoryRepository;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/debug")
public class DebugController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/status")
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("userCount", userRepository.count());
        status.put("courseCount", courseRepository.count());
        status.put("categoryCount", categoryRepository.count());
        status.put("instructorExists", userRepository.existsByEmail("rahul.ins@lms.com"));

        // Check if courses for Rahul exist
        userRepository.findByEmail("rahul.ins@lms.com").ifPresent(instructor -> {
            status.put("rahulCourseCount", courseRepository.findByInstructor(instructor).size());
            status.put("rahulId", instructor.getId());
        });

        return status;
    }
}
