package com.cryptosoft.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.config.JwtUtils;
import com.cryptosoft.entity.RefreshToken;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.RefreshTokenRepository;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenService {

	private final RefreshTokenRepository refreshTokenRepository;

	private final JwtUtils jwtUtils;
	private final CookieService cookieService;

	// 3 minutes (3*60 Seconds)
	@Value(value = "${cookie.expiration_time}")
	private int EXPIRATION_TIME_COOKIE;

	public String getRefreshToken(String refreshToken, HttpServletResponse response) throws RuntimeException {
		Optional<RefreshToken> findByRefreshToken = refreshTokenRepository.findByRefreshToken(refreshToken);
		if (findByRefreshToken.isPresent()) {
			if (!findByRefreshToken.get().getExpirationDate().before(new Date())) {
				// updating the expiration time for the refresh token in repository
				findByRefreshToken.get()
						.setExpirationDate(new Date(System.currentTimeMillis() + EXPIRATION_TIME_COOKIE * 1000));
				refreshTokenRepository.save(findByRefreshToken.get());
				UserAuth userAuth = findByRefreshToken.get().getUserAuth();
				log.info("User :: " + userAuth.getEmail());
				
				// updating Refresh Cookie
				ResponseCookie resCookie = cookieService.createCookie(refreshToken);
				response.addHeader("Set-Cookie", resCookie.toString());

				return jwtUtils.generateToken(userAuth);
			} else {
				throw new RuntimeException("Refresh Token Expired");
			}
		} else {
			throw new IllegalArgumentException("RefreshToken Not found");
		}
	}

	public void saveRefreshToken(UserAuth userAuth, String refreshToken) {
		refreshTokenRepository.save(createRefreshToken(userAuth, refreshToken));
	}

	public void deleteRefreshTokenById(int id) {
		refreshTokenRepository.deleteById(id);
	}

	public void deleteRefreshUsingRefreshToken(String refreshToken) {
		refreshTokenRepository.deleteByRefreshToken(refreshToken);
	}

	public RefreshToken getRefreshTokenByUser(UserAuth userAuth) {
		Optional<RefreshToken> findByUserAuth = refreshTokenRepository.findByUserAuth(userAuth);
		if (findByUserAuth.isPresent()) {
			return findByUserAuth.get();
		} else
			return null;
	}

	private RefreshToken createRefreshToken(UserAuth userAuth, String refreshToken) {

		// @formatter:off
		return RefreshToken.builder()
				.refreshToken(refreshToken)
				.expirationDate(new Date(System.currentTimeMillis()+EXPIRATION_TIME_COOKIE*1000))
				.userAuth(userAuth)
				.build();
		// @formatter:on

	}

}