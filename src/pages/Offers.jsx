import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Offers() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (!mounted) return;
        // Se usa featured (en api)
        setItems(data.filter((p) => p.featured === true));
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error al cargar ofertas");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading)
    return (
      <div className="container py-5 text-white-50">Cargando ofertas…</div>
    );
  if (error)
    return <div className="container py-5 text-danger">Error: {error}</div>;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-white mb-3">🔥 Ofertas</h1>
        <p className="lead text-white-50">
          Explora nuestras mejores promociones y descuentos
        </p>
      </div>
      <div className="row g-4">
        {items.length ? (
          items.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={p} />
            </div>
          ))
        ) : (
          <div className="col-12 text-white-50">
            No hay ofertas disponibles.
          </div>
        )}
      </div>
    </div>
  );
}
