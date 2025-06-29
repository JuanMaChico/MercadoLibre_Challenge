# Script para ejecutar el proyecto MercadoLibre con Docker en PowerShell
# Uso: .\run-docker.ps1 [dev|prod|stop|clean]

param(
    [Parameter(Position=0)]
    [string]$Command
)

switch ($Command) {
    "dev" {
        Write-Host "🚀 Iniciando entorno de desarrollo..." -ForegroundColor Green
        docker-compose -f docker-compose.dev.yml up --build
    }
    "development" {
        Write-Host "🚀 Iniciando entorno de desarrollo..." -ForegroundColor Green
        docker-compose -f docker-compose.dev.yml up --build
    }
    "prod" {
        Write-Host "🚀 Iniciando entorno de producción..." -ForegroundColor Green
        docker-compose up --build
    }
    "production" {
        Write-Host "🚀 Iniciando entorno de producción..." -ForegroundColor Green
        docker-compose up --build
    }
    "stop" {
        Write-Host "🛑 Deteniendo todos los servicios..." -ForegroundColor Yellow
        docker-compose down
        docker-compose -f docker-compose.dev.yml down
    }
    "clean" {
        Write-Host "🧹 Limpiando contenedores e imágenes..." -ForegroundColor Red
        docker-compose down --rmi all --volumes --remove-orphans
        docker-compose -f docker-compose.dev.yml down --rmi all --volumes --remove-orphans
        docker system prune -f
    }
    "logs" {
        Write-Host "📋 Mostrando logs..." -ForegroundColor Cyan
        docker-compose logs -f
    }
    "logs-dev" {
        Write-Host "📋 Mostrando logs de desarrollo..." -ForegroundColor Cyan
        docker-compose -f docker-compose.dev.yml logs -f
    }
    "status" {
        Write-Host "📊 Estado de los contenedores:" -ForegroundColor Magenta
        docker-compose ps
        docker-compose -f docker-compose.dev.yml ps
    }
    default {
        Write-Host "❓ Uso: .\run-docker.ps1 [dev|prod|stop|clean|logs|logs-dev|status]" -ForegroundColor Red
        Write-Host ""
        Write-Host "Comandos disponibles:" -ForegroundColor White
        Write-Host "  dev, development  - Iniciar entorno de desarrollo con hot-reload" -ForegroundColor Gray
        Write-Host "  prod, production  - Iniciar entorno de producción" -ForegroundColor Gray
        Write-Host "  stop              - Detener todos los servicios" -ForegroundColor Gray
        Write-Host "  clean             - Limpiar contenedores, imágenes y volúmenes" -ForegroundColor Gray
        Write-Host "  logs              - Ver logs de producción" -ForegroundColor Gray
        Write-Host "  logs-dev          - Ver logs de desarrollo" -ForegroundColor Gray
        Write-Host "  status            - Ver estado de los contenedores" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Puertos:" -ForegroundColor White
        Write-Host "  Desarrollo: Frontend http://localhost:3000, Backend http://localhost:3001" -ForegroundColor Gray
        Write-Host "  Producción: Frontend http://localhost, Backend http://localhost:3001" -ForegroundColor Gray
        exit 1
    }
} 