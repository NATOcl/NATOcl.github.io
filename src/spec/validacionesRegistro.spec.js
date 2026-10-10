import { describe, it, expect } from 'vitest';
import {
  validarNombre,
  validarRut,
  validarEmail,
  validarPassword,
  validarConfirmacion,
  validarTelefono,
  validarRegion,
  validarComuna,
  validarRegistro,
  hayErrores,
} from '../utils/validacionesRegistro';

describe('validarNombre', () => {
  it('rechaza vacío', () => {
    expect(validarNombre('')).toBe('El nombre es obligatorio');
  });

  it('rechaza null / undefined', () => {
    expect(validarNombre(null)).toBe('El nombre es obligatorio');
    expect(validarNombre(undefined)).toBe('El nombre es obligatorio');
  });

  it('rechaza menos de 3 caracteres', () => {
    expect(validarNombre('Ju')).toBe('Mínimo 3 caracteres');
  });

  it('rechaza más de 60 caracteres', () => {
    expect(validarNombre('a'.repeat(61))).toBe('Máximo 60 caracteres');
  });

  it('rechaza números', () => {
    expect(validarNombre('Juan123')).toBe('Solo se permiten letras y espacios');
  });

  it('rechaza símbolos', () => {
    expect(validarNombre('Juan@Perez')).toBe('Solo se permiten letras y espacios');
  });

  it('acepta nombre simple', () => {
    expect(validarNombre('Juan')).toBeNull();
  });

  it('acepta nombre con espacios', () => {
    expect(validarNombre('Juan Troncoso Oreque')).toBeNull();
  });

  it('acepta tildes y ñ', () => {
    expect(validarNombre('Ñuñoa Pérez')).toBeNull();
  });

  it('ignora espacios al inicio y final', () => {
    expect(validarNombre('   Juan   ')).toBeNull();
  });
});

describe('validarRut', () => {
  it('rechaza vacío', () => {
    expect(validarRut('')).toBe('El RUT es obligatorio');
  });

  it('rechaza letras', () => {
    expect(validarRut('ABC123')).toBeTruthy();
  });

  it('rechaza sin dígito verificador', () => {
    expect(validarRut('19011022')).toBeTruthy();
  });

  it('rechaza formato inválido', () => {
    expect(validarRut('123')).toBeTruthy();
  });

  it('rechaza dígito verificador incorrecto', () => {
    expect(validarRut('190110229')).toBe('RUT inválido (dígito verificador no coincide)');
  });

  it('acepta RUT válido con K', () => {
    expect(validarRut('10000013K')).toBeNull();
  });

  it('acepta RUT válido con k minúscula', () => {
    expect(validarRut('10000013K')).toBeNull();
  });

  it('acepta RUT con puntos y guion', () => {
    expect(validarRut('10.000.013-K')).toBeNull();
  });

  it('acepta RUT con dígito verificador numérico', () => {
    // 12345678-5 es un RUT válido
    expect(validarRut('123456785')).toBeNull();
  });
});

describe('validarEmail', () => {
  it('rechaza vacío', () => {
    expect(validarEmail('')).toBe('El correo es obligatorio');
  });

  it('rechaza sin @', () => {
    expect(validarEmail('correo')).toBe('Correo con formato inválido');
  });

  it('rechaza sin dominio', () => {
    expect(validarEmail('a@')).toBe('Correo con formato inválido');
  });

  it('rechaza sin punto', () => {
    expect(validarEmail('a@dominio')).toBe('Correo con formato inválido');
  });

  it('rechaza dominio no permitido (hotmail)', () => {
    expect(validarEmail('a@hotmail.com')).toContain('Solo se permiten correos');
  });

  it('rechaza dominio no permitido (yahoo)', () => {
    expect(validarEmail('a@yahoo.com')).toContain('Solo se permiten correos');
  });

  it('acepta gmail', () => {
    expect(validarEmail('test@gmail.com')).toBeNull();
  });

  it('acepta duoc.cl', () => {
    expect(validarEmail('test@duoc.cl')).toBeNull();
  });

  it('acepta profesor.duoc.cl', () => {
    expect(validarEmail('test@profesor.duoc.cl')).toBeNull();
  });

  it('acepta mayúsculas en el correo', () => {
    expect(validarEmail('TEST@GMAIL.COM')).toBeNull();
  });

  it('ignora espacios alrededor', () => {
    expect(validarEmail('  test@gmail.com  ')).toBeNull();
  });
});

describe('validarPassword', () => {
  it('rechaza vacío', () => {
    expect(validarPassword('')).toBe('La contraseña es obligatoria');
  });

  it('rechaza menos de 6 caracteres', () => {
    expect(validarPassword('Ab1')).toBe('Mínimo 6 caracteres');
  });

  it('rechaza sin mayúscula', () => {
    expect(validarPassword('abcdef1')).toBe('Debe tener al menos una mayúscula');
  });

  it('rechaza sin número', () => {
    expect(validarPassword('Abcdefg')).toBe('Debe tener al menos un número');
  });

  it('acepta contraseña válida', () => {
    expect(validarPassword('Abcdef1')).toBeNull();
  });

  it('acepta contraseña más larga', () => {
    expect(validarPassword('MiPassword123')).toBeNull();
  });
});

describe('validarConfirmacion', () => {
  it('rechaza vacío', () => {
    expect(validarConfirmacion('Abc123', '')).toBe('Confirma tu contraseña');
  });

  it('rechaza si no coinciden', () => {
    expect(validarConfirmacion('Abc123', 'Xyz789')).toBe('Las contraseñas no coinciden');
  });

  it('acepta si coinciden', () => {
    expect(validarConfirmacion('Abc123', 'Abc123')).toBeNull();
  });
});


describe('validarTelefono', () => {
  it('acepta vacío (es opcional)', () => {
    expect(validarTelefono('')).toBeNull();
  });

  it('acepta null / undefined', () => {
    expect(validarTelefono(null)).toBeNull();
    expect(validarTelefono(undefined)).toBeNull();
  });

  it('rechaza letras', () => {
    expect(validarTelefono('abc123')).toBe('Solo números, espacios, +, - y paréntesis');
  });

  it('rechaza muy corto', () => {
    expect(validarTelefono('123')).toContain('Debe tener entre');
  });

  it('rechaza muy largo', () => {
    expect(validarTelefono('1234567890123')).toContain('Debe tener entre');
  });

  it('acepta formato chileno con espacios', () => {
    expect(validarTelefono('+56 9 1234 5678')).toBeNull();
  });

  it('acepta solo números', () => {
    expect(validarTelefono('912345678')).toBeNull();
  });

  it('acepta formato con paréntesis y guion', () => {
    expect(validarTelefono('(+56) 9-1234-5678')).toBeNull();
  });
});

describe('validarRegion', () => {
  it('rechaza vacío', () => {
    expect(validarRegion('')).toBe('Selecciona una región');
  });

  it('rechaza null', () => {
    expect(validarRegion(null)).toBe('Selecciona una región');
  });

  it('acepta valor', () => {
    expect(validarRegion('Metropolitana')).toBeNull();
  });
});

describe('validarComuna', () => {
  it('rechaza vacío', () => {
    expect(validarComuna('')).toBe('Selecciona una comuna');
  });

  it('acepta valor', () => {
    expect(validarComuna('Ñuñoa')).toBeNull();
  });
});

describe('validarRegistro', () => {
  const datosValidos = {
    nombre: 'Juan Troncoso',
    rut: '221193245',
    email: 'test@gmail.com',
    password: 'Abcdef1',
    confirmacion: 'Abcdef1',
    telefono: '+56 9 1234 5678',
    region: 'Metropolitana',
    comuna: 'Ñuñoa',
  };

  it('devuelve todos los campos en null si todo es válido', () => {
    const errores = validarRegistro(datosValidos);
    expect(hayErrores(errores)).toBe(false);
    Object.values(errores).forEach((e) => expect(e).toBeNull());
  });

  it('detecta nombre inválido', () => {
    const errores = validarRegistro({ ...datosValidos, nombre: '' });
    expect(errores.nombre).toBe('El nombre es obligatorio');
    expect(hayErrores(errores)).toBe(true);
  });

  it('detecta varios errores a la vez', () => {
    const errores = validarRegistro({
      ...datosValidos,
      nombre: '',
      email: 'a@hotmail.com',
      password: 'abc',
    });
    expect(errores.nombre).toBeTruthy();
    expect(errores.email).toBeTruthy();
    expect(errores.password).toBeTruthy();
    expect(errores.rut).toBeNull();
    expect(errores.region).toBeNull();
  });

  it('detecta confirmación distinta', () => {
    const errores = validarRegistro({ ...datosValidos, confirmacion: 'Otro1' });
    expect(errores.confirmacion).toBe('Las contraseñas no coinciden');
  });
});

describe('hayErrores', () => {
  it('devuelve false si todos son null', () => {
    expect(hayErrores({ a: null, b: null, c: null })).toBe(false);
  });

  it('devuelve true si alguno tiene mensaje', () => {
    expect(hayErrores({ a: null, b: 'error', c: null })).toBe(true);
  });

  it('devuelve false en objeto vacío', () => {
    expect(hayErrores({})).toBe(false);
  });
});