
import { test } from '@playwright/test';
import { AboutPage } from '../pages/AboutPage';

test.describe('About Us → Why MultiLink page', () => {
  test('renders all expected components with correct text', async ({ page }) => {
    const aboutPage = new AboutPage(page);

    await aboutPage.goto();

    await test.step('Validate all page sections (Hero, Cards, Tables, Advantages, RWA)', async () => {
        await aboutPage.assertFullPageStructure();
    });
  });
});