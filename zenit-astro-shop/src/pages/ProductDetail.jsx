import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/useCart";
import { getProductById } from "../services/api";

function ProductDetail() {
  // Leer ID de la URL para cargar el producto correspondiente
  const { id } = useParams();

  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Estado del producto cargado desde la API
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar el producto desde la API cuando cambia el id
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProductById(id);
        setProduct(data || null);
      } catch (err) {
        console.error("Error al cargar producto desde la API:", err);
        setError("No se pudo cargar el producto.");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [id]);

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Agregar al carrito con cantidad específica
  const handleAddToCart = () => {
    // Agrega N veces según quantity (misma lógica existente)
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Estado de carga
  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "var(--gradient-space)" }}>
        <div className="text-center">
          <div className="spinner-border text-light mb-3" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-white-50">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Estado de error o producto no encontrado
  if (error || !product) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: "var(--gradient-space)" }}>
        <div className="text-center">
          <div className="mb-3" style={{ fontSize: "4rem" }}>⚠️</div>
          <h2 className="text-white mb-3">Producto no disponible</h2>
          <p className="text-white-50 mb-4">{error || "No encontramos el producto solicitado."}</p>
          <a href="/productos" className="btn btn-outline-light">Volver a productos</a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "var(--gradient-space)" }}
    >
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href="/"
                className="text-decoration-none"
                style={{ color: "#fbbf24" }}
              >
                Inicio
              </a>
            </li>
            <li className="breadcrumb-item">
              <a
                href="/productos"
                className="text-decoration-none"
                style={{ color: "#fbbf24" }}
              >
                Productos
              </a>
            </li>
            <li className="breadcrumb-item active text-white-50">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Detalle del producto */}
        <div className="row g-5">
          {/* Columna de imagen */}
          <div className="col-lg-6">
            <div
              className="rounded-4 overflow-hidden shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                padding: "2rem",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded-3 w-100"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Columna de información */}
          <div className="col-lg-6">
            <div className="text-white">
              {/* Badge de categoría */}
              <div className="mb-3">
                {/* Badge de categoría dinámico desde la API */}
                <span
                  className="badge px-3 py-2"
                  style={{
                    background: "rgba(139, 92, 246, 0.2)",
                    border: "1px solid #8b5cf6",
                    color: "#8b5cf6",
                    borderRadius: "20px",
                  }}
                >
                  {product.category}
                </span>
              </div>

              {/* Nombre */}
              <h1 className="display-5 fw-bold mb-3">{product.name}</h1>

              {/* Precio */}
              <div className="mb-4">
                <span
                  className="display-4 fw-bold"
                  style={{ color: "#fbbf24" }}
                >
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Stock */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="badge bg-success px-3 py-2">
                    ✓ {product.stock} unidades disponibles
                  </span>
                ) : (
                  <span className="badge bg-danger px-3 py-2">Sin stock</span>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Descripción</h5>
                <p className="text-white-50 lead">{product.description}</p>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Características</h5>
                <ul className="text-white-50">
                  <li className="mb-2">✨ 16 colores LED regulables</li>
                  <li className="mb-2">🔌 Recargable vía USB</li>
                  <li className="mb-2">🎨 Impresión 3D de alta definición</li>
                  <li className="mb-2">📦 Incluye control remoto</li>
                  <li className="mb-2">🌙 Réplica lunar detallada</li>
                </ul>
              </div>

              {/* Selector de cantidad y botón */}
              <div
                className="p-4 rounded-3 mb-4"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                }}
              >
                <div className="row align-items-center g-3">
                  {/* Cantidad */}
                  <div className="col-md-4">
                    <label className="form-label text-white-50 small mb-2">
                      Cantidad
                    </label>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ width: "40px", height: "40px" }}
                      >
                        −
                      </button>
                      <span
                        className="text-white fw-bold px-3 py-2 text-center"
                        style={{
                          background: "rgba(139, 92, 246, 0.2)",
                          borderRadius: "8px",
                          minWidth: "60px",
                        }}
                      >
                        {quantity}
                      </span>
                      <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setQuantity(Math.min(product.stock || 1, quantity + 1))}
                        style={{ width: "40px", height: "40px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botón agregar */}
                  <div className="col-md-8">
                    <button
                      className="btn w-100 py-3 fw-bold"
                      onClick={handleAddToCart}
                      disabled={product.stock === 0}
                      style={{
                        background:
                          product.stock === 0
                            ? "#64748b"
                            : "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
                        border: "none",
                        color: "white",
                        borderRadius: "12px",
                        fontSize: "1.1rem",
                      }}
                    >
                      {product.stock === 0
                        ? "❌ Sin stock"
                        : "🛒 Agregar al Carrito"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Info adicional */}
              <div className="d-flex gap-4 text-white-50 small">
                <div>
                  <span className="me-2">🚚</span>
                  Envío gratis
                </div>
                <div>
                  <span className="me-2">↩️</span>
                  Devolución gratuita
                </div>
                <div>
                  <span className="me-2">✓</span>
                  Garantía 12 meses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
