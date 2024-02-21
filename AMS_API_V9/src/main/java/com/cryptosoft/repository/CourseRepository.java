package com.cryptosoft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Course;
import com.cryptosoft.entity.Instructor;

import jakarta.persistence.EntityNotFoundException;

public interface CourseRepository extends JpaRepository<Course, Integer> {

	public void deleteCourseById(Integer id) throws EntityNotFoundException;
	
	List<Course> findByInstructors(Instructor instructor);
	
	
}