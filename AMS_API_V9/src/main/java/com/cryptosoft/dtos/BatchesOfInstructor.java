package com.cryptosoft.dtos;

import com.cryptosoft.entity.BatchType;
import com.cryptosoft.entity.Department;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchesOfInstructor {

	private Integer batchId;
	private String batchName;
	private BatchType batchType;
	private Department department;
	private String semester;
	
	private Integer CourseId;
	private String CourseName;
}
