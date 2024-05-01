package com.cryptosoft.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateDepartment {

	private Integer id;
	private String name;

}