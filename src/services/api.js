// Servicio de acceso a la API de productos

const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://zenit-shop-api.onrender.com"
).replace(/\/$/, "");

// Helper interno: fetch con timeout y manejo de errores básicos
async function fetchJson(url, options = {}) {
  // Controlador para abortar por timeout (10s)
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    if (!res.ok) {
      // Error con status para poder diagnosticar
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
    }
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

// Endpoints

// Lista completa de productos
export async function getProducts() {
  // GET /products
  return fetchJson(`${BASE_URL}/products`);
}

// Productos destacados (featured=true)
export async function getFeaturedProducts() {
  // GET /products?featured=true
  return fetchJson(`${BASE_URL}/products?featured=true`);
}

// Detalle por ID
export async function getProductById(id) {
  // GET /products/:id
  return fetchJson(`${BASE_URL}/products/${id}`);
}
