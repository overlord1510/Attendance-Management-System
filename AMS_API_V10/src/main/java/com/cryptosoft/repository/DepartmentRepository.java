package com.cryptosoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Integer> {

}
