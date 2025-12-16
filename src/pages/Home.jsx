import { useMemo } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";

import { API_BASE_URL } from "../services/api";
import { useProducts } from "../context/ProductsContext";

function Home() {
  const { products, loading, error, refreshProducts } = useProducts();

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    [products]
  );

  // Estado de carga de destacados
  if (loading) {
    return (
      <section
        className="py-5"
        id="featured"
        style={{ background: "var(--gradient-space)" }}
      >
        <div className="container d-flex justify-content-center py-5">
          <div className="text-center">
            <div
              className="spinner-border text-light mb-3"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="text-white-50">Cargando destacados...</p>
          </div>
        </div>
      </section>
    );
  }

  // Estado de error de destacados
  if (error) {
    return (
      <section
        className="py-5"
        id="featured"
        style={{ background: "var(--gradient-space)" }}
      >
        <div className="container d-flex justify-content-center py-5">
          <div className="text-center">
          <div className="mb-3" style={{ fontSize: "4rem" }}>
            ⚠️
          </div>
          <h2 className="text-white mb-3">Error al cargar destacados</h2>
          <p className="text-white-50 mb-2">{error}</p>
          <p className="text-white-50 small mb-4">
            Endpoint: {API_BASE_URL}/products?featured=true
          </p>
          <button
            className="btn btn-outline-light"
            onClick={refreshProducts}
          >
            Reintentar
          </button>
        </div>
      </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Sección de productos destacados */}
      <section
        className="py-5"
        id="featured"
        style={{
          background: "var(--gradient-space)",
        }}
      >
        <div className="container">
          {/* Encabezado de sección */}
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-white mb-3">
              Productos Destacados
            </h2>
            <p className="lead text-white-50 mb-4">
              Nuestra selección premium para entusiastas del cosmos
            </p>
            <div
              className="mx-auto"
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(90deg, #fbbf24 0%, #8b5cf6 100%)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Grilla de productos destacados */}
          <div className="row g-4 mb-5">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/productos"
              className="btn btn-lg px-5 py-3 fw-semibold"
              style={{
                background: "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
                border: "none",
                color: "white",
                borderRadius: "12px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Ver Todos los Productos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
