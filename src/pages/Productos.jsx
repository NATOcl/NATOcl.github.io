import { useProductos } from '../hooks/useProductos';
import { formatPrecio } from '../utils/carritoMock';

export function Productos() {
  const {
    tab, setTab,
    categoria, setCategoria,
    busqueda, setBusqueda,
    esServicios, categorias, filtrados,
    agregado, agregar,
    cargando, error,
  } = useProductos();

  return (
    <main className="productos-main">

      <div className="productos-encabezado">
        <span className="productos-badge">Catálogo - Veterinaria PetCare</span>
        <h1 className="productos-titulo">Productos y servicios</h1>
        <p className="productos-subtitulo">Todos los precios en pesos chilenos (CLP).</p>
      </div>

      <div className="productos-controles">
        <div className="productos-tabs">
          <button type="button" onClick={() => setTab('servicios')}
            className={`productos-tab ${esServicios ? 'is-active' : ''}`}>
            Servicios
          </button>
          <button type="button" onClick={() => setTab('medicamentos')}
            className={`productos-tab ${!esServicios ? 'is-active' : ''}`}>
            Medicamentos y Vacunas
          </button>
        </div>

        <div className="productos-busqueda">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código..."
            aria-label="Buscar productos"
          />
        </div>
      </div>

      <div className="productos-filtros">
        {categorias.map((cat) => (
          <button key={cat} type="button" onClick={() => setCategoria(cat)}
            className={`productos-filtro ${categoria === cat ? 'is-active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      {cargando && <p className="productos-subtitulo">Cargando catálogo...</p>}
      {error && <p className="productos-subtitulo">Ocurrió un error: {error}</p>}

      {!cargando && !error && (
        <div className="productos-tabla-wrap">
          <div className="productos-tabla-scroll">
            <table className="productos-tabla">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>{esServicios ? 'Servicio' : 'Producto'}</th>
                  <th>Especie</th>
                  <th>{esServicios ? 'Duración' : 'Presentación'}</th>
                  <th>Precio</th>
                  <th className="text-center">Categoría</th>
                  <th className="text-center">Agregar</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="productos-vacio">
                      No se encontraron resultados.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((p) => (
                    <tr key={p.codigo}>
                      <td className="productos-codigo productos-c-codigo">{p.codigo}</td>
                      <td className="productos-c-nombre">
                        <div className="productos-nombre">{p.nombre}</div>
                      </td>
                      <td className="productos-c-especie" data-label="Especie">{p.especie}</td>
                      <td className="productos-c-extra" data-label={esServicios ? 'Duración' : 'Presentación'}>
                        {p.duracion || p.presentacion}
                      </td>
                      <td className="productos-precio productos-c-precio">{formatPrecio(p.precio)}</td>
                      <td className="text-center productos-c-pill">
                        <span className="productos-pill">{p.categoria}</span>
                      </td>
                      <td className="text-center productos-c-accion">
                        <button
                          type="button"
                          onClick={() => agregar(p)}
                          className={`productos-btn-agregar ${agregado === p.codigo ? 'is-agregado' : ''}`}
                        >
                          {agregado === p.codigo ? 'Agregado ✓' : 'Agregar'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}