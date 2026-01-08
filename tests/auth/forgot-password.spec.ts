import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers/acceptCookies';

test('User can request password reset', async ({ page }) => {
await page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await acceptCookies(page);

  const flutterView = page.locator('flutter-view');
  await flutterView.click({ clickCount: 5, force: true });
  await page.waitForTimeout(1000);

  await page.getByText('Passwort vergessen?').click();

  await flutterView.click({ force: true });
  await page.waitForTimeout(500);

  const emailInput = page.getByRole('textbox', { name: 'E-Mail Adresse' });
  await emailInput.fill(process.env.USER_EMAIL!);

  await page.getByRole('button').first().click({ force: true }); // Кнопка відправки

  await expect(page.getByText(/gesendet|verschickt/i)).toBeVisible({ timeout: 10000 });
});