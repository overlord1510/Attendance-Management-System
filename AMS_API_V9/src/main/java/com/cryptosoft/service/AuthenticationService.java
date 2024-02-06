package com.cryptosoft.service;

import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.cryptosoft.config.JwtUtils;
import com.cryptosoft.dtos.AuthenticationRequest;
import com.cryptosoft.dtos.AuthenticationResponse;
import com.cryptosoft.entity.RefreshToken;
import com.cryptosoft.entity.UserAuth;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationService {
	
	private final AuthenticationManager authenticationManager;
	private final UserAuthService userAuthService;
	private final JwtUtils jwtUtils;
	private final RefreshTokenService refreshTokenService;
	private final CookieService cookieService;
	
	public AuthenticationResponse authenticateUserAndCreateCookie(AuthenticationRequest authenticationRequest,HttpServletResponse response) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				authenticationRequest.getEmail(), authenticationRequest.getPassword()));
		AuthenticationResponse authResponse = null;
		if (authentication.isAuthenticated()) {
			UserAuth userAuth = userAuthService.findByEmail(authenticationRequest.getEmail());
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

}