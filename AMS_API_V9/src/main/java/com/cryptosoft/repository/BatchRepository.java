package com.cryptosoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cryptosoft.entity.Batch;

public interface BatchRepository extends JpaRepository<Batch, Integer> {

}