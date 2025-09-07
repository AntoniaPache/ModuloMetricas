package com.reservavuelos.repository;

import com.reservavuelos.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    Optional<Usuario> findByDni(String dni);
    
    Optional<Usuario> findByEmail(String email);
    
    List<Usuario> findByNombreContainingIgnoreCase(String nombre);
    
    @Query("SELECT u FROM Usuario u WHERE u.nombre LIKE %:termino% OR u.dni LIKE %:termino% OR u.email LIKE %:termino%")
    List<Usuario> buscarPorTermino(@Param("termino") String termino);
}
