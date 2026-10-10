import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  fetchProductosMock,
  CATEGORIAS_SERVICIOS,
  CATEGORIAS_MEDICAMENTOS,
} from '../utils/productosMock';
import { agregarProducto } from '../utils/carritoMock';

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

    fetchProductosMock(tab)
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
    const q = busqueda.trim().toLowerCase();
    return productos.filter((p) => {
      const okCat = categoria === 'Todos' || p.categoria === categoria;
      const okBus = q === '' ||
        p.nombre.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q);
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