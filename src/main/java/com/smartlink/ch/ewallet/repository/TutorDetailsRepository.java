package com.smartlink.ch.ewallet.repository;

import com.smartlink.ch.ewallet.domain.TutorDetails;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TutorDetails entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TutorDetailsRepository extends JpaRepository<TutorDetails, Long> {
}
