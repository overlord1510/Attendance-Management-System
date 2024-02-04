package com.cryptosoft.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1/check")
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*",allowCredentials = "true")
public class CheckAuthenticationController {

	@GetMapping
	public ResponseEntity<Boolean> isAuthenticated() {
		return ResponseEntity.ok(true);
	}
	
}