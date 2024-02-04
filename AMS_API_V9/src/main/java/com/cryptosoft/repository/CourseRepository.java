package com.cryptosoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Course;

import jakarta.persistence.EntityNotFoundException;

public interface CourseRepository extends JpaRepository<Course, Integer> {

	public void deleteCourseById(Integer id) throws EntityNotFoundException;
	
}