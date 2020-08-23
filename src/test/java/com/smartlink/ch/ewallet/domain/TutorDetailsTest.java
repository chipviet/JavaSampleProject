package com.smartlink.ch.ewallet.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.smartlink.ch.ewallet.web.rest.TestUtil;

public class TutorDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TutorDetails.class);
        TutorDetails tutorDetails1 = new TutorDetails();
        tutorDetails1.setId(1L);
        TutorDetails tutorDetails2 = new TutorDetails();
        tutorDetails2.setId(tutorDetails1.getId());
        assertThat(tutorDetails1).isEqualTo(tutorDetails2);
        tutorDetails2.setId(2L);
        assertThat(tutorDetails1).isNotEqualTo(tutorDetails2);
        tutorDetails1.setId(null);
        assertThat(tutorDetails1).isNotEqualTo(tutorDetails2);
    }
}
