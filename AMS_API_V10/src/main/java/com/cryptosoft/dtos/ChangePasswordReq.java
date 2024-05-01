package com.cryptosoft.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChangePasswordReq {
	
	private String email;
	private Integer otp;
	private String password;
	
}
