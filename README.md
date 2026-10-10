# PetCare

Sitio web de una veterinaria, desarrollado como aplicación de una sola página (SPA) con React y Vite.

> Proyecto de la *Evaluación 02*

## Demo

https://natocl.github.io/

## Funcionalidades

- **Catálogo con pestañas:** "Servicios" y "Medicamentos y Vacunas".
- **Filtros por categoría** mediante botones.
- **Buscador** de productos y servicios.
- **Carrito de compras** para agregar y revisar productos.
- **Login y registro** de usuarios con validaciones propias en JavaScript.
- **Perfil de usuario**, gestionado con el hook personalizado `useUserProfile`.
- **Formulario de contacto** con validaciones (`validacionescontacto.js`).
- **Blogs.**
- **Nosotros:** el usuario puede conocer al equipo que conforma la veterinaria.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React | Interfaz basada en componentes y hooks |
| Vite | Entorno de desarrollo y empaquetado |
| JavaScript (ES6+) | Filtros, buscador, carrito y validaciones |
| Bootstrap | Estilos mediante clases utilitarias |
| Jasmine | Pruebas unitarias (carpeta `spec/`) |
| ESLint | Análisis estático y calidad del código |
| Playwright | Análisis |
| GitHub Pages | Publicación del sitio |

## Estructura del proyecto

```
NATOcl.github.io/
├── .github/                    # Configuración de GitHub (workflows, etc.)
├── .idea/                      # Configuración del IDE
├── legacy/                     # Versión anterior del sitio (HTML estático)
├── node_modules/               # Dependencias instaladas
├── public/                     # Archivos estáticos públicos
├── spec/
│   └── support/
│       └── jasmine.mjs         # Configuración de Jasmine (tests)
├── src/                        # Código fuente principal
│   ├── assets/                 # Imágenes (PNG, JPG y SVG)
│   ├── components/             # Componentes reutilizables
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── hooks/                  # Custom hooks de React
│   │   └── useUserProfile.js
│   ├── pages/                  # Vistas principales de la aplicación
│   │   ├── Blogs.jsx
│   │   ├── Contacto.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Registro.jsx
│   │   └── UserProfile.jsx
│   ├── utils/                  # Funciones utilitarias y validaciones
│   │   └── validacionescontacto.js
│   ├── App.css                 # Estilos de la app
│   ├── App.jsx                 # Componente raíz
│   ├── index.css               # Estilos globales
│   ├── main.jsx                # Punto de montaje de React
│   └── Root.jsx                # Configuración de enrutamiento raíz
├── temporal/                   # Archivos temporales
├── .gitignore
├── eslint.config.js            # Configuración de ESLint
├── index.html                  # Punto de entrada principal
├── package.json                # Dependencias del proyecto
├── package-lock.json
├── README.md
└── vite.config.js              # Configuración de Vite
```

## Cómo ejecutarlo

Requisito: tener [Node.js](https://nodejs.org/) instalado.

1. Clona el repositorio:
```bash
   git clone https://github.com/NATOcl/NATOcl.github.io.git
```
2. Entra a la carpeta:
```bash
   cd NATOcl.github.io
```
3. Instala las dependencias:
```bash
   npm install
```
4. Inicia el servidor de desarrollo:
```bash
   npm run dev
```
5. Abre en el navegador la dirección que indique la terminal (normalmente `http://localhost:5173`).


## Equipo

- **Troncoso** - [@NATOcl](https://github.com/NATOcl)
- **Obreque** - [@daniobreq](https://github.com/daniobreq)
- **Abarca** - [@AntoAbarca](https://github.com/AntoAbarca)


## Licencia

Proyecto con fines académicos.
