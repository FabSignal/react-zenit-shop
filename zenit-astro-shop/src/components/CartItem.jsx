import { useCart } from "../context/useCart";

function CartItem({ item }) {
  // Extraer funciones del carrito
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  // Destructuring del item
  const { product, quantity } = item;

  // Formatear precio
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calcular subtotal (precio × cantidad)
  const subtotal = product.price * quantity;

  return (
    <div
      className="card mb-3 border-0 shadow-sm"
      style={{
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div className="row g-0">
        {/* Columna de imagen */}
        <div className="col-md-3">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100 h-100 object-fit-cover"
            style={{ minHeight: "150px", maxHeight: "200px" }}
          />
        </div>

        {/* Columna de información */}
        <div className="col-md-9">
          <div className="card-body d-flex flex-column h-100 p-4">
            <div className="row align-items-center">
              {/* Nombre y descripción */}
              <div className="col-md-5">
                <h5 className="text-white fw-bold mb-2">{product.name}</h5>
                <p className="text-white-50 small mb-0">
                  {product.description.substring(0, 80)}...
                </p>
              </div>

              {/* Precio unitario */}
              <div className="col-md-2 text-center">
                <small className="text-white-50 d-block mb-1">Precio</small>
                <span className="text-white fw-semibold">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Controles de cantidad */}
              <div className="col-md-3 text-center">
                <small className="text-white-50 d-block mb-2">Cantidad</small>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {/* Botón quitar */}
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => decrementQuantity(product.id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    −
                  </button>

                  {/* Cantidad actual */}
                  <span
                    className="text-white fw-bold px-3 py-1"
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      borderRadius: "8px",
                      minWidth: "50px",
                      textAlign: "center",
                    }}
                  >
                    {quantity}
                  </span>

                  {/* Botón agregar*/}
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => incrementQuantity(product.id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal y eliminar */}
              <div className="col-md-2 text-center">
                <small className="text-white-50 d-block mb-1">Subtotal</small>
                <div className="fw-bold mb-2" style={{ color: "#fbbf24" }}>
                  {formatPrice(subtotal)}
                </div>

                {/* Botón eliminar */}
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
