package com.cryptosoft.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.AssignInstructorToCourseRequest;
import com.cryptosoft.entity.Course;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.repository.CourseRepository;
import com.cryptosoft.repository.InstructorRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InstructorCourseService {

	private final InstructorRepository instructorRepository;
	private final CourseRepository courseRepository;

	@Transactional
	public void assignInstructorToCourses(AssignInstructorToCourseRequest assignInstructorToCourseRequest) {
		// Retrieve the Instructor
		Optional<Instructor> instructorOptional = instructorRepository
				.findById(assignInstructorToCourseRequest.getId());

		if (instructorOptional.isPresent()) {
			Instructor instructor = instructorOptional.get();

			
			List<Course> findByInstructors = courseRepository.findByInstructors(instructor);
			
			findByInstructors.forEach(course->{
				course.getInstructors().remove(instructor);
			});
			
			
			if(instructor.getCourses()==null) {
				instructor.setCourses(new ArrayList<Course>());
			}else {
				instructor.getCourses().clear();
			}
			
			// Retrieve the Courses
			List<Course> courses = courseRepository
					.findAllById(assignInstructorToCourseRequest.getCourses().stream().map(Course::getId).toList());

			// Update the relationship for each course
			courses.forEach(course -> {
				
				if(course.getInstructors()==null) {
					course.setInstructors(new ArrayList<Instructor>());
				}
				
				if (!course.getInstructors().contains(instructor)) {
					course.getInstructors().add(instructor);					
				}
					instructor.getCourses().add(course);
			});

			// Persist the changes
			courseRepository.saveAll(courses);
			instructorRepository.save(instructor);
		} else {
			throw new EntityNotFoundException("Instructor not found");
		}
	}
}