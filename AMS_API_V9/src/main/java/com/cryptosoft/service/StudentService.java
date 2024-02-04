package com.cryptosoft.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.StudentRegisterRequest;
import com.cryptosoft.dtos.UpdateStudent;
import com.cryptosoft.entity.Role;
import com.cryptosoft.entity.Student;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.StudentRepository;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class StudentService {

	private final StudentRepository studentRepository;
	private final UserAuthRepository authRepository;
	private final PasswordEncoder passwordEncoder;

	public void saveStudent(StudentRegisterRequest studentRegisterRequest)
			throws SQLIntegrityConstraintViolationException {


		// @formatter:off
		UserAuth user = authRepository.save(UserAuth.builder()
				.email(studentRegisterRequest.getEmail())
				.password(passwordEncoder.encode(studentRegisterRequest.getPassword()))
				.role(Role.STUDENT)
				.build());
		
		Student student = Student.builder()
		.name(studentRegisterRequest.getName())
		.userAuth(user)
		.semester(studentRegisterRequest.getSemester())
		.dob(studentRegisterRequest.getDob())
		.gender(studentRegisterRequest.getGender())
		.department(studentRegisterRequest.getDepartment())
		.registrationNumber(studentRegisterRequest.getRegistrationNumber())
		.universityRoll(studentRegisterRequest.getUniversityRoll())
		.build();
		// @formatter:on
		studentRepository.save(student);

	}

	public List<Student> getAllStudent() {
		return studentRepository.findAll();
	}

	public long studentCount() {
		return studentRepository.count();
	}

	public UpdateStudent getStudentById(Integer id) throws EntityNotFoundException {
		Student student = studentRepository.getReferenceById(id);
		// @formatter:off
		return UpdateStudent.builder()
				.id(student.getId())
				.name(student.getName())
				.department(student.getDepartment())
				.gender(student.getGender())
				.userAuth(student.getUserAuth())
				.semester(student.getSemester())
				.dob(student.getDob())
				.registrationNumber(student.getRegistrationNumber())
				.universityRoll(student.getUniversityRoll())
				.build();
		// @formatter:on

	}

	public void updatestudent(UpdateStudent updateStudent) {
		// @formatter:off
		studentRepository.save(Student.builder()
				.id(updateStudent.getId())
				.name(updateStudent.getName())
				.userAuth(updateStudent.getUserAuth())
				.semester(updateStudent.getSemester())
				.gender(updateStudent.getGender())
				.department(updateStudent.getDepartment())
				.dob(updateStudent.getDob())
				.registrationNumber(updateStudent.getRegistrationNumber())
				.universityRoll(updateStudent.getUniversityRoll())
				.build());
		// @formatter:on

	}

	public void deleteStudent(Integer id) {
		studentRepository.deleteById(id);
	}

}