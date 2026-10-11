import { useState } from 'react';
import { REGIONES } from '../utils/regiones.js';
import { validarRegistro, hayErrores } from '../utils/validacionesRegistro.js';

export function Registro() {
  const [datos, setDatos] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarRegistro(datos);
    setErrores(nuevosErrores);

    if (hayErrores(nuevosErrores)) return;

    // Aquí luego conectarías el mock de registro
    console.log('Registro válido:', datos);
    alert('Formulario válido ✓');
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
          <button type="submit" className="registro-button">
            REGISTRAR
          </button>

        </form>
      </div>
    </div>
  );
}