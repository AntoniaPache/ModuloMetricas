package com.reservavuelos.controller;

import com.reservavuelos.entity.DisponibilidadVueloAsiento;
import com.reservavuelos.repository.DisponibilidadVueloAsientoRepository;
import com.reservavuelos.repository.VueloRepository;
import com.reservavuelos.repository.AsientoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/disponibilidad")
@CrossOrigin(origins = "*")
public class DisponibilidadController {

    @Autowired
    private DisponibilidadVueloAsientoRepository disponibilidadRepository;
    
    @Autowired
    private VueloRepository vueloRepository;
    
    @Autowired
    private AsientoRepository asientoRepository;

    // GET - Obtener todas las disponibilidades
    @GetMapping
    public ResponseEntity<List<DisponibilidadVueloAsiento>> getAllDisponibilidades() {
        List<DisponibilidadVueloAsiento> disponibilidades = disponibilidadRepository.findAll();
        return ResponseEntity.ok(disponibilidades);
    }

    // GET - Obtener disponibilidad por ID
    @GetMapping("/{id}")
    public ResponseEntity<DisponibilidadVueloAsiento> getDisponibilidadById(@PathVariable Long id) {
        Optional<DisponibilidadVueloAsiento> disponibilidad = disponibilidadRepository.findById(id);
        return disponibilidad.map(ResponseEntity::ok)
                            .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener asientos disponibles por vuelo
    @GetMapping("/vuelo/{vueloId}")
    public ResponseEntity<List<DisponibilidadVueloAsiento>> getAsientosDisponiblesPorVuelo(@PathVariable Long vueloId) {
        List<DisponibilidadVueloAsiento> disponibilidades = 
            disponibilidadRepository.findAsientosDisponiblesPorVuelo(vueloId);
        return ResponseEntity.ok(disponibilidades);
    }

    // GET - Obtener asientos disponibles por vuelo y tipo
    @GetMapping("/vuelo/{vueloId}/tipo/{tipoAsiento}")
    public ResponseEntity<List<DisponibilidadVueloAsiento>> getAsientosDisponiblesPorVueloYTipo(
            @PathVariable Long vueloId, @PathVariable String tipoAsiento) {
        List<DisponibilidadVueloAsiento> disponibilidades = 
            disponibilidadRepository.findAsientosDisponiblesPorVueloYTipo(vueloId, tipoAsiento);
        return ResponseEntity.ok(disponibilidades);
    }

    // GET - Obtener asientos disponibles por vuelo y rango de precio
    @GetMapping("/vuelo/{vueloId}/precio")
    public ResponseEntity<List<DisponibilidadVueloAsiento>> getAsientosDisponiblesPorVueloYPrecio(
            @PathVariable Long vueloId,
            @RequestParam Double precioMin,
            @RequestParam Double precioMax) {
        List<DisponibilidadVueloAsiento> disponibilidades = 
            disponibilidadRepository.findAsientosDisponiblesPorVueloYPrecio(vueloId, precioMin, precioMax);
        return ResponseEntity.ok(disponibilidades);
    }

    // GET - Obtener disponibilidades por estado
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<DisponibilidadVueloAsiento>> getDisponibilidadesByEstado(@PathVariable String estado) {
        List<DisponibilidadVueloAsiento> disponibilidades = disponibilidadRepository.findByEstado(estado);
        return ResponseEntity.ok(disponibilidades);
    }

    // POST - Crear nueva disponibilidad
    @PostMapping
    public ResponseEntity<DisponibilidadVueloAsiento> createDisponibilidad(@Valid @RequestBody DisponibilidadRequest request) {
        try {
            // Validar que existan el vuelo y asiento
            var vuelo = vueloRepository.findById(request.getVueloId())
                    .orElseThrow(() -> new RuntimeException("Vuelo no encontrado"));
            var asiento = asientoRepository.findById(request.getAsientoId())
                    .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));

            DisponibilidadVueloAsiento disponibilidad = new DisponibilidadVueloAsiento();
            disponibilidad.setVuelo(vuelo);
            disponibilidad.setAsiento(asiento);
            disponibilidad.setEstado(request.getEstado());
            disponibilidad.setPrecio(request.getPrecio());

            DisponibilidadVueloAsiento disponibilidadGuardada = disponibilidadRepository.save(disponibilidad);
            return ResponseEntity.status(HttpStatus.CREATED).body(disponibilidadGuardada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar disponibilidad
    @PutMapping("/{id}")
    public ResponseEntity<DisponibilidadVueloAsiento> updateDisponibilidad(
            @PathVariable Long id, @Valid @RequestBody DisponibilidadRequest request) {
        Optional<DisponibilidadVueloAsiento> disponibilidadOpt = disponibilidadRepository.findById(id);
        if (disponibilidadOpt.isPresent()) {
            DisponibilidadVueloAsiento disponibilidad = disponibilidadOpt.get();
            disponibilidad.setEstado(request.getEstado());
            disponibilidad.setPrecio(request.getPrecio());

            DisponibilidadVueloAsiento disponibilidadActualizada = disponibilidadRepository.save(disponibilidad);
            return ResponseEntity.ok(disponibilidadActualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // Clase interna para el request
    public static class DisponibilidadRequest {
        private Long vueloId;
        private Long asientoId;
        private String estado;
        private Double precio;

        // Getters y Setters
        public Long getVueloId() { return vueloId; }
        public void setVueloId(Long vueloId) { this.vueloId = vueloId; }
        
        public Long getAsientoId() { return asientoId; }
        public void setAsientoId(Long asientoId) { this.asientoId = asientoId; }
        
        public String getEstado() { return estado; }
        public void setEstado(String estado) { this.estado = estado; }
        
        public Double getPrecio() { return precio; }
        public void setPrecio(Double precio) { this.precio = precio; }
    }
}
