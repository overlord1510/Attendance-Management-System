package com.cryptosoft.dtos;

import com.cryptosoft.entity.Department;

import lombok.Data;

@Data
public class PromoteGroup {

	private Department department;
	private String semester;
	private Long count;
	
	public PromoteGroup(Object[] result) {
        this.department = (Department) result[0];
        this.semester = (String) result[1];
        this.count = (Long) result[2];
    }
}
