import { useState } from 'react';
import { REGIONES} from "../utils/regiones";

export function Registro() {

  const [region, setRegion]   = useState('');
  const [comuna, setComuna]   = useState('');

  const comunasDisponibles = region ? REGIONES[region] : [];

  const handleRegion = (e) => {
    setRegion(e.target.value);
    setComuna(''); 
  };

  return (
    <div className="registro-page">
      <div className="registro-card">
        
        <h2 className="registro-card-title">REGISTRO DE USUARIO</h2>

        {/* Nombre */}
        <div className="registro-field">
          <label className="registro-label">NOMBRE COMPLETO</label>
          <input
            type="text"
            placeholder="Juan Troncoso Oreque"
            className="registro-input"
          />
        </div>

        {/* RUT */}
        <div className="registro-field">
          <label className="registro-label">RUT / RUN</label>
          <input
            type="text"
            placeholder="19011022K (SIN PUNTO NI GUION)"
            className="registro-input"
          />
        </div>

        {/* Correo Electrónico */}
        <div className="registro-field">
          <label className="registro-label">
            CORREO ELECTRÓNICO (@duoc.cl, @profesor.duoc.cl, @gmail.com)
          </label>
          <input
            type="email"
            placeholder="manuel.fe1iz@duoc.cl"
            className="registro-input"
          />
        </div>

        {/* Contraseña */}
        <div className="registro-field">
          <label className="registro-label">CONTRASEÑA</label>
          <input
            type="password"
            placeholder="********"
            className="registro-input"
          />
        </div>

        {/* Confirmar Contraseña */}
        <div className="registro-field">
          <label className="registro-label">CONFIRMAR CONTRASEÑA</label>
          <input
            type="password"
            placeholder="********"
            className="registro-input"
          />
        </div>

        {/* Teléfono */}
        <div className="registro-field">
          <label className="registro-label">TELÉFONO (OPCIONAL)</label>
          <input
            type="tel"
            placeholder="+56 9 1234 5678"
            className="registro-input"
          />
        </div>

        {/* Región y Comuna */}
         <div className="registro-row">
          <select
            className="registro-select"
            value={region}
            onChange={handleRegion}
          >
            <option value="">-- Seleccione la región --</option>
            {Object.keys(REGIONES).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            className="registro-select"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            disabled={!region}
          >
            <option value="">
              {region ? '-- Seleccione la comuna --' : '-- Primero elija región --'}
            </option>
            {comunasDisponibles.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button type="button" className="registro-button">
          REGISTRAR
        </button>
      </div>
    </div>
  );
}