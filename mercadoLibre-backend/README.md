# Backend API - MercadoLibre Challenge

Este backend proporciona endpoints para buscar y obtener información de productos utilizando los archivos JSON de la carpeta Mocks.

## Endpoints Disponibles

### 1. Búsqueda de Productos
**GET** `/api/search/:query`

Busca productos en todos los archivos JSON de la carpeta Mocks que coincidan con el término de búsqueda.

**Parámetros:**
- `query` (string, requerido): Término de búsqueda

**Ejemplo de uso:**
```
GET http://localhost:3001/api/search/iphone
```

**Respuesta:**
```json
{
  "query": "iphone",
  "results": [
    {
      "id": "MLA1116621831",
      "title": "Apple iPhone 13 (128 Gb) - Azul - Distribuidor Autorizado",
      "thumbnail": "http://http2.mlstatic.com/D_619667-MLA47781882790_102021-I.jpg",
      "price": 1874999,
      "original_price": 2083333,
      "seller": {
        "nickname": "IPOINT"
      },
      "official_store_name": "Apple",
      "shipping": {
        "free_shipping": true
      }
    }
  ],
  "total": 1
}
```

### 2. Obtener Item por ID
**GET** `/api/item/:id`

Obtiene la información completa de un producto específico por su ID.

**Parámetros:**
- `id` (string, requerido): ID del producto

**Ejemplo de uso:**
```
GET http://localhost:3001/api/item/MLA1116621831
```

**Respuesta:** Información completa del producto en formato JSON.

### 3. Obtener Descripción de Item
**GET** `/api/item/:id/description`

Obtiene la descripción de un producto específico.

**Parámetros:**
- `id` (string, requerido): ID del producto

**Ejemplo de uso:**
```
GET http://localhost:3001/api/item/MLA1116621831/description
```

**Respuesta:** Descripción del producto en formato JSON.

### 4. Obtener Categoría de Item
**GET** `/api/item/:id/category`

Obtiene la información de categoría de un producto específico.

**Parámetros:**
- `id` (string, requerido): ID del producto

**Ejemplo de uso:**
```
GET http://localhost:3001/api/item/MLA1116621831/category
```

**Respuesta:** Información de categoría del producto en formato JSON.

## Estructura de Archivos

El backend busca en la siguiente estructura de archivos:

```
Mocks/
├── iphone/
│   ├── search-MLA-iphone.json
│   ├── item-MLA1116621831.json
│   ├── item-MLA1116621831-description.json
│   └── item-MLA1116621831-category.json
├── cafe/
│   ├── search-MLA-cafe.json
│   └── ...
└── ...
```

## Características

- **Búsqueda insensible a mayúsculas/minúsculas**: La búsqueda no distingue entre mayúsculas y minúsculas
- **Búsqueda parcial**: Encuentra productos que contengan el término de búsqueda en el título
- **Transformación automática**: Los resultados se transforman automáticamente al formato esperado por el frontend
- **Manejo de errores**: Incluye manejo robusto de errores con mensajes descriptivos
- **CORS habilitado**: Permite peticiones desde el frontend

## Instalación y Uso

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor:
```bash
npm start
```

3. El servidor estará disponible en `http://localhost:3001`

## Códigos de Error

- `400`: Parámetros faltantes o inválidos
- `404`: Recurso no encontrado
- `500`: Error interno del servidor 