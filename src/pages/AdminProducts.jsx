import { useEffect, useMemo, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { FiEdit, FiPlus, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";
import { useProducts } from "../context/ProductsContext";
import styled from "styled-components";

const initialForm = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
  featured: false,
};

const Panel = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  height: 100%;
`;

function AdminProducts() {
  const {
    products,
    loading,
    error,
    isMutating,
    refreshProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  const [formData, setFormData] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!loading && !products.length) {
      refreshProducts();
    }
  }, [loading, products.length, refreshProducts]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "El nombre es obligatorio";
    if (!formData.description.trim() || formData.description.length < 10) {
      errors.description = "La descripción debe tener al menos 10 caracteres";
    }
    const price = Number(formData.price);
    if (!price || price <= 0) errors.price = "El precio debe ser mayor a 0";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);
    if (Object.keys(errors).length) {
      toast.error("Revisa los campos del formulario");
      return;
    }
    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock) || 0,
    };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      setFormData(initialForm);
      setEditingId(null);
    } catch (err) {
      // El toast ya se muestra en el contexto
      console.error("Error en submit", err);
    }
  };

  const startEdit = (product) => {
    setFormData({
      name: product.name || "",
      description: product.description || "",
      price: product.price ?? "",
      image: product.image || "",
      category: product.category || "",
      stock: product.stock ?? "",
      featured: !!product.featured,
    });
    setEditingId(product.id);
    setFormErrors({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setFormErrors({});
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProduct(deleteTarget.id);
    } catch (err) {
      console.error("Error al eliminar", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  const featuredCount = useMemo(
    () => products.filter((p) => p.featured).length,
    [products]
  );

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "var(--gradient-space)" }}
    >
      <Helmet>
        <title>Admin Productos | Zenit Astro Shop</title>
      </Helmet>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h1 className="text-white fw-bold mb-2">Admin de Productos</h1>
            <p className="text-white-50 mb-0">
              Crear, editar y eliminar productos del catálogo.
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-light d-flex align-items-center gap-2"
              onClick={refreshProducts}
              disabled={loading}
              aria-label="Actualizar listado"
            >
              <FiRefreshCw /> Actualizar
            </button>
            <button
              className="btn btn-success d-flex align-items-center gap-2"
              onClick={cancelEdit}
              aria-label="Nuevo producto"
            >
              <FiPlus /> Nuevo
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <Panel className="p-4">
              <h4 className="text-white mb-3">
                {editingId ? "Editar producto" : "Crear producto"}
              </h4>
              <form onSubmit={handleSubmit} className="needs-validation">
                <div className="mb-3">
                  <label className="form-label text-white-50">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      formErrors.name ? "is-invalid" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nombre del producto"
                  />
                  {formErrors.name && (
                    <div className="invalid-feedback">{formErrors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50">Precio</label>
                  <input
                    type="number"
                    name="price"
                    className={`form-control ${
                      formErrors.price ? "is-invalid" : ""
                    }`}
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                  {formErrors.price && (
                    <div className="invalid-feedback">{formErrors.price}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50">Descripción</label>
                  <textarea
                    name="description"
                    className={`form-control ${
                      formErrors.description ? "is-invalid" : ""
                    }`}
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe el producto"
                  />
                  {formErrors.description && (
                    <div className="invalid-feedback">
                      {formErrors.description}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50">
                    URL de imagen
                  </label>
                  <input
                    type="url"
                    name="image"
                    className="form-control"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50">Categoría</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Categoría"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-white-50">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1"
                  />
                </div>

                <div className="form-check form-switch mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="featuredSwitch"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label text-white-50"
                    htmlFor="featuredSwitch"
                  >
                    Producto destacado
                  </label>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isMutating}
                  >
                    {isMutating
                      ? "Guardando..."
                      : editingId
                      ? "Guardar cambios"
                      : "Crear producto"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      className="btn btn-outline-light"
                      onClick={cancelEdit}
                      disabled={isMutating}
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </Panel>
          </div>

          <div className="col-12 col-lg-7">
            <Panel className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-white mb-0">Listado</h4>
                <span className="badge bg-warning text-dark">
                  Destacados: {featuredCount}
                </span>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-light mb-3"
                    role="status"
                  />
                  <p className="text-white-50 mb-0">Cargando productos...</p>
                </div>
              ) : products.length === 0 ? (
                <p className="text-white-50">No hay productos disponibles.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-dark table-striped align-middle">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Destacado</th>
                        <th style={{ width: "160px" }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>${product.price}</td>
                          <td>{product.stock ?? "-"}</td>
                          <td>{product.featured ? "Sí" : "No"}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-sm btn-outline-light d-flex align-items-center gap-1"
                                onClick={() => startEdit(product)}
                                disabled={isMutating}
                                aria-label={`Editar ${product.name}`}
                              >
                                <FiEdit /> Editar
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                onClick={() => setDeleteTarget(product)}
                                disabled={isMutating}
                                aria-label={`Eliminar ${product.name}`}
                              >
                                <FiTrash2 /> Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Panel>
          </div>
        </div>
      </div>

      <ConfirmModal
        show={!!deleteTarget}
        title="Confirmar eliminación"
        message={`¿Seguro quieres eliminar "${deleteTarget?.name}"?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        confirming={isMutating}
        confirmLabel="Eliminar"
      />
    </div>
  );
}

export default AdminProducts;
