package com.reservavuelos.controller;

import com.reservavuelos.entity.Reserva;
import com.reservavuelos.entity.DisponibilidadVueloAsiento;
import com.reservavuelos.repository.ReservaRepository;
import com.reservavuelos.repository.VueloRepository;
import com.reservavuelos.repository.AsientoRepository;
import com.reservavuelos.repository.UsuarioRepository;
import com.reservavuelos.repository.DisponibilidadVueloAsientoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = "*")
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
    
    @Autowired
    private VueloRepository vueloRepository;
    
    @Autowired
    private AsientoRepository asientoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private DisponibilidadVueloAsientoRepository disponibilidadRepository;

    // GET - Obtener todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> getAllReservas() {
        List<Reserva> reservas = reservaRepository.findAll();
        return ResponseEntity.ok(reservas);
    }

    // GET - Obtener reserva por ID
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        return reserva.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener reservas por código
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Reserva> getReservaByCodigo(@PathVariable String codigo) {
        Optional<Reserva> reserva = reservaRepository.findByCodigoReserva(codigo);
        return reserva.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }

    // GET - Obtener reservas por usuario
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Reserva>> getReservasByUsuario(@PathVariable Long usuarioId) {
        List<Reserva> reservas = reservaRepository.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(reservas);
    }

    // GET - Obtener reservas por vuelo
    @GetMapping("/vuelo/{vueloId}")
    public ResponseEntity<List<Reserva>> getReservasByVuelo(@PathVariable Long vueloId) {
        List<Reserva> reservas = reservaRepository.findByVueloId(vueloId);
        return ResponseEntity.ok(reservas);
    }

    // GET - Obtener reservas por estado
    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Reserva>> getReservasByEstado(@PathVariable String estado) {
        List<Reserva> reservas = reservaRepository.findByEstado(estado);
        return ResponseEntity.ok(reservas);
    }

    // POST - Crear nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> createReserva(@Valid @RequestBody ReservaRequest reservaRequest) {
        try {
            // Validar que existan el vuelo, asiento y usuario
            var vuelo = vueloRepository.findById(reservaRequest.getVueloId())
                    .orElseThrow(() -> new RuntimeException("Vuelo no encontrado"));
            var asiento = asientoRepository.findById(reservaRequest.getAsientoId())
                    .orElseThrow(() -> new RuntimeException("Asiento no encontrado"));
            var usuario = usuarioRepository.findById(reservaRequest.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Verificar disponibilidad del asiento
            List<DisponibilidadVueloAsiento> disponibilidades = 
                disponibilidadRepository.findByVueloIdAndAsientoId(vuelo.getIdVuelo(), asiento.getAsientoId());
            
            boolean asientoDisponible = disponibilidades.stream()
                .anyMatch(d -> "Disponible".equals(d.getEstado()));

            if (!asientoDisponible) {
                return ResponseEntity.badRequest().build();
            }

            // Crear la reserva
            Reserva reserva = new Reserva();
            reserva.setVuelo(vuelo);
            reserva.setAsiento(asiento);
            reserva.setUsuario(usuario);
            reserva.setImporte(reservaRequest.getImporte());
            reserva.setEstado("Confirmada");

            Reserva reservaGuardada = reservaRepository.save(reserva);

            // Actualizar disponibilidad del asiento
            disponibilidades.forEach(d -> {
                d.setEstado("Reservado");
                disponibilidadRepository.save(d);
            });

            return ResponseEntity.status(HttpStatus.CREATED).body(reservaGuardada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // PUT - Cancelar reserva
    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Reserva> cancelarReserva(@PathVariable Long id) {
        Optional<Reserva> reservaOpt = reservaRepository.findById(id);
        if (reservaOpt.isPresent()) {
            Reserva reserva = reservaOpt.get();
            reserva.setEstado("Cancelada");
            
            // Liberar el asiento
            List<DisponibilidadVueloAsiento> disponibilidades = 
                disponibilidadRepository.findByVueloIdAndAsientoId(
                    reserva.getVuelo().getIdVuelo(), 
                    reserva.getAsiento().getAsientoId());
            
            disponibilidades.forEach(d -> {
                d.setEstado("Disponible");
                disponibilidadRepository.save(d);
            });

            Reserva reservaActualizada = reservaRepository.save(reserva);
            return ResponseEntity.ok(reservaActualizada);
        }
        return ResponseEntity.notFound().build();
    }

    // Clase interna para el request
    public static class ReservaRequest {
        private Long vueloId;
        private Long asientoId;
        private Long usuarioId;
        private Double importe;

        // Getters y Setters
        public Long getVueloId() { return vueloId; }
        public void setVueloId(Long vueloId) { this.vueloId = vueloId; }
        
        public Long getAsientoId() { return asientoId; }
        public void setAsientoId(Long asientoId) { this.asientoId = asientoId; }
        
        public Long getUsuarioId() { return usuarioId; }
        public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }
        
        public Double getImporte() { return importe; }
        public void setImporte(Double importe) { this.importe = importe; }
    }
}
