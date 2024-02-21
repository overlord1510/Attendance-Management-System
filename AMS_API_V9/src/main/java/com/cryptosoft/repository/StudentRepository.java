package com.cryptosoft.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cryptosoft.entity.Student;
import com.cryptosoft.entity.UserAuth;

public interface StudentRepository extends JpaRepository<Student, Integer> {

	List<Student> findStudentByDepartment_Id(Integer id);
	
	List<Student> findAllByBatchesId(Integer batch_id);
	
	Student findByUserAuth(UserAuth userAuth);
	
	Optional<Student> findByUserAuthEmail(String email);
	
	@Query("SELECT s FROM Student s JOIN FETCH s.batches WHERE s.id = ?1")
    Optional<Student> findByIdWithBatches(Integer id);
	
	@Query("SELECT s.department, s.semester, COUNT(s) FROM Student s GROUP BY s.department, s.semester")
	List<Object[]> findStudentCountByDepartmentAndSemester();
	
	List<Student> findStudentByDepartment_IdAndSemester(Integer dept_id,String semester);

	
}