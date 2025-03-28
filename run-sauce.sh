#!/bin/bash

# Archivo .env personalizado
ENV_FILE=".env.sauce"

# Verifica que el archivo exista
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Archivo $ENV_FILE no encontrado."
  exit 1
fi

# Carga las variables del archivo .env.sauce al entorno
echo "🔄 Cargando variables de entorno desde $ENV_FILE..."
export $(grep -v '^#' "$ENV_FILE" | xargs)

# Muestra las variables principales para confirmar
echo "✅ BASE_URL=$BASE_URL"
echo "✅ HEADLESS=$HEADLESS"
echo "✅ PARALLEL=$PARALLEL"
echo "✅ CI=$CI"

# Ejecuta SauceCTL con las variables cargadas
echo "🚀 Ejecutando tests en Sauce Labs con saucectl..."
saucectl run
