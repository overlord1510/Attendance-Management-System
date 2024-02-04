package com.cryptosoft.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cryptosoft.dtos.BatchRegisterRequest;
import com.cryptosoft.dtos.UpdateBatch;
import com.cryptosoft.entity.Batch;
import com.cryptosoft.service.BatchService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200",allowedHeaders = "*",allowCredentials = "true")
public class BatchController {
	
	private final BatchService batchService;
	
	@PostMapping("/saveBatch")
    public ResponseEntity<Batch> saveBatch(@RequestBody BatchRegisterRequest batchRegisterRequest) {
		System.out.println(batchRegisterRequest);
        Batch savedBatch = batchService.saveBatch(batchRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBatch);
    }

    @PatchMapping("/updateBatch")
    public ResponseEntity<Batch> updateBatch(@RequestBody UpdateBatch updatedBatch) {
    	
        Batch updated = batchService.updateBatch(updatedBatch);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/deleteBatch/{batchId}")
    public ResponseEntity<?> deleteBatch(@PathVariable int batchId) {
        batchService.deleteBatch(batchId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-batch-list")
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batches = batchService.getAllBatches();
        return ResponseEntity.ok(batches);
    }

    @GetMapping("/getBatch/{batchId}")
    public ResponseEntity<Batch> getBatchById(@PathVariable int batchId) {
        Batch batch = batchService.getBatchById(batchId);
        return ResponseEntity.ok(batch);
    }
	
    @GetMapping("/batchCount")
    public ResponseEntity<Long> getBatchCount(){
    	return new ResponseEntity<Long>(batchService.getBatchCount(),HttpStatus.OK);
    }
}