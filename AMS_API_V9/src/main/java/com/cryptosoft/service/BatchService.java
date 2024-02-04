package com.cryptosoft.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.BatchRegisterRequest;
import com.cryptosoft.dtos.UpdateBatch;
import com.cryptosoft.entity.Batch;
import com.cryptosoft.repository.BatchRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BatchService {

	private final BatchRepository batchRepository;

	@Transactional
	public Batch saveBatch(BatchRegisterRequest batchRegisterRequest) {
		// @formatter:off
		return batchRepository.save(Batch.builder()
				.batchName(batchRegisterRequest.getBatchName())
				.batchType(batchRegisterRequest.getBatchType())
				.department(batchRegisterRequest.getDepartment())
				.semester(batchRegisterRequest.getSemester())
				.courses(batchRegisterRequest.getCourses())
				.build());
		// @formatter:on
	}

	@Transactional
	public Batch updateBatch(UpdateBatch updatedBatch) {
		Batch existingBatch = getBatchById(updatedBatch.getId());
		existingBatch.setBatchName(updatedBatch.getBatchName());
		existingBatch.setDepartment(updatedBatch.getDepartment());
		existingBatch.setSemester(updatedBatch.getSemester());
		existingBatch.setBatchType(updatedBatch.getBatchType());
		existingBatch.setCourses(updatedBatch.getCourses());
		return batchRepository.save(existingBatch);
	}

	@Transactional
	public void deleteBatch(int batchId) {
		Batch batch = getBatchById(batchId);
		batchRepository.delete(batch);
	}

	@Transactional(readOnly = true)
	public List<Batch> getAllBatches() {
		return batchRepository.findAll();
	}

	@Transactional(readOnly = true)
	public Batch getBatchById(int batchId) {
		return batchRepository.findById(batchId)
				.orElseThrow(() -> new EntityNotFoundException("Batch not found with ID: " + batchId));
	}

	public Long getBatchCount() {
		return batchRepository.count();
	}
}