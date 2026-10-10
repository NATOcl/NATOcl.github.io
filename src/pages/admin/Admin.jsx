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


 
