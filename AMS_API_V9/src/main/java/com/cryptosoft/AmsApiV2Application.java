package com.cryptosoft;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.cryptosoft.entity.Role;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.UserAuthRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@SpringBootApplication
@RequiredArgsConstructor
public class AmsApiV2Application {
	
	private final UserAuthRepository userAuthRepository;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(AmsApiV2Application.class, args);
	}
	
	@PostConstruct
	public void createAdmin() {
		
		if (userAuthRepository.findByEmail("admin@cryptosoft.com").isEmpty()) {
			// @formatter:off
			UserAuth admin = UserAuth.builder()
					.email("admin@cryptosoft.com")
					.password(passwordEncoder.encode("admin123"))
					.role(Role.ADMIN)
					.build();
			// @formatter:on
			userAuthRepository.save(admin);
		}
		
	}
	@PostConstruct
	public void createTeacher() {
		
		if (userAuthRepository.findByEmail("teacher@cryptosoft.com").isEmpty()) {
			// @formatter:off
			UserAuth teacher = UserAuth.builder()
					.email("teacher@cryptosoft.com")
					.password(passwordEncoder.encode("teacher123"))
					.role(Role.INSTRUCTOR)
					.build();
			// @formatter:on
			userAuthRepository.save(teacher);
		}
		
	}
	@PostConstruct
	public void createStudent() {
		
		if (userAuthRepository.findByEmail("student@cryptosoft.com").isEmpty()) {
			// @formatter:off
			UserAuth student = UserAuth.builder()
					.email("student@cryptosoft.com")
					.password(passwordEncoder.encode("student123"))
					.role(Role.STUDENT)
					.build();
			// @formatter:on
			userAuthRepository.save(student);
		}
		
	}
	
}
