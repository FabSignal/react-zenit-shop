/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

// createContext() crea un "espacio compartido"(contexto) donde guardar datos
// Cualquier componente puede acceder a estos datos sin pasar props
export const CartContext = createContext();

// Este componente envuelve la app y provee el estado del carrito
export function CartProvider({ children }) {
  // Estado del carrito - array de objetos
  // Cada objeto tiene: { product, quantity }
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Buscar si el producto ya existe en el carrito
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Si existe, aunmentar cantidad
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe: agregar nuevo con cantidad 1
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar del carrito
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Función para actualizar cantidad
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Si la cantidad es 0 o negativa, eliminar el producto
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Función para incrementar cantidad
  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Función para disminuir cantidad
  const decrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = item.quantity - 1;
          // Si llega a 0, mantener en 1 (no eliminar automáticamente)
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  // Función para vaciar carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Cálculos

  // Total de items (suma de todas las cantidades)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Precio total (suma de precio × cantidad de cada producto)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Todo esto estará disponible para los componentes
  const value = {
    cartItems, // Array de productos en el carrito
    addToCart, // Función para agregar
    removeFromCart, // Función para eliminar
    updateQuantity, // Función para actualizar cantidad
    incrementQuantity, // Función para aumentar
    decrementQuantity, // Función para quitar
    clearCart, // Función para vaciar
    totalItems, // Total de items
    totalPrice, // Precio total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
