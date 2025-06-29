# 🛒 MercadoLibre Challenge - Frontend

Esta es una aplicación web desarrollada en React que simula la funcionalidad de búsqueda y visualización de productos de MercadoLibre, utilizando datos mock para demostrar las capacidades de la interfaz.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)
- **Git** (para clonar el repositorio)

### Verificar instalaciones

```bash
node --version
npm --version
git --version
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd MercadoLibre_Challenge
```

### 2. Instalar dependencias del Frontend

```bash
cd mercadoLibre
npm install
```

### 3. Instalar dependencias del Backend

```bash
cd ../mercadoLibre-backend
npm install
```

## 🏃‍♂️ Cómo ejecutar la aplicación

### Opción 1: Ejecutar ambos servicios manualmente

#### Terminal 1 - Backend (API)
```bash
cd mercadoLibre-backend
node index.js
```
El backend se ejecutará en: `http://localhost:3001`

#### Terminal 2 - Frontend
```bash
cd mercadoLibre
npm run dev
```
El frontend se ejecutará en: `http://localhost:5173`

### Opción 2: Usar scripts de desarrollo (recomendado)

Puedes crear scripts personalizados en el `package.json` del frontend para ejecutar ambos servicios simultáneamente.

## 📁 Estructura del Proyecto

```
MercadoLibre_Challenge/
├── mercadoLibre/                 # Frontend React
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   ├── styles/              # Archivos SCSS
│   │   └── App.jsx              # Componente principal
│   ├── public/                  # Archivos estáticos
│   └── package.json
├── mercadoLibre-backend/         # Backend Express
│   ├── index.js                 # Servidor principal
│   └── package.json
└── Mocks/                       # Datos mock
    ├── arroz/
    ├── cafe/
    ├── camisa/
    ├── iphone/
    └── zapatillas/
```

## 🔧 Configuración Adicional

### Variables de Entorno

El backend utiliza las siguientes configuraciones por defecto:
- **Puerto**: 3001
- **CORS**: Habilitado para desarrollo local

### Endpoints de la API

- `GET /api/search/:query` - Búsqueda de productos
- `GET /api/item/:id` - Detalles de un producto específico
- `GET /api/item/:id/description` - Descripción de un producto

## ⚠️ Consideraciones Importantes

### 1. Orden de Inicio
- **Siempre inicia el backend primero** antes que el frontend
- El frontend depende de que la API esté disponible en `http://localhost:3001`

### 2. Datos Mock
- La aplicación utiliza datos mock almacenados en la carpeta `Mocks/`
- Los datos incluyen productos de diferentes categorías: arroz, café, camisas, iPhone y zapatillas
- Cada categoría tiene archivos JSON con información de productos, descripciones y categorías

### 3. Navegación
- La aplicación utiliza React Router para la navegación
- Rutas disponibles:
  - `/` - Página principal
  - `/items` - Lista de productos (con parámetros de búsqueda)
  - `/item/:id` - Detalle de producto específico

### 4. Estilos
- La aplicación utiliza **Sass/SCSS** para los estilos
- Los estilos están organizados en carpetas por componentes
- Se incluyen fuentes personalizadas (Proxima Nova)

### 5. Compatibilidad
- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Resolución mínima**: 320px (diseño responsive)

## 🛠️ Scripts Disponibles

### Frontend (`mercadoLibre/`)
```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción
npm run lint         # Ejecuta el linter
```

### Backend (`mercadoLibre-backend/`)
```bash
node index.js        # Inicia el servidor backend
```

## 🔍 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Port already in use"
```bash
# Encuentra y mata el proceso que usa el puerto
lsof -ti:3001 | xargs kill -9  # Para el backend
lsof -ti:5173 | xargs kill -9  # Para el frontend
```

### Error de CORS
- Verifica que el backend esté ejecutándose en el puerto 3001
- Asegúrate de que el frontend esté haciendo peticiones a `http://localhost:3001`

## 📱 Funcionalidades

- 🔍 **Búsqueda de productos** con filtrado en tiempo real
- 📄 **Paginación** de resultados
- 🎯 **Detalle de productos** con información completa
- 📱 **Diseño responsive** para diferentes dispositivos
- 🎨 **Interfaz moderna** siguiendo el diseño de MercadoLibre

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte del challenge de MercadoLibre y está destinado únicamente para fines educativos y de evaluación.

---

¡Disfruta explorando la aplicación! 🚀
