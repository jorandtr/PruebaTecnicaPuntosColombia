import { test } from '@playwright/test';

test('abrir portal de viajes para inspeccionar elementos', async ({ page }) => {
  // 👉 abre tu aplicación
  await page.goto('https://demo.testim.io/');

  // 🔥 detiene la ejecución y abre el inspector visual
  await page.pause();
}); 