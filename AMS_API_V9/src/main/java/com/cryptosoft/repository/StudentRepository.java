package com.cryptosoft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Integer> {

	List<Student> findStudentByDepartment_Id(Integer id);

}