package com.example.traini8.controller;

import com.example.traini8.dto.TrainingCenterRequestDTO;
import com.example.traini8.dto.TrainingCenterResponseDTO;
import com.example.traini8.service.TrainingCenterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/training-centers")
public class TrainingCenterController {

    private final TrainingCenterService service;

    @Autowired
    public TrainingCenterController(TrainingCenterService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<TrainingCenterResponseDTO> createTrainingCenter(
            @Valid @RequestBody TrainingCenterRequestDTO requestDTO) {
        TrainingCenterResponseDTO savedCenter = service.createTrainingCenter(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCenter);
    }

    @GetMapping
public ResponseEntity<List<TrainingCenterResponseDTO>> getAllTrainingCenters(
        @RequestParam(required = false) String city,
        @RequestParam(required = false) String state,
        @RequestParam(required = false) Integer minCapacity,
        @RequestParam(required = false) String course) {
    List<TrainingCenterResponseDTO> centers = service.getAllTrainingCenters(city, state, minCapacity, course);
    return ResponseEntity.ok(centers);
}
}

