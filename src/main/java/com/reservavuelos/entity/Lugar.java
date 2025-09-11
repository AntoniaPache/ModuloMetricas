package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "lugares")
public class Lugar {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lugar")
    private Long idLugar;
    
    @NotBlank(message = "El nombre del lugar es obligatorio")
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @NotNull(message = "La latitud es obligatoria")
    @Column(name = "latitud", nullable = false)
    private Double latitud;
    
    @NotNull(message = "La longitud es obligatoria")
    @Column(name = "longitud", nullable = false)
    private Double longitud;
    
    // Constructores
    public Lugar() {}
    
    public Lugar(String nombre, Double latitud, Double longitud) {
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
    }
    
    // Getters y Setters
    public Long getIdLugar() {
        return idLugar;
    }
    
    public void setIdLugar(Long idLugar) {
        this.idLugar = idLugar;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public Double getLatitud() {
        return latitud;
    }
    
    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }
    
    public Double getLongitud() {
        return longitud;
    }
    
    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }
}
