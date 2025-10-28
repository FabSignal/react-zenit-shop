import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function ProductCard({ product }) {
  // Acceder a las funciones del carrito
  const { addToCart } = useCart();

  // Función para formatear precio en pesos argentinos
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Handler para agregar al carrito
  const handleAddToCart = () => {
    addToCart(product);
    // Feedback visual (opcional): podrías agregar un toast/notification aquí
    console.log("✅ Producto agregado al carrito:", product.name);
  };

  return (
    <div className="product-card h-100">
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
          borderRadius: "15px",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Badge de stock bajo (si quedan menos de 5) */}
        {product.stock < 5 && product.stock > 0 && (
          <div className="position-absolute top-0 end-0 m-3 z-index-1">
            <span className="badge bg-warning text-dark">
              ¡Últimas {product.stock} unidades!
            </span>
          </div>
        )}

        {/* Badge de sin stock */}
        {product.stock === 0 && (
          <div className="position-absolute top-0 end-0 m-3 z-index-1">
            <span className="badge bg-danger">Sin stock</span>
          </div>
        )}

        {/* Imagen del producto */}
        <Link to={`/producto/${product.id}`} className="text-decoration-none text-white">
          <div
            className="position-relative overflow-hidden"
            style={{ height: "250px" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="card-img-top w-100 h-100 object-fit-cover"
              style={{
                transition: "transform 0.5s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            />
          </div>
        </Link>

        {/* Cuerpo de la card */}
        <div className="card-body d-flex flex-column">
          {/* Nombre del producto */}
          <Link to={`/producto/${product.id}`} className="text-decoration-none">
            <h5
              className="card-title text-white fw-bold mb-2"
              style={{
                fontSize: "1.1rem",
                minHeight: "2.5rem",
              }}
            >
              {product.name}
            </h5>
          </Link>

          {/* Descripción truncada */}
          <p
            className="card-text text-white-50 small mb-3"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "2.5rem",
            }}
          >
            {product.description}
          </p>

          {/* Precio */}
          <div className="mt-auto">
            <p className="mb-3">
              <span className="fs-4 fw-bold" style={{ color: "#fbbf24" }}>
                {formatPrice(product.price)}
              </span>
            </p>

            {/* Botón agregar al carrito */}
            <button
              className="btn w-100 py-2 fw-semibold"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              style={{
                background:
                  product.stock === 0
                    ? "#64748b"
                    : "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
                border: "none",
                color: "white",
                borderRadius: "10px",
                transition: "all 0.3s ease",
                cursor: product.stock === 0 ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (product.stock > 0) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 20px rgba(139, 92, 246, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              {product.stock === 0 ? "❌ Sin stock" : "🛒 Agregar al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
