package com.cryptosoft.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cryptosoft.dtos.AssignInstructorToBatchRequest;
import com.cryptosoft.entity.Batch;
import com.cryptosoft.entity.Instructor;
import com.cryptosoft.repository.BatchRepository;
import com.cryptosoft.repository.InstructorRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InstructorBatchService {

	private final InstructorRepository instructorRepository;
	private final BatchRepository batchRepository;

	@Transactional
	public void assignInstructorToBatch(AssignInstructorToBatchRequest assignInstructorToBatchRequest) {
		// Retrieve the Instructor
		Optional<Instructor> instructorOptional = instructorRepository
				.findById(assignInstructorToBatchRequest.getId());

		if (instructorOptional.isPresent()) {
			Instructor instructor = instructorOptional.get();

			// Retrieve the Courses
			List<Batch> batches = batchRepository
					.findAllById(assignInstructorToBatchRequest.getBatches().stream().map(Batch::getId).toList());

			// Update the relationship for each course
			batches.forEach(batch -> {
				if (!batch.getInstructors().contains(instructor)) {
					batch.getInstructors().add(instructor);					
				}
				if (!instructor.getBatches().contains(batch)) {
					instructor.getBatches().add(batch);
				}
			});

			// Persist the changes
			batchRepository.saveAll(batches);
			instructorRepository.save(instructor);
		} else {
			throw new EntityNotFoundException("Instructor not found");
		}
	}
}