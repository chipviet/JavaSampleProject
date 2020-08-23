package com.smartlink.ch.ewallet.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TutorDetails.
 */
@Entity
@Table(name = "tutor_details")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TutorDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "literacy")
    private String literacy;

    @Column(name = "efficency")
    private Long efficency;

    @OneToMany(mappedBy = "tutorDetails")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Subject> subjectIds = new HashSet<>();

    @OneToMany(mappedBy = "tutorDetails")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Schedule> scheduleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLiteracy() {
        return literacy;
    }

    public TutorDetails literacy(String literacy) {
        this.literacy = literacy;
        return this;
    }

    public void setLiteracy(String literacy) {
        this.literacy = literacy;
    }

    public Long getEfficency() {
        return efficency;
    }

    public TutorDetails efficency(Long efficency) {
        this.efficency = efficency;
        return this;
    }

    public void setEfficency(Long efficency) {
        this.efficency = efficency;
    }

    public Set<Subject> getSubjectIds() {
        return subjectIds;
    }

    public TutorDetails subjectIds(Set<Subject> subjects) {
        this.subjectIds = subjects;
        return this;
    }

    public TutorDetails addSubjectId(Subject subject) {
        this.subjectIds.add(subject);
        subject.setTutorDetails(this);
        return this;
    }

    public TutorDetails removeSubjectId(Subject subject) {
        this.subjectIds.remove(subject);
        subject.setTutorDetails(null);
        return this;
    }

    public void setSubjectIds(Set<Subject> subjects) {
        this.subjectIds = subjects;
    }

    public Set<Schedule> getScheduleIds() {
        return scheduleIds;
    }

    public TutorDetails scheduleIds(Set<Schedule> schedules) {
        this.scheduleIds = schedules;
        return this;
    }

    public TutorDetails addScheduleId(Schedule schedule) {
        this.scheduleIds.add(schedule);
        schedule.setTutorDetails(this);
        return this;
    }

    public TutorDetails removeScheduleId(Schedule schedule) {
        this.scheduleIds.remove(schedule);
        schedule.setTutorDetails(null);
        return this;
    }

    public void setScheduleIds(Set<Schedule> schedules) {
        this.scheduleIds = schedules;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TutorDetails)) {
            return false;
        }
        return id != null && id.equals(((TutorDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TutorDetails{" +
            "id=" + getId() +
            ", literacy='" + getLiteracy() + "'" +
            ", efficency=" + getEfficency() +
            "}";
    }
}
