#!/bin/bash

# Script para ejecutar el proyecto MercadoLibre con Docker
# Uso: ./run-docker.sh [dev|prod|stop|clean]

set -e

case "$1" in
    "dev"|"development")
        echo "🚀 Iniciando entorno de desarrollo..."
        docker-compose -f docker-compose.dev.yml up --build
        ;;
    "prod"|"production")
        echo "🚀 Iniciando entorno de producción..."
        docker-compose up --build
        ;;
    "stop")
        echo "🛑 Deteniendo todos los servicios..."
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
        ;;
    "clean")
        echo "🧹 Limpiando contenedores e imágenes..."
        docker-compose down --rmi all --volumes --remove-orphans
        docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
        docker system prune -f
        ;;
    "logs")
        echo "📋 Mostrando logs..."
        docker-compose logs -f
        ;;
    "logs-dev")
        echo "📋 Mostrando logs de desarrollo..."
        docker-compose -f docker-compose.dev.yml logs -f
        ;;
    "status")
        echo "📊 Estado de los contenedores:"
        docker-compose ps
        docker-compose -f docker-compose.dev.yml ps
        ;;
    *)
        echo "❓ Uso: $0 [dev|prod|stop|clean|logs|logs-dev|status]"
        echo ""
        echo "Comandos disponibles:"
        echo "  dev, development  - Iniciar entorno de desarrollo con hot-reload"
        echo "  prod, production  - Iniciar entorno de producción"
        echo "  stop              - Detener todos los servicios"
        echo "  clean             - Limpiar contenedores, imágenes y volúmenes"
        echo "  logs              - Ver logs de producción"
        echo "  logs-dev          - Ver logs de desarrollo"
        echo "  status            - Ver estado de los contenedores"
        echo ""
        echo "Puertos:"
        echo "  Desarrollo: Frontend http://localhost:3000, Backend http://localhost:3001"
        echo "  Producción: Frontend http://localhost, Backend http://localhost:3001"
        exit 1
        ;;
esac 