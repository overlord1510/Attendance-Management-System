package com.cryptosoft.dtos;

import com.cryptosoft.entity.CourseType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseAttendance {
	private Integer id;
	private String courseName;
	private String courseCode;
	private CourseType courseType;
	private int totalDays;
	private int daysPresent;

}
