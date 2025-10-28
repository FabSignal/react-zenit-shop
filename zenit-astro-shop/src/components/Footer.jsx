import { Link } from "react-router-dom";
import logoZenit from "../assets/img/logo_zenit.png";

function Footer() {
  return (
    <footer
      className="mt-auto py-5"
      style={{
        background: "linear-gradient(180deg, #1e293b 0%, #0a0e27 100%)",
        borderTop: "1px solid rgba(139, 92, 246, 0.3)",
      }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Columna 1: Información*/}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              {/* Logo más grande (casi el doble del ícono) */}
              <img
                src={logoZenit}
                alt="Zenit logo"
                className="me-2"
                style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
              />
              <h5 className="mb-0 fw-bold" style={{ color: "#fbbf24" }}>
                ZENIT ASTRO SHOP
              </h5>
            </div>
            <p className="text-white-50 small">
              Tu destino para productos astronómicos de calidad. Desde
              telescopios profesionales hasta decoración cósmica. Todo el
              universo en tu casa.
            </p>
            <div className="d-flex gap-3 mt-3">
              {/* Íconos de redes sociales*/}
              <a
                href="#"
                className="text-white-50 fs-4"
                style={{ transition: "color 0.3s" }}
              >
                📘
              </a>
              <a
                href="#"
                className="text-white-50 fs-4"
                style={{ transition: "color 0.3s" }}
              >
                📷
              </a>
              <a
                href="#"
                className="text-white-50 fs-4"
                style={{ transition: "color 0.3s" }}
              >
                🐦
              </a>
            </div>
          </div>

          {/* Columna 2: Links rápidos */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3" style={{ color: "#8b5cf6" }}>
              Navegación
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-white-50 text-decoration-none small"
                >
                  → Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/productos"
                  className="text-white-50 text-decoration-none small"
                >
                  → Todos los productos
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/carrito"
                  className="text-white-50 text-decoration-none small"
                >
                  → Mi carrito
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/login"
                  className="text-white-50 text-decoration-none small"
                >
                  → Ingresar
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Ofertas */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3" style={{ color: "#8b5cf6" }}>
              Ofertas
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link
                  to="/ofertas"
                  className="text-white-50 text-decoration-none small"
                >
                  🔥 Ver ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Ayuda */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3" style={{ color: "#8b5cf6" }}>
              Ayuda
            </h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none small"
                >
                  Preguntas frecuentes
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none small"
                >
                  Envíos
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none small"
                >
                  Devoluciones
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#"
                  className="text-white-50 text-decoration-none small"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr
          className="my-4"
          style={{ borderColor: "rgba(139, 92, 246, 0.2)" }}
        />

        <div className="row">
          <div className="col-12 text-center">
            <p className="text-white-50 small mb-0">
              © 2025 Zenit Astro Shop. Todos los derechos reservados.
              <span className="mx-2">|</span>
              Tienda online para exploradores del universo
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
