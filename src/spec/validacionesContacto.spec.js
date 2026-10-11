import { describe, it, expect } from 'vitest';
import {
  validarNombre,
  validarTelefono,
  validarMascota,
  validarEspecie,
  validarEspecieOtra,
  validarMotivo,
  validarFormulario,
  ESPECIES,
  MAX_MOTIVO,
} from '../utils/validacionescontacto';

describe('validarNombre (contacto)', () => {
  it('rechaza vacío', () => {
    expect(validarNombre('')).toBe('Ingresa tu nombre.');
  });

  it('rechaza menos de 2 caracteres', () => {
    expect(validarNombre('A')).toBe('El nombre debe tener al menos 2 caracteres.');
  });

  it('rechaza más de 60 caracteres', () => {
    expect(validarNombre('a'.repeat(61))).toBe('El nombre no puede superar los 60 caracteres.');
  });

  it('rechaza números', () => {
    expect(validarNombre('Juan123')).toBe('El nombre solo debe contener letras.');
  });

  it('acepta nombre simple', () => {
    expect(validarNombre('Juan')).toBe('');
  });

  it('acepta nombre con tilde y ñ', () => {
    expect(validarNombre('Ñuñoa Pérez')).toBe('');
  });

  it('acepta nombre con guion y apóstrofe', () => {
    expect(validarNombre("Jean-Pierre O'Hara")).toBe('');
  });
});

describe('validarTelefono (contacto)', () => {
  it('rechaza vacío', () => {
    expect(validarTelefono('')).toBe('Ingresa tu numero.');
  });

  it('rechaza número muy corto', () => {
    expect(validarTelefono('12345')).toContain('Usa un celular chileno');
  });

  it('acepta número chileno de 9 dígitos', () => {
    expect(validarTelefono('912345678')).toBe('');
  });

  it('acepta número con +56 y espacios', () => {
    expect(validarTelefono('+56 9 1234 5678')).toBe('');
  });

  it('rechaza letras', () => {
    expect(validarTelefono('abc')).toContain('Usa un celular chileno');
  });
});

describe('validarMascota', () => {
  it('rechaza vacío', () => {
    expect(validarMascota('')).toBe('Ingresa el nombre de tu mascota');
  });

  it('rechaza menos de 2 caracteres', () => {
    expect(validarMascota('A')).toBe('El nombre debe tener al menos 2 caracteres');
  });

  it('rechaza más de 30 caracteres', () => {
    expect(validarMascota('a'.repeat(31))).toBe('El nombre debe tener menos de 30 caracteres');
  });

  it('rechaza símbolos', () => {
    expect(validarMascota('Firulais@')).toBe('El nombre tiene caracteres no permitidos');
  });

  it('acepta nombre simple', () => {
    expect(validarMascota('Firulais')).toBe('');
  });

  it('acepta nombre con números', () => {
    expect(validarMascota('Rex2')).toBe('');
  });
});

describe('validarEspecie', () => {
  it('rechaza vacío', () => {
    expect(validarEspecie('')).toBe('Selecciona la especie de tu mascota.');
  });

  it('rechaza valor no listado', () => {
    expect(validarEspecie('Dinosaurio')).toBe('Selecciona una opcion de la lista.');
  });

  it('acepta Perro', () => {
    expect(validarEspecie('Perro')).toBe('');
  });

  it('acepta Gato', () => {
    expect(validarEspecie('Gato')).toBe('');
  });

  it('acepta Otro (que dispara el campo extra)', () => {
    expect(validarEspecie('Otro')).toBe('');
  });
});

describe('validarEspecieOtra', () => {
  it('rechaza vacío', () => {
    expect(validarEspecieOtra('')).toBe('Escribe la especie de tu mascota.');
  });

  it('rechaza menos de 2 caracteres', () => {
    expect(validarEspecieOtra('A')).toBe('La especie debe tener mas de 2 caracteres.');
  });

  it('rechaza más de 30 caracteres', () => {
    expect(validarEspecieOtra('a'.repeat(31))).toBe('La especie no puede superar los 30 caracteres');
  });

  it('rechaza números', () => {
    expect(validarEspecieOtra('Reptil123')).toBe('La especie solo puede contener letras');
  });

  it('acepta especie válida', () => {
    expect(validarEspecieOtra('Tarántula')).toBe('');
  });
});

describe('validarMotivo', () => {
  it('rechaza vacío', () => {
    expect(validarMotivo('')).toBe('Cuentanos el motivo de la consulta');
  });

  it('rechaza menos de 10 caracteres', () => {
    expect(validarMotivo('Corto')).toBe('Describe el motivo de la consula con almenos 10 caracteres');
  });

  it('rechaza más de 300 caracteres', () => {
    expect(validarMotivo('a'.repeat(301))).toBe(`el motivo no puede superar los ${MAX_MOTIVO} caracteres`);
  });

  it('acepta motivo válido', () => {
    expect(validarMotivo('Mi perro tiene fiebre desde ayer')).toBe('');
  });
});

describe('validarFormulario (contacto)', () => {
  const formValido = {
    nombre: 'Juan Troncoso',
    telefono: '912345678',
    mascota: 'Firulais',
    especie: 'Perro',
    especieOtra: '',
    motivo: 'Mi perro tiene fiebre desde ayer por la tarde.',
  };

  it('devuelve objeto vacío si todo es válido', () => {
    const errores = validarFormulario(formValido);
    expect(Object.keys(errores)).toHaveLength(0);
  });

  it('detecta nombre inválido', () => {
    const errores = validarFormulario({ ...formValido, nombre: '' });
    expect(errores.nombre).toBeTruthy();
  });

  it('detecta varios errores a la vez', () => {
    const errores = validarFormulario({
      ...formValido,
      nombre: '',
      telefono: 'abc',
      motivo: 'corto',
    });
    expect(errores.nombre).toBeTruthy();
    expect(errores.telefono).toBeTruthy();
    expect(errores.motivo).toBeTruthy();
    expect(errores.especie).toBeUndefined();
  });

  it('NO valida especieOtra si especie no es "Otro"', () => {
    const errores = validarFormulario({
      ...formValido,
      especie: 'Perro',
      especieOtra: '',
    });
    expect(errores.especieOtra).toBeUndefined();
  });

  it('SÍ valida especieOtra si especie es "Otro"', () => {
    const errores = validarFormulario({
      ...formValido,
      especie: 'Otro',
      especieOtra: '',
    });
    expect(errores.especieOtra).toBeTruthy();
  });

  it('acepta especieOtra válida cuando especie es "Otro"', () => {
    const errores = validarFormulario({
      ...formValido,
      especie: 'Otro',
      especieOtra: 'Tarántula',
    });
    expect(errores.especieOtra).toBeUndefined();
  });

  it('respeta MAX_MOTIVO exportado', () => {
    expect(MAX_MOTIVO).toBe(300);
  });

  it('ESPECIES contiene Perro y Gato', () => {
    const valores = ESPECIES.map((e) => e.value);
    expect(valores).toContain('Perro');
    expect(valores).toContain('Gato');
  });
});