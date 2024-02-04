package com.cryptosoft.entity;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "student")
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 35, nullable = false)
	private String name;

	@Column(nullable = false)
	private Gender gender;

	@Column(nullable = false)
	private Date dob;

	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private UserAuth userAuth;
	
	@Column(name="semester",nullable = false)
	private String semester;

	@Column(length = 100, nullable = false, unique = true)
	private String registrationNumber;

	@Column(length = 100, nullable = false, unique = true)
	private String universityRoll;

	@ManyToOne
	@JoinColumn(name = "department_id", referencedColumnName = "id")
	private Department department;

	@ManyToMany
	@JoinTable(name = "student_batches", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "batch_id"))
	private List<Batch> batches;


}