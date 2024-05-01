package com.cryptosoft.dtos;

import java.util.List;

import com.cryptosoft.entity.Course;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AssignInstructorToCourseRequest {
	
	private Integer id;
	private List<Course> courses;

}