import { useState, useMemo, useEffect } from 'react';


const servicios = [
  { codigo: 'SV001', nombre: 'Consulta General',   especie: 'Perro / Gato / Aves', duracion: '30 Min', precio: 15000, categoria: 'Consultas' },
  { codigo: 'SV002', nombre: 'Consulta Urgencias', especie: 'Perro / Gato / Aves', duracion: '30 Min', precio: 25000, categoria: 'Consultas' },
  { codigo: 'VA001', nombre: 'Vacuna antirrábica canina', especie: 'Perro', duracion: '10 Min', precio: 12000, categoria: 'Vacunación' },
  { codigo: 'VA002', nombre: 'Vacuna séxtuple canina',    especie: 'Perro', duracion: '10 Min', precio: 17000, categoria: 'Vacunación' },
  { codigo: 'CR001', nombre: 'Esterilización / Castración canina', especie: 'Perro', duracion: '60 Min', precio: 50000, categoria: 'Cirugía' },
  { codigo: 'CR002', nombre: 'Esterilización / Castración felina', especie: 'Gato',  duracion: '45 Min', precio: 45000, categoria: 'Cirugía' },
  { codigo: 'DP001', nombre: 'Desparasitación interna', especie: 'Perro / Gato', duracion: '8 Min', precio: 8000,  categoria: 'Desparasitación' },
  { codigo: 'DP002', nombre: 'Desparasitación externa', especie: 'Perro / Gato', duracion: '8 Min', precio: 15000, categoria: 'Desparasitación' },
  { codigo: 'EX001', nombre: 'Hemograma completo',         especie: 'Perro / Gato', duracion: '30 Min', precio: 16000, categoria: 'Exámenes' },
  { codigo: 'EX002', nombre: 'Perfil bioquímico completo', especie: 'Perro / Gato', duracion: '30 Min', precio: 22000, categoria: 'Exámenes' },
  { codigo: 'OT001', nombre: 'Implante de Microchip de identificación', especie: 'Perro / Gato', duracion: '10 Min', precio: 13000, categoria: 'Otros' },
  { codigo: 'OT002', nombre: 'Corte de uñas y limpieza de oídos',       especie: 'Perro / Gato', duracion: '20 Min', precio: 17000, categoria: 'Otros' },
];

const medicamentos = [
  { codigo: 'ME001', nombre: 'Metrobay 250mg', especie: 'Perro / Gato', presentacion: 'Blíster 10 comp.', precio: 2200, categoria: 'Antibióticos' },
  { codigo: 'ME002', nombre: 'Enrox 50mg',     especie: 'Perro / Gato', presentacion: 'Blíster 10 comp.', precio: 4200, categoria: 'Antibióticos' },
  { codigo: 'MA001', nombre: 'Drontal Plus',   especie: 'Perro / Gato', presentacion: 'Blíster 2 comp.',  precio: 3500,  categoria: 'Antiparasitarios' },
  { codigo: 'MA002', nombre: 'Bravecto',       especie: 'Perro',        presentacion: 'Comprimido',       precio: 12000, categoria: 'Antiparasitarios' },
  { codigo: 'MC001', nombre: 'Kapkan 20mg',    especie: 'Perro / Gato', presentacion: 'Blíster 8 comp.',  precio: 3200, categoria: 'Antiinflamatorios' },
  { codigo: 'MC002', nombre: 'Meloxicam 5mg',  especie: 'Perro / Gato', presentacion: 'Frasco 10ml',      precio: 6800, categoria: 'Antiinflamatorios' },
];

const CATEGORIAS_SERVICIOS    = ['Todos', 'Consultas', 'Vacunación', 'Cirugía', 'Desparasitación', 'Exámenes', 'Otros'];
const CATEGORIAS_MEDICAMENTOS = ['Todos', 'Antibióticos', 'Antiparasitarios', 'Antiinflamatorios'];

export function Productos() {
  const [tab, setTab]             = useState('servicios');
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda]   = useState('');

  useEffect(() => { setCategoria('Todos'); }, [tab]);

  const esServicios = tab === 'servicios';
  const categorias  = esServicios ? CATEGORIAS_SERVICIOS : CATEGORIAS_MEDICAMENTOS;
  const data        = esServicios ? servicios : medicamentos;

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return data.filter((p) => {
      const okCat = categoria === 'Todos' || p.categoria === categoria;
      const okBus = q === '' ||
        p.nombre.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q);
      return okCat && okBus;
    });
  }, [data, categoria, busqueda]);

  const agregarAlCarrito = (producto) => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const existente = carrito.find((i) => i.codigo === producto.codigo);
    if (existente) existente.cantidad = Math.min(existente.cantidad + 1, 50);
    else carrito.push({ ...producto, cantidad: 1 });
    localStorage.setItem('carrito', JSON.stringify(carrito));
  };

  const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;

  return (
    <main className="productos-main">

      <div className="productos-encabezado">
        <span className="productos-badge">Catálogo - Veterinaria PetCare</span>
        <h1 className="productos-titulo">Productos y servicios</h1>
        <p className="productos-subtitulo">Todos los precios en pesos chilenos (CLP).</p>
      </div>

      <div className="productos-controles">
        <div className="productos-tabs">
          <button
            type="button"
            onClick={() => setTab('servicios')}
            className={`productos-tab ${esServicios ? 'is-active' : ''}`}
          >
            Servicios
            <span className="productos-tab-badge">{servicios.length}</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('medicamentos')}
            className={`productos-tab ${!esServicios ? 'is-active' : ''}`}
          >
            Medicamentos y Vacunas
            <span className="productos-tab-badge">{medicamentos.length}</span>
          </button>
        </div>

        <div className="productos-busqueda">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o código..."
          />
        </div>
      </div>

      <div className="productos-filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoria(cat)}
            className={`productos-filtro ${categoria === cat ? 'is-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

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
                    <td className="productos-codigo">{p.codigo}</td>
                    <td><div className="productos-nombre">{p.nombre}</div></td>
                    <td>{p.especie}</td>
                    <td>{p.duracion || p.presentacion}</td>
                    <td className="productos-precio">{formatPrecio(p.precio)}</td>
                    <td className="text-center">
                      <span className="productos-pill">{p.categoria}</span>
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        onClick={() => agregarAlCarrito(p)}
                        className="productos-btn-agregar"
                      >
                        Agregar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}