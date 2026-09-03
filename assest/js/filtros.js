document.addEventListener("DOMContentLoaded", () => {
  // 1. Selección de elementos
  const btnServicios = document.getElementById("btn-servicios");
  const btnMedicamentos = document.getElementById("btn-medicamentos");
  const seccionServicios = document.getElementById("seccion-servicios");
  const seccionMedicamentos = document.getElementById("seccion-medicamentos");
  const inputBusqueda = document.getElementById("input-busqueda");

  let categoriaActual = "Todos";

  // 2. Cambio entre pestañas
  if (btnServicios && btnMedicamentos) {
    btnServicios.addEventListener("click", () => {
      activarPestana(btnServicios, btnMedicamentos);
      seccionServicios.classList.remove("hidden");
      seccionMedicamentos.classList.add("hidden");
      resetFiltros();
    });

    btnMedicamentos.addEventListener("click", () => {
      activarPestana(btnMedicamentos, btnServicios);
      seccionMedicamentos.classList.remove("hidden");
      seccionServicios.classList.add("hidden");
      resetFiltros();
    });
  }

  // Estilos de botones de pestaña
  function activarPestana(activa, inactiva) {
    activa.className =
      "py-2 px-4 text-xs font-semibold rounded-lg bg-teal-800 text-white shadow-sm flex items-center gap-2";
    inactiva.className =
      "py-2 px-4 text-xs font-semibold rounded-lg text-gray-600 hover:text-gray-900 flex items-center gap-2";

    const badgeActivo = activa.querySelector("span");
    const badgeInactivo = inactiva.querySelector("span");

    if (badgeActivo) {
      badgeActivo.className =
        "bg-teal-900/50 text-white text-[10px] px-1.5 py-0.5 rounded-full";
    }
    if (badgeInactivo) {
      badgeInactivo.className =
        "bg-gray-300 text-gray-700 text-[10px] px-1.5 py-0.5 rounded-full";
    }
  }

  // 3. Botones de categoría (delegación de eventos)
  document.addEventListener("click", (e) => {
    const btnFiltro = e.target.closest(".btn-filtro");

    if (btnFiltro) {
      const seccionActiva = obtenerSeccionActiva();
      if (!seccionActiva) return;

      seccionActiva.querySelectorAll(".btn-filtro").forEach((btn) => {
        btn.className =
          "btn-filtro px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
      });

      btnFiltro.className =
        "btn-filtro px-3 py-1 text-xs font-medium rounded-full bg-teal-800 text-white";

      categoriaActual = btnFiltro.getAttribute("data-categoria") || "Todos";
      aplicarFiltros();
    }
  });

  // 4. Búsqueda por texto
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", () => {
      aplicarFiltros();
    });
  }

  // 5. Filtrado dinámico
  function aplicarFiltros() {
    const textoBusqueda = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : "";
    const seccionActiva = obtenerSeccionActiva();

    if (!seccionActiva) return;

    const filas = seccionActiva.querySelectorAll(".fila-catalogo");

    filas.forEach((fila) => {
      const categoriaFila = fila.getAttribute("data-categoria");
      const textoFila = fila.innerText.toLowerCase();

      const cumpleCategoria =
        categoriaActual === "Todos" || categoriaFila === categoriaActual;
      const cumpleBusqueda =
        textoBusqueda === "" || textoFila.includes(textoBusqueda);

      if (cumpleCategoria && cumpleBusqueda) {
        fila.classList.remove("hidden");
      } else {
        fila.classList.add("hidden");
      }
    });
  }

  function obtenerSeccionActiva() {
    if (!seccionServicios || !seccionMedicamentos) return null;
    return seccionServicios.classList.contains("hidden")
      ? seccionMedicamentos
      : seccionServicios;
  }

  function resetFiltros() {
    categoriaActual = "Todos";
    if (inputBusqueda) inputBusqueda.value = "";

    const seccionActiva = obtenerSeccionActiva();
    if (seccionActiva) {
      seccionActiva.querySelectorAll(".btn-filtro").forEach((btn) => {
        const esTodos = btn.getAttribute("data-categoria") === "Todos";
        btn.className = esTodos
          ? "btn-filtro px-3 py-1 text-xs font-medium rounded-full bg-teal-800 text-white"
          : "btn-filtro px-3 py-1 text-xs font-medium rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50";
      });
    }

    aplicarFiltros();
  }

  // Inicialización
  aplicarFiltros();
});