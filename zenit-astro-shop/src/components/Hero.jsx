import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero-section position-relative overflow-hidden"
      style={{
        minHeight: "600px",
        background:
          "linear-gradient(135deg, #0a0e27 0%, #1e293b 50%, #334155 100%)",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Contenido principal */}
      <div className="container position-relative">
        <div className="row align-items-center">
          {/* Columna de texto */}
          <div className="col-12 col-lg-8 text-white mb-5 mb-lg-0 text-start">
            {/* Texto superior (sin recuadro) */}
            <div className="mb-4">
              {/* Se conserva solo el texto y su color original */}
              <span className="fs-6" style={{ color: "#8b5cf6" }}>
                ✨ Bienvenidos a Zenit
              </span>
            </div>

            {/* Título principal */}
            <h1
              className="display-3 fw-bold mb-4"
              style={{
                lineHeight: "1.1",
                background: "linear-gradient(90deg, #fbbf24 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                // Ajuste sutil de posición del título principal
                // (acerca el título hacia arriba sin mover los botones)
                marginTop: "-8px",
              }}
            >
              Todo el universo, un solo lugar
            </h1>

            <p
              className="lead mb-4 text-white-50"
              style={{ fontSize: "1.2rem" }}
            >
              Descubre nuestra colección curada de productos astronómicos: desde
              telescopios profesionales hasta decoración cósmica que
              transformará tu espacio.
            </p>

            <div className="mb-5">
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ color: "#fbbf24" }}>
                  ⭐
                </span>
                <span className="text-white-50">Envíos a todo el país</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <span className="me-2" style={{ color: "#fbbf24" }}>
                  ⭐
                </span>
                <span className="text-white-50">Garantía de satisfacción</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#fbbf24" }}>
                  ⭐
                </span>
                <span className="text-white-50">Asesoramiento experto</span>
              </div>
            </div>
          </div>

          {/* Fila separada para centrar los botones en todo el ancho del hero */}
          <div className="col-12 mt-3">
            <div className="row g-3 justify-content-center">
              <div className="col-12 col-md-6 col-lg-4">
                <Link
                  to="/productos"
                  className="btn btn-lg px-5 py-3 fw-semibold w-100"
                  style={{
                    background:
                      "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)",
                    border: "none",
                    color: "white",
                    borderRadius: "12px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                  Explorar Catálogo
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <a
                  href="#featured"
                  className="btn btn-outline-light btn-lg px-5 py-3 fw-semibold w-100"
                  style={{
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("featured");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  Productos Destacados
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Onda decorativa en la parte inferior */}
      <div
        className="position-absolute bottom-0 start-0 w-100"
        style={{
          height: "100px",
          background: "linear-gradient(180deg, transparent 0%, #0a0e27 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

export default Hero;
