import { test, expect } from '@playwright/test';

test('la navbar se muestra en todas las páginas', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.navbar-header')).toBeVisible();
});

test('la navbar muestra el logo', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.navbar-logo img')).toBeVisible();
});

test('navega a Inicio desde el logo', async ({ page }) => {
  await page.goto('/productos');
  await page.locator('.navbar-logo').click();
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('navega a Productos', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: 'Productos' }).click();
  await expect(page).toHaveURL(/\/productos$/i);
});

test('navega a Nosotros', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: 'Nosotros' }).click();
  await expect(page).toHaveURL(/\/nosotros$/i);
});

test('navega a Blogs', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: 'Blogs' }).click();
  await expect(page).toHaveURL(/\/blogs$/i);
});

test('navega a Contacto', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: 'Contacto' }).click();
  await expect(page).toHaveURL(/\/contacto$/i);
});

test('el botón de iniciar sesión lleva al login', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: /iniciar sesión/i }).click();
  await expect(page).toHaveURL(/\/login$/i);
});

test('el botón del carrito lleva al carrito', async ({ page }) => {
  const nav = page.locator('.navbar-header');
  await page.goto('/');
  await nav.getByRole('link', { name: /carrito/i }).click();
  await expect(page).toHaveURL(/\/carrito$/i);
});