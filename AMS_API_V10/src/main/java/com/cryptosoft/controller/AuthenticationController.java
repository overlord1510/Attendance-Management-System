package com.cryptosoft.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.customExceptions.OTPExpiredException;
import com.cryptosoft.dtos.AuthenticationRequest;
import com.cryptosoft.dtos.AuthenticationResponse;
import com.cryptosoft.dtos.ChangePasswordReq;
import com.cryptosoft.dtos.ValidateOtp;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.service.AuthenticationService;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	@PostMapping("/authenticate")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticationRequest,
			HttpServletResponse response) {
		log.info("Entered into Authenticate Method");
		return new ResponseEntity<AuthenticationResponse>(
				authenticationService.authenticateUserAndCreateCookie(authenticationRequest, response), HttpStatus.OK);
	}

	@PostMapping("/validate-otp")
	public ResponseEntity<?> validateOTP(@RequestBody ValidateOtp validateOtp) {
		System.out.println(validateOtp);
		UserAuth userAuth = null;
		try {
			userAuth = authenticationService.checkvalidity(validateOtp);
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatusCode.valueOf(491));
		} catch (OTPExpiredException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatusCode.valueOf(492));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<UserAuth>(userAuth, HttpStatus.OK);
	}

	@PostMapping("/change-password")
	public ResponseEntity<?> changeOrUpdatePassword(@RequestBody ChangePasswordReq changePasswordReq) {
		System.out.println(changePasswordReq);
		try {
			authenticationService.changePassword(changePasswordReq);
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatusCode.valueOf(491));
		} catch (OTPExpiredException e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatusCode.valueOf(492));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatusCode.valueOf(493));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

}