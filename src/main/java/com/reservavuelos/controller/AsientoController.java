package com.reservavuelos.controller;

import com.reservavuelos.entity.Asiento;
import com.reservavuelos.repository.AsientoRepository;
import com.reservavuelos.repository.AvionRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asientos")
@CrossOrigin(origins = "*")
public class AsientoController {

    @Autowired
    private AsientoRepository asientoRepository;
    
    @Autowired
    private AvionRepository avionRepository;

    // GET - Obtener todos los asientos
    @GetMapping
    public ResponseEntity<List<Asiento>> getAllAsientos() {
        List<Asiento> asientos = asientoRepository.findAll();
        return ResponseEntity.ok(asientos);
    }

    // GET - Obtener asiento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Asiento> getAsientoById(@PathVariable Long id) {
        Optional<Asiento> asiento = asientoRepository.findById(id);
        return asiento.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener asientos por avión
    @GetMapping("/avion/{avionId}")
    public ResponseEntity<List<Asiento>> getAsientosByAvion(@PathVariable Long avionId) {
        List<Asiento> asientos = asientoRepository.findByAvionId(avionId);
        return ResponseEntity.ok(asientos);
    }

    // GET - Obtener asientos por tipo
    @GetMapping("/tipo/{tipoAsiento}")
    public ResponseEntity<List<Asiento>> getAsientosByTipo(@PathVariable String tipoAsiento) {
        List<Asiento> asientos = asientoRepository.findByTipoAsiento(tipoAsiento);
        return ResponseEntity.ok(asientos);
    }

    // GET - Obtener asientos por avión y tipo
    @GetMapping("/avion/{avionId}/tipo/{tipoAsiento}")
    public ResponseEntity<List<Asiento>> getAsientosByAvionAndTipo(
            @PathVariable Long avionId, @PathVariable String tipoAsiento) {
        List<Asiento> asientos = asientoRepository.findByAvionIdAndTipoAsiento(avionId, tipoAsiento);
        return ResponseEntity.ok(asientos);
    }

    // POST - Crear nuevo asiento
    @PostMapping
    public ResponseEntity<Asiento> createAsiento(@Valid @RequestBody AsientoRequest request) {
        try {
            // Validar que exista el avión
            var avion = avionRepository.findById(request.getAvionId())
                    .orElseThrow(() -> new RuntimeException("Avión no encontrado"));

            Asiento asiento = new Asiento();
            asiento.setAvion(avion);
            asiento.setNumeroAsiento(request.getNumeroAsiento());
            asiento.setTipoAsiento(request.getTipoAsiento());

            Asiento asientoGuardado = asientoRepository.save(asiento);
            return ResponseEntity.status(HttpStatus.CREATED).body(asientoGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar asiento
    @PutMapping("/{id}")
    public ResponseEntity<Asiento> updateAsiento(@PathVariable Long id, @Valid @RequestBody AsientoRequest request) {
        Optional<Asiento> asientoOpt = asientoRepository.findById(id);
        if (asientoOpt.isPresent()) {
            Asiento asiento = asientoOpt.get();
            asiento.setNumeroAsiento(request.getNumeroAsiento());
            asiento.setTipoAsiento(request.getTipoAsiento());

            Asiento asientoActualizado = asientoRepository.save(asiento);
            return ResponseEntity.ok(asientoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar asiento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAsiento(@PathVariable Long id) {
        if (asientoRepository.existsById(id)) {
            asientoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Clase interna para el request
    public static class AsientoRequest {
        private Long avionId;
        private String numeroAsiento;
        private String tipoAsiento;

        // Getters y Setters
        public Long getAvionId() { return avionId; }
        public void setAvionId(Long avionId) { this.avionId = avionId; }
        
        public String getNumeroAsiento() { return numeroAsiento; }
        public void setNumeroAsiento(String numeroAsiento) { this.numeroAsiento = numeroAsiento; }
        
        public String getTipoAsiento() { return tipoAsiento; }
        public void setTipoAsiento(String tipoAsiento) { this.tipoAsiento = tipoAsiento; }
    }
}
