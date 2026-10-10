export const SERVICIOS_MOCK = [
  { codigo: 'SV001', nombre: 'Consulta General',   especie: 'Perro / Gato / Aves', duracion: '30 Min', precio: 15000, categoria: 'Consultas' },
  { codigo: 'SV002', nombre: 'Consulta Urgencias', especie: 'Perro / Gato / Aves', duracion: '30 Min', precio: 25000, categoria: 'Consultas' },
  { codigo: 'VA001', nombre: 'Vacuna antirrábica canina', especie: 'Perro', duracion: '10 Min', precio: 12000, categoria: 'Vacunación' },
  { codigo: 'VA002', nombre: 'Vacuna séxtuple canina',    especie: 'Perro', duracion: '10 Min', precio: 17000, categoria: 'Vacunación' },
  { codigo: 'CR001', nombre: 'Esterilización / Castración canina', especie: 'Perro', duracion: '60 Min', precio: 50000, categoria: 'Cirugía' },
  { codigo: 'CR002', nombre: 'Esterilización / Castración felina', especie: 'Gato',  duracion: '45 Min', precio: 45000, categoria: 'Cirugía' },
  { codigo: 'DP001', nombre: 'Desparasitación interna', especie: 'Perro / Gato', duracion: '8 Min', precio: 8000,  categoria: 'Desparasitación' },
  { codigo: 'DP002', nombre: 'Desparasitación externa', especie: 'Perro / Gato', duracion: '8 Min', precio: 15000, categoria: 'Desparasitación' },
  { codigo: 'EX001', nombre: 'Hemograma completo',         especie: 'Perro / Gato', duracion: '30 Min', precio: 16000, categoria: 'Exámenes' },
  { codigo: 'EX002', nombre: 'Perfil bioquímico completo', especie: 'Perro / Gato', duracion: '30 Min', precio: 22000, categoria: 'Exámenes' },
  { codigo: 'OT001', nombre: 'Implante de Microchip de identificación', especie: 'Perro / Gato', duracion: '10 Min', precio: 13000, categoria: 'Otros' },
  { codigo: 'OT002', nombre: 'Corte de uñas y limpieza de oídos',       especie: 'Perro / Gato', duracion: '20 Min', precio: 17000, categoria: 'Otros' },
];

export const MEDICAMENTOS_MOCK = [
  { codigo: 'ME001', nombre: 'Metrobay 250mg', especie: 'Perro / Gato', presentacion: 'Blíster 10 comp.', precio: 2200, categoria: 'Antibióticos' },
  { codigo: 'ME002', nombre: 'Enrox 50mg',     especie: 'Perro / Gato', presentacion: 'Blíster 10 comp.', precio: 4200, categoria: 'Antibióticos' },
  { codigo: 'MA001', nombre: 'Drontal Plus',   especie: 'Perro / Gato', presentacion: 'Blíster 2 comp.',  precio: 3500,  categoria: 'Antiparasitarios' },
  { codigo: 'MA002', nombre: 'Bravecto',       especie: 'Perro',        presentacion: 'Comprimido',       precio: 12000, categoria: 'Antiparasitarios' },
  { codigo: 'MC001', nombre: 'Kapkan 20mg',    especie: 'Perro / Gato', presentacion: 'Blíster 8 comp.',  precio: 3200, categoria: 'Antiinflamatorios' },
  { codigo: 'MC002', nombre: 'Meloxicam 5mg',  especie: 'Perro / Gato', presentacion: 'Frasco 10ml',      precio: 6800, categoria: 'Antiinflamatorios' },
];

export const CATEGORIAS_SERVICIOS    = ['Todos', 'Consultas', 'Vacunación', 'Cirugía', 'Desparasitación', 'Exámenes', 'Otros'];
export const CATEGORIAS_MEDICAMENTOS = ['Todos', 'Antibióticos', 'Antiparasitarios', 'Antiinflamatorios'];

//simulación del llamadoo
export function fetchProductosMock(tipo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tipo === 'servicios' ? SERVICIOS_MOCK : MEDICAMENTOS_MOCK);
    }, 150);
  });
}