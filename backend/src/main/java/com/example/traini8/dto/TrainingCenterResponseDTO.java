package com.example.traini8.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingCenterResponseDTO {
    private Long id;
    private String centerName;
    private String centerCode;
    private AddressDTO address;
    private Integer studentCapacity;
    private List<String> coursesOffered;
    private Long createdOn;
    private String contactEmail;
    private String contactPhone;
}