package com.reservavuelos.repository;

import com.reservavuelos.entity.DatosPagoUsuario;
import com.reservavuelos.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DatosPagoUsuarioRepository extends JpaRepository<DatosPagoUsuario, Long> {
    
    List<DatosPagoUsuario> findByUsuario(Usuario usuario);
    
    List<DatosPagoUsuario> findByUsuarioId(Long usuarioId);
    
    List<DatosPagoUsuario> findByUsuarioIdAndActivoTrue(Long usuarioId);
    
    @Query("SELECT dpu FROM DatosPagoUsuario dpu WHERE dpu.usuario.idUsuario = :usuarioId AND dpu.activo = true")
    List<DatosPagoUsuario> findDatosPagoActivosPorUsuario(@Param("usuarioId") Long usuarioId);
}
