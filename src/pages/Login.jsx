import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarLogin } from '../utils/validacioneslogin'
import { api } from '../utils/api'

export function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }))
    }
    if (authError) {
      setAuthError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validarLogin(formData)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      const { token, email, rol } = await api('/auth/login', {
        method: 'POST',
        auth: false,
        body: { email: formData.email, password: formData.password },
      })

      const role = String(rol || '').toLowerCase()
      localStorage.setItem('petcare_session', JSON.stringify({ token, email, role }))

      if (role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/productos')
      }
    } catch (err) {
      setAuthError(
          err.status === 401
              ? 'Correo electrónico o contraseña incorrectos.'
              : 'No se pudo conectar con el servidor. Intenta nuevamente.'
      )
    }
  }
  return (
      <div className="login-page-wrapper d-flex align-items-center justify-content-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-6 col-lg-4">
              <div className="card card-login">
                <div className="card-body p-4 p-sm-5">
                  <h2 className="text-center mb-4 fw-bold">Iniciar Sesión</h2>

                  {authError && (
                      <div className="alert alert-danger py-2 text-center small mb-4" role="alert">
                        {authError}
                      </div>
                  )}

                  <form noValidate onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label fw-medium">
                        Correo Electrónico
                      </label>
                      <input
                          type="email"
                          id="email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="manuelfeliz@duoc.cl"
                          value={formData.email}
                          onChange={handleChange}
                      />
                      {errors.email && (
                          <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="mb-4">
                      <label htmlFor="password" className="form-label fw-medium">
                        Contraseña
                      </label>
                      <input
                          type="password"
                          id="password"
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          placeholder="Ingresa tu contraseña"
                          value={formData.password}
                          onChange={handleChange}
                      />
                      {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-teal w-100 fw-bold py-2">
                      Ingresar
                    </button>
                  </form>
                  <p className="text-center mt-4 mb-0 small text-muted">
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
      </div>
  )
}