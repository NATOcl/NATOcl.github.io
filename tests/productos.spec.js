import { test, expect } from '@playwright/test';

// Antes de cada test, limpiamos el carrito
test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('carrito'));
});

test('muestra el título y el subtítulo', async ({ page }) => {
  await page.goto('/productos');
  await expect(page.locator('.productos-titulo')).toContainText('Productos y servicios');
  
  await expect(
    page.locator('.productos-subtitulo', { hasText: 'pesos chilenos' })
  ).toBeVisible();
});

test('la pestaña Servicios está activa por defecto', async ({ page }) => {
  await page.goto('/productos');
  await expect(page.locator('.productos-tab.is-active')).toContainText('Servicios');
});

test('muestra filas en la tabla', async ({ page }) => {
  await page.goto('/productos');
  const filas = page.locator('.productos-tabla tbody tr');
  await expect(filas.first()).toBeVisible();
});

test('cambiar a la pestaña Medicamentos', async ({ page }) => {
  await page.goto('/productos');
  await page.getByRole('button', { name: /medicamentos/i }).click();
  await expect(page.locator('.productos-tab.is-active')).toContainText('Medicamentos');
});

test('filtra por categoría Vacunación', async ({ page }) => {
  await page.goto('/productos');
  await expect(page.locator('.productos-tabla tbody tr').first()).toBeVisible();
  await page.locator('.productos-filtro', { hasText: 'Vacunación' }).click();
  await expect(page.locator('.productos-pill', { hasText: 'Vacunación' }).first()).toBeVisible();
  const filas = page.locator('.productos-tabla tbody tr');
  const count = await filas.count();
  expect(count).toBeGreaterThan(0);

  const pills = page.locator('.productos-pill');
  for (let i = 0; i < (await pills.count()); i++) {
    await expect(pills.nth(i)).toContainText('Vacunación');
  }
});

test('filtro Todos muestra todo de vuelta', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-filtro', { hasText: 'Vacunación' }).click();
  await page.locator('.productos-filtro', { hasText: 'Todos' }).click();
  const filas = page.locator('.productos-tabla tbody tr');
  expect(await filas.count()).toBeGreaterThan(2);
});

test('búsqueda por nombre filtra resultados', async ({ page }) => {
  await page.goto('/productos');

  await expect(page.locator('.productos-tabla tbody tr').first()).toBeVisible();

  await page.locator('.productos-busqueda input').fill('Vacuna');

  await expect(
    page.locator('.productos-nombre', { hasText: 'Vacuna' }).first()
  ).toBeVisible();

  const nombres = page.locator('.productos-nombre');
  const count = await nombres.count();
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    await expect(nombres.nth(i)).toContainText('Vacuna');
  }
});

test('búsqueda por código funciona', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-busqueda input').fill('SV001');
  await expect(page.locator('.productos-nombre').first()).toContainText('Consulta General');
});

test('búsqueda sin resultados muestra mensaje vacío', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-busqueda input').fill('zzzzzzzz');
  await expect(page.locator('.productos-vacio')).toContainText('No se encontraron resultados');
});

test('agregar cambia el texto del botón a "Agregado"', async ({ page }) => {
  await page.goto('/productos');
  const boton = page.locator('.productos-btn-agregar').first();
  await expect(boton).toContainText('Agregar');
  await boton.click();
  await expect(boton).toContainText('Agregado');
});

test('agregar guarda el producto en localStorage', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  const carrito = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('carrito') || '[]')
  );
  expect(carrito.length).toBe(1);
  expect(carrito[0]).toHaveProperty('codigo');
  expect(carrito[0].cantidad).toBe(1);
});

test('agregar el mismo producto 2 veces incrementa la cantidad', async ({ page }) => {
  await page.goto('/productos');
  const boton = page.locator('.productos-btn-agregar').first();
  await boton.click();
  
  await expect(boton).toContainText('Agregar');
  await boton.click();
  await expect(boton).toContainText('Agregado');

  const carrito = await page.evaluate(() =>
    JSON.parse(localStorage.getItem('carrito') || '[]')
  );
  expect(carrito[0].cantidad).toBe(2);
});