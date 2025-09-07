package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

@Entity
@Table(name = "aviones")
public class Avion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_avion")
    private Long idAvion;
    
    @NotNull(message = "La cantidad de asientos es obligatoria")
    @Positive(message = "La cantidad de asientos debe ser positiva")
    @Column(name = "cant_asientos", nullable = false)
    private Integer cantAsientos;
    
    @NotBlank(message = "La aerolínea es obligatoria")
    @Column(name = "aerolinea", nullable = false)
    private String aerolinea;
    
    @OneToMany(mappedBy = "avion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Asiento> asientos;
    
    @OneToMany(mappedBy = "avion", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Vuelo> vuelos;
    
    // Constructores
    public Avion() {}
    
    public Avion(Integer cantAsientos, String aerolinea) {
        this.cantAsientos = cantAsientos;
        this.aerolinea = aerolinea;
    }
    
    // Getters y Setters
    public Long getIdAvion() {
        return idAvion;
    }
    
    public void setIdAvion(Long idAvion) {
        this.idAvion = idAvion;
    }
    
    public Integer getCantAsientos() {
        return cantAsientos;
    }
    
    public void setCantAsientos(Integer cantAsientos) {
        this.cantAsientos = cantAsientos;
    }
    
    public String getAerolinea() {
        return aerolinea;
    }
    
    public void setAerolinea(String aerolinea) {
        this.aerolinea = aerolinea;
    }
    
    public List<Asiento> getAsientos() {
        return asientos;
    }
    
    public void setAsientos(List<Asiento> asientos) {
        this.asientos = asientos;
    }
    
    public List<Vuelo> getVuelos() {
        return vuelos;
    }
    
    public void setVuelos(List<Vuelo> vuelos) {
        this.vuelos = vuelos;
    }
}
