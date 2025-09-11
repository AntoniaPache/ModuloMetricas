package com.reservavuelos.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long idUsuario;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Column(name = "nombre", nullable = false)
    private String nombre;
    
    @NotBlank(message = "El DNI es obligatorio")
    @Column(name = "dni", nullable = false, unique = true)
    private String dni;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "telefono")
    private String telefono;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reserva> reservas;
    
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DatosPagoUsuario> datosPago;
    
    // Constructores
    public Usuario() {}
    
    public Usuario(String nombre, String dni, String email, String telefono) {
        this.nombre = nombre;
        this.dni = dni;
        this.email = email;
        this.telefono = telefono;
    }
    
    // Getters y Setters
    public Long getIdUsuario() {
        return idUsuario;
    }
    
    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }
    
    public String getNombre() {
        return nombre;
    }
    
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    public String getDni() {
        return dni;
    }
    
    public void setDni(String dni) {
        this.dni = dni;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getTelefono() {
        return telefono;
    }
    
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    
    public List<Reserva> getReservas() {
        return reservas;
    }
    
    public void setReservas(List<Reserva> reservas) {
        this.reservas = reservas;
    }
    
    public List<DatosPagoUsuario> getDatosPago() {
        return datosPago;
    }
    
    public void setDatosPago(List<DatosPagoUsuario> datosPago) {
        this.datosPago = datosPago;
    }
}
