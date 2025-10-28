function NotFound() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "var(--gradient-space)" }}
    >
      <div className="text-center">
        {/* Emoji cohete gigante */}
        <div className="mb-4" style={{ fontSize: "10rem" }}>
          🚀
        </div>

        {/* Título 404 */}
        <h1
          className="display-1 fw-bold mb-3"
          style={{
            background: "linear-gradient(90deg, #fbbf24 0%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        {/* Mensaje */}
        <h2 className="text-white mb-3">¡Houston, tenemos un problema!</h2>
        <p className="text-white-50 lead mb-5">
          La página que buscas pertenece a otro multiverso
        </p>

        {/* Botón volver */}
        <a
          href="/"
          className="btn btn-lg px-5 py-3 fw-semibold"
          style={{
            background: "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
            border: "none",
            color: "white",
            borderRadius: "12px",
          }}
        >
          🏠 Volver al Inicio
        </a>
      </div>
    </div>
  );
}

export default NotFound;
