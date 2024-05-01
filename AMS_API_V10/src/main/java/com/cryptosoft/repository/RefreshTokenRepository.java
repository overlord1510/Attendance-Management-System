package com.cryptosoft.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.RefreshToken;
import com.cryptosoft.entity.UserAuth;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
	
	Optional<RefreshToken> findByRefreshToken(String refreshToken);
	
	Optional<RefreshToken> findByUserAuth(UserAuth userAuth);
	
	void deleteByRefreshToken(String refreshToken);
	
}