import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import expected from '../data/expectedContent.json';

test.describe('Content Validation', () => {
  test('Marketing banners appear at the bottom of the page', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const appStoreLink = page.getByRole('link', { name: /App Store/i });
    const googlePlayLink = page.getByRole('link', { name: /Google Play/i });

    const candidates = [appStoreLink, googlePlayLink];

    let visibleCount = 0;
    for (const loc of candidates) {
      if (await loc.isVisible().catch(() => false)) {
        visibleCount++;
      }
    }

    expect(
      visibleCount,
      `Expected at least ${expected.banners.minBanners} marketing banner(s) (App Store / Google Play) near the page bottom, but found ${visibleCount}`
    ).toBeGreaterThanOrEqual(expected.banners.minBanners);
  });

  test('Download section links correctly to App Store and Google Play', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // App Store link
    const appStoreLink = page.getByRole('link', { name: /App Store/i }).first();
    await expect(
      appStoreLink,
      'App Store download link is not visible'
    ).toBeVisible();

    const appStoreHref = await appStoreLink.getAttribute('href');
    expect(
      appStoreHref || '',
      `App Store link href is invalid. Expected it to contain "${expected.downloads.appStoreLinkContains}", got "${appStoreHref}"`
    ).toContain(expected.downloads.appStoreLinkContains);

    // Google Play link
    const googlePlayLink = page.getByRole('link', { name: /Google Play/i }).first();
    await expect(
      googlePlayLink,
      'Google Play download link is not visible'
    ).toBeVisible();

    const googlePlayHref = await googlePlayLink.getAttribute('href');
    expect(
      googlePlayHref || '',
      `Google Play link href is invalid. Expected it to contain "${expected.downloads.googlePlayLinkContains}", got "${googlePlayHref}"`
    ).toContain(expected.downloads.googlePlayLinkContains);
  });

});
