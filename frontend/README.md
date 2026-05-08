# Frontend Tienda de Videojuegos - Node.js

Frontend con Express.js que consume la API Django de la tienda de videojuegos.

## 📋 Requisitos

- Node.js 14+ 
- npm (incluido con Node.js)
- API Django ejecutándose en `http://localhost:8000/`

## 🚀 Instalación

### 1. Navegar a la carpeta del frontend

```bash
cd frontend
```

### 2. Instalar dependencias

```bash
npm install
```

## ▶️ Ejecución

### Modo producción

```bash
npm start
```

### Modo desarrollo (con auto-reinicio)

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:3000/**

## 📁 Estructura de Carpetas

```
frontend/
├── server.js           # Servidor Express
├── package.json        # Dependencias del proyecto
├── README.md          # Este archivo
└── public/            # Archivos estáticos
    ├── index.html     # Interfaz HTML
    ├── styles.css     # Estilos CSS
    └── script.js      # Lógica JavaScript
```

## 🎯 Funcionalidades

✅ **Listar** todos los videojuegos con diseño responsive  
✅ **Agregar** nuevos videojuegos mediante formulario  
✅ **Editar** videojuegos con modal interactivo  
✅ **Eliminar** videojuegos con confirmación  
✅ **Buscar** videojuegos por nombre, género o plataforma  
✅ **Interfaz moderna** con tema oscuro y gradientes  
✅ **Proxy API** para evitar problemas de CORS  

## 🔧 Dependencias

- **express** - Framework web para Node.js
- **axios** - Cliente HTTP para consumir la API Django
- **cors** - Middleware para habilitar CORS

## 📡 Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Página principal |
| GET | `/api/videojuegos` | Listar todos |
| GET | `/api/videojuegos/:id` | Obtener uno |
| POST | `/api/videojuegos` | Crear nuevo |
| PUT | `/api/videojuegos/:id` | Actualizar |
| DELETE | `/api/videojuegos/:id` | Eliminar |

## ⚙️ Configuración

El archivo `server.js` está configurado para conectarse a la API Django en:
```
http://localhost:8000/api/videojuegos/
```

Si necesitas cambiar la URL, edita esta línea en `server.js`:
```javascript
const DJANGO_API_URL = 'http://localhost:8000/api/videojuegos/';
```

## 📱 Características de Diseño

- **Tema Oscuro**: Interfaz moderna con colores oscuros y acentos en púrpura
- **Responsivo**: Se adapta a dispositivos móviles y de escritorio
- **Animaciones**: Transiciones suaves en elementos interactivos
- **Tarjetas Modernas**: Visualización clara de cada videojuego
- **Modal Interactivo**: Edición cómoda de videojuegos

## 🎨 Paleta de Colores

- **Primario**: Púrpura (`#6366f1`)
- **Secundario**: Violeta (`#8b5cf6`)
- **Peligro**: Rojo (`#ef4444`)
- **Éxito**: Verde (`#10b981`)
- **Fondo**: Azul oscuro (`#0f172a`)

## 🛠️ Solución de Problemas

### Error: "Cannot find module 'express'"
```bash
npm install
```

### Error: "ECONNREFUSED" al conectar con Django
- Verifica que el servidor Django está ejecutándose en `http://localhost:8000/`
- Revisa que el puerto no esté bloqueado

### Error: "Port 3000 already in use"
```bash
# En Windows, usa un puerto diferente:
PORT=3001 npm start

# O termina el proceso que usa puerto 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

## 📚 Recursos Adicionales

- [Documentación de Express.js](https://expressjs.com/)
- [Documentación de Axios](https://axios-http.com/)
- [Documentación de Node.js](https://nodejs.org/docs/)

## 📝 Notas Importantes

- El frontend actúa como proxy entre el cliente y la API Django
- Asegúrate de tener ambos servidores (Django y Node.js) ejecutándose
- CORS está habilitado para conexiones locales

## 👨‍💻 Autor

Desarrollado como frontend para el proyecto de examen diagnóstico.
