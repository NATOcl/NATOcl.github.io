document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactoForm');
    const mensajeExito = document.getElementById('mensajeExito');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Obtener valores de las entradas
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById('correo');
        const numeroInput = document.getElementById('numero');
        const mensajeInput = document.getElementById('mensaje');

        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim().toLowerCase();
        const numero = numeroInput.value.trim();
        const mensaje = mensajeInput.value.trim();

        // Limpiar errores previos
        ocultarErrores();
        let esValido = true;

        // 2. Validación de Nombre (Requerido, Max 100 caracteres)
        if (nombre === '') {
            mostrarError('errorNombre', 'El nombre es obligatorio.');
            esValido = false;
        } else if (nombre.length > 100) {
            mostrarError('errorNombre', 'El nombre no puede superar los 100 caracteres.');
            esValido = false;
        }

        // 3. Validación de Correo (Max 100 caracteres, Dominios permitidos)
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        const dominioValido = dominiosPermitidos.some(dominio => correo.endsWith(dominio));

        if (correo === '') {
            mostrarError('errorCorreo', 'El correo electrónico es obligatorio.');
            esValido = false;
        } else if (correo.length > 100) {
            mostrarError('errorCorreo', 'El correo no puede superar los 100 caracteres.');
            esValido = false;
        } else if (!dominioValido) {
            mostrarError('errorCorreo', 'El correo debe ser de dominio @duoc.cl, @profesor.duoc.cl o @gmail.com.');
            esValido = false;
        }

        // 4. Validación de Comentario / Mensaje (Requerido, Max 500 caracteres)
        if (mensaje === '') {
            mostrarError('errorMensaje', 'El mensaje es obligatorio.');
            esValido = false;
        } else if (mensaje.length > 500) {
            mostrarError('errorMensaje', 'El mensaje no puede superar los 500 caracteres.');
            esValido = false;
        }

        // 5. Guardar en localStorage si todo es correcto
        if (esValido) {
            const nuevoContacto = {
                id: Date.now(),
                nombre: nombre,
                correo: correo,
                telefono: numero || 'No especificado',
                mensaje: mensaje,
                fecha: new Date().toLocaleString()
            };

            // Obtener mensajes almacenados previamante o crear arreglo nuevo
            const contactosGuardados = JSON.parse(localStorage.getItem('contactos_petcare')) || [];
            contactosGuardados.push(nuevoContacto);

            // Guardar lista actualizada en el navegador
            localStorage.setItem('contactos_petcare', JSON.stringify(contactosGuardados));

            // Limpiar campos del formulario y mostrar confirmación
            form.reset();
            mensajeExito.classList.remove('hidden');

            setTimeout(() => {
                mensajeExito.classList.add('hidden');
            }, 5000);
        }
    });

    function mostrarError(elementId, mensaje) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.classList.remove('hidden');
        }
    }

    function ocultarErrores() {
        const errores = document.querySelectorAll('[id^="error"]');
        errores.forEach(el => {
            el.textContent = '';
            el.classList.add('hidden');
        });
        mensajeExito.classList.add('hidden');
    }
});