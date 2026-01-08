import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers/acceptCookies';

test('User can login', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await acceptCookies(page);

  // Простий фокус — достатньо одного кліку
  await page.locator('flutter-view').click({ force: true });
  await page.waitForTimeout(1000);

  const email = page.getByRole('textbox', { name: 'E-Mail Adresse' });
  await email.fill(process.env.USER_EMAIL!);

  await page.locator('flutter-view').click({ force: true });
  const password = page.getByRole('textbox', { name: 'Passwort' });
  await password.fill(process.env.USER_PASSWORD!);

  await page.getByRole('button', { name: 'Anmelden' }).click();

  // Чекаємо редирект, а не networkidle
  await page.waitForURL(/home|dashboard/, { timeout: 30000 });
});