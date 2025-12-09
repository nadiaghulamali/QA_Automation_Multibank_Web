// tests/navigation.spec.ts (CORRECTED for Clean POM)

import { test, expect } from '@playwright/test';
import { HomePage, MenuKey } from '../pages/HomePage';
import expected from '../data/expectedContent.json';

const allMenus = [
  ...Object.keys(expected.directNav),
  ...Object.keys(expected.menu)
];
const dropdownMenus: MenuKey[] = ['Trade', 'Features', 'About Us', 'Support'];
const cfg = expected.markets.trending; // config for TradingPage assertions

test.describe('Navigation & Layout - Top Menu', () => {

  test('Home page loads and all top navigation items are visible', async ({ page }) => {
    const home = new HomePage(page);

    await home.goto();

    await home.assertTopNavItemsVisible();
  });

  for (const label of allMenus.filter(l => !dropdownMenus.includes(l as MenuKey))) {
    const navConfig = expected.directNav[label as keyof typeof expected.directNav];

    test(` "${label}" navigates to correct URL and content`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goto();

      await home.clickTopNav(label);

      const urlMessage = `FAILURE:  "${label}" redirected to wrong URL. Expected: ${navConfig.url}`;
      await expect(page, urlMessage).toHaveURL(new RegExp(navConfig.url));

      const titleMessage = `FAILURE: "${label}" page title does not contain: "${navConfig.titleContains}"`;
      await expect(page, titleMessage).toHaveTitle(new RegExp(navConfig.titleContains, 'i'));
    });
  }

  test.describe('Dropdown Navigation Menus are Functional', () => {

    for (const menu of dropdownMenus) {
      const menuConfig = expected.menu[menu];

      test.describe(`Functional Redirection for ${menu} menu`, () => {
        for (const item of menuConfig.items) {

          test(`Sub-menu item "${item.label}" redirects to expected URL`, async ({ page }) => {
            const home = new HomePage(page);

            await home.goto();
            await home.openDropdown(menu);
            await home.clickDropdownItem(item.label);

            const redirectionMessage =
              `FAILURE: Sub-link "${item.label}" in menu "${menu}" redirected to WRONG URL. Expected path: ${item.url}.`;

            await expect(page, redirectionMessage).toHaveURL(new RegExp(item.url));
            await expect(page, redirectionMessage).toHaveTitle(new RegExp(item.titleContains, 'i'));
          });
        }
      });
    }
  });
});