package com.cryptosoft.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.Cookie.SameSite;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class CookieService {

	@Value(value = "${cookie.expiration_time}")
	private int EXPIRATION_TIME_COOKIE;

	public ResponseCookie createCookie(String refreshToken) {

		// @formatter:off
		ResponseCookie resCookie = ResponseCookie.from("rtoken", refreshToken)
				.httpOnly(true)
				.sameSite(SameSite.NONE.toString())
				.secure(true)
				.path("/")
				.maxAge(EXPIRATION_TIME_COOKIE)
				.build();
		// @formatter:on

		return resCookie;
	}

	public ResponseCookie deleteCookie(HttpServletResponse response) {

		// @formatter:off
		ResponseCookie resCookie = ResponseCookie.from("rtoken", null)
				.httpOnly(true)
				.sameSite(SameSite.NONE.toString())
				.secure(true)
				.path("/")
				.maxAge(0)
				.build();
		// @formatter:on
		response.addHeader("Set-Cookie", resCookie.toString());
		return resCookie;
	}
}