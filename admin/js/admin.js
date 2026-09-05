// ==========================================================
// 1. DATOS INICIALES Y REGIONES / COMUNAS
// ==========================================================
const regionesData = [
    {
        region: "Región Metropolitana de Santiago",
        comunas: ["Santiago", "Peñalolén", "Linares", "Concepción", "Providencia", "Maipú"]
    },
    {
        region: "Región de la Araucanía",
        comunas: ["Temuco", "Pucón", "Villarrica", "Angol"]
    },
    {
        region: "Región de Ñuble",
        comunas: ["Chillán", "Bulnes", "San Carlos"]
    }
];

// Inicialización de LocalStorage si no existen llaves previa
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify([
        { id: 1, code: "PROD01", name: "Alimento Perro Adulto 15kg", desc: "Alimento balanceado premium", price: 34990, stock: 12, criticalStock: 5, category: "Alimento", image: "" },
        { id: 2, code: "PROD02", name: "Juguete Pelota Goma", desc: "Resistente a mordidas", price: 4990, stock: 2, criticalStock: 5, category: "Juguetes", image: "" }
    ]));
}

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        { id: 1, run: "19011022K", name: "Juan", lastname: "Pérez", email: "juan@duoc.cl", birthdate: "1995-05-12", role: "Administrador", region: "Región Metropolitana de Santiago", comuna: "Santiago", address: "Av. Siempre Viva 123" },
        { id: 2, run: "182223334", name: "Maria", lastname: "Gómez", email: "maria@gmail.com", birthdate: "1998-08-20", role: "Vendedor", region: "Región de la Araucanía", comuna: "Temuco", address: "Calle Central 456" }
    ]));
}

// Simulamos sesión activa de usuario (por defecto Administrador o Vendedor)
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || { name: "Admin Duoc", role: "Administrador" };

// ==========================================================
// 2. INICIALIZACIÓN Y PERMISOS POR ROL
// ==========================================================
document.addEventListener('DOMContentLoaded', () => {
    setupUserSession();
    loadRegions();
    renderProductsTable();
    renderUsersTable();
    setupEventListeners();
});

function setupUserSession() {
    document.getElementById('current-user-name').textContent = currentUser.name;
    document.getElementById('current-user-role').textContent = currentUser.role;

    // Control de Permisos por Rol (Requerimiento: Vendedor solo visualiza listados)
    if (currentUser.role === 'Vendedor') {
        const adminOnlyElements = document.querySelectorAll('.role-admin');
        adminOnlyElements.forEach(el => el.style.display = 'none');
    }
}

// Alternar entre vistas del panel
function switchView(viewId) {
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(viewId).classList.remove('hidden');

    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
    
    if (viewId === 'view-home') {
        document.getElementById('menu-home').classList.add('active');
        document.getElementById('view-title').textContent = `¡HOLA ${currentUser.role}!`;
    } else if (viewId.includes('user')) {
        document.getElementById('menu-users').classList.add('active');
        document.getElementById('view-title').textContent = 'Gestión de Usuarios';
    } else if (viewId.includes('product')) {
        document.getElementById('menu-products').classList.add('active');
        document.getElementById('view-title').textContent = 'Gestión de Productos';
    }
}

// ==========================================================
// 3. CARGA DINÁMICA DE REGIONES Y COMUNAS
// ==========================================================
function loadRegions() {
    const regionSelect = document.getElementById('user-region');
    regionesData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.region;
        option.textContent = item.region;
        regionSelect.appendChild(option);
    });

    regionSelect.addEventListener('change', (e) => {
        const selectedRegion = e.target.value;
        const comunaSelect = document.getElementById('user-comuna');
        comunaSelect.innerHTML = '<option value="">-- Seleccione Comuna --</option>';

        if (selectedRegion) {
            const regionObj = regionesData.find(r => r.region === selectedRegion);
            if (regionObj) {
                regionObj.comunas.forEach(comuna => {
                    const option = document.createElement('option');
                    option.value = comuna;
                    option.textContent = comuna;
                    comunaSelect.appendChild(option);
                });
                comunaSelect.disabled = false;
            }
        } else {
            comunaSelect.disabled = true;
        }
    });
}

// ==========================================================
// 4. FUNCIONES DE VALIDACIÓN (REGLAS DE NEGOCIO)
// ==========================================================

// Algoritmo para validar RUN Chileno sin puntos ni guión
function validateRun(run) {
    const cleanRun = run.trim().toUpperCase();
    if (!/^[0-9]{7,8}[0-9K]$/.test(cleanRun)) return false;

    const body = cleanRun.slice(0, -1);
    let dv = cleanRun.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = body.length - 1; i >= 0; i--) {
        suma += parseInt(body.charAt(i)) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();

    return dv === dvEsperado;
}

// Validar correo según dominios permitidos (@duoc.cl, @profesor.duoc.cl, @gmail.com)
function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return emailPattern.test(email.trim());
}

// ==========================================================
// 5. MANTENEDOR DE USUARIOS (CRUD + VALIDACIÓN)
// ==========================================================
function renderUsersTable() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '';

    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.run}</td>
            <td>${user.name} ${user.lastname}</td>
            <td>${user.email}</td>
            <td><strong>${user.role}</strong></td>
            <td>${user.comuna}, ${user.region}</td>
            <td>
                ${currentUser.role === 'Administrador' ? `
                    <button class="btn btn-secondary btn-sm" onclick="editUser(${user.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
                ` : 'Sin permisos'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openUserForm(user = null) {
    clearUserFormErrors();
    document.getElementById('form-user').reset();

    if (user) {
        document.getElementById('user-form-title').textContent = 'EDITAR USUARIO';
        document.getElementById('user-id').value = user.id;
        document.getElementById('user-run').value = user.run;
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-lastname').value = user.lastname;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-birthdate').value = user.birthdate || '';
        document.getElementById('user-role').value = user.role;
        document.getElementById('user-region').value = user.region;
        
        // Trigger event para cargar comunas
        document.getElementById('user-region').dispatchEvent(new Event('change'));
        document.getElementById('user-comuna').value = user.comuna;
        document.getElementById('user-address').value = user.address;
    } else {
        document.getElementById('user-form-title').textContent = 'NUEVO USUARIO';
        document.getElementById('user-id').value = '';
    }
    switchView('view-user-form');
}

function clearUserFormErrors() {
    document.querySelectorAll('#form-user .error-msg').forEach(el => el.textContent = '');
}

function saveUser(e) {
    e.preventDefault();
    clearUserFormErrors();
    let isValid = true;

    const id = document.getElementById('user-id').value;
    const run = document.getElementById('user-run').value.trim();
    const name = document.getElementById('user-name').value.trim();
    const lastname = document.getElementById('user-lastname').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const birthdate = document.getElementById('user-birthdate').value;
    const role = document.getElementById('user-role').value;
    const region = document.getElementById('user-region').value;
    const comuna = document.getElementById('user-comuna').value;
    const address = document.getElementById('user-address').value.trim();

    // Validaciones campo por campo
    if (!run || !validateRun(run)) {
        document.getElementById('err-user-run').textContent = 'RUN inválido (ejemplo: 19011022K sin puntos ni guión).';
        isValid = false;
    }
    if (!name || name.length > 50) {
        document.getElementById('err-user-name').textContent = 'Nombre es requerido (Máx 50 caracteres).';
        isValid = false;
    }
    if (!lastname || lastname.length > 100) {
        document.getElementById('err-user-lastname').textContent = 'Apellidos requeridos (Máx 100 caracteres).';
        isValid = false;
    }
    if (!email || !validateEmail(email)) {
        document.getElementById('err-user-email').textContent = 'Correo inválido. Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com.';
        isValid = false;
    }
    if (!region) {
        document.getElementById('err-user-region').textContent = 'Seleccione una región.';
        isValid = false;
    }
    if (!comuna) {
        document.getElementById('err-user-comuna').textContent = 'Seleccione una comuna.';
        isValid = false;
    }
    if (!address || address.length > 300) {
        document.getElementById('err-user-address').textContent = 'Dirección requerida (Máx 300 caracteres).';
        isValid = false;
    }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (id) { // Modificar
        users = users.map(u => u.id == id ? { id: Number(id), run, name, lastname, email, birthdate, role, region, comuna, address } : u);
    } else { // Crear
        users.push({ id: Date.now(), run, name, lastname, email, birthdate, role, region, comuna, address });
    }

    localStorage.setItem('users', JSON.stringify(users));
    renderUsersTable();
    switchView('view-users');
}

function editUser(id) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === id);
    if (user) openUserForm(user);
}

function deleteUser(id) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.id !== id);
        localStorage.setItem('users', JSON.stringify(users));
        renderUsersTable();
    }
}

// ==========================================================
// 6. MANTENEDOR DE PRODUCTOS (CRUD + VALIDACIÓN)
// ==========================================================
function renderProductsTable() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tbody = document.getElementById('products-table-body');
    tbody.innerHTML = '';

    products.forEach(prod => {
        const isCritical = prod.criticalStock !== null && prod.stock <= prod.criticalStock;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${prod.code}</td>
            <td>${prod.name}</td>
            <td>${prod.category}</td>
            <td>$${Number(prod.price).toLocaleString('es-CL')}</td>
            <td>${prod.stock}</td>
            <td>
                ${isCritical ? `<span class="badge-alert">¡Stock Crítico!</span>` : `<span class="badge-ok">OK</span>`}
            </td>
            <td class="role-admin">
                ${currentUser.role === 'Administrador' ? `
                    <button class="btn btn-secondary btn-sm" onclick="editProduct(${prod.id})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteProduct(${prod.id})">Eliminar</button>
                ` : 'Solo lectura'}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function openProductForm(product = null) {
    clearProductFormErrors();
    document.getElementById('form-product').reset();

    if (product) {
        document.getElementById('product-form-title').textContent = 'EDITAR PRODUCTO';
        document.getElementById('product-id').value = product.id;
        document.getElementById('prod-code').value = product.code;
        document.getElementById('prod-name').value = product.name;
        document.getElementById('prod-desc').value = product.desc || '';
        document.getElementById('prod-price').value = product.price;
        document.getElementById('prod-stock').value = product.stock;
        document.getElementById('prod-critical-stock').value = product.criticalStock !== null ? product.criticalStock : '';
        document.getElementById('prod-category').value = product.category;
        document.getElementById('prod-image').value = product.image || '';
    } else {
        document.getElementById('product-form-title').textContent = 'NUEVO PRODUCTO';
        document.getElementById('product-id').value = '';
    }
    switchView('view-product-form');
}

function clearProductFormErrors() {
    document.querySelectorAll('#form-product .error-msg').forEach(el => el.textContent = '');
}

function saveProduct(e) {
    e.preventDefault();
    clearProductFormErrors();
    let isValid = true;

    const id = document.getElementById('product-id').value;
    const code = document.getElementById('prod-code').value.trim();
    const name = document.getElementById('prod-name').value.trim();
    const desc = document.getElementById('prod-desc').value.trim();
    const priceVal = document.getElementById('prod-price').value;
    const stockVal = document.getElementById('prod-stock').value;
    const critStockVal = document.getElementById('prod-critical-stock').value;
    const category = document.getElementById('prod-category').value;
    const image = document.getElementById('prod-image').value.trim();

    // Validaciones Producto
    if (!code || code.length < 3) {
        document.getElementById('err-prod-code').textContent = 'El código es requerido y debe tener mínimo 3 caracteres.';
        isValid = false;
    }
    if (!name || name.length > 100) {
        document.getElementById('err-prod-name').textContent = 'El nombre es requerido (Máx 100 caracteres).';
        isValid = false;
    }
    if (desc.length > 500) {
        document.getElementById('err-prod-desc').textContent = 'La descripción no puede superar los 500 caracteres.';
        isValid = false;
    }
    if (priceVal === '' || Number(priceVal) < 0) {
        document.getElementById('err-prod-price').textContent = 'Precio es requerido y debe ser >= 0 (0 es FREE).';
        isValid = false;
    }
    if (stockVal === '' || Number(stockVal) < 0 || !Number.isInteger(Number(stockVal))) {
        document.getElementById('err-prod-stock').textContent = 'Stock es requerido y debe ser un entero >= 0.';
        isValid = false;
    }
    if (critStockVal !== '' && (Number(critStockVal) < 0 || !Number.isInteger(Number(critStockVal)))) {
        document.getElementById('err-prod-critical-stock').textContent = 'El stock crítico debe ser un entero >= 0.';
        isValid = false;
    }
    if (!category) {
        document.getElementById('err-prod-category').textContent = 'Debe seleccionar una categoría.';
        isValid = false;
    }

    if (!isValid) return;

    let products = JSON.parse(localStorage.getItem('products')) || [];

    const productData = {
        id: id ? Number(id) : Date.now(),
        code,
        name,
        desc,
        price: parseFloat(priceVal),
        stock: parseInt(stockVal),
        criticalStock: critStockVal !== '' ? parseInt(critStockVal) : null,
        category,
        image
    };

    if (id) {
        products = products.map(p => p.id == id ? productData : p);
    } else {
        products.push(productData);
    }

    localStorage.setItem('products', JSON.stringify(products));
    renderProductsTable();
    switchView('view-products');
}

function editProduct(id) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === id);
    if (product) openProductForm(product);
}

function deleteProduct(id) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProductsTable();
    }
}

// ==========================================================
// 7. LISTENERS GENERALES
// ==========================================================
function setupEventListeners() {
    document.getElementById('form-user').addEventListener('submit', saveUser);
    document.getElementById('form-product').addEventListener('submit', saveProduct);
}