package com.cryptosoft.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cryptosoft.dtos.BatchesOfInstructor;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.InstructorRepository;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AttendanceService {

	private final InstructorRepository instructorRepository;
	private final UserAuthRepository authRepository;

	public List<BatchesOfInstructor> getInstructorBatches(String email) throws EntityNotFoundException {

		UserAuth userAuth = authRepository.findByEmail(email)
				.orElseThrow(() -> new EntityNotFoundException("Instructor not found with email :" + email));

		Instructor instructor = instructorRepository.findByUserAuth(userAuth)
				.orElseThrow(() -> new EntityNotFoundException("Instructor not found with email :" + email));
		List<BatchesOfInstructor> batchList = new ArrayList<BatchesOfInstructor>();
		instructor.getCourses().forEach((course) -> {
			instructor.getBatches().forEach((batch) -> {
				if (batch.getCourses().contains(course)) {
					// @formatter:off
					batchList.add(BatchesOfInstructor.builder()
							.batchId(batch.getId())
							.batchName(batch.getBatchName())
							.batchType(batch.getBatchType())
							.department(batch.getDepartment())
							.semester(batch.getSemester())
							.CourseId(course.getId())
							.CourseName(course.getCourseName())
							.build()); 
					// @formatter:on

				}
			});
		});
		
		System.out.println(batchList);
		return batchList;
	}

}
