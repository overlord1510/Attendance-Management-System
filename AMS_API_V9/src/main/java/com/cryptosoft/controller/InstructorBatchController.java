package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.AssignInstructorToBatchRequest;
import com.cryptosoft.service.InstructorBatchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin/instructor-batch")
public class InstructorBatchController {

    private final InstructorBatchService instructorBatchService;

    @PostMapping("/assign")
    public ResponseEntity<String> assignInstructorToBatch(@RequestBody AssignInstructorToBatchRequest assignInstructorToBatchRequest) {
        try {
        	instructorBatchService.assignInstructorToBatch(assignInstructorToBatchRequest);
            return ResponseEntity.ok("Instructor assigned to Batch successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error assigning instructor to Batch: " + e.getMessage());
        }
    }
}