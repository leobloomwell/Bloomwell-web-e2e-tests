import { test, expect } from '@playwright/test';
import { acceptCookies } from '../../helpers/acceptCookies';

test('User can open registration flow', async ({ page }) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded', timeout: 60000 });

  await acceptCookies(page);

  const flutterView = page.locator('flutter-view');
  await flutterView.click({ clickCount: 5, force: true });
  await page.waitForTimeout(1000);

  await page.getByText('Kostenlos registrieren').click();

  await expect(page).toHaveURL(/register|signup/, { timeout: 15000 });
});