package com.smartlink.ch.ewallet.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Salary.
 */
@Entity
@Table(name = "salary")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Salary implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "lever")
    private Long lever;

    @Column(name = "conefficient")
    private Double conefficient;

    @OneToOne
    @JoinColumn(unique = true)
    private Course levelId;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getLever() {
        return lever;
    }

    public Salary lever(Long lever) {
        this.lever = lever;
        return this;
    }

    public void setLever(Long lever) {
        this.lever = lever;
    }

    public Double getConefficient() {
        return conefficient;
    }

    public Salary conefficient(Double conefficient) {
        this.conefficient = conefficient;
        return this;
    }

    public void setConefficient(Double conefficient) {
        this.conefficient = conefficient;
    }

    public Course getLevelId() {
        return levelId;
    }

    public Salary levelId(Course course) {
        this.levelId = course;
        return this;
    }

    public void setLevelId(Course course) {
        this.levelId = course;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Salary)) {
            return false;
        }
        return id != null && id.equals(((Salary) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Salary{" +
            "id=" + getId() +
            ", lever=" + getLever() +
            ", conefficient=" + getConefficient() +
            "}";
    }
}
