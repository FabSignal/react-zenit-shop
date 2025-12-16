# Zenit Astro Shop

Tienda online de productos astronómicos desarrollada con React, Vite y Bootstrap.

## Requisitos

- Node.js >= 20.0.0
- npm >= 9.0.0

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/FabSignal/react-zenit-shop.git

# Entrar al directorio
cd react-zenit-shop

# Instalar dependencias
npm install
```

## Ejecución

```bash
# Modo desarrollo
npm run dev
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://zenit-shop-api.onrender.com
```

## Rutas principales

- `/` - Página de inicio con productos destacados
- `/productos` - Catálogo completo con búsqueda y paginación
- `/producto/:id` - Detalle de producto individual
- `/carrito` - Carrito de compras (requiere autenticación)
- `/login` - Inicio de sesión
- `/ofertas` - Productos en oferta
- `/admin` - Panel de administración CRUD de productos

## Autenticación

El login es simulado. Cualquier email y contraseña son válidos para acceder.

La sesión se guarda en localStorage y persiste entre recargas de página.

## Deploy en Vercel

1. Importar el proyecto desde GitHub en Vercel
2. Configurar:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Environment Variables:** `VITE_API_URL`
3. Hacer deploy

## Tecnologías utilizadas

- React 19
- Vite 7
- React Router DOM 7
- Bootstrap 5
- styled-components
- React Icons
- React Toastify
- React Helmet

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (Navbar, ProductCard, CartItem, etc.)
├── pages/          # Páginas de rutas (Home, Products, Login, AdminProducts, etc.)
├── context/        # Contexts de estado global (AuthContext, CartContext, ProductsContext)
├── services/       # Servicios de API (api.js)
├── routes/         # Rutas protegidas (ProtectedRoute)
└── assets/         # Recursos estáticos (logo)
```

## Funcionalidades

### Carrito de compras

- Agregar productos
- Modificar cantidades
- Eliminar productos
- Vaciar carrito
- Persistencia por usuario en localStorage

### Autenticación

- Login simulado
- Rutas protegidas
- Persistencia de sesión

### CRUD de productos

- Crear nuevos productos
- Editar productos existentes
- Eliminar productos (con confirmación)
- Validación de formularios

### Búsqueda y filtrado

- Filtro por categorías
- Búsqueda en tiempo real
- Paginación de resultados

## Licencia

MIT
