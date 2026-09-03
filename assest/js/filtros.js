document.addEventListener("DOMContentLoaded", () => {
  const btnServicios = document.getElementById("btn-servicios");
  const btnMedicamentos = document.getElementById("btn-medicamentos");
  const seccionServicios = document.getElementById("seccion-servicios");
  const seccionMedicamentos = document.getElementById("seccion-medicamentos");
  const inputBusqueda = document.getElementById("input-busqueda");

  let categoriaActual = "Todos";

  // --- CAPTURAR BÚSQUEDA DE INDEX.HTML ---
  const urlParams = new URLSearchParams(window.location.search);
  const terminoBusqueda = urlParams.get('buscar');

  if (terminoBusqueda && inputBusqueda) {
    inputBusqueda.value = terminoBusqueda;
  }
  // ----------------------------------------

  // Inicializar estado por defecto: Servicios visible, Medicamentos oculto
  function inicializarVista() {
    if (seccionServicios && seccionMedicamentos) {
      seccionServicios.classList.remove("hidden");
      seccionMedicamentos.classList.add("hidden");
    }
    if (btnServicios && btnMedicamentos) {
      activarPestana(btnServicios, btnMedicamentos);
    }
  }

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

  // 3. Delegación de eventos para clics (Filtros y Agregar al Carrito)
  document.addEventListener("click", (e) => {
    // --- LÓGICA DE FILTROS ---
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
      return;
    }

    // --- NUEVA LÓGICA: AGREGAR AL CARRITO ---
    const btnAgregar = e.target.closest(".btn-agregar-carrito");
    if (btnAgregar) {
      const codigo = btnAgregar.getAttribute("data-codigo");
      const nombre = btnAgregar.getAttribute("data-nombre");
      const precio = parseInt(btnAgregar.getAttribute("data-precio"), 10);

      if (codigo && nombre && !isNaN(precio)) {
        agregarAlCarrito({ codigo, nombre, precio });
        
        // Feedback visual en el botón
        const textoOriginal = btnAgregar.textContent;
        btnAgregar.textContent = "¡Agregado!";
        btnAgregar.classList.add("bg-green-700");

        setTimeout(() => {
          btnAgregar.textContent = textoOriginal;
          btnAgregar.classList.remove("bg-green-700");
        }, 1000);
      }
    }
  });

  // Función auxiliar para guardar el producto en localStorage
  function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex((item) => item.codigo === producto.codigo);

    if (index !== -1) {
      carrito[index].cantidad += 1;
    } else {
      carrito.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    // Disparar evento personalizado para actualizar el contador si tienes un badge en el header
    window.dispatchEvent(new Event("carritoActualizado"));
  }

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

  // Ejecución inicial al cargar
  inicializarVista();
  aplicarFiltros();
});