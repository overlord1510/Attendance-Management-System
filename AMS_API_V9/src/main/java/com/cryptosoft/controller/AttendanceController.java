package com.cryptosoft.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.BatchesOfInstructor;
import com.cryptosoft.service.AttendanceService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/teacher")
@CrossOrigin(origins = "http://localhost:4200/", allowedHeaders = "*", allowCredentials = "true")
@RequiredArgsConstructor
public class AttendanceController {

	private final AttendanceService attendanceService;

	@GetMapping("/getAssignedBatches")
	public ResponseEntity<?> getInstructorBatches(@RequestParam("email") String email) {
		List<BatchesOfInstructor> instructorBatches=null;
		try {
			instructorBatches = attendanceService.getInstructorBatches(email);
		} catch (EntityNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<List<BatchesOfInstructor>>(instructorBatches,HttpStatus.OK);
	}

}
