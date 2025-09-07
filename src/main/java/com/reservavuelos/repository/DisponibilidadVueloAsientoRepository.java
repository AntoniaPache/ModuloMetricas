package com.reservavuelos.repository;

import com.reservavuelos.entity.DisponibilidadVueloAsiento;
import com.reservavuelos.entity.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisponibilidadVueloAsientoRepository extends JpaRepository<DisponibilidadVueloAsiento, Long> {
    
    List<DisponibilidadVueloAsiento> findByVuelo(Vuelo vuelo);
    
    @Query("SELECT d FROM DisponibilidadVueloAsiento d WHERE d.vuelo.idVuelo = :vueloId")
    List<DisponibilidadVueloAsiento> findByVueloId(@Param("vueloId") Long vueloId);
    
    List<DisponibilidadVueloAsiento> findByEstado(String estado);
    
    @Query("SELECT d FROM DisponibilidadVueloAsiento d WHERE d.vuelo.idVuelo = :vueloId AND d.estado = 'Disponible'")
    List<DisponibilidadVueloAsiento> findAsientosDisponiblesPorVuelo(@Param("vueloId") Long vueloId);
    
    @Query("SELECT d FROM DisponibilidadVueloAsiento d WHERE d.vuelo.idVuelo = :vueloId AND d.asiento.tipoAsiento = :tipoAsiento AND d.estado = 'Disponible'")
    List<DisponibilidadVueloAsiento> findAsientosDisponiblesPorVueloYTipo(@Param("vueloId") Long vueloId, @Param("tipoAsiento") String tipoAsiento);
    
    @Query("SELECT d FROM DisponibilidadVueloAsiento d WHERE d.vuelo.idVuelo = :vueloId AND d.precio BETWEEN :precioMin AND :precioMax AND d.estado = 'Disponible'")
    List<DisponibilidadVueloAsiento> findAsientosDisponiblesPorVueloYPrecio(@Param("vueloId") Long vueloId, 
                                                                           @Param("precioMin") Double precioMin, 
                                                                           @Param("precioMax") Double precioMax);
    
    @Query("SELECT d FROM DisponibilidadVueloAsiento d WHERE d.vuelo.idVuelo = :vueloId AND d.asiento.asientoId = :asientoId")
    List<DisponibilidadVueloAsiento> findByVueloIdAndAsientoId(@Param("vueloId") Long vueloId, @Param("asientoId") Long asientoId);
}
