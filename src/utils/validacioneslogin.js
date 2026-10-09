// src/utils/validations.js

export const validateLoginForm = (data) => {
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.'
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Ingresa un formato de correo válido.'
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.'
  }

  return errors
}