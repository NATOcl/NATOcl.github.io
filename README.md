#  PetCare
 
Sitio web
 
> Proyecto de la *Evaluación 01* — 
 
<!-- TODO: agrega aquí el nombre del ramo / sección / docente si corresponde -->
 
##  Demo
 
<!-- TODO: verifica que esta URL sea la correcta -->
https://natocl.github.io/
 
##  Funcionalidades
 
- **Catálogo con pestañas:** "Servicios" y "Medicamentos y Vacunas".
- **Filtros por categoría** mediante botones.
- **Buscador** de productos y servicios.
- **Carrito de compras** para agregar y revisar productos.
- **Login y registro** de usuarios con sus propias validaciones en JavaScript.
- **Formulario de contacto.**
- **Nosotros.** Donde el usuario puede enterarse del equipo que conforma la veterinaria
##  Tecnologías
 
| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| Boostrap CSS | Estilos mediante clases utilitarias |
| JavaScript (vanilla) | Filtros, buscador, carrito y validaciones |
| GitHub Pages | Publicación del sitio |
 
##  Estructura del proyecto
 
```
NATOcl.github.io/
├── index.html                  # Punto de entrada principal
├── package.json                # Dependencias del proyecto
├── vite.config.js              # Configuración de Vite
├── public/                     # Archivos estáticos públicos
└── src/                        # Código fuente principal
    ├── assets/                 # Imágenes y SVGs
    ├── components/             # Componentes reutilizables
    │   ├── Footer.jsx
    │   └── Navbar.jsx
    ├── hooks/                  # Custom hooks de React
    │   └── useUserProfile.js
    ├── pages/                  # Vistas principales de la aplicación
    │   ├── Blogs.jsx
    │   ├── Contacto.jsx        #
    │   ├── Home.jsx            # 
    │   ├── Login.jsx           # 
    │   ├── Nosotros.jsx        # 
    │   ├── Registro.jsx        # 
    │   └── UserProfile.jsx
    ├── utils/                  # Funciones utilitarias y validaciones
    │   └── validacionescontacto.js # lógica de contacto.js
    ├── App.css                 # Estilos de la app
    ├── App.jsx                 # Componente raíz
    ├── index.css               # Estilos globales
    ├── main.jsx                # Punto de montaje de React
    └── Root.jsx                # Configuración de enrutamiento raíz
```
##  Cómo ejecutarlo
 
1. Clona el repositorio:
```bash
   git clone https://github.com/NATOcl/NATOcl.github.io.git
```
2. Entra a la carpeta:
```bash
   cd NATOcl.github.io
```
3. Abre `index.html` en el navegador, o usa la extensión **Live Server** de VS Code para verlo con recarga automática.
No requiere instalar dependencias ni compilar nada.
 
<!-- TODO: confirma los nombres completos y agrega los enlaces a sus perfiles -->

## Equipo
- **Troncoso** - [@NATOcl](https://github.com/NATOcl)
- **Obreque** - [@daniobreq](https://github.com/daniobreq)
- **Abarca** - [@AntoAbarca](https://github.com/AntoAbarca)
- 
##  Licencia
 
<!-- TODO: define una licencia o borra esta sección -->
Proyecto con fines académicos.
