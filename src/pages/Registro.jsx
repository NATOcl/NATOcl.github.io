import { useState } from 'react';
import { REGIONES } from '../utils/regiones.js';
import { validarRegistro, hayErrores } from '../utils/validacionesRegistro.js';
import { api } from '../utils/api.js';
import { useNavigate } from 'react-router-dom';

export function Registro() {
  const [datos,  setDatos] = useState({
    nombre: '',
    rut: '',
    email: '',
    password: '',
    confirmacion: '',
    telefono: '',
    region: '',
    comuna: '',
  });

  const [errores, setErrores] = useState({});
  const [errorServidor, setErrorServidor] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();
  const comunasDisponibles = datos.region ? REGIONES[datos.region] : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  };

  const handleRegion = (e) => {
    const region = e.target.value;
    setDatos((prev) => ({ ...prev, region, comuna: '' }));
    setErrores((prev) => ({ ...prev, region: null, comuna: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);
    setErrorServidor('');

    if (hayErrores(nuevosErrores)) return;

    // "Nombre completo" -> nombre + apellido (el backend pide ambos)
    const partes = datos.nombre.trim().split(/\s+/);
    const nombre = partes[0];
    const apellido = partes.slice(1).join(' ') || '-';

    setEnviando(true);
    try {
      await api('/auth/register', {
        method: 'POST',
        auth: false,
        body: { email: datos.email.trim(), password: datos.password },
      });

      await api('/clientes', {
        method: 'POST',
        auth: false,
        body: {
          nombre,
          apellido,
          rut: datos.rut.trim().replace(/[.-]/g, ''),
          telefono: datos.telefono.trim(),
          email: datos.email.trim(),
          direccion: [datos.comuna, datos.region].filter(Boolean).join(', '),

        },
      });

      navigate('/login');
    } catch (err) {
      setErrorServidor(
          err.status === 409
              ? 'El correo ya está registrado.'
              : 'No se pudo completar el registro. Intenta nuevamente.'
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
      <div className="registro-page">
        <div className="registro-card">
          <h2 className="registro-card-title">REGISTRO DE USUARIO</h2>
          <form onSubmit={handleSubmit} noValidate>

            {/* Nombre */}
            <div className="registro-field">
              <label className="registro-label">NOMBRE COMPLETO</label>
              <input
                  type="text"
                  name="nombre"
                  value={datos.nombre}
                  onChange={handleChange}
                  maxLength={60}
                  placeholder="Juan Troncoso Oreque"
                  className="registro-input"
              />
              {errores.nombre && (
                  <small className="registro-error" role="alert">{errores.nombre}</small>
              )}
            </div>

            {/* RUT */}
            <div className="registro-field">
              <label className="registro-label">RUT / RUN</label>
              <input
                  type="text"
                  name="rut"
                  value={datos.rut}
                  onChange={handleChange}
                  maxLength={10}
                  placeholder="19011022K (SIN PUNTO NI GUION)"
                  className="registro-input"
              />
              {errores.rut && (
                  <small className="registro-error" role="alert">{errores.rut}</small>
              )}
            </div>

            {/* Correo */}
            <div className="registro-field">
              <label className="registro-label">
                CORREO ELECTRÓNICO (@duoc.cl, @profesor.duoc.cl, @gmail.com)
              </label>
              <input
                  type="email"
                  name="email"
                  value={datos.email}
                  onChange={handleChange}
                  placeholder="ejemplo@gmail.com"
                  className="registro-input"
              />
              {errores.email && (
                  <small className="registro-error" role="alert">{errores.email}</small>
              )}
            </div>

            {/* Contraseña */}
            <div className="registro-field">
              <label className="registro-label">CONTRASEÑA</label>
              <input
                  type="password"
                  name="password"
                  value={datos.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="registro-input"
              />
              {errores.password && (
                  <small className="registro-error" role="alert">{errores.password}</small>
              )}
            </div>

            {/* Confirmar */}
            <div className="registro-field">
              <label className="registro-label">CONFIRMAR CONTRASEÑA</label>
              <input
                  type="password"
                  name="confirmacion"
                  value={datos.confirmacion}
                  onChange={handleChange}
                  placeholder="********"
                  className="registro-input"
              />
              {errores.confirmacion && (
                  <small className="registro-error" role="alert">{errores.confirmacion}</small>
              )}
            </div>

            {/* Teléfono */}
            <div className="registro-field">
              <label className="registro-label">TELÉFONO (OPCIONAL)</label>
              <input
                  type="tel"
                  name="telefono"
                  value={datos.telefono}
                  onChange={handleChange}
                  maxLength={15}
                  placeholder="+56 9 1234 5678"
                  className="registro-input"
              />
              {errores.telefono && (
                  <small className="registro-error" role="alert">{errores.telefono}</small>
              )}
            </div>

            {/* Región y Comuna */}
            <div className="registro-row">
              <div style={{ flex: 1 }}>
                <select
                    name="region"
                    className="registro-select"
                    value={datos.region}
                    onChange={handleRegion}
                >
                  <option value="">-- Seleccione la región --</option>
                  {Object.keys(REGIONES).map((r) => (
                      <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errores.region && (
                    <small className="registro-error" role="alert">{errores.region}</small>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <select
                    name="comuna"
                    className="registro-select"
                    value={datos.comuna}
                    onChange={handleChange}
                    disabled={!datos.region}
                >
                  <option value="">
                    {datos.region ? '-- Seleccione la comuna --' : '-- Primero elija región --'}
                  </option>
                  {comunasDisponibles.map((c) => (
                      <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errores.comuna && (
                    <small className="registro-error" role="alert">{errores.comuna}</small>
                )}
              </div>
            </div>

            {/* Botón */}
            {errorServidor && (
                <small className="registro-error" role="alert">{errorServidor}</small>
            )}

            <button type="submit" className="registro-button" disabled={enviando}>
              {enviando ? 'REGISTRANDO...' : 'REGISTRAR'}
            </button>

          </form>
        </div>
      </div>
  );
}