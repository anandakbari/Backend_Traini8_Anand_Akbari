package com.example.traini8.mapper;


import com.example.traini8.dto.AddressDTO;
import com.example.traini8.dto.TrainingCenterRequestDTO;
import com.example.traini8.dto.TrainingCenterResponseDTO;
import com.example.traini8.model.Address;
import com.example.traini8.model.TrainingCenter;
import org.springframework.stereotype.Component;

@Component
public class TrainingCenterMapper {

    public TrainingCenter toEntity(TrainingCenterRequestDTO dto) {
        TrainingCenter entity = new TrainingCenter();
        entity.setCenterName(dto.getCenterName());
        entity.setCenterCode(dto.getCenterCode());
        entity.setAddress(toAddressEntity(dto.getAddress()));
        entity.setStudentCapacity(dto.getStudentCapacity());
        entity.setCoursesOffered(dto.getCoursesOffered());
        entity.setContactEmail(dto.getContactEmail());
        entity.setContactPhone(dto.getContactPhone());
        return entity;
    }

    public TrainingCenterResponseDTO toDto(TrainingCenter entity) {
        TrainingCenterResponseDTO dto = new TrainingCenterResponseDTO();
        dto.setId(entity.getId());
        dto.setCenterName(entity.getCenterName());
        dto.setCenterCode(entity.getCenterCode());
        dto.setAddress(toAddressDto(entity.getAddress()));
        dto.setStudentCapacity(entity.getStudentCapacity());
        dto.setCoursesOffered(entity.getCoursesOffered());
        dto.setCreatedOn(entity.getCreatedOn());
        dto.setContactEmail(entity.getContactEmail());
        dto.setContactPhone(entity.getContactPhone());
        return dto;
    }

    private Address toAddressEntity(AddressDTO dto) {
        if (dto == null) return null;
        Address address = new Address();
        address.setDetailedAddress(dto.getDetailedAddress());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        return address;
    }

    private AddressDTO toAddressDto(Address entity) {
        if (entity == null) return null;
        AddressDTO dto = new AddressDTO();
        dto.setDetailedAddress(entity.getDetailedAddress());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setPincode(entity.getPincode());
        return dto;
    }
}
