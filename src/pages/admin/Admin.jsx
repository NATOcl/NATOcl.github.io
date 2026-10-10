import { Link } from 'react-router-dom';
import React, {useState} from 'react';

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');

    /* estados para almacenar los datos de productos, órdenes, usuarios y categorías uwu */
    const [productos, setProductos] = useState([
    { codigo: 'SV001', nombre: 'Consulta General', categoria: 'Consultas', precio: 15000, stock: 15 },
    { codigo: 'VA001', nombre: 'Vacuna antirrábica', categoria: 'Vacunación', precio: 12000, stock: 3 }, 
    { codigo: 'ME001', nombre: 'Metrobay 250mg', categoria: 'Antibióticos', precio: 2200, stock: 2 }, 
    { codigo: 'MA002', nombre: 'Bravecto', categoria: 'Antiparasitarios', precio: 12000, stock: 20 },
]);

    const [ordenes, setOrdenes] = useState([
    { id: 1, cliente: 'Juan Pérez', total: 50000, fecha: '2023-09-01', estado: 'Pendiente' },
    { id: 2, cliente: 'María López', total: 30000, fecha: '2023-09-02', estado: 'Completada' },
    { id: 3, cliente: 'Carlos García', total: 15000, fecha: '2023-09-03', estado: 'Pendiente' },
]);

    const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, nombre: 'María López', email: 'maria.lopez@example.com' },
    { id: 3, nombre: 'Carlos García', email: 'carlos.garcia@example.com' },
]);

    const [categorias, setCategorias] = useState([
    'Consultas',
    'Vacunación',
    'Cirugía',
    'Desparasitación',
    'Exámenes',
    'Otros',
]);
}

const [verBoleta, SetVerBoleta] = useState(null);
const [mostrarFromProducto, setMostrarFormProducto] = useState(false);
const [productoEditar, setProductoEditar] = useState(null);
const [fromProducto, setFromProducto] = useState({
    codigo: '',
    nombre: ''
    categoria: 'Consultas',
    precio: 0,
    stock: 0,
});          
const [nuevaCategoria, setNuevaCategoria] = useState('');
const [filtroStockCritico, setFiltroStockCritico] = useState(false);

/* funciones productos */
const handleGuardarProducto = (e) => {
    e.preventDefault();
    if (productoEditar) {
        setProductos((productos.map((p) => p.codigo === productoEditar.codigo ? { ...fromProducto } : p))); //* creo que la parte de productoEditar.codigo es para que no se cambie el codigo del producto, pero no estoy seguro */
    } else {
        setProductos([...productos, { ...fromProducto }]);
    }
    setFromProducto({
        codigo: '',
        nombre: '',
        categoria: 'Consultas',
        precio: 0,
        stock: 0,
    });
    setMostrarFormProducto(false);
    setProductoEditar(null);
};

const handleEditar = (producto) => {
    setFormProducto({ ...producto });
    setProductoEditar(producto);
    setMostrarFormProducto(true);
}

const handleEliminarProducto = (codigo) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        setProductos(productos.filter((p) => p.codigo !== codigo));
    }
};
