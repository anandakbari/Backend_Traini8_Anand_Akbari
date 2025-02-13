package com.example.traini8.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TrainingCenterRequestDTO {
    @NotBlank(message = "Center name is required")
    @Size(max = 40, message = "Center name must be less than 40 characters")
    private String centerName;

    @NotBlank(message = "Center code is required")
    @Pattern(regexp = "^[a-zA-Z0-9]{12}$", message = "Center code must be exactly 12 alphanumeric characters")
    private String centerCode;

    @Valid
    @NotNull(message = "Address is required")
    private AddressDTO address;

    @Min(value = 0, message = "Student capacity must be non-negative")
    private Integer studentCapacity;

    private List<String> coursesOffered;

    @Email(message = "Invalid email format")
    private String contactEmail;

    @NotBlank(message = "Contact phone is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String contactPhone;
}

