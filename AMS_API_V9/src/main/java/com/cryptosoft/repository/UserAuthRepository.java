package com.cryptosoft.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.UserAuth;

public interface UserAuthRepository extends JpaRepository<UserAuth, Integer>{

	Optional<UserAuth> findByEmail(String email);

}