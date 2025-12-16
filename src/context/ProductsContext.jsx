import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  createProduct as apiCreateProduct,
  deleteProduct as apiDeleteProduct,
  getProducts,
  updateProduct as apiUpdateProduct,
} from "../services/api";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMutating, setIsMutating] = useState(false);

  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      const message =
        err?.message || "No se pudieron cargar los productos desde la API.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  const createProduct = useCallback(
    async (payload) => {
      setIsMutating(true);
      try {
        const created = await apiCreateProduct(payload);
        setProducts((prev) => [created, ...prev]);
        toast.success("Producto creado correctamente");
        return created;
      } catch (err) {
        const message = err?.message || "Error al crear el producto.";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsMutating(false);
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id, payload) => {
      setIsMutating(true);
      try {
        const updated = await apiUpdateProduct(id, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
        );
        toast.success("Producto actualizado");
        return updated;
      } catch (err) {
        const message = err?.message || "Error al actualizar el producto.";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsMutating(false);
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id) => {
    setIsMutating(true);
    try {
      await apiDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Producto eliminado");
    } catch (err) {
      const message = err?.message || "Error al eliminar el producto.";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsMutating(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      isMutating,
      refreshProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      loading,
      error,
      isMutating,
      refreshProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    ]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts debe usarse dentro de ProductsProvider");
  }
  return ctx;
}
