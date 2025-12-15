# Entrega Final — React Zenit Shop

**Documento de requerimientos + checklist de implementación (para Codex/Claude Code)**

## 0) Rol, objetivo y restricciones

**Rol del asistente (Codex/Claude Code):** Senior Full-Stack Engineer (React + Vite + React Router + UX + Deploy).
**Objetivo:** Implementar todos los requerimientos #1 a #5 de la consigna, con foco en funcionamiento, manejo de estados (loading/error), UX (toasts/modales), responsividad y despliegue.

**Restricciones:**

- Cambios mínimos de UI: priorizar funcionalidad y consistencia.
- Evitar dependencias innecesarias.
- Código modular y mantenible: contexts, services, components reutilizables.
- Sin “parches” frágiles: rutas protegidas bien resueltas, errores visibles al usuario, validaciones completas.

---

## 1) Requerimiento #1 — Gestión del Carrito y Autenticación

### 1.1 Carrito de compras con Context API

**Objetivo:** Estado global del carrito con Context API.

**Requisitos funcionales:**

- Crear/usar `CartContext` para gestionar productos agregados.
- Acciones:

  - `addToCart(product)`
  - `removeFromCart(productId)` (o decremento si manejás cantidad)
  - `clearCart()`

- Mantener estado global con Context API y persistencia opcional (recomendado) en `localStorage`.

**Criterios de aceptación (AC):**

- Desde el listado/detalle se puede **agregar** un producto al carrito.
- En el carrito se puede **eliminar** un producto.
- Se puede **vaciar** el carrito completo.
- El estado del carrito se mantiene consistente entre páginas (y si se reinicia, se recupera si hay persistencia).

### 1.2 Autenticación de usuarios

**Objetivo:** Restringir acceso a secciones privadas mediante autenticación simulada.

**Requisitos funcionales:**

- Crear `AuthContext` con estado global:

  - `isAuthenticated`
  - `user` (mínimo: `{ email }` o `{ username }`)
  - `login(credentials)`
  - `logout()`

- Login simulado con `localStorage`:

  - Guardar un token simulado o flag (ej. `auth_token` / `isAuth=true`).
  - Restaurar sesión al iniciar la app.

**Rutas protegidas:**

- Restringir acceso al **carrito** y otras secciones privadas (ej. panel CRUD si aplica) usando un componente `ProtectedRoute`.
- Si no está autenticado:

  - Redirigir a `/login` (o abrir modal/login page).
  - Guardar `from` para volver tras login (recomendado).

**AC:**

- Si el usuario intenta ir a `/carrito` sin login → redirige a `/login`.
- Tras login correcto → vuelve a la página solicitada o a Home.
- Logout limpia `localStorage` y revoca acceso a rutas privadas.

---

## 2) Requerimiento #2 — CRUD de productos con MockAPI

### 2.1 Lectura de productos (GET) con estados

**Objetivo:** Catálogo basado en MockAPI con manejo robusto de estados.

**Requisitos técnicos:**

- Crear `productsService` (o `api.js`) para:

  - `getProducts()`
  - `createProduct(payload)`
  - `updateProduct(id, payload)`
  - `deleteProduct(id)`

- Manejar estados:

  - `loading` (spinner/skeleton)
  - `error` (mensaje visible en pantalla + toast)

**AC:**

- Si la API falla → se muestra error en UI (no solo consola).
- Mientras carga → se muestra estado de carga.

### 2.2 Formulario para agregar productos (POST)

**Objetivo:** Alta de productos con formulario controlado.

**Requisitos del formulario:**

- Controlado con `useState`.
- Validaciones:

  - `nombre` obligatorio
  - `precio` > 0
  - `descripción` mínimo 10 caracteres
  - (si hay categoría/imagen, validar formato mínimo)

- Enviar POST a MockAPI.
- Mostrar:

  - Éxito → toast de éxito + reset del form
  - Error → toast de error + mensaje visible

**AC:**

- No se permite enviar si hay errores de validación.
- Envío correcto crea producto en MockAPI y lo refleja en UI sin refrescar (optimista o refetch).

### 2.3 Edición y eliminación (PUT/PATCH + DELETE)

**Edición:**

- Permitir editar desde el catálogo o panel admin.
- Precargar datos en formulario.
- Guardar con PUT/PATCH en MockAPI.
- Confirmar éxito con toast.

**Eliminación:**

- Botón “Eliminar” con **modal de confirmación** antes de borrar.
- Si confirma → DELETE a MockAPI → actualizar UI.

**AC:**

- Editar actualiza datos persistentes (MockAPI).
- Eliminar exige confirmación modal.
- Errores de API muestran feedback claro.

### 2.4 Uso de Context API para productos (recomendado)

**Objetivo:** Compartir estado y acciones del catálogo.

**Propuesta:**

- `ProductsContext` (opcional pero recomendado si el CRUD está distribuido en varias páginas):

  - `products`, `loading`, `error`
  - `refreshProducts`, `create`, `update`, `remove`

---

## 3) Requerimiento #3 — Diseño, responsividad, UX, SEO y accesibilidad

### 3.1 Bootstrap + styled-components

**Objetivo:** Diseño responsivo y estilos modulares.

**Requisitos:**

- Usar grilla Bootstrap (`container`, `row`, `col-*`) en:

  - Home/Products/Listado/Detail/Cart/Login/Admin

- Usar `styled-components` para:

  - Componentes reutilizables (Cards, Buttons, Containers)
  - Ajustes de estilo sin CSS global excesivo

**AC:**

- Vista correcta en mobile/tablet/desktop.
- No hay desbordes horizontales ni layouts rotos.

### 3.2 React Icons + React Toastify

**Objetivo:** Interactividad y feedback al usuario.

**Requisitos:**

- Incorporar iconos en acciones clave:

  - agregar al carrito, eliminar, editar, volver, login/logout

- React Toastify:

  - toast de éxito/error para CRUD, login/logout, acciones del carrito.

**AC:**

- Cada acción importante produce feedback (toast).
- Errores de API y validación son visibles.

### 3.3 React Helmet (SEO)

**Objetivo:** Mejorar SEO básico.

**Requisitos:**

- Usar `react-helmet` o `react-helmet-async`:

  - Cambiar `<title>` por página (Home, Productos, Detalle, Carrito, Login, Admin)
  - Agregar `<meta name="description">` relevante por ruta

**AC:**

- Navegar entre páginas actualiza el title correctamente.

### 3.4 Accesibilidad (ARIA)

**Objetivo:** Mejorar accesibilidad de elementos interactivos.

**Requisitos:**

- Botones e iconos con `aria-label` cuando no haya texto visible.
- Inputs con `label` asociado.
- Modal de confirmación accesible (focus, roles si aplica).
- Evitar `<a href="/ruta">` para navegación interna: usar `<Link>`.

**AC:**

- Navegación con teclado funciona sin perder foco.
- Icon buttons tienen `aria-label`.

---

## 4) Requerimiento #4 — Búsqueda y paginación

### 4.1 Barra de búsqueda (filtro por nombre/categoría)

**Objetivo:** Filtrar productos en tiempo real.

**Requisitos:**

- Input controlado (`searchTerm`).
- Filtrar por:

  - `name` / `nombre`
  - `category` / `categoría`

- Mostrar resultados conforme escribe (onChange).
- Optimización mínima:

  - `useMemo` para lista filtrada
  - (opcional) `debounce` liviano si lista es grande

**AC:**

- Filtra sin recargar página.
- Si no hay resultados → estado vacío claro.

### 4.2 Paginador

**Objetivo:** Dividir catálogo en páginas.

**Requisitos:**

- Definir `pageSize` (ej. 8 o 12).
- Estado `currentPage`.
- Botones prev/next + números (si aplica).
- Integración con búsqueda:

  - Si cambia searchTerm → volver a page 1

**AC:**

- Se puede navegar por páginas sin bugs.
- No muestra páginas vacías por un mal cálculo.

---

## 5) Requerimiento #5 — Preparación para despliegue

### 5.1 Pruebas de compatibilidad

**Checklist:**

- Mobile (≤ 480px): navbar, cards, carrito, formularios.
- Tablet (768px): grillas correctas.
- Desktop (≥ 1024px): layout amplio estable.
- Flujo completo:

  1. Login
  2. Navegar productos
  3. Buscar + paginar
  4. Agregar al carrito
  5. Entrar al carrito (protegido)
  6. CRUD (si está en ruta privada/admin)

### 5.2 Optimización del código

**Checklist técnico:**

- Remover código muerto y componentes no usados.
- Centralizar llamadas a API en `services/`.
- Contexts no deben re-renderizar todo innecesariamente (memoización básica si hace falta).
- Evitar `<a>` internas; usar React Router.

### 5.3 Documentación básica (README.md)

**Debe incluir:**

- Requisitos: Node + npm
- Instalación: `npm install`
- Ejecución: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`
- Variables de entorno:

  - `VITE_API_URL=...` (MockAPI endpoint)

- Rutas principales:

  - `/productos`, `/producto/:id`, `/carrito`, `/login`, `/admin` (si aplica)

- Deploy Vercel:

  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Env Vars: `VITE_API_URL`

---

## 6) Orden recomendado de implementación (para terminar “a full” rápido)

**P0 (bloqueante / core):**

1. AuthContext + login localStorage + ProtectedRoute
2. Proteger `/carrito` (y `/admin` si existe)
3. CRUD mínimo con MockAPI (GET + POST + PUT/PATCH + DELETE) con loading/error + toasts
4. Reemplazar navegación interna `<a>` → `<Link>` para evitar recargas y 404
5. Búsqueda + paginación en catálogo

**P1 (mejora fuerte):** 6) Modal confirmación delete 7) Bootstrap grid + styled-components en pantallas clave 8) React Helmet por ruta 9) ARIA labels y labels en forms

---

## 7) Entregables concretos (archivos esperados)

**Estructura sugerida:**

- `src/contexts/AuthContext.jsx`
- `src/contexts/CartContext.jsx` (si ya existe, ajustarlo)
- `src/contexts/ProductsContext.jsx` (opcional recomendado)
- `src/routes/ProtectedRoute.jsx`
- `src/services/productsService.js` (o ampliar `api.js`)
- `src/pages/Login.jsx`
- `src/pages/AdminProducts.jsx` (si el CRUD se separa)
- `src/components/ProductForm.jsx`
- `src/components/ConfirmModal.jsx`
- `src/components/SearchBar.jsx`
- `src/components/Pagination.jsx`
- `README.md` actualizado

---

## 8) Definición de “Listo para entregar”

Se considera **completo** cuando:

- Carrito funciona (add/remove/clear) y está protegido por auth.
- Login simulado funciona y persiste.
- CRUD completo en MockAPI con validaciones + errores + confirmación delete.
- Búsqueda en vivo + paginación funcionan juntas.
- UI responsiva con Bootstrap + estilos modulares con styled-components.
- Notificaciones con React Toastify para acciones y errores.
- Helmet cambia title/meta por ruta.
- Accesibilidad mínima aplicada (ARIA/labels).
- README actualizado con instalación/uso/deploy.

---

Si querés, te escribo **un segundo documento “modo ejecución”** para Codex (tipo “hacé estos commits en este orden con estos archivos”) para que lo siga como receta y no se disperse.
