const STORAGE_KEY = 'carrito';
const CANTIDAD_MAX = 50;

export function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function guardarCarrito(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // localStorage bloqueado, no rompemos
  }
}

export function agregarProducto(producto) {
  if (!producto?.codigo) return leerCarrito();
  if (typeof producto.precio !== 'number' || producto.precio <= 0) {
    return leerCarrito();
  }

  const carrito = leerCarrito();
  const existente = carrito.find((i) => i.codigo === producto.codigo);

  if (existente) {
    existente.cantidad = Math.min(existente.cantidad + 1, CANTIDAD_MAX);
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      cantidad: 1,
    });
  }

  guardarCarrito(carrito);
  return carrito;
}

export const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;