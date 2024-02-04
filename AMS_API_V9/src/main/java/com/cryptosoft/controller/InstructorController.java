package com.cryptosoft.controller;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.InstructorRegisterRequest;
import com.cryptosoft.dtos.UpdateInstructor;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.service.InstructorService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class InstructorController {

	private final InstructorService instructorService;

	@PostMapping("/saveInstructor")
	public ResponseEntity<?> saveInstructor(@RequestBody InstructorRegisterRequest instructorRegisterRequest) {
		try {
			instructorService.saveInstructor(instructorRegisterRequest);
		} catch (SQLIntegrityConstraintViolationException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PatchMapping("/updateInstructor")
	public ResponseEntity<?> updateInstructor(@RequestBody UpdateInstructor updateInstructor) {
		try {
			instructorService.updateInstructor(updateInstructor);
		} catch (Exception e) {
			if (e instanceof DataIntegrityViolationException) {
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

	@GetMapping("/get-instructor-list")
	public ResponseEntity<List<Instructor>> getInstructorList() {
		return new ResponseEntity<List<Instructor>>(instructorService.getAllInstructor(), HttpStatus.OK);
	}

	@GetMapping("/getInstructor/{id}")
	public ResponseEntity<?> getInstructor(@PathVariable("id") Integer id) {
		UpdateInstructor updateInstructor = null;
		try {
			updateInstructor = instructorService.getInstructorById(id);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<UpdateInstructor>(updateInstructor, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteInstructor/{id}")
	public ResponseEntity<?> deleteInstructor(@PathVariable("id") Integer id) {
		try {
			instructorService.deleteInstructor(id);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/instructorCount")
	public ResponseEntity<Long> instructorCount() {
		return new ResponseEntity<Long>(instructorService.instructorCount(), HttpStatus.OK);
	}

}