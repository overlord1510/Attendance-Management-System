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

import com.cryptosoft.dtos.StudentRegisterRequest;
import com.cryptosoft.dtos.UpdateStudent;
import com.cryptosoft.entity.Student;
import com.cryptosoft.service.StudentService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class StudentController {

	private final StudentService studentService;

	@PostMapping("/saveStudent")
	public ResponseEntity<?> saveInstructor(@RequestBody StudentRegisterRequest studentRegisterRequest) {
		try {
			studentService.saveStudent(studentRegisterRequest);
		} catch (SQLIntegrityConstraintViolationException e) {
			e.printStackTrace();
			return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PatchMapping("/updateStudent")
	public ResponseEntity<?> updateInstructor(@RequestBody UpdateStudent updateStudent) {
		try {
			studentService.updatestudent(updateStudent);
		} catch (Exception e) {
			if (e instanceof DataIntegrityViolationException) {
				return new ResponseEntity<>(HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<>(HttpStatus.OK);
		
	}

	@GetMapping("/get-student-list")
	public ResponseEntity<List<Student>> getInstructorList() {
		return new ResponseEntity<List<Student>>(studentService.getAllStudent(), HttpStatus.OK);
	}

	@GetMapping("/getStudent/{id}")
	public ResponseEntity<?> getStudent(@PathVariable("id") Integer id) {
		UpdateStudent updateStudent= null;
		try {
			updateStudent = studentService.getStudentById(id);
		} catch (EntityNotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<UpdateStudent>(updateStudent, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteStudent/{id}")
	public ResponseEntity<?> deleteStudent(@PathVariable("id") Integer id) {
		try {
			studentService.deleteStudent(id);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/studentCount")
	public ResponseEntity<Long> studentCount() {
		return new ResponseEntity<Long>(studentService.studentCount(), HttpStatus.OK);
	}

}