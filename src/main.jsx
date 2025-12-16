import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Context Provider
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { HelmetProvider } from "@dr.pogodin/react-helmet";

// Se importa bootstrap antes que css
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
// import "./App.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <CartProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </CartProvider>
    </HelmetProvider>
  </StrictMode>
);
