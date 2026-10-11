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

export function cambiarCantidad(codigo, cantidad) {
  if (!codigo) return leerCarrito();
  if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > CANTIDAD_MAX) {
    return leerCarrito();
  }

  const carrito = leerCarrito();
  const actualizado = carrito.map((i) =>
    i.codigo === codigo ? { ...i, cantidad } : i
  );
  guardarCarrito(actualizado);
  return actualizado;
}

export function eliminarProducto(codigo) {
  if (!codigo) return leerCarrito();

  const carrito = leerCarrito();
  const filtrado = carrito.filter((i) => i.codigo !== codigo);
  guardarCarrito(filtrado);
  return filtrado;
}

export function vaciarCarrito() {
  guardarCarrito([]);
  return [];
}

export function calcularTotal(items) {
  return items.reduce((suma, i) => suma + i.precio * i.cantidad, 0);
}

export function calcularUnidades(items) {
  return items.reduce((suma, i) => suma + i.cantidad, 0);
}

export const formatPrecio = (n) => `$${n.toLocaleString('es-CL')}`;