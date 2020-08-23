package com.smartlink.ch.ewallet.web.rest;

import com.smartlink.ch.ewallet.domain.TutorDetails;
import com.smartlink.ch.ewallet.repository.TutorDetailsRepository;
import com.smartlink.ch.ewallet.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smartlink.ch.ewallet.domain.TutorDetails}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TutorDetailsResource {

    private final Logger log = LoggerFactory.getLogger(TutorDetailsResource.class);

    private static final String ENTITY_NAME = "tutorDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TutorDetailsRepository tutorDetailsRepository;

    public TutorDetailsResource(TutorDetailsRepository tutorDetailsRepository) {
        this.tutorDetailsRepository = tutorDetailsRepository;
    }

    /**
     * {@code POST  /tutor-details} : Create a new tutorDetails.
     *
     * @param tutorDetails the tutorDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tutorDetails, or with status {@code 400 (Bad Request)} if the tutorDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tutor-details")
    public ResponseEntity<TutorDetails> createTutorDetails(@RequestBody TutorDetails tutorDetails) throws URISyntaxException {
        log.debug("REST request to save TutorDetails : {}", tutorDetails);
        if (tutorDetails.getId() != null) {
            throw new BadRequestAlertException("A new tutorDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TutorDetails result = tutorDetailsRepository.save(tutorDetails);
        return ResponseEntity.created(new URI("/api/tutor-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tutor-details} : Updates an existing tutorDetails.
     *
     * @param tutorDetails the tutorDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tutorDetails,
     * or with status {@code 400 (Bad Request)} if the tutorDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tutorDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tutor-details")
    public ResponseEntity<TutorDetails> updateTutorDetails(@RequestBody TutorDetails tutorDetails) throws URISyntaxException {
        log.debug("REST request to update TutorDetails : {}", tutorDetails);
        if (tutorDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TutorDetails result = tutorDetailsRepository.save(tutorDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tutorDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tutor-details} : get all the tutorDetails.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tutorDetails in body.
     */
    @GetMapping("/tutor-details")
    public List<TutorDetails> getAllTutorDetails() {
        log.debug("REST request to get all TutorDetails");
        return tutorDetailsRepository.findAll();
    }

    /**
     * {@code GET  /tutor-details/:id} : get the "id" tutorDetails.
     *
     * @param id the id of the tutorDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tutorDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tutor-details/{id}")
    public ResponseEntity<TutorDetails> getTutorDetails(@PathVariable Long id) {
        log.debug("REST request to get TutorDetails : {}", id);
        Optional<TutorDetails> tutorDetails = tutorDetailsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tutorDetails);
    }

    /**
     * {@code DELETE  /tutor-details/:id} : delete the "id" tutorDetails.
     *
     * @param id the id of the tutorDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tutor-details/{id}")
    public ResponseEntity<Void> deleteTutorDetails(@PathVariable Long id) {
        log.debug("REST request to delete TutorDetails : {}", id);
        tutorDetailsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
