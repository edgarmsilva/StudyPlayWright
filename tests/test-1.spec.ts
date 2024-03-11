import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Pesquisar', { exact: true }).click();
  await page.getByLabel('Pesquisar', { exact: true }).fill('teste');
  await page.getByText('Aproximadamente 1.280.000.000 resultados (0,24 segundos)');
});