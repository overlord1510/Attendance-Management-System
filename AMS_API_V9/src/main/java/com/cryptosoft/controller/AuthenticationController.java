package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.AuthenticationRequest;
import com.cryptosoft.dtos.AuthenticationResponse;
import com.cryptosoft.service.AuthenticationService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*",allowCredentials = "true")
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		log.info("Entered into Authenticate Method");
		return new ResponseEntity<AuthenticationResponse>(authenticationService.authenticateUserAndCreateCookie(authenticationRequest,response), HttpStatus.OK);
	}

	@GetMapping("/register")
	public ResponseEntity<String> register(HttpServletRequest request) {
		Cookie[] cookies = request.getCookies();
		System.out.println(cookies);
		return new ResponseEntity<String>("Working", HttpStatus.OK);
	}

}