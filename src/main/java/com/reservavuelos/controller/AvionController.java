package com.reservavuelos.controller;

import com.reservavuelos.entity.Avion;
import com.reservavuelos.repository.AvionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/aviones")
@CrossOrigin(origins = "*")
public class AvionController {

    @Autowired
    private AvionRepository avionRepository;

    // GET - Obtener todos los aviones
    @GetMapping
    public ResponseEntity<List<Avion>> getAllAviones() {
        List<Avion> aviones = avionRepository.findAll();
        return ResponseEntity.ok(aviones);
    }

    // GET - Obtener avión por ID
    @GetMapping("/{id}")
    public ResponseEntity<Avion> getAvionById(@PathVariable Long id) {
        Optional<Avion> avion = avionRepository.findById(id);
        return avion.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener aviones por aerolínea
    @GetMapping("/aerolinea/{aerolinea}")
    public ResponseEntity<List<Avion>> getAvionesByAerolinea(@PathVariable String aerolinea) {
        List<Avion> aviones = avionRepository.findByAerolineaContainingIgnoreCase(aerolinea);
        return ResponseEntity.ok(aviones);
    }

    // GET - Obtener aviones por cantidad mínima de asientos
    @GetMapping("/asientos/min/{minAsientos}")
    public ResponseEntity<List<Avion>> getAvionesByMinAsientos(@PathVariable Integer minAsientos) {
        List<Avion> aviones = avionRepository.findByCantAsientosGreaterThanEqual(minAsientos);
        return ResponseEntity.ok(aviones);
    }

    // GET - Obtener aviones por rango de asientos
    @GetMapping("/asientos")
    public ResponseEntity<List<Avion>> getAvionesByRangoAsientos(
            @RequestParam Integer minAsientos, 
            @RequestParam Integer maxAsientos) {
        List<Avion> aviones = avionRepository.findByCantAsientosBetween(minAsientos, maxAsientos);
        return ResponseEntity.ok(aviones);
    }

    // POST - Crear nuevo avión
    @PostMapping
    public ResponseEntity<Avion> createAvion(@Valid @RequestBody Avion avion) {
        try {
            Avion avionGuardado = avionRepository.save(avion);
            return ResponseEntity.status(HttpStatus.CREATED).body(avionGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar avión
    @PutMapping("/{id}")
    public ResponseEntity<Avion> updateAvion(@PathVariable Long id, @Valid @RequestBody Avion avionDetails) {
        Optional<Avion> avionOpt = avionRepository.findById(id);
        if (avionOpt.isPresent()) {
            Avion avion = avionOpt.get();
            avion.setCantAsientos(avionDetails.getCantAsientos());
            avion.setAerolinea(avionDetails.getAerolinea());

            Avion avionActualizado = avionRepository.save(avion);
            return ResponseEntity.ok(avionActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar avión
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAvion(@PathVariable Long id) {
        if (avionRepository.existsById(id)) {
            avionRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
