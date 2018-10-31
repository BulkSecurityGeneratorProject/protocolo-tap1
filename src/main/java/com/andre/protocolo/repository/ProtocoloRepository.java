package com.andre.protocolo.repository;

import com.andre.protocolo.domain.Protocolo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Protocolo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProtocoloRepository extends JpaRepository<Protocolo, Long> {

    @Query(value = "select distinct protocolo from Protocolo protocolo left join fetch protocolo.origems left join fetch protocolo.destinos",
        countQuery = "select count(distinct protocolo) from Protocolo protocolo")
    Page<Protocolo> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct protocolo from Protocolo protocolo left join fetch protocolo.origems left join fetch protocolo.destinos")
    List<Protocolo> findAllWithEagerRelationships();

    @Query("select protocolo from Protocolo protocolo left join fetch protocolo.origems left join fetch protocolo.destinos where protocolo.id =:id")
    Optional<Protocolo> findOneWithEagerRelationships(@Param("id") Long id);

}
