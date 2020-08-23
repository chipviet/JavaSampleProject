package com.smartlink.ch.ewallet.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "level")
    private String level;

    @Column(name = "basic_tuition")
    private Double basicTuition;

    @Column(name = "currency_code")
    private String currencyCode;

    @OneToOne
    @JoinColumn(unique = true)
    private Subject subjectId;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Schedule> scheduleIds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLevel() {
        return level;
    }

    public Course level(String level) {
        this.level = level;
        return this;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public Double getBasicTuition() {
        return basicTuition;
    }

    public Course basicTuition(Double basicTuition) {
        this.basicTuition = basicTuition;
        return this;
    }

    public void setBasicTuition(Double basicTuition) {
        this.basicTuition = basicTuition;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public Course currencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
        return this;
    }

    public void setCurrencyCode(String currencyCode) {
        this.currencyCode = currencyCode;
    }

    public Subject getSubjectId() {
        return subjectId;
    }

    public Course subjectId(Subject subject) {
        this.subjectId = subject;
        return this;
    }

    public void setSubjectId(Subject subject) {
        this.subjectId = subject;
    }

    public Set<Schedule> getScheduleIds() {
        return scheduleIds;
    }

    public Course scheduleIds(Set<Schedule> schedules) {
        this.scheduleIds = schedules;
        return this;
    }

    public Course addScheduleId(Schedule schedule) {
        this.scheduleIds.add(schedule);
        schedule.setCourse(this);
        return this;
    }

    public Course removeScheduleId(Schedule schedule) {
        this.scheduleIds.remove(schedule);
        schedule.setCourse(null);
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
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", level='" + getLevel() + "'" +
            ", basicTuition=" + getBasicTuition() +
            ", currencyCode='" + getCurrencyCode() + "'" +
            "}";
    }
}
