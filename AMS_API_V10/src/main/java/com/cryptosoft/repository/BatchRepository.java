package com.cryptosoft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Department;
import com.cryptosoft.entity.Instructor;

public interface BatchRepository extends JpaRepository<Batch, Integer> {
	
	List<Batch> findByInstructors(Instructor instructor);

	List<Batch> findAllByDepartmentAndSemester(Department department, String semester);

}