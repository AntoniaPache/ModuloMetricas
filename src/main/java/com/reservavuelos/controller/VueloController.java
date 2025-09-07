package com.reservavuelos.controller;

import com.reservavuelos.entity.Vuelo;
import com.reservavuelos.repository.VueloRepository;
import com.reservavuelos.repository.LugarRepository;
import com.reservavuelos.repository.AvionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "*")
public class VueloController {

    @Autowired
    private VueloRepository vueloRepository;
    
    @Autowired
    private LugarRepository lugarRepository;
    
    @Autowired
    private AvionRepository avionRepository;

    // GET - Obtener todos los vuelos
    @GetMapping
    public ResponseEntity<List<Vuelo>> getAllVuelos() {
        List<Vuelo> vuelos = vueloRepository.findAll();
        return ResponseEntity.ok(vuelos);
    }

    // GET - Obtener vuelo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Vuelo> getVueloById(@PathVariable Long id) {
        Optional<Vuelo> vuelo = vueloRepository.findById(id);
        return vuelo.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // GET - Buscar vuelos por origen y destino
    @GetMapping("/buscar")
    public ResponseEntity<List<Vuelo>> buscarVuelos(
            @RequestParam(required = false) String origen,
            @RequestParam(required = false) String destino,
            @RequestParam(required = false) String fechaInicio,
            @RequestParam(required = false) String fechaFin) {
        
        List<Vuelo> vuelos;
        
        if (origen != null && destino != null) {
            vuelos = vueloRepository.buscarVuelosPorNombresLugares(origen, destino);
        } else if (origen != null) {
            vuelos = vueloRepository.findByOrigen(lugarRepository.findByNombre(origen).orElse(null));
        } else if (destino != null) {
            vuelos = vueloRepository.findByDestino(lugarRepository.findByNombre(destino).orElse(null));
        } else {
            vuelos = vueloRepository.findAll();
        }
        
        return ResponseEntity.ok(vuelos);
    }

    // GET - Obtener vuelos por estado
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Vuelo>> getVuelosByEstado(@PathVariable String estado) {
        List<Vuelo> vuelos = vueloRepository.findByEstado(estado);
        return ResponseEntity.ok(vuelos);
    }

    // POST - Crear nuevo vuelo
    @PostMapping
    public ResponseEntity<Vuelo> createVuelo(@Valid @RequestBody VueloRequest vueloRequest) {
        try {
            // Validar que existan los lugares y avión
            var origen = lugarRepository.findById(vueloRequest.getOrigenId())
                    .orElseThrow(() -> new RuntimeException("Lugar origen no encontrado"));
            var destino = lugarRepository.findById(vueloRequest.getDestinoId())
                    .orElseThrow(() -> new RuntimeException("Lugar destino no encontrado"));
            var avion = avionRepository.findById(vueloRequest.getAvionId())
                    .orElseThrow(() -> new RuntimeException("Avión no encontrado"));

            Vuelo vuelo = new Vuelo();
            vuelo.setFechaHora(vueloRequest.getFechaHora());
            vuelo.setOrigen(origen);
            vuelo.setDestino(destino);
            vuelo.setAvion(avion);
            vuelo.setNumeroVuelo(vueloRequest.getNumeroVuelo());
            vuelo.setEstado("Programado");

            Vuelo vueloGuardado = vueloRepository.save(vuelo);
            return ResponseEntity.status(HttpStatus.CREATED).body(vueloGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Clase interna para el request
    public static class VueloRequest {
        private LocalDateTime fechaHora;
        private Long origenId;
        private Long destinoId;
        private Long avionId;
        private String numeroVuelo;

        // Getters y Setters
        public LocalDateTime getFechaHora() { return fechaHora; }
        public void setFechaHora(LocalDateTime fechaHora) { this.fechaHora = fechaHora; }
        
        public Long getOrigenId() { return origenId; }
        public void setOrigenId(Long origenId) { this.origenId = origenId; }
        
        public Long getDestinoId() { return destinoId; }
        public void setDestinoId(Long destinoId) { this.destinoId = destinoId; }
        
        public Long getAvionId() { return avionId; }
        public void setAvionId(Long avionId) { this.avionId = avionId; }
        
        public String getNumeroVuelo() { return numeroVuelo; }
        public void setNumeroVuelo(String numeroVuelo) { this.numeroVuelo = numeroVuelo; }
    }
}
