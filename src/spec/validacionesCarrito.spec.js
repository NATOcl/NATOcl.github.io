import { describe, it, expect, beforeEach } from 'vitest';
import {
  leerCarrito,
  guardarCarrito,
  agregarProducto,
  cambiarCantidad,
  eliminarProducto,
  vaciarCarrito,
  calcularTotal,
  calcularUnidades,
} from '../utils/carritoMock';

const productoEjemplo = {
  codigo: 'SV001',
  nombre: 'Consulta General',
  precio: 15000,
  categoria: 'Consultas',
};

beforeEach(() => {
  localStorage.clear();
});

describe('leerCarrito', () => {
  it('devuelve array vacío si no hay nada', () => {
    expect(leerCarrito()).toEqual([]);
  });

  it('devuelve el carrito guardado', () => {
    localStorage.setItem('carrito', JSON.stringify([productoEjemplo]));
    expect(leerCarrito()).toEqual([productoEjemplo]);
  });

  it('devuelve array vacío si el JSON está corrupto', () => {
    localStorage.setItem('carrito', 'no es json');
    expect(leerCarrito()).toEqual([]);
  });
});

describe('agregarProducto', () => {
  it('agrega un producto nuevo', () => {
    agregarProducto(productoEjemplo);
    const carrito = leerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].codigo).toBe('SV001');
    expect(carrito[0].cantidad).toBe(1);
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    agregarProducto(productoEjemplo);
    agregarProducto(productoEjemplo);
    const carrito = leerCarrito();
    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it('no supera el máximo de 50', () => {
    for (let i = 0; i < 55; i++) agregarProducto(productoEjemplo);
    const carrito = leerCarrito();
    expect(carrito[0].cantidad).toBe(50);
  });

  it('rechaza productos sin código', () => {
    const antes = leerCarrito();
    agregarProducto({ nombre: 'X', precio: 100 });
    expect(leerCarrito()).toEqual(antes);
  });

  it('rechaza productos con precio negativo', () => {
    agregarProducto({ codigo: 'X', precio: -5 });
    expect(leerCarrito().length).toBe(0);
  });

  it('rechaza productos con precio cero', () => {
    agregarProducto({ codigo: 'X', precio: 0 });
    expect(leerCarrito().length).toBe(0);
  });
});

describe('cambiarCantidad', () => {
  it('cambia la cantidad de un producto', () => {
    agregarProducto(productoEjemplo);
    cambiarCantidad('SV001', 5);
    expect(leerCarrito()[0].cantidad).toBe(5);
  });

  it('ignora productos con cantidad inválida', () => {
    agregarProducto(productoEjemplo);
    cambiarCantidad('SV001', 0);
    expect(leerCarrito()[0].cantidad).toBe(1);
  });

  it('ignora cantidades mayores a 50', () => {
    agregarProducto(productoEjemplo);
    cambiarCantidad('SV001', 999);
    expect(leerCarrito()[0].cantidad).toBe(1);
  });

  it('ignora códigos inexistentes', () => {
    agregarProducto(productoEjemplo);
    cambiarCantidad('XXXX', 5);
    expect(leerCarrito()[0].cantidad).toBe(1);
  });
});

describe('eliminarProducto', () => {
  it('elimina el producto indicado', () => {
    agregarProducto(productoEjemplo);
    eliminarProducto('SV001');
    expect(leerCarrito()).toEqual([]);
  });

  it('no rompe si el código no existe', () => {
    agregarProducto(productoEjemplo);
    eliminarProducto('XXXX');
    expect(leerCarrito().length).toBe(1);
  });
});

describe('vaciarCarrito', () => {
  it('deja el carrito vacío', () => {
    agregarProducto(productoEjemplo);
    vaciarCarrito();
    expect(leerCarrito()).toEqual([]);
  });
});
//calcular
describe('calcularTotal', () => {
  it('devuelve 0 con carrito vacío', () => {
    expect(calcularTotal([])).toBe(0);
  });

  it('suma precio × cantidad', () => {
    const items = [
      { precio: 1000, cantidad: 2 },
      { precio: 500, cantidad: 3 },
    ];
    expect(calcularTotal(items)).toBe(3500);
  });
});

describe('calcularUnidades', () => {
  it('devuelve 0 con carrito vacío', () => {
    expect(calcularUnidades([])).toBe(0);
  });

  it('suma las cantidades', () => {
    const items = [
      { cantidad: 2 },
      { cantidad: 3 },
    ];
    expect(calcularUnidades(items)).toBe(5);
  });
});