package com.cryptosoft.service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.DepartmentRegisterRequest;
import com.cryptosoft.dtos.UpdateDepartment;
import com.cryptosoft.entity.Department;
import com.cryptosoft.repository.DepartmentRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DepartmentService {

	private final DepartmentRepository departmentRepository;
	
	public void saveDepartment(DepartmentRegisterRequest departmentRegisterRequest)
			throws SQLIntegrityConstraintViolationException {
		// @formatter:off
		departmentRepository.save(Department
				.builder()
					.name(departmentRegisterRequest.getName())
				.build());
		// @formatter:on

	}

	public List<Department> getAllDepartments() {
		return departmentRepository.findAll();
	}

	public long departmentCount() {
		return departmentRepository.count();
	}

	public UpdateDepartment getDepartmentById(Integer id) throws EntityNotFoundException {
		Department department = departmentRepository.getReferenceById(id);
		// @formatter:off
		return UpdateDepartment.builder()
				.id(department.getId())
				.name(department.getName())
				.build();
		// @formatter:on
	}

	public void updateDepartment(UpdateDepartment updateDepartment) throws SQLIntegrityConstraintViolationException {
		// @formatter:off
		departmentRepository.save(Department.builder()
				.id(updateDepartment.getId())
				.name(updateDepartment.getName())
				.build());
		// @formatter:on
	}

	public void deleteDepartmentById(Integer id) {
		
//		List<Instructor> instructorsByDepartment = instructorRepository.findInstructorByDepartment_Id(id);
//		
//		for (Instructor instructor : instructorsByDepartment) {
//			System.out.println(instructor.getName());
//			instructor.setDepartment(null);
//			instructorRepository.save(instructor);
//		}
		
		departmentRepository.deleteById(id);	
	}

}