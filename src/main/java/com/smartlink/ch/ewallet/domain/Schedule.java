package com.smartlink.ch.ewallet.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

import com.smartlink.ch.ewallet.domain.enumeration.WeekDay;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "week_day")
    private WeekDay weekDay;

    @Column(name = "start")
    private Long start;

    @ManyToOne
    @JsonIgnoreProperties(value = "scheduleIds", allowSetters = true)
    private TutorDetails tutorDetails;

    @ManyToOne
    @JsonIgnoreProperties(value = "scheduleIds", allowSetters = true)
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public WeekDay getWeekDay() {
        return weekDay;
    }

    public Schedule weekDay(WeekDay weekDay) {
        this.weekDay = weekDay;
        return this;
    }

    public void setWeekDay(WeekDay weekDay) {
        this.weekDay = weekDay;
    }

    public Long getStart() {
        return start;
    }

    public Schedule start(Long start) {
        this.start = start;
        return this;
    }

    public void setStart(Long start) {
        this.start = start;
    }

    public TutorDetails getTutorDetails() {
        return tutorDetails;
    }

    public Schedule tutorDetails(TutorDetails tutorDetails) {
        this.tutorDetails = tutorDetails;
        return this;
    }

    public void setTutorDetails(TutorDetails tutorDetails) {
        this.tutorDetails = tutorDetails;
    }

    public Course getCourse() {
        return course;
    }

    public Schedule course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Schedule)) {
            return false;
        }
        return id != null && id.equals(((Schedule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Schedule{" +
            "id=" + getId() +
            ", weekDay='" + getWeekDay() + "'" +
            ", start=" + getStart() +
            "}";
    }
}
