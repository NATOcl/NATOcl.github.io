document.addEventListener("DOMContentLoaded", () => {
  const contenedorCarrito = document.getElementById("contenedor-carrito");
  const subtotalElemento = document.getElementById("subtotal-precio");
  const totalElemento = document.getElementById("total-precio");

  function renderizarCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (!contenedorCarrito) return;

    // Carrito vacío
    if (carrito.length === 0) {
      contenedorCarrito.innerHTML = `
        <div class="p-8 text-center text-gray-500 text-sm">
          Tu carrito está vacío.
        </div>
      `;
      if (subtotalElemento) subtotalElemento.textContent = "$0";
      if (totalElemento) totalElemento.textContent = "$0";
      return;
    }

    // Renderizar tarjetas de productos
    let html = "";
    let total = 0;

    carrito.forEach((prod) => {
      const subtotalProd = prod.precio * prod.cantidad;
      total += subtotalProd;

      html += `
        <div class="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-800 text-sm sm:text-base">${prod.nombre}</h3>
            <p class="text-xs text-gray-400">Código: ${prod.codigo}</p>
            <p class="text-xs font-semibold text-teal-800 mt-1">$${prod.precio.toLocaleString("es-CL")} c/u</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button class="btn-restar px-2.5 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100 transition" data-codigo="${prod.codigo}">-</button>
              <span class="px-3 text-xs font-medium text-gray-800">${prod.cantidad}</span>
              <button class="btn-sumar px-2.5 py-1 text-xs font-bold text-gray-600 hover:bg-gray-100 transition" data-codigo="${prod.codigo}">+</button>
            </div>

            <span class="text-sm font-bold text-gray-800 min-w-[80px] text-right">
              $${subtotalProd.toLocaleString("es-CL")}
            </span>

            <button class="btn-eliminar text-red-500 hover:text-red-700 p-1 transition" data-codigo="${prod.codigo}" title="Eliminar">
              <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    });

    contenedorCarrito.innerHTML = html;

    // Actualizar precios en el resumen
    const totalFormateado = `$${total.toLocaleString("es-CL")}`;
    if (subtotalElemento) subtotalElemento.textContent = totalFormateado;
    if (totalElemento) totalElemento.textContent = totalFormateado;
  }

  // Escuchar eventos para cambiar cantidades o eliminar productos
  if (contenedorCarrito) {
    contenedorCarrito.addEventListener("click", (e) => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Sumar
      const btnSumar = e.target.closest(".btn-sumar");
      if (btnSumar) {
        const codigo = btnSumar.getAttribute("data-codigo");
        const item = carrito.find((p) => p.codigo === codigo);
        if (item) {
          item.cantidad += 1;
          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderizarCarrito();
        }
        return;
      }

      // Restar
      const btnRestar = e.target.closest(".btn-restar");
      if (btnRestar) {
        const codigo = btnRestar.getAttribute("data-codigo");
        const index = carrito.findIndex((p) => p.codigo === codigo);
        if (index !== -1) {
          if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
          } else {
            carrito.splice(index, 1);
          }
          localStorage.setItem("carrito", JSON.stringify(carrito));
          renderizarCarrito();
        }
        return;
      }

      // Eliminar
      const btnEliminar = e.target.closest(".btn-eliminar");
      if (btnEliminar) {
        const codigo = btnEliminar.getAttribute("data-codigo");
        carrito = carrito.filter((p) => p.codigo !== codigo);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderizarCarrito();
      }
    });
  }

  renderizarCarrito();
});