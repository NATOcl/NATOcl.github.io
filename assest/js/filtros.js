document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECCIÓN DE ELEMENTOS
  // Seleccionamos los dos botones principales por su orden en el contenedor de pestañas
  const contenedorTabs = document.querySelector(".inline-flex.rounded-xl.bg-gray-200\\/60");
  const botonesTabs = contenedorTabs ? contenedorTabs.querySelectorAll("button") : [];
  
  const btnServicios = botonesTabs[0];
  const btnMedicamentos = botonesTabs[1];

  // Secciones
  const seccionServicios = document.querySelector("main > div:nth-of-type(4)"); // Primera sección de catálogo/tabla
  const seccionMedicamentos = document.getElementById("seccion-medicamentos");

  // Buscador
  const inputBusqueda = document.getElementById("input-busqueda");

  // 2. ESTILOS DE LAS PESTAÑAS (Clases de Tailwind)
  const clasesActivas = ["bg-teal-800", "text-white", "shadow-sm"];
  const clasesInactivas = ["text-gray-600", "hover:text-gray-900"];

  function cambiarPestana(activa, inactiva, mostrarSeccion, ocultarSeccion) {
    // Aplicar estilos al botón activo
    activa.classList.add(...clasesActivas);
    activa.classList.remove(...clasesInactivas);

    // Aplicar estilos al botón inactivo
    inactiva.classList.remove(...clasesActivas);
    inactiva.classList.add(...clasesInactivas);

    // Mostrar/Ocultar secciones
    if (mostrarSeccion) mostrarSeccion.classList.remove("hidden");
    if (ocultarSeccion) ocultarSeccion.classList.add("hidden");
  }

  // 3. EVENTOS DE PESTAÑAS
  if (btnServicios && btnMedicamentos) {
    btnServicios.addEventListener("click", () => {
      cambiarPestana(btnServicios, btnMedicamentos, seccionServicios, seccionMedicamentos);
    });

    btnMedicamentos.addEventListener("click", () => {
      cambiarPestana(btnMedicamentos, btnServicios, seccionMedicamentos, seccionServicios);
    });
  }

  // 4. FILTRADO POR CATEGORÍAS (Botones redondos: Todos, Consultas, Cirugía, etc.)
  const botonesFiltro = document.querySelectorAll(".btn-filtro");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      // Identificar el contenedor padre de la sección actual
      const contenedorPadre = boton.closest("#seccion-medicamentos") || seccionServicios;
      
      // Cambiar estilos entre los botones de categoría de esa sección
      const hermanos = contenedorPadre.querySelectorAll(".btn-filtro");
      hermanos.forEach((b) => {
        b.classList.remove("bg-teal-800", "text-white");
        b.classList.add("bg-white", "border", "border-gray-300", "text-gray-700");
      });

      boton.classList.remove("bg-white", "border", "border-gray-300", "text-gray-700");
      boton.classList.add("bg-teal-800", "text-white");

      // Filtrar filas de la tabla
      const categoriaSeleccionada = boton.getAttribute("data-categoria");
      const filas = contenedorPadre.querySelectorAll(".fila-catalogo");

      filas.forEach((fila) => {
        const categoriaFila = fila.getAttribute("data-categoria");
        if (categoriaSeleccionada === "Todos" || categoriaFila === categoriaSeleccionada) {
          fila.classList.remove("hidden");
        } else {
          fila.classList.add("hidden");
        }
      });
    });
  });

  // 5. BÚSQUEDA EN TIEMPO REAL POR TEXTO O CÓDIGO
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", (e) => {
      const termino = e.target.value.toLowerCase().trim();
      const filasTodas = document.querySelectorAll(".fila-catalogo");

      filasTodas.forEach((fila) => {
        const textoFila = fila.textContent.toLowerCase();
        if (textoFila.includes(termino)) {
          fila.classList.remove("hidden");
        } else {
          fila.classList.add("hidden");
        }
      });
    });
  }
});