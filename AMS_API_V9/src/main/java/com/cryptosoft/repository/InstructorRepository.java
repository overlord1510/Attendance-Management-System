package com.cryptosoft.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Instructor;
import com.cryptosoft.entity.UserAuth;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

	List<Instructor> findInstructorByDepartment_Id(Integer id);
	
	Optional<Instructor> findByUserAuth(UserAuth userAuth);

}