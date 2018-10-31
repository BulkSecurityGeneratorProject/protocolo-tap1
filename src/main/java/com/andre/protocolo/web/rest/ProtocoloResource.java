package com.andre.protocolo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.andre.protocolo.domain.Protocolo;
import com.andre.protocolo.repository.ProtocoloRepository;
import com.andre.protocolo.web.rest.errors.BadRequestAlertException;
import com.andre.protocolo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Protocolo.
 */
@RestController
@RequestMapping("/api")
public class ProtocoloResource {

    private final Logger log = LoggerFactory.getLogger(ProtocoloResource.class);

    private static final String ENTITY_NAME = "protocolo";

    private ProtocoloRepository protocoloRepository;

    public ProtocoloResource(ProtocoloRepository protocoloRepository) {
        this.protocoloRepository = protocoloRepository;
    }

    /**
     * POST  /protocolos : Create a new protocolo.
     *
     * @param protocolo the protocolo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new protocolo, or with status 400 (Bad Request) if the protocolo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/protocolos")
    @Timed
    public ResponseEntity<Protocolo> createProtocolo(@RequestBody Protocolo protocolo) throws URISyntaxException {
        log.debug("REST request to save Protocolo : {}", protocolo);
        if (protocolo.getId() != null) {
            throw new BadRequestAlertException("A new protocolo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Protocolo result = protocoloRepository.save(protocolo);
        return ResponseEntity.created(new URI("/api/protocolos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /protocolos : Updates an existing protocolo.
     *
     * @param protocolo the protocolo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated protocolo,
     * or with status 400 (Bad Request) if the protocolo is not valid,
     * or with status 500 (Internal Server Error) if the protocolo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/protocolos")
    @Timed
    public ResponseEntity<Protocolo> updateProtocolo(@RequestBody Protocolo protocolo) throws URISyntaxException {
        log.debug("REST request to update Protocolo : {}", protocolo);
        if (protocolo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Protocolo result = protocoloRepository.save(protocolo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, protocolo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /protocolos : get all the protocolos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of protocolos in body
     */
    @GetMapping("/protocolos")
    @Timed
    public List<Protocolo> getAllProtocolos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Protocolos");
        return protocoloRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /protocolos/:id : get the "id" protocolo.
     *
     * @param id the id of the protocolo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the protocolo, or with status 404 (Not Found)
     */
    @GetMapping("/protocolos/{id}")
    @Timed
    public ResponseEntity<Protocolo> getProtocolo(@PathVariable Long id) {
        log.debug("REST request to get Protocolo : {}", id);
        Optional<Protocolo> protocolo = protocoloRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(protocolo);
    }

    /**
     * DELETE  /protocolos/:id : delete the "id" protocolo.
     *
     * @param id the id of the protocolo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/protocolos/{id}")
    @Timed
    public ResponseEntity<Void> deleteProtocolo(@PathVariable Long id) {
        log.debug("REST request to delete Protocolo : {}", id);

        protocoloRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
