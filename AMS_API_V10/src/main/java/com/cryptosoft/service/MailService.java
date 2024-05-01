package com.cryptosoft.service;

import java.util.Date;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cryptosoft.entity.OTP;
import com.cryptosoft.entity.UserAuth;
import com.cryptosoft.repository.OTPRepository;
import com.cryptosoft.repository.UserAuthRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {

	private final JavaMailSender javaMailSender;
	private final UserAuthRepository authRepository;
	private final OTPRepository otpRepository;

	@Value("${spring.mail.username}")
	private String sender;

	@Value("${otp.expiration_time}")
	private String otpExpirationTime;

	public void sendMail(String email) throws UsernameNotFoundException, MailException {

		UserAuth userAuth = authRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email : " + email));
		
		Optional<OTP> findByUserAuth = otpRepository.findByUserAuth(userAuth);
		if (findByUserAuth.isPresent()) {
			otpRepository.delete(findByUserAuth.get());
		}

		int otp = new Random().ints(1, 100000, 999999).sum();

		// @formatter:off
		otpRepository.save(OTP.builder()
				.userAuth(userAuth)
				.otpCode(otp)
				.expirationTime(new Date(System.currentTimeMillis()+Integer.parseInt(otpExpirationTime)))
				.build());
		// @formatter:on

		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(sender);
		simpleMailMessage.setTo(email);
		simpleMailMessage.setText("Your One Time Password is :: " + otp + "\nValid for 5 minutes");
		simpleMailMessage.setSubject("OTP");
		javaMailSender.send(simpleMailMessage);

	}

}
