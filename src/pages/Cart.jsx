import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import CartItem from "../components/CartItem";

function Cart() {
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background: "var(--gradient-space)",
        }}
      >
        <div className="text-center">
          <div className="mb-4" style={{ fontSize: "8rem" }}>
            🛒
          </div>
          <h2 className="text-white mb-3">Tu carrito está vacío</h2>
          <p className="text-white-50 mb-4">
            ¡Todavía no agregaste productos! Explora nuestro catálogo.
          </p>
          <Link
            to="/productos"
            className="btn btn-lg px-5 py-3 fw-semibold"
            style={{
              background: "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
              border: "none",
              color: "white",
              borderRadius: "12px",
            }}
          >
            Ver Productos
          </Link>
        </div>
      </div>
    );
  }

  // Si hay productos en el carrito
  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "var(--gradient-space)" }}
    >
      <div className="container">
        {/* Header de la página */}
        <div className="mb-5">
          <h1 className="display-4 fw-bold text-white mb-2">🛒 Mi Carrito</h1>
          <p className="text-white-50">
            Tienes {totalItems} {totalItems === 1 ? "producto" : "productos"} en
            tu carrito
          </p>
        </div>

        <div className="row g-4">
          {/* Columna de items */}
          <div className="col-lg-8">
            {/* Mapear todos los items del carrito */}
            {cartItems.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}

            {/* Botón vaciar carrito */}
            <div className="text-end mt-3">
              <button
                className="btn btn-outline-danger px-4 py-2"
                onClick={clearCart}
                style={{ borderRadius: "10px" }}
              >
                🗑️ Vaciar Carrito
              </button>
            </div>
          </div>

          {/* Columna de resumen */}
          <div className="col-lg-4">
            <div
              className="card border-0 shadow-lg sticky-top"
              style={{
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                borderRadius: "15px",
                top: "100px",
              }}
            >
              <div className="card-body p-4">
                <h4 className="text-white fw-bold mb-4">Resumen del Pedido</h4>

                {/* Desglose */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-white-50 mb-2">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="d-flex justify-content-between text-white-50 mb-2">
                    <span>Envío</span>
                    <span className="text-success">GRATIS</span>
                  </div>
                </div>

                {/* Línea divisoria */}
                <hr style={{ borderColor: "rgba(139, 92, 246, 0.3)" }} />

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="text-white mb-0">Total</h5>
                  <h3 className="mb-0 fw-bold" style={{ color: "#fbbf24" }}>
                    {formatPrice(totalPrice)}
                  </h3>
                </div>

                {/* Botón de checkout */}
                <button
                  className="btn w-100 py-3 fw-bold mb-3"
                  style={{
                    background:
                      "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
                    border: "none",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "1.1rem",
                  }}
                >
                  🚀 Finalizar Compra
                </button>

                {/* Link para seguir comprando */}
                <Link
                  to="/productos"
                  className="btn btn-outline-light w-100 py-2"
                  style={{ borderRadius: "10px" }}
                >
                  ← Seguir Comprando
                </Link>

                {/* Info adicional */}
                <div
                  className="mt-4 p-3"
                  style={{
                    background: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "10px",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                  }}
                >
                  <small className="text-white-50">
                    ✨ <strong className="text-white">Envío gratis</strong> en
                    compras mayores a $15.000
                  </small>
                  <br />
                  <small className="text-white-50 mt-2 d-block">
                    🔒 Compra 100% segura y protegida
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
