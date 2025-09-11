package com.reservavuelos.repository;

import com.reservavuelos.entity.MetodoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MetodoPagoRepository extends JpaRepository<MetodoPago, Long> {
    
    List<MetodoPago> findByActivoTrue();
    
    List<MetodoPago> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT mp FROM MetodoPago mp WHERE mp.activo = true AND mp.nombre LIKE %:termino%")
    List<MetodoPago> buscarMetodosActivosPorTermino(@Param("termino") String termino);
}
