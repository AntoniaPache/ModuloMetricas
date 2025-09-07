package com.reservavuelos.config;

import com.reservavuelos.entity.*;
import com.reservavuelos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private LugarRepository lugarRepository;
    
    @Autowired
    private AvionRepository avionRepository;
    
    @Autowired
    private AsientoRepository asientoRepository;
    
    @Autowired
    private VueloRepository vueloRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private MetodoPagoRepository metodoPagoRepository;
    
    @Autowired
    private DatosPagoUsuarioRepository datosPagoRepository;
    
    @Autowired
    private DisponibilidadVueloAsientoRepository disponibilidadRepository;

    @Override
    public void run(String... args) throws Exception {
        // Cargar datos de prueba solo si no existen
        if (lugarRepository.count() == 0) {
            cargarDatosPrueba();
        }
    }

    private void cargarDatosPrueba() {
        // Crear lugares
        Lugar madrid = new Lugar("Madrid", 40.4168, -3.7038);
        Lugar barcelona = new Lugar("Barcelona", 41.3851, 2.1734);
        Lugar valencia = new Lugar("Valencia", 39.4699, -0.3763);
        Lugar sevilla = new Lugar("Sevilla", 37.3891, -5.9845);
        
        lugarRepository.saveAll(Arrays.asList(madrid, barcelona, valencia, sevilla));

        // Crear aviones
        Avion avion1 = new Avion(150, "Iberia");
        Avion avion2 = new Avion(200, "Vueling");
        Avion avion3 = new Avion(120, "Air Europa");
        
        avionRepository.saveAll(Arrays.asList(avion1, avion2, avion3));

        // Crear asientos para cada avión
        crearAsientosParaAvion(avion1, 150);
        crearAsientosParaAvion(avion2, 200);
        crearAsientosParaAvion(avion3, 120);

        // Crear vuelos
        Vuelo vuelo1 = new Vuelo(LocalDateTime.now().plusDays(1), madrid, barcelona, avion1, "IB1234");
        Vuelo vuelo2 = new Vuelo(LocalDateTime.now().plusDays(2), barcelona, valencia, avion2, "VY5678");
        Vuelo vuelo3 = new Vuelo(LocalDateTime.now().plusDays(3), valencia, sevilla, avion3, "UX9012");
        
        vueloRepository.saveAll(Arrays.asList(vuelo1, vuelo2, vuelo3));

        // Crear usuarios
        Usuario usuario1 = new Usuario("Juan Pérez", "12345678A", "juan@email.com", "600123456");
        Usuario usuario2 = new Usuario("María García", "87654321B", "maria@email.com", "600654321");
        
        usuarioRepository.saveAll(Arrays.asList(usuario1, usuario2));

        // Crear métodos de pago
        MetodoPago tarjeta = new MetodoPago("Tarjeta de Crédito", "Pago con tarjeta de crédito");
        MetodoPago paypal = new MetodoPago("PayPal", "Pago a través de PayPal");
        MetodoPago transferencia = new MetodoPago("Transferencia Bancaria", "Transferencia bancaria");
        
        metodoPagoRepository.saveAll(Arrays.asList(tarjeta, paypal, transferencia));

        // Crear datos de pago para usuarios
        DatosPagoUsuario datosPago1 = new DatosPagoUsuario(usuario1, tarjeta, "1234567890123456", "Juan Pérez");
        DatosPagoUsuario datosPago2 = new DatosPagoUsuario(usuario2, paypal, "maria@email.com", "María García");
        
        datosPagoRepository.saveAll(Arrays.asList(datosPago1, datosPago2));

        // Crear disponibilidades de asientos para vuelos
        crearDisponibilidadesParaVuelo(vuelo1);
        crearDisponibilidadesParaVuelo(vuelo2);
        crearDisponibilidadesParaVuelo(vuelo3);
    }

    private void crearAsientosParaAvion(Avion avion, int cantidadAsientos) {
        for (int i = 1; i <= cantidadAsientos; i++) {
            String tipoAsiento;
            if (i <= 10) {
                tipoAsiento = "First";
            } else if (i <= 30) {
                tipoAsiento = "Business";
            } else {
                tipoAsiento = "Economy";
            }
            
            Asiento asiento = new Asiento(avion, String.valueOf(i), tipoAsiento);
            asientoRepository.save(asiento);
        }
    }

    private void crearDisponibilidadesParaVuelo(Vuelo vuelo) {
        var asientos = asientoRepository.findByAvionId(vuelo.getAvion().getIdAvion());
        
        for (Asiento asiento : asientos) {
            Double precio;
            switch (asiento.getTipoAsiento()) {
                case "First":
                    precio = 500.0;
                    break;
                case "Business":
                    precio = 300.0;
                    break;
                default:
                    precio = 150.0;
                    break;
            }
            
            DisponibilidadVueloAsiento disponibilidad = new DisponibilidadVueloAsiento(
                asiento, vuelo, "Disponible", precio);
            disponibilidadRepository.save(disponibilidad);
        }
    }
}
