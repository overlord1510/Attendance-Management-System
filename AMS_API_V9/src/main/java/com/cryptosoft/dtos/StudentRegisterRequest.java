package com.cryptosoft.dtos;

import java.util.Date;
import java.util.List;

import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Department;
import com.cryptosoft.entity.Gender;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentRegisterRequest {

	private String name;
	private Gender gender;
	private Date dob;
	private String email;
	private String password;
	private String semester;
	private String registrationNumber;
	private String universityRoll;
	private Department department;
	private List<Batch> batches;

}