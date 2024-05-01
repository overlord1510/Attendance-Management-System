package com.cryptosoft.service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cryptosoft.config.JwtUtils;
import com.cryptosoft.customExceptions.OTPExpiredException;
import com.cryptosoft.dtos.AuthenticationRequest;
import com.cryptosoft.dtos.AuthenticationResponse;
import com.cryptosoft.dtos.ChangePasswordReq;
import com.cryptosoft.dtos.ValidateOtp;
import com.cryptosoft.entity.OTP;
import com.cryptosoft.entity.RefreshToken;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.OTPRepository;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final AuthenticationManager authenticationManager;
	private final UserAuthService userAuthService;
	private final UserAuthRepository authRepository;
	private final JwtUtils jwtUtils;
	private final RefreshTokenService refreshTokenService;
	private final CookieService cookieService;
	private final OTPRepository otpRepository;
	private final PasswordEncoder passwordEncoder;
	
	public AuthenticationResponse authenticateUserAndCreateCookie(AuthenticationRequest authenticationRequest,HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getEmail(), authenticationRequest.getPassword()));
		AuthenticationResponse authResponse = null;
		if (authentication.isAuthenticated()) {
			UserAuth userAuth = userAuthService.findByEmail(authenticationRequest.getEmail());
			
			Optional<OTP> otpOfUser = otpRepository.findByUserAuth(userAuth);
			
			if (otpOfUser.isPresent()) {
				otpRepository.delete(otpOfUser.get());
			}
			
			String token = jwtUtils.generateToken(userAuth);
			
			log.info("User Id :: "+userAuth.getId());
			
			// @formatter:off
			authResponse = AuthenticationResponse
						.builder()
						.token(token)
						.email(authenticationRequest.getEmail())
						.role(userAuth.getRole().toString())
						.build();
			
			String refreshToken=UUID.randomUUID().toString();
			
			log.info("Created :: "+refreshToken);
			
			RefreshToken refreshTokenByUser = refreshTokenService.getRefreshTokenByUser(userAuth);
			
			//If refresh token is available for current user then delete and generate a new one
			if (refreshTokenByUser != null) {
				log.info("Already Present "+refreshTokenByUser.getId());
				refreshTokenService.deleteRefreshTokenById(refreshTokenByUser.getId());
			}
			
			refreshTokenService.saveRefreshToken(userAuth, refreshToken);
			
			ResponseCookie resCookie = cookieService.createCookie(refreshToken);
			response.addHeader("Set-Cookie", resCookie.toString());
			
		// @formatter:on
			
		}
		return authResponse;
	}

	@Transactional
	public UserAuth checkvalidity(ValidateOtp validateOtp) throws UsernameNotFoundException,OTPExpiredException {
		
		UserAuth userAuth = userAuthService.findByEmail(validateOtp.getEmail());

		OTP otp = otpRepository.findByOtpCode(validateOtp.getOtp()).orElseThrow(()->new RuntimeException("Invalid OTP"));
		
		if (otp.getExpirationTime().before(new Date(System.currentTimeMillis()))) {
			otpRepository.delete(otp);
			throw new OTPExpiredException("OTP Expired");
		}
		
		return userAuth;
	}

	public void changePassword(ChangePasswordReq changePasswordReq) throws UsernameNotFoundException,OTPExpiredException {
		
		OTP otp = otpRepository.findByOtpCode(changePasswordReq.getOtp()).orElseThrow(()->new RuntimeException("Invalid OTP"));

		if (otp.getExpirationTime().before(new Date(System.currentTimeMillis()))) {
			otpRepository.delete(otp);
			throw new OTPExpiredException("OTP Expired");
		}

		UserAuth userAuth = userAuthService.findByEmail(changePasswordReq.getEmail());
		
		if(otp.getUserAuth().getId()==userAuth.getId()) {
			userAuth.setPassword(passwordEncoder.encode(changePasswordReq.getPassword()));
			authRepository.save(userAuth);
		}
		
		otpRepository.delete(otp);
		
	}

}