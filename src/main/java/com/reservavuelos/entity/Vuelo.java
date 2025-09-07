package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vuelos")
public class Vuelo {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vuelo")
    private Long idVuelo;
    
    @NotNull(message = "La fecha y hora son obligatorias")
    @Column(name = "fecha_hora", nullable = false)
    private LocalDateTime fechaHora;
    
    @NotNull(message = "El origen es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "origen_id", nullable = false)
    private Lugar origen;
    
    @NotNull(message = "El destino es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destino_id", nullable = false)
    private Lugar destino;
    
    @NotNull(message = "El avión es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avion_id", nullable = false)
    private Avion avion;
    
    @Column(name = "numero_vuelo")
    private String numeroVuelo;
    
    @Column(name = "estado")
    private String estado; // Ej: "Programado", "En Vuelo", "Completado", "Cancelado"
    
    @OneToMany(mappedBy = "vuelo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DisponibilidadVueloAsiento> disponibilidades;
    
    @OneToMany(mappedBy = "vuelo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;
    
    // Constructores
    public Vuelo() {}
    
    public Vuelo(LocalDateTime fechaHora, Lugar origen, Lugar destino, Avion avion, String numeroVuelo) {
        this.fechaHora = fechaHora;
        this.origen = origen;
        this.destino = destino;
        this.avion = avion;
        this.numeroVuelo = numeroVuelo;
        this.estado = "Programado";
    }
    
    // Getters y Setters
    public Long getIdVuelo() {
        return idVuelo;
    }
    
    public void setIdVuelo(Long idVuelo) {
        this.idVuelo = idVuelo;
    }
    
    public LocalDateTime getFechaHora() {
        return fechaHora;
    }
    
    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }
    
    public Lugar getOrigen() {
        return origen;
    }
    
    public void setOrigen(Lugar origen) {
        this.origen = origen;
    }
    
    public Lugar getDestino() {
        return destino;
    }
    
    public void setDestino(Lugar destino) {
        this.destino = destino;
    }
    
    public Avion getAvion() {
        return avion;
    }
    
    public void setAvion(Avion avion) {
        this.avion = avion;
    }
    
    public String getNumeroVuelo() {
        return numeroVuelo;
    }
    
    public void setNumeroVuelo(String numeroVuelo) {
        this.numeroVuelo = numeroVuelo;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public List<DisponibilidadVueloAsiento> getDisponibilidades() {
        return disponibilidades;
    }
    
    public void setDisponibilidades(List<DisponibilidadVueloAsiento> disponibilidades) {
        this.disponibilidades = disponibilidades;
    }
    
    public List<Reserva> getReservas() {
        return reservas;
    }
    
    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }
}
