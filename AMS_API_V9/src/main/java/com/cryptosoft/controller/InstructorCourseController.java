package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.AssignInstructorToCourseRequest;
import com.cryptosoft.service.InstructorCourseService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/instructor-course")
public class InstructorCourseController {

    private final InstructorCourseService instructorCourseService;

    @PostMapping("/assign")
    public ResponseEntity<String> assignInstructorToCourse(@RequestBody AssignInstructorToCourseRequest assignInstructorToCourseRequest) {
        try {
            instructorCourseService.assignInstructorToCourses(assignInstructorToCourseRequest);
            return ResponseEntity.ok("Instructor assigned to course successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning instructor to course: " + e.getMessage());
        }
    }
}