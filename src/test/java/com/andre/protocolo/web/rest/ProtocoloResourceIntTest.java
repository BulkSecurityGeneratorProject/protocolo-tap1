package com.andre.protocolo.web.rest;

import com.andre.protocolo.ProtocoloTap1App;

import com.andre.protocolo.domain.Protocolo;
import com.andre.protocolo.repository.ProtocoloRepository;
import com.andre.protocolo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.andre.protocolo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProtocoloResource REST controller.
 *
 * @see ProtocoloResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProtocoloTap1App.class)
public class ProtocoloResourceIntTest {

    @Autowired
    private ProtocoloRepository protocoloRepository;

    @Mock
    private ProtocoloRepository protocoloRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProtocoloMockMvc;

    private Protocolo protocolo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProtocoloResource protocoloResource = new ProtocoloResource(protocoloRepository);
        this.restProtocoloMockMvc = MockMvcBuilders.standaloneSetup(protocoloResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Protocolo createEntity(EntityManager em) {
        Protocolo protocolo = new Protocolo();
        return protocolo;
    }

    @Before
    public void initTest() {
        protocolo = createEntity(em);
    }

    @Test
    @Transactional
    public void createProtocolo() throws Exception {
        int databaseSizeBeforeCreate = protocoloRepository.findAll().size();

        // Create the Protocolo
        restProtocoloMockMvc.perform(post("/api/protocolos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(protocolo)))
            .andExpect(status().isCreated());

        // Validate the Protocolo in the database
        List<Protocolo> protocoloList = protocoloRepository.findAll();
        assertThat(protocoloList).hasSize(databaseSizeBeforeCreate + 1);
        Protocolo testProtocolo = protocoloList.get(protocoloList.size() - 1);
    }

    @Test
    @Transactional
    public void createProtocoloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = protocoloRepository.findAll().size();

        // Create the Protocolo with an existing ID
        protocolo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProtocoloMockMvc.perform(post("/api/protocolos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(protocolo)))
            .andExpect(status().isBadRequest());

        // Validate the Protocolo in the database
        List<Protocolo> protocoloList = protocoloRepository.findAll();
        assertThat(protocoloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProtocolos() throws Exception {
        // Initialize the database
        protocoloRepository.saveAndFlush(protocolo);

        // Get all the protocoloList
        restProtocoloMockMvc.perform(get("/api/protocolos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(protocolo.getId().intValue())));
    }
    
    public void getAllProtocolosWithEagerRelationshipsIsEnabled() throws Exception {
        ProtocoloResource protocoloResource = new ProtocoloResource(protocoloRepositoryMock);
        when(protocoloRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restProtocoloMockMvc = MockMvcBuilders.standaloneSetup(protocoloResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProtocoloMockMvc.perform(get("/api/protocolos?eagerload=true"))
        .andExpect(status().isOk());

        verify(protocoloRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllProtocolosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ProtocoloResource protocoloResource = new ProtocoloResource(protocoloRepositoryMock);
            when(protocoloRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restProtocoloMockMvc = MockMvcBuilders.standaloneSetup(protocoloResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restProtocoloMockMvc.perform(get("/api/protocolos?eagerload=true"))
        .andExpect(status().isOk());

            verify(protocoloRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getProtocolo() throws Exception {
        // Initialize the database
        protocoloRepository.saveAndFlush(protocolo);

        // Get the protocolo
        restProtocoloMockMvc.perform(get("/api/protocolos/{id}", protocolo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(protocolo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProtocolo() throws Exception {
        // Get the protocolo
        restProtocoloMockMvc.perform(get("/api/protocolos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProtocolo() throws Exception {
        // Initialize the database
        protocoloRepository.saveAndFlush(protocolo);

        int databaseSizeBeforeUpdate = protocoloRepository.findAll().size();

        // Update the protocolo
        Protocolo updatedProtocolo = protocoloRepository.findById(protocolo.getId()).get();
        // Disconnect from session so that the updates on updatedProtocolo are not directly saved in db
        em.detach(updatedProtocolo);

        restProtocoloMockMvc.perform(put("/api/protocolos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProtocolo)))
            .andExpect(status().isOk());

        // Validate the Protocolo in the database
        List<Protocolo> protocoloList = protocoloRepository.findAll();
        assertThat(protocoloList).hasSize(databaseSizeBeforeUpdate);
        Protocolo testProtocolo = protocoloList.get(protocoloList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProtocolo() throws Exception {
        int databaseSizeBeforeUpdate = protocoloRepository.findAll().size();

        // Create the Protocolo

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProtocoloMockMvc.perform(put("/api/protocolos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(protocolo)))
            .andExpect(status().isBadRequest());

        // Validate the Protocolo in the database
        List<Protocolo> protocoloList = protocoloRepository.findAll();
        assertThat(protocoloList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProtocolo() throws Exception {
        // Initialize the database
        protocoloRepository.saveAndFlush(protocolo);

        int databaseSizeBeforeDelete = protocoloRepository.findAll().size();

        // Get the protocolo
        restProtocoloMockMvc.perform(delete("/api/protocolos/{id}", protocolo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Protocolo> protocoloList = protocoloRepository.findAll();
        assertThat(protocoloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Protocolo.class);
        Protocolo protocolo1 = new Protocolo();
        protocolo1.setId(1L);
        Protocolo protocolo2 = new Protocolo();
        protocolo2.setId(protocolo1.getId());
        assertThat(protocolo1).isEqualTo(protocolo2);
        protocolo2.setId(2L);
        assertThat(protocolo1).isNotEqualTo(protocolo2);
        protocolo1.setId(null);
        assertThat(protocolo1).isNotEqualTo(protocolo2);
    }
}
