package com.andre.protocolo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Protocolo.
 */
@Entity
@Table(name = "protocolo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Protocolo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "protocolo")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pessoa> requerentes = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private Usuario usuario;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "protocolo_origem",
               joinColumns = @JoinColumn(name = "protocolos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "origems_id", referencedColumnName = "id"))
    private Set<Local> origems = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "protocolo_destino",
               joinColumns = @JoinColumn(name = "protocolos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "destinos_id", referencedColumnName = "id"))
    private Set<Local> destinos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Pessoa> getRequerentes() {
        return requerentes;
    }

    public Protocolo requerentes(Set<Pessoa> pessoas) {
        this.requerentes = pessoas;
        return this;
    }

    public Protocolo addRequerente(Pessoa pessoa) {
        this.requerentes.add(pessoa);
        pessoa.setProtocolo(this);
        return this;
    }

    public Protocolo removeRequerente(Pessoa pessoa) {
        this.requerentes.remove(pessoa);
        pessoa.setProtocolo(null);
        return this;
    }

    public void setRequerentes(Set<Pessoa> pessoas) {
        this.requerentes = pessoas;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Protocolo usuario(Usuario usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Set<Local> getOrigems() {
        return origems;
    }

    public Protocolo origems(Set<Local> locals) {
        this.origems = locals;
        return this;
    }

    public Protocolo addOrigem(Local local) {
        this.origems.add(local);
        return this;
    }

    public Protocolo removeOrigem(Local local) {
        this.origems.remove(local);
        return this;
    }

    public void setOrigems(Set<Local> locals) {
        this.origems = locals;
    }

    public Set<Local> getDestinos() {
        return destinos;
    }

    public Protocolo destinos(Set<Local> locals) {
        this.destinos = locals;
        return this;
    }

    public Protocolo addDestino(Local local) {
        this.destinos.add(local);
        return this;
    }

    public Protocolo removeDestino(Local local) {
        this.destinos.remove(local);
        return this;
    }

    public void setDestinos(Set<Local> locals) {
        this.destinos = locals;
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
        Protocolo protocolo = (Protocolo) o;
        if (protocolo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), protocolo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Protocolo{" +
            "id=" + getId() +
            "}";
    }
}
