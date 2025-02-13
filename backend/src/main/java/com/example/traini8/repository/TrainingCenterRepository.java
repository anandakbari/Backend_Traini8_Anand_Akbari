package com.example.traini8.repository;

import com.example.traini8.model.TrainingCenter;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainingCenterRepository extends JpaRepository<TrainingCenter, Long> {
    boolean existsByCenterCode(String centerCode);
    @Query("SELECT tc FROM TrainingCenter tc WHERE " +
           "(:city IS NULL OR CAST(tc.address.city AS string) ILIKE CONCAT('%', CAST(:city AS string), '%')) AND " +
           "(:state IS NULL OR CAST(tc.address.state AS string) ILIKE CONCAT('%', CAST(:state AS string), '%')) AND " +
           "(:minCapacity IS NULL OR tc.studentCapacity >= :minCapacity) AND " +
           "(:course IS NULL OR EXISTS (SELECT 1 FROM tc.coursesOffered co WHERE CAST(co AS string) ILIKE CONCAT('%', CAST(:course AS string), '%')))")
    List<TrainingCenter> findWithFilters(
            @Param("city") String city,
            @Param("state") String state,
            @Param("minCapacity") Integer minCapacity,
            @Param("course") String course
    );
}
