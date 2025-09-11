package com.reservavuelos.repository;

import com.reservavuelos.entity.Reserva;
import com.reservavuelos.entity.Usuario;
import com.reservavuelos.entity.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByUsuario(Usuario usuario);
    
    @Query("SELECT r FROM Reserva r WHERE r.usuario.idUsuario = :usuarioId")
    List<Reserva> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    List<Reserva> findByVuelo(Vuelo vuelo);
    
    @Query("SELECT r FROM Reserva r WHERE r.vuelo.idVuelo = :vueloId")
    List<Reserva> findByVueloId(@Param("vueloId") Long vueloId);
    
    List<Reserva> findByEstado(String estado);
    
    Optional<Reserva> findByCodigoReserva(String codigoReserva);
    
    @Query("SELECT r FROM Reserva r WHERE r.usuario.idUsuario = :usuarioId AND r.estado = :estado")
    List<Reserva> findByUsuarioIdAndEstado(@Param("usuarioId") Long usuarioId, @Param("estado") String estado);
    
    @Query("SELECT r FROM Reserva r WHERE r.fechaReserva BETWEEN :fechaInicio AND :fechaFin")
    List<Reserva> findByFechaReservaBetween(@Param("fechaInicio") LocalDateTime fechaInicio, @Param("fechaFin") LocalDateTime fechaFin);
    
    @Query("SELECT r FROM Reserva r WHERE r.vuelo.idVuelo = :vueloId AND r.asiento.asientoId = :asientoId")
    List<Reserva> findByVueloIdAndAsientoId(@Param("vueloId") Long vueloId, @Param("asientoId") Long asientoId);
}
