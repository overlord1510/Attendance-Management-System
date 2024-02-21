package com.cryptosoft.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Attendance;
import com.cryptosoft.entity.Student;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {

	List<Attendance> findByStudent(Student student);
	List<Attendance> findByStudentId(Integer studentId);

	List<Attendance> findAllByStudentIdIn(List<Integer> studentId);
	
}
