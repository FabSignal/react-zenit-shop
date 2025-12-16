import { FiAlertTriangle } from "react-icons/fi";

function ConfirmModal({
  show,
  title = "Confirmar acción",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  confirming = false,
}) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content" style={{ backgroundColor: "#0a0e27" }}>
          <div className="modal-header">
            <h5 className="modal-title d-flex align-items-center gap-2 text-white">
              <FiAlertTriangle className="text-warning" /> {title}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-white-50 mb-0">{message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={confirming}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
              disabled={confirming}
            >
              {confirming ? "Eliminando..." : confirmLabel}
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}

export default ConfirmModal;
