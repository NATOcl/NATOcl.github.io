# NATOcl.github.io

> Evaluación 01-02-03 – Troncoso / Obreque / Abarca

Sitio web de e-commerce.

**Demo:** https://natocl.github.io

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Estado del proyecto](#estado-del-proyecto)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y uso](#instalación-y-uso)
- [Migración a React](#migración-a-react)
- [Autores](#autores)

---

## Descripción

Proyecto web que simula una tienda en línea, con navegación entre las secciones principales, catálogo de productos, carrito de compras y flujo de autenticación de usuarios.

### Páginas incluidas

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Página principal |
| Productos | `productos.html` | Catálogo de productos |
| Carrito | `carrito.html` | Carrito de compras |
| Login | `login.html` | Inicio de sesión |
| Registro | `registro.html` | Registro de nuevos usuarios |
| Blogs | `blogs.html` | Sección de blog |
| Contacto | `contacto.html` | Formulario de contacto |
| Nosotros | `aboutus.html` | Información del equipo |

---

## Estado del proyecto

| Versión | Estado |
|---|---|
| HTML / CSS / JS estático | Funcional |
| Migración a **React** | En desarrollo |

---

## Tecnologías

**Actual**
- HTML5
- CSS3 <!-- agregar Bootstrap / Tailwind si aplica -->
- JavaScript
- Node.js / npm (gestión de dependencias)
- GitHub Pages (hosting)

**En incorporación**
- React
- <!-- Vite / Create React App, React Router, etc. -->

---

## Estructura del proyecto

```
NATOcl.github.io/
├── admin/            # Sección de administración
├── assest/           # Recursos estáticos (imágenes, estilos, scripts)
├── docs/             # Documentación
├── aboutus.html
├── blogs.html
├── carrito.html
├── contacto.html
├── index.html
├── login.html
├── productos.html
├── registro.html
├── package.json
└── readme.md
```

---

## Instalación y uso

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- [Git](https://git-scm.com/)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/NATOcl/NATOcl.github.io.git

# 2. Entrar a la carpeta
cd NATOcl.github.io

# 3. Instalar dependencias
npm install

# 4. Ejecutar el proyecto
npm start   # o el script definido en package.json
```

Para ver la versión estática, también puedes abrir `index.html` directamente en el navegador o usar la extensión *Live Server* de VS Code.

---

## Migración a React

El proyecto está siendo actualizado para usar **React**. Plan de migración:

- [ ] Configurar entorno React (<!-- Vite / CRA -->)
- [ ] Convertir páginas HTML en componentes reutilizables
- [ ] Crear componentes compartidos (Navbar, Footer, Card de producto)
- [ ] Implementar enrutamiento con React Router
- [ ] Manejar el estado del carrito (Context API / hooks)
- [ ] Migrar login y registro
- [ ] Configurar despliegue en GitHub Pages

---

## Autores

- **Troncoso** – [@NATOcl](https://github.com/NATOcl) <!-- completar -->
- **Obreque** – [@daniobreq](https://github.com/daniobreq) <!-- completar -->
- **Abarca** – [@AntoAbarca](https://github.com/AntoAbarca) <!-- completar -->

---

## Licencia

<!-- Agregar licencia si corresponde (MIT, etc.) -->
Proyecto con fines académicos.
