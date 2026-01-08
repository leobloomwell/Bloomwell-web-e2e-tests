import { Page } from '@playwright/test';

export async function acceptCookies(page: Page) {
  try {
    const acceptButton = page.getByRole('button', { name: /alle akzeptieren|akzeptieren|accept all/i })
      .or(page.getByText(/alle akzeptieren/i));

    if (await acceptButton.isVisible({ timeout: 8000 })) {
      await acceptButton.click({ force: true });
      await page.waitForLoadState('networkidle');
    }
  } catch (e) {
    console.log('Cookie banner not found or already accepted');
  }
}