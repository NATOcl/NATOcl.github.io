document.addEventListener("DOMContentLoaded", () => {
  // 1. SELECCIÓN DE ELEMENTOS
  const contenedorTabs = document.querySelector(".inline-flex.rounded-xl.bg-gray-200\\/60");
  const botonesTabs = contenedorTabs ? contenedorTabs.querySelectorAll("button") : [];

  const btnServicios = botonesTabs[0];
  const btnMedicamentos = botonesTabs[1];

  // Secciones completas
  const seccionServicios = document.getElementById("seccion-servicios");
  const seccionMedicamentos = document.getElementById("seccion-medicamentos");
  const inputBusqueda = document.getElementById("input-busqueda");

  // Clases CSS base para categorías (verde = filtro activo)
  const CLASES_ACTIVO = ["bg-teal-800", "text-white"];
  const CLASES_INACTIVO = ["bg-white", "border", "border-gray-300", "text-gray-700"];

  // 2. CAMBIO DE PESTAÑAS (Oculta/Muestra la sección completa correspondiente)
  function cambiarPestana(activa, inactiva, mostrarSeccion, ocultarSeccion) {
    // Estilos del botón pestaña activo
    activa.className = "py-2 px-4 text-xs font-semibold rounded-lg bg-teal-800 text-white shadow-sm flex items-center gap-2";
    const badgeActivo = activa.querySelector("span");
    if (badgeActivo) badgeActivo.className = "bg-teal-900/50 text-white text-[10px] px-1.5 py-0.5 rounded-full";

    // Estilos del botón pestaña inactivo
    inactiva.className = "py-2 px-4 text-xs font-semibold rounded-lg text-gray-600 hover:text-gray-900 flex items-center gap-2";
    const badgeInactivo = inactiva.querySelector("span");
    if (badgeInactivo) badgeInactivo.className = "bg-gray-300 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full";

    // Mostrar/Ocultar sección entera (incluye sus botones de filtro)
    if (mostrarSeccion) mostrarSeccion.classList.remove("hidden");
    if (ocultarSeccion) ocultarSeccion.classList.add("hidden");
  }

  if (btnServicios && btnMedicamentos) {
    btnServicios.addEventListener("click", () => {
      cambiarPestana(btnServicios, btnMedicamentos, seccionServicios, seccionMedicamentos);
    });

    btnMedicamentos.addEventListener("click", () => {
      cambiarPestana(btnMedicamentos, btnServicios, seccionMedicamentos, seccionServicios);
    });
  }

  // 3. RENDERIZADO Y FILTRADO DE CATEGORÍAS
  function obtenerSeccionActiva() {
    if (seccionMedicamentos && !seccionMedicamentos.classList.contains("hidden")) {
      return seccionMedicamentos;
    }
    return seccionServicios;
  }

  function renderizarBotones(botones, categoriaActiva) {
    botones.forEach((btn) => {
      const cat = btn.getAttribute("data-categoria");
      
      // Limpieza profunda de clases
      btn.classList.remove("bg-teal-800", "bg-teal-700", "bg-teal-800", "text-white", "bg-white", "border", "border-gray-300", "text-gray-700");

      if (cat === categoriaActiva) {
        btn.classList.add(...CLASES_ACTIVO);
        btn.dataset.activo = "true";
      } else {
        btn.classList.add(...CLASES_INACTIVO);
        btn.dataset.activo = "false";
      }
    });
  }

  const botonesFiltro = document.querySelectorAll(".btn-filtro");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      const seccionActual = obtenerSeccionActiva();
      const botonesDeEstaSeccion = seccionActual.querySelectorAll(".btn-filtro");
      const categoriaClickeada = boton.getAttribute("data-categoria");

      const estaActivo = boton.dataset.activo === "true";
      let nuevaCategoriaActiva = categoriaClickeada;

      // Si se hace clic en una categoría ya activa (salvo "Todos"), se vuelve a "Todos"
      if (estaActivo && categoriaClickeada !== "Todos") {
        nuevaCategoriaActiva = "Todos";
      }

      // Pintar los botones correctamente
      renderizarBotones(botonesDeEstaSeccion, nuevaCategoriaActiva);

      // Filtrar filas
      const filas = seccionActual.querySelectorAll(".fila-catalogo");
      filas.forEach((fila) => {
        const categoriaFila = fila.getAttribute("data-categoria");
        if (nuevaCategoriaActiva === "Todos" || categoriaFila === nuevaCategoriaActiva) {
          fila.classList.remove("hidden");
        } else {
          fila.classList.add("hidden");
        }
      });
    });
  });

  // Inicializar estado por defecto
  [seccionServicios, seccionMedicamentos].forEach((seccion) => {
    if (seccion) {
      const btns = seccion.querySelectorAll(".btn-filtro");
      renderizarBotones(btns, "Todos");
    }
  });

  // 4. BÚSQUEDA GLOBAL
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