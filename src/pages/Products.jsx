import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
// Importar funciones de la API
import { getProducts } from "../services/api";

function Products() {
  // Estados para productos y filtros
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Estados para manejo de carga y errores
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para fetch de productos al montar el componente (desde API)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Leer desde API
        const data = await getProducts();
        setProducts(data || []);

        // Extraer categorías de los productos
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        const categoriesArray = uniqueCategories.map((cat) => ({
          id: cat,
          name: cat,
          icon: getCategoryIcon(cat),
        }));
        setCategories(categoriesArray);
      } catch (err) {
        // Mostrar error
        console.error("Error al cargar productos desde la API:", err);
        setError("No se pudieron cargar los productos !!!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Array vacío: ejecuta solo al montar

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

  // Filtrar productos según categoría seleccionada
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Estado de carga
  if (isLoading) {
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
          <p className="text-white-50 mb-4">{error}</p>
          <button
            className="btn btn-outline-light"
            onClick={() => window.location.reload()}
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

        {/* Filtros por categoría */}
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

        {/* Grid de productos */}
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <div className="mb-3" style={{ fontSize: "4rem" }}>
              🔍
            </div>
            <h3 className="text-white mb-2">
              No hay productos en esta categoría
            </h3>
            <p className="text-white-50">Prueba seleccionando otra categoría</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
