document.addEventListener('DOMContentLoaded', () => {
  const registroForm = document.getElementById('registroForm');
  
  // Elementos del formulario
  const inputNombre = document.getElementById('nombreCompleto');
  const inputCorreo = document.getElementById('correo');
  const inputContrasena = document.getElementById('contrasena');
  const inputConfirmarContrasena = document.getElementById('confirmarContrasena');
  const inputTelefono = document.getElementById('telefono');
  const selectRegion = document.getElementById('region');
  const selectComuna = document.getElementById('comuna');

  // Elementos de mensaje de error
  const errorNombre = document.getElementById('errorNombre');
  const errorCorreo = document.getElementById('errorCorreo');
  const errorContrasena = document.getElementById('errorContrasena');
  const errorConfirmarContrasena = document.getElementById('errorConfirmarContrasena');
  const errorRegion = document.getElementById('errorRegion');
  const errorComuna = document.getElementById('errorComuna');
  const generalError = document.getElementById('generalError');

  // Expresión regular para correo institucional / común
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

  registroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    limpiarErrores();

    // === VALIDA NOMBRE COMPLETO ===
    if (inputNombre.value.trim() === '') {
      mostrarError(inputNombre, errorNombre, 'El nombre completo es obligatorio.');
      isValid = false;
    }

    // === VALIDA CORREO ===
    const correoVal = inputCorreo.value.trim();
    if (correoVal === '') {
      mostrarError(inputCorreo, errorCorreo, 'El correo electrónico es obligatorio.');
      isValid = false;
    } else if (correoVal.length > 100) {
      mostrarError(inputCorreo, errorCorreo, 'El correo no puede exceder los 100 caracteres.');
      isValid = false;
    } else if (!emailRegex.test(correoVal)) {
      mostrarError(inputCorreo, errorCorreo, 'Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).');
      isValid = false;
    }

    // === VALIDA CONTRASEÑA ===
    const passVal = inputContrasena.value;
    if (passVal === '') {
      mostrarError(inputContrasena, errorContrasena, 'La contraseña es obligatoria.');
      isValid = false;
    } else if (passVal.length < 4 || passVal.length > 10) {
      mostrarError(inputContrasena, errorContrasena, 'La contraseña debe tener entre 4 y 10 caracteres.');
      isValid = false;
    }

    // === VALIDA CONFIRMAR CONTRASEÑA ===
    const passConfVal = inputConfirmarContrasena.value;
    if (passConfVal === '') {
      mostrarError(inputConfirmarContrasena, errorConfirmarContrasena, 'Confirma tu contraseña.');
      isValid = false;
    } else if (passVal !== passConfVal) {
      mostrarError(inputConfirmarContrasena, errorConfirmarContrasena, 'Las contraseñas no coinciden.');
      isValid = false;
    }

    // === VALIDA REGIÓN ===
    if (selectRegion.value === '') {
      mostrarError(selectRegion, errorRegion, 'Selecciona una región.');
      isValid = false;
    }

    // === VALIDA COMUNA ===
    if (selectComuna.value === '') {
      mostrarError(selectComuna, errorComuna, 'Selecciona una comuna.');
      isValid = false;
    }

    // === ÉXITO ===
    if (isValid) {
      generalError.classList.remove('hidden', 'bg-red-50', 'border-red-200', 'text-red-600');
      generalError.classList.add('bg-emerald-50', 'border-emerald-200', 'text-emerald-700');
      generalError.textContent = '¡Registro exitoso! Redirigiendo a inicio de sesión...';

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    }
  });

  // Funciones auxiliares para mostrar/ocultar errores visuales
  function mostrarError(input, labelError, mensaje) {
    input.classList.add('border-red-500', 'focus:ring-red-500');
    input.classList.remove('border-gray-300', 'focus:ring-[#007a6e]');
    labelError.textContent = mensaje;
    labelError.classList.remove('hidden');
  }

  function resetInputStyle(input, labelError) {
    input.classList.remove('border-red-500', 'focus:ring-red-500');
    input.classList.add('border-gray-300', 'focus:ring-[#007a6e]');
    labelError.classList.add('hidden');
    labelError.textContent = '';
  }

  function limpiarErrores() {
    [
      [inputNombre, errorNombre],
      [inputCorreo, errorCorreo],
      [inputContrasena, errorContrasena],
      [inputConfirmarContrasena, errorConfirmarContrasena],
      [selectRegion, errorRegion],
      [selectComuna, errorComuna]
    ].forEach(([input, label]) => resetInputStyle(input, label));

    generalError.classList.add('hidden');
  }

  // Quita el mensaje de error cuando el usuario empieza a escribir o seleccionar
  [
    [inputNombre, errorNombre],
    [inputCorreo, errorCorreo],
    [inputContrasena, errorContrasena],
    [inputConfirmarContrasena, errorConfirmarContrasena],
    [selectRegion, errorRegion],
    [selectComuna, errorComuna]
  ].forEach(([input, label]) => {
    input.addEventListener('input', () => resetInputStyle(input, label));
    input.addEventListener('change', () => resetInputStyle(input, label));
  });
});