package com.cryptosoft.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseRegisterRequest {

	private String courseName;
	private String courseCode;
	private String courseType;
	private String semester;
	
}