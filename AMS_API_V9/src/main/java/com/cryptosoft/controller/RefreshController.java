package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.AuthenticationResponse;
import com.cryptosoft.service.CookieService;
import com.cryptosoft.service.RefreshTokenService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200",allowCredentials = "true")
public class RefreshController {

	private final RefreshTokenService refreshTokenService;
	private final CookieService cookieService;

	@GetMapping("/refresh")
	public ResponseEntity<?> refreshToken(@CookieValue(defaultValue = "rtoken") String rtoken,HttpServletResponse response) {

		log.info("Recieved :: " + rtoken);
		
		String jwtToken=null;
		try {
			jwtToken = refreshTokenService.getRefreshToken(rtoken,response);
		} catch (RuntimeException e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.FORBIDDEN);
		}
		return new ResponseEntity<AuthenticationResponse>(AuthenticationResponse.builder().token(jwtToken).build(),
				HttpStatus.OK);
	}
	
	@GetMapping("/remove")
	public ResponseEntity<AuthenticationResponse> removeRefreshToken(@CookieValue String rtoken,HttpServletResponse response) {

		log.info("Recieved :: " + rtoken);
		refreshTokenService.deleteRefreshUsingRefreshToken(rtoken);
		cookieService.deleteCookie(response);
		return new ResponseEntity<AuthenticationResponse>(AuthenticationResponse.builder().token(null).build(),
				HttpStatus.OK);
	}

}