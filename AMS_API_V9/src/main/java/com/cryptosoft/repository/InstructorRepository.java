package com.cryptosoft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Instructor;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

	List<Instructor> findInstructorByDepartment_Id(Integer id);

}