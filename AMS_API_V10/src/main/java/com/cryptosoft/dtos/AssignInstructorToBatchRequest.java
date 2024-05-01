package com.cryptosoft.dtos;

import java.util.List;

import com.cryptosoft.entity.Batch;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AssignInstructorToBatchRequest {
	
	private Integer id;
	private List<Batch> batches;

}