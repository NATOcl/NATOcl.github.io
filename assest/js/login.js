document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const inputCorreo = document.getElementById('correo');
  const inputContrasena = document.getElementById('contrasena');

  const errorCorreo = document.getElementById('errorCorreo');
  const errorContrasena = document.getElementById('errorContrasena');
  const generalError = document.getElementById('generalError');

  // Permite exactamente los dominios: @duoc.cl, @profesor.duoc.cl y @gmail.com
  const emailDomainRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    limpiarErrores();

    const valorCorreo = inputCorreo.value.trim();
    const valorContrasena = inputContrasena.value;

    // === VALIDACIÓN: CORREO ===
    if (valorCorreo === '') {
      mostrarError(inputCorreo, errorCorreo, 'El correo electrónico es obligatorio.');
      isValid = false;
    } else if (valorCorreo.length > 100) {
      mostrarError(inputCorreo, errorCorreo, 'El correo no puede tener más de 100 caracteres.');
      isValid = false;
    } else if (!emailDomainRegex.test(valorCorreo)) {
      mostrarError(inputCorreo, errorCorreo, 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com');
      isValid = false;
    }

    // === VALIDACIÓN: CONTRASEÑA ===
    if (valorContrasena === '') {
      mostrarError(inputContrasena, errorContrasena, 'La contraseña es obligatoria.');
      isValid = false;
    } else if (valorContrasena.length < 4 || valorContrasena.length > 10) {
      mostrarError(inputContrasena, errorContrasena, 'La contraseña debe tener entre 4 y 10 caracteres.');
      isValid = false;
    }

    // === REDIRECCIÓN / ÉXITO ===
    if (isValid) {
      generalError.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-600');
      generalError.classList.add('bg-emerald-50', 'border-emerald-200', 'text-emerald-700');
      generalError.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    }
  });

  inputCorreo.addEventListener('input', () => resetInputStyle(inputCorreo, errorCorreo));
  inputContrasena.addEventListener('input', () => resetInputStyle(inputContrasena, errorContrasena));

  function mostrarError(inputElement, labelError, mensaje) {
    inputElement.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputElement.classList.remove('border-gray-300', 'focus:ring-teal-700', 'focus:border-teal-700');
    labelError.textContent = mensaje;
    labelError.classList.remove('hidden');
  }

  function resetInputStyle(inputElement, labelError) {
    inputElement.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
    inputElement.classList.add('border-gray-300', 'focus:ring-teal-700', 'focus:border-teal-700');
    labelError.classList.add('hidden');
    labelError.textContent = '';
  }

  function limpiarErrores() {
    resetInputStyle(inputCorreo, errorCorreo);
    resetInputStyle(inputContrasena, errorContrasena);
    generalError.classList.add('hidden');
  }
});