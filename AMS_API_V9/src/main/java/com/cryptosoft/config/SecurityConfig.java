package com.cryptosoft.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cryptosoft.customExceptions.Http401UnAuthorizedEntryPoint;
import com.cryptosoft.entity.Role;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthFilter authFilter;
	private final AuthenticationProvider authenticationProvider;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		// @formatter:off
        http
        		.csrf(csrf->
        			csrf
        				.disable())
                .authorizeHttpRequests(authorize ->
                        authorize
                        		.requestMatchers("/api/v1/auth/**").permitAll()
                        		.requestMatchers("/api/v1/admin/saveStudent","/api/v1/admin/getAllDepartment",
                        				"/api/v1/admin/get-batch-list").permitAll()
                        		.requestMatchers("/api/v1/student/**").hasAuthority(Role.STUDENT.toString())
                        		.requestMatchers("/api/v1/teacher/**").hasAuthority(Role.INSTRUCTOR.toString())
                        		.requestMatchers("/api/v1/admin/**").hasAuthority(Role.ADMIN.toString())
                                .anyRequest().authenticated()
                )
                .sessionManagement((mngmt)->
                		mngmt
                				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                		)
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(excpt->
                		excpt
                				.authenticationEntryPoint(new Http401UnAuthorizedEntryPoint())
                		);
		// @formatter:on

		return http.build();
	}

}