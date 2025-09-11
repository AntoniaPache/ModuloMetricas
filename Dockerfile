# Usar imagen base de OpenJDK 17
FROM openjdk:17-jdk-slim

# Establecer directorio de trabajo
WORKDIR /app

# Instalar Maven
RUN apt-get update && \
    apt-get install -y maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos de configuración de Maven
COPY pom.xml .

# Descargar dependencias (esto se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline -B

# Copiar código fuente
COPY src src

# Compilar la aplicación
RUN mvn clean package -DskipTests

# Exponer puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "target/api-reserva-vuelos-0.0.1-SNAPSHOT.jar"]
