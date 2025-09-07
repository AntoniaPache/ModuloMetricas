package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "asientos")
public class Asiento {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asiento_id")
    private Long asientoId;
    
    @NotNull(message = "El avión es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "avion_id", nullable = false)
    private Avion avion;
    
    @NotBlank(message = "El número de asiento es obligatorio")
    @Column(name = "numero_asiento", nullable = false)
    private String numeroAsiento;
    
    @Column(name = "tipo_asiento")
    private String tipoAsiento; // Ej: "Economy", "Business", "First"
    
    @OneToMany(mappedBy = "asiento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DisponibilidadVueloAsiento> disponibilidades;
    
    @OneToMany(mappedBy = "asiento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;
    
    // Constructores
    public Asiento() {}
    
    public Asiento(Avion avion, String numeroAsiento, String tipoAsiento) {
        this.avion = avion;
        this.numeroAsiento = numeroAsiento;
        this.tipoAsiento = tipoAsiento;
    }
    
    // Getters y Setters
    public Long getAsientoId() {
        return asientoId;
    }
    
    public void setAsientoId(Long asientoId) {
        this.asientoId = asientoId;
    }
    
    public Avion getAvion() {
        return avion;
    }
    
    public void setAvion(Avion avion) {
        this.avion = avion;
    }
    
    public String getNumeroAsiento() {
        return numeroAsiento;
    }
    
    public void setNumeroAsiento(String numeroAsiento) {
        this.numeroAsiento = numeroAsiento;
    }
    
    public String getTipoAsiento() {
        return tipoAsiento;
    }
    
    public void setTipoAsiento(String tipoAsiento) {
        this.tipoAsiento = tipoAsiento;
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
