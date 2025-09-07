package com.reservavuelos.repository;

import com.reservavuelos.entity.Asiento;
import com.reservavuelos.entity.Avion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AsientoRepository extends JpaRepository<Asiento, Long> {
    
    List<Asiento> findByAvion(Avion avion);
    
    @Query("SELECT a FROM Asiento a WHERE a.avion.idAvion = :avionId")
    List<Asiento> findByAvionId(@Param("avionId") Long avionId);
    
    Optional<Asiento> findByAvionAndNumeroAsiento(Avion avion, String numeroAsiento);
    
    List<Asiento> findByTipoAsiento(String tipoAsiento);
    
    @Query("SELECT a FROM Asiento a WHERE a.avion.idAvion = :avionId AND a.tipoAsiento = :tipoAsiento")
    List<Asiento> findByAvionIdAndTipoAsiento(@Param("avionId") Long avionId, @Param("tipoAsiento") String tipoAsiento);
}
