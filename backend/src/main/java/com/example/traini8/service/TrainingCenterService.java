package com.example.traini8.service;

import com.example.traini8.dto.TrainingCenterRequestDTO;
import com.example.traini8.dto.TrainingCenterResponseDTO;
import com.example.traini8.exception.DuplicateCenterCodeException;
import com.example.traini8.mapper.TrainingCenterMapper;
import com.example.traini8.model.TrainingCenter;
import com.example.traini8.repository.TrainingCenterRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Validated
public class TrainingCenterService {

    private final TrainingCenterRepository repository;
    private final TrainingCenterMapper mapper;

    @Autowired
    public TrainingCenterService(TrainingCenterRepository repository, TrainingCenterMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public TrainingCenterResponseDTO createTrainingCenter(@Valid TrainingCenterRequestDTO requestDTO) {
        if (repository.existsByCenterCode(requestDTO.getCenterCode())) {
            throw new DuplicateCenterCodeException("Training center with code " + requestDTO.getCenterCode() + " already exists");
        }

        TrainingCenter center = mapper.toEntity(requestDTO);
        TrainingCenter savedCenter = repository.save(center);
        return mapper.toDto(savedCenter);
    }

    public List<TrainingCenterResponseDTO> getAllTrainingCenters(
        String city, 
        String state, 
        Integer minCapacity, 
        String course) {
    List<TrainingCenter> centers;
    
    if (city == null && state == null && minCapacity == null && course == null) {
        centers = repository.findAll();
    } else {
        centers = repository.findWithFilters(city, state, minCapacity, course);
    }
    
    return centers.stream()
            .map(mapper::toDto)
            .collect(Collectors.toList());
}
}
