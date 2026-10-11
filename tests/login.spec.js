import { test, expect } from '@playwright/test';

test('muestra el formulario de login', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('h2')).toContainText('Iniciar Sesión');
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: /ingresar/i })).toBeVisible();
});

test('tiene el enlace a registro', async ({ page }) => {
  await page.goto('/login');
  const link = page.getByRole('link', { name: /regístrate/i });
  await expect(link).toBeVisible();
});

test('navega al registro al hacer clic en el enlace', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: /regístrate/i }).click();
  await expect(page).toHaveURL(/.*registro/i);
  await expect(page.locator('h2')).toContainText('REGISTRO');
});
