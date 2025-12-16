// Servicio de acceso a la API de productos

const DEFAULT_API_URL = "https://zenit-shop-api.onrender.com";
const envApiUrl = (import.meta.env.VITE_API_URL || "").trim();
const BASE_URL = (envApiUrl || DEFAULT_API_URL).replace(/\/$/, "");

export const API_BASE_URL = BASE_URL;

async function fetchJson(url, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
      signal: controller.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} ${res.statusText} en ${url} - ${text}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`Error en fetch ${url}`, err);
    throw err;
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

// Crear producto
export async function createProduct(payload) {
  return fetchJson(`${BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// Actualizar producto
export async function updateProduct(id, payload) {
  return fetchJson(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

// Eliminar producto
export async function deleteProduct(id) {
  return fetchJson(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
}
