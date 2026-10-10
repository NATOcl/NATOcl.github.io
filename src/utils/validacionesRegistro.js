
const NOMBRE_MAX = 60;
const NOMBRE_MIN = 3;
const RUT_MIN = 7;
const RUT_MAX = 9;
const TELEFONO_MIN = 8;
const TELEFONO_MAX = 12; 
const PASSWORD_MIN = 6;

// Dominios permitidos para el correo
const DOMINIOS_PERMITIDOS = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];

export function validarNombre(nombre) {
  const valor = (nombre || '').trim();
  if (!valor) return 'El nombre es obligatorio';
  if (valor.length < NOMBRE_MIN) return `Mínimo ${NOMBRE_MIN} caracteres`;
  if (valor.length > NOMBRE_MAX) return `Máximo ${NOMBRE_MAX} caracteres`;
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
    return 'Solo se permiten letras y espacios';
  }
  return null; 
}

export function validarRut(rut) {
  const valor = (rut || '').trim().replace(/[.\-]/g, '');
  if (!valor) return 'El RUT es obligatorio';
  if (!/^\d{7,8}[0-9kK]$/.test(valor)) {
    return 'Formato: 7-8 dígitos + dígito verificador (ej: 19011022K)';
  }
  // Validación módulo 11 real del RUT chileno
  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1).toUpperCase();
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado =
    resto === 11 ? '0' : resto === 10 ? 'K' : String(resto);
  if (dv !== dvEsperado) return 'RUT inválido (dígito verificador no coincide)';
  return null;
}

export function validarEmail(email) {
  const valor = (email || '').trim().toLowerCase();
  if (!valor) return 'El correo es obligatorio';
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(valor)) return 'Correo con formato inválido';
  const dominio = valor.split('@')[1];
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    return `Solo se permiten correos @${DOMINIOS_PERMITIDOS.join(', @')}`;
  }
  return null;
}

export function validarPassword(password) {
  if (!password) return 'La contraseña es obligatoria';
  if (password.length < PASSWORD_MIN) {
    return `Mínimo ${PASSWORD_MIN} caracteres`;
  }
  if (!/[A-Z]/.test(password)) return 'Debe tener al menos una mayúscula';
  if (!/[0-9]/.test(password)) return 'Debe tener al menos un número';
  return null;
}

export function validarConfirmacion(password, confirmacion) {
  if (!confirmacion) return 'Confirma tu contraseña';
  if (password !== confirmacion) return 'Las contraseñas no coinciden';
  return null;
}

export function validarTelefono(telefono) {
  const valor = (telefono || '').trim();
  // Opcional
  if (!valor) return null;
  // Solo dígitos, espacios, +, -, ()
  if (!/^[\d\s+\-()]+$/.test(valor)) {
    return 'Solo números, espacios, +, - y paréntesis';
  }
  const soloDigitos = valor.replace(/\D/g, '');
  if (soloDigitos.length < TELEFONO_MIN || soloDigitos.length > TELEFONO_MAX) {
    return `Debe tener entre ${TELEFONO_MIN} y ${TELEFONO_MAX} dígitos`;
  }
  return null;
}

export function validarRegion(region) {
  return region ? null : 'Selecciona una región';
}

export function validarComuna(comuna) {
  return comuna ? null : 'Selecciona una comuna';
}

export function validarRegistro(datos) {
  return {
    nombre: validarNombre(datos.nombre),
    rut: validarRut(datos.rut),
    email: validarEmail(datos.email),
    password: validarPassword(datos.password),
    confirmacion: validarConfirmacion(datos.password, datos.confirmacion),
    telefono: validarTelefono(datos.telefono),
    region: validarRegion(datos.region),
    comuna: validarComuna(datos.comuna),
  };
}

export function hayErrores(errores) {
  return Object.values(errores).some((e) => e !== null);
}