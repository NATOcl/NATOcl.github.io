import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoIcon from '../assets/favicon.svg';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const links = [
    { to: "/", label: "Inicio", end: true },
    { to: "/productos", label: "Productos" },
    { to: "/nosotros", label: "Nosotros" },
    { to: "/blogs", label: "Blogs" },
    { to: "/contacto", label: "Contacto" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (textoBusqueda.trim()) {
      // Redirige al catálogo enviando el término en la URL
      navigate(`/productos?q=${encodeURIComponent(textoBusqueda)}`);
    } else {
      navigate('/productos');
    }
  };

  return (
    <header className="navbar-header">
      <nav className="vet-nav">
        <NavLink to="/" className="navbar-logo" aria-label="Inicio">
          <img src={logoIcon} alt="Logo Veterinaria" />
        </NavLink>

        <div className={`navbar-collapse ${isOpen ? "is-open" : ""}`}>
          <div className="navbar-links">
            {links.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? "navbar-link active" : "navbar-link"
                }
                onClick={closeMenu}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="navbar-actions">
          {/* Formulario conectado al estado y a useNavigate */}
          <form onSubmit={handleSearch} className="navbar-search">
            <input
              type="text"
              placeholder="Busca un producto"
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </button>
          </form>

          <NavLink to="/carrito" className="navbar-icon-btn" aria-label="Carrito">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
          </NavLink>

          <NavLink to="/login" className="navbar-login-btn">
            Iniciar sesión
          </NavLink>

          <button
            type="button"
            className="navbar-icon-btn navbar-burger"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Abrir menú"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}