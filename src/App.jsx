import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Offers from "./pages/Offers";

// Páginas
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    // BrowserRouter envuelve la app y habilita el routing
    <BrowserRouter basename="/react-zenit-shop">
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar siempre visible en todas las páginas */}
        <Navbar />

        {/* Routes define qué componente mostrar según la URL */}
        <main className="flex-grow-1">
          <Routes>
            {/* Ruta exacta para home */}
            <Route path="/" element={<Home />} />

            {/* Ruta para todos los productos */}
            <Route path="/productos" element={<Products />} />

            {/* Ruta dinámica para detalle de producto */}
            <Route path="/producto/:id" element={<ProductDetail />} />

            {/* Ruta para el carrito */}
            <Route path="/carrito" element={<Cart />} />

            {/* Ruta para las ofertas */}
            <Route path="/ofertas" element={<Offers />} />

            {/* Ruta 404*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer siempre visible en todas las páginas */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
