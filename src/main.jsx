import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Context Provider
import { CartProvider } from "./context/CartContext";

// Se importa bootstrap antes que css
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
// import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
