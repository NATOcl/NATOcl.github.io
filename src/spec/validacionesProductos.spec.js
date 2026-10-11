import { describe, it, expect } from 'vitest';
import {
  SERVICIOS_MOCK,
  MEDICAMENTOS_MOCK,
  CATEGORIAS_SERVICIOS,
  CATEGORIAS_MEDICAMENTOS,
  fetchProductosMock,
} from '../utils/productosMock';

describe('SERVICIOS_MOCK', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(SERVICIOS_MOCK)).toBe(true);
    expect(SERVICIOS_MOCK.length).toBeGreaterThan(0);
  });

  it('cada servicio tiene los campos obligatorios', () => {
    SERVICIOS_MOCK.forEach((s) => {
      expect(s).toHaveProperty('codigo');
      expect(s).toHaveProperty('nombre');
      expect(s).toHaveProperty('especie');
      expect(s).toHaveProperty('duracion');
      expect(s).toHaveProperty('precio');
      expect(s).toHaveProperty('categoria');
    });
  });

  it('todos los códigos son únicos', () => {
    const codigos = SERVICIOS_MOCK.map((s) => s.codigo);
    expect(new Set(codigos).size).toBe(codigos.length);
  });

  it('todos los precios son números positivos', () => {
    SERVICIOS_MOCK.forEach((s) => {
      expect(typeof s.precio).toBe('number');
      expect(s.precio).toBeGreaterThan(0);
    });
  });

  it('todas las categorías son válidas', () => {
    SERVICIOS_MOCK.forEach((s) => {
      expect(CATEGORIAS_SERVICIOS).toContain(s.categoria);
    });
  });

  it('contiene al menos 2 vacunas', () => {
    const vacunas = SERVICIOS_MOCK.filter((s) => s.categoria === 'Vacunación');
    expect(vacunas.length).toBeGreaterThanOrEqual(2);
  });
});

describe('MEDICAMENTOS_MOCK', () => {
  it('es un array no vacío', () => {
    expect(Array.isArray(MEDICAMENTOS_MOCK)).toBe(true);
    expect(MEDICAMENTOS_MOCK.length).toBeGreaterThan(0);
  });

  it('cada medicamento tiene los campos obligatorios', () => {
    MEDICAMENTOS_MOCK.forEach((m) => {
      expect(m).toHaveProperty('codigo');
      expect(m).toHaveProperty('nombre');
      expect(m).toHaveProperty('especie');
      expect(m).toHaveProperty('presentacion');
      expect(m).toHaveProperty('precio');
      expect(m).toHaveProperty('categoria');
    });
  });

  it('todos los códigos son únicos', () => {
    const codigos = MEDICAMENTOS_MOCK.map((m) => m.codigo);
    expect(new Set(codigos).size).toBe(codigos.length);
  });

  it('todas las categorías son válidas', () => {
    MEDICAMENTOS_MOCK.forEach((m) => {
      expect(CATEGORIAS_MEDICAMENTOS).toContain(m.categoria);
    });
  });
});

describe('CATEGORIAS_SERVICIOS', () => {
  it('incluye "Todos"', () => {
    expect(CATEGORIAS_SERVICIOS).toContain('Todos');
  });

  it('incluye las categorías usadas en SERVICIOS_MOCK', () => {
    const usadas = new Set(SERVICIOS_MOCK.map((s) => s.categoria));
    usadas.forEach((cat) => {
      expect(CATEGORIAS_SERVICIOS).toContain(cat);
    });
  });
});

describe('CATEGORIAS_MEDICAMENTOS', () => {
  it('incluye "Todos"', () => {
    expect(CATEGORIAS_MEDICAMENTOS).toContain('Todos');
  });

  it('incluye las categorías usadas en MEDICAMENTOS_MOCK', () => {
    const usadas = new Set(MEDICAMENTOS_MOCK.map((m) => m.categoria));
    usadas.forEach((cat) => {
      expect(CATEGORIAS_MEDICAMENTOS).toContain(cat);
    });
  });
});

describe('fetchProductosMock', () => {
  it('devuelve servicios cuando tipo es "servicios"', async () => {
    const data = await fetchProductosMock('servicios');
    expect(data).toEqual(SERVICIOS_MOCK);
  });

  it('devuelve medicamentos cuando tipo es "medicamentos"', async () => {
    const data = await fetchProductosMock('medicamentos');
    expect(data).toEqual(MEDICAMENTOS_MOCK);
  });

  it('devuelve un array', async () => {
    const data = await fetchProductosMock('servicios');
    expect(Array.isArray(data)).toBe(true);
  });

  it('es async (devuelve una promesa)', () => {
    const resultado = fetchProductosMock('servicios');
    expect(resultado).toBeInstanceOf(Promise);
    return resultado; // esperamos a que resuelva
  });
});