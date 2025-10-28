import { useContext } from "react";
import { CartContext } from "./CartContext";

// Hook el carrito
export function useCart() {
  const context = useContext(CartContext);

  // Validación: si se usa fuera del Provider, mostrar error
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }

  return context;
}
