package com.cryptosoft.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.InstructorRegisterRequest;
import com.cryptosoft.dtos.UpdateInstructor;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.entity.Role;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.InstructorRepository;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class InstructorService {

	private final InstructorRepository instructorRepository;
	private final UserAuthRepository authRepository;
	private final PasswordEncoder passwordEncoder;

	public void saveInstructor(InstructorRegisterRequest instructorRegisterRequest)
			throws SQLIntegrityConstraintViolationException {

		// @formatter:off
		UserAuth user = UserAuth.builder()
		.email(instructorRegisterRequest.getEmail())
		.password(passwordEncoder.encode(instructorRegisterRequest.getPassword()))
		.role(Role.INSTRUCTOR)
		.build();
		
		UserAuth savedUser = authRepository.save(user);
		
		Instructor instructor = Instructor.builder()
		.name(instructorRegisterRequest.getName())
		.userAuth(savedUser)
		.dob(instructorRegisterRequest.getDob())
		.gender(instructorRegisterRequest.getGender())
		.department(instructorRegisterRequest.getDepartment())
		.build();
		// @formatter:on
		instructorRepository.save(instructor);

	}

	public List<Instructor> getAllInstructor() {
		return instructorRepository.findAll();
	}

	public long instructorCount() {
		return instructorRepository.count();
	}

	public UpdateInstructor getInstructorById(Integer id) throws EntityNotFoundException {
		Instructor instructor = instructorRepository.getReferenceById(id);
		System.out.println(instructor.getBatches());
		// @formatter:off
		return UpdateInstructor.builder()
				.id(instructor.getId())
				.name(instructor.getName())
				.department(instructor.getDepartment())
				.gender(instructor.getGender())
				.userAuth(instructor.getUserAuth())
				.dob(instructor.getDob())
				.courses(instructor.getCourses())
				.batches(instructor.getBatches())
				.build();
		// @formatter:on

	}

	public void updateInstructor(UpdateInstructor updateInstructor) {
		// @formatter:off
		
		Instructor instructor = instructorRepository.findById(updateInstructor.getId()).orElseThrow(()-> new EntityNotFoundException("Instructor not found with id"+updateInstructor.getId()));
		
		instructor.setName(updateInstructor.getName());
	    instructor.setDepartment(updateInstructor.getDepartment());
	    instructor.setGender(updateInstructor.getGender());
	    instructor.setDob(updateInstructor.getDob());
	    instructor.getUserAuth().setEmail(updateInstructor.getUserAuth().getEmail());
	    instructor.getUserAuth().setRole(updateInstructor.getUserAuth().getRole());
	    instructor.setCourses(updateInstructor.getCourses());
		instructor.setBatches(updateInstructor.getBatches());
	    instructorRepository.save(instructor);
		// @formatter:on

	}

	public void deleteInstructor(Integer id) {
		Instructor instructor = instructorRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Instructor not Found"));

		instructor.getCourses().forEach(course -> course.getInstructors().remove(instructor));
		instructor.getBatches().forEach(batch -> batch.getInstructors().remove(instructor));
		instructorRepository.delete(instructor);
	}

	
}