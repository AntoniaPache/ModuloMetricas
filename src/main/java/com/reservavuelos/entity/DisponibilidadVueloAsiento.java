package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "disponibilidad_vuelo_asiento")
public class DisponibilidadVueloAsiento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @NotNull(message = "El asiento es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asiento_id", nullable = false)
    private Asiento asiento;
    
    @NotNull(message = "El vuelo es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vuelo_id", nullable = false)
    private Vuelo vuelo;
    
    @NotNull(message = "El estado es obligatorio")
    @Column(name = "estado", nullable = false)
    private String estado; // "Disponible", "Reservado", "Ocupado"
    
    @NotNull(message = "El precio es obligatorio")
    @PositiveOrZero(message = "El precio debe ser positivo o cero")
    @Column(name = "precio", nullable = false)
    private Double precio;
    
    // Constructores
    public DisponibilidadVueloAsiento() {}
    
    public DisponibilidadVueloAsiento(Asiento asiento, Vuelo vuelo, String estado, Double precio) {
        this.asiento = asiento;
        this.vuelo = vuelo;
        this.estado = estado;
        this.precio = precio;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Asiento getAsiento() {
        return asiento;
    }
    
    public void setAsiento(Asiento asiento) {
        this.asiento = asiento;
    }
    
    public Vuelo getVuelo() {
        return vuelo;
    }
    
    public void setVuelo(Vuelo vuelo) {
        this.vuelo = vuelo;
    }
    
    public String getEstado() {
        return estado;
    }
    
    public void setEstado(String estado) {
        this.estado = estado;
    }
    
    public Double getPrecio() {
        return precio;
    }
    
    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
