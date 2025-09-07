package com.reservavuelos.repository;

import com.reservavuelos.entity.Lugar;
import com.reservavuelos.entity.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VueloRepository extends JpaRepository<Vuelo, Long> {
    
    List<Vuelo> findByOrigen(Lugar origen);
    
    List<Vuelo> findByDestino(Lugar destino);
    
    List<Vuelo> findByOrigenAndDestino(Lugar origen, Lugar destino);
    
    List<Vuelo> findByFechaHoraBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);
    
    List<Vuelo> findByEstado(String estado);
    
    List<Vuelo> findByNumeroVuelo(String numeroVuelo);
    
    @Query("SELECT v FROM Vuelo v WHERE v.origen.idLugar = :origenId AND v.destino.idLugar = :destinoId AND v.fechaHora BETWEEN :fechaInicio AND :fechaFin")
    List<Vuelo> buscarVuelosPorRutaYFecha(@Param("origenId") Long origenId, 
                                         @Param("destinoId") Long destinoId, 
                                         @Param("fechaInicio") LocalDateTime fechaInicio, 
                                         @Param("fechaFin") LocalDateTime fechaFin);
    
    @Query("SELECT v FROM Vuelo v WHERE v.origen.nombre LIKE %:origen% AND v.destino.nombre LIKE %:destino%")
    List<Vuelo> buscarVuelosPorNombresLugares(@Param("origen") String origen, @Param("destino") String destino);
}
