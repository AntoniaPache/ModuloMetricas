package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "datos_pago_usuarios")
public class DatosPagoUsuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_datos")
    private Long idDatos;
    
    @NotNull(message = "El usuario es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    @NotNull(message = "El método de pago es obligatorio")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "metodo_pago_id", nullable = false)
    private MetodoPago metodoPago;
    
    @NotBlank(message = "El número es obligatorio")
    @Column(name = "nro", nullable = false)
    private String nro; // Número de tarjeta, cuenta, etc.
    
    @Column(name = "titular")
    private String titular;
    
    @Column(name = "fecha_vencimiento")
    private String fechaVencimiento;
    
    @Column(name = "activo")
    private Boolean activo = true;
    
    // Constructores
    public DatosPagoUsuario() {}
    
    public DatosPagoUsuario(Usuario usuario, MetodoPago metodoPago, String nro, String titular) {
        this.usuario = usuario;
        this.metodoPago = metodoPago;
        this.nro = nro;
        this.titular = titular;
        this.activo = true;
    }
    
    // Getters y Setters
    public Long getIdDatos() {
        return idDatos;
    }
    
    public void setIdDatos(Long idDatos) {
        this.idDatos = idDatos;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }
    
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
    public MetodoPago getMetodoPago() {
        return metodoPago;
    }
    
    public void setMetodoPago(MetodoPago metodoPago) {
        this.metodoPago = metodoPago;
    }
    
    public String getNro() {
        return nro;
    }
    
    public void setNro(String nro) {
        this.nro = nro;
    }
    
    public String getTitular() {
        return titular;
    }
    
    public void setTitular(String titular) {
        this.titular = titular;
    }
    
    public String getFechaVencimiento() {
        return fechaVencimiento;
    }
    
    public void setFechaVencimiento(String fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }
    
    public Boolean getActivo() {
        return activo;
    }
    
    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
