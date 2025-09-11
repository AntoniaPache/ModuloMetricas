package com.reservavuelos.controller;

import com.reservavuelos.entity.DatosPagoUsuario;
import com.reservavuelos.repository.DatosPagoUsuarioRepository;
import com.reservavuelos.repository.UsuarioRepository;
import com.reservavuelos.repository.MetodoPagoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/datos-pago")
@CrossOrigin(origins = "*")
public class DatosPagoUsuarioController {

    @Autowired
    private DatosPagoUsuarioRepository datosPagoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    // GET - Obtener todos los datos de pago
    @GetMapping
    public ResponseEntity<List<DatosPagoUsuario>> getAllDatosPago() {
        List<DatosPagoUsuario> datosPago = datosPagoRepository.findAll();
        return ResponseEntity.ok(datosPago);
    }

    // GET - Obtener datos de pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<DatosPagoUsuario> getDatosPagoById(@PathVariable Long id) {
        Optional<DatosPagoUsuario> datosPago = datosPagoRepository.findById(id);
        return datosPago.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener datos de pago por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<DatosPagoUsuario>> getDatosPagoByUsuario(@PathVariable Long usuarioId) {
        List<DatosPagoUsuario> datosPago = datosPagoRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(datosPago);
    }

    // GET - Obtener datos de pago activos por usuario
    @GetMapping("/usuario/{usuarioId}/activos")
    public ResponseEntity<List<DatosPagoUsuario>> getDatosPagoActivosByUsuario(@PathVariable Long usuarioId) {
        List<DatosPagoUsuario> datosPago = datosPagoRepository.findDatosPagoActivosPorUsuario(usuarioId);
        return ResponseEntity.ok(datosPago);
    }

    // POST - Crear nuevos datos de pago
    @PostMapping
    public ResponseEntity<DatosPagoUsuario> createDatosPago(@Valid @RequestBody DatosPagoRequest request) {
        try {
            // Validar que existan el usuario y método de pago
            var usuario = usuarioRepository.findById(request.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            var metodoPago = metodoPagoRepository.findById(request.getMetodoPagoId())
                    .orElseThrow(() -> new RuntimeException("Método de pago no encontrado"));

            DatosPagoUsuario datosPago = new DatosPagoUsuario();
            datosPago.setUsuario(usuario);
            datosPago.setMetodoPago(metodoPago);
            datosPago.setNro(request.getNro());
            datosPago.setTitular(request.getTitular());
            datosPago.setFechaVencimiento(request.getFechaVencimiento());
            datosPago.setActivo(true);

            DatosPagoUsuario datosPagoGuardados = datosPagoRepository.save(datosPago);
            return ResponseEntity.status(HttpStatus.CREATED).body(datosPagoGuardados);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar datos de pago
    @PutMapping("/{id}")
    public ResponseEntity<DatosPagoUsuario> updateDatosPago(@PathVariable Long id, @Valid @RequestBody DatosPagoRequest request) {
        Optional<DatosPagoUsuario> datosPagoOpt = datosPagoRepository.findById(id);
        if (datosPagoOpt.isPresent()) {
            DatosPagoUsuario datosPago = datosPagoOpt.get();
            datosPago.setNro(request.getNro());
            datosPago.setTitular(request.getTitular());
            datosPago.setFechaVencimiento(request.getFechaVencimiento());

            DatosPagoUsuario datosPagoActualizados = datosPagoRepository.save(datosPago);
            return ResponseEntity.ok(datosPagoActualizados);
        }
        return ResponseEntity.notFound().build();
    }

    // PUT - Desactivar datos de pago
    @PutMapping("/{id}/desactivar")
    public ResponseEntity<DatosPagoUsuario> desactivarDatosPago(@PathVariable Long id) {
        Optional<DatosPagoUsuario> datosPagoOpt = datosPagoRepository.findById(id);
        if (datosPagoOpt.isPresent()) {
            DatosPagoUsuario datosPago = datosPagoOpt.get();
            datosPago.setActivo(false);

            DatosPagoUsuario datosPagoActualizados = datosPagoRepository.save(datosPago);
            return ResponseEntity.ok(datosPagoActualizados);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar datos de pago
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDatosPago(@PathVariable Long id) {
        if (datosPagoRepository.existsById(id)) {
            datosPagoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Clase interna para el request
    public static class DatosPagoRequest {
        private Long usuarioId;
        private Long metodoPagoId;
        private String nro;
        private String titular;
        private String fechaVencimiento;

        // Getters y Setters
        public Long getUsuarioId() { return usuarioId; }
        public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
        
        public Long getMetodoPagoId() { return metodoPagoId; }
        public void setMetodoPagoId(Long metodoPagoId) { this.metodoPagoId = metodoPagoId; }
        
        public String getNro() { return nro; }
        public void setNro(String nro) { this.nro = nro; }
        
        public String getTitular() { return titular; }
        public void setTitular(String titular) { this.titular = titular; }
        
        public String getFechaVencimiento() { return fechaVencimiento; }
        public void setFechaVencimiento(String fechaVencimiento) { this.fechaVencimiento = fechaVencimiento; }
    }
}
