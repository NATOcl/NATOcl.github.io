export const validarLogin = (data) => {
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio.'
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!data.password) {
    errors.password = 'La contraseña es obligatoria.'
  } else if (data.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres.'
  }

  return errors
}


const USUARIOS_MOCK = [
  {
    id: 1,
    email: 'admin@petcare.cl',
    password: 'admin123',
    role: 'admin',
    nombre: 'Administrador',
    apellido: 'PetCare'
  },
  {
    id: 2,
    email: 'pedro.hacker20@example.com',
    password: 'user123',
    role: 'cliente',
    nombre: 'Pedro',
    apellido: 'Hacker'
  }
]


export const autenticarUsuario = (email, password) => {
  return USUARIOS_MOCK.find(
    (u) => u.email === email && u.password === password
  )
}