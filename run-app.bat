@echo off
echo Iniciando API REST de Reserva de Vuelos...

REM Verificar si Java está instalado
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Java no está instalado o no está en el PATH
    echo Por favor instala Java 17 o superior
    pause
    exit /b 1
)

REM Verificar si Maven está instalado
mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Maven no está instalado o no está en el PATH
    echo Ejecuta install-maven.bat para instalar Maven
    pause
    exit /b 1
)

echo Compilando proyecto...
mvn clean compile

if %errorlevel% neq 0 (
    echo Error al compilar el proyecto
    pause
    exit /b 1
)

echo Iniciando aplicación...
echo La aplicación estará disponible en: http://localhost:8080
echo Consola H2: http://localhost:8080/h2-console
echo.
mvn spring-boot:run
