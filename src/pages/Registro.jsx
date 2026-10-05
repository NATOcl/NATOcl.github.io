export function Registro() {
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
            CORREO ELECTRÓNICO (@GMAIL.COM)
          </label>
          <input
            type="email"
            defaultValue="manuel.fe1iz@duoc.cl"
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
          <select className="registro-select">
            <option>-- Seleccione la región --</option>
          </select>
          <select className="registro-select">
            <option>-- Seleccione la comuna --</option>
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