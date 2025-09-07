# API REST - Sistema de Reserva de Vuelos

Esta es una API REST desarrollada con Spring Boot para un sistema de reserva de vuelos. La aplicación permite gestionar vuelos, asientos, usuarios, reservas y métodos de pago.

## 🚀 Características

- **Gestión de Vuelos**: Crear, consultar y buscar vuelos
- **Gestión de Asientos**: Administrar asientos por avión y tipo
- **Gestión de Usuarios**: CRUD completo de usuarios
- **Sistema de Reservas**: Crear y gestionar reservas de vuelos
- **Disponibilidad**: Consultar asientos disponibles por vuelo
- **Métodos de Pago**: Gestionar métodos de pago y datos de usuarios
- **Base de Datos H2**: Base de datos en memoria para desarrollo

## 🛠️ Tecnologías Utilizadas

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **H2 Database**
- **Maven**
- **Jakarta Validation**

## 📋 Requisitos

- Java 17 o superior
- Maven 3.6 o superior

## 🚀 Instalación y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd ModuloMetricas
   ```

2. **Compilar el proyecto**:
   ```bash
   mvn clean compile
   ```

3. **Ejecutar la aplicación**:
   ```bash
   mvn spring-boot:run
   ```

4. **Acceder a la aplicación**:
   - API REST: http://localhost:8080
   - Consola H2: http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:mem:testdb`
     - Usuario: `sa`
     - Contraseña: `password`

## 📚 Endpoints de la API

### 🛫 Vuelos (`/api/vuelos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/vuelos` | Obtener todos los vuelos |
| GET | `/api/vuelos/{id}` | Obtener vuelo por ID |
| GET | `/api/vuelos/buscar?origen=Madrid&destino=Barcelona` | Buscar vuelos por origen y destino |
| GET | `/api/vuelos/estado/{estado}` | Obtener vuelos por estado |
| POST | `/api/vuelos` | Crear nuevo vuelo |

**Ejemplo POST para crear vuelo**:
```json
{
  "fechaHora": "2024-01-15T10:30:00",
  "origenId": 1,
  "destinoId": 2,
  "avionId": 1,
  "numeroVuelo": "IB1234"
}
```

### 🎫 Reservas (`/api/reservas`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reservas` | Obtener todas las reservas |
| GET | `/api/reservas/{id}` | Obtener reserva por ID |
| GET | `/api/reservas/codigo/{codigo}` | Obtener reserva por código |
| GET | `/api/reservas/usuario/{usuarioId}` | Obtener reservas por usuario |
| GET | `/api/reservas/vuelo/{vueloId}` | Obtener reservas por vuelo |
| GET | `/api/reservas/estado/{estado}` | Obtener reservas por estado |
| POST | `/api/reservas` | Crear nueva reserva |
| PUT | `/api/reservas/{id}/cancelar` | Cancelar reserva |

**Ejemplo POST para crear reserva**:
```json
{
  "vueloId": 1,
  "asientoId": 1,
  "usuarioId": 1,
  "importe": 150.0
}
```

### 👥 Usuarios (`/api/usuarios`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| GET | `/api/usuarios/dni/{dni}` | Buscar usuario por DNI |
| GET | `/api/usuarios/email/{email}` | Buscar usuario por email |
| GET | `/api/usuarios/buscar?termino=Juan` | Buscar usuarios por término |
| POST | `/api/usuarios` | Crear nuevo usuario |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### 🏢 Lugares (`/api/lugares`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/lugares` | Obtener todos los lugares |
| GET | `/api/lugares/{id}` | Obtener lugar por ID |
| GET | `/api/lugares/nombre/{nombre}` | Buscar lugar por nombre |
| GET | `/api/lugares/buscar?termino=Madrid` | Buscar lugares por término |
| POST | `/api/lugares` | Crear nuevo lugar |
| PUT | `/api/lugares/{id}` | Actualizar lugar |
| DELETE | `/api/lugares/{id}` | Eliminar lugar |

### ✈️ Aviones (`/api/aviones`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/aviones` | Obtener todos los aviones |
| GET | `/api/aviones/{id}` | Obtener avión por ID |
| GET | `/api/aviones/aerolinea/{aerolinea}` | Obtener aviones por aerolínea |
| GET | `/api/aviones/asientos/min/{minAsientos}` | Obtener aviones por asientos mínimos |
| GET | `/api/aviones/asientos?minAsientos=100&maxAsientos=200` | Obtener aviones por rango de asientos |
| POST | `/api/aviones` | Crear nuevo avión |
| PUT | `/api/aviones/{id}` | Actualizar avión |
| DELETE | `/api/aviones/{id}` | Eliminar avión |

### 💺 Asientos (`/api/asientos`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/asientos` | Obtener todos los asientos |
| GET | `/api/asientos/{id}` | Obtener asiento por ID |
| GET | `/api/asientos/avion/{avionId}` | Obtener asientos por avión |
| GET | `/api/asientos/tipo/{tipoAsiento}` | Obtener asientos por tipo |
| GET | `/api/asientos/avion/{avionId}/tipo/{tipoAsiento}` | Obtener asientos por avión y tipo |
| POST | `/api/asientos` | Crear nuevo asiento |
| PUT | `/api/asientos/{id}` | Actualizar asiento |
| DELETE | `/api/asientos/{id}` | Eliminar asiento |

### 📋 Disponibilidad (`/api/disponibilidad`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/disponibilidad` | Obtener todas las disponibilidades |
| GET | `/api/disponibilidad/{id}` | Obtener disponibilidad por ID |
| GET | `/api/disponibilidad/vuelo/{vueloId}` | Obtener asientos disponibles por vuelo |
| GET | `/api/disponibilidad/vuelo/{vueloId}/tipo/{tipoAsiento}` | Obtener asientos disponibles por vuelo y tipo |
| GET | `/api/disponibilidad/vuelo/{vueloId}/precio?precioMin=100&precioMax=300` | Obtener asientos por rango de precio |
| GET | `/api/disponibilidad/estado/{estado}` | Obtener disponibilidades por estado |
| POST | `/api/disponibilidad` | Crear nueva disponibilidad |
| PUT | `/api/disponibilidad/{id}` | Actualizar disponibilidad |

### 💳 Métodos de Pago (`/api/metodos-pago`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/metodos-pago` | Obtener todos los métodos de pago |
| GET | `/api/metodos-pago/activos` | Obtener métodos de pago activos |
| GET | `/api/metodos-pago/{id}` | Obtener método de pago por ID |
| GET | `/api/metodos-pago/buscar?termino=tarjeta` | Buscar métodos de pago |
| POST | `/api/metodos-pago` | Crear nuevo método de pago |
| PUT | `/api/metodos-pago/{id}` | Actualizar método de pago |
| PUT | `/api/metodos-pago/{id}/desactivar` | Desactivar método de pago |
| DELETE | `/api/metodos-pago/{id}` | Eliminar método de pago |

### 💰 Datos de Pago (`/api/datos-pago`)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/datos-pago` | Obtener todos los datos de pago |
| GET | `/api/datos-pago/{id}` | Obtener datos de pago por ID |
| GET | `/api/datos-pago/usuario/{usuarioId}` | Obtener datos de pago por usuario |
| GET | `/api/datos-pago/usuario/{usuarioId}/activos` | Obtener datos de pago activos por usuario |
| POST | `/api/datos-pago` | Crear nuevos datos de pago |
| PUT | `/api/datos-pago/{id}` | Actualizar datos de pago |
| PUT | `/api/datos-pago/{id}/desactivar` | Desactivar datos de pago |
| DELETE | `/api/datos-pago/{id}` | Eliminar datos de pago |

## 🗄️ Modelo de Datos

La aplicación utiliza las siguientes entidades principales:

- **Lugar**: Aeropuertos y destinos
- **Avion**: Información de aeronaves
- **Asiento**: Asientos por avión
- **Vuelo**: Vuelos programados
- **Usuario**: Información de usuarios
- **Reserva**: Reservas de vuelos
- **DisponibilidadVueloAsiento**: Disponibilidad y precios de asientos
- **MetodoPago**: Métodos de pago disponibles
- **DatosPagoUsuario**: Datos de pago de usuarios

## 🧪 Datos de Prueba

La aplicación incluye un cargador de datos de prueba que se ejecuta automáticamente al iniciar:

- 4 lugares (Madrid, Barcelona, Valencia, Sevilla)
- 3 aviones de diferentes aerolíneas
- Asientos por avión (First, Business, Economy)
- 3 vuelos de ejemplo
- 2 usuarios de prueba
- Métodos de pago (Tarjeta, PayPal, Transferencia)
- Disponibilidades de asientos con precios

## 🔧 Configuración

### application.properties

```properties
# Base de datos H2
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.username=sa
spring.datasource.password=password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Puerto del servidor
server.port=8080
```

## 📝 Ejemplos de Uso

### Buscar vuelos disponibles
```bash
curl "http://localhost:8080/api/vuelos/buscar?origen=Madrid&destino=Barcelona"
```

### Crear una reserva
```bash
curl -X POST "http://localhost:8080/api/reservas" \
  -H "Content-Type: application/json" \
  -d '{
    "vueloId": 1,
    "asientoId": 1,
    "usuarioId": 1,
    "importe": 150.0
  }'
```

### Consultar asientos disponibles
```bash
curl "http://localhost:8080/api/disponibilidad/vuelo/1"
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio.