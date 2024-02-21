package com.cryptosoft.dtos;

import java.util.Date;
import java.util.List;

import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Department;
import com.cryptosoft.entity.Gender;
import com.cryptosoft.entity.UserAuth;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateStudent {

	private Integer id;

	private String name;

	private Department department;

	private Gender gender;

	private Date dob;

	private UserAuth userAuth;

	private String semester;
	
	private String registrationNumber;

	private String universityRoll;
	
	private List<Batch> batches;

}