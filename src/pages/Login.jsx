// src/pages/Login.jsx
import { Link } from 'react-router-dom';

export function Login() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>

              <form noValidate onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico
                  </label>
                  <input type="email"id="email"className="form-control"placeholder="Ingresa tu correo"/>
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Contraseña
                  </label>
                  <input type="password"id="password"className="form-control"placeholder="Ingresa tu contraseña"/>
                </div>

                <button type="submit" className="btn btn-teal w-100">Ingresar
                </button>
              </form>

              <p className="text-center mt-3 mb-0 small">
                ¿No tienes cuenta?{' '}
                <Link to="/Registro" className="text-decoration-none fw-bold text-teal-link">
                  Regístrate aquí
                </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}