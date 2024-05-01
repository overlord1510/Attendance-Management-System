package com.cryptosoft.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateCourse {

	private Integer id;
	private String courseName;
	private String courseCode;
	private String courseType;
	private String semester;
}