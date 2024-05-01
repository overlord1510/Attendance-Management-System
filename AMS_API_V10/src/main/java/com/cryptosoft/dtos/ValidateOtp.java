package com.cryptosoft.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ValidateOtp {

	private String email;
	private Integer otp;
	
}
