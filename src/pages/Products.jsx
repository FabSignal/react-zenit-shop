import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { API_BASE_URL } from "../services/api";
import { useProducts } from "../context/ProductsContext";
import { Helmet } from "@dr.pogodin/react-helmet";

function Products() {
  const { products, loading, error, refreshProducts } = useProducts();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Función helper para asignar iconos según categoría
  const getCategoryIcon = (category) => {
    const icons = {
      Telescopios: "🔭",
      Accesorios: "🔧",
      Óptica: "👁️",
      Monturas: "⚙️",
      Astrofotografía: "📷",
      Decoración: "🪄",
      Libros: "📚",
      Posters: "🖼️",
      Indumentaria: "👕",
    };
    return icons[category] || "🌌";
  };

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];
    const categoriesArray = uniqueCategories.map((cat) => ({
      id: cat,
      name: cat,
      icon: getCategoryIcon(cat),
    }));
    setCategories(categoriesArray);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Estado de carga
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "var(--gradient-space)" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-light mb-3"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-white-50">Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ background: "var(--gradient-space)" }}
      >
        <div className="text-center">
          <div className="mb-3" style={{ fontSize: "4rem" }}>
            ⚠️
          </div>
          <h2 className="text-white mb-3">Error al cargar productos</h2>
          <p className="text-white-50 mb-2">{error}</p>
          <p className="text-white-50 small mb-4">
            Endpoint: {API_BASE_URL}/products
          </p>
          <button
            className="btn btn-outline-light"
            onClick={refreshProducts}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "var(--gradient-space)" }}
    >
      <Helmet>
        <title>Productos | Zenit Astro Shop</title>
        <meta
          name="description"
          content="Catálogo completo de productos astronómicos, telescopios y accesorios."
        />
      </Helmet>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold text-white mb-3">
            🛍️ Todos los Productos
          </h1>
          <p className="lead text-white-50">
            Explora nuestro catálogo completo de productos astronómicos
          </p>
        </div>

        <div className="mb-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por nombre o categoría..."
          />
        </div>

        <div className="mb-5">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {/* Botón "Todas" */}
            <button
              className={`btn px-4 py-2 fw-semibold ${
                selectedCategory === "all" ? "btn-primary" : "btn-outline-light"
              }`}
              onClick={() => setSelectedCategory("all")}
              style={{
                borderRadius: "25px",
                transition: "all 0.3s ease",
              }}
            >
              🌌 Todas las categorías
            </button>

            {/* Botones por categoría */}
            {categories.map((category) => (
              <button
                key={category.id}
                className={`btn px-4 py-2 fw-semibold ${
                  selectedCategory === category.id
                    ? "btn-primary"
                    : "btn-outline-light"
                }`}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  borderRadius: "25px",
                  transition: "all 0.3s ease",
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Contador de productos */}
        <div className="mb-4">
          <p className="text-white-50 text-center">
            Mostrando {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
            {selectedCategory !== "all" && (
              <span className="text-white ms-2">
                en {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
            )}
          </p>
        </div>

        <div className="row g-4">
          {paginatedProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-3" style={{ fontSize: "4rem" }}>
              🔍
            </div>
            <h3 className="text-white mb-2">No hay productos</h3>
            <p className="text-white-50">
              Prueba con otra búsqueda o categoría
            </p>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Products;
