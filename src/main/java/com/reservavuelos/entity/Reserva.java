package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Entity
@Table(name = "reservas")
public class Reserva {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_reserva")
    private Long idReserva;
    
    @NotNull(message = "El vuelo es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vuelo_id", nullable = false)
    private Vuelo vuelo;
    
    @NotNull(message = "El asiento es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asiento_id", nullable = false)
    private Asiento asiento;
    
    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @NotNull(message = "El importe es obligatorio")
    @PositiveOrZero(message = "El importe debe ser positivo o cero")
    @Column(name = "importe", nullable = false)
    private Double importe;
    
    @Column(name = "fecha_reserva")
    private LocalDateTime fechaReserva;
    
    @Column(name = "estado")
    private String estado; // "Confirmada", "Cancelada", "Completada"
    
    @Column(name = "codigo_reserva")
    private String codigoReserva;
    
    // Constructores
    public Reserva() {}
    
    public Reserva(Vuelo vuelo, Asiento asiento, Usuario usuario, Double importe) {
        this.vuelo = vuelo;
        this.asiento = asiento;
        this.usuario = usuario;
        this.importe = importe;
        this.fechaReserva = LocalDateTime.now();
        this.estado = "Confirmada";
        this.codigoReserva = generarCodigoReserva();
    }
    
    private String generarCodigoReserva() {
        return "RES" + System.currentTimeMillis();
    }
    
    // Getters y Setters
    public Long getIdReserva() {
        return idReserva;
    }
    
    public void setIdReserva(Long idReserva) {
        this.idReserva = idReserva;
    }
    
    public Vuelo getVuelo() {
        return vuelo;
    }
    
    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }
    
    public Asiento getAsiento() {
        return asiento;
    }
    
    public void setAsiento(Asiento asiento) {
        this.asiento = asiento;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public Double getImporte() {
        return importe;
    }
    
    public void setImporte(Double importe) {
        this.importe = importe;
    }
    
    public LocalDateTime getFechaReserva() {
        return fechaReserva;
    }
    
    public void setFechaReserva(LocalDateTime fechaReserva) {
        this.fechaReserva = fechaReserva;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public String getCodigoReserva() {
        return codigoReserva;
    }
    
    public void setCodigoReserva(String codigoReserva) {
        this.codigoReserva = codigoReserva;
    }
}
