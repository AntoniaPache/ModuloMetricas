package com.reservavuelos.repository;

import com.reservavuelos.entity.Lugar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LugarRepository extends JpaRepository<Lugar, Long> {
    
    Optional<Lugar> findByNombre(String nombre);
    
    List<Lugar> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT l FROM Lugar l WHERE l.nombre LIKE %:termino%")
    List<Lugar> buscarPorTermino(@Param("termino") String termino);
}
