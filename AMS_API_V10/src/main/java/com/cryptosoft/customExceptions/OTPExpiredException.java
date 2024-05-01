package com.cryptosoft.customExceptions;

public class OTPExpiredException extends Exception {

	
	private static final long serialVersionUID = 1L;

	public OTPExpiredException(String message) {
		super(message);
	}
	
}
