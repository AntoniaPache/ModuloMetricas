package com.reservavuelos.controller;

import com.reservavuelos.entity.Lugar;
import com.reservavuelos.repository.LugarRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lugares")
@CrossOrigin(origins = "*")
public class LugarController {

    @Autowired
    private LugarRepository lugarRepository;

    // GET - Obtener todos los lugares
    @GetMapping
    public ResponseEntity<List<Lugar>> getAllLugares() {
        List<Lugar> lugares = lugarRepository.findAll();
        return ResponseEntity.ok(lugares);
    }

    // GET - Obtener lugar por ID
    @GetMapping("/{id}")
    public ResponseEntity<Lugar> getLugarById(@PathVariable Long id) {
        Optional<Lugar> lugar = lugarRepository.findById(id);
        return lugar.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // GET - Buscar lugar por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Lugar> getLugarByNombre(@PathVariable String nombre) {
        Optional<Lugar> lugar = lugarRepository.findByNombre(nombre);
        return lugar.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    // GET - Buscar lugares por término
    @GetMapping("/buscar")
    public ResponseEntity<List<Lugar>> buscarLugares(@RequestParam String termino) {
        List<Lugar> lugares = lugarRepository.buscarPorTermino(termino);
        return ResponseEntity.ok(lugares);
    }

    // POST - Crear nuevo lugar
    @PostMapping
    public ResponseEntity<Lugar> createLugar(@Valid @RequestBody Lugar lugar) {
        try {
            Lugar lugarGuardado = lugarRepository.save(lugar);
            return ResponseEntity.status(HttpStatus.CREATED).body(lugarGuardado);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Actualizar lugar
    @PutMapping("/{id}")
    public ResponseEntity<Lugar> updateLugar(@PathVariable Long id, @Valid @RequestBody Lugar lugarDetails) {
        Optional<Lugar> lugarOpt = lugarRepository.findById(id);
        if (lugarOpt.isPresent()) {
            Lugar lugar = lugarOpt.get();
            lugar.setNombre(lugarDetails.getNombre());
            lugar.setLatitud(lugarDetails.getLatitud());
            lugar.setLongitud(lugarDetails.getLongitud());

            Lugar lugarActualizado = lugarRepository.save(lugar);
            return ResponseEntity.ok(lugarActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    // DELETE - Eliminar lugar
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLugar(@PathVariable Long id) {
        if (lugarRepository.existsById(id)) {
            lugarRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
