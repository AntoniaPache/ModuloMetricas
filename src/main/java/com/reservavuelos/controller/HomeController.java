package com.reservavuelos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "API REST - Sistema de Reserva de Vuelos");
        response.put("version", "1.0.0");
        response.put("status", "running");
        response.put("endpoints", Map.of(
            "vuelos", "/api/vuelos",
            "usuarios", "/api/usuarios",
            "lugares", "/api/lugares",
            "aviones", "/api/aviones",
            "reservas", "/api/reservas",
            "disponibilidad", "/api/disponibilidad",
            "asientos", "/api/asientos",
            "metodos-pago", "/api/metodos-pago",
            "datos-pago", "/api/datos-pago"
        ));
        return response;
    }
}
