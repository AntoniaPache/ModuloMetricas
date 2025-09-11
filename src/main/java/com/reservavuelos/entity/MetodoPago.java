package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "metodos_pago")
public class MetodoPago {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metodo_pago_id")
    private Long metodoPagoId;
    
    @NotBlank(message = "El nombre del método de pago es obligatorio")
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @Column(name = "descripcion")
    private String descripcion;
    
    @Column(name = "activo")
    private Boolean activo = true;
    
    @OneToMany(mappedBy = "metodoPago", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DatosPagoUsuario> datosPagoUsuarios;
    
    // Constructores
    public MetodoPago() {}
    
    public MetodoPago(String nombre, String descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.activo = true;
    }
    
    // Getters y Setters
    public Long getMetodoPagoId() {
        return metodoPagoId;
    }
    
    public void setMetodoPagoId(Long metodoPagoId) {
        this.metodoPagoId = metodoPagoId;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDescripcion() {
        return descripcion;
    }
    
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    
    public Boolean getActivo() {
        return activo;
    }
    
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
    
    public List<DatosPagoUsuario> getDatosPagoUsuarios() {
        return datosPagoUsuarios;
    }
    
    public void setDatosPagoUsuarios(List<DatosPagoUsuario> datosPagoUsuarios) {
        this.datosPagoUsuarios = datosPagoUsuarios;
    }
}
