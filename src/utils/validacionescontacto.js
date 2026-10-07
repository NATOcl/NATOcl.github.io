const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/
const LETRAS_Y_NUMEROS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/

export const MAX_MOTIVO = 300

export const ESPECIES = [
    {value: 'Perro', label: 'Perro' },
    {value: 'Gato', label: 'Gato' },
    {value: 'Conejo', label: 'Conejo' },
    {value: 'Roedor', label: 'Roedor' },
    {value: 'Hurón', label: 'Hurón' },
    {value: 'Ave', label: 'Ave' },
    {value: 'Reptil', label: 'Reptil' },
    {value: 'Otro', label: 'Otro (especifica)' },

]

export const validarNombre = (valor) => {
    const v = valor.trim()
    if (!v) return 'Ingresa tu nombre.'
    if (v.length < 2) return 'El nombre debe tener al menos 2 caracteres.'
    if (v.length > 60) return 'El nombre no puede superar los 60 caracteres.'
    if (!SOLO_LETRAS.test(v)) return 'El nombre solo debe contener letras.'
    return ''
}

export const validarTelefono = (valor) => {
    const v = valor.replace(/\s+/g,'')
    if (!v) return 'Ingresa tu numero.'
    if (!/^(\+?56)?\d{8,9}$/.test(v)) return 'Usa un celular chileno, ej: +56 9 1234 56789.'
    return ''
}

export const validarMascota = (valor) => {
    const v = valor.trim()
    if (!v) return 'Ingresa el nombre de tu mascota'
    if (v.length < 2) return 'El nombre debe tener al menos 2 caracteres'
    if (v.length > 30) return 'El nombre debe tener menos de 30 caracteres'
    if(!LETRAS_Y_NUMEROS.test(v)) return 'El nombre tiene caracteres no permitidos'
    return ''
}

export const validarEspecie = (valor) => {
    if (!valor) return 'Selecciona la especie de tu mascota.'
    if (!ESPECIES.some((e) => e.value === valor)) return 'Selecciona una opcion de la lista.'
    return ''
}

export const validarEspecieOtra = (valor) => {
    const v = valor.trim()
    if (!v) return 'Escribe la especie de tu mascota.'
    if (v.length < 2) return 'La especie debe tener mas de 2 caracteres.'
    if (v.length > 30) return 'La especie no puede superar los 30 caracteres'
    if (!SOLO_LETRAS.test(v)) return 'La especie solo puede contener letras'
    return ''
}

export const validarMotivo = (valor) => {
    const v = valor.trim()
    if (!v) return 'Cuentanos el motivo de la consulta'
    if (v.length < 10) return 'Describe el motivo de la consula con almenos 10 caracteres'
    if (v.length > MAX_MOTIVO) return `el motivo no puede superar los ${MAX_MOTIVO} caracteres`
    return ''
}

export const VALIDADORES = {
    nombre: validarNombre,
    telefono: validarTelefono,
    mascota: validarMascota,
    especie: validarEspecie,
    especieOtra: validarEspecieOtra,
    motivo: validarMotivo,

}

export const validarFormulario = (form) => {
    const errores = {}
    Object.keys(VALIDADORES).forEach((campo) => {
        if (campo === 'especieOtra' && form.especie !== 'Otro') return
        const mensaje = VALIDADORES[campo](form[campo])
        if (mensaje) errores[campo] = mensaje
    })
    return errores
}