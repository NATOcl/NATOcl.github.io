import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Admin.css';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

 /* estados para almacenar los datos de productos, órdenes, usuarios y categorías uwu */
  const [productos, setProductos] = useState([
    { codigo: 'SV001', nombre: 'Consulta General', categoria: 'Consultas', precio: 15000, stock: 15 },
    { codigo: 'VA001', nombre: 'Vacuna antirrábica', categoria: 'Vacunación', precio: 12000, stock: 3 }, 
    { codigo: 'ME001', nombre: 'Metrobay 250mg', categoria: 'Antibióticos', precio: 2200, stock: 2 }, 
    { codigo: 'MA002', nombre: 'Bravecto', categoria: 'Antiparasitarios', precio: 12000, stock: 20 },
  ]);

  const [ordenes, setOrdenes] = useState([
    { id: 1, nro: '#20261001', cliente: 'Juan Pérez', correo: 'juan.perez@example.com', total: 50000, fecha: '2026-09-01', estado: 'Pendiente',detalle: [{ nombre: 'Consulta General', cant: 1, subtotal: 15000 },{ nombre: 'Vacuna antirrábica', cant: 1, subtotal: 12000 },{ nombre: 'Metrobay 250mg', cant: 10, subtotal: 22000 }]},
    { id: 2, nro: '#20261002', cliente: 'María López', correo: 'maria.lopez@example.com', total: 30000, fecha: '2026-09-02', estado: 'Completada',detalle: [{ nombre: 'Consulta General', cant: 1, subtotal: 15000 },{ nombre: 'Vacuna antirrábica', cant: 1, subtotal: 12000 }]},
    { id: 3, nro: '#20261003', cliente: 'Carlos García', correo: 'carlos.garcia@example.com', total: 15000, fecha: '2026-09-03', estado: 'Pendiente',detalle: [{ nombre: 'Consulta General', cant: 1, subtotal: 15000 }]},
  ]);

  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com', rol: 'Cliente', compras: ['#20261001'] },
    { id: 2, nombre: 'María López', email: 'maria.lopez@example.com', rol: 'Cliente', compras: ['#20261002'] },
    { id: 3, nombre: 'Carlos García', email: 'carlos.garcia@example.com', rol: 'Cliente', compras: ['#20261003'] },
  ]);

  const [categorias, setCategorias] = useState([
    'Consultas',
    'Vacunación',
    'Cirugía',
    'Desparasitación',
    'Exámenes',
    'Otros',
  ]);

  /* estados de control */
  const [verBoleta, setVerBoleta] = useState(null);
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);
  const [productoEditar, setProductoEditar] = useState(null);
  const [formProducto, setFormProducto] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Consultas',
    precio: 0,
    stock: 0,
  });

  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [editandoCatIdx, setEditandoCatIdx] = useState(null);
  const [filtroStockCritico, setFiltroStockCritico] = useState(false);

  const [mostrarFormUsuario, setMostrarFormUsuario] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [usuarioHistorial, setUsuarioHistorial] = useState(null);
  const [formUsuario, setFormUsuario] = useState({ id: null, nombre: '', email: '', rol: 'Cliente' });

  /* funciones usuarios */
  const handleGuardarUsuario = (e) => {
    e.preventDefault();
    if (usuarioEditar) {
      setUsuarios(usuarios.map((u) => u.id === usuarioEditar ? { ...u, ...formUsuario } : u));
    } else {
      setUsuarios([...usuarios, { ...formUsuario, id: usuarios.length + 1, compras: [] }]);
    }
    setFormUsuario({ id: null, nombre: '', email: '', rol: 'Cliente' });
    setMostrarFormUsuario(false);
    setUsuarioEditar(null);
  };

  /* funciones productos*/
  const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (productoEditar) {
      setProductos(productos.map((p) => p.codigo === productoEditar.codigo ? { ...formProducto } : p));
    } else {
      setProductos([...productos, { ...formProducto }]);
    }
    setFormProducto({
      codigo: '',
      nombre: '',
      categoria: 'Consultas',
      precio: 0,
      stock: 0,
    });
    setMostrarFormProducto(false);
    setProductoEditar(null);
  };

  const handleEditar = (producto) => {
    setFormProducto({ ...producto });
    setProductoEditar(producto);
    setMostrarFormProducto(true);
  };

  const handleEliminarProducto = (codigo) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter((p) => p.codigo !== codigo));
    }
  };

  /* funciones categorías */
  const handleAgregarCategoria = (e) => {
    if (e) e.preventDefault();
    if (nuevaCategoria.trim() === '') return;

    if (editandoCatIdx !== null) {
      const copiaCat = [...categorias];
      copiaCat[editandoCatIdx] = nuevaCategoria.trim();
      setCategorias(copiaCat);
      setEditandoCatIdx(null);
    } else {
      if (!categorias.includes(nuevaCategoria.trim())) {
        setCategorias([...categorias, nuevaCategoria.trim()]);
      }
    }
    setNuevaCategoria('');
  };

  const productosMostrar = filtroStockCritico ? productos.filter((p) => p.stock <= 5) : productos;

  return (
    <div className="d-flex min-vh-100 admin-wrapper">
      
      {/* sidebar lateral */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          PetCare Admin
        </div>

        <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
          <ul className="nav nav-pills flex-column gap-1 list-unstyled mb-0"> 
            
            <li>
              <button 
                type="button" 
                className={`nav-link w-100 ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Dashboard
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'ordenes' ? 'active' : ''}`}
                onClick={() => { setActiveTab('ordenes'); setVerBoleta(null); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Órdenes
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'productos' ? 'active' : ''}`}
                onClick={() => { setActiveTab('productos'); setFiltroStockCritico(false); }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                Productos
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'categorias' ? 'active' : ''}`}
                onClick={() => setActiveTab('categorias')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
                Categorías
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'usuarios' ? 'active' : ''}`}
                onClick={() => setActiveTab('usuarios')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Usuarios
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'reportes' ? 'active' : ''}`}
                onClick={() => setActiveTab('reportes')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                Reportes
              </button>
            </li>

            <li>
              <button 
                type="button" 
                className={`admin-nav-item ${activeTab === 'perfil' ? 'active' : ''}`}
                onClick={() => setActiveTab('perfil')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Perfil
              </button>
            </li>
          </ul>

          <div className="d-flex flex-column gap-2 pt-3 border-top">
            <Link to="/" className="admin-btn-tienda">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              Volver a la Tienda
            </Link>
            <button 
              type="button" 
              className="admin-btn-logout"
              onClick={() => window.location.href = '/login'}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* vistas principales */}
      <main className="flex-grow-1 p-4 overflow-auto">

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-4">
              <h3 className="admin-title m-0">Dashboard</h3>
              <p className="text-muted small">Resumen de las actividades diarias del sistema</p>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="admin-metric-card bg-compras">
                  <div className="fs-5">Compras</div>
                  <div className="display-6 fw-bold">1,234</div>
                  <div className="mt-2 small">Probabilidad de aumento: <strong>20%</strong></div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="admin-metric-card bg-productos">
                  <div className="fs-5">Productos</div>
                  <div className="display-6 fw-bold">400</div>
                  <div className="mt-2 small">Inventario actual: <strong>500</strong></div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="admin-metric-card bg-usuarios">
                  <div className="fs-5">Usuarios</div>
                  <div className="display-6 fw-bold">890</div>
                  <div className="mt-2 small">Nuevos este mes: <strong>120</strong></div>
                </div>
              </div>
            </div>

            <div className="row g-3">
              {[
                { id: 'dashboard', title: 'Dashboard', desc: 'Visión general de métricas del sistema.' },
                { id: 'ordenes', title: 'Órdenes', desc: 'Gestión y seguimiento de boletas y compras.' },
                { id: 'productos', title: 'Productos', desc: 'Administración de stock y productos.' },
                { id: 'categorias', title: 'Categorías', desc: 'Organización de categorías de catálogo.' },
                { id: 'usuarios', title: 'Usuarios', desc: 'Gestión de cuentas y roles de usuario.' },
                { id: 'reportes', title: 'Reportes', desc: 'Generación de informes de venta y sistema.' },
                { id: 'perfil', title: 'Perfil', desc: 'Configuraciones de la cuenta administradora.' },
                { id: 'tienda', title: 'Tienda', desc: 'Navegar por la tienda pública.' },
              ].map((item) => (
                <div key={item.id} className="col-md-3">
                  <div 
                    className="admin-module-card"
                    onClick={() => item.id === 'tienda' ? window.location.href = '/#' : setActiveTab(item.id)}
                  >
                    <h6 className="fw-bold mb-1">{item.title}</h6>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ordenes y boletas */}
        {activeTab === 'ordenes' && (
          <div>
            <h3 className="admin-title mb-1">Órdenes y Boletas</h3>
            <p className="text-muted small mb-4">Revisión de boletas emitidas por clientes</p>

            <div className="admin-table-container mb-4">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>N° Orden</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {ordenes.map((o) => (
                    <tr key={o.id}>
                      <td data-label="N° Orden" className="fw-bold text-primary">{o.nro}</td>
                      <td data-label="Fecha">{o.fecha}</td>
                      <td data-label="Cliente">
                        <strong>{o.cliente}</strong><br/>
                        <span className="text-muted small">{o.correo}</span>
                      </td>
                      <td data-label="Total" className="fw-bold">${o.total.toLocaleString('es-CL')}</td>
                      <td data-label="Estado">
                        <span className={`badge ${o.estado === 'Completada' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {o.estado}
                        </span>
                      </td>
                      <td data-label="Acciones" className="text-center">
                        <button className="btn btn-sm btn-teal" onClick={() => setVerBoleta(o)}>
                          Mostrar Boleta
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {verBoleta && (
              <div className="card p-4 border-0 shadow-sm bg-white">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold text-dark m-0">Detalle de Boleta: {verBoleta.nro}</h5>
                  <button className="btn btn-sm btn-close" onClick={() => setVerBoleta(null)}></button>
                </div>
                <p className="mb-1"><strong>Cliente:</strong> {verBoleta.cliente} ({verBoleta.correo})</p>
                <p className="mb-3"><strong>Fecha:</strong> {verBoleta.fecha}</p>
                <table className="table table-sm border mb-3">
                  <thead>
                    <tr><th>Producto</th><th className="text-center">Cant</th><th className="text-end">Subtotal</th></tr>
                  </thead>
                  <tbody>
                    {verBoleta.detalle?.map((d, i) => (
                      <tr key={i}>
                        <td>{d.nombre}</td>
                        <td className="text-center">{d.cant}</td>
                        <td className="text-end">${d.subtotal.toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className="fw-bold text-end text-success">Total: ${verBoleta.total.toLocaleString('es-CL')}</h5>
              </div>
            )}
          </div>
        )}

        {/* Productos */}
        {activeTab === 'productos' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="admin-title m-0">Gestión de Productos</h3>
                <p className="text-muted small">Control de inventario y alertas críticas</p>
              </div>
              <div className="d-flex gap-2">
                <button 
                  className={`btn ${filtroStockCritico ? 'btn-danger' : 'btn-outline-danger'}`}
                  onClick={() => setFiltroStockCritico(!filtroStockCritico)}
                >
                 {filtroStockCritico ? 'Ver Todos' : 'Stock Crítico (≤ 5)'}
                </button>
                <button 
                  className="btn btn-teal"
                  onClick={() => {
                    setProductoEditar(null);
                    setFormProducto({ codigo: '', nombre: '', categoria: 'Consultas', precio: 0, stock: 0 });
                    setMostrarFormProducto(true);
                  }}
                >
                  + Nuevo Producto
                </button>
              </div>
            </div>

            {mostrarFormProducto && (
              <div className="card p-4 shadow-sm border-0 mb-4 bg-white">
                <h5 className="fw-bold mb-3">{productoEditar ? 'Editar Producto' : 'Crear Producto'}</h5>
                <form onSubmit={handleGuardarProducto}>
                  <div className="row g-3">
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Código</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        disabled={!!productoEditar}
                        value={formProducto.codigo}
                        onChange={(e) => setFormProducto({...formProducto, codigo: e.target.value})}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Nombre</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={formProducto.nombre}
                        onChange={(e) => setFormProducto({...formProducto, nombre: e.target.value})}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Categoría</label>
                      <select 
                        className="form-select"
                        value={formProducto.categoria}
                        onChange={(e) => setFormProducto({...formProducto, categoria: e.target.value})}
                      >
                        {categorias.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="col-md-2">
                      <label className="form-label small fw-bold">Precio ($)</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required 
                        value={formProducto.precio}
                        onChange={(e) => setFormProducto({...formProducto, precio: e.target.value})}
                      />
                    </div>
                    <div className="col-md-1">
                      <label className="form-label small fw-bold">Stock</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        required 
                        value={formProducto.stock}
                        onChange={(e) => setFormProducto({...formProducto, stock: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-teal">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormProducto(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosMostrar.map((p) => (
                    <tr key={p.codigo}>
                      <td data-label="Código" className="fw-bold">{p.codigo}</td>
                      <td data-label="Nombre">{p.nombre}</td>
                      <td data-label="Categoría"><span className="admin-badge-ok">{p.categoria}</span></td>
                      <td data-label="Precio" className="fw-bold">${p.precio.toLocaleString('es-CL')}</td>
                      <td data-label="Stock">
                        <span className={p.stock <= 5 ? 'admin-badge-critico' : 'admin-badge-ok'}>
                          {p.stock} {p.stock <= 5 ? 'CRÍTICO' : 'DISPONIBLE'}
                        </span>
                      </td>
                      <td data-label="Acciones" className="text-center">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEditar(p)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarProducto(p.codigo)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categorías */}
        {activeTab === 'categorias' && (
          <div>
            <h3 className="admin-title mb-1">Gestión de Categorías</h3>
            <p className="text-muted small mb-4">Administrar y añadir categorías del catálogo</p>

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card p-4 border-0 shadow-sm bg-white">
                  <h5 className="fw-bold mb-3">{editandoCatIdx !== null ? 'Editar Categoría' : 'Nueva Categoría'}</h5>
                  <form onSubmit={handleAgregarCategoria}>
                    <input 
                      type="text" 
                      className="form-control mb-3" 
                      placeholder="Nombre de la categoría"
                      value={nuevaCategoria}
                      onChange={(e) => setNuevaCategoria(e.target.value)}
                      required 
                    />
                    <button type="submit" className="btn btn-teal w-100">
                      {editandoCatIdx !== null ? 'Guardar Cambios' : '+ Agregar Categoría'}
                    </button>
                  </form>
                </div>
              </div>

              <div className="col-md-8">
                <div className="card p-3 border-0 shadow-sm bg-white">
                  <h5 className="fw-bold mb-3">Categorías Existentes</h5>
                  <ul className="list-group list-group-flush">
                    {categorias.map((cat, idx) => (
                      <li key={cat} className="list-group-item d-flex justify-content-between align-items-center py-2">
                        <span>{cat}</span>
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => { setEditandoCatIdx(idx); setNuevaCategoria(cat); }}
                        >
                          Editar
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Usuarios */}
        {activeTab === 'usuarios' && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="admin-title m-0">Gestión de Usuarios</h3>
                <p className="text-muted small">Control de cuentas y roles de usuarios registrados</p>
              </div>
              <button 
                className="btn btn-teal"
                onClick={() => {
                  setUsuarioEditar(null);
                  setFormUsuario({ id: null, nombre: '', email: '', rol: 'Cliente' });
                  setMostrarFormUsuario(true);
                }}
              >
                + Nuevo Usuario
              </button>
            </div>

            {mostrarFormUsuario && (
              <div className="card p-4 shadow-sm border-0 mb-4 bg-white">
                <h5 className="fw-bold mb-3">{usuarioEditar ? 'Editar Usuario' : 'Nuevo Usuario'}</h5>
                <form onSubmit={handleGuardarUsuario}>
                  <div className="row g-3">
                    <div className="col-md-5">
                      <label className="form-label small fw-bold">Nombre</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        value={formUsuario.nombre}
                        onChange={(e) => setFormUsuario({...formUsuario, nombre: e.target.value})}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Email</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        required 
                        value={formUsuario.email}
                        onChange={(e) => setFormUsuario({...formUsuario, email: e.target.value})}
                      />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label small fw-bold">Rol</label>
                      <select 
                        className="form-select"
                        value={formUsuario.rol}
                        onChange={(e) => setFormUsuario({...formUsuario, rol: e.target.value})}
                      >
                        <option value="Cliente">Cliente</option>
                        <option value="Administrador">Administrador</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-teal">Guardar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormUsuario(false)}>Cancelar</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((u) => (
                    <tr key={u.id}>
                      <td data-label="ID">{u.id}</td>
                      <td data-label="Nombre" className="fw-bold">{u.nombre}</td>
                      <td data-label="Email">{u.email}</td>
                      <td data-label="Rol">
                        <span className={`badge ${u.rol === 'Administrador' ? 'bg-danger' : 'bg-secondary'}`}>
                          {u.rol}
                        </span>
                      </td>
                      <td data-label="Acciones" className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => { setUsuarioEditar(u.id); setFormUsuario(u); setMostrarFormUsuario(true); }}
                        >
                        Editar
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-info"
                          onClick={() => setUsuarioHistorial(u)}
                        >
                        Historial Compras
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {usuarioHistorial && (
              <div className="card p-4 border-0 shadow-sm bg-white mt-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="fw-bold m-0">Historial de Compras: {usuarioHistorial.nombre}</h5>
                  <button className="btn btn-sm btn-close" onClick={() => setUsuarioHistorial(null)}></button>
                </div>
                {usuarioHistorial.compras?.length > 0 ? (
                  <ul>{usuarioHistorial.compras.map(c => <li key={c}>Orden {c}</li>)}</ul>
                ) : (
                  <p className="text-muted m-0">Sin compras registradas.</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reportes */}
        {activeTab === 'reportes' && (
          <div>
            <h3 className="admin-title mb-1">Reportes e Informes</h3>
            <p className="text-muted small mb-4">Métricas generales de venta y estado operativo</p>
            <div className="card p-4 border-0 shadow-sm bg-white">
              <h5>Progreso de Ventas del Mes</h5>
              <div className="progress mb-3" style={{ height: '25px' }}>
                <div className="progress-bar bg-teal" style={{ width: '80%', backgroundColor: '#1a7a8a' }}>Completadas (80%)</div>
                <div className="progress-bar bg-warning text-dark" style={{ width: '20%' }}>Pendientes (20%)</div>
              </div>
              <button className="btn btn-teal align-self-start">Descargar Reporte PDF</button>
            </div>
          </div>
        )}

        {/* Perfil*/}
        {activeTab === 'perfil' && (
          <div>
            <h3 className="admin-title mb-1">Perfil Administrador</h3>
            <p className="text-muted small mb-4">Información personal de la cuenta activa</p>
            <div className="card p-4 border-0 shadow-sm bg-white col-md-6">
              <form>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Nombre Completo</label>
                  <input type="text" className="form-control" defaultValue="Administrador PetCare" />
                </div>
                <div className="mb-3">
                  <label className="form-label small fw-bold">Correo Electrónico</label>
                  <input type="email" className="form-control" defaultValue="admin@petcare.cl" />
                </div>
                <button type="button" className="btn btn-teal">Guardar Cambios</button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}