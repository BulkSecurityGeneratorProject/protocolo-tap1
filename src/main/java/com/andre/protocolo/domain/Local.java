package com.andre.protocolo.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Local.
 */
@Entity
@Table(name = "local")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Local implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cod_local")
    private Integer codLocal;

    @Column(name = "desc_local")
    private String descLocal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodLocal() {
        return codLocal;
    }

    public Local codLocal(Integer codLocal) {
        this.codLocal = codLocal;
        return this;
    }

    public void setCodLocal(Integer codLocal) {
        this.codLocal = codLocal;
    }

    public String getDescLocal() {
        return descLocal;
    }

    public Local descLocal(String descLocal) {
        this.descLocal = descLocal;
        return this;
    }

    public void setDescLocal(String descLocal) {
        this.descLocal = descLocal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Local local = (Local) o;
        if (local.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), local.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Local{" +
            "id=" + getId() +
            ", codLocal=" + getCodLocal() +
            ", descLocal='" + getDescLocal() + "'" +
            "}";
    }
}
