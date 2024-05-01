package com.cryptosoft.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.UserAuthRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserAuthService {

	private final UserAuthRepository userAuthRepository;

	public UserAuth findByEmail(String email) throws UsernameNotFoundException {
		return userAuthRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
	}

}