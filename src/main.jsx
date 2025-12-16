import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Context Provider
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "@dr.pogodin/react-helmet";
import { ToastContainer } from "react-toastify";

// Se importa bootstrap antes que css
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
// import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ProductsProvider>
            <App />
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />
          </ProductsProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
