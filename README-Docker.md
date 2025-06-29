# Dockerización del Proyecto MercadoLibre

Este proyecto ha sido dockerizado para facilitar el despliegue y desarrollo. Incluye tanto el frontend (React) como el backend (Node.js/Express).

## 🐳 Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Docker Compose (incluido con Docker Desktop)

## 🚀 Inicio Rápido

### Opción 1: Usar Docker Compose (Recomendado)

1. **Clonar el repositorio y navegar al directorio:**
   ```bash
   cd MercadoLibre_Challenge
   ```

2. **Construir y ejecutar todos los servicios:**
   ```bash
   docker-compose up --build
   ```

3. **Acceder a las aplicaciones:**
   - Frontend: http://localhost
   - Backend API: http://localhost:3001

### Opción 2: Construir Contenedores Individualmente

#### Backend
```bash
cd mercadoLibre-backend
docker build -t mercadolibre-backend .
docker run -p 3001:3001 -v $(pwd)/../Mocks:/app/Mocks:ro mercadolibre-backend
```

#### Frontend
```bash
cd mercadoLibre
docker build -t mercadolibre-frontend .
docker run -p 80:80 mercadolibre-frontend
```

## 📁 Estructura de Archivos Docker

```
MercadoLibre_Challenge/
├── docker-compose.yml          # Orquestación de servicios
├── mercadoLibre/
│   ├── Dockerfile              # Configuración del frontend
│   ├── nginx.conf              # Configuración de nginx
│   └── .dockerignore           # Archivos a ignorar
├── mercadoLibre-backend/
│   ├── Dockerfile              # Configuración del backend
│   └── .dockerignore           # Archivos a ignorar
└── Mocks/                      # Datos mock (montados como volumen)
```

## 🔧 Comandos Útiles

### Docker Compose
```bash
# Construir y ejecutar en segundo plano
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir un servicio específico
docker-compose up --build backend

# Ver estado de los servicios
docker-compose ps
```

### Docker Individual
```bash
# Ver contenedores ejecutándose
docker ps

# Ver logs de un contenedor
docker logs mercadolibre-backend

# Ejecutar comandos dentro del contenedor
docker exec -it mercadolibre-backend sh

# Detener contenedores
docker stop mercadolibre-backend mercadolibre-frontend
```

## 🌐 Puertos

- **Frontend**: Puerto 80 (http://localhost)
- **Backend**: Puerto 3001 (http://localhost:3001)

## 📊 Volúmenes

- Los archivos mock están montados como volumen de solo lectura en el backend
- Los archivos estáticos del frontend se sirven desde nginx

## 🔍 Troubleshooting

### Problemas Comunes

1. **Puerto 80 ocupado:**
   ```bash
   # Cambiar el puerto en docker-compose.yml
   ports:
     - "8080:80"  # Usar puerto 8080 en lugar de 80
   ```

2. **Error de permisos en Windows:**
   - Asegúrate de que Docker Desktop tenga permisos para acceder a las unidades

3. **Contenedor no se inicia:**
   ```bash
   # Ver logs detallados
   docker-compose logs backend
   docker-compose logs frontend
   ```

4. **Problemas de red:**
   ```bash
   # Limpiar redes de Docker
   docker network prune
   ```

## 🛠️ Desarrollo

### Modo Desarrollo con Docker

Para desarrollo, puedes usar volúmenes para hot-reload:

```yaml
# En docker-compose.yml, agregar para desarrollo:
volumes:
  - ./mercadoLibre/src:/app/src
  - ./mercadoLibre/public:/app/public
```

### Variables de Entorno

Puedes crear un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
REACT_APP_API_URL=http://localhost:3001
```

## 📝 Notas Importantes

- El frontend usa nginx para servir archivos estáticos
- El backend accede a los archivos mock a través de un volumen
- Los contenedores se reinician automáticamente a menos que se detengan manualmente
- La red interna permite comunicación entre frontend y backend

## 🚀 Despliegue en Producción

Para producción, considera:

1. Usar variables de entorno para configuraciones
2. Configurar HTTPS con certificados SSL
3. Implementar health checks
4. Configurar logs centralizados
5. Usar un reverse proxy como Traefik o nginx

```bash
# Ejemplo para producción
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
``` 