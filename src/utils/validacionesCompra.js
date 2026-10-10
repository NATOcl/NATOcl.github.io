
export const FORM_VACIO = {
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    depto: '',
    region: '',
    comuna: '',
    indicaciones: '',
};

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_NOMBRE = /^\p{L}+(?: \p{L}+)*$/u;
export const limpiarNombre = (valor) => valor.replace(/[^\p{L}\s]/gu, '');

function errorDeNombre(valor,mensajeVacio){
    const limpio = valor.trim().replace(/\s+/g, ' ');
    if (limpio.length < 2) return mensajeVacio;
    if (limpio.length > 80) return 'usa como maximo 80 caracteres.';
    if (!REGEX_NOMBRE.test(limpio)) return 'usa solo letras y espacios';
    return '';
}
export function validarCompra(f){
    const errores = {};

    const errNombre = errorDeNombre(f.nombre,'Ingresa tu nombre.');
    if (errNombre) errores.nombre = errNombre;

    const errApellidos  = errorDeNombre(f.apellidos,'Ingresa tus apellidos.');
    if (errApellidos) errores.apellidos = errApellidos;

    if (!REGEX_CORREO.test(f.correo.trim())){
        errores.correo = 'Ingresa un correo valido';
    }

    if (f.calle.trim().length < 3) errores.calle = 'ingresa una calle y numero';
    if (!f.region) errores.region = 'selecciona una region';
    if (!f.comuna) errores.comuna = 'selecciona una comuna';

    return errores;

}

export const hayErrores = (errores) => Object.keys(errores).length >0;