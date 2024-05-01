package com.cryptosoft.dtos;

import java.util.Date;

import com.cryptosoft.entity.Department;
import com.cryptosoft.entity.Gender;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InstructorRegisterRequest {
	
	private String name;
	private Department department;
	private Gender gender;
	private Date dob;
	private String email;
	private String password;
	
}