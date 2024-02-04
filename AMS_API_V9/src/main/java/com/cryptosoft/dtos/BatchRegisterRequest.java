package com.cryptosoft.dtos;

import java.util.List;

import com.cryptosoft.entity.BatchType;
import com.cryptosoft.entity.Course;
import com.cryptosoft.entity.Department;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BatchRegisterRequest {

	    private String batchName;
	    private Department department;
	    private String semester;
	    private BatchType batchType;
	    private List<Course> courses;

}