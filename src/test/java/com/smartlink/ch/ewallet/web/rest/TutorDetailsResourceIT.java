package com.smartlink.ch.ewallet.web.rest;

import com.smartlink.ch.ewallet.TutorApp;
import com.smartlink.ch.ewallet.domain.TutorDetails;
import com.smartlink.ch.ewallet.repository.TutorDetailsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TutorDetailsResource} REST controller.
 */
@SpringBootTest(classes = TutorApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TutorDetailsResourceIT {

    private static final String DEFAULT_LITERACY = "AAAAAAAAAA";
    private static final String UPDATED_LITERACY = "BBBBBBBBBB";

    private static final Long DEFAULT_EFFICENCY = 1L;
    private static final Long UPDATED_EFFICENCY = 2L;

    @Autowired
    private TutorDetailsRepository tutorDetailsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTutorDetailsMockMvc;

    private TutorDetails tutorDetails;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TutorDetails createEntity(EntityManager em) {
        TutorDetails tutorDetails = new TutorDetails()
            .literacy(DEFAULT_LITERACY)
            .efficency(DEFAULT_EFFICENCY);
        return tutorDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TutorDetails createUpdatedEntity(EntityManager em) {
        TutorDetails tutorDetails = new TutorDetails()
            .literacy(UPDATED_LITERACY)
            .efficency(UPDATED_EFFICENCY);
        return tutorDetails;
    }

    @BeforeEach
    public void initTest() {
        tutorDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createTutorDetails() throws Exception {
        int databaseSizeBeforeCreate = tutorDetailsRepository.findAll().size();
        // Create the TutorDetails
        restTutorDetailsMockMvc.perform(post("/api/tutor-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tutorDetails)))
            .andExpect(status().isCreated());

        // Validate the TutorDetails in the database
        List<TutorDetails> tutorDetailsList = tutorDetailsRepository.findAll();
        assertThat(tutorDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        TutorDetails testTutorDetails = tutorDetailsList.get(tutorDetailsList.size() - 1);
        assertThat(testTutorDetails.getLiteracy()).isEqualTo(DEFAULT_LITERACY);
        assertThat(testTutorDetails.getEfficency()).isEqualTo(DEFAULT_EFFICENCY);
    }

    @Test
    @Transactional
    public void createTutorDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tutorDetailsRepository.findAll().size();

        // Create the TutorDetails with an existing ID
        tutorDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTutorDetailsMockMvc.perform(post("/api/tutor-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tutorDetails)))
            .andExpect(status().isBadRequest());

        // Validate the TutorDetails in the database
        List<TutorDetails> tutorDetailsList = tutorDetailsRepository.findAll();
        assertThat(tutorDetailsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTutorDetails() throws Exception {
        // Initialize the database
        tutorDetailsRepository.saveAndFlush(tutorDetails);

        // Get all the tutorDetailsList
        restTutorDetailsMockMvc.perform(get("/api/tutor-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tutorDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].literacy").value(hasItem(DEFAULT_LITERACY)))
            .andExpect(jsonPath("$.[*].efficency").value(hasItem(DEFAULT_EFFICENCY.intValue())));
    }
    
    @Test
    @Transactional
    public void getTutorDetails() throws Exception {
        // Initialize the database
        tutorDetailsRepository.saveAndFlush(tutorDetails);

        // Get the tutorDetails
        restTutorDetailsMockMvc.perform(get("/api/tutor-details/{id}", tutorDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tutorDetails.getId().intValue()))
            .andExpect(jsonPath("$.literacy").value(DEFAULT_LITERACY))
            .andExpect(jsonPath("$.efficency").value(DEFAULT_EFFICENCY.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingTutorDetails() throws Exception {
        // Get the tutorDetails
        restTutorDetailsMockMvc.perform(get("/api/tutor-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTutorDetails() throws Exception {
        // Initialize the database
        tutorDetailsRepository.saveAndFlush(tutorDetails);

        int databaseSizeBeforeUpdate = tutorDetailsRepository.findAll().size();

        // Update the tutorDetails
        TutorDetails updatedTutorDetails = tutorDetailsRepository.findById(tutorDetails.getId()).get();
        // Disconnect from session so that the updates on updatedTutorDetails are not directly saved in db
        em.detach(updatedTutorDetails);
        updatedTutorDetails
            .literacy(UPDATED_LITERACY)
            .efficency(UPDATED_EFFICENCY);

        restTutorDetailsMockMvc.perform(put("/api/tutor-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTutorDetails)))
            .andExpect(status().isOk());

        // Validate the TutorDetails in the database
        List<TutorDetails> tutorDetailsList = tutorDetailsRepository.findAll();
        assertThat(tutorDetailsList).hasSize(databaseSizeBeforeUpdate);
        TutorDetails testTutorDetails = tutorDetailsList.get(tutorDetailsList.size() - 1);
        assertThat(testTutorDetails.getLiteracy()).isEqualTo(UPDATED_LITERACY);
        assertThat(testTutorDetails.getEfficency()).isEqualTo(UPDATED_EFFICENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingTutorDetails() throws Exception {
        int databaseSizeBeforeUpdate = tutorDetailsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTutorDetailsMockMvc.perform(put("/api/tutor-details")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tutorDetails)))
            .andExpect(status().isBadRequest());

        // Validate the TutorDetails in the database
        List<TutorDetails> tutorDetailsList = tutorDetailsRepository.findAll();
        assertThat(tutorDetailsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTutorDetails() throws Exception {
        // Initialize the database
        tutorDetailsRepository.saveAndFlush(tutorDetails);

        int databaseSizeBeforeDelete = tutorDetailsRepository.findAll().size();

        // Delete the tutorDetails
        restTutorDetailsMockMvc.perform(delete("/api/tutor-details/{id}", tutorDetails.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TutorDetails> tutorDetailsList = tutorDetailsRepository.findAll();
        assertThat(tutorDetailsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
