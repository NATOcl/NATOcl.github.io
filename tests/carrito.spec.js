import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.removeItem('carrito'));
});

test('muestra mensaje cuando el carrito está vacío', async ({ page }) => {
  await page.goto('/carrito');
  await expect(page.locator('.carrito-vacio')).toBeVisible();
  await expect(page.locator('.carrito-vacio')).toContainText('vacío');
});

test('el botón "Ver productos" lleva al catálogo', async ({ page }) => {
  await page.goto('/carrito');
  await page.getByRole('link', { name: /ver productos/i }).click();
  await expect(page).toHaveURL(/\/productos$/i);
});

test('agregar un producto lo muestra en el carrito', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  const filas = page.locator('.carrito-tabla tbody tr');
  await expect(filas).toHaveCount(1);
  await expect(page.locator('.carrito-nombre').first()).toBeVisible();
});

test('agregar 2 productos distintos muestra 2 filas', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').nth(0).click();
  await page.locator('.productos-btn-agregar').nth(1).click();
  await page.goto('/carrito');

  await expect(page.locator('.carrito-tabla tbody tr')).toHaveCount(2);
});

test('agregar el mismo producto 2 veces muestra cantidad 2', async ({ page }) => {
  await page.goto('/productos');
  const boton = page.locator('.productos-btn-agregar').first();
  await boton.click();
  await expect(boton).toContainText('Agregar'); 
  await boton.click();
  await page.goto('/carrito');

  const select = page.locator('.carrito-select').first();
  await expect(select).toHaveValue('2');
});

test('cambiar la cantidad actualiza el select', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  const select = page.locator('.carrito-select').first();
  await select.selectOption('5');
  await expect(select).toHaveValue('5');
});

test('cambiar la cantidad actualiza el subtotal', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  const subtotalAntes = await page.locator('.carrito-subtotal').first().textContent();
  await page.locator('.carrito-select').first().selectOption('3');
  const subtotalDespues = await page.locator('.carrito-subtotal').first().textContent();

  expect(subtotalDespues).not.toBe(subtotalAntes);
});

test('eliminar un producto lo quita de la tabla', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  await page.locator('.carrito-btn-eliminar').first().click();
  await expect(page.locator('.carrito-vacio')).toBeVisible();
});

test('eliminar uno de dos deja el otro', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').nth(0).click();
  await page.locator('.productos-btn-agregar').nth(1).click();
  await page.goto('/carrito');

  await page.locator('.carrito-btn-eliminar').first().click();
  await expect(page.locator('.carrito-tabla tbody tr')).toHaveCount(1);
});

test('vaciar carrito elimina todos los items', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').nth(0).click();
  await page.locator('.productos-btn-agregar').nth(1).click();
  await page.goto('/carrito');

  await page.getByRole('button', { name: /vaciar carrito/i }).click();
  await expect(page.locator('.carrito-vacio')).toBeVisible();
});

test('el resumen muestra el total', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  await expect(page.locator('.carrito-resumen-total')).toBeVisible();
});

test('el resumen muestra el número de ítems distintos', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').nth(0).click();
  await page.locator('.productos-btn-agregar').nth(1).click();
  await page.goto('/carrito');

  const resumen = page.locator('.carrito-resumen');
  await expect(resumen).toContainText('2');
});

test('el carrito persiste al recargar la página', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.productos-btn-agregar').first().click();
  await page.goto('/carrito');

  await page.reload();
  await expect(page.locator('.carrito-tabla tbody tr')).toHaveCount(1);
});