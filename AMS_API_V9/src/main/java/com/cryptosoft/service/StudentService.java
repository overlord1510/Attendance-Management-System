package com.cryptosoft.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.StudentRegisterRequest;
import com.cryptosoft.dtos.UpdateStudent;
import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Role;
import com.cryptosoft.entity.Student;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.BatchRepository;
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
	private final BatchRepository batchRepository;

	public Student saveStudent(StudentRegisterRequest studentRegisterRequest)
			throws SQLIntegrityConstraintViolationException {

		// @formatter:off
		UserAuth user = authRepository.save(UserAuth.builder()
				.email(studentRegisterRequest.getEmail())
				.password(passwordEncoder.encode(studentRegisterRequest.getPassword()))
				.role(Role.STUDENT)
				.build());
		UserAuth savedUser = authRepository.save(user);
		
		Student student = Student.builder()
		.name(studentRegisterRequest.getName())
		.userAuth(savedUser)
		.semester(studentRegisterRequest.getSemester())
		.dob(studentRegisterRequest.getDob())
		.gender(studentRegisterRequest.getGender())
		.department(studentRegisterRequest.getDepartment())
		.registrationNumber(studentRegisterRequest.getRegistrationNumber())
		.universityRoll(studentRegisterRequest.getUniversityRoll())
		.build();
		// @formatter:on
		 Student savedStudent = studentRepository.save(student);
		 System.out.println(studentRegisterRequest.getBatches());
		 assignBatchToStudent(savedStudent, studentRegisterRequest.getBatches());
		 return savedStudent;
	}

	public void assignBatchToStudent(Student student, List<Batch> batches) {
	    if (student != null) {
	        Optional<Student> studentOptional = studentRepository.findById(student.getId());

	        if (studentOptional.isPresent()) {
	            Student student2 = studentOptional.get();

	            // Ensure that the student's batches list is initialized
	            if (student2.getBatches() == null) {
	                student2.setBatches(new ArrayList<>());
	            }

	            // Retrieve and ensure initialization of batch objects
	            List<Batch> batchesList = batchRepository.findAllById(batches.stream().map(Batch::getId).toList());

	            batchesList.forEach(batch -> {
	                // Ensure that the batch's students list is initialized
	                if (batch.getStudents() == null) {
	                    batch.setStudents(new ArrayList<>());
	                }

	                // Update relationship bidirectionally
	                if (!batch.getStudents().contains(student2)) {
	                    batch.getStudents().add(student2);
	                }
	                if (!student2.getBatches().contains(batch)) {
	                    student2.getBatches().add(batch);
	                }
	            });

	            // Persist the changes
	            batchRepository.saveAll(batchesList);
	            studentRepository.save(student2);
	        } else {
	            throw new EntityNotFoundException("Student not found");
	        }
	    } else {
	        throw new IllegalArgumentException("Student cannot be null");
	    }
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
	    Student student = studentRepository.findById(id)
	                                      .orElseThrow(() -> new EntityNotFoundException("Student not found"));

	    System.out.println(id);
	    System.out.println(student.getBatches());
	    
	    // Remove references from batches
	  student.getBatches().forEach(batch->batch.getStudents().remove(student));

	    studentRepository.delete(student);
	}


	public List<Student> findStudentbyBatchId(Integer batchId) {
		return studentRepository.findAllByBatchesId(batchId);
	}

}