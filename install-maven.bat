@echo off
echo Instalando Maven...

REM Descargar Maven
echo Descargando Maven...
powershell -Command "Invoke-WebRequest -Uri 'https://dlcdn.apache.org/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip' -OutFile 'maven.zip'"

REM Extraer Maven
echo Extrayendo Maven...
powershell -Command "Expand-Archive -Path 'maven.zip' -DestinationPath '.' -Force"

REM Configurar variables de entorno
echo Configurando variables de entorno...
setx MAVEN_HOME "%cd%\apache-maven-3.9.6"
setx PATH "%PATH%;%MAVEN_HOME%\bin"

REM Limpiar archivo temporal
del maven.zip

echo Maven instalado correctamente!
echo Por favor, reinicia la terminal para que los cambios surtan efecto.
pause
