package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*",allowCredentials = "true")
public class InstructorBatchController {

    private final InstructorBatchService instructorBatchService;

    @PostMapping("/assign")
    public ResponseEntity<?> assignInstructorToBatch(@RequestBody AssignInstructorToBatchRequest assignInstructorToBatchRequest) {
        try {
        	instructorBatchService.assignInstructorToBatch(assignInstructorToBatchRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}