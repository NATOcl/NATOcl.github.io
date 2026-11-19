import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  fetchProductosMock,
  CATEGORIAS_SERVICIOS,
  CATEGORIAS_MEDICAMENTOS,
} from '../utils/productosMock';
import { agregarProducto } from '../utils/carritoMock';
import { api } from '../utils/api';

// El backend entrega { id, nombre, descripcion, precio }.
// La tabla de productos necesita además codigo, especie, duracion y categoria.
function inferirCategoria(nombre = '') {
  const n = normalizarTexto(nombre);
  if (n.includes('consulta')) return 'Consultas';
  if (n.includes('vacun')) return 'Vacunación';
  if (n.includes('esteriliz') || n.includes('castra') || n.includes('cirug')) return 'Cirugía';
  if (n.includes('desparas')) return 'Desparasitación';
  if (n.includes('hemograma') || n.includes('examen') || n.includes('perfil')) return 'Exámenes';
  return 'Otros';
}

function servicioDesdeApi(s) {
  return {
    codigo: `SV${String(s.id).padStart(3, '0')}`,
    nombre: s.nombre,
    especie: 'Perro / Gato',
    duracion: s.descripcion || '—',
    precio: s.precio,
    categoria: inferirCategoria(s.nombre),
  };
}

async function cargarProductos(tipo) {
  if (tipo !== 'servicios') return fetchProductosMock(tipo); // medicamentos: aún sin endpoint
  try {
    const data = await api('/servicios', { auth: false });
    return data.map(servicioDesdeApi);
  } catch (err) {
    console.warn('No se pudo cargar /servicios, se usan datos de ejemplo:', err.message);
    return fetchProductosMock(tipo);
  }
}

const normalizarTexto = (texto = '') => {
  return String(texto).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function useProductos() {
  const [tab, setTab]             = useState('servicios');
  const [categoria, setCategoria] = useState('Todos');
  const [busqueda, setBusqueda]   = useState('');
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando]   = useState(true);
  const [error, setError]         = useState(null);
  const [agregado, setAgregado]   = useState(null);

  // Cargar productos del mock
  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    cargarProductos(tab)
      .then((data) => { if (!cancelado) setProductos(data); })
      .catch((err) => { if (!cancelado) setError(err.message || 'Error al cargar'); })
      .finally(() => { if (!cancelado) setCargando(false); });

    return () => { cancelado = true; };
  }, [tab]);

  // Reset de categoría al cambiar pestaña
  useEffect(() => { setCategoria('Todos'); }, [tab]);

  const esServicios = tab === 'servicios';
  const categorias  = esServicios ? CATEGORIAS_SERVICIOS : CATEGORIAS_MEDICAMENTOS;

  const filtrados = useMemo(() => {
    const q = normalizarTexto(busqueda.trim());
   
    return productos.filter((p) => {
      const okCat = categoria === 'Todos' || p.categoria === categoria;
      const okBus = q === '' ||
        normalizarTexto(p.nombre).includes(q) ||
        normalizarTexto(p.codigo).includes(q);
      return okCat && okBus;
    });
  }, [productos, categoria, busqueda]);

  const agregar = useCallback((producto) => {
    agregarProducto(producto);
    setAgregado(producto.codigo);
    setTimeout(
      () => setAgregado((actual) => (actual === producto.codigo ? null : actual)),
      1200
    );
  }, []);

  return {
    tab, categoria, busqueda, cargando, error, agregado,
    esServicios, categorias, filtrados,
    setTab, setCategoria, setBusqueda, agregar,
  };
}