// src/components/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import logoZenit from "../assets/img/logo_zenit.png";
import { useCart } from "../context/useCart";

function Navbar() {
  // Estado para controlar el menú hamburguesa
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Obtener cantidad de items del carrito desde context
  const { totalItems } = useCart();

  // Alterna visibilidad del menú móvil
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  // Cierra el menú
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark sticky-top"
      style={{
        background: "linear-gradient(90deg, #0a0e27 0%, #1e293b 100%)",
        boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={closeMenu}
        >
          <img
            src={logoZenit}
            alt="Zenit logo"
            className="me-2"
            style={{ width: "3.5rem", height: "3.5rem", objectFit: "contain" }}
          />
          <div>
            <span className="fw-bold" style={{ color: "#fbbf24" }}>
              ZENIT
            </span>
            <span className="text-white"> ASTRO SHOP</span>
          </div>
        </Link>

        {/* Botón hamburguesa (controlado por estado) */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="main-navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor colapsable del menú */}
        <div
          id="main-navbar"
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {/* Link: Inicio */}
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2"
                to="/"
                onClick={closeMenu}
                style={{ transition: "color 0.3s ease", color: "#f8fafc" }}
              >
                Inicio
              </Link>
            </li>

            {/* Link: Productos */}
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2"
                to="/productos"
                onClick={closeMenu}
                style={{ transition: "color 0.3s ease", color: "#f8fafc" }}
              >
                Productos
              </Link>
            </li>

            {/* Link: Ofertas*/}
            <li className="nav-item">
              <Link
                className="nav-link px-3 py-2"
                to="/ofertas"
                onClick={closeMenu}
                style={{ transition: "color 0.3s ease", color: "#f8fafc" }}
              >
                Ofertas
              </Link>
            </li>

            {/* Botón: Carrito*/}
            <li className="nav-item ms-lg-3">
              <Link
                className="btn btn-outline-warning position-relative px-4 py-2"
                to="/carrito"
                onClick={closeMenu}
                style={{
                  borderRadius: "25px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
              >
                🛒 Carrito
                {totalItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {/* Botón: Ingresar (Login)*/}
            <li className="nav-item ms-lg-2">
              <Link
                className="btn btn-outline-light px-4 py-2"
                to="/login"
                onClick={closeMenu}
                style={{
                  borderRadius: "25px",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
              >
                Ingresar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
