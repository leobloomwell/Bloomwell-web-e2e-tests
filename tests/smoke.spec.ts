import { test, expect } from '@playwright/test';

test('App loads', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'networkidle', timeout: 60000 });

  // Перевіряємо, що семантичне поле email видно (Flutter завантажився)
  await expect(page.getByRole('textbox', { name: 'E-Mail Adresse' })).toBeVisible({ timeout: 15000 });
});