package com.reservavuelos.controller;

import com.reservavuelos.entity.MetodoPago;
import com.reservavuelos.repository.MetodoPagoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/metodos-pago")
@CrossOrigin(origins = "*")
public class MetodoPagoController {

    @Autowired
    private MetodoPagoRepository metodoPagoRepository;

    // GET - Obtener todos los métodos de pago
    @GetMapping
    public ResponseEntity<List<MetodoPago>> getAllMetodosPago() {
        List<MetodoPago> metodosPago = metodoPagoRepository.findAll();
        return ResponseEntity.ok(metodosPago);
    }

    // GET - Obtener métodos de pago activos
    @GetMapping("/activos")
    public ResponseEntity<List<MetodoPago>> getMetodosPagoActivos() {
        List<MetodoPago> metodosPago = metodoPagoRepository.findByActivoTrue();
        return ResponseEntity.ok(metodosPago);
    }

    // GET - Obtener método de pago por ID
    @GetMapping("/{id}")
    public ResponseEntity<MetodoPago> getMetodoPagoById(@PathVariable Long id) {
        Optional<MetodoPago> metodoPago = metodoPagoRepository.findById(id);
        return metodoPago.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.notFound().build());
    }

    // GET - Buscar métodos de pago por término
    @GetMapping("/buscar")
    public ResponseEntity<List<MetodoPago>> buscarMetodosPago(@RequestParam String termino) {
        List<MetodoPago> metodosPago = metodoPagoRepository.buscarMetodosActivosPorTermino(termino);
        return ResponseEntity.ok(metodosPago);
    }

    // POST - Crear nuevo método de pago
    @PostMapping
    public ResponseEntity<MetodoPago> createMetodoPago(@Valid @RequestBody MetodoPago metodoPago) {
        try {
            MetodoPago metodoPagoGuardado = metodoPagoRepository.save(metodoPago);
            return ResponseEntity.status(HttpStatus.CREATED).body(metodoPagoGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar método de pago
    @PutMapping("/{id}")
    public ResponseEntity<MetodoPago> updateMetodoPago(@PathVariable Long id, @Valid @RequestBody MetodoPago metodoPagoDetails) {
        Optional<MetodoPago> metodoPagoOpt = metodoPagoRepository.findById(id);
        if (metodoPagoOpt.isPresent()) {
            MetodoPago metodoPago = metodoPagoOpt.get();
            metodoPago.setNombre(metodoPagoDetails.getNombre());
            metodoPago.setDescripcion(metodoPagoDetails.getDescripcion());
            metodoPago.setActivo(metodoPagoDetails.getActivo());

            MetodoPago metodoPagoActualizado = metodoPagoRepository.save(metodoPago);
            return ResponseEntity.ok(metodoPagoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // PUT - Desactivar método de pago
    @PutMapping("/{id}/desactivar")
    public ResponseEntity<MetodoPago> desactivarMetodoPago(@PathVariable Long id) {
        Optional<MetodoPago> metodoPagoOpt = metodoPagoRepository.findById(id);
        if (metodoPagoOpt.isPresent()) {
            MetodoPago metodoPago = metodoPagoOpt.get();
            metodoPago.setActivo(false);

            MetodoPago metodoPagoActualizado = metodoPagoRepository.save(metodoPago);
            return ResponseEntity.ok(metodoPagoActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar método de pago
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMetodoPago(@PathVariable Long id) {
        if (metodoPagoRepository.existsById(id)) {
            metodoPagoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
