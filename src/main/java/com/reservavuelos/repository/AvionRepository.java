package com.reservavuelos.repository;

import com.reservavuelos.entity.Avion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvionRepository extends JpaRepository<Avion, Long> {
    
    List<Avion> findByAerolinea(String aerolinea);
    
    List<Avion> findByAerolineaContainingIgnoreCase(String aerolinea);
    
    @Query("SELECT a FROM Avion a WHERE a.cantAsientos >= :minAsientos")
    List<Avion> findByCantAsientosGreaterThanEqual(@Param("minAsientos") Integer minAsientos);
    
    @Query("SELECT a FROM Avion a WHERE a.cantAsientos BETWEEN :minAsientos AND :maxAsientos")
    List<Avion> findByCantAsientosBetween(@Param("minAsientos") Integer minAsientos, @Param("maxAsientos") Integer maxAsientos);
}
