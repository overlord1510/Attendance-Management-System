package com.cryptosoft.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.cryptosoft.entity.UserAuth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

	//5 Minutes Expiration
	@Value("${jwt_token.expiration_time}")
	private long EXPIRATION_TIME;
	
	@Value("${jwt.signing.secret}")
	private String SECRET;
	
	public String extractUsername(String jwtToken) {
		return extractClaims(jwtToken,Claims::getSubject);
	}

	private <T> T extractClaims(String jwtToken, Function<Claims, T> claimsResolver) {
		final Claims claims=extractAllClaims(jwtToken);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String jwtToken) {
	// @formatter:off
		return Jwts
				.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(jwtToken)
				.getPayload();
	// @formatter:on
	}

	private SecretKey getSigningKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public boolean isTokenValid(String jwtToken, UserDetails user) {
		final String username=extractUsername(jwtToken);
		return (username.equals(user.getUsername())&& !isTokenExpired(jwtToken));
	}

	private boolean isTokenExpired(String jwtToken) {
		return extractExpiration(jwtToken).before(new Date());
	}

	private Date extractExpiration(String jwtToken) {
		return extractClaims(jwtToken, Claims::getExpiration);
	}

	public String generateToken(UserAuth userAuth) {
		return generateToken(new HashMap<>(),userAuth);
	}
	public String generateToken(Map<String, Object> extraClaims,UserAuth userAuth) {
	// @formatter:off
		return Jwts
				.builder()
				.claims(extraClaims)
				.subject(userAuth.getEmail())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis()+EXPIRATION_TIME))
				.signWith(getSigningKey(),Jwts.SIG.HS512)
				.compact();
	// @formatter:on

	}
	
	

}